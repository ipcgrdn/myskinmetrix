import { useEffect } from 'react';
import Script from 'next/script';
import toast from 'react-hot-toast';

// 카카오톡 공유 버튼 Props 정의
interface KakaoShareButtonProps {
  title: string; // 공유 제목 
  description: string; // 공유 설명
  imageUrl: string; // 공유 이미지 URL
  buttonText?: string; // 버튼 텍스트
  onSuccess?: () => void; // 성공 콜백
  onFail?: (error: any) => void; // 실패 콜백
}

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoShareButton({
  title,
  description,
  imageUrl,
  buttonText = '카카오톡 공유하기',
  onSuccess,
  onFail
}: KakaoShareButtonProps) {
  // 카카오 SDK 초기화
  const initializeKakao = () => {
    // 카카오톡 SDK가 로드되었는지 확인
    if (window.Kakao && !window.Kakao.isInitialized()) {
      // 카카오 JavaScript SDK 초기화 (본인의 앱 키로 변경 필요)
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 카카오 SDK 초기화
    if (window.Kakao) {
      initializeKakao();
    }
  }, []);

  // 카카오톡 공유하기
  const shareToKakao = () => {
    if (!window.Kakao) {
      toast.error('카카오톡 SDK를 불러오는 중 오류가 발생했습니다.', {
        duration: 3000,
        style: {
          borderRadius: '12px',
          background: '#ffffff',
          color: '#334155',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '12px 16px',
          fontWeight: '500',
          fontSize: '14px',
        }
      });
      if (onFail) onFail(new Error('카카오톡 SDK 로드 실패'));
      return;
    }

    try {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '결과 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
          {
            title: '나도 분석하기',
            link: {
              mobileWebUrl: `${window.location.origin}/personal-color/capture`,
              webUrl: `${window.location.origin}/personal-color/capture`,
            },
          },
        ],
        success: function () {
          if (onSuccess) onSuccess();
          toast.success('카카오톡으로 공유되었습니다.', {
            duration: 3000,
            style: {
              borderRadius: '12px',
              background: '#ffffff',
              color: '#334155',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '12px 16px',
              fontWeight: '500',
              fontSize: '14px',
            }
          });
        },
        fail: function (error: any) {
          if (onFail) onFail(error);
          toast.error('공유 중 오류가 발생했습니다.', {
            duration: 3000,
            style: {
              borderRadius: '12px',
              background: '#ffffff',
              color: '#334155',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '12px 16px',
              fontWeight: '500',
              fontSize: '14px',
            }
          });
        },
      });
    } catch (error) {
      if (onFail) onFail(error);
      toast.error('공유 중 오류가 발생했습니다.', {
        duration: 3000,
        style: {
          borderRadius: '12px',
          background: '#ffffff',
          color: '#334155',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '12px 16px',
          fontWeight: '500',
          fontSize: '14px',
        }
      });
    }
  };

  return (
    <>
      {/* 카카오 SDK 스크립트 로드 */}
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={initializeKakao}
        strategy="lazyOnload"
      />
      
      {/* 카카오톡 공유 버튼 */}
      <button
        onClick={shareToKakao}
        className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-50 text-sm flex items-center gap-2"
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 256 256" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="xMidYMid"
          className="fill-current text-[#3B1E1E]"
        >
          <path d="M128 36.108c-64.56 0-116.892 41.512-116.892 92.672 0 32.736 21.744 61.584 54.428 78.096-2.4 8.996-8.84 32.404-9.08 33.96-.356 1.948.668 1.932 1.4.712.56-.916 22.88-15.472 32.36-21.824 12.32 2.5 25.128 3.728 37.784 3.728 64.564 0 116.892-41.512 116.892-92.672S192.56 36.108 128 36.108" />
        </svg>
        {buttonText}
      </button>
    </>
  );
} 