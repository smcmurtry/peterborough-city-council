import Head from 'next/head';
import Layout, { siteTitle, Container } from '../components/layout';
import utilStyles from '../styles/utils.module.css';


export default function About() {
    return (
        <Layout about>
            <Head>
        <title>About - {siteTitle}</title>
      </Head>
      <Container>
        <div className=" py-4 text-black">
          <h1 className='text-4xl '>About</h1>
        </div>
      </Container>
      <Container>
      <div className="mb-6">
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <p>
        A site to help shed light on Peterborough's City Council.</p>
                <p>The code used to generate this website is available on Github in the following repositories: <a href="https://github.com/smcmurtry/peterborough-city-council">peterborough-city-council</a> and <a href="https://github.com/smcmurtry/peterborough-open-gov">peterborough-open-gov</a>.
                </p>
      </section>
      </div>
      </Container>
        </Layout>
    )
}