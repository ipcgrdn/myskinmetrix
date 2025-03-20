export interface SurveyAnswers {
  [key: string]: number | string[];
}

export interface AnalysisScores {
  [key: string]: number;
  doScore: number;
  srScore: number;
  pnScore: number;
  wtScore: number;
  barrierScore: number;
  lifestyleScore: number;
}

export interface AnalysisResult {
  skinType: string;
  scores: AnalysisScores;
} 