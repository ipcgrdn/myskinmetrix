// 퍼스널 컬러 타입 정의
export type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';
export type ToneType = 'warm' | 'cool' | 'neutral';
export type PersonalColorType = 'springWarm' | 'summerCool' | 'autumnWarm' | 'winterCool';

// 필요한 외부 라이브러리 임포트
import * as faceapi from 'face-api.js';
import convert from 'color-convert';

// Window 타입 확장
declare global {
  interface Window {
    faceDetectionPromise?: Promise<void[]>;
  }
}

// RGB 색상 정의
export interface RGB {
  r: number;
  g: number;
  b: number;
}

// HSV 색상 정의
export interface HSV {
  h: number; // 색상 (0-360)
  s: number; // 채도 (0-100)
  v: number; // 명도 (0-100)
}

// LAB 색상 정의 (CIE LAB 색공간)
export interface LAB {
  L: number; // 명도 (0-100)
  a: number; // 적-녹 축 (-128 ~ 127)
  b: number; // 황-청 축 (-128 ~ 127)
}

// 얼굴 영역 정의
export interface FaceRegions {
  skin: RGB[];
  forehead: RGB[];
  cheeks: RGB[];
  jawline: RGB[];
  hair: RGB[];
  eyes: RGB[];
  lips: RGB[];
}

// 퍼스널 컬러 결과 인터페이스
export interface PersonalColorResult {
  type: PersonalColorType;
  season: SeasonType;
  tone: ToneType;
  confidence: number; // 0-100 사이의 신뢰도 점수
  colorValues: {
    skinTone: string; // HEX 코드
    skinUndertone: 'yellow' | 'pink' | 'neutral';
    contrastLevel: 'high' | 'medium' | 'low';
    eyeColor: string; // HEX 코드
    hairColor: string; // HEX 코드
  };
  colorMetrics: {
    ita: number; // Individual Typology Angle
    contrast: number; // 대비 점수
    brightness: number; // 밝기 점수
    colorfulness: number; // 다채로움 점수
    temperature: number; // 색온도 점수 (-100 ~ 100, 음수는 쿨, 양수는 웜)
  };
}

// RGB를 HSV로 변환
export function rgbToHsv(rgb: RGB): HSV {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = max === 0 ? 0 : delta / max;
  let v = max;

  if (delta === 0) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / delta) % 6;
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;
  s = Math.round(s * 100);
  v = Math.round(v * 100);

  return { h, s, v };
}

// RGB를 LAB로 변환 (CIE LAB 색공간)
export function rgbToLab(rgb: RGB): LAB {
  try {
    const [L, a, b] = convert.rgb.lab([rgb.r, rgb.g, rgb.b]);
    return { L, a, b };
  } catch (error) {
    console.error('RGB to LAB 변환 오류:', error);
    return { L: 50, a: 0, b: 0 }; // 기본값
  }
}

