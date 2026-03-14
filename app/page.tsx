'use client';

import { useState } from 'react';
import TextInput from '@/components/TextInput';
import VerificationResults from '@/components/VerificationResults';
import HistoryList from '@/components/HistoryList';
import { mockVerificationResult, mockHistory } from '@/lib/mockData';
import { VerificationResult } from '@/lib/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [history] = useState(mockHistory);

  const handleVerify = async (text: string) => {
    setIsLoading(true);
    
    // Simulate API call - replace with real API later
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response
    const mockResult: VerificationResult = {
      ...mockVerificationResult,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      originalText: text,
    };
    
    setResult(mockResult);
    setIsLoading(false);
  };

  const handleHistorySelect = (id: string) => {
    // Load from history - for now just use mock
    setResult(mockVerificationResult);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-800">AI Output Verifier</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">事实核查 + 幻觉检测</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Input & Results */}
          <div className="lg:col-span-2 space-y-6">
            <TextInput onVerify={handleVerify} isLoading={isLoading} />
            {result && <VerificationResults result={result} />}
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                验证历史
              </h2>
              <HistoryList items={history} onSelect={handleHistorySelect} />
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-indigo-50 rounded-xl border border-indigo-100 p-6">
              <h3 className="font-semibold text-indigo-800 mb-2">💡 使用提示</h3>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• 支持粘贴或上传 .txt / .md 文件</li>
                <li>• 自动提取事实断言并验证</li>
                <li>• 识别可能的 AI 幻觉内容</li>
                <li>• 可导出 PDF 或 Markdown 报告</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-400">
            AI Output Verifier © 2026 — 帮助验证 AI 输出真实性
          </p>
        </div>
      </footer>
    </div>
  );
}
