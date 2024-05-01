"use client";
import { nanoid } from "nanoid";

export function Header({ excersises }) {
    return (
        <div class="flex gap-2 mb-20">
            {excersises.map((e) => {
                return (
                    <div
                        key={nanoid()}
                        class="relative grid select-none items-center rounded-lg bg-gray-400 px-12 py-2"
                    ></div>
                );
            })}
        </div>
    );
}
