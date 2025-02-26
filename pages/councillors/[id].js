import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';

export default function Councillor() {
    const router = useRouter();
    const { id } = router.query;
    const [councillor, setCouncillor] = useState(null);
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5099/councillors/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setCouncillor(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    }, [id]);

    if (!councillor) {
        return <Layout><p>Loading...</p></Layout>;
    }

    // Sort votes by date in descending order
    const sortedVotes = votes.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

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
            <div className="max-w-screen-md mx-auto text-left">
                <h1 className="text-3xl font-bold mb-4">{councillor.title} {councillor.name}</h1>
                <p><strong>Ward:</strong> {councillor.ward}</p>
                <p><strong>Start date:</strong> {formatDate(councillor.start_date)}</p>
                <p><strong>End date:</strong> {councillor.end_date ? formatDate(councillor.end_date) : "NA"}</p>

                <h2 className="text-2xl font-bold mt-6 mb-4">Voting Record</h2>
                <ul className="space-y-2">
                    {sortedVotes.map(vote => (
                        <li key={vote.id} className="text-lg">
                            <span className="text-gray-600">{formatDate(vote.date)}</span> - 
                            <Link href={`/votes/${vote.id}`}>
                                <a className="font-bold">{vote.title}</a>
                            </Link> - 
                            <span className={vote.in_favour ? "text-green-500" : "text-red-500"}>
                                {vote.in_favour ? " In Favour" : " Against"}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}