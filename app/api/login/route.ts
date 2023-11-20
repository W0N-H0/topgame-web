import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, password } = await req.json();

    if (!id || !password) {
      return new NextResponse(null, { status: 400 });
    }

    if (
      id === process.env.NEXT_PUBLIC_ID &&
      password === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      const res = new NextResponse(
        JSON.stringify({ message: "Login successful" }),
        { status: 200 }
      );
      res.cookies.set("auth", "true", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: false, // Secure 속성 해제
      });
      return res;
    }

    return new NextResponse(null, { status: 401 });
  } catch (error) {
    console.error("Error during login:", error);
    return new NextResponse(null, { status: 500 });
  }
}
