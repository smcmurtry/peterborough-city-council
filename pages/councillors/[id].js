import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import councillorData from '../../lib/councillor_dict.json';
import voteData from '../../lib/sample_vote_data.json';
import councillorVotes from '../../lib/sample_councillor_votes.json';

export default function Councillor() {
    const router = useRouter();
    const { id } = router.query;
    const councillor = councillorData.find(c => c.id === id);

    if (!councillor) {
        return <Layout><p>Councillor not found</p></Layout>;
    }

    const votes = councillorVotes.filter(vote => vote.councillor_id === id);

    // Sort votes by date in descending order
    const sortedVotes = votes.sort((a, b) => {
        const voteDetailsA = voteData.find(v => v.id === a.vote_id);
        const voteDetailsB = voteData.find(v => v.id === b.vote_id);
        return new Date(voteDetailsB.date) - new Date(voteDetailsA.date);
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
                <p><strong>Ward:</strong> {councillor.Ward}</p>
                <h2 className="text-2xl font-bold mt-6 mb-4">Voting Record</h2>
                <ul className="space-y-2">
                    {sortedVotes.map(vote => {
                        const voteDetails = voteData.find(v => v.id === vote.vote_id);
                        return (
                            <li key={vote.vote_id} className="text-lg">
                                <span className="text-gray-600">{formatDate(voteDetails.date)}</span> - 
                                <Link href={`/votes/${vote.vote_id}`}>
                                    <a className="font-bold">{voteDetails.title}</a>
                                </Link> - 
                                <span className={vote.in_favour ? "text-green-500" : "text-red-500"}>
                                    {vote.in_favour ? " In Favour" : " Against"}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Layout>
    );
}