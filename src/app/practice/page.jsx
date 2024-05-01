"use client";
import excersises from "../../../exercises.json";
import { Assignment } from "./Assignment";

export default function Practice() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
      <Assignment id={excersises[0]}></Assignment>
    </div>
  );
}
