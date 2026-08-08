import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#08111f]">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="pointer-events-none absolute left-1/4 top-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="pointer-events-none absolute right-10 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />


      {/* ================= HERO CONTAINER ================= */}

      <div className="relative mx-auto grid min-h-[540px] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-8">


        {/* ================= LEFT SIDE ================= */}

        <div className="max-w-2xl">

          {/* Badge */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">

            <span>✨</span>

            AI-powered product discovery

          </div>


          {/* Heading */}

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">

            Find Products

            <span className="mt-2 block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Smarter with AI
            </span>

          </h1>


          {/* Description */}

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">

            Discover, compare, and choose the right products using
            intelligent search, personalized recommendations, and an
            AI shopping assistant.

          </p>


          {/* ================= ACTION BUTTONS ================= */}

          <div className="mt-8 flex flex-wrap gap-3">

            {/* Discover */}

            <Link
              to="/discover"
              className="group inline-flex items-center rounded-xl bg-cyan-400 px-6 py-3.5 font-bold text-[#08111f] shadow-lg shadow-cyan-400/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300"
            >

              Start Discovering

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </Link>


            {/* Categories */}

            <Link
              to="/categories"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition duration-300 hover:border-cyan-400/40 hover:bg-white/10"
            >

              Explore Products

            </Link>


            {/* AI Assistant */}

            <Link
              to="/ai-assistant"
              className="inline-flex items-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-6 py-3.5 font-semibold text-cyan-300 transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >

              ✨ Ask AI

            </Link>

          </div>


          {/* ================= PROJECT STATS ================= */}

          <div className="mt-8 flex flex-wrap gap-7 border-t border-white/10 pt-6">

            {/* Dataset */}

            <div>

              <p className="text-lg font-bold text-white">
                1.8M+
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Products in dataset
              </p>

            </div>


            {/* AI Features */}

            <div>

              <p className="text-lg font-bold text-white">
                6
              </p>

              <p className="mt-1 text-xs text-gray-500">
                AI features
              </p>

            </div>


            {/* Assistant */}

            <div>

              <p className="text-lg font-bold text-white">
                AI
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Shopping assistant
              </p>

            </div>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="relative flex items-center justify-center">

          {/* Glow */}

          <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />


          {/* ================= AI SEARCH CARD ================= */}

          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#111d30]/95 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">


            {/* Card Header */}

            <div className="flex items-center justify-between border-b border-white/10 pb-4">

              <div>

                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  AI Shopping Assistant
                </p>

                <h2 className="mt-1 text-lg font-bold text-white">
                  Find your perfect product
                </h2>

              </div>


              {/* AI Icon */}

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-lg">
                🤖
              </div>

            </div>


            {/* ================= SEARCH ================= */}

            <div className="mt-5">

              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                What are you looking for?
              </label>


              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#08111f] p-2">

                <span className="pl-2 text-base">
                  🔍
                </span>


                <input
                  type="text"
                  value="Gaming laptop under $1000"
                  readOnly
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none"
                />


                {/* Search → Discover */}

                <Link
                  to="/discover"
                  className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-[#08111f] transition hover:bg-cyan-300"
                >
                  Search
                </Link>

              </div>

            </div>


            {/* ================= AI RECOMMENDATION ================= */}

            <Link
              to="/ai-assistant"
              className="mt-4 block rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">
                    ✨
                  </div>


                  <div>

                    <p className="text-sm font-semibold text-white">
                      AI Recommendation
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Best match for your requirements
                    </p>

                  </div>

                </div>


                <span className="text-lg font-bold text-cyan-400">
                  96%
                </span>

              </div>

            </Link>


            {/* ================= RESULT CARDS ================= */}

            <div className="mt-4 grid grid-cols-2 gap-3">


              {/* Price */}

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">

                <p className="text-xs text-gray-500">
                  Price match
                </p>

                <p className="mt-1 text-sm font-bold text-emerald-400">
                  Best Price
                </p>

              </div>


              {/* AI Confidence */}

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">

                <p className="text-xs text-gray-500">
                  AI confidence
                </p>

                <p className="mt-1 text-sm font-bold text-cyan-400">
                  Excellent
                </p>

              </div>

            </div>


            {/* ================= BOTTOM MESSAGE ================= */}

            <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">

              <span className="text-base">
                💡
              </span>

              <p className="text-xs leading-5 text-gray-400">
                Compare products, prices, ratings, and features in seconds.
              </p>

            </div>


            {/* AI CTA */}

            <Link
              to="/ai-assistant"
              className="mt-4 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-cyan-400/30 hover:text-cyan-400"
            >
              Open AI Shopping Assistant →
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;