import Image from "next/image";

const IMG_URL = "https://d1mgntrf3vaj6d.cloudfront.net/kollin_logo_white.svg";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
      <Image src={IMG_URL} alt="logotype" width={200} height={200} />
    </div>
  );
}