// RGB를 HEX로 변환
export function rgbToHex(rgb: RGB): string {
  const toHex = (value: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(value))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// 평균 RGB 값 계산
export function calculateAverageRgb(rgbArray: RGB[]): RGB {
  if (rgbArray.length === 0) {
    return { r: 0, g: 0, b: 0 };
  }

  const sum = rgbArray.reduce(
    (acc, rgb) => ({
      r: acc.r + rgb.r,
      g: acc.g + rgb.g,
      b: acc.b + rgb.b,
    }),
    { r: 0, g: 0, b: 0 }
  );

  return {
    r: Math.round(sum.r / rgbArray.length),
    g: Math.round(sum.g / rgbArray.length),
    b: Math.round(sum.b / rgbArray.length),
  };
}

// 화이트 밸런스 보정
export function correctWhiteBalance(rgbData: RGB[]): RGB[] {
  if (rgbData.length === 0) return [];

  // 그레이 월드 알고리즘: 평균 색상이 회색이 되도록 조정
  const avgR = rgbData.reduce((sum, pixel) => sum + pixel.r, 0) / rgbData.length;
  const avgG = rgbData.reduce((sum, pixel) => sum + pixel.g, 0) / rgbData.length;
  const avgB = rgbData.reduce((sum, pixel) => sum + pixel.b, 0) / rgbData.length;
  
  // 평균 회색 계산
  const avgGray = (avgR + avgG + avgB) / 3;
  
  // 각 채널에 대한 조정 계수
  const rScale = avgGray / (avgR || 1); // 0으로 나누는 것 방지
  const gScale = avgGray / (avgG || 1);
  const bScale = avgGray / (avgB || 1);
  
  // 모든 픽셀에 대해 화이트 밸런스 조정
  return rgbData.map(pixel => ({
    r: Math.min(255, Math.max(0, Math.round(pixel.r * rScale))),
    g: Math.min(255, Math.max(0, Math.round(pixel.g * gScale))),
    b: Math.min(255, Math.max(0, Math.round(pixel.b * bScale)))
  }));
}

// ITA(Individual Typology Angle) 계산
export function calculateITA(labColor: LAB): number {
  // ITA = arctan((L* - 50) / b*) * 180 / π
  return Math.atan((labColor.L - 50) / (labColor.b || 0.01)) * (180 / Math.PI);
}

// 색상 차이 계산 (Delta E - CIE76)
export function calculateDeltaE(lab1: LAB, lab2: LAB): number {
  const deltaL = lab1.L - lab2.L;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;
  
  return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

// 컬러 온도 계산
export function calculateColorTemperature(lab: LAB): number {
  // a와 b 값으로 색상의 온도 측정
  // 양수: 웜톤, 음수: 쿨톤
  return lab.a * 0.3 + lab.b * 0.7;
}

// 대비 수준 분석
export function analyzeContrastLevel(skinLab: LAB, hairLab: LAB, eyesLab: LAB): 'high' | 'medium' | 'low' {
  // 피부와 머리카락, 피부와 눈 사이의 색상 대비 계산
  const skinHairDeltaE = calculateDeltaE(skinLab, hairLab);
  const skinEyesDeltaE = calculateDeltaE(skinLab, eyesLab);
  
  // 가중치 적용 (머리카락과의 대비가 더 중요)
  const contrastScore = (skinHairDeltaE * 0.7) + (skinEyesDeltaE * 0.3);
  
  if (contrastScore > 45) return 'high';
  if (contrastScore > 25) return 'medium';
  return 'low';
}

// 언더톤 분석 (ITA 활용)
export function analyzeSkinUndertone(skinLab: LAB, colorTemperature: number): 'yellow' | 'pink' | 'neutral' {
  const ita = calculateITA(skinLab);
  
  // ITA 값과 색온도 값을 함께 고려
  if (ita > 55 || colorTemperature < -15) {
    return 'pink'; // 쿨톤 (붉은/분홍 언더톤)
  } else if (ita < 41 || colorTemperature > 15) {
    return 'yellow'; // 웜톤 (노란/황금 언더톤)
  } else {
    return 'neutral'; // 중성 언더톤
  }
}

// 얼굴 특징점에서 영역별 픽셀 추출
export function extractFaceRegionPixels(
  imageData: ImageData, 
  landmarks: faceapi.FaceLandmarks68
): FaceRegions {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  
  // 특징점 좌표 가져오기
  const positions = landmarks.positions;
  
  // 피부 영역 (얼굴 전체 윤곽선 내부)
  const jawline = positions.slice(0, 17);  // 턱선
  const foreheadTop = positions.slice(17, 27); // 눈썹 위
  
  // 영역별 픽셀 저장 배열
  const skin: RGB[] = [];
  const forehead: RGB[] = [];
  const cheeks: RGB[] = [];
  const jawline_pixels: RGB[] = [];
  const hair: RGB[] = [];
  const eyes: RGB[] = [];
  const lips: RGB[] = [];
  
  // 이미지 전체를 순회하며 특정 영역에 속하는 픽셀 수집
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const pixel: RGB = {
        r: data[idx],
        g: data[idx + 1],
        b: data[idx + 2]
      };
      
      // 좌표가 얼굴 내부인지 확인
      const isInsideFace = isPointInPolygon({ x, y }, [...jawline, ...foreheadTop.slice().reverse()]);
      
      if (isInsideFace) {
        skin.push(pixel);
        
        // 이마 영역 (눈썹 위)
        const isForehead = y < positions[24].y && y > positions[19].y - 30;
        if (isForehead) {
          forehead.push(pixel);
        }
        
        // 볼 영역 (코와 턱 사이)
        const isCheek = y > positions[30].y && y < positions[8].y;
        if (isCheek) {
          cheeks.push(pixel);
        }
        
        // 턱선 근처
        const isJawlineArea = distanceToPolyline({ x, y }, jawline) < 15;
        if (isJawlineArea) {
          jawline_pixels.push(pixel);
        }
      }
      
      // 눈 영역
      const leftEye = positions.slice(36, 42);
      const rightEye = positions.slice(42, 48);
      const isNearEye = isPointInPolygon({ x, y }, leftEye) || isPointInPolygon({ x, y }, rightEye);
      if (isNearEye) {
        eyes.push(pixel);
      }
      
      // 입술 영역
      const lips_outline = positions.slice(48, 60);
      const isLips = isPointInPolygon({ x, y }, lips_outline);
      if (isLips) {
        lips.push(pixel);
      }
      
      // 머리카락 영역 (얼굴 위쪽)
      const hairRegionHeight = positions[19].y - 50; // 눈썹보다 위쪽
      const isHairRegion = y < hairRegionHeight;
      if (isHairRegion) {
        // 일반적으로 머리카락은 어두운 색상
        const brightness = (pixel.r + pixel.g + pixel.b) / 3;
        if (brightness < 100) {
          hair.push(pixel);
        }
      }
    }
  }
  
  return {
    skin,
    forehead,
    cheeks,
    jawline: jawline_pixels,
    hair,
    eyes,
    lips
  };
}

