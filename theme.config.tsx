import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>MurphyJS</span>,
  project: {
    link: 'https://github.com/cesarolvr/murphyjs',
  },
  docsRepositoryBase: 'https://github.com/cesarolvr/murphyjs',
  footer: {
    text: 'MurphyJS Documentation',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – MurphyJS'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Murphy.js" />
      <meta property="og:description" content="A lightweight JavaScript animation library for scroll-based reveal animations" />
    </>
  ),
}

export default config 