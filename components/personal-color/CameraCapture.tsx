"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Camera, RefreshCw, Settings } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cameraQuality, setCameraQuality] = useState<"standard" | "high" | "ultra">("high");
  const [hasCapability, setHasCapability] = useState(true);

  // 카메라 품질에 따른 비디오 제약 조건
  const videoConstraints = {
    width: cameraQuality === "standard" ? 640 : cameraQuality === "high" ? 1280 : 1920,
    height: cameraQuality === "standard" ? 480 : cameraQuality === "high" ? 720 : 1080,
    facingMode: "user", // 전면 카메라 (모바일용)
    // 브라우저 호환성 문제로 advanced 옵션은 제거
    whiteBalance: "auto",
    exposureMode: "auto",
    focusMode: "continuous"
  } as MediaTrackConstraints;

  // 품질 설정 변경시 카메라 재시작
  useEffect(() => {
    if (isCameraReady) {
      setIsCameraReady(false);
      setTimeout(() => {
        if (webcamRef.current) {
          webcamRef.current.video?.play();
        }
      }, 500);
    }
  }, [cameraQuality]);

  // 카메라 준비 완료 처리
  const handleUserMedia = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  // 카메라 오류 처리
  const handleUserMediaError = useCallback(() => {
    setHasCapability(false);
  }, []);

  // 이미지 후처리 - 선명도 및 대비 개선
  const enhanceImage = (imageSrc: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(imageSrc); // 캔버스 컨텍스트를 가져올 수 없는 경우 원본 반환
          return;
        }
        
        // 캔버스 크기 설정
        canvas.width = img.width;
        canvas.height = img.height;
        
        // 기본 이미지 그리기
        ctx.drawImage(img, 0, 0);
        
        try {
          // 이미지 데이터 가져오기
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // 대비 개선 (간단한 알고리즘)
          const contrast = 1.2; // 대비 값 (1보다 크면 대비 증가)
          const brightness = 10; // 밝기 조정 (0이면 변화 없음)
          
          for (let i = 0; i < data.length; i += 4) {
            // RGB 값 조정
            data[i] = Math.min(255, Math.max(0, ((data[i] - 128) * contrast) + 128 + brightness));
            data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] - 128) * contrast) + 128 + brightness));
            data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] - 128) * contrast) + 128 + brightness));
          }
          
          // 수정된 이미지 데이터 적용
          ctx.putImageData(imageData, 0, 0);
        } catch (error) {
          console.error('이미지 처리 오류:', error);
        }
        
        // 처리된 이미지 반환
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      };
      
      img.onerror = () => {
        resolve(imageSrc); // 이미지 로드 중 오류 발생 시 원본 반환
      };
    });
  };

  // 사진 촬영
  const captureImage = useCallback(async () => {
    if (!webcamRef.current) return;

    setIsCapturing(true);

    // 촬영 효과 및 이미지 후처리
    setTimeout(async () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        try {
          // 이미지 후처리
          const enhancedImage = await enhanceImage(imageSrc);
          
          // 결과 전달
          onCapture(enhancedImage);
        } catch (error) {
          console.error('이미지 처리 오류:', error);
          onCapture(imageSrc); // 오류 시 원본 이미지 사용
        }
      }
      setIsCapturing(false);
    }, 500);
  }, [onCapture]);

  // 카메라 품질 토글
  const cycleQuality = () => {
    setCameraQuality(prev => 
      prev === "standard" ? "high" : 
      prev === "high" ? "ultra" : "standard"
    );
  };

  // 카메라가 지원되지 않는 경우 메시지 표시
  if (!hasCapability) {
    return (
      <div className="rounded-2xl bg-slate-100 p-8 text-center">
        <Camera size={48} className="text-slate-400 mx-auto mb-4" />
        <h3 className="text-slate-700 font-medium mb-2">카메라에 접근할 수 없습니다</h3>
        <p className="text-slate-500 text-sm mb-4">브라우저 설정에서 카메라 접근 권한을 허용해주세요.</p>
        <button
          onClick={() => setHasCapability(true)}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900">
        {/* 웹캠 화면 */}
        <div
          className={`transition-opacity duration-300 ${
            isCameraReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
            className="w-full h-auto"
            screenshotQuality={0.95}
          />
        </div>

        {/* 카메라 로딩 중 상태 */}
        {!isCameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
            <div className="flex flex-col items-center">
              <Camera size={48} className="text-slate-400 animate-pulse" />
              <p className="mt-2 text-slate-500 text-sm">카메라 연결 중...</p>
            </div>
          </div>
        )}

        {/* 촬영 중 플래시 효과 */}
        {isCapturing && (
          <div className="absolute inset-0 bg-white animate-flash"></div>
        )}
        
        {/* 품질 표시기 */}
        {isCameraReady && (
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs text-white flex items-center">
            <Camera size={10} className="mr-1" />
            {cameraQuality === "standard" ? "일반" : cameraQuality === "high" ? "고화질" : "초고화질"}
          </div>
        )}
        
        {/* 설정 버튼 */}
        {isCameraReady && (
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white"
          >
            <Settings size={14} />
          </button>
        )}
        
        {/* 설정 패널 */}
        {showSettings && (
          <div className="absolute top-12 right-3 bg-black/70 backdrop-blur-md rounded-xl p-3 text-white text-xs">
            <p className="mb-2">카메라 설정</p>
            <button 
              onClick={cycleQuality}
              className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1.5 w-full"
            >
              <RefreshCw size={12} />
              화질 변경
            </button>
          </div>
        )}
      </div>

      {/* 촬영 버튼 */}
      <button
        onClick={captureImage}
        disabled={!isCameraReady || isCapturing}
        className={`mt-4 px-6 py-3 rounded-full text-white font-medium flex items-center gap-2 text-sm ${
          !isCameraReady || isCapturing
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30"
        } transition-all duration-300`}
      >
        <Camera size={16} />
        {isCapturing ? "촬영 중..." : "촬영하기"}
      </button>
    </div>
  );
}
