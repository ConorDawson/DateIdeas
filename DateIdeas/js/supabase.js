import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://zcfsnuryvumoeorwoxkn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjZnNudXJ5dnVtb2VvcndveGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNDk4NjQsImV4cCI6MjA5ODgyNTg2NH0.aqxAsBK4kQqJ8Gb4-pb9vToXp5VkpDyCI-f_IIJut6U"
);