import type _mongoose from "mongoose";
import { connect } from "mongoose";

// 전역 네임스페이스에 mongoose 객체를 포함
declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

// 환경 변수에서 MongoDB URI를 가져오기
const { NEXT_PUBLIC_MONGODB_URI } = process.env;

// MongoDB URI가 정의되어 있지 않으면 에러 처리
if (!NEXT_PUBLIC_MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// 전역 네임스페이스에 캐시된 mongoose 객체가 있는지 확인
let cached = global.mongoose;

// 캐시된 mongoose 객체가 없다면 전역 네임스페이스에 초기화
if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = { conn: null, promise: null };
}

// MongoDB 데이터베이스에 연결하기 위한 함수
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  // 연결 중인 상태가 아니라면 새로운 연결을 시작
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // 연결을 시작하고 프로미스를 저장
    cached.promise = connect(NEXT_PUBLIC_MONGODB_URI!, opts).then(
      (mongoose) => {
        return mongoose;
      }
    );
  }

  try {
    // 연결 프로미스가 해결되기를 기다리고 연결을 저장
    cached.conn = await cached.promise;
  } catch (e) {
    // 연결 중 오류가 발생하면 프로미스를 재설정하고 오류 발생
    cached.promise = null;
    throw e;
  }

  // MongoDB 연결을 반환
  return cached.conn;
}

export default dbConnect;
