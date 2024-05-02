import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
      <Image
        alt="logo"
        src="https://d1mgntrf3vaj6d.cloudfront.net/kollin_logo_white.svg"
        className="w-64"
        width="200"
        height="50"
        priority="1"
      />
      <Link href="/practice">
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Practice
        </button>
      </Link>
    </div>
  );
}
