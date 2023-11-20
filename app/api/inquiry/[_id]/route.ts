import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../db-connect";
import Data from "../model";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { pathname } = request.nextUrl; // request.nextUrl을 사용
    const id = pathname.split("/").pop(); // 마지막 세그먼트를 ID로 사용
    const inquiryData = await Data.findById(id);

    if (!inquiryData) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(inquiryData, { status: 200 });
  } catch (error) {
    console.error("Error fetching inquiry data:", error);
    return NextResponse.json(
      { error: "Internal Server Error id" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    // 쿠키 확인
    const auth = request.cookies.get("auth");
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { pathname } = request.nextUrl; // request.nextUrl을 사용
    const id = pathname.split("/").pop(); // 마지막 세그먼트를 ID로 사용
    const deletedData = await Data.findByIdAndDelete(id);

    if (!deletedData) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(deletedData, { status: 200 });
  } catch (error) {
    console.error("Error deleting inquiry data:", error);
    return NextResponse.json(
      { error: "Internal Server Error id" },
      { status: 500 }
    );
  }
}

// isDone의 값을 바꿔주는 patch요청(쿼리를 통해)
export async function PATCH(request: NextRequest) {
  await dbConnect();

  try {
    // 쿠키 확인
    const auth = request.cookies.get("auth");
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pathname, searchParams } = request.nextUrl; // request.nextUrl을 사용
    const id = pathname.split("/").pop(); // 마지막 세그먼트를 ID로 사용
    const isDone = searchParams.get("isDone"); // 쿼리 파라미터로 'isDone' 값을 가져오기

    const updatedData = await Data.findByIdAndUpdate(
      id,
      { isDone: isDone },
      { new: true }
    );

    if (!updatedData) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.error("Error updating inquiry data:", error);
    return NextResponse.json(
      { error: "Internal Server Error id" },
      { status: 500 }
    );
  }
}
