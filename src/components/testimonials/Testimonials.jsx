function Testimonials() {
  const testimonials = [
    {
      quote:
        "The AI recommendations were surprisingly accurate. It understood what I wanted after browsing a few products.",
      name: "Rahul Sharma",
      role: "Beta User",
      avatar: "👨🏻‍💻",
    },
    {
      quote:
        "Complete the Look suggested products that perfectly matched my style.",
      name: "Priya Verma",
      role: "Fashion Enthusiast",
      avatar: "👩🏻",
    },
    {
      quote:
        "Semantic Search helped me quickly find relevant products for my needs.",
      name: "Amit Patel",
      role: "Tech Shopper",
      avatar: "👨🏻‍💻",
    },
  ];

  return (
    <section className="bg-[#08111f] px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            User feedback
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            What Our Beta Users Say
          </h2>

          <p className="mt-4 text-gray-400">
            Early feedback from people exploring Discovery Engine.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-[#111d30] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <div className="mb-4 text-4xl text-cyan-400">
                "
              </div>

              <p className="min-h-[110px] text-sm leading-7 text-gray-300">
                {item.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/10 text-xl">
                  {item.avatar}
                </div>

                <div>
                  <p className="font-semibold text-white">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Testimonials;