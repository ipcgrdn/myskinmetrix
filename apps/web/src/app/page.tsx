import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-white text-slate-800">
      {/* 헤더 섹션 */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-teal-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="My Skin Metrix 로고"
              width={60}
              height={60}
            />
            <h1 className="text-2xl font-semibold text-teal-600">
              My Skin Metrix
            </h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/about"
              className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
            >
              서비스 소개
            </Link>
            <Link
              href="/pricing"
              className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
            >
              요금제
            </Link>
            <Link
              href="/survey"
              className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
            >
              피부 분석
            </Link>
          </nav>
          <div className="flex gap-4 items-center">
            <Link
              href="/login"
              className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
            >
              로그인
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm font-medium shadow-lg hover:shadow-teal-200 hover:bg-teal-600 transition-all"
            >
              회원가입
            </Link>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="container mx-auto px-6 pt-24 pb-28 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-teal-500"></div>
            <span className="text-teal-600 font-medium text-sm">
              AI 피부 분석 솔루션
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
            피부 데이터를
            <br />
            <span className="text-teal-600">분석하고 추적하는</span>
            <br />
            스마트 솔루션
          </h2>
          <p className="text-lg text-slate-600">
            AI 기반 정밀 피부 분석 소프트웨어로 객관적인 피부 데이터를 수집하고
            과학적 분석을 통해 최적의 관리 방법을 제안합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href="/survey"
              className="px-6 py-3 bg-teal-500 text-white rounded-md text-center font-medium shadow-lg hover:shadow-teal-200 hover:bg-teal-600 transition-all"
            >
              무료 분석 시작하기
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-white backdrop-blur-sm border border-teal-200 text-slate-700 rounded-md text-center font-medium hover:bg-teal-50 transition-all"
            >
              자세히 알아보기
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-300"></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 w-full max-w-xs border border-white/30 shadow-lg">
                <div className="flex gap-3 items-center mb-6">
                  <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center border border-white/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">피부 데이터 분석</h3>
                    <p className="text-white/80 text-sm">실시간 모니터링</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90">수분 지수</span>
                      <span className="text-white font-medium">75%</span>
                    </div>
                    <div className="w-full bg-white/30 h-1.5 rounded-full">
                      <div
                        className="bg-white h-1.5 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90">유분 지수</span>
                      <span className="text-white font-medium">55%</span>
                    </div>
                    <div className="w-full bg-white/30 h-1.5 rounded-full">
                      <div
                        className="bg-white h-1.5 rounded-full"
                        style={{ width: "55%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90">탄력 지수</span>
                      <span className="text-white font-medium">80%</span>
                    </div>
                    <div className="w-full bg-white/30 h-1.5 rounded-full">
                      <div
                        className="bg-white h-1.5 rounded-full"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90">민감도 지수</span>
                      <span className="text-white font-medium">60%</span>
                    </div>
                    <div className="w-full bg-white/30 h-1.5 rounded-full">
                      <div
                        className="bg-white h-1.5 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-24 bg-gradient-to-b from-white to-teal-50 border-y border-teal-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 justify-center mb-2">
            <div className="h-px w-6 bg-teal-500"></div>
            <span className="text-teal-600 font-medium text-sm">주요 기능</span>
            <div className="h-px w-6 bg-teal-500"></div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">
            혁신적인 분석 기술
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl border border-teal-100 hover:border-teal-300 transition-all duration-300 shadow-md hover:shadow-lg group">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                AI 피부 분석
              </h3>
              <p className="text-slate-600">
                머신러닝 알고리즘으로 5가지 주요 피부 지표를 정밀하게 측정하고
                분석하여 객관적인 데이터를 제공합니다.
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl border border-teal-100 hover:border-teal-300 transition-all duration-300 shadow-md hover:shadow-lg group">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                데이터 기반 추천
              </h3>
              <p className="text-slate-600">
                수집된 피부 데이터를 분석하여 당신의 피부 타입과 상태에 최적화된
                제품과 케어 루틴을 제안합니다.
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl border border-teal-100 hover:border-teal-300 transition-all duration-300 shadow-md hover:shadow-lg group">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                실시간 트래킹
              </h3>
              <p className="text-slate-600">
                시간에 따른 피부 변화를 실시간으로 추적하고 시각화하여 관리
                효과를 정량적으로 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-400"></div>
            <div className="relative px-8 py-16 md:px-16 border border-white/20">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  지금 바로 피부 분석을 시작하세요
                </h2>
                <p className="text-white/90 mb-8">
                  가입 없이 바로 사용 가능한 기본 분석부터 시작해보세요. <br />
                  더 자세한 데이터와 지속적인 관리를 원한다면 회원가입을
                  추천합니다.
                </p>
                <Link
                  href="/survey"
                  className="px-8 py-4 bg-white text-teal-600 rounded-md text-lg font-medium shadow-lg hover:shadow-white/20 hover:bg-white/90 transition-all inline-block"
                >
                  무료 분석 시작하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-white py-16 border-t border-teal-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-10 md:mb-0">
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-medium text-teal-600">
                  My Skin Metrix
                </h3>
              </div>
              <p className="text-slate-500 max-w-xs">
                정확하고 개인화된 피부 데이터 분석 소프트웨어로 당신의 피부
                건강을 스마트하게 관리하세요.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              <div>
                <h4 className="text-slate-800 font-medium mb-4">서비스</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-500 hover:text-teal-600 transition-colors text-sm"
                    >
                      서비스 소개
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-slate-500 hover:text-teal-600 transition-colors text-sm"
                    >
                      요금제
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-slate-500 hover:text-teal-600 transition-colors text-sm"
                    >
                      자주 묻는 질문
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-800 font-medium mb-4">회사</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/about-us"
                      className="text-slate-500 hover:text-teal-600 transition-colors text-sm"
                    >
                      회사 소개
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-slate-500 hover:text-teal-600 transition-colors text-sm"
                    >
                      문의하기
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-slate-500 hover:text-teal-600 transition-colors text-sm"
                    >
                      개인정보처리방침
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-800 font-medium mb-4">소셜 미디어</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-slate-500 hover:text-teal-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.566-.247-2.229-.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-teal-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-teal-100 mt-16 pt-8 text-center text-slate-500 text-sm">
            <p>© 2024 My Skin Metrix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
