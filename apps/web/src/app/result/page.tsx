'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUserSurveyData, SurveyData } from '@/lib/surveyData';
import { getUserId } from '@/lib/userIdentifier';

export default function ResultPage() {
  const router = useRouter();
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 사용자 ID 확인
    const id = getUserId();
    setUserId(id);
    
    // 설문 데이터 불러오기
    const data = getUserSurveyData();
    if (!data || Object.keys(data).length === 0) {
      // 설문 데이터가 없으면 설문 시작 페이지로 이동
      router.push('/survey');
      return;
    }
    
    setSurveyData(data);
    setIsLoading(false);
    
    // 여기서 백엔드 API 호출해서 결과를 가져오는 코드 추가 예정
  }, [router]);

  // 로딩 중이거나 데이터가 없는 경우
  if (isLoading || !surveyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">결과를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  // 샘플 분석 결과 (실제로는 백엔드에서 계산된 값을 사용)
  const analysisResults = {
    hydration: calculateHydration(surveyData),
    oiliness: calculateOiliness(surveyData),
    sensitivity: calculateSensitivity(surveyData),
    pigmentation: 65,
    elasticity: 70
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              피부 분석 결과
            </h1>
            <p className="text-slate-600 text-lg mb-6">
              설문 응답을 바탕으로 분석한 당신의 피부 상태입니다.
            </p>
            <div className="w-24 h-1 bg-teal-200 mx-auto mb-8 rounded-full"></div>
          </div>

          {/* 결과 요약 */}
          <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-8 mb-10">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">피부 지표 분석</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* 수분 지수 */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 font-medium">수분 지수</span>
                    <span className="text-teal-600 font-medium">{analysisResults.hydration}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-300 to-teal-500 rounded-full"
                      style={{ width: `${analysisResults.hydration}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    수분 함량이 {analysisResults.hydration < 50 ? '낮은' : '적절한'} 상태입니다.
                    {analysisResults.hydration < 50 && ' 충분한 수분 공급이 필요합니다.'}
                  </p>
                </div>
                
                {/* 유분 지수 */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 font-medium">유분 지수</span>
                    <span className="text-teal-600 font-medium">{analysisResults.oiliness}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-300 to-teal-500 rounded-full"
                      style={{ width: `${analysisResults.oiliness}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    유분 분비가 {analysisResults.oiliness > 70 ? '많은' : analysisResults.oiliness < 40 ? '적은' : '적절한'} 상태입니다.
                  </p>
                </div>
                
                {/* 민감도 지수 */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 font-medium">민감도 지수</span>
                    <span className="text-teal-600 font-medium">{analysisResults.sensitivity}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-300 to-teal-500 rounded-full"
                      style={{ width: `${analysisResults.sensitivity}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    피부 민감도가 {analysisResults.sensitivity > 70 ? '높은' : analysisResults.sensitivity < 40 ? '낮은' : '보통인'} 상태입니다.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col justify-center items-center">
                <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 mb-4 w-full">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">피부 타입 분석</h3>
                  <p className="text-teal-600 text-2xl font-bold mb-4">
                    {determineSkinType(surveyData)}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {getSkinTypeDescription(determineSkinType(surveyData))}
                  </p>
                </div>
                
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">주요 피부 고민</h3>
                  <div className="flex flex-wrap gap-2">
                    {surveyData.skin_concern && Array.isArray(surveyData.skin_concern) ? (
                      surveyData.skin_concern.map((concern: string) => (
                        <span key={concern} className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm">
                          {getConcernLabel(concern)}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500">특별한 고민이 없습니다</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 추천 액션 */}
          <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-8 mb-10">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">맞춤 관리 추천</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-800 font-medium mb-1">클렌징 제안</h3>
                  <p className="text-slate-600">
                    {getCleansingRecommendation(surveyData)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-800 font-medium mb-1">수분 관리</h3>
                  <p className="text-slate-600">
                    {getMoistureRecommendation(analysisResults.hydration, surveyData)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-800 font-medium mb-1">주의사항</h3>
                  <p className="text-slate-600">
                    {getWarning(surveyData, analysisResults)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Link 
                href="/detail-analysis"
                className="px-6 py-3 bg-teal-500 text-white rounded-md text-center font-medium shadow-md hover:bg-teal-600 transition-all"
              >
                상세 분석 결과 확인하기
              </Link>
            </div>
          </div>
          
          {/* 계정 생성 유도 */}
          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">결과를 저장하고 변화를 추적하세요</h2>
            <p className="text-slate-700 mb-6">
              회원가입 시 시간에 따른 피부 변화 추적, 상세 분석 리포트 및 맞춤형 제품 추천을 받아보실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="px-6 py-3 bg-teal-500 text-white rounded-md text-center font-medium shadow-md hover:bg-teal-600 transition-all"
              >
                회원가입하기
              </Link>
              <Link 
                href="/" 
                className="px-6 py-3 bg-white text-slate-700 rounded-md text-center font-medium shadow-sm hover:bg-slate-50 transition-all"
              >
                나중에 하기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 수분 지수 계산 (샘플 로직)
function calculateHydration(data: SurveyData): number {
  const hydrationLevel = data.hydration_level || 3;
  const skinType = data.skin_type || 'normal';
  
  let baseScore = 0;
  
  // 세안 후 당김 정도를 기반으로 점수 계산
  if (hydrationLevel === 1) baseScore = 30; // 매우 심함
  else if (hydrationLevel === 2) baseScore = 45; // 심함
  else if (hydrationLevel === 3) baseScore = 60; // 보통
  else if (hydrationLevel === 4) baseScore = 75; // 약간
  else if (hydrationLevel === 5) baseScore = 90; // 전혀 없음
  
  // 피부 타입에 따른 보정
  if (skinType === 'dry') baseScore -= 15;
  else if (skinType === 'oily') baseScore += 5;
  else if (skinType === 'combination') baseScore -= 5;
  
  // 최종 값 범위 제한
  return Math.min(Math.max(baseScore, 0), 100);
}

// 유분 지수 계산 (샘플 로직)
function calculateOiliness(data: SurveyData): number {
  const oilProduction = data.oil_production || 3;
  const skinType = data.skin_type || 'normal';
  
  let baseScore = 0;
  
  // 유분 생성 정도를 기반으로 점수 계산
  if (oilProduction === 1) baseScore = 20; // 전혀 안 됨
  else if (oilProduction === 2) baseScore = 40; // 약간
  else if (oilProduction === 3) baseScore = 60; // 보통
  else if (oilProduction === 4) baseScore = 80; // 많은 편
  else if (oilProduction === 5) baseScore = 95; // 매우 많음
  
  // 피부 타입에 따른 보정
  if (skinType === 'dry') baseScore -= 15;
  else if (skinType === 'oily') baseScore += 15;
  else if (skinType === 'combination') baseScore += 5;
  
  // 최종 값 범위 제한
  return Math.min(Math.max(baseScore, 0), 100);
}

// 민감도 지수 계산 (샘플 로직)
function calculateSensitivity(data: SurveyData): number {
  const sensitivityLevel = data.sensitivity_level || 'sometimes_reactive';
  const skinType = data.skin_type || 'normal';
  
  let baseScore = 0;
  
  // 민감도 정도를 기반으로 점수 계산
  if (sensitivityLevel === 'very_reactive') baseScore = 90;
  else if (sensitivityLevel === 'sometimes_reactive') baseScore = 60;
  else if (sensitivityLevel === 'rarely_reactive') baseScore = 30;
  else if (sensitivityLevel === 'never_reactive') baseScore = 10;
  
  // 피부 타입에 따른 보정
  if (skinType === 'sensitive') baseScore += 20;
  
  // 최종 값 범위 제한
  return Math.min(Math.max(baseScore, 0), 100);
}

// 피부 타입 결정 (샘플 로직)
function determineSkinType(data: SurveyData): string {
  const skinType = data.skin_type;
  const hydrationLevel = data.hydration_level || 3;
  const oilProduction = data.oil_production || 3;
  
  if (skinType === 'combination') return '복합성 피부';
  if (skinType === 'sensitive') return '민감성 피부';
  
  if (hydrationLevel <= 2 && oilProduction <= 2) return '건성 피부';
  if (hydrationLevel >= 4 && oilProduction >= 4) return '지성 피부';
  if (hydrationLevel <= 2 && oilProduction >= 4) return '복합성 피부 (건조+지성)';
  
  return '중성 피부';
}

// 피부 타입별 설명
function getSkinTypeDescription(skinType: string): string {
  switch (skinType) {
    case '건성 피부':
      return '수분 부족으로 인해 당김과 각질이 자주 발생하는 타입입니다. 풍부한 보습이 필요합니다.';
    case '지성 피부':
      return '유분 분비가 많아 번들거림이 있는 타입입니다. 적절한 수분 공급과 유분 조절이 필요합니다.';
    case '복합성 피부':
      return 'T존은 지성, 볼과 턱은 건성인 타입입니다. 부위별 맞춤 케어가 필요합니다.';
    case '복합성 피부 (건조+지성)':
      return '수분은 부족하지만 유분은 많은 타입입니다. 수분 공급과 유분 조절이 동시에 필요합니다.';
    case '민감성 피부':
      return '외부 자극에 민감하게 반응하는 타입입니다. 자극이 적은 순한 제품 사용이 권장됩니다.';
    case '중성 피부':
      return '수분과 유분의 균형이 잘 맞는 건강한 타입입니다. 현재 상태를 유지하는 것이 중요합니다.';
    default:
      return '피부 타입에 맞는 제품과 관리 방법을 선택하는 것이 중요합니다.';
  }
}

// 피부 고민 표시 레이블
function getConcernLabel(concern: string): string {
  const labels: {[key: string]: string} = {
    'acne': '여드름/뾰루지',
    'wrinkles': '주름',
    'pigmentation': '색소침착/기미',
    'pores': '모공 확대',
    'dryness': '건조함',
    'oiliness': '과다 유분',
    'sensitivity': '민감성/발적',
    'dullness': '칙칙함/톤 불균일'
  };
  
  return labels[concern] || concern;
}

// 클렌징 추천 (샘플 로직)
function getCleansingRecommendation(data: SurveyData): string {
  const skinType = data.skin_type;
  
  if (skinType === 'dry' || skinType === 'sensitive') {
    return '자극이 적은 밀크나 크림 타입의 클렌저를 사용하세요. 미온수로 세안하고 문지르기보다 부드럽게 마사지하듯 클렌징하는 것이 좋습니다.';
  } else if (skinType === 'oily') {
    return '젤이나 폼 타입의 클렌저로 유분을 효과적으로 제거하되, 과도한 세안은 오히려 유분 분비를 촉진할 수 있으니 하루 2회로 제한하세요.';
  } else if (skinType === 'combination') {
    return 'T존과 같은 지성 부위는 젤 타입, 건조한 볼과 턱 부위는 부드러운 폼 타입의 클렌저를 사용하는 부위별 세안이 효과적입니다.';
  } else {
    return '부드러운 폼 타입의 클렌저를 사용하여 하루 2회 세안하는 것이 적절합니다. 너무 뜨거운 물은 피부 장벽을 약화시킬 수 있으니 미온수를 사용하세요.';
  }
}

// 수분 관리 추천 (샘플 로직)
function getMoistureRecommendation(hydrationLevel: number, data: SurveyData): string {
  if (hydrationLevel < 40) {
    return '수분 함량이 매우 낮습니다. 히알루론산, 세라마이드 성분이 풍부한 고보습 크림과 에센스를 사용하고, 하루 2L 이상의 충분한 물 섭취가 필요합니다.';
  } else if (hydrationLevel < 60) {
    return '수분 공급이 필요합니다. 토너와 에센스를 활용한 다중 보습 레이어링 기법을 시도해보고, 주 2-3회 수분 마스크팩을 사용하는 것이 좋습니다.';
  } else if (hydrationLevel < 80) {
    return '수분 상태가 양호하나 지속적인 관리가 필요합니다. 가벼운 수분 제품을 꾸준히 사용하고 실내 습도를 50-60%로 유지하는 것이 도움이 됩니다.';
  } else {
    return '수분 상태가 매우 좋습니다. 현재의 관리 방법을 유지하고, 계절 변화에 따라 가볍게 제품을 조절하는 것이 좋습니다.';
  }
}

// 주의사항 추천 (샘플 로직)
function getWarning(data: SurveyData, results: {sensitivity: number}): string {
  if (results.sensitivity > 70) {
    return '민감도가 높으므로 새로운 제품을 사용할 때는 항상 패치 테스트를 먼저 진행하고, 자극성 성분(알코올, 향료, 색소 등)이 포함된 제품은 피하는 것이 좋습니다.';
  }
  
  if (data.skin_type === 'dry') {
    return '뜨거운 물로 세안하거나 알코올 함량이 높은 제품은 피부를 더욱 건조하게 만들 수 있으니 주의하세요. 또한 히터나 에어컨 사용 시 가습기를 함께 사용하는 것이 좋습니다.';
  }
  
  if (data.skin_type === 'oily') {
    return '과도한 세안은 오히려 피지 분비를 자극할 수 있으니, 하루 2회로 제한하세요. 또한 모공을 막을 수 있는 코메도제닉 성분이 포함된 제품은 피하는 것이 좋습니다.';
  }
  
  return '일상적인 자외선 차단은 모든 피부 타입에 필수입니다. 또한 규칙적인 생활 습관과 충분한 수면, 스트레스 관리도 피부 건강에 중요한 요소입니다.';
} 