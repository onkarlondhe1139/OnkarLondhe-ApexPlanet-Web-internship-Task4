const products = [
  {
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: 2499,
    rating: 4.7,
    description: "Immersive sound with soft ear cushions and wireless playback."
  },
  {
    name: "Smart Fitness Band",
    category: "Fitness",
    price: 1599,
    rating: 4.4,
    description: "Tracks daily activity, heart rate, and sleep with a bright display."
  },
  {
    name: "Ceramic Coffee Mug",
    category: "Home",
    price: 399,
    rating: 4.2,
    description: "Minimal mug design that works well for coffee, tea, or desk styling."
  },
  {
    name: "Laptop Stand",
    category: "Accessories",
    price: 899,
    rating: 4.6,
    description: "Portable aluminum stand that improves posture and desk organization."
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 1199,
    rating: 4.3,
    description: "Compact speaker with balanced sound and strong battery life."
  },
  {
    name: "Desk Organizer Set",
    category: "Home",
    price: 549,
    rating: 4.1,
    description: "Keeps your stationery, notes, and cables neatly arranged."
  },
  {
    name: "Resistance Bands Kit",
    category: "Fitness",
    price: 699,
    rating: 4.5,
    description: "Useful for mobility, strength sessions, and light home workouts."
  },
  {
    name: "Wireless Mouse",
    category: "Accessories",
    price: 499,
    rating: 4.0,
    description: "Comfortable everyday mouse with smooth tracking and compact shape."
  }
];

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortBy = document.getElementById("sortBy");
const productGrid = document.getElementById("productGrid");
const resultCount = document.getElementById("resultCount");
const activeSummary = document.getElementById("activeSummary");

function applyFilters() {
  let filteredProducts = [...products];
  const searchTerm = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const priceRange = priceFilter.value;
  const sortValue = sortBy.value;

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  if (category !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === category);
  }

  if (priceRange === "under500") {
    filteredProducts = filteredProducts.filter((product) => product.price < 500);
  } else if (priceRange === "500to1000") {
    filteredProducts = filteredProducts.filter((product) => product.price >= 500 && product.price <= 1000);
  } else if (priceRange === "above1000") {
    filteredProducts = filteredProducts.filter((product) => product.price > 1000);
  }

  if (sortValue === "ratingDesc") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortValue === "priceAsc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "priceDesc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === "nameAsc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderProducts(filteredProducts, { searchTerm, category, priceRange, sortValue });
}

function buildSummary(context, count) {
  const parts = [];

  if (context.searchTerm) {
    parts.push(`matching "${context.searchTerm}"`);
  }

  if (context.category !== "all") {
    parts.push(`in ${context.category}`);
  }

  if (context.priceRange === "under500") {
    parts.push("priced under Rs 500");
  } else if (context.priceRange === "500to1000") {
    parts.push("priced between Rs 500 and Rs 1000");
  } else if (context.priceRange === "above1000") {
    parts.push("priced above Rs 1000");
  }

  if (parts.length === 0) {
    return "Showing the full catalog.";
  }

  return `Showing ${count} product(s) ${parts.join(" and ")}.`;
}

function renderProducts(filteredProducts, context) {
  productGrid.innerHTML = "";
  resultCount.textContent = `${filteredProducts.length} Product${filteredProducts.length === 1 ? "" : "s"}`;
  activeSummary.textContent = buildSummary(context, filteredProducts.length);

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = '<div class="empty-state">No products match the selected filters. Try a different search or reset the filters.</div>';
    return;
  }

  filteredProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <span class="category">${product.category}</span>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <div class="product-meta">
        <span class="price">Rs ${product.price}</span>
        <span class="rating">${product.rating} / 5</span>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);
sortBy.addEventListener("change", applyFilters);

applyFilters();
