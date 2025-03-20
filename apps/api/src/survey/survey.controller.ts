import { Controller, Post, Body, Headers } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { UserService } from '../user/user.service';
import { SurveyAnswers, AnalysisResult } from './types';

interface SaveSurveyRequest {
  answers: SurveyAnswers;
  result: AnalysisResult;
}

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly userService: UserService,
  ) {}

  @Post('save')
  async saveSurvey(
    @Body() data: SaveSurveyRequest,
    @Headers('x-temp-id') tempId: string,
  ) {
    // tempId로 사용자 찾기 또는 생성
    const user = await this.userService.findOrCreateUserByTempId(tempId);
    
    // 설문과 결과를 함께 저장
    return this.surveyService.saveSurveyWithResult(
      user.id,
      data.answers,
      data.result
    );
  }
} 