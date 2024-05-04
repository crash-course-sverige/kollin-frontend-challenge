import { useScoreContext } from "@/providers/providers";
import NavItem from "./NavItem";
import HeartIcon from "./HeartIcon";

const Nav = () => {
    const { score, setScore } = useScoreContext();

    if (score.hearts) {
        return (
            <nav
                className="w-full flex gap-2 items-center"
            >

                {
                    score.tasks.map(i => <NavItem key={i.id} {...i} />)
                }

                <div
                    className="flex gap-1"
                >

                    <HeartIcon />

                    <p
                        className="text-fill-heart"
                    >
                        {score.hearts}
                    </p>

                </div>
            </nav>
        )
    }

}

export default Nav;
