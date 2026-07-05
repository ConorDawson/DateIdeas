import { supabase } from "./supabase.js";
import { getUser } from "./auth.js";

/**
 * CREATE LIST (DATABASE-BASED + CLEAN)
 */
export async function createList(listName) {
  const user = getUser();

  console.log("=== CREATE LIST DEBUG ===");
  console.log("RAW INPUT:", listName);
  console.log("USER:", user);

  if (!user) {
    alert("Not logged in");
    return;
  }

  if (!listName || !listName.trim()) {
    alert("List name is empty");
    return;
  }

  const clean = listName.trim();

  console.log("CLEAN LIST NAME:", clean);

  // 🔥 CHECK DUPLICATES USING userId (NOT username)
  const { data: existing, error: checkError } = await supabase
    .from("lists")
    .select("*")
    .eq("userId", Number(user.userId))
    .eq("listName", clean);

  console.log("EXISTING MATCH:", existing);
  console.log("CHECK ERROR:", checkError);

  if (existing && existing.length > 0) {
    alert("List already exists");
    return;
  }

  // 🧾 INSERT (TRUTH = DATABASE USER)
  const payload = {
    user: user.user,
    userId: Number(user.userId),
    listName: clean
  };

  console.log("INSERTING PAYLOAD:", payload);

  const { data, error } = await supabase
    .from("lists")
    .insert([payload])
    .select();

  console.log("INSERT RESULT:", data);
  console.log("INSERT ERROR:", error);

  if (error) {
    console.error("CREATE LIST FAILED:", error);
    alert(error.message);
  }

  return { data, error };
}

/**
 * GET LISTS (DATABASE-FIRST)
 */
export async function getLists() {
  const user = getUser();

  if (!user) {
    return { data: [], error: "No user logged in" };
  }

  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("userId", Number(user.userId));

  console.log("LISTS LOADED:", data);

  return { data, error };
}

/**
 * DELETE LIST (SAFE + VERIFIED OWNERSHIP)
 */
export async function deleteList(listName) {
  const user = getUser();

  console.log("DELETE DEBUG:", { listName, user });

  if (!user) {
    alert("Not logged in");
    return;
  }

  if (!listName) {
    alert("Missing list name");
    return;
  }

  const clean = listName.trim();

  // 🔥 DELETE USING userId + listName
  const { data, error } = await supabase
    .from("lists")
    .delete()
    .eq("userId", Number(user.userId))
    .eq("listName", clean);

  console.log("DELETE RESULT:", data);
  console.log("DELETE ERROR:", error);

  if (error) {
    alert(error.message);
  }

  return { data, error };
}