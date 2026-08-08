import { useState } from "react";

function FAQ() {
  const questions = [
    {
      question: "What is Discovery Engine?",
      answer:
        "Discovery Engine is an AI-powered product discovery platform that helps users search, compare, and discover products.",
    },
    {
      question: "Is Discovery Engine free to use?",
      answer:
        "Yes. Users can start with the free plan and explore the core product discovery features.",
    },
    {
      question: "How are recommendations generated?",
      answer:
        "Recommendations are generated using product information, search intent, preferences, and AI-powered matching.",
    },
    {
      question: "Can I save my favorite products?",
      answer:
        "Yes. You can save products to your wishlist so you can easily find them later.",
    },
    {
      question: "Is my personal data secure?",
      answer:
        "We aim to keep user information protected and only use relevant data to improve the shopping experience.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="bg-[#08111f] px-6 py-20">
      <div className="mx-auto max-w-3xl">

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            FAQ
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-400">
            Everything you need to know about Discovery Engine.
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((item, index) => (
            <div
              key={item.question}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#111d30]"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between px-5 py-5 text-left"
              >
                <span className="font-semibold text-white">
                  {item.question}
                </span>

                <span className="ml-4 text-xl text-cyan-400">
                  {open === index ? "−" : "+"}
                </span>
              </button>

              {open === index && (
                <div className="border-t border-white/10 px-5 py-5">
                  <p className="text-sm leading-7 text-gray-400">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQ;