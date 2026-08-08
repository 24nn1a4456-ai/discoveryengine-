function Categories() {
  const categories = [
    {
      title: "Electronics",
      icon: "💻",
      description: "Latest gadgets, laptops, phones and accessories.",
    },
    {
      title: "Fashion",
      icon: "👕",
      description: "Trending clothing, shoes and accessories.",
    },
    {
      title: "Home & Living",
      icon: "🏠",
      description: "Furniture, decor and home essentials.",
    },
    {
      title: "Health & Fitness",
      icon: "💪",
      description: "Fitness equipment and wellness products.",
    },
    {
      title: "Books",
      icon: "📚",
      description: "Educational, technical and fiction books.",
    },
    {
      title: "Gaming",
      icon: "🎮",
      description: "Gaming consoles, accessories and PC games.",
    },
  ];

  return (
    <section className="py-24 bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-cyan-400">
          Popular Categories
        </h2>

        <p className="text-center text-gray-400 mt-4 mb-14">
          Explore products across our most popular categories.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 hover:bg-cyan-600 transition duration-300 cursor-pointer shadow-lg"
            >
              <div className="text-5xl mb-5">{category.icon}</div>

              <h3 className="text-2xl font-bold mb-3">
                {category.title}
              </h3>

              <p className="text-gray-300">
                {category.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;