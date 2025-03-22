import {
  skinTypeSurveyQuestions,
  categoryTitles,
  getQuestionsByCategory,
} from "./surveyQuestions";

// 설문 응답 값 타입 정의
export type RadioAnswerValue = 1 | 2 | 3 | 4 | 5;
export type CheckboxAnswerValue = string[];
export type SurveyAnswerValue = RadioAnswerValue | CheckboxAnswerValue;

// 설문 응답 데이터 인터페이스
export interface SurveyData {
  // 유수분 밸런스 (D/O)
  morning_skin_condition?: RadioAnswerValue;
  daily_oil_pattern?: RadioAnswerValue;
  makeup_change?: RadioAnswerValue;
  preferred_skincare_texture?: RadioAnswerValue;

  // 민감도 (S/R)
  new_product_reaction?: RadioAnswerValue;
  external_factors_sensitivity?: CheckboxAnswerValue;
  chemical_reaction?: RadioAnswerValue;
  skin_condition_check?: CheckboxAnswerValue;

  // 색소침착 (P/N)
  uv_reaction?: RadioAnswerValue;
  pigmentation_level?: RadioAnswerValue;
  skin_tone_uniformity?: RadioAnswerValue;
  pigmentation_factors?: RadioAnswerValue;

  // 노화도 (W/T)
  wrinkle_state?: RadioAnswerValue;
  skin_elasticity?: RadioAnswerValue;
  skin_recovery?: RadioAnswerValue;
  age_range?: RadioAnswerValue;

  // 피부 장벽
  irritation_recovery?: RadioAnswerValue;
  barrier_damage_frequency?: RadioAnswerValue;
  moisturizer_effect?: RadioAnswerValue;
  barrier_damage_symptoms?: CheckboxAnswerValue;

  // 생활환경
  living_environment?: RadioAnswerValue;
  sleep_stress?: RadioAnswerValue;
  diet_habits?: CheckboxAnswerValue;
  seasonal_changes?: RadioAnswerValue;
  hormonal_changes?: RadioAnswerValue;

  // 메타데이터
  metadata?: {
    timings: ResponseTiming[];
    startedAt: number;
    completedAt: number;
  };
}

// 분석 결과 점수 인터페이스
export interface AnalysisScores {
  doScore: number; // 유수분 밸런스 점수
  srScore: number; // 민감도 점수
  pnScore: number; // 색소침착 점수
  wtScore: number; // 노화도 점수
  barrierScore: number; // 피부장벽 점수
  lifestyleScore: number; // 생활환경 점수
}

// 피부 타입 문자열 타입
export type SkinTypeString =
  | "DSPT"
  | "DSNT"
  | "DSPW"
  | "DSNW"
  | "DRPT"
  | "DRNT"
  | "DRPW"
  | "DRNW"
  | "OSPT"
  | "OSNT"
  | "OSPW"
  | "OSNW"
  | "ORPT"
  | "ORNT"
  | "ORPW"
  | "ORNW";

// 신뢰도 점수 인터페이스
export interface ReliabilityScore {
  score: number;  // 0-100 사이의 신뢰도 점수
  flags: string[];  // 신뢰도에 영향을 미치는 요소들
  inconsistencies: string[];  // 일관성이 없는 응답들
}

// 분석 결과 인터페이스 확장
export interface AnalysisResult {
  skinType: SkinTypeString;
  scores: AnalysisScores;
  reliability: ReliabilityScore;  // 신뢰도 정보 추가
  recommendations: string[];  // 개선 추천사항
}

// 가중치 설정
type AgeGroup = "under_17" | "18_24" | "25_34" | "35_44" | "over_45";
type Season = "spring" | "summer" | "fall" | "winter";
type WeightFactors = {
  doWeight: number;
  srWeight: number;
  pnWeight: number;
  wtWeight: number;
  barrierWeight: number;
};

