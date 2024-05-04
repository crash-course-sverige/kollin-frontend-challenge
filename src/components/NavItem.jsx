import { useRouter, useParams } from 'next/navigation';

const NavItem = ({ id, status }) => {
    const router = useRouter();
    const params = useParams();

    return (
        <button
            className={[
                "w-full h-4 rounded-full hover:cursor-pointer",
                status === "passed" ? "bg-success" : status === "failed" ? "bg-warning" : "bg-neutral",
                params.id === id ? "border-2 border-primary" : "border-none"
            ].join(" ")}
            onClick={() => router.push(`/practice/${id}`)}
        />
    )
}

export default NavItem;
