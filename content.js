(async function () {
  const btn = document.createElement("button");
  btn.innerText = "Add to Wishlist";
  btn.id = "wishlist-btn";

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

    const productURL = window.location.href;
    const apiEndpoint = "https://wishlist-extension.vercel.app/api/add-product";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: productURL }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Product added to wishlist!");
      } else {
        alert(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("❌ Something went wrong. Try again!");
    }

    btn.innerText = "Add to Wishlist";
    btn.disabled = false;
    btn.style.backgroundColor = "#0070f3";
  });
})();
