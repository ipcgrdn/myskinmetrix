import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUserByTempId(tempId: string) {
    // 트랜잭션으로 처리하여 Race Condition 방지
    return this.prisma.$transaction(async (tx) => {
      // 기존 사용자 찾기
      let user = await tx.user.findUnique({
        where: { tempId },
      });

      // 사용자가 없으면 새로 생성
      if (!user) {
        try {
          user = await tx.user.create({
            data: {
              tempId,
              isRegistered: false,
            },
          });
        } catch (error) {
          // 만약 동시에 다른 트랜잭션에서 같은 tempId로 유저를 생성했다면,
          // 다시 한번 찾아봅니다.
          if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            user = await tx.user.findUnique({
              where: { tempId },
            });
            if (!user) {
              throw error; // 여전히 찾을 수 없다면 에러를 던집니다.
            }
          } else {
            throw error;
          }
        }
      }

      return user;
    });
  }

  async registerUser(tempId: string, email: string) {
    return this.prisma.user.update({
      where: { tempId },
      data: {
        email,
        isRegistered: true,
      },
    });
  }
} 