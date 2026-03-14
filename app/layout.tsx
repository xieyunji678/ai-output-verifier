import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Output Verifier',
  description: 'Verify AI outputs for factual accuracy and detect hallucinations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-slate-50">
          {children}
        </div>
      </body>
    </html>
  );
}
