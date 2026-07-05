import { supabase } from "./supabase.js";

/**
 * GET CURRENT USER (local session)
 */
export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

/**
 * REGISTER (REAL SUPABASE VERSION)
 */
export async function register(username, password) {
  // 1. check if user already exists
  const { data: existing } = await supabase
    .from("users")
    .select("*")
    .eq("user", username)
    .maybeSingle();

  if (existing) {
    alert("User already exists");
    return null;
  }

  // 2. get highest userId
  const { data: allUsers } = await supabase
    .from("users")
    .select("userId");

  let nextId = 1;

  if (allUsers && allUsers.length > 0) {
    nextId = Math.max(...allUsers.map(u => u.userId)) + 1;
  }

  // 3. insert new user
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        user: username,
        password: password,
        userId: nextId
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("REGISTER ERROR:", error);
    alert(error.message);
    return null;
  }

  // 4. save session
  localStorage.setItem("user", JSON.stringify(data));

  return data;
}

/**
 * LOGIN (REAL SUPABASE VERSION)
 */
export async function login(username, password) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user", username)
    .eq("password", password)
    .maybeSingle();

  if (error || !data) {
    alert("Invalid login");
    return null;
  }

  // save session
  localStorage.setItem("user", JSON.stringify(data));

  return data;
}