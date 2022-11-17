import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import FilterMeetings from '../components/filter-meetings';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className=''>
        <div className="max-w-screen-md mx-auto py-4 text-left text-black">
          <div className="mb-2 text-l ">"An unofficial website to track what's happening in Peterborough's City Council"</div>
          <h1 className='text-4xl '>City Council Meetings</h1>
        </div>
      </div>
      <div className="max-w-screen-md mx-auto mb-6 text-left">
      {/* <div className="mb-4">"An unofficial website to track what's happening in Peterborough's City Council"</div> */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <FilterMeetings />
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
      </div>
    </Layout>
  );
}