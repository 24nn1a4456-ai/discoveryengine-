import React from 'react';

export default function Home() {
  const categories = [
    {
      title: 'Electronics & Tech',
      count: '450k+ items',
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Home & Kitchen',
      count: '320k+ items',
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: 'Fashion & Apparel',
      count: '610k+ items',
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: 'Smart Gadgets',
      count: '180k+ items',
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: 'Conversational Search',
      desc: 'Describe what you need in plain English instead of fighting complex side-bar filters.',
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: 'Instant Side-by-Side',
      desc: 'Automatically summarize reviews, specs, and prices across top platforms.',
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: '99.4% Match Accuracy',
      desc: 'Our semantic AI matches products based on true context, budget, and preference.',
      icon: (
        <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#08111f] text-white py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* ================= CATEGORIES SECTION ================= */}
        <section>
          <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-[#0d1b2e] border border-white/5 p-5 rounded-2xl hover:border-cyan-400/30 hover:bg-[#11223a] transition-all duration-200 cursor-pointer group"
              >
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-cyan-400/10 transition-colors">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {cat.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WHY SHOP WITH SNAPCART ================= */}
        <section className="text-center pt-8">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            POWERED BY INTELLECTUAL AI
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-2 mb-10 tracking-tight">
            Why Shop With SnapCart?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-[#0d1b2e] border border-white/5 p-7 rounded-2xl space-y-4 hover:border-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}