// 가중치 설정 확장
const WEIGHT_CONFIG = {
  // 연령대별 가중치
  age_factor: {
    "under_17": { doWeight: 1.2, srWeight: 1.3, pnWeight: 1.1, wtWeight: 1.0, barrierWeight: 1.2 },
    "18_24": { doWeight: 1.1, srWeight: 1.2, pnWeight: 1.1, wtWeight: 1.0, barrierWeight: 1.1 },
    "25_34": { doWeight: 1.0, srWeight: 1.1, pnWeight: 1.2, wtWeight: 1.1, barrierWeight: 1.0 },
    "35_44": { doWeight: 1.0, srWeight: 1.0, pnWeight: 1.3, wtWeight: 1.2, barrierWeight: 0.9 },
    "over_45": { doWeight: 0.9, srWeight: 0.9, pnWeight: 1.4, wtWeight: 1.3, barrierWeight: 0.8 }
  } as Record<AgeGroup, WeightFactors>,

  // 계절별 가중치
  season_factor: {
    spring: { doWeight: 1.0, srWeight: 1.1, pnWeight: 1.2, wtWeight: 1.0, barrierWeight: 1.0 },
    summer: { doWeight: 1.2, srWeight: 1.0, pnWeight: 1.3, wtWeight: 0.9, barrierWeight: 1.1 },
    fall: { doWeight: 0.9, srWeight: 1.1, pnWeight: 1.1, wtWeight: 1.0, barrierWeight: 1.0 },
    winter: { doWeight: 0.8, srWeight: 1.2, pnWeight: 0.9, wtWeight: 1.1, barrierWeight: 1.2 }
  } as Record<Season, WeightFactors>,

  // 환경 요인 가중치
  environment_factor: {
    humidity: { low: 0.8, medium: 1.0, high: 1.2 },
    temperature: { low: 0.9, medium: 1.0, high: 1.1 },
    pollution: { low: 1.0, medium: 1.1, high: 1.2 }
  },

  // 질문별 가중치
  question_weights: {
    DO: {
      morning_skin_condition: 1.5,
      daily_oil_pattern: 1.3,
      makeup_change: 1.2,
      preferred_skincare_texture: 1.0
    },
    SR: {
      new_product_reaction: 1.5,
      external_factors_sensitivity: 1.3,
      chemical_reaction: 1.2,
      skin_condition_check: 1.0
    },
    PN: {
      uv_reaction: 1.5,
      pigmentation_level: 1.4,
      skin_tone_uniformity: 1.2,
      pigmentation_factors: 1.1
    },
    WT: {
      wrinkle_state: 1.4,
      skin_elasticity: 1.3,
      skin_recovery: 1.2,
      age_range: 1.1
    }
  }
};

// 현재 계절 판단
function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "fall";
  return "winter";
}

// 환경 요인 점수 계산
function calculateEnvironmentFactors(data: SurveyData): {
  humidityFactor: number;
  temperatureFactor: number;
  pollutionFactor: number;
} {
  const factors = {
    humidityFactor: WEIGHT_CONFIG.environment_factor.humidity.medium,
    temperatureFactor: WEIGHT_CONFIG.environment_factor.temperature.medium,
    pollutionFactor: WEIGHT_CONFIG.environment_factor.pollution.medium
  };

  if (data.living_environment) {
    // 습도 요인
    if (data.living_environment <= 2) {
      factors.humidityFactor = WEIGHT_CONFIG.environment_factor.humidity.low;
    } else if (data.living_environment >= 4) {
      factors.humidityFactor = WEIGHT_CONFIG.environment_factor.humidity.high;
    }

    // 온도 요인
    if (data.seasonal_changes && data.seasonal_changes <= 2) {
      factors.temperatureFactor = WEIGHT_CONFIG.environment_factor.temperature.low;
    } else if (data.seasonal_changes && data.seasonal_changes >= 4) {
      factors.temperatureFactor = WEIGHT_CONFIG.environment_factor.temperature.high;
    }
  }

  // 대기오염 요인
  if (data.external_factors_sensitivity?.includes("pollution")) {
    factors.pollutionFactor = WEIGHT_CONFIG.environment_factor.pollution.high;
  }

  return factors;
}

// 사용자의 설문 응답을 로컬 스토리지에 저장
export function saveUserSurveyData(surveyData: SurveyData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "my-skin-metrix-survey-data",
      JSON.stringify(surveyData)
    );
  }
}

// 로컬 스토리지에서 사용자의 설문 응답 불러오기
export function getUserSurveyData(): SurveyData | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("my-skin-metrix-survey-data");
    return data ? JSON.parse(data) : null;
  }
  return null;
}

// 마지막으로 완료한 설문 단계 저장
export function saveLastCompletedStep(step: number): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("my-skin-metrix-last-step", step.toString());
  }
}

