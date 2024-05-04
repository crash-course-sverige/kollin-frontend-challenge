import Link from "next/link";
import { Button } from "../components/ui/button";
import Image from "next/image"

export default function Home() {
    return (

        <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">

            <Image
                src="https://d1mgntrf3vaj6d.cloudfront.net/kollin_logo_white.svg"
                alt="icon"
                width={64}
                height={64}
                className="w-64"
            />
            <Button
                asChild
                className='bg-white hover:bg-neutral-200 text-medium px-6 text-[#202746] mt-10'
            >
                <Link href='/practice'>
                    Let&apos;s practice!
                </Link>
            </Button>
        </div>

    );
}
