import { useEffect, useState } from 'react';
import Layout from '../../components/layout';

export function CouncillorsList() {
    const [councillors, setCouncillors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5099/councillors/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCouncillors(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const currentCouncillors = councillors.filter(c => !c.end_date);
    const formerCouncillors = councillors.filter(c => c.end_date);

    return (
        <div className="max-w-screen-md mx-auto text-left pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Current</h1>
                <ul className="list-disc pl-5 space-y-2">
                    {currentCouncillors.map(councillor => (
                        <li key={councillor.id} className="text-lg">
                            <a href={`/councillors/${councillor.id}`} className="text-blue-500 hover:underline">
                                {councillor.title} {councillor.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold mb-4">Former</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {formerCouncillors.map(councillor => (
                        <li key={councillor.id} className="text-lg">
                            <a href={`/councillors/${councillor.id}`} className="text-blue-500 hover:underline">
                                {councillor.title} {councillor.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function Councillors() {
    return (
        <Layout>
            <CouncillorsList />
        </Layout>
    );
}