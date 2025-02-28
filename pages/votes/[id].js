import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';

export default function Vote() {
    const router = useRouter();
    const { id } = router.query;
    const [vote, setVote] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5099/votes/${id}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    setVote(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [id]);

    const groupCouncillorsByVote = (councillorVotes) => {
        return councillorVotes.reduce((acc, cv) => {
            const key = cv.vote_cast;
            if (!acc[key]) acc[key] = [];
            acc[key].push(cv.councillor);
            return acc;
        }, {});
    };

    if (!vote) {
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

    const groupedVotes = groupCouncillorsByVote(vote.councillor_votes);

    return (
        <Layout>
            <div className="max-w-screen-md mx-auto text-left pb-12">
                <h1 className="text-xl font-semibold mb-6 leading-normal text-gray-800">{vote.title}</h1>

                <div className="mb-8">
                    <div className="text-lg">
                        <span className={vote.carried ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                            {vote.carried ? "✓ Motion Carried" : "✗ Motion Failed"}
                        </span>
                        <span className="text-gray-600 ml-2 text-sm">
                            ({vote.votes_for} in favour, {vote.votes_against} against)
                        </span>
                    </div>
                </div>

                <div className="mb-12">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-3">In Favour</h3>
                            <ul className="space-y-2">
                                {groupedVotes.for?.map(councillor => (
                                    <li key={councillor.id}>
                                        <Link href={`/councillors/${councillor.id}`}>
                                            <a className="text-sm hover:underline">
                                                {councillor.title} {councillor.name}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {groupedVotes.against && groupedVotes.against.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700 mb-3">Against</h3>
                                <ul className="space-y-2">
                                    {groupedVotes.against.map(councillor => (
                                        <li key={councillor.id}>
                                            <Link href={`/councillors/${councillor.id}`}>
                                                <a className="text-sm hover:underline">
                                                    {councillor.title} {councillor.name}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t pt-8">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-3">Meeting Details</h2>
                    <Link href={`/meetings/${vote.meeting.id}`}>
                        <a className="text-blue-600 hover:underline block mb-2">{vote.meeting.name}</a>
                    </Link>
                    <p className="text-sm text-gray-600">{formatDate(vote.meeting.date)} • {vote.meeting.location}</p>
                    {vote.meeting.minutes_fname && 
                        <p className="mt-2">
                            <a href={vote.meeting.minutes_fname} className="text-sm text-blue-600 hover:underline">View Minutes</a>
                        </p>
                    }
                </div>
            </div>
        </Layout>
    );
}
