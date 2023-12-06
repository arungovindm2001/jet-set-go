import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const authenticated = cookieStore.has("username");
  const username = cookieStore.get("username")
  return new NextResponse(JSON.stringify({username: username?.value, authenticated: authenticated}));
}
