chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addToWishlist") {
    fetch("https://wishlist-extension.vercel.app/api/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: message.url })
    })
    .then(response => response.json())
    .then(data => console.log("Product added:", data))
    .catch(error => console.error("Error adding product:", error));
  }
});
