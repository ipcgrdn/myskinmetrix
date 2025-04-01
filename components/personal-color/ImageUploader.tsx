"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  onUpload: (imageSrc: string) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 드래그 이벤트 처리
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  // 파일 처리 로직
  const processFile = useCallback(
    (file: File) => {
      // 파일 타입 체크
      if (!file.type.match("image.*")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setIsLoading(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        
        // 이미지 로딩을 위해 짧은 지연 후 결과 전달
        setTimeout(() => {
          onUpload(result);
          setIsLoading(false);
        }, 500);
      };

      reader.readAsDataURL(file);
    },
    [onUpload]
  );

  // 드롭 이벤트 처리
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        processFile(file);
        e.dataTransfer.clearData();
      }
    },
    [processFile]
  );

  // 파일 선택 이벤트 처리
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        processFile(file);
      }
    },
    [processFile]
  );

  // 파일 선택 버튼 클릭
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* 파일 업로드 영역 */}
      <div
        className={`relative w-full h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
          isDragging
            ? "border-teal-500 bg-teal-50/30"
            : "border-slate-200 hover:border-teal-400 hover:bg-teal-50/20"
        } ${preview ? "bg-slate-100/50" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* 이미지 미리보기 */}
        {preview ? (
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={preview}
              alt="업로드 미리보기"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
              <Upload size={20} className="text-white" />
            </div>
            <p className="text-slate-700 font-medium text-sm mb-2">
              이미지를 드래그하거나 클릭하세요
            </p>
            <p className="text-slate-500 text-xs text-center max-w-xs">
              JPG, PNG 파일을 업로드할 수 있습니다.
              <br />
              정면 얼굴이 포함된 사진을 선택해주세요.
            </p>
          </>
        )}

        {/* 로딩 오버레이 */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl">
            <div className="flex flex-col items-center">
              <ImageIcon size={16} className="text-teal-500 animate-pulse" />
              <p className="mt-2 text-slate-700 text-sm">이미지 처리 중...</p>
            </div>
          </div>
        )}
      </div>

      {/* 파일 선택 버튼 */}
      {!preview && (
        <button
          onClick={handleSelectFile}
          className="mt-6 px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-2 text-sm"
        >
          <Upload size={16} />
          파일 선택하기
        </button>
      )}

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
} 