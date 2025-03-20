import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {} 