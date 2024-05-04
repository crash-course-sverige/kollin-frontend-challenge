import Link from "next/link";

export const UserAction = ({ userAnswerId, nextAssignment, searchParams }) => {
  if (!nextAssignment && userAnswerId) {
    return (
      <Link
        href="/practice"
        className="bg-[#586FB5] text-white text-center text-xl p-2 rounded-md hover:bg-blue-600 mt-8"
      >
        Go to next level!
      </Link>
    );
  }
  if (userAnswerId && nextAssignment) {
    return (
      <Link
        className="bg-[#f7f43d] text-black text-center text-xl  p-2 rounded-md hover:bg-blue-600 mt-8"
        href={`/practice/${nextAssignment.id}?${searchParams.toString()}`}
      >
        Next
      </Link>
    );
  }
  return (
    <button className="bg-[#586FB5] text-white text-xl  p-2 rounded-md hover:bg-blue-600 mt-8">
      Check
    </button>
  );
};
