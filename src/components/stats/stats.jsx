function Stats() {
  const stats = [
    {
      value: "1.8M+",
      label: "Products in dataset",
    },
    {
      value: "6",
      label: "AI features",
    },
    {
      value: "24/7",
      label: "AI shopping assistant",
    },
  ];

  return (
    <section className="border-y border-white/10 bg-[#0b1628] py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 sm:grid-cols-3 lg:px-8">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-h-[110px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]"
          >
            <div className="text-3xl font-extrabold text-cyan-400">
              {stat.value}
            </div>

            <div className="mt-2 text-sm font-medium text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Stats;