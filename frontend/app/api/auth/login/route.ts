import { createClient } from "@supabase/supabase-js";
// import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;
  const { data } = await supabase
    .from("users")
    .select("username")
    .eq("username", username)
    .eq("password", password);
  if (data?.length != 0) {
    // const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string | "";
    // const token = sign(
    //   {
    //     username,
    //   },
    //   secret,
    //   {
    //     expiresIn: MAX_AGE,
    //   }
    // );
    const serialized = serialize("username", username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });
    const response = {
      message: "Authenticated",
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
