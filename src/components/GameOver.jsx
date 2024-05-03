import Image from "next/image";

export default function GameOver({ hearts, exercises, restart }) {
  function handleRestart() {
    restart();
  }

  return (
    <div className="absolute top-0 left-0 z-10 bg-black bg-opacity-80 w-screen h-screen">
      <div className="bg-[#586FB5] flex flex-col gap-8 items-center w-max mx-auto p-8">
        <Image
          src="https://d1mgntrf3vaj6d.cloudfront.net/kollin_logo_white.svg"
          alt="Kollin Logo"
          width="100"
          height="100"
        />
        <h1
          className={`${
            hearts === 0 ? "text-red-500" : "text-orange-300"
          } text-4xl`}
        >
          {hearts === 0 ? "Game Over!" : "Finish!"}
        </h1>
        {hearts === 0 && (
          <p className="text-white">You lost all your hearts!</p>
        )}

        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}
