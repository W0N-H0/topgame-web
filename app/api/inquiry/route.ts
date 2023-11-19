import { NextResponse } from "next/server";
import dbConnect from "../db-connect";
import Data from "./model";

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

//요청 데이터의 유효성을 검사하는 함수
function isValidData(data: any): boolean {
  return (
    data &&
    typeof data.name === "string" &&
    typeof data.contact === "string" &&
    typeof data.company === "string" &&
    typeof data.item === "string" &&
    typeof data.address === "string" &&
    typeof data.agreedToTerms === "boolean"
  );
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    // 요청 데이터의 유효성을 검사
    if (!isValidData(body)) {
      return NextResponse.json(
        { error: "Bad Request - Invalid Data" },
        { status: BAD_REQUEST }
      );
    }

    const createdData = await Data.create(body);
    return NextResponse.json(createdData, { status: 201 });
  } catch (error) {
    console.error("Error creating example:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  try {
    // 최신 데이터 15개를 가져오기 위해 find 메서드를 사용
    const latestData = await Data.find().sort({ date: -1 }).limit(21);

    return NextResponse.json(latestData, { status: 200 });
  } catch (error) {
    console.error("Error fetching latest data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
