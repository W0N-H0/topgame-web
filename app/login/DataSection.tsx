import { Item } from "./page";

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
  return (
    <div className="grid grid-cols-5">
      {isLogin && data
        ? data.map((item: Item, index: number) => (
            <div key={index} className="flex flex-col p-5">
              {Object.entries(item).map(([key, value]) => (
                <p key={key}>{`${key}: ${value}`}</p>
              ))}
              <div className="flex gap-2">
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
  );
};

export default DataSection;
