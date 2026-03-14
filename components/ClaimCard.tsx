import { Claim } from '@/lib/types';

interface ClaimCardProps {
  claim: Claim;
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const statusConfig = {
    true: {
      label: '真实',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      icon: '✓'
    },
    false: {
      label: '虚假',
      color: 'bg-red-100 text-red-700 border-red-200',
      icon: '✗'
    },
    uncertain: {
      label: '不确定',
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      icon: '?'
    }
  };

  const config = statusConfig[claim.status];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${config.color}`}>
          {config.icon}
        </span>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
              {config.label}
            </span>
            {claim.confidence !== undefined && (
              <span className="text-xs text-slate-400">
                置信度: {claim.confidence}%
              </span>
            )}
          </div>
          
          <p className="text-slate-700 text-sm mb-2">{claim.text}</p>
          
          {claim.evidence && (
            <div className="mt-3 p-3 bg-slate-50 rounded-lg">
              <p className="text-xs font-medium text-slate-500 mb-1">证据来源</p>
              <p className="text-sm text-slate-600">{claim.evidence}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
