import Layout from '../../components/layout';
import councillorData from '../../lib/councillor_dict.json';

export default function Councillors() {
    return (
        <Layout>
            <div className="max-w-screen-md mx-auto text-left">
                <h1 className="text-3xl font-bold mb-4">Councillors</h1>
                <ul className="list-disc pl-5 space-y-2">
                    {councillorData.map(councillor => (
                        <li key={councillor.id} className="text-lg">
                            <a href={`/councillors/${councillor.id}`} className="text-blue-500 hover:underline">
                                {councillor.title} {councillor.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}