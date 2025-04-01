'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Palette, Sparkles, Scan, Check } from 'lucide-react';

import Header from '@/components/Header';
import { analyzePersonalColorEnhanced } from '@/lib/personalColorAnalyzer';

// 분석 단계
type AnalysisStep = 'loading' | 'face-detection' | 'color-analysis' | 'processing' | 'complete';

export default function AnalyzingPage() {
  const router = useRouter();
  const [step, setStep] = useState<AnalysisStep>('loading');
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // 실제 분석 프로세스
  useEffect(() => {
    // 이미지 가져오기
    const savedImage = typeof window !== 'undefined' 
      ? sessionStorage.getItem('personalColorImage') 
      : null;
      
    if (!savedImage) {
      // 이미지가 없으면 캡처 페이지로 리다이렉트
      router.push('/personal-color/capture');
      return;
    }
    
    setImageUrl(savedImage);
    
    // 각 단계별 진행
    const analyzeWithSteps = async () => {
      try {
        // 로딩 및 초기화
        setStep('loading');
        setProgress(10);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 얼굴 인식 단계
        setStep('face-detection');
        setProgress(30);
        
        // 모델 로딩
        try {
          await Promise.race([
            // face-api.js 모델이 로드되는 것을 기다림
            window.faceDetectionPromise,
            // 타임아웃 (10초)
            new Promise((_, reject) => setTimeout(() => reject(new Error('모델 로딩 타임아웃')), 10000))
          ]);
        } catch (e) {
          console.error('얼굴 인식 모델 로딩 실패:', e);
          // 모델이 이미 로드된 경우 무시하고 계속 진행
        }
        
        // 색상 분석 단계 (실제 분석 수행) - 진행률 콜백 추가
        setStep('color-analysis');
        setProgress(50);
        
        // 이벤트 리스너 설정 - 분석 진행 상황 업데이트
        const progressHandler = (event: CustomEvent) => {
          if (event.detail && typeof event.detail.progress === 'number') {
            // 50% ~ 80% 사이로 매핑
            const mappedProgress = 50 + (event.detail.progress * 30 / 100);
            setProgress(Math.min(80, mappedProgress));
          }
        };
        
        // 이벤트 리스너 등록
        window.addEventListener('personalColorAnalysisProgress', progressHandler as EventListener);
        
        // 여기서 실제 분석 수행 - 개선된 함수 사용
        const result = await analyzePersonalColorEnhanced(savedImage);
        
        // 이벤트 리스너 제거
        window.removeEventListener('personalColorAnalysisProgress', progressHandler as EventListener);
        
        // 세션 스토리지에 결과 저장
        sessionStorage.setItem('personalColorResult', JSON.stringify(result));
        
        // 프로세싱 단계
        setStep('processing');
        setProgress(80);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 완료 단계
        setStep('complete');
        setProgress(100);
        
        // 결과 페이지로 이동
        setTimeout(() => {
          router.push('/personal-color/result');
        }, 800);
      } catch (error) {
        console.error('분석 오류:', error);
        setError('분석 중 오류가 발생했습니다. 얼굴을 정확히 인식할 수 없거나 이미지 품질이 좋지 않을 수 있습니다.');
        setProgress(0);
      }
    };
    
    analyzeWithSteps();
  }, [router]);
  
  // 각 단계별 메시지와 아이콘
  const stepInfo = {
    'loading': {
      message: '분석 준비 중...',
      description: '이미지를 처리하고 분석 모델을 로드하고 있습니다.',
      icon: <Palette className="w-5 h-5 text-teal-500" />
    },
    'face-detection': {
      message: '얼굴 인식 중',
      description: 'AI 모델을 통해 얼굴의 주요 특징점을 찾고 있습니다. 이 과정은 정확한 분석을 위해 필수적입니다.',
      icon: <Scan className="w-5 h-5 text-teal-500" />
    },
    'color-analysis': {
      message: '컬러 데이터 분석 중',
      description: '얼굴의 각 부위(피부, 머리카락, 눈)에서 색상 데이터를 추출하고 분석하고 있습니다. 이 과정은 약간의 시간이 소요됩니다.',
      icon: <Sparkles className="w-5 h-5 text-teal-500" />
    },
    'processing': {
      message: '결과 생성 중',
      description: '색상 데이터를 기반으로 ITA 값, 색온도, 대비 수준을 계산하고 퍼스널 컬러 타입을 결정하고 있습니다.',
      icon: <Palette className="w-5 h-5 text-teal-500" />
    },
    'complete': {
      message: '분석 완료!',
      description: '퍼스널 컬러 분석이 성공적으로 완료되었습니다. 결과 페이지로 이동합니다.',
      icon: <Check className="w-5 h-5 text-teal-500" />
    },
  };
  
  // 에러 메시지 표시
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50/70 via-slate-50/70 to-white">
        <Header />
        
        <main className="container mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center"
            >
              <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">분석 오류</h2>
              <p className="text-slate-600 mb-6">{error}</p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  다시 시도하기
                </button>
                
                <button
                  onClick={() => router.push('/personal-color/capture')}
                  className="px-6 py-3 bg-white text-slate-700 border border-slate-200 font-medium rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  새 이미지 촬영하기
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/70 via-slate-50/70 to-white">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="max-w-xl mx-auto">
          
          
          {/* 메인 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30 mb-8"
          >
            {/* 이미지와 분석 시각화 */}
            <div className="p-6 md:p-8">

              {/* 프로그레스 바 */}
              <div className="w-full bg-slate-100 rounded-full h-1 mb-4 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                ></motion.div>
              </div>
              
              {/* 퍼센트 표시 */}
              <div className="flex justify-between text-xs text-slate-500 mb-6">
                <span>{Math.round(progress)}% 완료</span>
                <span>예상 시간: {9 - Math.floor(progress / 12)}초</span>
              </div>
              
              {/* 현재 단계 상태 */}
              <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-100/60 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  {stepInfo[step].icon}
                  <h3 className="font-medium text-sm text-slate-700">
                    {stepInfo[step].message}
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  {stepInfo[step].description}
                </p>
              </div>

              <div className="relative w-full aspect-square max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden border border-white/50 shadow-lg">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="분석 중인 이미지"
                    fill
                    className="object-cover"
                  />
                )}
                
                {/* 분석 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {step === 'face-detection' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* 스캔 효과 애니메이션 */}
                        <motion.div
                          initial={{ top: 0 }}
                          animate={{ top: '100%' }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                          }}
                          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
                        />
                        <div className="border-dotted border-4 border-teal-500/60 w-4/5 h-4/5 rounded-2xl">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-teal-500 px-3 py-1 rounded-full shadow-md">
                            얼굴 인식 중
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {step === 'color-analysis' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"
                    >
                      {/* 분석 영역 표시 대신 더 전문적인 애니메이션 */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          animate={{ 
                            boxShadow: ['0 0 0 rgba(20, 184, 166, 0)', '0 0 30px rgba(20, 184, 166, 0.7)', '0 0 0 rgba(20, 184, 166, 0)'] 
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            repeatType: "loop" 
                          }}
                          className="w-4/5 h-4/5 rounded-2xl border border-cyan-500/70 flex items-center justify-center"
                        >
                          <div className="text-center p-4 bg-black/40 backdrop-blur-sm rounded-xl">
                            <Sparkles className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                            <p className="text-xs text-white font-medium">색상 데이터 추출 중</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* 분석 진행 오버레이 */}
                  {(step === 'loading' || step === 'processing' || step === 'complete') && (
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent backdrop-blur-[1px] flex items-center justify-center">
                      {step === 'complete' ? (
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-white/80 backdrop-blur-sm p-6 rounded-full shadow-lg"
                        >
                          <Check size={32} className="text-teal-500" />
                        </motion.div>
                      ) : (
                        <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-teal-500 animate-spin"></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* 푸터 */}
            <div className="p-6 bg-slate-50/70 border-t border-slate-100/40 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mr-2 animate-pulse"></div>
                  <p className="text-xs text-slate-500">분석이 자동으로 진행됩니다</p>
                </div>
                <p className="text-xs text-slate-500">데이터는 기기에서만 처리됩니다</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 