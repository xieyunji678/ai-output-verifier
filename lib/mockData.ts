import { VerificationResult, HistoryItem } from './types';

export const mockVerificationResult: VerificationResult = {
  id: '1',
  timestamp: new Date().toISOString(),
  originalText: 'The Great Wall of China is visible from space with the naked eye. It was built during the Qin Dynasty (221-206 BC) and is the only man-made structure visible from space.',
  claims: [
    {
      id: 'c1',
      text: 'The Great Wall of China is visible from space with the naked eye',
      status: 'false',
      evidence: 'NASA astronauts confirm that the Great Wall is not visible to the naked eye from space, even from low Earth orbit.',
      confidence: 95
    },
    {
      id: 'c2',
      text: 'It was built during the Qin Dynasty (221-206 BC)',
      status: 'true',
      evidence: 'Construction began under Qin Shi Huang, the first Emperor of China, around 221 BC.',
      confidence: 98
    },
    {
      id: 'c3',
      text: 'It is the only man-made structure visible from space',
      status: 'false',
      evidence: 'This is a common myth. Many large structures like cities, airports, and bridges are visible from space.',
      confidence: 92
    }
  ],
  hallucinations: [
    {
      id: 'h1',
      text: 'visible from space with the naked eye',
      reason: 'This claim cannot be verified by scientific sources and is a well-known myth.',
      confidence: 88
    }
  ],
  overallConfidence: 85
};

export const mockHistory: HistoryItem[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    preview: 'The Great Wall of China is visible from space...',
    claimCount: 3,
    overallConfidence: 85
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    preview: 'Python was created by Guido van Rossum in 1991...',
    claimCount: 2,
    overallConfidence: 72
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    preview: 'The Eiffel Tower is located in London...',
    claimCount: 1,
    overallConfidence: 96
  }
];
