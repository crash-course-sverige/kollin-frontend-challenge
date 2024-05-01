"use client";
import { nanoid } from "nanoid";
import Heart from "./Heart" 

export function Header({ excersises, answersResult, lifes }) {
    return (
        <div class="flex gap-2 mb-20">
            {excersises.map((id) => {
                const color = answersResult[id] === undefined ? 'gray' :( answersResult[id] ? 'green': 'red')
                return (
                    <div
                        key={nanoid()}
                        className={`relative grid select-none items-center rounded-lg bg-${color}-400 px-12 py-2`}
                    ></div>
                );
            })}
            <Heart/> {lifes}
        </div>
    );
}
