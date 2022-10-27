import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';


export default function About() {
    return (
        <Layout about>
            <Head>
                <title>About - {siteTitle}</title>
            </Head>
            <h1>About</h1>
            <section className={utilStyles.headingMd}>
                <p>A site to help shed light on Peterborough's City Council.</p>
            </section>
        </Layout>
    )
}