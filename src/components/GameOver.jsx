import Link from "next/link";

export const GameOver = () => {
  return (
    <div className="min-h-screen flex items-start p-4 justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          You ran out of hearts
        </h1>
        <Link
          href="/practice"
          className="bg-[#586FB5] text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Try again
        </Link>
      </div>
    </div>
  );
};
