import { Module } from '@nestjs/common';
import { PrestatairesController } from './prestataires/prestataires.controller';
import { ResponseService } from '@services/response/response.service';

@Module({
  controllers: [PrestatairesController],
  providers: [ResponseService]
})
export class DataModule { }
