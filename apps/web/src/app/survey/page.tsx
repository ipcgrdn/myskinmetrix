'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getUserId } from '@/lib/userIdentifier';

export default function SurveyStart() {
  // 페이지 로드 시 사용자 ID 확인/생성
  useEffect(() => {
    // 사용자 ID 생성 함수 호출
    const userId = getUserId();
    console.log('사용자 ID:', userId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-slate-50 to-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-teal-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="My Skin Metrix 로고" 
              width={44} 
              height={44}
              className="mr-2"
            />
            <h1 className="text-xl font-semibold text-teal-600">My Skin Metrix</h1>
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              피부 분석 설문을 시작합니다
            </h1>
            <p className="text-slate-600 text-lg mb-6">
              더 정확한 피부 분석을 위해 몇 가지 질문에 답해주세요.<br />
              소요 시간은 약 3분입니다.
            </p>
            <div className="w-24 h-1 bg-teal-200 mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-8 mb-10">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">설문 참여 전 알아두세요</h2>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700">
                  <span className="font-medium">객관적인 답변</span>을 해주세요. 정확한 분석을 위해 현재 피부 상태에 대해 있는 그대로 답변해주세요.
                </p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700">
                  <span className="font-medium">로그인 없이도</span> 설문 결과를 확인할 수 있습니다. 결과는 90일간 이 기기에 저장됩니다.
                </p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700">
                  <span className="font-medium">언제든지 중단</span>하고 나중에 다시 시작할 수 있습니다. 진행 상황은 자동으로 저장됩니다.
                </p>
              </li>
            </ul>

            <div className="flex justify-center">
              <Link 
                href="/survey/1" 
                className="px-8 py-4 bg-teal-500 text-white rounded-md font-medium shadow-md hover:bg-teal-600 transition-all"
              >
                설문 시작하기
              </Link>
            </div>
          </div>

          <div className="text-center text-slate-500 text-sm">
            <p>
              설문에 참여함으로써 <Link href="/privacy" className="text-teal-600 underline">개인정보처리방침</Link>에 동의하게 됩니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 