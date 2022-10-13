import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { getSortedMinutesData } from '../lib/minutes';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allMinutesData = getSortedMinutesData();
  return {
    props: {
      allPostsData,
      allMinutesData
    },
  };
}

export default function Home({ allPostsData, allMinutesData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>A site to help shed light on Peterborough's City Council.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Minutes</h2>
        <ul className={utilStyles.list}>
          {allMinutesData.map(({ id, minutes_fname, datetime_iso, meeting_type }) => (
            <li className={utilStyles.listItem} key={id}>
              <a href={`/minutes/${minutes_fname}`}>{meeting_type}</a>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={datetime_iso} />
              </small>
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