// 마지막으로 완료한 설문 단계 가져오기
export function getLastCompletedStep(): number {
  if (typeof window !== "undefined") {
    const step = localStorage.getItem("my-skin-metrix-last-step");
    return step ? parseInt(step, 10) : 0;
  }
  return 0;
}

// categoryTitles와 getQuestionsByCategory 다시 내보내기
export { categoryTitles, getQuestionsByCategory };

// 설문 질문 데이터 - 기존 코드의 샘플 질문은 제거하고 새로운 질문 데이터 사용
export const surveyQuestions = skinTypeSurveyQuestions;

// 응답 일관성 검사
function checkResponseConsistency(data: SurveyData): string[] {
  const inconsistencies: string[] = [];

  // 건성/지성 관련 응답 일관성 체크
  if (data.morning_skin_condition && data.daily_oil_pattern) {
    const morningDry = data.morning_skin_condition <= 2;
    const dailyDry = data.daily_oil_pattern <= 2;
    if (morningDry !== dailyDry) {
      inconsistencies.push("건성/지성 관련 응답이 일관적이지 않습니다.");
    }
  }

  // 민감성 관련 응답 일관성 체크
  if (data.new_product_reaction && data.chemical_reaction) {
    const newProductSensitive = data.new_product_reaction <= 2;
    const chemicalSensitive = data.chemical_reaction <= 2;
    if (newProductSensitive !== chemicalSensitive) {
      inconsistencies.push("민감성 관련 응답이 일관적이지 않습니다.");
    }
  }

  // 색소침착 관련 응답 일관성 체크
  if (data.uv_reaction && data.pigmentation_level) {
    const uvSensitive = data.uv_reaction <= 2;
    const pigmentationHigh = data.pigmentation_level <= 2;
    if (uvSensitive && !pigmentationHigh) {
      inconsistencies.push("자외선 민감도와 색소침착 정도가 일관적이지 않습니다.");
    }
  }

  return inconsistencies;
}

// 응답 시간 추적을 위한 인터페이스
export interface ResponseTiming {
  questionId: string;
  startTime: number;
  endTime: number;
}

export interface SurveyMetadata {
  timings: ResponseTiming[];
  startedAt: number;
  completedAt: number;
}

// 응답 패턴 분석 결과 인터페이스
interface ResponsePatternAnalysis {
  averageResponseTime: number;
  suspiciouslyFastResponses: boolean;
  responseVariety: boolean;
  categoryConsistency: Record<string, boolean>;
}

// 응답 패턴 분석 함수
function analyzeResponsePatterns(data: SurveyData): ResponsePatternAnalysis {
  const analysis: ResponsePatternAnalysis = {
    averageResponseTime: 0,
    suspiciouslyFastResponses: false,
    responseVariety: true,
    categoryConsistency: {}
  };

  if (data.metadata?.timings) {
    // 응답 시간 분석
    const responseTimes = data.metadata.timings.map(t => t.endTime - t.startTime);
    analysis.averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    
    // 비정상적으로 빠른 응답 체크 (2초 미만)
    const tooFastResponses = responseTimes.filter(time => time < 2000).length;
    analysis.suspiciouslyFastResponses = tooFastResponses > responseTimes.length * 0.3;
  }

  // 응답 다양성 검사
  const numericResponses = Object.values(data).filter(v => typeof v === 'number') as number[];
  const uniqueResponses = new Set(numericResponses).size;
  analysis.responseVariety = uniqueResponses >= 3;

  // 카테고리별 일관성 검사
  const categories = ['DO', 'SR', 'PN', 'WT'];
  categories.forEach(category => {
    analysis.categoryConsistency[category] = checkCategoryConsistency(data, category);
  });

  return analysis;
}

// 카테고리별 일관성 검사 함수
function checkCategoryConsistency(data: SurveyData, category: string): boolean {
  switch (category) {
    case 'DO':
      return checkDOConsistency(data);
    case 'SR':
      return checkSRConsistency(data);
    case 'PN':
      return checkPNConsistency(data);
    case 'WT':
      return checkWTConsistency(data);
    default:
      return true;
  }
}

// 각 카테고리별 일관성 검사 함수들
function checkDOConsistency(data: SurveyData): boolean {
  if (!data.morning_skin_condition || !data.daily_oil_pattern) return true;
  
  const morningDry = data.morning_skin_condition <= 2;
  const dailyDry = data.daily_oil_pattern <= 2;
  return morningDry === dailyDry;
}

