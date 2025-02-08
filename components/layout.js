import Head from 'next/head';
import Link from 'next/link';

const name = 'peterborough-city-council.ca';
export const siteTitle = 'Peterborough City Council';

export function Container(props) {
    return (
        <div className="max-w-screen-md mx-auto text-left">
            {props.children}
        </div>
    );

}

export default function Layout({ children, home }) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Peterborough City Council"
                />
                <meta name="og:title" content={siteTitle} />
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                    crossOrigin="anonymous"
                />
            </Head>
            <header className="border-b-4 py-2">
                <div className='max-w-screen-md mx-auto'>
                    <nav>
                        <div className="flex justify-between">
                            <a className="  text-2xl font-bold text-black hover:no-underline" href="/">&#127963; {name}</a>
                            <ul className="flex text-l pt-2">
                                <li className="mx-2"><a href="/about">About</a></li>
                                <li className="mx-2"><a href="/">Meetings</a></li>
                                {/* <li className="mx-2"><a href="/votes">Votes</a></li> */}
                                <li className="mx-2"><a href="/councillors">Councillors</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            <div>
            {!home && (
                    <div className="mt-6">
                        <Container>
                            <Link href="/">
                                <a>← Back</a>
                            </Link>
                        </Container>
                    </div>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}