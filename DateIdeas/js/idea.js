import { supabase } from "./supabase.js";
import { getUser } from "./auth.js";

/**
 * ADD IDEA
 */
export async function addIdea(listName, title, description) {
  const user = getUser();
  if (!user) {
    console.error("No user logged in");
    return;
  }

  const payload = {
    userId: Number(user.userId),
    user: user.user,
    listName: listName.trim(),
    ideaTitle: title.trim(),
    ideaDescription: description
  };

  console.log("INSERT IDEA PAYLOAD:", payload);

  const { data, error } = await supabase
    .from("ideas")
    .insert([payload])
    .select();

  console.log("INSERT RESULT:", data);
  console.log("INSERT ERROR:", error);

  return { data, error };
}

/**
 * GET IDEAS
 */
export async function getIdeas(listName) {
  const user = getUser();

  if (!user || !listName) {
    return { data: [], error: "Missing user or listName" };
  }

  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("userId", Number(user.userId))
    .eq("listName", listName.trim());

  console.log("IDEAS LOADED:", data, error);

  return { data, error };
}

/**
 * DELETE IDEA
 */
export async function deleteIdea(listName, ideaTitle) {
  const user = getUser();

  if (!user) {
    console.error("No user logged in");
    return;
  }

  const { data, error } = await supabase
    .from("ideas")
    .delete()
    .eq("userId", Number(user.userId))
    .eq("listName", listName.trim())
    .eq("ideaTitle", ideaTitle.trim());

  console.log("DELETE IDEA:", data, error);

  return { data, error };
}

/**
 * EDIT IDEA
 */
export async function editIdea(listName, oldTitle, newTitle, newDescription) {
  const user = getUser();

  if (!user) {
    console.error("No user logged in");
    return;
  }

  const { data, error } = await supabase
    .from("ideas")
    .update({
      ideaTitle: newTitle.trim(),
      ideaDescription: newDescription
    })
    .eq("userId", Number(user.userId))
    .eq("listName", listName.trim())
    .eq("ideaTitle", oldTitle.trim());

  console.log("EDIT IDEA:", data, error);

  return { data, error };
}