// 점이 폴리곤 내부에 있는지 확인 (Ray Casting 알고리즘)
function isPointInPolygon(point: { x: number, y: number }, polygon: faceapi.Point[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    
    const intersect = ((yi > point.y) !== (yj > point.y)) &&
      (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// 점과 폴리라인 사이의 최소 거리 계산
function distanceToPolyline(point: { x: number, y: number }, polyline: faceapi.Point[]): number {
  let minDist = Number.MAX_VALUE;
  
  for (let i = 0; i < polyline.length - 1; i++) {
    const dist = distanceToSegment(
      point,
      { x: polyline[i].x, y: polyline[i].y },
      { x: polyline[i + 1].x, y: polyline[i + 1].y }
    );
    minDist = Math.min(minDist, dist);
  }
  
  return minDist;
}

// 점과 선분 사이의 거리 계산
function distanceToSegment(
  p: { x: number, y: number },
  v: { x: number, y: number },
  w: { x: number, y: number }
): number {
  const l2 = distanceSquared(v, w);
  if (l2 === 0) return Math.sqrt(distanceSquared(p, v));
  
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  
  return Math.sqrt(distanceSquared(p, {
    x: v.x + t * (w.x - v.x),
    y: v.y + t * (w.y - v.y)
  }));
}

// 두 점 사이의 거리 제곱
function distanceSquared(a: { x: number, y: number }, b: { x: number, y: number }): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

// 진행 상황 보고 함수 추가
function reportProgress(progress: number, stage: string): void {
  // 브라우저 환경에서만 실행
  if (typeof window !== 'undefined') {
    // 커스텀 이벤트 생성 및 디스패치
    const progressEvent = new CustomEvent('personalColorAnalysisProgress', {
      detail: { progress, stage }
    });
    window.dispatchEvent(progressEvent);
  }
}

// 얼굴에서 색상 추출 함수 수정
export async function extractColorsFromImage(imageUrl: string): Promise<FaceRegions> {
  try {
    reportProgress(0, 'loading-image');

    // 이미지 로드
    const img = await faceapi.fetchImage(imageUrl);
    
    reportProgress(10, 'processing-image');
    
    // 이미지를 캔버스에 그리고 데이터 추출
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('캔버스 컨텍스트를 생성할 수 없습니다.');
    }
    
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    
    reportProgress(20, 'detecting-face');
    
    // face-api.js를 사용하여 얼굴 감지 및 랜드마크 추출
    try {
      // 모델이 로드되었는지 확인
      const modelPath = '/models';
      if (!faceapi.nets.tinyFaceDetector.isLoaded) {
        // 모델 로드 상태 저장 프로미스 생성 (다른 컴포넌트에서 참조 가능)
        if (typeof window !== 'undefined') {
          window.faceDetectionPromise = Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(modelPath),
            faceapi.nets.faceLandmark68Net.loadFromUri(modelPath)
          ]);
          await window.faceDetectionPromise;
        } else {
          // 클라이언트 사이드에서만 실행되므로 SSR에서는 실행 안 함
          await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(modelPath),
            faceapi.nets.faceLandmark68Net.loadFromUri(modelPath)
          ]);
        }
      }
      
      reportProgress(30, 'analyzing-landmarks');
      
      // 얼굴 감지 및 랜드마크 추출
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
      
      if (detection) {
        reportProgress(40, 'extracting-face-regions');
        
        // 얼굴 특징점을 사용하여 영역별 픽셀 추출
        const faceRegions = extractFaceRegionPixels(imageData, detection.landmarks);
        
        reportProgress(50, 'color-correction');
        
        // 화이트 밸런스 보정
        const correctedRegions: FaceRegions = {
          skin: correctWhiteBalance(faceRegions.skin),
          forehead: correctWhiteBalance(faceRegions.forehead),
          cheeks: correctWhiteBalance(faceRegions.cheeks),
          jawline: correctWhiteBalance(faceRegions.jawline),
          hair: correctWhiteBalance(faceRegions.hair),
          eyes: correctWhiteBalance(faceRegions.eyes),
          lips: correctWhiteBalance(faceRegions.lips)
        };
        
        reportProgress(60, 'regions-extracted');
        return correctedRegions;
      }
    } catch (error) {
      console.error('얼굴 감지 오류:', error);
      // 얼굴 감지 실패 시에도 진행
    }
    
    // 얼굴 감지 실패 시 대체 방법: 이미지를 영역으로 나눠서 추정
    reportProgress(35, 'region-estimation');
    
    // 이미지의 영역별 색상 추출
    const regions: FaceRegions = {
      skin: [],
      forehead: [],
      cheeks: [],
      jawline: [],
      hair: [],
      eyes: [],
      lips: []
    };
    
    // 이미지 데이터 처리
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // 대략적인 영역 분할 (매우 단순화된 접근법)
    // 상단 25%는 머리카락 영역으로 추정
    // 중앙 50%는 얼굴(피부)로 추정
    // 중앙-상단 부분을 이마로 추정
    // 중앙-측면 부분을 볼로 추정
    const hairRegionHeight = Math.floor(height * 0.25);
    const faceRegionTop = hairRegionHeight;
    const faceRegionBottom = Math.floor(height * 0.75);
    const eyeRegionTop = Math.floor(height * 0.3);
    const eyeRegionBottom = Math.floor(height * 0.45);
    const lipsRegionTop = Math.floor(height * 0.6);
    const lipsRegionBottom = Math.floor(height * 0.7);
    
    // 이미지에서 픽셀 샘플링 (모든 픽셀을 처리하지 않고 일부만 샘플링)
    const sampleRate = 10; // 10픽셀마다 하나씩 샘플링
    
    for (let y = 0; y < height; y += sampleRate) {
      for (let x = 0; x < width; x += sampleRate) {
        const idx = (y * width + x) * 4;
        const pixel: RGB = {
          r: data[idx],
          g: data[idx + 1],
          b: data[idx + 2]
        };
        
        // 영역에 따라 픽셀 분류
        if (y < hairRegionHeight) {
          regions.hair.push(pixel);
        } else if (y >= faceRegionTop && y < faceRegionBottom) {
          // 얼굴(피부) 영역
          regions.skin.push(pixel);
          
          // 세부 영역 추가 분류
          if (y < eyeRegionTop) {
            regions.forehead.push(pixel);
          } else if (y >= eyeRegionTop && y < eyeRegionBottom && (x < width * 0.4 || x > width * 0.6)) {
            // 눈 영역 (중앙에서 좌우로)
            regions.eyes.push(pixel);
          } else if (y >= lipsRegionTop && y < lipsRegionBottom && x > width * 0.4 && x < width * 0.6) {
            // 입술 영역 (중앙 하단)
            regions.lips.push(pixel);
          } else if (x < width * 0.3 || x > width * 0.7) {
            // 좌우 볼 영역
            regions.cheeks.push(pixel);
          } else if (y > faceRegionBottom * 0.9) {
            // 턱 라인
            regions.jawline.push(pixel);
          }
        }
      }
      
      // 진행 상황 업데이트 (영역 추정 중 35% ~ 45% 진행)
      if (y % 50 === 0) {
        const estimationProgress = 35 + (y / height) * 10;
        reportProgress(estimationProgress, 'region-estimation');
      }
    }
    
    reportProgress(45, 'color-correction');
    
    // 화이트 밸런스 보정
    const correctedRegions: FaceRegions = {
      skin: correctWhiteBalance(regions.skin),
      forehead: correctWhiteBalance(regions.forehead),
      cheeks: correctWhiteBalance(regions.cheeks),
      jawline: correctWhiteBalance(regions.jawline),
      hair: correctWhiteBalance(regions.hair),
      eyes: correctWhiteBalance(regions.eyes),
      lips: correctWhiteBalance(regions.lips)
    };
    
    reportProgress(60, 'regions-extracted');
    return correctedRegions;
  } catch (error) {
    console.error('이미지 처리 오류:', error);
    throw new Error('이미지에서 색상을 추출하는 데 실패했습니다.');
  }
}

