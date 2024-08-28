import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Banner } from "./Banner";
import { Footer } from "./Footer";
import Navbar from "./Navbar/Navbar";

export const Container = (props: any) => {
  const { children, className, ...customMeta } = props;
  const router = useRouter();

  const title = "308er | Deine Hip-Hop Truppe";
  const meta = {
    title,
    description: `Die 308er sind eine kleine Truppe aus Hannover, die ihre Stadt neu auf die Karte bringen.`,
    type: "website",
    image: "https://rotekurve.s3.eu-north-1.amazonaws.com/DSC03777.JPG",
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://308er.de${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://308er.de${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="308er" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@308er" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <Banner />
      <Navbar />
      <main className={clsx("antialiased ", className)}>{children}</main>
      <Footer />
    </>
  );
};
