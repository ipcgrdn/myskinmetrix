import Link from "next/link";
import Header from "@/components/Header";

export default function SurveyStart() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/70 via-slate-50/70 to-white">
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50/50 backdrop-blur-sm border border-cyan-100/20">
              <div className="h-px w-4 md:w-6 bg-cyan-500/50"></div>
              <span className="text-cyan-600 font-medium text-xs">
                맞춤형 피부 타입 분석
              </span>
              <div className="h-px w-4 md:w-6 bg-cyan-500/50"></div>
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-slate-800 tracking-tight">
              과학적인 피부 분석으로
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500">
                맞춤형 솔루션
              </span>
            </h1>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-6 mb-6">
            <ul className="space-y-4 md:space-y-8 mb-6">
              <li className="flex gap-3 items-center group">
                <div className="w-5 h-5 md:w-8 md:h-8 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 md:h-4 md:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-xs md:text-sm text-slate-600 flex-1 leading-relaxed">
                  <span className="font-medium text-slate-800">
                    객관적인 답변
                  </span>
                  을 해주세요. 현재 피부 상태에 대해 있는 그대로 답변해주세요.
                </p>
              </li>
              <li className="flex gap-3 items-center group">
                <div className="w-5 h-5 md:w-8 md:h-8 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 md:h-4 md:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="text-xs md:text-sm text-slate-600 flex-1 leading-relaxed">
                  <span className="font-medium text-slate-800">
                    맞춤형 피부 타입
                  </span>
                  은 유수분, 민감도, 색소침착, 노화도의 4가지 차원으로
                  분석합니다.
                </p>
              </li>
              <li className="flex gap-3 items-center group">
                <div className="w-5 h-5 md:w-8 md:h-8 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 md:h-4 md:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <p className="text-xs md:text-sm text-slate-600 flex-1 leading-relaxed">
                  <span className="font-medium text-slate-800">
                    설문 결과는
                  </span>{" "}
                  사용자의 기기에만 저장됩니다.
                </p>
              </li>
              <li className="flex gap-3 items-center group">
                <div className="w-5 h-5 md:w-8 md:h-8 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 md:h-4 md:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-xs md:text-sm text-slate-600 flex-1 leading-relaxed">
                  <span className="font-medium text-slate-800">
                    언제든지 중단
                  </span>
                  하고 나중에 다시 시작할 수 있습니다.
                </p>
              </li>
            </ul>

            <div className="flex justify-center">
              <Link
                href="/survey/1"
                className="group relative w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-center font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 overflow-hidden text-sm"
              >
                <span className="relative z-10">무료 분석 시작하기</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