// 사용자 이미지 분석 및 퍼스널 컬러 판별
export async function analyzePersonalColor(imageUrl: string): Promise<PersonalColorResult> {
  try {
    reportProgress(0, 'start-analysis');
    
    // 이미지에서 색상 추출
    const regions = await extractColorsFromImage(imageUrl);
    
    reportProgress(65, 'analyzing-skin');
    
    // 피부톤 분석 (볼과 이마 영역 우선 사용)
    const skinSamples = [
      ...regions.cheeks, 
      ...regions.forehead,
      ...regions.skin.slice(0, 500) // 추가 샘플
    ];
    
    // 너무 어둡거나 너무 밝은 색상은 제외 (이상값 제거)
    const filteredSkinSamples = skinSamples.filter(pixel => {
      const brightness = (pixel.r + pixel.g + pixel.b) / 3;
      return brightness > 50 && brightness < 240;
    });
    
    reportProgress(70, 'calculating-colors');
    
    // 평균 색상 계산
    const avgSkinRgb = calculateAverageRgb(filteredSkinSamples);
    const avgHairRgb = calculateAverageRgb(regions.hair);
    const avgEyesRgb = calculateAverageRgb(regions.eyes);
    
    // LAB 색공간으로 변환 (인간의 시각 인식과 가장 유사한 색공간)
    const skinLab = rgbToLab(avgSkinRgb);
    const hairLab = rgbToLab(avgHairRgb);
    const eyesLab = rgbToLab(avgEyesRgb);
    
    reportProgress(75, 'analyzing-metrics');
    
    // 색상 온도 계산
    const colorTemperature = calculateColorTemperature(skinLab);
    
    // ITA(Individual Typology Angle) 계산
    const ita = calculateITA(skinLab);
    
    // 언더톤 분석
    const skinUndertone = analyzeSkinUndertone(skinLab, colorTemperature);
    
    // 대비 수준 분석
    const contrastLevel = analyzeContrastLevel(skinLab, hairLab, eyesLab);
    
    reportProgress(85, 'determining-type');
    
    // 웜톤/쿨톤 결정
    const tone: ToneType = (skinUndertone === 'yellow') ? 'warm' : 
                         (skinUndertone === 'pink') ? 'cool' : 'neutral';
    
    // 시즌 결정 (웜톤/쿨톤 + 대비수준)
    let season: SeasonType;
    let type: PersonalColorType;
    let confidence = 70; // 기본 신뢰도
    
    if (tone === 'warm') {
      // 웜톤의 경우
      if (contrastLevel === 'high') {
        season = 'autumn';
        type = 'autumnWarm';
        confidence += 5;
      } else {
        season = 'spring';
        type = 'springWarm';
      }
      
      // 추가 확신도 조정
      if (colorTemperature > 25) confidence += 10;
      if (ita < 30) confidence += 5;
    } else {
      // 쿨톤의 경우
      if (contrastLevel === 'high') {
        season = 'winter';
        type = 'winterCool';
        confidence += 5;
      } else {
        season = 'summer';
        type = 'summerCool';
      }
      
      // 추가 확신도 조정
      if (colorTemperature < -25) confidence += 10;
      if (ita > 60) confidence += 5;
    }
    
    // 중성톤(neutral)의 경우 추가 분석하여 더 가까운 톤으로 조정
    if (tone === 'neutral') {
      // 중성인 경우 대비레벨과 다른 요소들을 종합적으로 평가
      if (colorTemperature > 0) {
        if (contrastLevel === 'high') {
          season = 'autumn';
          type = 'autumnWarm';
        } else {
          season = 'spring';
          type = 'springWarm';
        }
      } else {
        if (contrastLevel === 'high') {
          season = 'winter';
          type = 'winterCool';
        } else {
          season = 'summer';
          type = 'summerCool';
        }
      }
      
      // 중성톤이므로 확신도 감소
      confidence -= 10;
    }
    
    reportProgress(95, 'finalizing-result');
    
    // 최종 결과 생성
    return {
      type,
      season,
      tone,
      confidence: Math.min(100, Math.max(50, confidence)), // 50-100 범위 내로 제한
      colorValues: {
        skinTone: rgbToHex(avgSkinRgb),
        skinUndertone,
        contrastLevel,
        eyeColor: rgbToHex(avgEyesRgb),
        hairColor: rgbToHex(avgHairRgb)
      },
      colorMetrics: {
        ita,
        contrast: calculateDeltaE(skinLab, hairLab),
        brightness: skinLab.L,
        colorfulness: Math.sqrt(skinLab.a * skinLab.a + skinLab.b * skinLab.b),
        temperature: colorTemperature
      }
    };
  } catch (error) {
    console.error('퍼스널 컬러 분석 오류:', error);
    // 기본값을 반환하지 않고 오류를 그대로 전달
    return Promise.reject(new Error('퍼스널 컬러 분석 중 오류가 발생했습니다. 다시 시도해주세요.'));
  }
}

// RGB를 YCbCr로 변환 (피부색 검출에 유용)
export function rgbToYCbCr(rgb: RGB): { Y: number; Cb: number; Cr: number } {
  const r = rgb.r;
  const g = rgb.g;
  const b = rgb.b;

  // RGB to YCbCr 변환 공식
  const Y = 0.299 * r + 0.587 * g + 0.114 * b;
  const Cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
  const Cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

  return { Y, Cb, Cr };
}

// 피부색 검출 - YCbCr 색공간 기반 (더 정확한 피부색 검출)
export function isLikelySkinColor(rgb: RGB): boolean {
  const ycbcr = rgbToYCbCr(rgb);
  
  // YCbCr 색공간에서의 일반적인 피부색 범위
  // 다양한 인종의 피부색을 포괄하는 범위 설정
  const isInRange = (
    ycbcr.Y > 80 && 
    ycbcr.Cb > 85 && ycbcr.Cb < 135 && 
    ycbcr.Cr > 135 && ycbcr.Cr < 180
  );
  
  return isInRange;
}

// 개선된 화이트 밸런스 보정 (그레이월드 + 하이라이트 기반)
export function enhancedWhiteBalance(rgbData: RGB[]): RGB[] {
  if (rgbData.length === 0) return [];

  // 1. 밝기 기준으로 상위 5% 픽셀 추출 (하이라이트 영역)
  const brightnesses = rgbData.map(pixel => (pixel.r + pixel.g + pixel.b) / 3);
  const sortedBrightnesses = [...brightnesses].sort((a, b) => b - a);
  const brightThreshold = sortedBrightnesses[Math.floor(sortedBrightnesses.length * 0.05)] || 200;
  
  const highlightPixels = rgbData.filter((_, i) => brightnesses[i] >= brightThreshold);
  
  // 하이라이트 영역이 충분하지 않으면 그레이월드 알고리즘 사용
  if (highlightPixels.length < 10) {
    return correctWhiteBalance(rgbData);
  }
  
  // 2. 하이라이트 영역의 평균 색상 계산
  const avgHighlightR = highlightPixels.reduce((sum, pixel) => sum + pixel.r, 0) / highlightPixels.length;
  const avgHighlightG = highlightPixels.reduce((sum, pixel) => sum + pixel.g, 0) / highlightPixels.length;
  const avgHighlightB = highlightPixels.reduce((sum, pixel) => sum + pixel.b, 0) / highlightPixels.length;
  
  // 3. 화이트 밸런스 조정 계수 계산 (255를 목표 하이라이트 값으로 설정)
  const targetHighlight = 240; // 완전한 흰색 대신 약간 낮은 값으로 설정
  const rScale = (avgHighlightR > 10) ? targetHighlight / avgHighlightR : 1;
  const gScale = (avgHighlightG > 10) ? targetHighlight / avgHighlightG : 1;
  const bScale = (avgHighlightB > 10) ? targetHighlight / avgHighlightB : 1;
  
  // 4. 모든 픽셀에 대해 화이트 밸런스 조정
  return rgbData.map(pixel => ({
    r: Math.min(255, Math.max(0, Math.round(pixel.r * rScale))),
    g: Math.min(255, Math.max(0, Math.round(pixel.g * gScale))),
    b: Math.min(255, Math.max(0, Math.round(pixel.b * bScale)))
  }));
}

// 조명 보정 - 그림자와 하이라이트 개선
export function correctLighting(rgbData: RGB[]): RGB[] {
  if (rgbData.length === 0) return [];
  
  // 밝기 계산
  const brightnesses = rgbData.map(pixel => (pixel.r + pixel.g + pixel.b) / 3);
  
  // 밝기 통계 계산
  const avgBrightness = brightnesses.reduce((sum, val) => sum + val, 0) / brightnesses.length;
  const minBrightness = Math.min(...brightnesses);
  const maxBrightness = Math.max(...brightnesses);
  
  // 콘트라스트 스트레칭 파라미터 계산
  const targetMin = Math.max(avgBrightness * 0.6, 30); // 최소 밝기 목표
  const targetMax = Math.min(avgBrightness * 1.4, 220); // 최대 밝기 목표
  
  // 부드러운 콘트라스트 스트레칭 적용
  return rgbData.map((pixel, i) => {
    const brightness = brightnesses[i];
    
    // 밝기를 새로운 범위로 스트레칭
    let adjustedBrightness;
    if (maxBrightness === minBrightness) {
      adjustedBrightness = avgBrightness;
    } else {
      adjustedBrightness = targetMin + ((brightness - minBrightness) / (maxBrightness - minBrightness)) * (targetMax - targetMin);
    }
    
    // 현재 밝기와 조정된 밝기의 비율
    const ratio = (brightness === 0) ? 1 : adjustedBrightness / brightness;
    
    // RGB 값 조정
    return {
      r: Math.min(255, Math.max(0, Math.round(pixel.r * ratio))),
      g: Math.min(255, Math.max(0, Math.round(pixel.g * ratio))),
      b: Math.min(255, Math.max(0, Math.round(pixel.b * ratio)))
    };
  });
}

// K-Means 클러스터링을 간단히 구현한 함수
export function kMeansColorClustering(colors: RGB[], k: number = 3, maxIterations: number = 10): RGB[] {
  if (colors.length === 0) return [];
  if (colors.length <= k) return colors;
  
  // 무작위로 초기 중심점 선택
  const centroids: RGB[] = [];
  const usedIndices = new Set<number>();
  
  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      centroids.push({ ...colors[randomIndex] });
    }
  }
  
  // 반복적으로 클러스터 할당 및 중심점 업데이트
  for (let iter = 0; iter < maxIterations; iter++) {
    // 각 색상을 가장 가까운 중심점에 할당
    const clusters: RGB[][] = Array.from({ length: k }, () => []);
    
    colors.forEach(color => {
      let minDistance = Infinity;
      let closestCentroidIndex = 0;
      
      centroids.forEach((centroid, i) => {
        const distance = colorDistance(color, centroid);
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroidIndex = i;
        }
      });
      
      clusters[closestCentroidIndex].push(color);
    });
    
    // 중심점 업데이트
    let changed = false;
    for (let i = 0; i < k; i++) {
      if (clusters[i].length > 0) {
        const newCentroid = calculateAverageRgb(clusters[i]);
        if (!isEqual(centroids[i], newCentroid)) {
          centroids[i] = newCentroid;
          changed = true;
        }
      }
    }
    
    // 중심점이 더 이상 변하지 않으면 종료
    if (!changed) break;
  }
  
  // 클러스터 크기 순으로 중심점 정렬 (가장 큰 클러스터 = 주요 색상)
  const clusterSizes = centroids.map((_, i) => {
    const count = colors.filter(color => 
      centroids.indexOf(centroids.reduce((closest, centroid) => 
        colorDistance(color, centroid) < colorDistance(color, closest) ? centroid : closest
      , centroids[0])) === i
    ).length;
    return { centroid: centroids[i], count };
  });
  
  return clusterSizes
    .sort((a, b) => b.count - a.count)
    .map(item => item.centroid);
}

// 색상 간 거리 계산 (유클리드 거리)
function colorDistance(c1: RGB, c2: RGB): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) + 
    Math.pow(c1.g - c2.g, 2) + 
    Math.pow(c1.b - c2.b, 2)
  );
}

// 두 색상이 동일한지 확인 (근사값 비교)
function isEqual(c1: RGB, c2: RGB, threshold: number = 3): boolean {
  return (
    Math.abs(c1.r - c2.r) <= threshold &&
    Math.abs(c1.g - c2.g) <= threshold &&
    Math.abs(c1.b - c2.b) <= threshold
  );
}

// 확장된 세부 퍼스널 컬러 타입
export type DetailedPersonalColorType = 
  | 'brightSpring' | 'lightSpring' | 'warmSpring' 
  | 'lightSummer' | 'coolSummer' | 'softSummer' 
  | 'warmAutumn' | 'deepAutumn' | 'softAutumn' 
  | 'coolWinter' | 'deepWinter' | 'brightWinter';

// 개선된 언더톤 분석 (HSV, YCbCr, LAB 색공간 모두 활용)
export function advancedUndertoneAnalysis(
  skinRgb: RGB, 
  skinLab: LAB, 
  colorTemperature: number
): 'yellow' | 'pink' | 'neutral' {
  // 1. YCbCr 색공간 분석 (피부색 분석에 유용)
  const ycbcr = rgbToYCbCr(skinRgb);
  const ycbcrUndertone = ycbcr.Cr > 150 ? 'pink' : ycbcr.Cb > 120 ? 'yellow' : 'neutral';
  
  // 2. HSV 색공간 분석
  const hsv = rgbToHsv(skinRgb);
  let hsvUndertone: 'yellow' | 'pink' | 'neutral';
  
  // Hue 값에 따른 웜톤/쿨톤 분석
  // 0-30, 330-360: 붉은 계열 (쿨톤 경향)
  // 30-70: 노란 계열 (웜톤 경향)
  if ((hsv.h >= 0 && hsv.h <= 30) || (hsv.h >= 330 && hsv.h <= 360)) {
    hsvUndertone = 'pink';
  } else if (hsv.h > 30 && hsv.h <= 70) {
    hsvUndertone = 'yellow';
  } else {
    hsvUndertone = 'neutral';
  }
  
  // 3. LAB 색공간 분석 (ITA 값 활용)
  const ita = calculateITA(skinLab);
  const labUndertone = ita > 50 || colorTemperature < -20 
    ? 'pink' 
    : ita < 35 || colorTemperature > 20 
      ? 'yellow' 
      : 'neutral';
  
  // 4. 종합 분석 (3가지 방법의 결과 투표)
  const votes: { [key: string]: number } = {
    'yellow': 0,
    'pink': 0,
    'neutral': 0
  };
  
  votes[ycbcrUndertone]++;
  votes[hsvUndertone]++;
  votes[labUndertone]++;
  
  // 최다 득표 undertone 반환
  let maxVotes = 0;
  let finalUndertone: 'yellow' | 'pink' | 'neutral' = 'neutral';
  
  for (const [undertone, count] of Object.entries(votes)) {
    if (count > maxVotes) {
      maxVotes = count;
      finalUndertone = undertone as 'yellow' | 'pink' | 'neutral';
    }
  }
  
  return finalUndertone;
}

// 피부톤 명도 분석 (Light vs Deep)
export function analyzeSkinBrightness(lab: LAB): 'light' | 'medium' | 'deep' {
  // L* 값에 기반한 명도 분석
  if (lab.L > 70) return 'light';
  if (lab.L < 55) return 'deep';
  return 'medium';
}

// 피부톤 청탁도 분석 (Clear vs Muted)
export function analyzeSkinClarity(lab: LAB): 'clear' | 'medium' | 'muted' {
  // Chroma (a*와 b* 값에 기반한 채도) 분석
  const chroma = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  
  if (chroma > 25) return 'clear';
  if (chroma < 15) return 'muted';
  return 'medium';
}

