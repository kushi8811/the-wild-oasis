import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://aqhnqawvjcgtdnogsnef.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaG5xYXd2amNndGRub2dzbmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MzcwNzMsImV4cCI6MjA0MzAxMzA3M30.EmnOnozQPOxsu2h_VR3HHUiWlVxnUctQxu-O3cJwYzQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
