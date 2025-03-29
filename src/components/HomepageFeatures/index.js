import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Information Technology',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Here, I share articles on topics like Linux, DevOps, security, Java, Spring Boot, React, and more!
        As a beginner myself, I aim to provide valuable insights that can help others starting their journey in
        these fields.Let's explore the exciting world of technology together!
      </>
    ),
  },
  {
    title: 'Books',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Here, I share book reviews and brief summaries of the books I enjoyed.
        Additionally, I include my personal thoughts related to each book.
        While you may not share the same perspective when you read these books,
        my insights will certainly provide you with some interesting information about them.
      </>
    ),
  },
  {
    title: 'MPSC',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        As you may know, I am the Assistant Commissioner of State Tax and have experience preparing
        for state PCS exams. I can guide you on common mistakes, recommend books and study resources,
        and help you create a study plan and strategy for these competitive exams.
        While everyone has their own study techniques, I aim to provide information that will be helpful
        for your preparation.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p style={{ textAlign: "justify" }}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
