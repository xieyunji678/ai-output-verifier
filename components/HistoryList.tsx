'use client';

import { HistoryItem } from '@/lib/types';

interface HistoryListProps {
  items: HistoryItem[];
  onSelect: (id: string) => void;
}

export default function HistoryList({ items, onSelect }: HistoryListProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} 分钟前`;
    if (diffHours < 24) return `${diffHours} 小时前`;
    if (diffDays < 7) return `${diffDays} 天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm">暂无验证历史</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className="w-full text-left p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-xs text-slate-400">{formatDate(item.timestamp)}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${getConfidenceColor(item.overallConfidence)}`}>
              {item.overallConfidence}%
            </span>
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">{item.preview}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span>{item.claimCount} 个断言</span>
          </div>
        </button>
      ))}
    </div>
  );
}
