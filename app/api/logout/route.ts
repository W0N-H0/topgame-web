import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = new NextResponse("Logout successful");
  res.cookies.delete("auth"); // 'auth' 쿠키를 삭제
  return res;
}
