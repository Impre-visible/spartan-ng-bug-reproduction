import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ResponseService } from '@services/response/response.service';

import { DataModule } from './data-module/data.module';

import { AppController } from './app.controller';


@Module({
  imports: [DataModule],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule { }
