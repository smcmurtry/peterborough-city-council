import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import voteData from '../../lib/sample_vote_data.json';

export default function Vote() {
    const router = useRouter();
    const { id } = router.query;
    const vote = voteData.find(v => v.id === id);

    if (!vote) {
        return <Layout><p>Vote not found</p></Layout>;
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
            <div className="max-w-screen-md mx-auto text-left">
                <h1 className="text-3xl font-bold mb-4">{vote.title}</h1>
                <p><strong>Date:</strong> {formatDate(vote.date)}</p>
                <p><strong>Description:</strong> {vote.description}</p>
                <p><strong>Number For:</strong> {vote.number_for}</p>
                <p><strong>Number Against:</strong> {vote.number_against}</p>
                <p><strong>Carried:</strong> {vote.carried ? "Yes" : "No"}</p>
                <p>
                    <Link href={`/meetings/${vote.meeting_id}`}>
                        <a className="text-blue-500 underline">View Meeting Details</a>
                    </Link>
                </p>
            </div>
        </Layout>
    );
}
