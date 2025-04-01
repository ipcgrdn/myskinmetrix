"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Upload, ArrowLeft, Palette, RefreshCw } from "lucide-react";

import Header from "@/components/Header";
import CameraCapture from "@/components/personal-color/CameraCapture";
import ImageUploader from "@/components/personal-color/ImageUploader";

export default function CapturePage() {
  const router = useRouter();
  const [captureMethod, setCaptureMethod] = useState<
    "camera" | "upload" | null
  >(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 카메라로 사진 촬영
  const handleCameraCapture = () => {
    setCaptureMethod("camera");
  };

  // 이미지 업로드
  const handleImageUpload = () => {
    setCaptureMethod("upload");
  };

  // 이미지 캡처/업로드 완료 처리
  const handleImageCaptured = (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
  };

  // 캡처 취소
  const handleCaptureCancel = () => {
    setCaptureMethod(null);
    setCapturedImage(null);
  };

  // 분석 시작
  const handleStartAnalysis = () => {
    if (!capturedImage) return;

    setIsLoading(true);

    // 세션 스토리지에 이미지 저장
    sessionStorage.setItem("personalColorImage", capturedImage);

    // 분석 페이지로 이동
    setTimeout(() => {
      router.push("/personal-color/analyzing");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/70 via-slate-50/70 to-white">
      <Header />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30"
          >
            {/* 상단 아이콘 */}
            <div className="flex justify-center my-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-[28px] shadow-xl shadow-cyan-500/20 flex items-center justify-center">
                <Palette size={24} className="text-white" />
              </div>
            </div>

            {/* 안내 메시지 */}
            <div className="px-8 text-center">
              {!captureMethod && !capturedImage && (
                <>
                  <h2 className="text-lg md:text-2xl font-bold text-slate-800 mb-6">
                    얼굴 사진을 촬영하거나 업로드해주세요
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm mb-10">
                    퍼스널 컬러 분석을 위해 자연광이 있는 환경에서 얼굴 정면
                    사진을 준비해주세요. <br /> 정확한 분석을 위해 화장을 하지
                    않은 상태가 좋습니다.
                  </p>
                </>
              )}

              {captureMethod && !capturedImage && (
                <div className="flex items-center mb-6">
                  <button
                    onClick={handleCaptureCancel}
                    className="absolute left-6 top-6 p-3 rounded-full hover:bg-slate-100/50 transition-colors"
                  >
                    <ArrowLeft size={20} className="text-cyan-500" />
                  </button>
                  <h2 className="text-lg md:text-xl font-bold text-slate-800 w-full">
                    {captureMethod === "camera" ? "카메라로 촬영" : "사진 업로드"}
                  </h2>
                </div>
              )}

              {capturedImage && (
                <>
                  <h2 className="text-lg md:text-2xl font-bold text-slate-800 mb-3">
                    이 사진으로 분석할까요?
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm mb-8">
                    얼굴이 잘 나온 사진인지 확인해주세요. <br /> 사진이 선명하고
                    조명이 적절할수록 더 정확한 분석이 가능합니다.
                  </p>
                </>
              )}
            </div>

            {/* 사진 캡처/업로드 영역 */}
            <div className="px-8 pb-8">
              {!captureMethod && !capturedImage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
                  <button
                    onClick={handleCameraCapture}
                    className="group relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300"
                  >
                    <div className="relative w-12 h-12 mb-4">
                      {/* 백그라운드 블러 효과 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-[24px] blur-[8px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      {/* 메인 아이콘 배경 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-[24px] flex items-center justify-center transform transition-all duration-300 group-hover:scale-105">
                        <Camera size={20} className="text-white" />
                      </div>
                    </div>
                    <span className="text-slate-700 font-medium text-sm">
                      카메라로 촬영
                    </span>
                  </button>

                  <button
                    onClick={handleImageUpload}
                    className="group relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300"
                  >
                    <div className="relative w-12 h-12 mb-4">
                      {/* 백그라운드 블러 효과 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-[24px] blur-[8px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      {/* 메인 아이콘 배경 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-[24px] flex items-center justify-center transform transition-all duration-300 group-hover:scale-105">
                        <Upload size={20} className="text-white" />
                      </div>
                    </div>
                    <span className="text-slate-700 font-medium text-sm">
                      사진 업로드
                    </span>
                  </button>
                </div>
              )}

              {captureMethod === "camera" && !capturedImage && (
                <div className="webcam-container">
                  <CameraCapture onCapture={handleImageCaptured} />
                </div>
              )}

              {captureMethod === "upload" && !capturedImage && (
                <div className="upload-container">
                  <ImageUploader onUpload={handleImageCaptured} />
                </div>
              )}

              {capturedImage && (
                <div className="flex flex-col items-center">
                  <div className="relative w-72 h-72 rounded-3xl overflow-hidden mb-8 shadow-xl border border-white/50">
                    <Image
                      src={capturedImage}
                      alt="촬영된 이미지"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex space-x-6 w-full max-w-md">
                    <button
                      onClick={handleCaptureCancel}
                      className="group flex-1 py-3 border border-slate-200 rounded-2xl text-slate-700 font-medium hover:bg-slate-50 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                    >
                      <RefreshCw
                        size={18}
                        className="text-slate-500 group-hover:text-slate-700"
                      />
                      다시 찍기
                    </button>

                    <button
                      onClick={handleStartAnalysis}
                      disabled={isLoading}
                      className={`group relative flex-1 py-3 rounded-2xl text-white font-medium text-sm overflow-hidden flex items-center justify-center gap-2 ${
                        isLoading
                          ? "bg-teal-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30"
                      } transition-all duration-300`}
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-pulse">로딩 중...</span>
                        </>
                      ) : (
                        <>
                          <Palette size={18} className="text-white" />
                          분석 시작
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 이용 약관 및 개인정보 처리 동의 */}
            <div className="p-6 bg-slate-50/70 border-t border-slate-100/40 backdrop-blur-sm">
              <p className="text-xs text-slate-500 text-center">
                분석을 위해 촬영된 이미지는 개인정보 보호를 위해 서버에 저장되지
                않으며, 기기 내에서만 처리됩니다.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
