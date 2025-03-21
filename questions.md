# 스마트 피부 타입 분석 시스템

## 1. 설문 구조

### 1.1 기본 프레임워크
- **바우만 피부 타입 분류 시스템** 기반
  - **D/O**: 건성(Dry) / 지성(Oily) / 복합성(Combination)
  - **S/R**: 민감성(Sensitive) / 저항성(Resistant)
  - **P/N**: 색소침착(Pigmented) / 비색소침착(Non-pigmented)
  - **W/T**: 주름형성(Wrinkled) / 탄력있는(Tight)

### 1.2 핵심 평가 지표
1. **유수분 밸런스** (피부 타입 D/O)
2. **민감도** (피부 타입 S/R)
3. **색소침착** (피부 타입 P/N)
4. **노화도** (피부 타입 W/T)
5. **피부 장벽 기능**
6. **생활 환경 및 습관 요인**

### 1.3 최적화된 설문 구조
- **총 문항 수**: 22-24개 핵심 질문 (MBTI 수준)
- **응답 시간**: 5-7분 이내 완료 가능
- **응답 형식**: 
  - 5점 리커트 척도 (전혀 그렇지 않다 ~ 매우 그렇다)
  - 상황 기반 선택형 질문 (MBTI 스타일)
  - 직관적 이미지 선택 옵션
- **적응형 구조**: 초기 응답에 따라 관련 질문만 표시

## 2. 핵심 질문 (타입별 3-4개 질문)

### 2.1 유수분 밸런스 진단 (D/O 지표)

1. **아침에 세안 후 30분 동안 아무것도 바르지 않으면 피부는 어떤 상태가 되나요?**
   - ① 피부가 심하게 당기고 각질이 일어난다
   - ② 피부가 약간 당기고 건조하게 느껴진다
   - ③ 별다른 변화가 없다 (당김도 번들거림도 없음)
   - ④ T존(이마, 코, 턱)이 약간 번들거린다
   - ⑤ 얼굴 전체가 기름종이가 필요할 정도로 번들거린다

2. **하루 중 피부의 유분 분비는 어떤 패턴을 보이나요?**
   - ① 하루 종일 건조하며 유분이 거의 없다
   - ② T존은 약간 유분이 있고, 볼/광대는 건조하다 (약한 복합성)
   - ③ T존은 유분이 많고, 볼/광대는 보통이거나 건조하다 (전형적인 복합성)
   - ④ 전체적으로 약간의 유분이 있으나 심하지 않다
   - ⑤ 하루 중 자주 유분이 번들거려 기름종이/파우더가 필요하다

3. **메이크업 후 피부 변화는 어떠한가요?**
   - ① 메이크업이 들뜨고 각질이 부각된다
   - ② T존만 2-3시간 후 번들거리고 나머지는 건조해진다
   - ③ 4-5시간 후 전체적으로 번들거리기 시작한다
   - ④ 2-3시간만에 메이크업이 무너지고 유분이 분비된다
   - ⑤ 1-2시간 내에 메이크업이 밀리고 유분이 많이 묻어난다

4. **현재 사용 중인 스킨케어 제품의 텍스처는 무엇인가요? (효과가 가장 좋은 제품 기준)**
   - ① 리치 크림, 오일, 밤 등 고영양 제품 (건성 피부용)
   - ② 크림, 에멀젼 등 중간 보습력 제품
   - ③ T존과 볼에 다른 제품을 사용한다 (복합성 피부용)
   - ④ 가벼운 로션, 젤 타입 제품
   - ⑤ 오일프리, 수분 중심 제품 (지성 피부용)

### 2.2 피부 민감도 진단 (S/R 지표)

1. **새로운 화장품을 처음 사용했을 때 피부 반응은 어떠한가요?**
   - ① 즉시 붉어짐, 가려움, 따가움 등의 자극 반응이 나타난다
   - ② 사용 후 몇 시간 내에 경미한 자극 반응이 종종 나타난다
   - ③ 일부 제품에만 반응하며 사용 전 테스트가 필요하다
   - ④ 대부분의 제품에 특별한 반응 없이 잘 사용한다
   - ⑤ 어떤 제품도 거의 자극 없이 사용할 수 있다

2. **다음 외부 요인에 피부가 민감하게 반응하나요? (해당 항목 수)**
   - ① 대부분의 요인에 즉시 반응 (5개 이상 항목에 반응)
   - ② 여러 요인에 종종 반응 (3-4개 항목에 반응)
   - ③ 일부 요인에 가끔 반응 (2-3개 항목에 반응)
   - ④ 특정 요인에만 간혹 반응 (1-2개 항목에 반응)
   - ⑤ 거의 모든 요인에 안정적 (대부분 반응 없음)
   
   *반응 체크 항목: □온도변화 □자외선 □미세먼지 □스트레스 □특정 음식 □알코올 □향료 □마스크 착용

