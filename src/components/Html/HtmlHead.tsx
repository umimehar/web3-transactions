import { NextSeo, NextSeoProps } from 'next-seo'
import getConfig from 'next/config'
import NextHead from 'next/head'
import Link from "next/link";

interface HtmlHeadProps extends NextSeoProps {
  title: string
  description?: string
  noindex?: boolean
  canonical?: string
  ogUrl?: string
  ogTitle?: string
  ogImage?: string
  keywords?: string
}

export function HtmlHead(props: HtmlHeadProps) {
  const {
    title = '',
    description,
    ogTitle,
    keywords,
    noindex = false,
  } = props
  const SEO = defaultSEO

  // title for pages
  SEO['noindex'] = process.env.NODE_ENV !== 'production' ? true : noindex
  SEO.openGraph = SEO.openGraph || {}

  SEO['title'] = title || SEO['title']
  SEO['openGraph']['title'] = ogTitle || title || SEO['title']
  SEO['openGraph']['description'] = description || SEO['description']

  const nextSeoProps = { ...props }

  return (
    <>
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={keywords} />
        <meta httpEquiv="cleartype" content="on" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="480" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favs/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favs/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favs/favicon-16x16.png" />
        <link rel="manifest" href="/favs/site.webmanifest" />
        <link rel="mask-icon" href="/favs/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favs/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favs/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </NextHead>
      <NextSeo {...SEO} {...nextSeoProps} />
    </>
  )
}


const defaultSEO: NextSeoProps = {
  title: 'Web3 Transactions',
  titleTemplate: `%s | Web3 Transactions`,
  description: 'A example app to query web3 translations by address.',
}