// 세부 퍼스널 컬러 타입 분석
export function analyzeDetailedType(
  tone: ToneType,
  season: SeasonType,
  brightness: 'light' | 'medium' | 'deep',
  clarity: 'clear' | 'medium' | 'muted'
): DetailedPersonalColorType {
  // 봄 (Spring) 세부 타입
  if (season === 'spring') {
    if (clarity === 'clear') return 'brightSpring';
    if (brightness === 'light') return 'lightSpring';
    return 'warmSpring';
  }
  
  // 여름 (Summer) 세부 타입
  if (season === 'summer') {
    if (brightness === 'light') return 'lightSummer';
    if (clarity === 'muted') return 'softSummer';
    return 'coolSummer';
  }
  
  // 가을 (Autumn) 세부 타입
  if (season === 'autumn') {
    if (brightness === 'deep') return 'deepAutumn';
    if (clarity === 'muted') return 'softAutumn';
    return 'warmAutumn';
  }
  
  // 겨울 (Winter) 세부 타입
  if (season === 'winter') {
    if (clarity === 'clear') return 'brightWinter';
    if (brightness === 'deep') return 'deepWinter';
    return 'coolWinter';
  }
  
  // 기본값 (에러 방지)
  if (tone === 'warm') {
    return season === 'spring' ? 'warmSpring' : 'warmAutumn';
  } else {
    return season === 'summer' ? 'coolSummer' : 'coolWinter';
  }
}

// 확장된 결과 인터페이스
export interface DetailedPersonalColorResult extends PersonalColorResult {
  detailedType: DetailedPersonalColorType; // 세부 퍼스널 컬러 타입
  skinProperties: {
    brightness: 'light' | 'medium' | 'deep';
    clarity: 'clear' | 'medium' | 'muted';
    dominantColors: string[]; // HEX 코드
  };
  seasonalHarmonies: {
    bestColors: string[]; // HEX 코드
    avoidColors: string[]; // HEX 코드
  };
  multiColorSpaceAnalysis: {
    ycbcr: { Y: number; Cb: number; Cr: number };
    hsv: HSV;
    lab: LAB;
  };
}

// 개선된 퍼스널 컬러 분석 함수
export async function analyzePersonalColorEnhanced(imageUrl: string): Promise<DetailedPersonalColorResult> {
  try {
    reportProgress(0, 'start-analysis');
    
    // 이미지에서 색상 추출
    const regions = await extractColorsFromImage(imageUrl);
    
    reportProgress(60, 'enhancing-image-quality');
    
    // 피부톤 분석 (볼과 이마 영역 우선 사용)
    const skinSamples = [
      ...regions.cheeks, 
      ...regions.forehead,
      ...regions.skin.slice(0, 500) // 추가 샘플
    ];
    
    // 피부 영역 조명 보정
    const lightCorrectedSkin = correctLighting(skinSamples);
    
    // 개선된 화이트 밸런스 적용
    const balancedSkin = enhancedWhiteBalance(lightCorrectedSkin);
    
    // 이상값 필터링 
    const filteredSkinSamples = balancedSkin.filter(pixel => {
      const brightness = (pixel.r + pixel.g + pixel.b) / 3;
      return brightness > 50 && brightness < 240 && isLikelySkinColor(pixel);
    });
    
    reportProgress(65, 'clustering-skin-colors');
    
    // K-Means 클러스터링으로 주요 피부색 추출 (3개 클러스터)
    const skinClusters = kMeansColorClustering(filteredSkinSamples, 3);
    
    // 주요 피부색 (가장 많은 클러스터의 중심)
    const dominantSkinRgb = skinClusters[0];
    
    // 머리카락 및 눈 색상 클러스터링
    const hairClusters = kMeansColorClustering(regions.hair, 2);
    const eyesClusters = kMeansColorClustering(regions.eyes, 2);
    
    const dominantHairRgb = hairClusters[0];
    const dominantEyesRgb = eyesClusters[0];
    
    reportProgress(70, 'analyzing-color-spaces');
    
    // 다양한 색공간으로 변환
    const skinLab = rgbToLab(dominantSkinRgb);
    const hairLab = rgbToLab(dominantHairRgb);
    const eyesLab = rgbToLab(dominantEyesRgb);
    
    const skinHsv = rgbToHsv(dominantSkinRgb);
    const skinYCbCr = rgbToYCbCr(dominantSkinRgb);
    
    // 피부톤 특성 분석
    const ita = calculateITA(skinLab); // ITA 값
    const colorTemperature = calculateColorTemperature(skinLab); // 색온도
    const contrast = calculateDeltaE(skinLab, hairLab); // 피부-머리카락 대비
    
    reportProgress(75, 'analyzing-skin-properties');
    
    // 개선된 언더톤 분석 (다중 색공간)
    const skinUndertone = advancedUndertoneAnalysis(dominantSkinRgb, skinLab, colorTemperature);
    
    // 피부톤 명도와 청탁도 분석
    const skinBrightness = analyzeSkinBrightness(skinLab);
    const skinClarity = analyzeSkinClarity(skinLab);
    
    // 대비 수준 분석
    const contrastLevel = analyzeContrastLevel(skinLab, hairLab, eyesLab);
    
    reportProgress(80, 'determining-tone-and-season');
    
    // 웜톤/쿨톤 결정
    const tone: ToneType = (skinUndertone === 'yellow') ? 'warm' : 
                         (skinUndertone === 'pink') ? 'cool' : 'neutral';
    
    // 시즌 결정 (웜톤/쿨톤 + 대비수준)
    let season: SeasonType;
    let type: PersonalColorType;
    let confidence = 70; // 기본 신뢰도
    
    if (tone === 'warm') {
      // 웜톤의 경우
      if (contrastLevel === 'high') {
        season = 'autumn';
        type = 'autumnWarm';
        confidence += 5;
      } else {
        season = 'spring';
        type = 'springWarm';
      }
      
      // 추가 확신도 조정
      if (colorTemperature > 25) confidence += 10;
      if (ita < 30) confidence += 5;
    } else {
      // 쿨톤의 경우
      if (contrastLevel === 'high') {
        season = 'winter';
        type = 'winterCool';
        confidence += 5;
      } else {
        season = 'summer';
        type = 'summerCool';
      }
      
      // 추가 확신도 조정
      if (colorTemperature < -25) confidence += 10;
      if (ita > 60) confidence += 5;
    }
    
    // 중성톤(neutral)의 경우 추가 분석하여 더 가까운 톤으로 조정
    if (tone === 'neutral') {
      // 중성인 경우 대비레벨과 다른 요소들을 종합적으로 평가
      if (colorTemperature > 0) {
        if (contrastLevel === 'high') {
          season = 'autumn';
          type = 'autumnWarm';
        } else {
          season = 'spring';
          type = 'springWarm';
        }
      } else {
        if (contrastLevel === 'high') {
          season = 'winter';
          type = 'winterCool';
        } else {
          season = 'summer';
          type = 'summerCool';
        }
      }
      
      // 중성톤이므로 확신도 감소
      confidence -= 10;
    }
    
    reportProgress(85, 'determining-detailed-type');
    
    // 세부 퍼스널 컬러 타입 (12계절) 결정
    const detailedType = analyzeDetailedType(tone, season, skinBrightness, skinClarity);
    
    // 추천 색상 팔레트 및 피해야 할 색상 정의
    const bestColors = getBestColorsForType(detailedType);
    const avoidColors = getAvoidColorsForType(detailedType);
    
    reportProgress(95, 'finalizing-result');
    
    // 최종 결과 생성
  return {
      type,
      season,
      tone,
      confidence: Math.min(100, Math.max(50, confidence)), // 50-100 범위 내로 제한
      colorValues: {
        skinTone: rgbToHex(dominantSkinRgb),
        skinUndertone,
        contrastLevel,
        eyeColor: rgbToHex(dominantEyesRgb),
        hairColor: rgbToHex(dominantHairRgb)
      },
      colorMetrics: {
        ita,
        contrast,
        brightness: skinLab.L,
        colorfulness: Math.sqrt(skinLab.a * skinLab.a + skinLab.b * skinLab.b),
        temperature: colorTemperature
      },
      // 확장된 상세 정보
      detailedType,
      skinProperties: {
        brightness: skinBrightness,
        clarity: skinClarity,
        dominantColors: skinClusters.map(rgbToHex)
      },
      seasonalHarmonies: {
        bestColors,
        avoidColors
      },
      multiColorSpaceAnalysis: {
        ycbcr: skinYCbCr,
        hsv: skinHsv,
        lab: skinLab
      }
    };
    
  } catch (error) {
    console.error('퍼스널 컬러 분석 오류:', error);
    return Promise.reject(new Error('퍼스널 컬러 분석 중 오류가 발생했습니다. 다시 시도해주세요.'));
  }
}

