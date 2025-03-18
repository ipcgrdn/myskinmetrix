# My Skin Metrix

정확하고 개인화된 피부 분석 서비스를 제공하는 솔루션입니다.

## 프로젝트 개요

My Skin Metrix는 다음과 같은 문제점을 해결하고자 합니다:

- **정확성 부족**: 대부분의 피부 분석은 단순 설문이나 일회성 측정에 의존해 정확도가 낮습니다.
- **접근성 한계**: 전문적인 피부 분석을 받으려면 고가의 피부과나 피부관리실 방문이 필요합니다.
- **맞춤형 솔루션 부재**: 일반적인 피부 타입 분류는 지나치게 단순화되어 있습니다.
- **상업적 편향**: 기존 피부 분석 서비스는 객관적 추천이 어렵습니다.
- **지속적 관리 부족**: 시간에 따른 피부 변화를 추적하는 솔루션이 부족합니다.

## 기술 스택

- **프론트엔드**: Next.js (React), TailwindCSS, Shadcn UI
- **백엔드**: NestJS (TypeScript), PostgreSQL, Prisma
- **AI/ML**: TensorFlow.js, MediaPipe, Python 스크립트
- **인프라**: Turborepo(모노레포), Vercel, AWS

## 프로젝트 구조

이 프로젝트는 모노레포로 구성되어 있으며 다음과 같은 패키지와 앱을 포함합니다:

### 앱 및 패키지

- `web`: Next.js 기반 프론트엔드 애플리케이션
- `api`: NestJS 기반 백엔드 API 서버
- `@myskinmetrix/ui`: 공유 UI 컴포넌트 라이브러리
- `@myskinmetrix/types`: 공유 타입 정의
- `@myskinmetrix/config`: 환경 설정
- `@myskinmetrix/utils`: 공통 유틸리티 함수
- `@myskinmetrix/ml`: Python ML 스크립트

## 개발 환경 설정

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 모드 실행
npm run dev

# 빌드
npm run build
```

## 개발 로드맵

1. **설문 기반 분석 (MVP)**: 무로그인 설문 시스템으로 기본 피부 분석 제공
2. **이미지 분석 및 계정 기능**: 기본 이미지 업로드/분석, 계정 시스템 구축
3. **고급 AI 분석 및 유료 기능**: 서버 측 AI 분석, 유료 기능 구현
4. **변화 추적 및 고급 기능**: 시간별 피부 상태 추적, 환경 데이터 통합
5. **확장 및 최적화**: 다국어 지원, 성능 최적화, B2B 기능 개발
