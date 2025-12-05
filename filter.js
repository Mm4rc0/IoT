// filter.js - products filtering
function applyFilters() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;
    const priceRange = document.getElementById("priceFilter").value;

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const name = product.querySelector("h3").textContent.toLowerCase();
        const productCategory = product.dataset.category;
        const price = parseFloat(product.dataset.price);

        let show = true;

        // Search filter
        if (!name.includes(search)) show = false;

        // Category filter
        if (category !== "all" && productCategory !== category) show = false;

        // Price filter
        if (priceRange !== "all") {
            const [min, max] = priceRange.split("-").map(Number);
            if (price < min || price > max) show = false;
        }

        product.style.display = show ? "block" : "none";
    });
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function(){
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);
  if (priceFilter) priceFilter.addEventListener("change", applyFilters);
  // apply on load
  applyFilters();
});
