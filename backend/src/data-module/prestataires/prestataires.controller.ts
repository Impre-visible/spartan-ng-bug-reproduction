import { Controller, Get, Query } from '@nestjs/common';
import { Prestataire, PrismaClient } from '@prisma/client';
import { ResponseService } from '@services/response/response.service';

@Controller('prestataires')
export class PrestatairesController {
    private prisma = new PrismaClient();

    constructor(private readonly responseService: ResponseService) { }

    @Get()
    async getPrestataires(
        @Query('site') _site_id: string, // Juste pour le logging
        @Query('zone') zone_id?: string,
        @Query('typologie') typologie_code?: string
    ) {


        /*
        name: new FormControl(row.nom, [Validators.required]),
        num_marche: new FormControl(row.typologie_code, [Validators.required]),
        percent: new FormControl(1, [Validators.required, Validators.min(0), Validators.max(1)])
        */
        let data = [
            {
                id: 1,
                name: "Prestataire 1",
                num_marche: "1",
                percent: 0.33
            },
            {
                id: 2,
                name: "Prestataire 2",
                num_marche: "2",
                percent: 0.33
            },
            {
                id: 3,
                name: "Prestataire 3",
                num_marche: "3",
                percent: 0.33
            }
        ]

        return this.responseService.successResponse<any[]>("Prestataires trouvés avec succès", data);
    }
}