3. **알코올, 향료, 특정 화학성분이 함유된 제품 사용 시 반응은?**
   - ① 즉시 붉어짐, 따가움, 화끈거림이 나타난다
   - ② 대부분 자극을 느끼며 피부가 빨갛게 변한다
   - ③ 가끔 가벼운 자극을 느낀다
   - ④ 거의 자극을 느끼지 않는다
   - ⑤ 전혀 자극 없이 사용할 수 있다

4. **현재 본인의 피부 상태에 해당하는 것은? (해당 항목 수)**
   - ① 모두 해당 (3개 이상)
   - ② 대부분 해당 (2-3개)
   - ③ 일부 해당 (1-2개)
   - ④ 간혹 일시적으로 나타남
   - ⑤ 해당사항 없음
   
   *상태 체크 항목: □피부가 얇고 혈관이 비침 □쉽게 붉어짐 □쉽게 가려움 □특정 성분에 알레르기

### 2.3 색소침착 진단 (P/N 지표)

1. **자외선 노출 시 피부 반응은 어떠한가요?**
   - ① 쉽게 탄 후 오래 지속되며 점점 짙어진다
   - ② 쉽게 탄 후 쉽게 돌아오지 않는다
   - ③ 약간 탄 후 1-2주 내에 원래 톤으로 돌아온다
   - ④ 잘 타지 않는 편이다
   - ⑤ 거의 타지 않고 햇빛에 오래 노출 시 화상만 입는다

2. **피부의 색소침착 정도는 어떠한가요?**
   - ① 기미, 주근깨, 잡티가 넓은 부위에 뚜렷하게 나타난다
   - ② 색소침착이 눈에 띄며 점점 증가하는 경향이 있다
   - ③ 약간의 색소침착이 있으나 크게 변화가 없다
   - ④ 미미한 색소침착만 있거나 거의 없다
   - ⑤ 색소침착이 전혀 없으며 피부톤이 균일하다

3. **피부톤의 균일도는 어떠한가요? (이미지 선택 옵션 제공)**
   - ① 매우 불균일 (여러 부위에 색조 차이가 뚜렷함)
   - ② 다소 불균일 (특정 부위에 색조 차이가 있음)
   - ③ 보통 (약간의 색조 차이가 있으나 심하지 않음)
   - ④ 대체로 균일 (약간의 차이만 있거나 거의 없음)
   - ⑤ 완전히 균일 (색조 차이가 전혀 없음)

4. **피부 톤 변화나 색소침착에 영향을 주는 요인은?**
   - ① 자외선 노출, 호르몬 변화, 스트레스 등 여러 요인에 쉽게 영향받음
   - ② 주로 자외선 노출에 크게 영향받음
   - ③ 장기간 자외선 노출 시에만 영향받음
   - ④ 특별한 요인에 거의 영향받지 않음
   - ⑤ 어떤 요인에도 피부 톤이 변하지 않음

### 2.4 노화도 진단 (W/T 지표)

1. **표정을 지을 때와 풀었을 때 주름 상태는 어떤가요? (이미지 선택 옵션 제공)**
   - ① 표정을 풀어도 깊은 주름이 선명하게 남아있다
   - ② 표정을 풀면 주름이 옅어지지만 여전히 보인다
   - ③ 표정을 짓는 동안에만 주름이 나타난다
   - ④ 강한 표정을 지을 때만 미세한 주름이 생긴다
   - ⑤ 어떤 표정을 지어도 주름이 거의 생기지 않는다

2. **피부 탄력과 처짐 정도는 어떠한가요?**
   - ① 피부가 확연히 처지고 탄력이 많이 떨어졌다
   - ② 피부가 약간 처지고 탄력이 감소했다
   - ③ 탄력이 약간 떨어졌으나 처짐은 없다
   - ④ 탄력이 대체로 유지되고 있다
   - ⑤ 탄력이 매우 좋고 피부가 단단하다

3. **피부 회복력은 어떠한가요? (피부 손상, 여드름 등 회복 속도)**
   - ① 매우 느리게 회복된다 (상처가 오래 남고 흔적이 잘 지워지지 않음)
   - ② 느린 편이다 (회복에 평균보다 시간이 더 걸림)
   - ③ 보통이다 (일반적인 회복 속도)
   - ④ 빠른 편이다 (회복이 평균보다 빠름)
   - ⑤ 매우 빠르게 회복된다 (상처나 자국이 빨리 사라짐)

