
import Layout, { Container, siteTitle } from '../../components/layout';
import Head from 'next/head';
export default function Meeting() {
    return (
    <Layout meeting>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <Container>
        <div className="py-4 text-black">
            <h1 className='text-4xl'>No data available for this meeting</h1>
        </div>
        </Container>
    </Layout>
  );
}