export interface SurveyAnswers {
  [key: string]: number | string[];
}

export interface AnalysisScores {
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
  reliability: {
    score: number;
    flags: string[];
    inconsistencies: string[];
  };
  recommendations: string[];
} 