4. **현재 연령대를 알려주세요. (분석 정확도를 위한 참고 정보)**
   - ① 45세 이상
   - ② 35-44세
   - ③ 25-34세
   - ④ 18-24세
   - ⑤ 17세 이하

### 2.5 피부 장벽 기능 진단

1. **특정 자극(화학성분, 강한 각질제거제, 레이저 시술 등) 후 피부 회복 속도는?**
   - ① 매우 느리다 (7일 이상)
   - ② 느린 편이다 (4-6일)
   - ③ 보통이다 (2-3일)
   - ④ 빠른 편이다 (1-2일)
   - ⑤ 매우 빠르다 (24시간 이내)

2. **피부 장벽 손상 징후가 나타나는 빈도는? (당김, 각질, 작열감 등)**
   - ① 매우 자주 (거의 항상 느껴짐)
   - ② 자주 (일주일에 3-4회 이상)
   - ③ 가끔 (일주일에 1-2회)
   - ④ 드물게 (한 달에 1-2회)
   - ⑤ 거의 없음 (연 1-2회 또는 전혀 없음)

3. **보습제 사용 후 피부 속건조 해소 지속 시간은?**
   - ① 1시간 미만 (금방 건조해짐)
   - ② 1-3시간 (비교적 빨리 건조해짐)
   - ③ 3-6시간 (중간 정도 지속)
   - ④ 6-12시간 (대체로 하루 지속)
   - ⑤ 12시간 이상 (매우 오래 지속)

4. **피부 장벽 손상 시 다음 증상 중 경험하는 것은? (해당 항목 수)**
   - ① 대부분 해당 (4개 이상)
   - ② 여러 항목 해당 (3개)
   - ③ 일부 해당 (2개)
   - ④ 하나만 해당 (1개)
   - ⑤ 해당사항 없음 (0개)
   
   *증상 체크 항목: □따끔거림 □화끈거림 □당김 □각질 □가려움 □붉어짐 □건조함

### 2.6 생활 환경 및 습관 진단

1. **주로 생활하는 환경은 어떤가요? (하루 중 가장 많은 시간을 보내는 환경)**
   - ① 실내 냉난방 환경 (건조한 사무실/실내, 8시간 이상)
   - ② 도심/대기오염 환경 (미세먼지 수치 높은 지역)
   - ③ 자외선 노출이 많은 환경 (야외 활동 많음)
   - ④ 다습하거나 온도변화가 큰 환경
   - ⑤ 쾌적한 자연환경 (공기질과 습도가 적절한 환경)

2. **수면과 스트레스 관리 상태는 어떠한가요?**
   - ① 수면 부족(6시간 미만)과 높은 스트레스 상태
   - ② 불규칙한 수면과 중간 수준의 스트레스
   - ③ 대체로 규칙적이나 가끔 수면 부족이나 스트레스 있음
   - ④ 규칙적인 수면(7-8시간)과 낮은 스트레스 수준
   - ⑤ 충분한 수면과 효과적인 스트레스 관리

3. **식습관은 어떠한가요? (피부 건강에 영향을 미치는 항목)**
   - ① 대부분 해당 (3개 이상)
   - ② 일부 해당 (2개)
   - ③ 약간 해당 (1개)
   - ④ 거의 해당 없음
   - ⑤ 전혀 해당 없음
   
   *습관 체크 항목: □당분/정제 탄수화물 과다 섭취 □매운 음식 자주 섭취 □카페인 과다 섭취(하루 3잔 이상) □음주 빈번(주 3회 이상) □물 섭취 부족(하루 1L 미만)

4. **계절이나 환경 변화에 따른 피부 변화 정도는?**
   - ① 급격하게 변한다 (완전히 다른 피부 타입으로 변함)
   - ② 상당히 변한다 (케어 방식 변경 필요)
   - ③ 어느 정도 변한다 (약간의 조정 필요)
   - ④ 약간 변한다 (큰 변화 없음)
   - ⑤ 거의 변화 없다 (매우 안정적)

5. **여성의 경우, 생리 주기나 호르몬 변화에 따른 피부 변화는?**
   - ① 매우 뚜렷하다 (여드름, 건조함, 민감도 큰 변화)
   - ② 눈에 띄게 변한다 (약간의 트러블, 유분/수분 변화)
   - ③ 약간 변한다 (미미한 변화만 있음)
   - ④ 거의 변하지 않는다
   - ⑤ 전혀 변하지 않는다 / 해당 없음

