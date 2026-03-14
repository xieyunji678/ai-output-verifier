import { VerificationResult } from '@/lib/types';
import ClaimCard from './ClaimCard';

interface VerificationResultsProps {
  result: VerificationResult;
}

export default function VerificationResults({ result }: VerificationResultsProps) {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const trueCount = result.claims.filter(c => c.status === 'true').length;
  const falseCount = result.claims.filter(c => c.status === 'false').length;
  const uncertainCount = result.claims.filter(c => c.status === 'uncertain').length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">验证结果</h2>
          <span className="text-sm text-slate-400">{formatDate(result.timestamp)}</span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-3xl font-bold text-slate-800">{result.claims.length}</p>
            <p className="text-sm text-slate-500">总断言数</p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <p className="text-3xl font-bold text-emerald-600">{trueCount}</p>
            <p className="text-sm text-emerald-600">真实</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-3xl font-bold text-red-600">{falseCount}</p>
            <p className="text-sm text-red-600">虚假</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">{uncertainCount}</p>
            <p className="text-sm text-amber-600">不确定</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm text-slate-500">整体置信度</span>
          <span className={`text-2xl font-bold ${getConfidenceColor(result.overallConfidence)}`}>
            {result.overallConfidence}%
          </span>
        </div>
      </div>

      {/* Claims */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-md font-semibold text-slate-800 mb-4">事实核查详情</h3>
        <div className="space-y-3">
          {result.claims.map(claim => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </div>

      {/* Hallucinations */}
      {result.hallucinations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-md font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            幻觉检测 ({result.hallucinations.length})
          </h3>
          <div className="space-y-3">
            {result.hallucinations.map(h => (
              <div key={h.id} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-slate-700 font-medium">"{h.text}"</p>
                  <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                    置信度 {h.confidence}%
                  </span>
                </div>
                <p className="text-sm text-slate-600">{h.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Original Text with highlights */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-md font-semibold text-slate-800 mb-4">原文标注</h3>
        <div className="p-4 bg-slate-50 rounded-lg text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
          {result.originalText.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < result.originalText.split('\n').length - 1 && '\n'}
            </span>
          ))}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 py-3 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          导出 PDF
        </button>
        <button className="flex-1 py-3 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          导出 Markdown
        </button>
      </div>
    </div>
  );
}