// 세부 퍼스널 컬러 타입별 추천 색상
function getBestColorsForType(detailedType: DetailedPersonalColorType): string[] {
  switch (detailedType) {
    case 'brightSpring':
      return ['#FF5E3A', '#FFCC33', '#66CC99', '#33CCFF', '#FF66CC'];
    case 'lightSpring':
      return ['#FFAA33', '#FFDD66', '#99CC66', '#66CCCC', '#FF9999'];
    case 'warmSpring':
      return ['#FF8844', '#FFBB44', '#88CC44', '#44AAAA', '#FF7766'];
    case 'lightSummer':
      return ['#CC99CC', '#99CCFF', '#99CCBB', '#FFBBBB', '#CCCCFF'];
    case 'coolSummer':
      return ['#CC88AA', '#88AACC', '#77BBBB', '#CC99AA', '#9999CC'];
    case 'softSummer':
      return ['#AA7799', '#7799AA', '#669999', '#AA8899', '#8888AA'];
    case 'warmAutumn':
      return ['#BB6633', '#CC9933', '#779944', '#337766', '#AA6655'];
    case 'deepAutumn':
      return ['#993311', '#AA7722', '#556633', '#115544', '#774433'];
    case 'softAutumn':
      return ['#AA7755', '#AA9955', '#667744', '#446655', '#887766'];
    case 'coolWinter':
      return ['#BB0055', '#3355BB', '#007799', '#330066', '#CC0033'];
    case 'deepWinter':
      return ['#990033', '#003377', '#005533', '#330044', '#660022'];
    case 'brightWinter':
      return ['#FF0055', '#0066CC', '#00AAAA', '#6600FF', '#FF0033'];
    default:
      return ['#FF6600', '#FFCC00', '#66CC66', '#0099CC', '#CC66CC'];
  }
}

// 세부 퍼스널 컬러 타입별 피해야 할 색상
function getAvoidColorsForType(detailedType: DetailedPersonalColorType): string[] {
  // 각 계절과 가장 대비되는 계절의 색상 반환
  if (detailedType.includes('Spring')) {
    return ['#AA7788', '#7799AA', '#667788', '#998888', '#888899']; // 가을과 대비
  } else if (detailedType.includes('Summer')) {
    return ['#FF6600', '#FFAA00', '#CC9900', '#996600', '#FF5500']; // 겨울과 대비
  } else if (detailedType.includes('Autumn')) {
    return ['#FF66AA', '#66AAFF', '#00CCCC', '#CC66FF', '#FF55AA']; // 봄과 대비
  } else { // Winter
    return ['#AACC99', '#CCBB88', '#BBAA88', '#99BB99', '#BBBBAA']; // 여름과 대비
  }
} 