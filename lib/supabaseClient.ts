import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(url, key);

export const SUPABASE_IMAGE_URL =
  "https://bnamvffvziulrvptnjax.supabase.co/storage/v1/object/public/";
