import { LayoutComponent } from './routes/index/_layout/layout.component';
import { SettingsComponent } from './routes/index/settings/settings.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: 'settings', component: SettingsComponent }
    ] }
];