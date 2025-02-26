import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';

export default function Vote() {
    const router = useRouter();
    const { id } = router.query;
    const [vote, setVote] = useState(null);
    const [meeting, setMeeting] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5099/votes/${id}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    setVote(data);
                    // Fetch meeting data once we have the vote data
                    return fetch(`http://localhost:5099/meetings/${data.meeting_id}`);
                })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(meetingData => {
                    setMeeting(meetingData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [id]);

    if (!vote || !meeting) {
        return <Layout><p>Loading...</p></Layout>;
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Layout>
            <div className="max-w-screen-md mx-auto text-left pb-12">
                <h1 className="text-3xl font-bold mb-4">{vote.title}</h1>
                
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Meeting Details</h2>
                    <p><strong>Name:</strong> {meeting.name}</p>
                    <p><strong>Date:</strong> {formatDate(meeting.date)}</p>
                    <p><strong>Location:</strong> {meeting.location}</p>
                    {meeting.minutes_fname && 
                        <p><strong>Minutes:</strong> <a href={meeting.minutes_fname} className="text-blue-500 hover:underline">View Minutes</a></p>
                    }
                </div>

                <div className="mb-4 mt-6">
                    <div className="text-lg">
                        <span className={vote.carried ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                            {vote.carried ? "✓ Carried" : "✗ Failed"}
                        </span>
                        <span className="text-gray-600 ml-2">
                            {vote.votes_for} in favour, {vote.votes_against} against
                        </span>
                    </div>
                </div>

                <div className="mt-8">
                    <Link href={`/meetings/${vote.meeting_id}`}>
                        <a className="text-blue-500 hover:underline">← Back to Meeting</a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
