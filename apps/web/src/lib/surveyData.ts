import { baumannSurveyQuestions, categoryTitles, getQuestionsByCategory } from './surveyQuestions';

export interface SurveyData {
  [key: string]: any;
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
export const surveyQuestions = baumannSurveyQuestions;

// 바우만 피부 타입 분석 함수
export function analyzeBaumannSkinType(data: SurveyData) {
  // D/O (건성/지성) 분석
  const doScore = calculateDOScore(data);
  const doType = doScore < 50 ? "D" : "O";

  // S/R (민감성/저항성) 분석
  const srScore = calculateSRScore(data);
  const srType = srScore < 50 ? "S" : "R";

  // P/N (색소침착/비색소침착) 분석
  const pnScore = calculatePNScore(data);
  const pnType = pnScore < 50 ? "P" : "N";

  // W/T (주름/탄력) 분석
  const wtScore = calculateWTScore(data);
  const wtType = wtScore < 50 ? "W" : "T";

  // 피부 장벽 기능 점수
  const barrierScore = calculateBarrierScore(data);
  
  // 생활 습관 점수
  const lifestyleScore = calculateLifestyleScore(data);

  return {
    skinType: `${doType}${srType}${pnType}${wtType}`,
    scores: {
      doScore,
      srScore,
      pnScore,
      wtScore,
      barrierScore,
      lifestyleScore
    }
  };
}

// D/O 점수 계산 (건성/지성)
function calculateDOScore(data: SurveyData): number {
  let score = 50; // 중간값에서 시작

  // 아침 피부 상태
  if (data.morning_skin_condition) {
    score += (data.morning_skin_condition - 3) * 10;
  }
  
  // 하루 중 유분 패턴
  if (data.daily_oil_pattern) {
    score += (data.daily_oil_pattern - 3) * 8;
  }

  // 메이크업 후 변화
  if (data.makeup_change) {
    score += (data.makeup_change - 3) * 6;
  }

  // 선호하는 스킨케어 제품 텍스처
  if (data.preferred_skincare_texture) {
    score += (data.preferred_skincare_texture - 3) * 6;
  }

  return Math.max(0, Math.min(100, score));
}

// S/R 점수 계산 (민감성/저항성)
function calculateSRScore(data: SurveyData): number {
  let score = 50;

  // 새 제품 반응
  if (data.new_product_reaction) {
    score -= (data.new_product_reaction - 3) * 10;
  }
  
  // X개 외부 요인에 민감함
  if (data.external_factors_sensitivity && Array.isArray(data.external_factors_sensitivity)) {
    // 체크 수에 따라 점수 계산: 체크가 많을수록 민감한 피부(S)
    const checkedCount = data.external_factors_sensitivity.length;
    if (checkedCount >= 5) score -= 20;
    else if (checkedCount >= 3) score -= 10;
    else if (checkedCount >= 1) score -= 5;
  }

  // 화학성분 반응
  if (data.chemical_reaction) {
    score -= (data.chemical_reaction - 3) * 8;
  }

  // 피부 상태 체크
  if (data.skin_condition_check && Array.isArray(data.skin_condition_check)) {
    // 체크 수에 따라 점수 계산
    const checkedCount = data.skin_condition_check.length;
    if (checkedCount >= 3) score -= 15;
    else if (checkedCount >= 2) score -= 10;
    else if (checkedCount >= 1) score -= 5;
  }

  return Math.max(0, Math.min(100, score));
}

// P/N 점수 계산 (색소침착/비색소침착)
function calculatePNScore(data: SurveyData): number {
  let score = 50;

  // 자외선 반응
  if (data.uv_reaction) {
    score -= (data.uv_reaction - 3) * 10;
  }
  
  // 색소침착 정도
  if (data.pigmentation_level) {
    score -= (data.pigmentation_level - 3) * 10;
  }

  // 피부톤 균일도
  if (data.skin_tone_uniformity) {
    score -= (data.skin_tone_uniformity - 3) * 8;
  }

  // 색소침착 요인
  if (data.pigmentation_factors) {
    score -= (data.pigmentation_factors - 3) * 7;
  }

  return Math.max(0, Math.min(100, score));
}

// W/T 점수 계산 (주름/탄력)
function calculateWTScore(data: SurveyData): number {
  let score = 50;

  // 주름 상태
  if (data.wrinkle_state) {
    score -= (data.wrinkle_state - 3) * 10;
  }
  
  // 탄력 상태
  if (data.skin_elasticity) {
    score -= (data.skin_elasticity - 3) * 10;
  }
  
  // 피부 회복력
  if (data.skin_recovery) {
    score -= (data.skin_recovery - 3) * 8;
  }
  
  // 나이 고려
  if (data.age_range) {
    score -= (data.age_range - 3) * 7;
  }

  return Math.max(0, Math.min(100, score));
}

// 피부 장벽 기능 점수 계산
function calculateBarrierScore(data: SurveyData): number {
  let score = 50;

  // 자극 회복 속도
  if (data.irritation_recovery) {
    score += (data.irritation_recovery - 3) * 10;
  }

  // 장벽 손상 빈도
  if (data.barrier_damage_frequency) {
    score += (data.barrier_damage_frequency - 3) * 10;
  }

  // 보습제 효과 지속시간
  if (data.moisturizer_effect) {
    score += (data.moisturizer_effect - 3) * 8;
  }

  // 장벽 손상 증상
  if (data.barrier_damage_symptoms && Array.isArray(data.barrier_damage_symptoms)) {
    const checkedCount = data.barrier_damage_symptoms.length;
    if (checkedCount >= 5) score -= 20;
    else if (checkedCount >= 3) score -= 15;
    else if (checkedCount >= 1) score -= 7;
  }

  return Math.max(0, Math.min(100, score));
}

// 생활 습관 점수 계산
function calculateLifestyleScore(data: SurveyData): number {
  let score = 50;

  // 생활 환경
  if (data.living_environment) {
    score += (data.living_environment - 3) * 7;
  }

  // 수면과 스트레스
  if (data.sleep_stress) {
    score += (data.sleep_stress - 3) * 10;
  }

  // 식습관
  if (data.diet_habits && Array.isArray(data.diet_habits)) {
    const checkedCount = data.diet_habits.length;
    if (checkedCount >= 4) score -= 20;
    else if (checkedCount >= 2) score -= 10;
    else if (checkedCount >= 1) score -= 5;
  }

  // 계절 변화
  if (data.seasonal_changes) {
    score += (data.seasonal_changes - 3) * 6;
  }

  // 호르몬 변화
  if (data.hormonal_changes) {
    score += (data.hormonal_changes - 3) * 5;
  }

  return Math.max(0, Math.min(100, score));
}

// 바우만 피부 타입 설명
export function getBaumannTypeDescription(skinType: string): string {
  const descriptions: {[key: string]: string} = {
    "DSPT": "건성, 민감성, 색소침착, 탄력형 피부로 건조함이 있고 외부 자극에 쉽게 반응하며, 색소침착이 있으면서 아직 탄력이 있는 피부입니다.",
    "DSNT": "건성, 민감성, 비색소침착, 탄력형 피부로 건조하고 외부 자극에 쉽게 반응하며, 색소침착은 적으면서 탄력이 있는 피부입니다.",
    "DSPW": "건성, 민감성, 색소침착, 주름형 피부로 건조하고 외부 자극에 쉽게 반응하며, 색소침착과 주름이 나타나는 피부입니다.",
    "DSNW": "건성, 민감성, 비색소침착, 주름형 피부로 건조하고 민감하며, 색소침착은 적지만 주름이 있는 피부입니다.",
    "DRPT": "건성, 저항성, 색소침착, 탄력형 피부로 건조하지만 외부 자극에 강하며, 색소침착이 있으면서 탄력이 있는 피부입니다.",
    "DRNT": "건성, 저항성, 비색소침착, 탄력형 피부로 건조하지만 외부 자극에 강하며, 색소침착이 적고 탄력이 있는 피부입니다.",
    "DRPW": "건성, 저항성, 색소침착, 주름형 피부로 건조하지만 외부 자극에 강하며, 색소침착과 주름이 나타나는 피부입니다.",
    "DRNW": "건성, 저항성, 비색소침착, 주름형 피부로 건조하지만 외부 자극에 강하며, 색소침착은 적지만 주름이 있는 피부입니다.",
    "OSPT": "지성, 민감성, 색소침착, 탄력형 피부로 유분이 많고 외부 자극에 쉽게 반응하며, 색소침착이 있으면서 탄력이 있는 피부입니다.",
    "OSNT": "지성, 민감성, 비색소침착, 탄력형 피부로 유분이 많고 외부 자극에 쉽게 반응하며, 색소침착은 적고 탄력이 있는 피부입니다.",
    "OSPW": "지성, 민감성, 색소침착, 주름형 피부로 유분이 많고 외부 자극에 쉽게 반응하며, 색소침착과 주름이 나타나는 피부입니다.",
    "OSNW": "지성, 민감성, 비색소침착, 주름형 피부로 유분이 많고 외부 자극에 쉽게 반응하며, 색소침착은 적지만 주름이 있는 피부입니다.",
    "ORPT": "지성, 저항성, 색소침착, 탄력형 피부로 유분이 많지만 외부 자극에 강하며, 색소침착이 있으면서 탄력이 있는 피부입니다.",
    "ORNT": "지성, 저항성, 비색소침착, 탄력형 피부로 유분이 많지만 외부 자극에 강하며, 색소침착이 적고 탄력이 있는 피부입니다.",
    "ORPW": "지성, 저항성, 색소침착, 주름형 피부로 유분이 많지만 외부 자극에 강하며, 색소침착과 주름이 나타나는 피부입니다.",
    "ORNW": "지성, 저항성, 비색소침착, 주름형 피부로 유분이 많지만 외부 자극에 강하며, 색소침착은 적지만 주름이 있는 피부입니다.",
  };
  
  return descriptions[skinType] || "피부 타입에 맞는 제품과 관리 방법을 선택하는 것이 중요합니다.";
}

// 피부 타입별 간단 설명
export function getSimpleSkinTypeDescription(skinType: string): string {
  const firstLetter = skinType.charAt(0);
  const secondLetter = skinType.charAt(1);
  const thirdLetter = skinType.charAt(2);
  const fourthLetter = skinType.charAt(3);
  
  let description = "";
  
  // D/O (건성/지성)
  if (firstLetter === 'D') {
    description += "건성 피부: 피부가 건조하고 당김이 있어요. ";
  } else if (firstLetter === 'O') {
    description += "지성 피부: 유분이 많이 분비되는 경향이 있어요. ";
  }
  
  // S/R (민감성/저항성)
  if (secondLetter === 'S') {
    description += "민감성 피부: 외부 자극에 예민하게 반응해요. ";
  } else if (secondLetter === 'R') {
    description += "저항성 피부: 대부분의 제품을 무리 없이 사용할 수 있어요. ";
  }
  
  // P/N (색소침착/비색소침착)
  if (thirdLetter === 'P') {
    description += "색소침착 피부: 기미, 잡티가 생기기 쉬워요. ";
  } else if (thirdLetter === 'N') {
    description += "비색소침착 피부: 잡티나 기미가 잘 생기지 않아요. ";
  }
  
  // W/T (주름/탄력)
  if (fourthLetter === 'W') {
    description += "주름형 피부: 주름이 생기기 쉬운 특성이 있어요.";
  } else if (fourthLetter === 'T') {
    description += "탄력형 피부: 피부 탄력이 비교적 잘 유지되는 특성이 있어요.";
  }
  
  return description;
}