function checkSRConsistency(data: SurveyData): boolean {
  if (!data.new_product_reaction || !data.chemical_reaction) return true;
  
  const newProductSensitive = data.new_product_reaction >= 4;
  const chemicalSensitive = data.chemical_reaction >= 4;
  return newProductSensitive === chemicalSensitive;
}

function checkPNConsistency(data: SurveyData): boolean {
  if (!data.uv_reaction || !data.pigmentation_level) return true;
  
  const uvSensitive = data.uv_reaction >= 4;
  const highPigmentation = data.pigmentation_level >= 4;
  return !(uvSensitive && !highPigmentation);
}

function checkWTConsistency(data: SurveyData): boolean {
  if (!data.wrinkle_state || !data.skin_elasticity) return true;
  
  const hasWrinkles = data.wrinkle_state >= 4;
  const poorElasticity = data.skin_elasticity <= 2;
  return hasWrinkles === poorElasticity;
}

// calculateReliability 함수 개선
function calculateReliability(data: SurveyData, inconsistencies: string[]): ReliabilityScore {
  let score = 100;
  const flags: string[] = [];

  // 기존 신뢰도 검사
  const totalQuestions = Object.keys(skinTypeSurveyQuestions).length;
  const answeredQuestions = Object.keys(data).length;
  const completionRate = answeredQuestions / totalQuestions;

  if (completionRate < 0.8) {
    score -= 20;
    flags.push("일부 질문이 답변되지 않았습니다.");
  }

  // 응답 패턴 분석
  const patternAnalysis = analyzeResponsePatterns(data);

  // 응답 시간 기반 감점
  if (patternAnalysis.suspiciouslyFastResponses) {
    score -= 15;
    flags.push("일부 응답이 비정상적으로 빠릅니다.");
  }

  // 응답 다양성 기반 감점
  if (!patternAnalysis.responseVariety) {
    score -= 10;
    flags.push("응답이 지나치게 단조롭습니다.");
  }

  // 카테고리별 일관성 검사
  Object.entries(patternAnalysis.categoryConsistency).forEach(([category, isConsistent]) => {
    if (!isConsistent) {
      score -= 5;
      flags.push(`${category} 카테고리의 응답이 일관적이지 않습니다.`);
    }
  });

  // 일관성 문제로 인한 감점
  score -= inconsistencies.length * 10;

  return {
    score: Math.max(0, Math.min(100, score)),
    flags,
    inconsistencies
  };
}

// 맞춤형 피부 타입 분석 함수 개선
export function analyzeSkinType(data: SurveyData): AnalysisResult {
  // 응답 일관성 체크
  const inconsistencies = checkResponseConsistency(data);
  
  // 연령대별 가중치 적용
  const ageRange = data.age_range || 3;
  const ageGroups: AgeGroup[] = ["under_17", "18_24", "25_34", "35_44", "over_45"];
  const ageGroup = ageGroups[Math.min(4, Math.max(0, 5 - ageRange))];
  const ageWeights = WEIGHT_CONFIG.age_factor[ageGroup];

  // 계절별 가중치 적용
  const currentSeason = getCurrentSeason();
  const seasonWeights = WEIGHT_CONFIG.season_factor[currentSeason];

  // 환경 요인 가중치 계산
  const environmentFactors = calculateEnvironmentFactors(data);

  // 최종 가중치 계산 (연령 + 계절 + 환경 요인의 평균)
  const finalWeights = {
    doWeight: Math.round((ageWeights.doWeight + seasonWeights.doWeight) / 2 * environmentFactors.humidityFactor * 100) / 100,
    srWeight: Math.round((ageWeights.srWeight + seasonWeights.srWeight) / 2 * environmentFactors.pollutionFactor * 100) / 100,
    pnWeight: Math.round((ageWeights.pnWeight + seasonWeights.pnWeight) / 2 * environmentFactors.temperatureFactor * 100) / 100,
    wtWeight: Math.round((ageWeights.wtWeight + seasonWeights.wtWeight) / 2 * 100) / 100,
    barrierWeight: Math.round((ageWeights.barrierWeight + seasonWeights.barrierWeight) / 2 * environmentFactors.humidityFactor * 100) / 100
  };

  // 각 지표 점수 계산 (가중치 적용)
  const doScore = Math.round(calculateDOScore(data) * finalWeights.doWeight);
  const srScore = Math.round(calculateSRScore(data) * finalWeights.srWeight);
  const pnScore = Math.round(calculatePNScore(data) * finalWeights.pnWeight);
  const wtScore = Math.round(calculateWTScore(data) * finalWeights.wtWeight);
  const barrierScore = Math.round(calculateBarrierScore(data) * finalWeights.barrierWeight);
  const lifestyleScore = Math.round(calculateLifestyleScore(data));

  // 피부 타입 결정 (점수는 정수로 비교)
  const doType = doScore < 50 ? "D" : "O";
  const srType = srScore < 50 ? "S" : "R";
  const pnType = pnScore < 50 ? "P" : "N";
  const wtType = wtScore < 50 ? "W" : "T";

  // 신뢰도 점수 계산
  const reliability = calculateReliability(data, inconsistencies);

  // 맞춤형 추천사항 생성
  const recommendations = generateRecommendations(data, {
    doScore, srScore, pnScore, wtScore, barrierScore, lifestyleScore
  });

  return {
    skinType: `${doType}${srType}${pnType}${wtType}` as SkinTypeString,
    scores: {
      doScore: Math.max(0, Math.min(100, Math.round(doScore))),
      srScore: Math.max(0, Math.min(100, Math.round(srScore))),
      pnScore: Math.max(0, Math.min(100, Math.round(pnScore))),
      wtScore: Math.max(0, Math.min(100, Math.round(wtScore))),
      barrierScore: Math.max(0, Math.min(100, Math.round(barrierScore))),
      lifestyleScore: Math.max(0, Math.min(100, Math.round(lifestyleScore))),
    },
    reliability: {
      ...reliability,
      score: Math.round(reliability.score)
    },
    recommendations
  };
}

