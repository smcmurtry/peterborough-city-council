import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { getSortedMeetingData } from '../lib/meetings';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allMeetingData = getSortedMeetingData();
  return {
    props: {
      allPostsData,
      allMeetingData
    },
  };
}

export default function Home({ allPostsData, allMeetingData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <a href="/about">About</a>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Meetings</h2>
        <p class={utilStyles.lightText}>Displaying {allMeetingData.length}</p>
        <ul className={utilStyles.list}>
          {allMeetingData.map(({ id, agenda_url, cancelled, minutes_filename, datetime_iso, meeting_type, video_url }) => (
            <li className={utilStyles.listItem} key={id}>
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
                    <span> | <a href={`/minutes/${minutes_filename}`}>Minutes</a></span>
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

            </li>
          ))}
        </ul>
      </section>
      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <a href={`/posts/${id}`}>{title}</a>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  );
}