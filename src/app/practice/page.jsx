"use client";
import excersises from "../../../exercises.json";
import { Assignment } from "./Assignment";
import { Header } from "./Header";

export default function Practice() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
      <div className="p-20 justify-between items-center relative min-w-[80%] flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
        <Header excersises={excersises} />

        <Assignment id={excersises[0]}></Assignment>
      </div>
    </div>
  );
}
