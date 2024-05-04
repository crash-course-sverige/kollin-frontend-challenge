"use client"
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client';
import { DB_LINK, DB_TOKEN } from '@/services/config';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import listOfIDs from '../../../exercises.json';
import { useAssignmentsContext, useScoreContext } from '@/providers/providers';
import { fetchAssignment } from '@/queries/assignmentQueries';
import Modal from '@/components/Modal';


const middleware = new ApolloLink((operation, forward) => {
    const headers = {
        Authorization: DB_TOKEN
    };

    operation.setContext({
        headers,
    });

    return forward(operation);
});

const httpLink = new HttpLink({
    uri: DB_LINK
});

const client = new ApolloClient({
    link: new ApolloLink.from([middleware, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            nextFetchPolicy: "cache-first"
        },
    },
});

export default function Page() {
    const [loading, setLoading] = useState(true);
    const { assignments, setAssignments } = useAssignmentsContext();
    const { setScore } = useScoreContext();

    const fetchData = async () => {
        const assignmentData = [];
        for (let i = 0; i < listOfIDs.length; i++) {
            try {
                const data = await fetchAssignment(listOfIDs[i], client);
                if (data) {
                    assignmentData.push(data);
                }
            } catch (error) {
                console.error('Error fetching assignment:', error);
            }
        }
        setAssignments(prevAssignments => [...prevAssignments, ...assignmentData]);
        return assignmentData;
    };

    const initializeScore = (assignments) => {
        const newScore = {
            hearts: 3,
            tasks: []
        };
        for (let i = 0; i < assignments.length; i++) {
            const data = {
                id: assignments[i].id,
                status: 'notDone'
            };
            newScore.tasks.push(data);
        }
        setScore(newScore);
    };

    useEffect(() => {
        const loadApp = async () => {
            const data = await fetchData();
            initializeScore(data);
            setLoading(false);
        }

        loadApp();
    });


    if (loading) {
        return (
            <Modal text="loading..." />
        );
    }

    if (!loading && assignments[0].id) {
        redirect(`/practice/${assignments[0].id}`);
    }

}
