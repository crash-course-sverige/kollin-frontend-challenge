"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="min-h-screen flex items-start p-4 justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-4">
          Something went wrong. Please try again later or go back to the start
          of the quiz.
        </p>
        <Link
          href="/practice"
          className="bg-[#586FB5] text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Go to Start Quiz
        </Link>
      </div>
    </div>
  );
}
