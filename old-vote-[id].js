import React from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';
import Layout, { siteTitle, Container } from '../../components/layout';
const allMeetingDataUrl = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/all_meeting_data.json"
const allVoteDataUrl = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/all_vote_data.json"

export async function getStaticProps({ params }) {
    const meetingId = params.id;
//     const resp1 = await fetch(allMeetingDataUrl)
//     const meetingList = await resp1.json()
//     const meetingData = meetingList.filter(meeting => meeting.id == meetingId)[0]
    
//     if (meetingData.minutes_filename == null) {
//         return {
//             props: {
//                 meetingData,
//                 voteData: null,
//             },
//         };
//     }
//     const _meetingId = meetingData.minutes_filename.slice(0, -4)
//     const response = await fetch(allVoteDataUrl)
//     const allVoteData = await response.json()
//     const meetingInDict = Object.keys(allVoteData).indexOf(_meetingId) > -1
    // const voteData = meetingInDict ? allVoteData[_meetingId] : null
    const voteData = {}
    return {
        props: {
            voteData,
        },
    };
}

export async function getStaticPaths() {
    const resp = await fetch(allVoteDataUrl)
    const data = await resp.json();
    const paths = data.map(x => {
        try {
            return {params: {id: x.id}};
        } catch {
            return
        }
    });
    return {
        paths,
        fallback: false,
    };
}

export default function Vote({voteData}) {
    return (
    <Layout vote>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <Container>
            <div className="py-4 text-black">
                <h1 className='text-4xl'>Vote</h1>
            </div>
            <div className="mb-6">
                <section className="">
                    <div>Vote topic: {"topic"}</div>
                </section>
            </div>
        </Container>
    </Layout>
  );
}
