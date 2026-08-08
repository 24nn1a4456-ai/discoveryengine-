function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "🔎",
      title: "Tell Us What You Need",
      description:
        "Describe what you're looking for using natural language. No complicated filters are required.",
    },
    {
      number: "02",
      icon: "🤖",
      title: "AI Understands Your Intent",
      description:
        "Our AI analyzes your requirements, preferences, budget, and shopping intent.",
    },
    {
      number: "03",
      icon: "✨",
      title: "Get Smart Recommendations",
      description:
        "Receive relevant products ranked by features, price, ratings, and your preferences.",
    },
  ];

  return (
    <section className="bg-[#08111f] px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Simple & Intelligent
          </p>

          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            How It{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Find the right product in three simple steps. Let AI handle
            the research while you focus on making the best decision.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-8 md:grid-cols-3">

          {/* Connecting line */}
          <div className="absolute left-[17%] right-[17%] top-12 hidden h-px bg-white/10 md:block" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-white/10 bg-[#111d30] p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              {/* Number */}
              <div className="absolute right-5 top-5 text-sm font-bold text-gray-600">
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-3xl">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 leading-7 text-gray-400">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;