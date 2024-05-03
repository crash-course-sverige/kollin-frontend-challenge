import { FaHeart } from "react-icons/fa";

export default function Hearts({ hearts }) {
  return (
    <div className="text-rose-500 flex items-center gap-2">
      <FaHeart />
      <span>{hearts}</span>
    </div>
  );
}
