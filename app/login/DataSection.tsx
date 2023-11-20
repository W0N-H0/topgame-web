"use client";
import { Item } from "./page";
import { useState } from "react";

interface DataSectionProps {
  isLogin: boolean;
  data: Item[];
  handleDone: (item: Item) => void;
  handleDelete: (item: Item) => void;
}

const DataSection: React.FC<DataSectionProps> = ({
  isLogin,
  data,
  handleDone,
  handleDelete,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // 인풋박스 체크시 checkedItems을 통해 체크여부 판별하는 함수
  const handleCheck = (item: Item) => {
    setCheckedItems({
      ...checkedItems,
      // 클릭시 체크 & 해제 처리
      [item._id]: !checkedItems[item._id],
    });
  };

  // 체크된 checkedItems을 반복문을 통해 한번에 삭제하는 핸들러함수
  const handleDeleteAll = async () => {
    for (const itemId in checkedItems) {
      if (checkedItems[itemId]) {
        const item = data.find((item) => item._id === itemId);
        if (item) {
          await handleDelete(item);
        }
      }
    }
  };
  return (
    <>
      {isLogin && data ? (
        <button
          onClick={handleDeleteAll}
          className="p-2 my-2 font-bold bg-red-500 text-white rounded-md"
        >
          체크항목 한번에 삭제
        </button>
      ) : null}
      <div className="grid grid-cols-5">
        {isLogin && data
          ? data.map((item: Item, index: number) => (
              <div key={index} className="flex flex-col p-5">
                {Object.entries(item).map(([key, value]) => (
                  <p key={key}>{`${key}: ${value}`}</p>
                ))}
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={checkedItems[item._id] || false}
                    onChange={() => handleCheck(item)}
                    className="m-2"
                  />
                  <button
                    onClick={() => handleDone(item)}
                    className={`p-2 bg-black rounded-md ${
                      item.isDone ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {item.isDone ? "상담완료취소" : "상담완료처리"}
                  </button>
                  <button
                    className="text-red-500 p-2 bg-black rounded-md"
                    onClick={() => handleDelete(item)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default DataSection;
