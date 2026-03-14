export interface Claim {
  id: string;
  text: string;
  status: 'true' | 'false' | 'uncertain';
  evidence?: string;
  confidence?: number;
}

export interface VerificationResult {
  id: string;
  timestamp: string;
  originalText: string;
  claims: Claim[];
  hallucinations: Hallucination[];
  overallConfidence: number;
}

export interface Hallucination {
  id: string;
  text: string;
  reason: string;
  confidence: number;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  preview: string;
  claimCount: number;
  overallConfidence: number;
}