## 3. 분석 및 결과 제공 방법

### 3.1 과학적 점수 산출 방법
- 각 핵심 지표별 점수 산출 (0-10점)
- 피부과학 근거 기반 가중치 알고리즘 적용
- 신뢰도 검증을 위한 교차 검증 질문 활용
- 정확한 피부 타입 분류를 위한 핵심 지표 종합 분석

### 3.2 바우만 피부 타입 분류
- 16가지 기본 유형 정확하게 분류
  - **D/O/C**: 건성, 지성, 복합성 중 하나로 분류
  - **S/R**: 민감성, 저항성 중 하나로 분류  
  - **P/N**: 색소침착, 비색소침착 중 하나로 분류
  - **W/T**: 주름형성, 탄력있는 중 하나로 분류
- 피부 장벽 기능 및 생활 환경 요인 보조 지표 활용

### 3.3 사용자 친화적 결과 제공
1. **명확한 피부 타입 프로필**
   - 4글자 코드로 피부 타입 제시 (DSPT, ORNT 등)
   - 핵심 특성 요약 (3-5줄 간결한 설명)
   - 타입별 주요 피부 특징 및 피부 케어 우선순위

2. **과학적 피부 분석 시각화**
   - 6가지 핵심 지표 레이더 차트
   - 유사 연령대/환경 대비 상대적 위치
   - 피부 건강 점수 및 개선 가능성 지표

3. **맞춤형 케어 솔루션**
   - 피부 타입별 핵심 관리 요소 (3-5개)
   - 계절/환경 변화 대응 전략
   - 적합한 화장품 성분 및 제형 추천
   - 생활습관 개선 제안

## 4. 설문 신뢰성 확보 방법

### 4.1 과학적 정확성 향상 전략
- 피부과학 전문 용어의 일상적 표현으로 변환
- 객관적 상황 기반 질문으로 주관성 최소화
- 지표별 교차 검증 질문 통한 일관성 확인
- 피부과 전문의 감수 및 임상 데이터 반영

### 4.2 사용자 경험 최적화
- 설문 진행률 시각화 및 예상 소요시간 표시
- 질문당 5-10초 내 응답 가능한 명확한 설명
- 직관적 이미지 선택 옵션 (피부 상태 비교)
- 개인 맞춤형 중간 피드백 제공

### 4.3 지속적 개선 시스템
- 사용자 피드백과 실제 피부 상태 비교 검증
- A/B 테스트를 통한 질문 정확도 향상
- 데이터 축적에 따른 알고리즘 정교화
- 피부과학 최신 연구 반영 정기 업데이트

## 5. 차별화 전략

### 5.1 MBTI식 접근법과 과학적 정확성 결합
- 쉽고 재미있는 MBTI 스타일 + 피부과학적 정확성
- 유형별 명확한 페르소나 및 특성 정의
- 공유하고 싶은 결과 표현 방식 (SNS 공유 기능)
- 과학적 근거와 일상적 경험 연결

### 5.2 데이터 기반 초개인화
- 핵심 질문으로 정확한 피부 타입 진단
- 생활 환경, 습관 요인 반영한 맞춤 솔루션
- 시간에 따른 피부 변화 패턴 예측
- 계절, 환경, 호르몬 변화에 따른 관리법

### 5.3 사용자 참여 및 지속 가치 제공
- 간편한 정기 체크업으로 피부 변화 추적
- 피부 관리 목표 설정 및 달성 과정 시각화
- 유형별 커뮤니티 연결 및 경험 공유
- 맞춤형 피부 케어 콘텐츠 정기 제공

## 6. 개발 및 발전 방향

### 6.1 단계적 기능 확장
- 1단계: 핵심 22-24문항 설문 및 16가지 피부 타입 분류
- 2단계: 선택적 이미지 인식 기능 (피부 진단 보조)
- 3단계: 시간 기반 변화 추적 및 예측 시스템

### 6.2 데이터 활용 전략
- 익명화된 데이터 기반 알고리즘 지속 개선
- 피부 타입별 최적 성분/제품 데이터베이스 구축
- 환경 요인과 피부 반응 상관관계 연구
- 피부과학 전문가 협업 통한 데이터 검증

### 6.3 지속적 사용자 가치 제공
- 피부 상태 변화 리포트 및 개선 추이 분석
- 계절/환경 변화 예측 및 선제적 관리법 제안
- 사용자 피드백 기반 개인화 수준 심화
- 피부 건강 지식 및 최신 트렌드 정보 제공
