// Immediately invoked function to avoid polluting the global namespace
(function() {
  // Create the floating button element
  const btn = document.createElement('button');
  btn.innerText = "Add to Wishlist";
  btn.id = "wishlist-btn";

  // Apply basic styling for visibility and ease-of-use
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.zIndex = "9999";
  btn.style.padding = "10px 15px";
  btn.style.backgroundColor = "#0070f3";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.borderRadius = "5px";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";

  // Append the button to the page body
  document.body.appendChild(btn);

  // Add an event listener to handle the click event
  btn.addEventListener('click', function() {
    // Capture the current product page URL
    const productURL = window.location.href;
    
    // Define your API endpoint (replace with your actual Vercel URL)
    const apiEndpoint = "https://your-vercel-app.vercel.app/api/add-product";

    // Send a POST request with the product URL
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: productURL })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Product added:", data);
      // Optionally, display a confirmation message on the page
      alert("Product added to your wishlist!");
    })
    .catch(error => {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    });
  });
})();
