import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontFamily: 'var(--header-font)' }}>murphy.js</span>,
  project: {
    link: 'https://github.com/cesarolvr/murphyjs',
  },
  docsRepositoryBase: 'https://github.com/cesarolvr/murphyjs',
  footer: {
    component: <div className='footer'>murphy.js</div>
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s'
    }
  },
  head: (
    <>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Murphy.js" />
      <meta property="og:description" content="A JavaScript vanilla library to scroll based reveal animations" />
    </>
  ),
  darkMode: true
}

export default config 