import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';
import {FormatDatetime} from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useRouter } from 'next/router'
const all_meeting_data_url = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/all_meeting_data.json"

const dummyMeeting = {
    meeting_type: "",
    datetime_iso: "",
    cancelled: false,
    minutes_filename: "",
    video_url: "",
    agenda_url: ""
}

export default function Meeting() {
  const router = useRouter()
  const [meetingData, setMeetingData] = useState(dummyMeeting);
  const meetingId = router.query.id;
  useEffect(() => {
    fetch(all_meeting_data_url)
      .then(response => response.json())
      .then(meetingData => meetingData.filter(meeting => meeting.id == meetingId)[0])
      .then(meeting => {
        setMeetingData(meeting)
    })
    }, [meetingId]);
    return (
    <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        {meetingId == "unknown" ?
            <UnknownMeeting /> :
            <KnownMeeting meetingData={meetingData} />
        }

    </Layout>
  );
}

export function UnknownMeeting() {
    return (
        <div className="max-w-screen-md mx-auto py-4 text-left text-black">
            <h1 className='text-4xl'>No data available for this meeting</h1>
        </div>
    )
}

export function KnownMeeting({meetingData}) {
    const title = (meetingData && meetingData.meeting_type) ? meetingData.meeting_type : "";
    return (
        <>
            <div className="max-w-screen-md mx-auto py-4 text-left text-black">
                <h1 className='text-4xl'>{title}</h1>
            </div>
            <div className="max-w-screen-md mx-auto mb-6 text-left">
                <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <MeetingItem meetingData={meetingData} />
                </section>
            </div>
        </>
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