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

        let data = [
            {
                id: 1,
                nom: "Prestataire 1",
                typologie_code: "A",
                zone_id: 1
            },
            {
                id: 2,
                nom: "Prestataire 2",
                typologie_code: "B",
                zone_id: 2
            },
            {
                id: 3,
                nom: "Prestataire 3",
                typologie_code: "A",
                zone_id: 1
            }
        ]

        return this.responseService.successResponse<any[]>("Prestataires trouvés avec succès", data);
    }
}
