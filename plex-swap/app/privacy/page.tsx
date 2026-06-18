'use client'
import { useState } from 'react';
import { legalContent } from '@/lib/legal-data';

export default function PrivacyPage() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const data = legalContent[lang].privacy;

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} className="px-4 py-2 border rounded-full text-sm">
          {lang === 'en' ? 'ÖÐÎÄ' : 'English'}
        </button>
      </div>
      <div className="space-y-8">
        {data.sections.map((s, i) => (
          <div key={i}>
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <p className="text-gray-400 leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}