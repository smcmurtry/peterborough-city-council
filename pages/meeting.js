import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useRouter } from 'next/router'
const all_meeting_data_url = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/all_meeting_data.json"

export default function Meeting() {
  const router = useRouter()
  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    fetch(all_meeting_data_url)
      .then(response => {
        return response.json()
      })
      .then(meetingData => meetingData.filter(meeting => meeting.id == router.query.id)[0])
      .then(meeting => {
        console.log(meeting)
        setMeetingData(meeting)
    })
    });

    return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className=''>
        <div className="max-w-screen-md mx-auto py-4 text-left text-black">
          <h1 className='text-4xl '>meetingData.meeting_type</h1>
        </div>
      </div>
      <div className="max-w-screen-md mx-auto mb-6 text-left">
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <MeetingItem
            agenda_url={"agenda_url"}
            cancelled={false}
            minutes_filename={"minutes_filename"}
            datetime_iso={"datetime_iso"}
            meeting_type={"meeting_type"}
            video_url={"video_url"}
          />
        </section>
      </div>
    </Layout>
  );
}


export function MeetingItem({ agenda_url, cancelled, minutes_filename, datetime_iso, meeting_type, video_url }) {
    const minutes_dir_url = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/minutes"
    return (
      <div>
        <div>
          <small className={utilStyles.lightText}>
            <Date dateString={datetime_iso} />
          </small>
        </div>
        <span>{meeting_type}</span>
        {cancelled ? <span> (Cancelled)</span> : null}
        <div>
          <small>
            {agenda_url != null ?
              <a href={agenda_url}>Agenda</a>
              :
              null
            }
            {minutes_filename != null && minutes_filename != "" ?
              <span> | <a href={`${minutes_dir_url}/${minutes_filename}`}>Minutes</a></span>
              :
              null
            }
            {video_url != "" ?
              <span> | <a href={video_url}>Video</a></span>
              :
              null
            }
          </small>
        </div>
      </div>
    )
  }