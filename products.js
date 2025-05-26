const products = [
  {
    name: "Smartphone",
    brand: "TechNova",
    category: "electronics",
    desc: "Latest 5G smartphone with AMOLED display and 128GB storage.",
    features: ["5G", "128GB", "AMOLED", "Fast Charging"],
    price: "₹29,999",
    priceValue: 29999,
    stock: 12,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    rating: 4.5
  },
  {
    name: "Jeans",
    brand: "DenimPro",
    category: "fashion",
    desc: "Comfortable stretchable denim jeans.",
    features: ["Stretchable", "Slim Fit", "Machine Washable"],
    price: "₹1,299",
    priceValue: 1299,
    stock: 8,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    rating: 4.2
  },
  {
    name: "Laptop",
    brand: "CompEdge",
    category: "electronics",
    desc: "Powerful laptop for work and gaming.",
    features: ["i7 Processor", "16GB RAM", "512GB SSD", "RTX Graphics"],
    price: "₹54,999",
    priceValue: 54999,
    stock: 5,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    rating: 4.8
  },
  {
    name: "T-Shirt",
    brand: "StyleWear",
    category: "fashion",
    desc: "100% cotton printed T-shirt.",
    features: ["100% Cotton", "Breathable", "Regular Fit"],
    price: "₹499",
    priceValue: 499,
    stock: 20,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    rating: 4.0
  },
  {
    name: "Novel - AI Future",
    brand: "BookVerse",
    category: "books",
    desc: "A thrilling novel about the future of AI.",
    features: ["Paperback", "320 pages", "Sci-Fi"],
    price: "₹399",
    priceValue: 399,
    stock: 15,
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    rating: 4.7
  }
];

let currentSort = null;

function getStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="fa fa-star" style="color:#f69d3c"></i>';
    } else if (i - rating < 1) {
      stars += '<i class="fa fa-star-half-alt" style="color:#f69d3c"></i>';
    } else {
      stars += '<i class="fa fa-star" style="color:#ccc"></i>';
    }
  }
  return stars;
}

function filterProducts() {
  const filter = document.getElementById("filter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();
  let filtered = products.filter(
    p =>
      (filter === "all" || p.category === filter) &&
      (p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search))
  );
  if (currentSort === "asc")
    filtered = filtered.slice().sort((a, b) => a.priceValue - b.priceValue);
  if (currentSort === "desc")
    filtered = filtered.slice().sort((a, b) => b.priceValue - a.priceValue);
  renderProducts(filtered);
}

function sortProducts(order) {
  currentSort = order;
  filterProducts();
}

function renderProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<div style='color:#888;padding:20px;'>No products found.</div>";
    return;
  }
  list.forEach((p, idx) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="product-img" loading="lazy" onclick="showProductModal(${idx})" style="cursor:pointer;">
      <div class="product-info">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <strong>${p.name}</strong>
          <span class="product-category">${p.category}</span>
        </div>
        <div class="product-desc">${p.desc}</div>
        <div style="font-size:0.95em;color:#1976d2;"><b>Brand:</b> ${p.brand}</div>
        <ul style="margin:6px 0 0 0;padding-left:18px;font-size:0.97em;color:#444;">
          ${p.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
        <div class="product-rating">${getStars(p.rating)} <span style="color:#888;font-size:0.95em;">${p.rating}</span></div>
        <div class="product-bottom">
          <span class="product-price">${p.price}</span>
          <span style="color:${p.stock > 0 ? '#43a047' : '#e53935'};font-weight:600;">
            ${p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
          </span>
          <button class="buy-btn" onclick="buyProduct('${p.name}')" ${p.stock === 0 ? 'disabled' : ''}><i class="fa fa-shopping-cart"></i> Buy</button>
          <button class="buy-btn" style="background:#1976d2;margin-left:8px;" onclick="showProductModal(${idx})"><i class="fa fa-eye"></i> Quick View</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

window.buyProduct = function(name) {
  alert(`Thank you for showing interest in buying "${name}"! (Demo only)`);
};

window.showProductModal = function(idx) {
  const p = products[idx];
  const modal = document.getElementById("productModal");
  const body = document.getElementById("modalBody");
  body.innerHTML = `
    <h2>${p.name}</h2>
    <img src="${p.img}" alt="${p.name}" style="width:100%;max-width:320px;border-radius:12px;margin-bottom:1rem;" loading="lazy">
    <p><b>Brand:</b> ${p.brand}</p>
    <p><b>Category:</b> ${p.category}</p>
    <p><b>Description:</b> ${p.desc}</p>
    <ul>${p.features.map(f => `<li>${f}</li>`).join("")}</ul>
    <div class="product-rating">${getStars(p.rating)} <span style="color:#888;font-size:0.95em;">${p.rating}</span></div>
    <p><b>Price:</b> <span class="product-price">${p.price}</span></p>
    <p><b>Stock:</b> <span style="color:${p.stock > 0 ? '#43a047' : '#e53935'};font-weight:600;">
      ${p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
    </span></p>
  `;
  modal.style.display = "flex";
};
window.closeModal = function() {
  document.getElementById("productModal").style.display = "none";
};

filterProducts();