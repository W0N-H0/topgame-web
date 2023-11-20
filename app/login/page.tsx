"use client";
import { NextPage } from "next";
import useInput from "@/hooks/useInput";
import { useState } from "react";
import DataSection from "./DataSection";

export interface Item {
  _id: string;
  isDone: boolean;
}

const Login: NextPage = () => {
  const [id, handleIdChange, clearId] = useInput("");
  const [password, handlePasswordChange, clearPassword] = useInput("");
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState([]);

  // /api/inquiry로 GET 요청을 보내는 함수
  const fetchInquiryData = async () => {
    try {
      const response = await fetch("/api/inquiry", {
        method: "GET",
        credentials: "include", // 쿠키를 포함하기 위해 이 옵션을 설정
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        console.log("Inquiry data:", data);
      } else {
        console.error("Failed to fetch inquiry data");
      }
    } catch (error) {
      console.error("Error during fetching inquiry data:", error);
    }
  };

  // 로그인 함수
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
        credentials: "include", // 쿠키를 포함하기 위해 이 옵션을 설정
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 처리
        setIsLogin(true);
        // 로그인 성공 후 /api/inquiry로 GET 요청
        fetchInquiryData();
        console.log("Login successful:", data);
      } else {
        // 로그인 실패 처리
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // 로그아웃 함수
  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // 쿠키를 포함하기 위해 이 옵션을 설정
      });

      if (response.ok) {
        // 로그아웃 성공 처리
        setIsLogin(false);
        const message = await response.text();
        console.log("Logout message:", message);
      } else {
        // 로그아웃 실패 처리
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // 상담완료 핸들러 함수
  const handleDone = async (item: Item) => {
    const isDone = !item.isDone; // 상태를 반전시킵니다.
    try {
      const response = await fetch(
        `/api/inquiry/${item._id}?isDone=${isDone}`,
        {
          method: "PATCH",
          credentials: "include", // 쿠키를 포함하기 위해 이 옵션을 설정
        }
      );

      if (response.ok) {
        console.log("Successfully updated the status");
        // 상태 업데이트 후 데이터를 다시 불러옵니다.
        fetchInquiryData();
      } else {
        console.error("Failed to update the status");
      }
    } catch (error) {
      console.error("Error during updating the status:", error);
    }
  };

  // 삭제 핸들러 함수
  const handleDelete = async (item: Item) => {
    try {
      const response = await fetch(`/api/inquiry/${item._id}`, {
        method: "DELETE",
        credentials: "include", // 쿠키를 포함하기 위해 이 옵션을 설정
      });

      if (response.ok) {
        console.log("Successfully deleted the item");
        // 항목 삭제 후 데이터를 다시 불러옵니다.
        fetchInquiryData();
      } else {
        console.error("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error during deleting the item:", error);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="mb-10 font-bold text-[2em]">관리자 로그인페이지</h1>
      {!isLogin ? (
        <form onSubmit={handleLogin}>
          <label htmlFor="id">아이디:</label>
          <input id="id" type="text" onChange={handleIdChange} value={id} />

          <label htmlFor="password">비밀번호:</label>
          <input
            id="password"
            type="password"
            onChange={handlePasswordChange}
            value={password}
          />

          <button type="submit">로그인</button>
        </form>
      ) : (
        <div>
          <button onClick={handleLogout} className="font-bold text-[1.5em]">
            로그아웃
          </button>
        </div>
      )}
      <DataSection
        isLogin={isLogin}
        data={data}
        handleDone={handleDone}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Login;
