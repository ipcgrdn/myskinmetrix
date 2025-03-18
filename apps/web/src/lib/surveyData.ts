export interface SurveyQuestion {
  id: string;
  type: 'radio' | 'checkbox' | 'slider' | 'text';
  question: string;
  description?: string;
  options?: Array<{
    id: string;
    text: string;
    value: any;
  }>;
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    labels?: string[];
  };
  imageUrl?: string;
}

export interface SurveyData {
  [key: string]: any;
}

// 사용자의 설문 응답을 로컬 스토리지에 저장
export function saveUserSurveyData(surveyData: SurveyData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('my-skin-metrix-survey-data', JSON.stringify(surveyData));
  }
}

// 로컬 스토리지에서 사용자의 설문 응답 불러오기
export function getUserSurveyData(): SurveyData | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('my-skin-metrix-survey-data');
    return data ? JSON.parse(data) : null;
  }
  return null;
}

// 마지막으로 완료한 설문 단계 저장
export function saveLastCompletedStep(step: number): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('my-skin-metrix-last-step', step.toString());
  }
}

// 마지막으로 완료한 설문 단계 가져오기
export function getLastCompletedStep(): number {
  if (typeof window !== 'undefined') {
    const step = localStorage.getItem('my-skin-metrix-last-step');
    return step ? parseInt(step, 10) : 0;
  }
  return 0;
}

// 샘플 설문 질문 데이터
export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'skin_type',
    type: 'radio',
    question: '당신의 피부 타입은 어떻게 되나요?',
    description: '평소 느끼는 피부 상태를 기준으로 선택해주세요.',
    options: [
      { id: 'dry', text: '건성 - 당김이 자주 느껴지고 각질이 잘 일어납니다', value: 'dry' },
      { id: 'oily', text: '지성 - 기름기가 많고 번들거리는 경우가 많습니다', value: 'oily' },
      { id: 'combination', text: '복합성 - T존은 지성, 볼 부위는 건성인 편입니다', value: 'combination' },
      { id: 'normal', text: '중성 - 특별한 문제 없이 균형잡힌 상태입니다', value: 'normal' },
      { id: 'sensitive', text: '민감성 - 자극에 쉽게 반응하고 붉어지거나 따갑습니다', value: 'sensitive' }
    ]
  },
  {
    id: 'skin_concern',
    type: 'checkbox',
    question: '현재 가장 고민되는 피부 문제는 무엇인가요?',
    description: '해당되는 사항을 모두 선택해주세요.',
    options: [
      { id: 'acne', text: '여드름/뾰루지', value: 'acne' },
      { id: 'wrinkles', text: '주름', value: 'wrinkles' },
      { id: 'pigmentation', text: '색소침착/기미', value: 'pigmentation' },
      { id: 'pores', text: '모공 확대', value: 'pores' },
      { id: 'dryness', text: '건조함', value: 'dryness' },
      { id: 'oiliness', text: '과다 유분', value: 'oiliness' },
      { id: 'sensitivity', text: '민감성/발적', value: 'sensitivity' },
      { id: 'dullness', text: '칙칙함/톤 불균일', value: 'dullness' }
    ]
  },
  {
    id: 'hydration_level',
    type: 'slider',
    question: '세안 후 아무것도 바르지 않았을 때 피부 당김을 얼마나 느끼시나요?',
    description: '세안 후 30분 경과 시점을 기준으로 답변해주세요.',
    sliderConfig: {
      min: 1,
      max: 5,
      step: 1,
      labels: ['매우 심함', '심함', '보통', '약간', '전혀 없음']
    }
  },
  {
    id: 'oil_production',
    type: 'slider',
    question: '하루 중 피부가 얼마나 번들거리나요?',
    description: '평소 메이크업이나 기초 제품을 바른 상태에서의 경험을 기준으로 답변해주세요.',
    sliderConfig: {
      min: 1,
      max: 5,
      step: 1,
      labels: ['전혀 안 됨', '약간', '보통', '많은 편', '매우 많음']
    }
  },
  {
    id: 'sensitivity_level',
    type: 'radio',
    question: '새로운 스킨케어 제품을 사용했을 때 피부가 어떻게 반응하나요?',
    options: [
      { id: 'very_reactive', text: '매우 민감하게 반응 (붉어짐, 따가움, 발진 등)', value: 'very_reactive' },
      { id: 'sometimes_reactive', text: '가끔 반응함 (제품에 따라 다름)', value: 'sometimes_reactive' },
      { id: 'rarely_reactive', text: '거의 반응하지 않음', value: 'rarely_reactive' },
      { id: 'never_reactive', text: '어떤 제품을 사용해도 거의 반응하지 않음', value: 'never_reactive' }
    ]
  }
];

// 나이대 질문(타입에 따라 추가 제공)
export const ageQuestion: SurveyQuestion = {
  id: 'age_range',
  type: 'radio',
  question: '연령대가 어떻게 되시나요?',
  description: '더 정확한 분석을 위해 알려주세요.',
  options: [
    { id: 'under_20', text: '20세 미만', value: 'under_20' },
    { id: '20s', text: '20-29세', value: '20s' },
    { id: '30s', text: '30-39세', value: '30s' },
    { id: '40s', text: '40-49세', value: '40s' },
    { id: '50s', text: '50-59세', value: '50s' },
    { id: '60_plus', text: '60세 이상', value: '60_plus' }
  ]
}; 