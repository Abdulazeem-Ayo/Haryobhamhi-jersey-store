// async function getProducts() {
//   const { data, error } = await supabase
//     .from("products")
//     .select("*");

//   if (error) {
//     console.error("Error loading products:", error);
//     return;
//   }

//   console.log(data);
// }
// getProducts();

async function testSupabase() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("❌ Supabase error:", error);
    return;
  }

  console.log("✅ Supabase connected!");
  console.log("Products:", data);
}

testSupabase();