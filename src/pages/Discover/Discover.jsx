import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

const categories = [
  "All",
  "Laptops",
  "Phones",
  "Headphones",
  "Monitors",
  "Fashion",
  "Shoes",
  "Accessories",
];

const fallbackProducts = [
  {
    id: "1",
    name: "Acer Nitro V Gaming Laptop",
    category: "Laptops",
    matchScore: 96,
    price: 899,
    specs: "RTX 4050 • 16GB RAM • 512GB SSD",
    rating: 4.6,
    reviews: 1284,
    badge: "Good value",
    icon: "💻",
  },
  {
    id: "2",
    name: "ASUS TUF Gaming A15",
    category: "Laptops",
    matchScore: 92,
    price: 999,
    specs: "RTX 4060 • 16GB RAM • 512GB SSD",
    rating: 4.7,
    reviews: 2105,
    badge: "Excellent choice",
    icon: "💻",
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    category: "Headphones",
    matchScore: 89,
    price: 349,
    specs: "ANC • 30hr Battery • Wireless",
    rating: 4.8,
    reviews: 5621,
    badge: "Highly rated",
    icon: "🎧",
  },
];

function Discover() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(
    "Gaming laptop under $1000"
  );

  const [activeSearch, setActiveSearch] = useState(
    "Gaming laptop under $1000"
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortBy, setSortBy] = useState("Best Match");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minimumRating, setMinimumRating] = useState(0);

  const [products, setProducts] = useState(fallbackProducts);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [comparedProducts, setComparedProducts] = useState([]);

  const [searchCount, setSearchCount] = useState(0);

  /*
   * ---------------------------------------------------------
   * SESSION SEARCH HISTORY
   * ---------------------------------------------------------
   *
   * This keeps recent searches for the current browser session.
   *
   * Your backend can later use this information for:
   *
   * - personalization
   * - complementary recommendations
   * - search intent
   * - "Complete the Look"
   */

  useEffect(() => {
    const savedHistory = sessionStorage.getItem(
      "discovery_search_history"
    );

    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        setSearchCount(history.length);
      } catch {
        setSearchCount(0);
      }
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * SEARCH FUNCTION
   * ---------------------------------------------------------
   */

  const handleSearch = async (query = searchQuery) => {
    const cleanedQuery = query.trim();

    if (!cleanedQuery) return;

    setLoading(true);
    setError("");
    setActiveSearch(cleanedQuery);

    /*
     * Save search in current browser session.
     */

    const previousHistory = JSON.parse(
      sessionStorage.getItem("discovery_search_history") || "[]"
    );

    const newHistory = [
      ...previousHistory,
      {
        query: cleanedQuery,
        timestamp: Date.now(),
      },
    ].slice(-10);

    sessionStorage.setItem(
      "discovery_search_history",
      JSON.stringify(newHistory)
    );

    setSearchCount(newHistory.length);

    try {
      /*
       * Send the user's natural-language query to backend.
       *
       * Example:
       * GET /api/products/search?q=gaming+laptop+under+1000
       */

      const response = await fetch(
        `${API_BASE_URL}/products/search?q=${encodeURIComponent(
          cleanedQuery
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to search products.");
      }

      const data = await response.json();

      /*
       * Support different backend response structures.
       */

      const backendProducts =
        data.products ||
        data.results ||
        data.data ||
        [];

      if (Array.isArray(backendProducts)) {
        setProducts(backendProducts);
      } else {
        setProducts([]);
      }
    } catch (err) {
      /*
       * During frontend development, fallback products
       * prevent the page from becoming blank if backend
       * is temporarily unavailable.
       */

      console.error("Product search failed:", err);

      setError(
        "Unable to connect to the recommendation service. Showing demo results."
      );

      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * QUICK SEARCH
   * ---------------------------------------------------------
   */

  const quickSearch = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  /*
   * ---------------------------------------------------------
   * COMPARE
   * ---------------------------------------------------------
   */

  const toggleCompare = (product) => {
    const exists = comparedProducts.some(
      (item) => item.id === product.id
    );

    if (exists) {
      setComparedProducts(
        comparedProducts.filter(
          (item) => item.id !== product.id
        )
      );

      return;
    }

    if (comparedProducts.length >= 3) {
      return;
    }

    setComparedProducts([
      ...comparedProducts,
      product,
    ]);
  };

  /*
   * ---------------------------------------------------------
   * FILTER + SORT
   * ---------------------------------------------------------
   */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /*
     * Category
     */

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    /*
     * Minimum price
     */

    if (minPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) >= Number(minPrice)
      );
    }

    /*
     * Maximum price
     */

    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) <= Number(maxPrice)
      );
    }

    /*
     * Rating
     */

    if (minimumRating > 0) {
      result = result.filter(
        (product) =>
          Number(product.rating) >= minimumRating
      );
    }

    /*
     * Sorting
     */

    if (sortBy === "Best Match") {
      result.sort(
        (a, b) =>
          Number(b.matchScore || 0) -
          Number(a.matchScore || 0)
      );
    }

    if (sortBy === "Price: Low to High") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sortBy === "Price: High to Low") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sortBy === "Highest Rated") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [
    products,
    selectedCategory,
    minPrice,
    maxPrice,
    minimumRating,
    sortBy,
  ]);

  /*
   * ---------------------------------------------------------
   * RESET FILTERS
   * ---------------------------------------------------------
   */

  const resetFilters = () => {
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setMinimumRating(0);
    setSortBy("Best Match");
  };

  /*
   * ---------------------------------------------------------
   * PRODUCT DETAILS
   * ---------------------------------------------------------
   */

  const openProduct = (product) => {
    navigate(`/product/${product.id}`, {
      state: {
        product,
      },
    });
  };

  return (
    <div style={styles.pageWrapper}>
      <main style={styles.container}>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header style={styles.header}>

          <div>
            <span style={styles.subHeaderTag}>
              ✨ AI PRODUCT DISCOVERY
            </span>

            <h1 style={styles.title}>
              Find the right product
            </h1>

            <p style={styles.subtitle}>
              Describe what you need in your own words.
              Our AI understands your intent and finds
              products based on relevance, price,
              features, ratings, and value.
            </p>
          </div>

          <div style={styles.headerRight}>
            <span style={styles.disclaimerTag}>
              DISCOVERY ENGINE
            </span>

            <span style={styles.disclaimerSub}>
              {searchCount > 0
                ? `${searchCount} searches this session`
                : "AI-powered recommendations"}
            </span>
          </div>

        </header>

        {/* =====================================================
            SEARCH
        ====================================================== */}

        <section style={styles.searchCard}>

          <div style={styles.searchLabelRow}>

            <div>
              <div style={styles.searchLabel}>
                What are you looking for?
              </div>

              <div style={styles.searchHelp}>
                Use natural language — AI will understand
                your shopping intent.
              </div>
            </div>

            <span style={styles.aiSearchBadge}>
              AI SEARCH
            </span>

          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
            style={styles.searchForm}
          >

            <div style={styles.inputWrapper}>

              <span style={styles.searchIcon}>
                🔍
              </span>

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Example: red dress for a party under $100"
                style={styles.searchInput}
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={styles.clearButton}
                >
                  ×
                </button>
              )}

            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.searchBtn,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Searching..." : "Find Products"}
            </button>

          </form>

          {/* QUICK SEARCHES */}

          <div style={styles.pillsRow}>

            <span style={styles.pillLabel}>
              Try:
            </span>

            <button
              type="button"
              onClick={() =>
                quickSearch(
                  "Gaming laptop under $1000"
                )
              }
              style={styles.pillBtn}
            >
              Gaming laptop under $1000
            </button>

            <button
              type="button"
              onClick={() =>
                quickSearch(
                  "Best phone for photography"
                )
              }
              style={styles.pillBtn}
            >
              Best phone for photography
            </button>

            <button
              type="button"
              onClick={() =>
                quickSearch(
                  "Wireless headphones"
                )
              }
              style={styles.pillBtn}
            >
              Wireless headphones
            </button>

            <button
              type="button"
              onClick={() =>
                quickSearch(
                  "Red dress for a party"
                )
              }
              style={styles.pillBtn}
            >
              Red dress for a party
            </button>

          </div>

        </section>

        {/* ERROR */}

        {error && (
          <div style={styles.errorBanner}>
            ⚠️ {error}
          </div>
        )}

        {/* =====================================================
            RESULTS
        ====================================================== */}

        <div style={styles.resultsGrid}>

          {/* ===================================================
              FILTER SIDEBAR
          ==================================================== */}

          <aside style={styles.sidebar}>

            <div style={styles.filterHeader}>

              <span style={styles.filterTitle}>
                Filters
              </span>

              <button
                type="button"
                style={styles.resetBtn}
                onClick={resetFilters}
              >
                Reset
              </button>

            </div>

            {/* CATEGORY */}

            <div style={styles.filterGroup}>

              <label style={styles.filterGroupLabel}>
                CATEGORY
              </label>

              <div style={styles.categoryList}>

                {categories.map((category) => {

                  const active =
                    selectedCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(category)
                      }
                      style={{
                        ...styles.categoryBtn,
                        backgroundColor: active
                          ? "rgba(34, 211, 238, 0.12)"
                          : "transparent",
                        color: active
                          ? "#22d3ee"
                          : "#94a3b8",
                        fontWeight: active
                          ? "600"
                          : "400",
                      }}
                    >
                      {category}
                    </button>
                  );
                })}

              </div>

            </div>

            {/* PRICE */}

            <div style={styles.filterGroup}>

              <label style={styles.filterGroupLabel}>
                PRICE RANGE
              </label>

              <div style={styles.priceRow}>

                <input
                  type="number"
                  value={minPrice}
                  onChange={(event) =>
                    setMinPrice(event.target.value)
                  }
                  placeholder="Min"
                  style={styles.priceInput}
                />

                <input
                  type="number"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(event.target.value)
                  }
                  placeholder="Max"
                  style={styles.priceInput}
                />

              </div>

            </div>

            {/* RATING */}

            <div style={styles.filterGroup}>

              <label style={styles.filterGroupLabel}>
                MINIMUM RATING
              </label>

              <div style={styles.radioList}>

                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="rating"
                    checked={minimumRating === 4.5}
                    onChange={() =>
                      setMinimumRating(4.5)
                    }
                  />
                  4.5+ ★
                </label>

                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="rating"
                    checked={minimumRating === 4}
                    onChange={() =>
                      setMinimumRating(4)
                    }
                  />
                  4.0+ ★
                </label>

                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="rating"
                    checked={minimumRating === 0}
                    onChange={() =>
                      setMinimumRating(0)
                    }
                  />
                  Any rating
                </label>

              </div>

            </div>

          </aside>

          {/* ===================================================
              PRODUCT SECTION
          ==================================================== */}

          <section style={styles.productSection}>

            {/* RESULTS HEADER */}

            <div style={styles.resultsHeader}>

              <div>

                <span style={styles.resultsTag}>
                  SEARCH RESULTS FOR
                </span>

                <h2 style={styles.queryTitle}>
                  "{activeSearch}"
                </h2>

              </div>

              <div style={styles.sortBox}>

                <span style={styles.resultCount}>
                  {filteredProducts.length} products found
                </span>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  style={styles.sortSelect}
                >
                  <option>Best Match</option>
                  <option>
                    Price: Low to High
                  </option>
                  <option>
                    Price: High to Low
                  </option>
                  <option>
                    Highest Rated
                  </option>
                </select>

              </div>

            </div>

            {/* =================================================
                AI RECOMMENDATION
            ================================================== */}

            <div style={styles.aiBanner}>

              <span style={styles.aiIcon}>
                ✨
              </span>

              <div style={{ flex: 1 }}>

                <strong style={styles.aiTitle}>
                  AI Recommendation
                </strong>

                <p style={styles.aiDescription}>
                  Results are ranked using your current
                  search intent, product relevance,
                  price, ratings, and available data.
                </p>

              </div>

              <div style={styles.aiConfidence}>
                <strong>
                  {filteredProducts.length > 0
                    ? `${Math.round(
                        Number(
                          filteredProducts[0]
                            ?.matchScore || 0
                        )
                      )}%`
                    : "—"}
                </strong>

                <span>
                  best match
                </span>
              </div>

            </div>

            {/* =================================================
                LOADING
            ================================================== */}

            {loading && (
              <div style={styles.loadingCard}>
                <div style={styles.loadingIcon}>
                  ✨
                </div>

                <strong>
                  Understanding your search...
                </strong>

                <span>
                  Finding relevant products and ranking
                  the best matches.
                </span>
              </div>
            )}

            {/* =================================================
                PRODUCTS
            ================================================== */}

            {!loading &&
              filteredProducts.length > 0 && (
                <div style={styles.productList}>

                  {filteredProducts.map((product) => {

                    const isCompared =
                      comparedProducts.some(
                        (item) =>
                          item.id === product.id
                      );

                    return (
                      <article
                        key={product.id}
                        style={styles.productCard}
                      >

                        {/* TOP */}

                        <div style={styles.cardHeader}>

                          <span
                            style={styles.matchBadge}
                          >
                            {product.matchScore || 0}%
                            AI match
                          </span>

                          <div
                            style={styles.priceBox}
                          >
                            <span
                              style={styles.priceText}
                            >
                              $
                              {Number(
                                product.price || 0
                              ).toLocaleString()}
                            </span>

                            <span
                              style={styles.matchText}
                            >
                              Best available match
                            </span>
                          </div>

                        </div>

                        {/* BODY */}

                        <div style={styles.cardBody}>

                          <div
                            style={styles.productIcon}
                          >
                            {product.icon || "🛍️"}
                          </div>

                          <div
                            style={
                              styles.productDetails
                            }
                          >

                            <div
                              style={
                                styles.productTopRow
                              }
                            >

                              <div>

                                <h3
                                  style={
                                    styles.productName
                                  }
                                >
                                  {product.name}
                                </h3>

                                <p
                                  style={
                                    styles.productSpecs
                                  }
                                >
                                  {product.specs ||
                                    "Product specifications available"}
                                </p>

                              </div>

                              <span
                                style={
                                  styles.categoryBadge
                                }
                              >
                                {product.category ||
                                  "Product"}
                              </span>

                            </div>

                            {/* RATING */}

                            <div
                              style={
                                styles.ratingRow
                              }
                            >

                              <span
                                style={
                                  styles.starText
                                }
                              >
                                ★ {product.rating}
                              </span>

                              <span
                                style={
                                  styles.reviewsText
                                }
                              >
                                {Number(
                                  product.reviews || 0
                                ).toLocaleString()}{" "}
                                reviews
                              </span>

                              <span
                                style={
                                  styles.valueBadge
                                }
                              >
                                ✓{" "}
                                {product.badge ||
                                  "Good value"}
                              </span>

                            </div>

                            {/* ACTIONS */}

                            <div
                              style={
                                styles.cardActions
                              }
                            >

                              <button
                                type="button"
                                style={
                                  styles.viewBtn
                                }
                                onClick={() =>
                                  openProduct(
                                    product
                                  )
                                }
                              >
                                View Product
                              </button>

                              <button
                                type="button"
                                style={{
                                  ...styles.compareBtn,
                                  color: isCompared
                                    ? "#22d3ee"
                                    : "#94a3b8",
                                  borderColor:
                                    isCompared
                                      ? "#22d3ee"
                                      : "#334155",
                                }}
                                onClick={() =>
                                  toggleCompare(
                                    product
                                  )
                                }
                              >
                                {isCompared
                                  ? "✓ Added"
                                  : "+ Compare"}
                              </button>

                            </div>

                          </div>

                        </div>

                      </article>
                    );
                  })}

                </div>
              )}

            {/* NO RESULTS */}

            {!loading &&
              filteredProducts.length === 0 && (
                <div style={styles.emptyState}>

                  <div style={styles.emptyIcon}>
                    🔎
                  </div>

                  <h3>
                    No matching products found
                  </h3>

                  <p>
                    Try changing your category,
                    price range, rating, or search
                    query.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    style={styles.viewBtn}
                  >
                    Reset Filters
                  </button>

                </div>
              )}

            {/* =================================================
                COMPARE BAR
            ================================================== */}

            {comparedProducts.length > 0 && (
              <div style={styles.compareBar}>

                <div>

                  <div
                    style={
                      styles.compareTitle
                    }
                  >
                    {comparedProducts.length}{" "}
                    product
                    {comparedProducts.length !==
                    1
                      ? "s"
                      : ""}{" "}
                    selected
                  </div>

                  <div
                    style={
                      styles.compareSub
                    }
                  >
                    Select up to 3 products
                    to compare.
                  </div>

                </div>

                <div
                  style={
                    styles.comparePills
                  }
                >

                  {comparedProducts.map(
                    (product) => (
                      <span
                        key={product.id}
                        style={
                          styles.selectedPill
                        }
                      >
                        {product.name}

                        <button
                          type="button"
                          style={
                            styles.removePillBtn
                          }
                          onClick={() =>
                            toggleCompare(
                              product
                            )
                          }
                        >
                          ×
                        </button>
                      </span>
                    )
                  )}

                  {comparedProducts.length >=
                    2 && (
                    <button
                      type="button"
                      style={
                        styles.compareNowBtn
                      }
                      onClick={() =>
                        navigate(
                          "/compare",
                          {
                            state: {
                              products:
                                comparedProducts,
                            },
                          }
                        )
                      }
                    >
                      Compare Now →
                    </button>
                  )}

                </div>

              </div>
            )}

            {/* =================================================
                AI ASSISTANT CTA
            ================================================== */}

            <div style={styles.helpBanner}>

              <div>

                <h4 style={styles.helpTitle}>
                  Need help choosing?
                </h4>

                <p style={styles.helpSub}>
                  Ask the AI assistant to explain
                  which product best fits your
                  requirements.
                </p>

              </div>

              <button
                type="button"
                style={styles.askAiBtn}
                onClick={() =>
                  navigate("/ai-assistant", {
                    state: {
                      searchQuery:
                        activeSearch,
                      products:
                        filteredProducts,
                    },
                  })
                }
              >
                Ask AI Assistant →
              </button>

            </div>

          </section>
        </div>
      </main>
    </div>
  );
}

/* =============================================================
   STYLES
============================================================= */

const styles = {
  pageWrapper: {
    backgroundColor: "#060b13",
    color: "#f8fafc",
    minHeight: "100vh",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    paddingBottom: "70px",
  },

  container: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "36px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "30px",
  },

  subHeaderTag: {
    color: "#22d3ee",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.08em",
  },

  title: {
    fontSize: "34px",
    fontWeight: "800",
    margin: "7px 0 9px",
    letterSpacing: "-0.03em",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "14px",
    maxWidth: "700px",
    margin: 0,
    lineHeight: "1.7",
  },

  headerRight: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: "180px",
  },

  disclaimerTag: {
    fontSize: "10px",
    fontWeight: "800",
    color: "#64748b",
    letterSpacing: "0.08em",
  },

  disclaimerSub: {
    fontSize: "12px",
    color: "#22d3ee",
    fontWeight: "600",
  },

  searchCard: {
    backgroundColor: "#0b1322",
    border: "1px solid #1e293b",
    borderRadius: "18px",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  searchLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  searchLabel: {
    fontWeight: "700",
    fontSize: "15px",
  },

  searchHelp: {
    marginTop: "4px",
    fontSize: "12px",
    color: "#64748b",
  },

  aiSearchBadge: {
    backgroundColor: "rgba(34,211,238,0.08)",
    border: "1px solid rgba(34,211,238,0.2)",
    color: "#22d3ee",
    borderRadius: "8px",
    padding: "7px 10px",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "0.06em",
  },

  searchForm: {
    display: "flex",
    gap: "12px",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#060b13",
    border: "1px solid #334155",
    borderRadius: "11px",
    padding: "5px 14px",
    flex: 1,
  },

  searchIcon: {
    fontSize: "16px",
  },

  searchInput: {
    backgroundColor: "transparent",
    border: "none",
    color: "#f8fafc",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    padding: "10px 0",
  },

  clearButton: {
    background: "transparent",
    border: "none",
    color: "#64748b",
    fontSize: "20px",
    cursor: "pointer",
  },

  searchBtn: {
    backgroundColor: "#06b6d4",
    color: "#020617",
    border: "none",
    padding: "0 25px",
    minHeight: "48px",
    borderRadius: "11px",
    fontWeight: "800",
    fontSize: "13px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  pillsRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },

  pillLabel: {
    fontSize: "12px",
    color: "#64748b",
    marginRight: "2px",
  },

  pillBtn: {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    color: "#94a3b8",
    padding: "6px 11px",
    borderRadius: "20px",
    fontSize: "11px",
    cursor: "pointer",
  },

  errorBanner: {
    backgroundColor: "rgba(245,158,11,0.08)",
    border: "1px solid rgba(245,158,11,0.25)",
    color: "#fbbf24",
    padding: "12px 15px",
    borderRadius: "10px",
    fontSize: "12px",
  },

  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "220px minmax(0, 1fr)",
    gap: "24px",
    alignItems: "start",
  },

  sidebar: {
    backgroundColor: "#0b1322",
    border: "1px solid #1e293b",
    borderRadius: "16px",
    padding: "19px",
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  filterTitle: {
    fontWeight: "700",
    fontSize: "14px",
  },

  resetBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#22d3ee",
    fontSize: "11px",
    cursor: "pointer",
  },

  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "9px",
  },

  filterGroupLabel: {
    fontSize: "10px",
    fontWeight: "800",
    color: "#64748b",
    letterSpacing: "0.08em",
  },

  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  categoryBtn: {
    textAlign: "left",
    border: "none",
    padding: "8px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    cursor: "pointer",
  },

  priceRow: {
    display: "flex",
    gap: "7px",
  },

  priceInput: {
    width: "100%",
    backgroundColor: "#060b13",
    border: "1px solid #334155",
    color: "#f8fafc",
    padding: "8px",
    borderRadius: "7px",
    fontSize: "11px",
    outline: "none",
  },

  radioList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  radioLabel: {
    fontSize: "12px",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    cursor: "pointer",
  },

  productSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: 0,
  },

  resultsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "20px",
  },

  resultsTag: {
    fontSize: "10px",
    color: "#64748b",
    fontWeight: "800",
    letterSpacing: "0.08em",
  },

  queryTitle: {
    fontSize: "20px",
    fontWeight: "750",
    margin: "3px 0 0",
  },

  sortBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  resultCount: {
    fontSize: "11px",
    color: "#64748b",
    whiteSpace: "nowrap",
  },

  sortSelect: {
    backgroundColor: "#0b1322",
    border: "1px solid #334155",
    color: "#f8fafc",
    padding: "8px 11px",
    borderRadius: "8px",
    fontSize: "11px",
    outline: "none",
  },

  aiBanner: {
    backgroundColor: "rgba(8,51,68,0.35)",
    border: "1px solid rgba(34,211,238,0.25)",
    borderRadius: "13px",
    padding: "15px 17px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  aiIcon: {
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9px",
    backgroundColor: "rgba(34,211,238,0.08)",
  },

  aiTitle: {
    color: "#22d3ee",
    fontSize: "13px",
  },

  aiDescription: {
    color: "#94a3b8",
    fontSize: "11px",
    margin: "3px 0 0",
    lineHeight: "1.5",
  },

  aiConfidence: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    minWidth: "60px",
  },

  loadingCard: {
    minHeight: "180px",
    border: "1px solid #1e293b",
    backgroundColor: "#0b1322",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: "#f8fafc",
    fontSize: "13px",
  },

  loadingIcon: {
    fontSize: "28px",
    marginBottom: "5px",
  },

  productList: {
    display: "flex",
    flexDirection: "column",
    gap: "13px",
  },

  productCard: {
    backgroundColor: "#0b1322",
    border: "1px solid #1e293b",
    borderRadius: "16px",
    padding: "18px",
    transition: "border-color 0.2s ease",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "15px",
  },

  matchBadge: {
    backgroundColor: "rgba(34,211,238,0.1)",
    color: "#22d3ee",
    fontSize: "11px",
    fontWeight: "800",
    padding: "5px 9px",
    borderRadius: "20px",
  },

  priceBox: {
    textAlign: "right",
  },

  priceText: {
    fontSize: "20px",
    fontWeight: "800",
    display: "block",
  },

  matchText: {
    fontSize: "10px",
    color: "#64748b",
  },

  cardBody: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
  },

  productIcon: {
    width: "64px",
    height: "64px",
    flexShrink: 0,
    fontSize: "30px",
    backgroundColor: "#060b13",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
  },

  productDetails: {
    flex: 1,
    minWidth: 0,
  },

  productTopRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
  },

  productName: {
    fontSize: "16px",
    fontWeight: "750",
    margin: 0,
  },

  categoryBadge: {
    color: "#64748b",
    fontSize: "10px",
    border: "1px solid #1e293b",
    borderRadius: "20px",
    padding: "4px 8px",
    whiteSpace: "nowrap",
  },

  productSpecs: {
    color: "#94a3b8",
    fontSize: "11px",
    margin: "5px 0 11px",
  },

  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "11px",
    marginBottom: "13px",
    flexWrap: "wrap",
  },

  starText: {
    color: "#facc15",
    fontWeight: "700",
  },

  reviewsText: {
    color: "#64748b",
  },

  valueBadge: {
    color: "#34d399",
    fontWeight: "600",
  },

  cardActions: {
    display: "flex",
    gap: "9px",
    flexWrap: "wrap",
  },

  viewBtn: {
    backgroundColor: "#06b6d4",
    color: "#020617",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    fontWeight: "750",
    fontSize: "11px",
    cursor: "pointer",
  },

  compareBtn: {
    backgroundColor: "transparent",
    padding: "8px 15px",
    borderRadius: "8px",
    fontWeight: "650",
    fontSize: "11px",
    cursor: "pointer",
  },

  emptyState: {
    border: "1px solid #1e293b",
    backgroundColor: "#0b1322",
    borderRadius: "16px",
    padding: "50px 25px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },

  emptyIcon: {
    fontSize: "35px",
    marginBottom: "5px",
  },

  compareBar: {
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "13px",
    padding: "13px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  compareTitle: {
    fontWeight: "700",
    fontSize: "12px",
  },

  compareSub: {
    fontSize: "10px",
    color: "#64748b",
    marginTop: "3px",
  },

  comparePills: {
    display: "flex",
    gap: "7px",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },

  selectedPill: {
    backgroundColor: "#1e293b",
    color: "#22d3ee",
    fontSize: "10px",
    padding: "5px 8px 5px 10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  removePillBtn: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "14px",
    lineHeight: 1,
  },

  compareNowBtn: {
    backgroundColor: "#06b6d4",
    border: "none",
    color: "#020617",
    padding: "7px 11px",
    borderRadius: "7px",
    fontSize: "10px",
    fontWeight: "800",
    cursor: "pointer",
  },

  helpBanner: {
    backgroundColor: "#0b1322",
    border: "1px solid #1e293b",
    borderRadius: "14px",
    padding: "18px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginTop: "3px",
  },

  helpTitle: {
    fontSize: "14px",
    fontWeight: "750",
    margin: 0,
  },

  helpSub: {
    color: "#94a3b8",
    fontSize: "11px",
    margin: "4px 0 0",
    lineHeight: "1.5",
  },

  askAiBtn: {
    backgroundColor: "rgba(34,211,238,0.08)",
    color: "#22d3ee",
    border: "1px solid rgba(34,211,238,0.3)",
    padding: "9px 14px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "11px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

export default Discover;