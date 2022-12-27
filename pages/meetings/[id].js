import React from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';
import {FormatDatetime} from '../../components/date';
import Layout, { siteTitle, Container } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
const allMeetingDataUrl = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/all_meeting_data.json"
const allVoteDataUrl = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/all_vote_data.json"
const minutesDirUrl = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/minutes"

export async function getStaticProps({ params }) {
    const meetingId = params.id;
    const meetingData = await fetch(allMeetingDataUrl)
      .then(response => response.json())
      .then(meetingList => meetingList.filter(meeting => meeting.id == meetingId)[0])
    
      var voteData = []
      try {
        const _meetingId = meetingData.minutes_filename.slice(0, -4)
        console.log("_meetingId", _meetingId)
        voteData = await fetch(allVoteDataUrl)
          .then(response => response.json())
          .then(voteDict => voteDict[_meetingId])
      } catch {
        console.log(`no vote data for meetingId ${meetingId}`)
      }

    // console.log("voteData", voteData)
    return {
        props: {
            meetingData,
            voteData,
        },
    };
}

export async function getStaticPaths() {
    const resp = await fetch(allMeetingDataUrl)
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

export default function Meeting({meetingData, voteData}) {
    return (
    <Layout meeting>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <KnownMeeting meetingData={meetingData} voteData={voteData} />
    </Layout>
  );
}

export function KnownMeeting({meetingData, voteData}) {
    const title = (meetingData && meetingData.meeting_type) ? meetingData.meeting_type : "";
    return (
        <Container>
            <div className="py-4 text-black">
                <h1 className='text-4xl'>{title}</h1>
            </div>
            <div className="mb-6">
                <section className="mb-4">
                    <MeetingTopMatter meetingData={meetingData} />
                </section>
                <section className="">
                    <Votes voteData={voteData} />
                </section>
            </div>
        </Container>
    )
}


export function MeetingTopMatter({ meetingData }) {
    if (meetingData === undefined) {
        return null;
    }
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
              <a href={`${minutesDirUrl}/${meetingData.minutes_filename}`}>Minutes</a>
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


  export function Votes({ voteData }) {
    if (voteData === undefined) {
        return null;
    }

    return (
        <div>
          <h2 className=''>Votes</h2>
          <ul>
          {voteData.map((vote) => (
              <li className='flex' key={vote.title}>
                <span className='flex-none'><VoteResult vote={vote} /></span>
                <span className='flex-1 overflow-hidden whitespace-nowrap text-ellipsis'>{vote.title}</span>
            </li>
            ))}
          <li></li>
          </ul>
        </div>
)} 

function VoteResult({vote}) {
    const forCount = vote["for"].length
    const againstCount = vote["against"].length
    return (
        <span className='pr-2'>
            {vote["carried"] ? "✅ Carried" : "❌ Failed"} ({forCount} to {againstCount})
        </span>
    )
}