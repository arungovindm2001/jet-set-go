import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function POST() {
  const cookieStore = cookies();
  const username = cookieStore.get("username");
  const { data } = await supabase
    .from("users")
    .select()
    .eq("username", username?.value);
  console.log(data);
  return new NextResponse(JSON.stringify(data), { status: 200 });
}
