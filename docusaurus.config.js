// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Gaurav's Corner" ,
  tagline: '',
  favicon: 'img/favicon.ico',
  // Set the production url of your site here
  url: 'https://grvbng7.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'grvbng7', // Usually your GitHub org/user name.
  projectName: 'my-blog', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath : "/posts" , 
          sidebarPath: './sidebars.js',
        },
        blog: false ,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo.jpg',
      navbar: {
        title: "Gaurav's Corner" ,
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'itSidebar',
            position: 'left',
            label: 'Information Technology',
          },
          {
            type: 'docSidebar',
            sidebarId: 'booksSidebar',
            position: 'left',
            label: 'books',
          },
          {
            type: 'docSidebar',
            sidebarId: 'mpscSidebar',
            position: 'left',
            label: 'mpsc',
          },
          {to: '/about', label: 'about', position: 'left'},
          {
            href: 'https://grvbng7.gitlab.io/me',
            label: 'portfolio',
            position: 'right' ,
          },

        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title : "want to know more about me ?",
            items : [
              {
                label : "portfolio" , 
                href : "https://grvbng7.gitlab.io/me" , 
              },
              {
                label : "github" , 
                href : "https://www.github.com/grvbng7" , 
              },
              {
                label : "linkedin" , 
                href : "https://www.linkedin.com/in/grvbng7/" , 
              },
            ]
          } ,
          {
            title: 'social media',
            items: [
              {
                label: 'mastodon',
                href : "https://mastodon.social/@grvbng7"
              },
              {
                label : 'instagram' , 
                href : 'https://www.instagram.com/grvbng7_' , 
              }
            ],
          }, 
          {
            title: 'more',
            items: [
              {
                label: 'about this site' , 
                to  : "/about"
              }
            ],
          },
        ],
        copyright: `© [${new Date().getFullYear()}] - grvbng7 - This work is licensed under MIT license. You can find the source code at my GitHub profile.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
