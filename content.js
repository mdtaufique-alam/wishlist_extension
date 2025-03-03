(function () {
  // Create "Add to Wishlist" button
  const btn = document.createElement("button");
  btn.innerText = "Add to Wishlist";
  btn.id = "wishlist-btn";

  // Apply button styling
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "9999",
    padding: "10px 15px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    transition: "background-color 0.3s ease",
  });

  document.body.appendChild(btn);

  btn.addEventListener("click", async function () {
    btn.innerText = "Adding...";
    btn.disabled = true;
    btn.style.backgroundColor = "#005bb5";

    // Extract product details from the page.
    // Note: The selectors below are examples; inspect the page for the correct ones.
    const productURL = window.location.href;
    const title = document.querySelector("h1._3eAQiD, h1._35KyD6")?.innerText || document.title;
    const price = document.querySelector("div._30jeq3._16Jk6d")?.innerText || "Price not found";
    const image = document.querySelector("img._396cs4")?.src || "";

    const apiEndpoint = "https://wishlist-extension.vercel.app/api/add-product";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: productURL, title, price, image }),
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} ${response.statusText}`, errorText);
        alert(`Failed to add product: ${errorText}`);
      } else {
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }
        alert("Product added to wishlist!");
        console.log("API Response:", data);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Something went wrong. Check the console for details.");
    } finally {
      btn.innerText = "Add to Wishlist";
      btn.disabled = false;
      btn.style.backgroundColor = "#0070f3";
    }
  });
})();
