'use client';

import { useState, useRef } from 'react';

interface TextInputProps {
  onVerify: (text: string) => void;
  isLoading: boolean;
}

export default function TextInput({ onVerify, isLoading }: TextInputProps) {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onVerify(text);
    }
  };

  const charCount = text.length;
  const maxChars = 10000;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">输入文本</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          上传文件
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, maxChars))}
            placeholder="粘贴待验证的 AI 输出内容..."
            className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 placeholder:text-slate-400"
            disabled={isLoading}
          />
          
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-sm ${charCount > maxChars * 0.9 ? 'text-red-500' : 'text-slate-400'}`}>
              {charCount.toLocaleString()} / {maxChars.toLocaleString()} 字符
            </span>
            
            {fileName && (
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {fileName}
              </span>
            )}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                验证中...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                开始验证
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
