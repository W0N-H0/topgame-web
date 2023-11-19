import { NextResponse } from "next/server";
import dbConnect from "../db-connect";
import Data from "./model";

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

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
