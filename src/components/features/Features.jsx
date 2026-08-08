function Features() {
  const features = [
    {
      icon: "🔍",
      title: "Semantic Search",
      description:
        "Search products using natural language like 'black shoes for wedding' with AI-powered semantic understanding.",
    },
    {
      icon: "🤖",
      title: "AI Shopping Assistant",
      description:
        "Ask shopping questions, compare products, discover gifts, and receive intelligent buying suggestions.",
    },
    {
      icon: "❤️",
      title: "Personalized Recommendations",
      description:
        "Receive product recommendations based on browsing behavior, wishlist, cart, and shopping history.",
    },
    {
      icon: "🛒",
      title: "Frequently Bought Together",
      description:
        "Discover complementary products commonly purchased together using AI recommendation models.",
    },
    {
      icon: "⚡",
      title: "Complete the Look",
      description:
        "Build stylish outfits with AI-generated recommendations based on colors, style, and category.",
    },
    {
      icon: "📈",
      title: "Session Intent Detection",
      description:
        "Our AI understands your current shopping intent in real-time to deliver highly relevant recommendations.",
    },
  ];

  return (
    <section className="bg-[#0d1728] px-6 py-20">
      {/* Section heading */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          AI-Powered{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Features
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-400">
          Experience intelligent shopping with semantic search,
          personalized recommendations, AI assistance, and real-time
          shopping intent detection.
        </p>
      </div>

      {/* Feature cards */}
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-white/10 bg-[#111d30] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#14243a]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl">
              {feature.icon}
            </div>

            <h3 className="text-xl font-bold text-white">
              {feature.title}
            </h3>

            <p className="mt-3 text-base leading-7 text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;