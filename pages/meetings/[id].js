import React from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';
import {FormatDatetime} from '../../components/date';
import Layout, { siteTitle, Container } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
const all_meeting_data_url = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/all_meeting_data.json"

export async function getStaticProps({ params }) {
    const meetingId = params.id;
    const meetingData = await fetch(all_meeting_data_url)
      .then(response => response.json())
      .then(meetingList => meetingList.filter(meeting => meeting.id == meetingId)[0])

    return {
        props: {
            meetingData,
        },
    };
}

export async function getStaticPaths() {
    const resp = await fetch(all_meeting_data_url)
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

export default function Meeting({meetingData}) {
    return (
    <Layout meeting>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <KnownMeeting meetingData={meetingData} />
    </Layout>
  );
}

export function KnownMeeting({meetingData}) {
    const title = (meetingData && meetingData.meeting_type) ? meetingData.meeting_type : "";
    return (
        <Container>
            <div className=" py-4 text-black">
                <h1 className='text-4xl'>{title}</h1>
            </div>
            <div className=" mb-6 ">
                <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <MeetingItem meetingData={meetingData} />
                </section>
            </div>
        </Container>
    )
}


export function MeetingItem({ meetingData }) {
    if (meetingData === undefined) {
        return null;
    }
    const minutes_dir_url = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/minutes"
    return (
      <div>
        <div>
            <FormatDatetime dateString={meetingData.datetime_iso} />
        </div>
        <div>{meetingData.location}</div>
        <div className={utilStyles.lightText}>{meetingData.cancelled ? "Meeting cancelled" : "Meeting occurred as planned"}</div>
        <div className="mt-4">Links</div>
        <div>
            {meetingData.agenda_url != null ?
              <a href={meetingData.agenda_url}>Agenda</a>
              :
              <span className={utilStyles.lightText}>Agenda unavailable</span>
            }
            <span> | </span>
            {meetingData.minutes_filename != null && meetingData.minutes_filename != "" ?
              <a href={`${minutes_dir_url}/${meetingData.minutes_filename}`}>Minutes</a>
              :
              <span className={utilStyles.lightText}>Minutes unavailable</span>
            }
            <span> | </span>
            {meetingData.video_url != "" ?
              <a href={meetingData.video_url}>Video</a>
              :
              <span className={utilStyles.lightText}>Video unavailable</span>
            }
        </div>
      </div>
    )
  }