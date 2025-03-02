(function() {
  // Prevent multiple buttons
  if (document.getElementById("wishlist-btn")) return;

  // Create the floating button
  const btn = document.createElement("button");
  btn.innerText = "Add to Wishlist";
  btn.id = "wishlist-btn";

  // Apply styling
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
  });

  document.body.appendChild(btn);

  // Click event to send data to the background script
  btn.addEventListener("click", function() {
    const productURL = window.location.href;
    chrome.runtime.sendMessage({ action: "addToWishlist", url: productURL });
  });
})();
