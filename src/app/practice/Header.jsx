"use client";
import { nanoid } from "nanoid";
import Heart from "./Heart" 

export function Header({ excersises, answersResult, lifes, changeQuestion }) {
  
    return (
        <div className="flex gap-2 mb-20">
            {excersises.map((id) => {
                let bgClass;
                if (answersResult[id] === undefined) {
                    bgClass = 'bg-custom-gray';
                } else if (answersResult[id]) {
                    bgClass = 'bg-custom-green';
                } else {
                    bgClass = 'bg-custom-red';
                }
                return (
                    <div
                        key={nanoid()}
                        className={`relative grid select-none items-center rounded-lg  px-12 py-2 cursor-pointer ${bgClass}`}
                        onClick={() => changeQuestion(id)}
                    ></div>
                );
            })}
            <Heart/> {lifes}
        </div>
    );
}
