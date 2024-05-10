import { NextUIProvider } from "@nextui-org/react";
import Exersices from "./practice/page";

export default async function Home() {
  return (
    <div>
      <NextUIProvider>
        <Exersices />
      </NextUIProvider>
    </div>
  );
}