// 맞춤형 추천사항 생성
function generateRecommendations(data: SurveyData, scores: AnalysisScores): string[] {
  const recommendations: string[] = [];

  // 유수분 밸런스 관련 추천
  if (scores.doScore < 40) {
    recommendations.push("수분 공급에 중점을 둔 스킨케어를 권장합니다.");
  } else if (scores.doScore > 60) {
    recommendations.push("유분 조절에 중점을 둔 스킨케어를 권장합니다.");
  }

  // 민감도 관련 추천
  if (scores.srScore < 45) {
    recommendations.push("자극이 적은 순한 제품 사용을 권장합니다.");
    recommendations.push("새로운 제품 사용 시 반드시 패치 테스트를 진행하세요.");
  }

  // 색소침착 관련 추천
  if (scores.pnScore < 45) {
    recommendations.push("자외선 차단제 사용을 필수적으로 권장합니다.");
    recommendations.push("미백 기능성 제품 사용을 고려해보세요.");
  }

  // 노화도 관련 추천
  if (scores.wtScore < 45) {
    recommendations.push("항산화 성분이 포함된 제품 사용을 권장합니다.");
    recommendations.push("피부 재생과 탄력 개선에 도움되는 성분을 찾아보세요.");
  }

  // 장벽 기능 관련 추천
  if (scores.barrierScore < 50) {
    recommendations.push("피부 장벽 강화에 도움되는 성분(세라마이드, 판테놀 등)이 포함된 제품을 권장합니다.");
  }

  // 생활습관 관련 추천
  if (scores.lifestyleScore < 50) {
    recommendations.push("충분한 수면과 수분 섭취가 피부 건강에 도움이 됩니다.");
    recommendations.push("스트레스 관리와 규칙적인 생활습관 개선을 권장합니다.");
  }

  return recommendations;
}

// D/O 점수 계산 (건성/지성)
function calculateDOScore(data: SurveyData): number {
  let score = 50;

  if (data.morning_skin_condition) {
    score += Math.round((data.morning_skin_condition - 3) * 10);
  }

  if (data.daily_oil_pattern) {
    score += Math.round((data.daily_oil_pattern - 3) * 8);
  }

  if (data.makeup_change) {
    score += Math.round((data.makeup_change - 3) * 6);
  }

  if (data.preferred_skincare_texture) {
    score += Math.round((data.preferred_skincare_texture - 3) * 6);
  }

  return Math.round(Math.max(0, Math.min(100, score)));
}

