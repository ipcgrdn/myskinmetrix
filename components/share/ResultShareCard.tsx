import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Download } from 'lucide-react';
import QRCode from 'qrcode';

// 결과 공유 카드 Props 정의
interface ResultShareCardProps {
  title: string; // 결과 제목 (예: "봄 웜톤")
  detailedTitle: string; // 상세 유형 (예: "선명한 봄(Bright Spring)")
  imageUrl: string | null; // 사용자 이미지 URL (사용하지 않음)
  colorItems: string[]; // 추천 컬러 팔레트
  downloadFileName?: string; // 다운로드 시 파일명
  buttonText?: string; // 버튼 텍스트
  customToast?: boolean; // 커스텀 토스트 사용 여부
  onSuccess?: (imageUrl: string) => void; // 성공 콜백
  onFail?: (error: any) => void; // 실패 콜백
}

// 트렌디한 폰트 설정
const FONTS = {
  logo: "bold 70px 'Montserrat', 'Poppins', 'Inter', -apple-system, sans-serif",
  subtitle: "500 50px 'Inter', 'Poppins', -apple-system, sans-serif",
  mainTitle: "bold 120px 'Montserrat', 'SF Pro Display', -apple-system, sans-serif",
  description: "500 36px 'Inter', 'Poppins', -apple-system, sans-serif",
  footer: "400 30px 'Inter', 'Poppins', -apple-system, sans-serif"
};

// 퍼스널 컬러 타입별 배경 그라데이션 매핑
const colorGradients: Record<string, { start: string; end: string }> = {
  'spring': { start: '#FFE9C7', end: '#FFCDA8' }, // 봄 타입 파스텔 그라데이션
  'summer': { start: '#E0F0FF', end: '#C7DAFF' }, // 여름 타입 쿨톤 파스텔 그라데이션
  'autumn': { start: '#F3E9D9', end: '#E6CCB3' }, // 가을 타입 웜톤 그라데이션
  'winter': { start: '#E9F0F5', end: '#D1E2F2' }  // 겨울 타입 쿨톤 그라데이션
};

export default function ResultShareCard({
  title,
  detailedTitle,
  imageUrl, // 사용하지 않음
  colorItems,
  downloadFileName = 'personal-color-result.png',
  buttonText = '이미지로 저장하기',
  customToast = true,
  onSuccess,
  onFail
}: ResultShareCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');

  // URL 생성 및 QR 코드 생성
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // 현재 URL 가져오기 (브라우저 환경에서만 실행)
        const siteUrl = 'myskinmetrix.vercel.app'; // 기본 도메인
        const fullUrl = typeof window !== 'undefined' ? window.location.href : `https://${siteUrl}`;
        
        // QRCode 라이브러리로 QR 코드 생성
        const qrDataURL = await QRCode.toDataURL(fullUrl, {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 200,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        
        setQrCodeDataURL(qrDataURL);
      } catch (error) {
        console.error('QR 코드 생성 오류:', error);
      }
    };

    generateQRCode();
  }, []);

  // 커스텀 토스트 스타일
  const toastStyle = {
    borderRadius: '12px',
    background: '#ffffff',
    color: '#334155',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '12px 16px',
    fontWeight: '500',
    fontSize: '14px',
  };

  // 타입별 배경 그라데이션 색상 결정
  const getGradientColors = () => {
    // 제목에서 계절 타입 추출 (봄, 여름, 가을, 겨울)
    let season = 'spring'; // 기본값
    
    if (title.includes('봄') || detailedTitle.toLowerCase().includes('spring')) {
      season = 'spring';
    } else if (title.includes('여름') || detailedTitle.toLowerCase().includes('summer')) {
      season = 'summer';
    } else if (title.includes('가을') || detailedTitle.toLowerCase().includes('autumn')) {
      season = 'autumn';
    } else if (title.includes('겨울') || detailedTitle.toLowerCase().includes('winter')) {
      season = 'winter';
    }
    
    return colorGradients[season];
  };

  // iOS 16 스타일의 유리 효과 배경 그리기
  const drawGlassBackground = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, alpha: number = 0.5) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    
    // 배경 흐림 효과 흉내내기
    ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
    ctx.shadowBlur = 15;
    
    // 유리 효과 배경
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
    
    // 테두리 효과
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.stroke();
    
    ctx.restore();
  };

  // 순수 캔버스 API를 사용하여 간결한 이미지 생성
  const generateShareImage = async (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        // 캔버스 생성
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('캔버스 컨텍스트를 생성할 수 없습니다');
        }
        
        // 캔버스 크기 설정 (소셜 미디어 공유에 최적화된 비율 - 1:1.91)
        canvas.width = 1080;
        canvas.height = 2060;
        
        // 그라데이션 색상 가져오기
        const { start, end } = getGradientColors();
        
        // 배경 그라데이션 그리기
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, start);
        bgGradient.addColorStop(1, end);
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 흐릿한 원형 패턴 추가하여 깊이감 표현
        for (let i = 0; i < 7; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = Math.random() * 400 + 150;
          
          ctx.save();
          ctx.globalAlpha = 0.15;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
          ctx.restore();
        }
        
        // 상단 여백
        const topMargin = 160;
        
        // 메인 카드 컨테이너 (전체 배경)
        const cardWidth = canvas.width - 120;
        const cardHeight = canvas.height - 240;
        const cardX = 60;
        const cardY = topMargin;
        
        drawGlassBackground(ctx, cardX, cardY, cardWidth, cardHeight, 40, 0.7);
        
        // 현재 Y 위치 (콘텐츠 배치를 위한 트래킹)
        let currentY = cardY + 180; // 상단 여백 증가
        
        // 로고 텍스트
        ctx.textAlign = 'center';
        ctx.fillStyle = '#48a389'; // 티파니블루 계열 색상
        ctx.font = FONTS.logo;
        ctx.fillText('My Skin Metrix', canvas.width / 2, currentY);
        currentY += 160; // 간격 증가
        
        // "퍼스널 컬러" 텍스트
        ctx.fillStyle = '#333333';
        ctx.font = FONTS.subtitle;
        ctx.fillText('퍼스널 컬러', canvas.width / 2, currentY);
        currentY += 160; // 간격 증가
        
        // 메인 타이틀 (한글 퍼스널컬러 결과)
        ctx.fillStyle = '#222222';
        ctx.font = FONTS.mainTitle;
        
        // 그림자 효과 추가 (텍스트 강조)
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 3;
        ctx.fillText(title, canvas.width / 2, currentY);
        ctx.shadowColor = 'transparent'; // 그림자 초기화
        
        currentY += 240; // 간격 증가
        
        // 컬러 팔레트 영역
        const colorSize = 160;
        const colorPadding = 30; // 패딩 증가
        const colorsPerRow = 3;
        
        // 팔레트 섹션 시작
        const paletteStartY = currentY;
        const paletteWidth = (colorSize * colorsPerRow) + (colorPadding * (colorsPerRow - 1));
        const startX = (canvas.width - paletteWidth) / 2;
        
        // 컬러 팔레트 그리기
        const colorCards = colorItems.slice(0, 6); // 최대 6개만 표시
        for (let i = 0; i < colorCards.length; i++) {
          const row = Math.floor(i / colorsPerRow);
          const col = i % colorsPerRow;
          
          const x = startX + col * (colorSize + colorPadding);
          const y = paletteStartY + row * (colorSize + colorPadding * 1.5); // 세로 간격 추가 증가
          
          // 컬러 카드 배경
          drawGlassBackground(ctx, x, y, colorSize, colorSize, 24, 0.7); // 더 둥근 모서리
          
          // 컬러 원형 표시
          ctx.fillStyle = colorCards[i];
          ctx.beginPath();
          ctx.arc(x + colorSize/2, y + colorSize/2, colorSize/2 - 15, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // 컬러 팔레트 다음 위치 계산
        const rows = Math.ceil(colorCards.length / colorsPerRow);
        currentY = paletteStartY + (rows * (colorSize + colorPadding * 1.5)) + 180; // 간격 증가
        
        // QR 코드 섹션
        if (qrCodeDataURL) {
          try {
            // QR 코드 이미지 로드
            const qrImage = new Image();
            qrImage.crossOrigin = 'anonymous';
            
            await new Promise<void>((imgResolve) => {
              qrImage.onload = () => imgResolve();
              qrImage.onerror = () => {
                console.error('QR 코드 이미지 로드 실패');
                imgResolve(); // 오류가 발생해도 이미지 생성 계속 진행
              };
              qrImage.src = qrCodeDataURL;
            });
            
            // QR 코드 배경 및 이미지
            const qrSize = 280; // QR 코드 크기 증가
            const qrX = (canvas.width - qrSize) / 2;
            const qrY = currentY;
            
            // QR 배경
            drawGlassBackground(ctx, qrX, qrY, qrSize, qrSize, 28, 0.8); // 더 둥근 모서리
            
            // QR 코드 이미지 그리기 (여백 10px)
            ctx.drawImage(qrImage, qrX + 30, qrY + 30, qrSize - 60, qrSize - 60);
            
            currentY = qrY + qrSize + 90; // 간격 증가
          } catch (error) {
            console.error('QR 코드 렌더링 오류:', error);
          }
        }
    
        // 푸터
        const footerY = cardY + cardHeight - 80;
        ctx.fillStyle = '#666666';
        ctx.font = FONTS.footer;
        ctx.fillText('myskinmetrix.vercel.app', canvas.width / 2, footerY);
        
        // 이미지 URL 생성
        const resultImageUrl = canvas.toDataURL('image/png');
        resolve(resultImageUrl);
      } catch (error) {
        reject(error);
      }
    });
  };

  // 결과 카드를 이미지로 변환하고 다운로드
  const handleDownload = async () => {
    if (isGenerating) return;

    const toastId = 'download-image';

    try {
      setIsGenerating(true);

      // 로딩 토스트
      if (customToast) {
        toast.loading(
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-500" />
            <span>이미지 생성 중...</span>
          </div>,
          { id: toastId, style: toastStyle, duration: 5000 }
        );
      }

      // 캔버스 API로 직접 이미지 생성
      const resultImageUrl = await generateShareImage();
      
      // 브라우저 환경 감지
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      // 이미지 다운로드 처리
      if (isMobile && isIOS) {
        // iOS는 직접 다운로드가 어려워 새 탭에 이미지를 표시
        if (customToast) {
          toast.success(
            '저장하려면 이미지를 길게 터치한 다음 "이미지 저장"을 선택하세요.',
            { id: toastId, style: toastStyle, duration: 5000 }
          );
        }
        
        // 새 탭에서 이미지 열기
        const newTab = window.open();
        if (newTab) {
          newTab.document.body.style.margin = '0';
          newTab.document.body.style.background = '#f8fafc';
          newTab.document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px;">
              <div style="text-align: center;">
                <p style="margin-bottom: 20px; font-family: sans-serif; color: #475569;">이미지를 길게 터치한 다음 "이미지 저장"을 선택하세요.</p>
                <img src="${resultImageUrl}" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" alt="Personal Color Result" />
              </div>
            </div>
          `;
        }
      } else {
        // 데스크톱 및 Android 다운로드 처리
        const link = document.createElement('a');
        link.href = resultImageUrl;
        link.download = downloadFileName;
        link.click();
        
        if (customToast) {
          toast.success('이미지가 다운로드되었습니다!', { 
            id: toastId, 
            style: toastStyle,
            duration: 3000 
          });
        }
      }
      
      // 성공 콜백 호출
      if (onSuccess) onSuccess(resultImageUrl);
    } catch (error) {
      console.error('이미지 생성 오류:', error);
      
      if (customToast) {
        toast.error('이미지 생성 중 오류가 발생했습니다.', { 
          id: toastId, 
          style: toastStyle,
          duration: 3000 
        });
      }
      
      // 실패 콜백 호출
      if (onFail) onFail(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 버튼만 렌더링
  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-50 text-sm flex items-center gap-2"
    >
      <Download size={18} className="text-slate-600" />
      {buttonText}
    </button>
  );
} 