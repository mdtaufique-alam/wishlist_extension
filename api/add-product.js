import { createClient } from "@supabase/supabase-js";

// Replace these with your actual environment variables or hard-code for testing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pkkfbvfdxugakrbapdyz.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBra2ZidmZkeHVnYWtyYmFwZHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NjExODMsImV4cCI6MjA1NjUzNzE4M30.QJ_izBKJcqjE11ZUts2nZ2SROgRCQsukplgQFAQN69w";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  // CORS headers:
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const { url, title, price, image } = req.body;

      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const { data, error } = await supabase
        .from("wishlist")
        .insert([{ url, title, price, image }]);

      if (error) {
        console.error("Supabase Insert Error:", error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ success: true, message: `Product added: ${url}`, data });
    } catch (error) {
      console.error("Internal Server Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
