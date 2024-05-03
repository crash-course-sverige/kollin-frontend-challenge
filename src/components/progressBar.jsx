import { FaHeart } from "react-icons/fa";

const progressBar = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-2 w-20 rounded-full bg-gray-300 flex" />
      ))}
      <div className="flex items-center gap-2 text-red-600">
        <FaHeart />
        <span className="text-xl">3</span>
      </div>
    </div>
  );
};

export default progressBar;
