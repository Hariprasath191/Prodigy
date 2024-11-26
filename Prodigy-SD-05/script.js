// Path to your data file (e.g., JSON)
const DATA_URL = "products.json";

// Function to load product data
async function loadProducts() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }

    const products = await response.json(); // Assuming the file is in JSON format
    populateTable(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Function to populate the table
function populateTable(products) {
  const tableBody = document.querySelector("#products-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.rating}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Load products on page load
document.addEventListener("DOMContentLoaded", loadProducts);