// S/R 점수 계산 (민감성/저항성)
function calculateSRScore(data: SurveyData): number {
  let score = 50;

  if (data.new_product_reaction) {
    score -= Math.round((data.new_product_reaction - 3) * 10);
  }

  if (data.external_factors_sensitivity && Array.isArray(data.external_factors_sensitivity)) {
    const checkedCount = data.external_factors_sensitivity.length;
    if (checkedCount >= 5) score -= 20;
    else if (checkedCount >= 3) score -= 10;
    else if (checkedCount >= 1) score -= 5;
  }

  if (data.chemical_reaction) {
    score -= Math.round((data.chemical_reaction - 3) * 8);
  }

  if (data.skin_condition_check && Array.isArray(data.skin_condition_check)) {
    const checkedCount = data.skin_condition_check.length;
    if (checkedCount >= 3) score -= 15;
    else if (checkedCount >= 2) score -= 10;
    else if (checkedCount >= 1) score -= 5;
  }

  return Math.round(Math.max(0, Math.min(100, score)));
}

// P/N 점수 계산 (색소침착/비색소침착)
function calculatePNScore(data: SurveyData): number {
  let score = 50;

  if (data.uv_reaction) {
    score -= Math.round((data.uv_reaction - 3) * 10);
  }

  if (data.pigmentation_level) {
    score -= Math.round((data.pigmentation_level - 3) * 10);
  }

  if (data.skin_tone_uniformity) {
    score -= Math.round((data.skin_tone_uniformity - 3) * 8);
  }

  if (data.pigmentation_factors) {
    score -= Math.round((data.pigmentation_factors - 3) * 7);
  }

  return Math.round(Math.max(0, Math.min(100, score)));
}

// W/T 점수 계산 (주름/탄력)
function calculateWTScore(data: SurveyData): number {
  let score = 50;

  if (data.wrinkle_state) {
    score -= Math.round((data.wrinkle_state - 3) * 10);
  }

  if (data.skin_elasticity) {
    score -= Math.round((data.skin_elasticity - 3) * 10);
  }

  if (data.skin_recovery) {
    score -= Math.round((data.skin_recovery - 3) * 8);
  }

  if (data.age_range) {
    score -= Math.round((data.age_range - 3) * 7);
  }

  return Math.round(Math.max(0, Math.min(100, score)));
}

// 피부 장벽 기능 점수 계산
function calculateBarrierScore(data: SurveyData): number {
  let score = 50;

  if (data.irritation_recovery) {
    score += Math.round((data.irritation_recovery - 3) * 10);
  }

  if (data.barrier_damage_frequency) {
    score += Math.round((data.barrier_damage_frequency - 3) * 10);
  }

  if (data.moisturizer_effect) {
    score += Math.round((data.moisturizer_effect - 3) * 8);
  }

  if (data.barrier_damage_symptoms && Array.isArray(data.barrier_damage_symptoms)) {
    const checkedCount = data.barrier_damage_symptoms.length;
    if (checkedCount >= 5) score -= 20;
    else if (checkedCount >= 3) score -= 15;
    else if (checkedCount >= 1) score -= 7;
  }

  return Math.round(Math.max(0, Math.min(100, score)));
}

// 생활 습관 점수 계산
function calculateLifestyleScore(data: SurveyData): number {
  let score = 50;

  if (data.living_environment) {
    score += Math.round((data.living_environment - 3) * 7);
  }

  if (data.sleep_stress) {
    score += Math.round((data.sleep_stress - 3) * 10);
  }

  if (data.diet_habits && Array.isArray(data.diet_habits)) {
    const checkedCount = data.diet_habits.length;
    if (checkedCount >= 4) score -= 20;
    else if (checkedCount >= 2) score -= 10;
    else if (checkedCount >= 1) score -= 5;
  }

  if (data.seasonal_changes) {
    score += Math.round((data.seasonal_changes - 3) * 6);
  }

  if (data.hormonal_changes) {
    score += Math.round((data.hormonal_changes - 3) * 5);
  }

  return Math.round(Math.max(0, Math.min(100, score)));
}

