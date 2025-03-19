'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

import { getUserId } from '@/lib/userIdentifier';

export default function SurveyStart() {
  // 페이지 로드 시 사용자 ID 확인/생성
  useEffect(() => {
    // 사용자 ID 생성 함수 호출
    const userId = getUserId();
    console.log('사용자 ID:', userId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-slate-50 to-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-cyan-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="My Skin Metrix 로고" 
              width={44} 
              height={44}
              className="mr-2 hidden md:block"
            />
            <h1 className="text-lg md:text-xl font-semibold text-cyan-600">My Skin Metrix</h1>
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
              바우만 피부 타입 분석을 시작합니다
            </h1>
            <p className="text-slate-600 text-sm md:text-base mb-6">
              16가지 바우만 피부 타입과 6가지 핵심 지표로 정확한 피부 분석을 제공합니다.<br />
              소요 시간은 약 5분입니다.
            </p>
            <div className="w-24 h-1 bg-cyan-200 mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-cyan-100 p-8 mb-10">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 text-center md:text-left">설문 참여 전 알아두세요 </h2>
            
            <ul className="space-y-4 mb-8">
              <li className="flex flex-col md:flex-row gap-2 md:gap-0 items-center">
                <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 text-sm md:text-base">
                  <span className="font-medium">객관적인 답변</span>을 해주세요. 정확한 분석을 위해 현재 피부 상태에 대해 있는 그대로 답변해주세요.
                </p>
              </li>
              <li className="flex flex-col md:flex-row gap-2 md:gap-0 items-center">
                <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 text-sm md:text-base">
                  <span className="font-medium">바우만 피부 타입</span>은 D/O(유수분), S/R(민감도), P/N(색소침착), W/T(노화도)의 4가지 차원으로 피부를 분석합니다.
                </p>
              </li>
              <li className="flex flex-col md:flex-row gap-2 md:gap-0 items-center">
                <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 text-sm md:text-base">
                  <span className="font-medium">로그인 없이도</span> 설문 결과를 확인할 수 있습니다. 결과는 90일간 이 기기에 저장됩니다.
                </p>
              </li>
              <li className="flex flex-col md:flex-row gap-2 md:gap-0 items-center">
                <div className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 text-sm md:text-base">
                  <span className="font-medium">언제든지 중단</span>하고 나중에 다시 시작할 수 있습니다. 진행 상황은 자동으로 저장됩니다.
                </p>
              </li>
            </ul>

            <div className="flex justify-center">
              <Link 
                href="/survey/1" 
                className="px-4 md:px-8 py-2 md:py-4 text-sm md:text-base bg-cyan-500 text-white rounded-md font-bold shadow-md hover:bg-cyan-600 transition-all"
              >
                설문 시작하기
              </Link>
            </div>
          </div>

          <div className="text-center text-slate-500 text-xs md:text-sm">
            <p>
              설문에 참여함으로써 <Link href="/privacy" className="text-cyan-600 underline">개인정보처리방침</Link>에 동의하게 됩니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 