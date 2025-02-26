import { useRouter } from 'next/router';
import Layout, { Container } from '../../components/layout';
import { useEffect, useState } from 'react';
import {FormatDatetime} from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Meeting() {
    const router = useRouter();
    const { id } = router.query;
    const [meeting, setMeeting] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5099/meetings/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setMeeting(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    }, [id]);

    if (!meeting) {
        return <Layout><p>Loading...</p></Layout>;
    }

    return (
        <Layout>
            <Container>
                <div className="py-4 text-black">
                    <h1 className='text-4xl'>{meeting.name}</h1>
                </div>
                <div className="mb-6">
                    <section className="mb-4">
                        <div>
                            <div>
                                <FormatDatetime dateString={meeting.date} />
                            </div>
                            <div>{meeting.location}</div>
                            <div className={utilStyles.lightText}>
                                {meeting.cancelled ? "Meeting cancelled" : "Meeting occurred as planned"}
                            </div>
                            <div className="mt-4">Links</div>
                            <div>
                                {meeting.agenda_url ?
                                    <a href={meeting.agenda_url}>Agenda</a>
                                    :
                                    <span className={utilStyles.lightText}>Agenda unavailable</span>
                                }
                                <span> | </span>
                                {meeting.minutes_fname ?
                                    <a href={meeting.minutes_fname}>Minutes</a>
                                    :
                                    <span className={utilStyles.lightText}>Minutes unavailable</span>
                                }
                                <span> | </span>
                                {meeting.video_url ?
                                    <a href={meeting.video_url}>Video</a>
                                    :
                                    <span className={utilStyles.lightText}>Video unavailable</span>
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </Container>
        </Layout>
    );
}