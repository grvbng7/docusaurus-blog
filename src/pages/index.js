import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import mePhoto from '@site/static/img/me.jpg';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          welcome to my blog
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
      </div>
    </header>
  );
}


const MyInfo = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div style={{marginTop : "1rem"}} className={`proImgContainer ${clsx('col col--6')}`} >
          <img className='profilePic' src={mePhoto} alt="Gaurav Bang" />
        </div>
        <div style={{marginTop : "1rem"}} className={clsx('col col--6')} >
          <h3>Who am I?</h3>
          <hr/>
          <p style={{ textAlign: "justify" }}>
            Hello, I’m Gaurav Bang, a passionate learner and professional with a diverse background.
            I hold a degree in Mechanical Engineering, and after completing my graduation,
            I worked briefly with an automobile company. However, my journey took an exciting turn when
            I decided to pursue the Maharashtra Public Service Commission (MPSC) exam, aiming to serve
            in the public sector. In the meantime, I broadened my skillset by completing a Postgraduate
            Diploma in Advanced Computing from CDAC, which led me to explore the world of Information Technology.
            My journey in IT was rewarding, but the results of the MPSC 2022 exams brought a significant milestone
            – I was selected as the Assistant Commissioner of State Tax.
            This blog is my space to share insights and thoughts on various topics. Here, you’ll
            find useful information on Information Technology, MPSC preparation, some book reviews, and more.
            Below are some of the categories I post about. <br />
            Feel free to drop me an email at <code>grvbng7@proton.me</code>
          </p>
        </div>
      </div>
    </div>
  );
};




export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Blog by ACST Gaurav Bang">
      <HomepageHeader />
      <main>
        {MyInfo()}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
