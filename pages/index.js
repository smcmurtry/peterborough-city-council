import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import FilterMeetings from '../components/filter-meetings';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
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
      </div>
    </Layout>
  );
}