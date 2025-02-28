import Head from 'next/head';
import Layout, { siteTitle, Container } from '../components/layout';
import FilterMeetings from '../components/filter-meetings';
import { CouncillorsList } from './councillors';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container>
        <div className="py-4 text-black">
          <div className="mb-2 text-l ">"An unofficial website to track what's happening in Peterborough's City Council"</div>
          <h1 className='text-4xl '>City Council</h1>
        </div>
      </Container>
      <Container>
        <CouncillorsList />
      </Container>
    </Layout>
  );
}