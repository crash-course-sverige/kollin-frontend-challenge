import Image from "next/image"

export default function Home() {
    return (

        <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">

        <Image alt="logo" src="https://d1mgntrf3vaj6d.cloudfront.net/kollin_logo_white.svg"
                className="w-64" width="200" height="50" priority="1"/>
           
        </div>

    );
}
