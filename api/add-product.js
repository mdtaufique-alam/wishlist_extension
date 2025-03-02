export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "Product URL is required" });
    }

    console.log("New Wishlist Item:", url);

    // Later: Store this in a database instead of just logging it

    return res.status(200).json({ message: "Product added successfully!", url });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
