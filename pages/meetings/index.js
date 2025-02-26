import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout, { siteTitle, Container } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

function MeetingList() {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5099/meetings/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMeetings(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <ul className="list-disc pl-5 space-y-2">
            {meetings.map(meeting => (
                <li key={meeting.id} className="text-lg">
                    <a href={`/meetings/${meeting.id}`} className="text-blue-500 hover:underline">
                        {meeting.name} - {formatDate(meeting.date)}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function MeetingsPage() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle} - Meetings</title>
            </Head>
            <Container>
                <div className="py-4 text-black">
                    <h1 className='text-4xl mb-6'>City Council Meetings</h1>
                    <MeetingList />
                </div>
            </Container>
        </Layout>
    );
}