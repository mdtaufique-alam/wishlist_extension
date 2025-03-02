export default function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "Product URL is required" });
    }

    console.log("Received URL:", url);

    return res.status(200).json({ message: "Product added successfully!", url });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
