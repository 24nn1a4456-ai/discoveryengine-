import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-[#08111f] px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-6 py-16 text-center md:px-12">

          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Start discovering
            </p>

            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Ready to find your next favorite product?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-gray-400">
              Use AI-powered recommendations to discover products
              faster, smarter, and with confidence.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/discover"
                className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-[#08111f] transition hover:bg-cyan-300"
              >
                Get Started →
              </Link>

              <Link
                to="/categories"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Products
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default CTA;