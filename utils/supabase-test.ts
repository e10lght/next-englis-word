import supabase from "./supabase";

const fetch = async () => {
  const result = await supabase.from("wordList").select("*");
  console.log(result);
};
