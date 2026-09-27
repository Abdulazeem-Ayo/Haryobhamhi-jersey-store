const supabaseUrl = "https://oczgzmiiorpnslfwegvx.supabase.co";
const supabaseKey = "process.env.SUPABASE_KEY";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

console.log("Supabase connected:", supabase);