// 맞춤형 피부 타입 설명
export function getSkinTypeDescription(skinType: SkinTypeString): string {
  const descriptions: Record<SkinTypeString, string> = {
    DSPT: "건성, 민감성, 색소침착, 탄력형 피부로 건조함이 있고 외부 자극에 쉽게 반응하며, 색소침착이 있으면서 아직 탄력이 있는 피부입니다.",
    DSNT: "건성, 민감성, 비색소침착, 탄력형 피부로 건조하고 외부 자극에 쉽게 반응하며, 색소침착은 적으면서 탄력이 있는 피부입니다.",
    DSPW: "건성, 민감성, 색소침착, 주름형 피부로 건조하고 외부 자극에 쉽게 반응하며, 색소침착과 주름이 나타나는 피부입니다.",
    DSNW: "건성, 민감성, 비색소침착, 주름형 피부로 건조하고 민감하며, 색소침착은 적지만 주름이 있는 피부입니다.",
    DRPT: "건성, 저항성, 색소침착, 탄력형 피부로 건조하지만 외부 자극에 강하며, 색소침착이 있으면서 탄력이 있는 피부입니다.",
    DRNT: "건성, 저항성, 비색소침착, 탄력형 피부로 건조하지만 외부 자극에 강하며, 색소침착이 적고 탄력이 있는 피부입니다.",
    DRPW: "건성, 저항성, 색소침착, 주름형 피부로 건조하지만 외부 자극에 강하며, 색소침착과 주름이 나타나는 피부입니다.",
    DRNW: "건성, 저항성, 비색소침착, 주름형 피부로 건조하지만 외부 자극에 강하며, 색소침착은 적지만 주름이 있는 피부입니다.",
    OSPT: "지성, 민감성, 색소침착, 탄력형 피부로 유분이 많고 외부 자극에 쉽게 반응하며, 색소침착이 있으면서 탄력이 있는 피부입니다.",
    OSNT: "지성, 민감성, 비색소침착, 탄력형 피부로 유분이 많고 외부 자극에 쉽게 반응하며, 색소침착은 적고 탄력이 있는 피부입니다.",
    OSPW: "지성, 민감성, 색소침착, 주름형 피부로 유분이 많고 외부 자극에 쉽게 반응하며, 색소침착과 주름이 나타나는 피부입니다.",
    OSNW: "지성, 민감성, 비색소침착, 주름형 피부로 유분이 많고 외부 자극에 쉽게 반응하며, 색소침착은 적지만 주름이 있는 피부입니다.",
    ORPT: "지성, 저항성, 색소침착, 탄력형 피부로 유분이 많지만 외부 자극에 강하며, 색소침착이 있으면서 탄력이 있는 피부입니다.",
    ORNT: "지성, 저항성, 비색소침착, 탄력형 피부로 유분이 많지만 외부 자극에 강하며, 색소침착이 적고 탄력이 있는 피부입니다.",
    ORPW: "지성, 저항성, 색소침착, 주름형 피부로 유분이 많지만 외부 자극에 강하며, 색소침착과 주름이 나타나는 피부입니다.",
    ORNW: "지성, 저항성, 비색소침착, 주름형 피부로 유분이 많지만 외부 자극에 강하며, 색소침착은 적지만 주름이 있는 피부입니다.",
  };

  return (
    descriptions[skinType] ||
    "피부 타입에 맞는 제품과 관리 방법을 선택하는 것이 중요합니다."
  );
}

// 피부 타입별 간단 설명
export function getSimpleSkinTypeDescription(skinType: SkinTypeString): string {
  const firstLetter = skinType.charAt(0);
  const secondLetter = skinType.charAt(1);
  const thirdLetter = skinType.charAt(2);
  const fourthLetter = skinType.charAt(3);

  let description = "";

  // D/O (건성/지성)
  if (firstLetter === "D") {
    description += "건성 피부: 피부가 건조하고 당김이 있어요. ";
  } else if (firstLetter === "O") {
    description += "지성 피부: 유분이 많이 분비되는 경향이 있어요. ";
  }

  // S/R (민감성/저항성)
  if (secondLetter === "S") {
    description += "민감성 피부: 외부 자극에 예민하게 반응해요. ";
  } else if (secondLetter === "R") {
    description += "저항성 피부: 대부분의 제품을 무리 없이 사용할 수 있어요. ";
  }

  // P/N (색소침착/비색소침착)
  if (thirdLetter === "P") {
    description += "색소침착 피부: 기미, 잡티가 생기기 쉬워요. ";
  } else if (thirdLetter === "N") {
    description += "비색소침착 피부: 잡티나 기미가 잘 생기지 않아요. ";
  }

  // W/T (주름/탄력)
  if (fourthLetter === "W") {
    description += "주름형 피부: 주름이 생기기 쉬운 특성이 있어요.";
  } else if (fourthLetter === "T") {
    description += "탄력형 피부: 피부 탄력이 비교적 잘 유지되는 특성이 있어요.";
  }

  return description;
}
