import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { SurveyAnswers, AnalysisResult } from './types';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  async saveSurveyWithResult(
    userId: string, 
    answers: SurveyAnswers, 
    result: AnalysisResult
  ) {
    // 설문과 결과를 트랜잭션으로 한 번에 저장
    return this.prisma.$transaction(async (tx) => {
      // 1. 설문 저장
      const survey = await tx.survey.create({
        data: {
          userId,
          answers: answers as Prisma.InputJsonValue,
        },
      });

      // 2. 분석 결과 저장
      const savedResult = await tx.result.create({
        data: {
          surveyId: survey.id,
          skinType: result.skinType,
          scores: result.scores as unknown as Prisma.InputJsonValue,
          reliability: result.reliability as unknown as Prisma.InputJsonValue,
          recommendations: result.recommendations as unknown as Prisma.InputJsonValue,
        },
      });

      // 3. 저장된 설문과 결과 반환
      return {
        survey,
        result: savedResult,
      };
    });
  }

  async getResult(resultId: string) {
    const result = await this.prisma.result.findUnique({
      where: { id: resultId },
      include: {
        survey: {
          select: {
            answers: true,
            createdAt: true
          }
        }
      }
    });

    if (!result) return null;

    return {
      survey: result.survey,
      result: {
        id: result.id,
        skinType: result.skinType,
        scores: result.scores,
        reliability: result.reliability,
        recommendations: result.recommendations,
        createdAt: result.createdAt
      }
    };
  }
} 