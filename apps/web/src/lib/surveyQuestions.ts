// 설문 질문 타입 정의
export type QuestionType = "radio" | "checkbox" | "slider" | "text";
export type QuestionCategory = "DO" | "SR" | "PN" | "WT" | "barrier" | "lifestyle";

export interface QuestionOption<T = string | number> {
  id: string;
  text: string;
  value: T;
}

export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  labels?: string[];
}

export interface SurveyQuestion {
  id: string;
  type: QuestionType;
  question: string;
  description?: string;
  category: QuestionCategory;
  options?: QuestionOption[];
  sliderConfig?: SliderConfig;
  imageUrl?: string;
}

// 질문 카테고리별 타이틀 정의
export const categoryTitles = {
  DO: "유수분 밸런스 진단",
  SR: "피부 민감도 진단",
  PN: "색소침착 진단",
  WT: "노화도 진단",
  barrier: "피부 장벽 기능 진단",
  lifestyle: "생활 환경 및 습관 진단"
};

// 맞춤형 피부 타입 분류를 위한 설문 질문 데이터
export const skinTypeSurveyQuestions: SurveyQuestion[] = [
  // 유수분 밸런스 진단 (D/O 지표)
  {
    id: "morning_skin_condition",
    type: "radio",
    category: "DO",
    question: "아침에 세안 후 30분 동안 아무것도 바르지 않으면 피부는 어떤 상태가 되나요?",
    options: [
      { id: "very_dry", text: "피부가 심하게 당기고 각질이 일어난다", value: 1 },
      { id: "slightly_dry", text: "피부가 약간 당기고 건조하게 느껴진다", value: 2 },
      { id: "normal", text: "별다른 변화가 없다 (당김도 번들거림도 없음)", value: 3 },
      { id: "slightly_oily", text: "T존(이마, 코, 턱)이 약간 번들거린다", value: 4 },
      { id: "very_oily", text: "얼굴 전체가 기름종이가 필요할 정도로 번들거린다", value: 5 },
    ],
  },
  {
    id: "daily_oil_pattern",
    type: "radio",
    category: "DO",
    question: "하루 중 피부의 유분 분비는 어떤 패턴을 보이나요?",
    options: [
      { id: "all_day_dry", text: "하루 종일 건조하며 유분이 거의 없다", value: 1 },
      { id: "mild_combination", text: "T존은 약간 유분이 있고, 볼/광대는 건조하다 (약한 복합성)", value: 2 },
      { id: "typical_combination", text: "T존은 유분이 많고, 볼/광대는 보통이거나 건조하다 (전형적인 복합성)", value: 3 },
      { id: "mild_oily", text: "전체적으로 약간의 유분이 있으나 심하지 않다", value: 4 },
      { id: "very_oily", text: "하루 중 자주 유분이 번들거려 기름종이/파우더가 필요하다", value: 5 },
    ],
  },
  {
    id: "makeup_change",
    type: "radio",
    category: "DO",
    question: "메이크업 후 피부 변화는 어떠한가요?",
    options: [
      { id: "flaky", text: "메이크업이 들뜨고 각질이 부각된다", value: 1 },
      { id: "t_zone_oily", text: "T존만 2-3시간 후 번들거리고 나머지는 건조해진다", value: 2 },
      { id: "gradually_oily", text: "4-5시간 후 전체적으로 번들거리기 시작한다", value: 3 },
      { id: "quickly_oily", text: "2-3시간만에 메이크업이 무너지고 유분이 분비된다", value: 4 },
      { id: "very_quickly_oily", text: "1-2시간 내에 메이크업이 밀리고 유분이 많이 묻어난다", value: 5 },
    ],
  },
  {
    id: "preferred_skincare_texture",
    type: "radio",
    category: "DO",
    question: "현재 사용 중인 스킨케어 제품의 텍스처는 무엇인가요? (효과가 가장 좋은 제품 기준)",
    options: [
      { id: "rich_cream", text: "리치 크림, 오일, 밤 등 고영양 제품 (건성 피부용)", value: 1 },
      { id: "medium_cream", text: "크림, 에멀젼 등 중간 보습력 제품", value: 2 },
      { id: "combination", text: "T존과 볼에 다른 제품을 사용한다 (복합성 피부용)", value: 3 },
      { id: "light_lotion", text: "가벼운 로션, 젤 타입 제품", value: 4 },
      { id: "oil_free", text: "오일프리, 수분 중심 제품 (지성 피부용)", value: 5 },
    ],
  },

  // 피부 민감도 진단 (S/R 지표)
  {
    id: "new_product_reaction",
    type: "radio",
    category: "SR",
    question: "새로운 화장품을 처음 사용했을 때 피부 반응은 어떠한가요?",
    options: [
      { id: "immediate_reaction", text: "즉시 붉어짐, 가려움, 따가움 등의 자극 반응이 나타난다", value: 1 },
      { id: "mild_reaction", text: "사용 후 몇 시간 내에 경미한 자극 반응이 종종 나타난다", value: 2 },
      { id: "selective_reaction", text: "일부 제품에만 반응하며 사용 전 테스트가 필요하다", value: 3 },
      { id: "rarely_reaction", text: "대부분의 제품에 특별한 반응 없이 잘 사용한다", value: 4 },
      { id: "no_reaction", text: "어떤 제품도 거의 자극 없이 사용할 수 있다", value: 5 },
    ],
  },
  {
    id: "external_factors_sensitivity",
    type: "checkbox",
    category: "SR",
    question: "다음 외부 요인에 피부가 민감하게 반응하나요?",
    description: "해당되는 항목을 모두 선택해주세요.",
    options: [
      { id: "temperature", text: "온도변화", value: "temperature" },
      { id: "uv", text: "자외선", value: "uv" },
      { id: "dust", text: "미세먼지", value: "dust" },
      { id: "stress", text: "스트레스", value: "stress" },
      { id: "food", text: "특정 음식", value: "food" },
      { id: "alcohol", text: "알코올", value: "alcohol" },
      { id: "fragrance", text: "향료", value: "fragrance" },
      { id: "mask", text: "마스크 착용", value: "mask" },
    ],
  },
  {
    id: "chemical_reaction",
    type: "radio",
    category: "SR",
    question: "알코올, 향료, 특정 화학성분이 함유된 제품 사용 시 반응은?",
    options: [
      { id: "very_reactive", text: "즉시 붉어짐, 따가움, 화끈거림이 나타난다", value: 1 },
      { id: "mostly_reactive", text: "대부분 자극을 느끼며 피부가 빨갛게 변한다", value: 2 },
      { id: "sometimes_reactive", text: "가끔 가벼운 자극을 느낀다", value: 3 },
      { id: "rarely_reactive", text: "거의 자극을 느끼지 않는다", value: 4 },
      { id: "never_reactive", text: "전혀 자극 없이 사용할 수 있다", value: 5 },
    ],
  },
  {
    id: "skin_condition_check",
    type: "checkbox",
    category: "SR",
    question: "현재 본인의 피부 상태에 해당하는 것은?",
    description: "해당되는 항목을 모두 선택해주세요.",
    options: [
      { id: "thin_vascular", text: "피부가 얇고 혈관이 비침", value: "thin_vascular" },
      { id: "easily_red", text: "쉽게 붉어짐", value: "easily_red" },
      { id: "easily_itchy", text: "쉽게 가려움", value: "easily_itchy" },
      { id: "allergies", text: "특정 성분에 알레르기", value: "allergies" },
    ],
  },

  // 색소침착 진단 (P/N 지표)
  {
    id: "uv_reaction",
    type: "radio",
    category: "PN",
    question: "자외선 노출 시 피부 반응은 어떠한가요?",
    options: [
      { id: "darkens_persists", text: "쉽게 탄 후 오래 지속되며 점점 짙어진다", value: 1 },
      { id: "darkens_slowly", text: "쉽게 탄 후 쉽게 돌아오지 않는다", value: 2 },
      { id: "darkens_recovers", text: "약간 탄 후 1-2주 내에 원래 톤으로 돌아온다", value: 3 },
      { id: "rarely_darkens", text: "잘 타지 않는 편이다", value: 4 },
      { id: "never_darkens", text: "거의 타지 않고 햇빛에 오래 노출 시 화상만 입는다", value: 5 },
    ],
  },
  {
    id: "pigmentation_level",
    type: "radio",
    category: "PN",
    question: "피부의 색소침착 정도는 어떠한가요?",
    options: [
      { id: "heavy_pigmentation", text: "기미, 주근깨, 잡티가 넓은 부위에 뚜렷하게 나타난다", value: 1 },
      { id: "noticeable_pigmentation", text: "색소침착이 눈에 띄며 점점 증가하는 경향이 있다", value: 2 },
      { id: "mild_pigmentation", text: "약간의 색소침착이 있으나 크게 변화가 없다", value: 3 },
      { id: "minimal_pigmentation", text: "미미한 색소침착만 있거나 거의 없다", value: 4 },
      { id: "no_pigmentation", text: "색소침착이 전혀 없으며 피부톤이 균일하다", value: 5 },
    ],
  },
  {
    id: "skin_tone_uniformity",
    type: "radio",
    category: "PN",
    question: "피부톤의 균일도는 어떠한가요?",
    options: [
      { id: "very_uneven", text: "매우 불균일 (여러 부위에 색조 차이가 뚜렷함)", value: 1 },
      { id: "somewhat_uneven", text: "다소 불균일 (특정 부위에 색조 차이가 있음)", value: 2 },
      { id: "neutral", text: "보통 (약간의 색조 차이가 있으나 심하지 않음)", value: 3 },
      { id: "mostly_even", text: "대체로 균일 (약간의 차이만 있거나 거의 없음)", value: 4 },
      { id: "completely_even", text: "완전히 균일 (색조 차이가 전혀 없음)", value: 5 },
    ],
  },
  {
    id: "pigmentation_factors",
    type: "radio",
    category: "PN",
    question: "피부 톤 변화나 색소침착에 영향을 주는 요인은?",
    options: [
      { id: "easily_affected", text: "자외선 노출, 호르몬 변화, 스트레스 등 여러 요인에 쉽게 영향받음", value: 1 },
      { id: "uv_sensitive", text: "주로 자외선 노출에 크게 영향받음", value: 2 },
      { id: "long_term_uv", text: "장기간 자외선 노출 시에만 영향받음", value: 3 },
      { id: "rarely_affected", text: "특별한 요인에 거의 영향받지 않음", value: 4 },
      { id: "never_affected", text: "어떤 요인에도 피부 톤이 변하지 않음", value: 5 },
    ],
  },

  // 노화도 진단 (W/T 지표)
  {
    id: "wrinkle_state",
    type: "radio",
    category: "WT",
    question: "표정을 지을 때와 풀었을 때 주름 상태는 어떤가요?",
    options: [
      { id: "deep_wrinkles", text: "표정을 풀어도 깊은 주름이 선명하게 남아있다", value: 1 },
      { id: "visible_wrinkles", text: "표정을 풀면 주름이 옅어지지만 여전히 보인다", value: 2 },
      { id: "expression_wrinkles", text: "표정을 짓는 동안에만 주름이 나타난다", value: 3 },
      { id: "minor_wrinkles", text: "강한 표정을 지을 때만 미세한 주름이 생긴다", value: 4 },
      { id: "no_wrinkles", text: "어떤 표정을 지어도 주름이 거의 생기지 않는다", value: 5 },
    ],
  },
  {
    id: "skin_elasticity",
    type: "radio",
    category: "WT",
    question: "피부 탄력과 처짐 정도는 어떠한가요?",
    options: [
      { id: "very_saggy", text: "피부가 확연히 처지고 탄력이 많이 떨어졌다", value: 1 },
      { id: "slightly_saggy", text: "피부가 약간 처지고 탄력이 감소했다", value: 2 },
      { id: "mild_elasticity_loss", text: "탄력이 약간 떨어졌으나 처짐은 없다", value: 3 },
      { id: "good_elasticity", text: "탄력이 대체로 유지되고 있다", value: 4 },
      { id: "excellent_elasticity", text: "탄력이 매우 좋고 피부가 단단하다", value: 5 },
    ],
  },
  {
    id: "skin_recovery",
    type: "radio",
    category: "WT",
    question: "피부 회복력은 어떠한가요? (피부 손상, 여드름 등 회복 속도)",
    options: [
      { id: "very_slow", text: "매우 느리게 회복된다 (상처가 오래 남고 흔적이 잘 지워지지 않음)", value: 1 },
      { id: "slow", text: "느린 편이다 (회복에 평균보다 시간이 더 걸림)", value: 2 },
      { id: "average", text: "보통이다 (일반적인 회복 속도)", value: 3 },
      { id: "fast", text: "빠른 편이다 (회복이 평균보다 빠름)", value: 4 },
      { id: "very_fast", text: "매우 빠르게 회복된다 (상처나 자국이 빨리 사라짐)", value: 5 },
    ],
  },
  {
    id: "age_range",
    type: "radio",
    category: "WT",
    question: "현재 연령대를 알려주세요. (분석 정확도를 위한 참고 정보)",
    options: [
      { id: "over_45", text: "45세 이상", value: 1 },
      { id: "35_44", text: "35-44세", value: 2 },
      { id: "25_34", text: "25-34세", value: 3 },
      { id: "18_24", text: "18-24세", value: 4 },
      { id: "under_17", text: "17세 이하", value: 5 },
    ],
  },

  // 피부 장벽 기능 진단
  {
    id: "irritation_recovery",
    type: "radio",
    category: "barrier",
    question: "특정 자극(화학성분, 강한 각질제거제, 레이저 시술 등) 후 피부 회복 속도는?",
    options: [
      { id: "very_slow", text: "매우 느리다 (7일 이상)", value: 1 },
      { id: "slow", text: "느린 편이다 (4-6일)", value: 2 },
      { id: "average", text: "보통이다 (2-3일)", value: 3 },
      { id: "fast", text: "빠른 편이다 (1-2일)", value: 4 },
      { id: "very_fast", text: "매우 빠르다 (24시간 이내)", value: 5 },
    ],
  },
  {
    id: "barrier_damage_frequency",
    type: "radio",
    category: "barrier",
    question: "피부 장벽 손상 징후가 나타나는 빈도는? (당김, 각질, 작열감 등)",
    options: [
      { id: "very_frequent", text: "매우 자주 (거의 항상 느껴짐)", value: 1 },
      { id: "frequent", text: "자주 (일주일에 3-4회 이상)", value: 2 },
      { id: "occasional", text: "가끔 (일주일에 1-2회)", value: 3 },
      { id: "rare", text: "드물게 (한 달에 1-2회)", value: 4 },
      { id: "almost_never", text: "거의 없음 (연 1-2회 또는 전혀 없음)", value: 5 },
    ],
  },
  {
    id: "moisturizer_effect",
    type: "radio",
    category: "barrier",
    question: "보습제 사용 후 피부 속건조 해소 지속 시간은?",
    options: [
      { id: "very_short", text: "1시간 미만 (금방 건조해짐)", value: 1 },
      { id: "short", text: "1-3시간 (비교적 빨리 건조해짐)", value: 2 },
      { id: "medium", text: "3-6시간 (중간 정도 지속)", value: 3 },
      { id: "long", text: "6-12시간 (대체로 하루 지속)", value: 4 },
      { id: "very_long", text: "12시간 이상 (매우 오래 지속)", value: 5 },
    ],
  },
  {
    id: "barrier_damage_symptoms",
    type: "checkbox",
    category: "barrier",
    question: "피부 장벽 손상 시 다음 증상 중 경험하는 것은?",
    description: "해당되는 항목을 모두 선택해주세요.",
    options: [
      { id: "tingling", text: "따끔거림", value: "tingling" },
      { id: "burning", text: "화끈거림", value: "burning" },
      { id: "tightness", text: "당김", value: "tightness" },
      { id: "flaking", text: "각질", value: "flaking" },
      { id: "itching", text: "가려움", value: "itching" },
      { id: "redness", text: "붉어짐", value: "redness" },
      { id: "dryness", text: "건조함", value: "dryness" },
    ],
  },

  // 생활 환경 및 습관 진단
  {
    id: "living_environment",
    type: "radio",
    category: "lifestyle",
    question: "주로 생활하는 환경은 어떤가요? (하루 중 가장 많은 시간을 보내는 환경)",
    options: [
      { id: "indoor_dry", text: "실내 냉난방 환경 (건조한 사무실/실내, 8시간 이상)", value: 1 },
      { id: "urban_pollution", text: "도심/대기오염 환경 (미세먼지 수치 높은 지역)", value: 2 },
      { id: "high_uv", text: "자외선 노출이 많은 환경 (야외 활동 많음)", value: 3 },
      { id: "humid_variable", text: "다습하거나 온도변화가 큰 환경", value: 4 },
      { id: "natural_pleasant", text: "쾌적한 자연환경 (공기질과 습도가 적절한 환경)", value: 5 },
    ],
  },
  {
    id: "sleep_stress",
    type: "radio",
    category: "lifestyle",
    question: "수면과 스트레스 관리 상태는 어떠한가요?",
    options: [
      { id: "bad_sleep_high_stress", text: "수면 부족(6시간 미만)과 높은 스트레스 상태", value: 1 },
      { id: "irregular_sleep_moderate_stress", text: "불규칙한 수면과 중간 수준의 스트레스", value: 2 },
      { id: "mostly_regular_occasional_stress", text: "대체로 규칙적이나 가끔 수면 부족이나 스트레스 있음", value: 3 },
      { id: "regular_sleep_low_stress", text: "규칙적인 수면(7-8시간)과 낮은 스트레스 수준", value: 4 },
      { id: "good_sleep_managed_stress", text: "충분한 수면과 효과적인 스트레스 관리", value: 5 },
    ],
  },
  {
    id: "diet_habits",
    type: "checkbox",
    category: "lifestyle",
    question: "식습관은 어떠한가요? (피부 건강에 영향을 미치는 항목)",
    description: "해당되는 항목을 모두 선택해주세요.",
    options: [
      { id: "high_sugar", text: "당분/정제 탄수화물 과다 섭취", value: "high_sugar" },
      { id: "spicy_food", text: "매운 음식 자주 섭취", value: "spicy_food" },
      { id: "high_caffeine", text: "카페인 과다 섭취(하루 3잔 이상)", value: "high_caffeine" },
      { id: "frequent_alcohol", text: "음주 빈번(주 3회 이상)", value: "frequent_alcohol" },
      { id: "low_water", text: "물 섭취 부족(하루 1L 미만)", value: "low_water" },
    ],
  },
  {
    id: "seasonal_changes",
    type: "radio",
    category: "lifestyle",
    question: "계절이나 환경 변화에 따른 피부 변화 정도는?",
    options: [
      { id: "dramatic_changes", text: "급격하게 변한다 (완전히 다른 피부 타입으로 변함)", value: 1 },
      { id: "significant_changes", text: "상당히 변한다 (케어 방식 변경 필요)", value: 2 },
      { id: "moderate_changes", text: "어느 정도 변한다 (약간의 조정 필요)", value: 3 },
      { id: "slight_changes", text: "약간 변한다 (큰 변화 없음)", value: 4 },
      { id: "no_changes", text: "거의 변화 없다 (매우 안정적)", value: 5 },
    ],
  },
  {
    id: "hormonal_changes",
    type: "radio",
    category: "lifestyle",
    question: "여성의 경우, 생리 주기나 호르몬 변화에 따른 피부 변화는?",
    options: [
      { id: "significant_changes", text: "매우 뚜렷하다 (여드름, 건조함, 민감도 큰 변화)", value: 1 },
      { id: "noticeable_changes", text: "눈에 띄게 변한다 (약간의 트러블, 유분/수분 변화)", value: 2 },
      { id: "slight_changes", text: "약간 변한다 (미미한 변화만 있음)", value: 3 },
      { id: "minimal_changes", text: "거의 변하지 않는다", value: 4 },
      { id: "no_changes", text: "전혀 변하지 않는다 / 해당 없음", value: 5 },
    ],
  },
];

// 질문을 카테고리별로 가져오는 유틸리티 함수
export function getQuestionsByCategory(category: QuestionCategory): SurveyQuestion[] {
  return skinTypeSurveyQuestions.filter(q => q.category === category);
}

// 전체 질문 개수
export const totalQuestions = skinTypeSurveyQuestions.length; 