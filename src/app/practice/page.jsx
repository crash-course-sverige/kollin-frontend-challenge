"use client"
import { useEffect, useState } from "react"
import Item from "../components/item"


const ids = [
    "bde984b3-7e98-42ad-8650-bd08d9c64473",
    "b1cdace3-479d-4c35-8bf4-9dadc5bdc71a",
    "a983b41f-8b70-4970-8466-c0545ec1d3d0",
    "dc732465-96d5-4230-91b9-f2f9cc5a30a9",
    "cb6393ff-2f29-44c1-91ee-9da296b1edd2",
    "9de29654-bc7a-4552-a367-f438cbd1ce0d"
]


export default function CrashCourse() {

    const [assignments, setAssignments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    async function getAssignments(assignmentId){
        const endpoint =
            process.env.NEXT_PUBLIC_ENDPOINT

        const query = `
          query GetAssignment($id: ID!) {
            getAssignment(id: $id) {
              id
              difficultyScore
              questionText
              solutionText
              hints
              answerOptions {
                id
                text
                correct
              }
              createdAt
              updatedAt
            }
          }
        `;

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.NEXT_PUBLIC_AUTH
                },
                body: JSON.stringify({
                    query,
                    variables: { id: assignmentId },
                }),
            });
            const data = await res.json();
            return data.data;
        } catch (err) {
            console.log(err);
            return;
        }
    }
    useEffect(() => {
        const fetchAssignments = async () => {
            const assignmentPromises = ids.map(id => getAssignments(id));
            try {
                const assignmentsData = await Promise.all(assignmentPromises);
                const filteredAssignments = assignmentsData.filter(assignment => assignment.getAssignment !== null);
                console.log(filteredAssignments)
                setAssignments(filteredAssignments);

            } catch (error) {
                console.log(error);
            }
        };

        fetchAssignments();
    }, []);

    const handleItemClick = (index) => {
        setCurrentIndex(index); 
    };

    return (

        <div style={{ justifyContent: "center", display: "flex", alignItems: "center", height: "100vh" }}>
            {/*Inner card div, holds content.*/}
            <div style={{ display: "flex", background: "white", width: "60%", height: "80vh", justifyContent: "center", alignItems: "center", borderRadius: "50px", flexDirection: "column" }}>

                {/*Content div, 50% of card size, contains all content. */}
                <div style={{ display: "flex", width: "100%", flexDirection: "row", gap: 4, justifyContent: "center" }}>
                    {assignments.map((assignment, index) => (
                        <Item
                            difficulty={assignment.getAssignment.difficultyScore}
                            current={currentIndex == index}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </div>

                <div style={{ width: "100%", height: "30%", flexWrap: "wrap", alignSelf: "center", padding: 80 }}>
                    <span>
                        {assignments.length > 0 ? assignments[currentIndex].getAssignment.questionText : ""}
                    </span>
                </div>


            </div>
        </div>
    )
}
