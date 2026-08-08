import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

function Products() {

  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      category: "Shoes",
      price: "₹5,999",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    {
      id: 2,
      name: "Denim Jacket",
      category: "Fashion",
      price: "₹2,499",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Electronics",
      price: "₹7,999",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "₹3,499",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
  ];

  return (

    <section className="py-24 bg-[#0f172a] text-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-14">

          <h2 className="text-5xl font-bold text-cyan-400">
            Trending Products
          </h2>

          <p className="text-gray-400 mt-4">
            Explore today's most popular AI-recommended products.
          </p>

        </div>

        {/* Product Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >

              {/* Image */}

              <div className="relative">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />

                <button className="absolute top-4 right-4 bg-white p-3 rounded-full text-red-500 shadow-lg">

                  <FaHeart />

                </button>

              </div>

              {/* Content */}

              <div className="p-6">

                <span className="text-cyan-400 text-sm">

                  {product.category}

                </span>

                <h3 className="text-xl font-bold mt-2">

                  {product.name}

                </h3>

                {/* Rating */}

                <div className="flex items-center gap-2 mt-3">

                  <FaStar className="text-yellow-400" />

                  <span>{product.rating}</span>

                </div>

                {/* Price */}

                <h2 className="text-3xl font-bold mt-4">

                  {product.price}

                </h2>

                {/* Buttons */}

                <div className="flex gap-3 mt-6">

                  <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold">

                    View

                  </button>

                  <button className="bg-slate-700 hover:bg-slate-600 p-4 rounded-xl">

                    <FaShoppingCart />

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default Products;