import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, 'routes');

function cleanRouteName(routeName: string) {
    return routeName.replace(/^\((.*?)\)$/, '$1');
}

function cleanFinalPath(finalPath: string) {
    if (!finalPath.startsWith('/') && !finalPath.startsWith('index') && !finalPath.endsWith('/') && !finalPath.endsWith('index')) {
        return `${finalPath}`;
    }

    if (finalPath.startsWith('/')) {
        finalPath = finalPath.slice(1);
    } else if (finalPath.startsWith('index')) {
        finalPath = finalPath.slice(5);
    } else if (finalPath.endsWith('/')) {
        finalPath = finalPath.slice(0, -1);
    } else if (finalPath.endsWith('index')) {
        finalPath = finalPath.slice(0, -5);
    }

    return cleanFinalPath(finalPath);
}

interface GenerateRoutes {
    routes: string[];
    imports: string[];
}

async function generateRoutes(baseDir: string, parentPath = '', isChildRoute = false): Promise<GenerateRoutes> {
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    const routes = [];
    const imports = [];
    const childRoutes = [];
    let layoutComponent = null;

    for (const entry of entries) {
        if (entry.name.startsWith('__')) continue;

        const fullPath = path.join(baseDir, entry.name);

        if (entry.isDirectory()) {
            const subRoutes: GenerateRoutes = await generateRoutes(fullPath, path.join(parentPath, entry.name), true);
            if (entry.name === '_layout') {
                // Mark as a layout and import its 
                const matchResult = subRoutes.imports[0].match(/import { (.*?) }/);
                if (matchResult) {
                    const layoutComponentName = matchResult[1];
                    layoutComponent = layoutComponentName;
                    imports.push(`import { ${layoutComponentName} } from './routes/${path.join(parentPath, "_layout", "layout").replace(/\\/g, '/')}.component';`);
                }
            } else {
                childRoutes.push(...subRoutes.routes);
                imports.push(...subRoutes.imports);
            }
        } else if (entry.isFile() && entry.name.endsWith('.component.ts')) {
            const routeName = path.basename(entry.name, '.component.ts');
            const routePath = path.join(parentPath, routeName).replace(/\\/g, '/');
            const cleanedPath = cleanRouteName(routePath);
            let finalPath = cleanedPath.endsWith(routeName) ? cleanedPath.slice(0, -routeName.length) : cleanedPath;

            finalPath = finalPath.replace(/\(.*?\)/g, '').replace(/\/\//g, '/');

            finalPath = cleanFinalPath(finalPath);


            const componentName = `${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Component`;
            imports.push(`import { ${componentName} } from './routes/${path.join(parentPath, routeName).replace(/\\/g, '/')}.component';`);

            const routeEntry = `{ path: '${finalPath}', component: ${componentName} }`;

            if (isChildRoute) {
                childRoutes.push(routeEntry);
            } else {
                routes.push(routeEntry);
            }
        }
    }

    // If layout exists, wrap child routes under it
    if (layoutComponent && childRoutes.length > 0) {
        routes.push(`{ path: '', component: ${layoutComponent}, children: [\n        ${childRoutes.join(',\n        ')}\n    ] }`);
    } else {
        routes.push(...childRoutes);
    }

    return { routes, imports };
}

async function main() {
    try {
        const { routes, imports } = await generateRoutes(basePath);
        const outputPath = path.join(__dirname, 'app.routes.ts');
        const currentContent = await fs.readFile(outputPath, 'utf-8').catch(() => '');
        const content = `${imports.join('\n')}\n\nimport { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n    ${routes.join(',\n    ')}\n];`;

        if (content === currentContent) {
            console.log('Routes are up to date!');
            return;
        }

        await fs.writeFile(outputPath, content);
        console.log('Routes generated successfully!');
    } catch (error) {
        console.error('Error generating routes:', error);
    }
}

main();
