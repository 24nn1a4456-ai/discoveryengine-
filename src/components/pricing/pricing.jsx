function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Explore AI-powered product discovery.",
      features: [
        "Semantic Product Search",
        "Trending Products",
        "Basic Recommendations",
        "Wishlist",
      ],
      button: "Get Started",
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Unlock personalized AI shopping experiences.",
      features: [
        "Everything in Starter",
        "AI Shopping Assistant",
        "Advanced Recommendations",
        "Complete the Look",
        "Priority Support",
      ],
      button: "Choose Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams integrating Discovery Engine.",
      features: [
        "Unlimited AI Searches",
        "Recommendation API",
        "Custom AI Models",
        "Analytics Dashboard",
        "Dedicated Support",
      ],
      button: "Contact Sales",
    },
  ];

  return (
    <section className="bg-[#0d1728] px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Simple pricing
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Plans for Every Shopper
          </h2>

          <p className="mt-4 text-gray-400">
            Start free and upgrade when you need more powerful AI features.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-7 ${
                plan.popular
                  ? "border-cyan-400 bg-[#13243a] shadow-xl shadow-cyan-400/10"
                  : "border-white/10 bg-[#111d30]"
              }`}
            >

              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-4 py-1 text-xs font-bold text-[#08111f]">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-bold text-white">
                {plan.name}
              </h3>

              <div className="mt-4">
                <span className="text-4xl font-bold text-cyan-400">
                  {plan.price}
                </span>

                {plan.price === "$9.99" && (
                  <span className="text-gray-500"> /month</span>
                )}
              </div>

              <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-400">
                {plan.description}
              </p>

              <div className="my-6 border-t border-white/10" />

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <span className="text-emerald-400">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`mt-7 w-full rounded-xl py-3 font-semibold transition ${
                  plan.popular
                    ? "bg-cyan-400 text-[#08111f] hover:bg-cyan-300"
                    : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {plan.button}
              </button>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Pricing;