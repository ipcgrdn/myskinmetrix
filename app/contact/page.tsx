"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 애니메이션 변수
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // 폼 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 오류 초기화
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 폼 유효성 검사
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 형식이 아닙니다";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "문의 내용을 입력해주세요";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        toast.success(data.message || "문의가 성공적으로 전송되었습니다.", {
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#334155",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px 16px",
            fontWeight: "500",
            fontSize: "14px",
          },
        });
        
        // 폼 초기화
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "문의 전송 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof Error) {
        setSubmissionError(error.message);
        toast.error(error.message, {
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#ef4444",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px 16px",
            fontWeight: "500",
            fontSize: "14px",
          },
        });
      } else {
        setSubmissionError("문의 전송 중 오류가 발생했습니다.");
        toast.error("문의 전송 중 오류가 발생했습니다.", {
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#ef4444",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px 16px",
            fontWeight: "500",
            fontSize: "14px",
          },
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/70 via-white to-white">
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <motion.div
          initial={isLoaded ? "hidden" : "visible"}
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center space-y-4 mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50/60 backdrop-blur-sm border border-cyan-100/40">
              <div className="h-px w-4 md:w-6 bg-cyan-400/40"></div>
              <span className="text-cyan-600 font-medium text-xs">
                서비스 지원
              </span>
              <div className="h-px w-4 md:w-6 bg-cyan-400/40"></div>
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-slate-800 tracking-tight">
              문의하기
            </h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              서비스 이용 중 궁금한 점이나 개선 제안, 버그 신고 등 어떤 내용이든 편하게 문의해주세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* 연락처 정보 */}
            <motion.div
              variants={slideUp}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/40 p-6 md:p-8"
            >
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                연락처 안내
              </h2>
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-1">이메일</h3>
                  <p className="text-sm text-slate-500">vivian.choooi@gmail.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-1">응답 시간</h3>
                  <p className="text-sm text-slate-500">평일 오전 10시 - 오후 6시 (영업일 기준 1-2일 내)</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-1">자주 묻는 질문</h3>
                  <ul className="list-disc pl-5 text-sm text-slate-500 space-y-1">
                    <li>서비스는 모든 브라우저에서 동작하나요?</li>
                    <li>분석 결과는 어떻게 저장할 수 있나요?</li>
                    <li>결과 공유는 어떻게 하나요?</li>
                    <li>피부 분석 알고리즘의 정확도는 어느 정도인가요?</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 문의 폼 */}
            <motion.div
              variants={slideUp}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/40 p-6 md:p-8"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm bg-white/80 border ${
                        errors.name ? "border-red-300" : "border-slate-200"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50`}
                      placeholder="홍길동"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      이메일
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm bg-white/80 border ${
                        errors.email ? "border-red-300" : "border-slate-200"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50`}
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                      문의 유형
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-white/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    >
                      <option value="">문의 유형을 선택하세요</option>
                      <option value="general">일반 문의</option>
                      <option value="technical">기술적 문제</option>
                      <option value="suggestion">기능 제안</option>
                      <option value="error">오류 신고</option>
                      <option value="other">기타</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      문의 내용
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm bg-white/80 border ${
                        errors.message ? "border-red-300" : "border-slate-200"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 min-h-[150px]`}
                      placeholder="문의하실 내용을 자세히 적어주세요."
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  {submissionError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm flex items-start">
                      <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <p>{submissionError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-sm font-medium shadow-md transition-all duration-300 flex items-center justify-center
                    ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:shadow-lg hover:from-cyan-600 hover:to-blue-600"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        전송 중...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send size={16} className="mr-2" />
                        보내기
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle className="w-14 h-14 text-cyan-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 mb-2">문의가 전송되었습니다!</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    소중한 의견에 감사드립니다. 빠른 시일 내에 답변 드리겠습니다.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 text-sm text-cyan-600 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition-colors"
                  >
                    새 문의하기
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 