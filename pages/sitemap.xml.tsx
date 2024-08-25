import { getFiles } from "lib/mdx";

const createSitemap = (
  slugs: string[]
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map((slug) => {
            return `
                <url>
                    <loc>${`https://foxtrot.aceternity.com/${slug}`}</loc>
                </url>
            `;
          })
          .join("")}
    </urlset>
`;
export async function getServerSideProps({ res }: any) {
  const allPosts = await getFiles("blogs");
  const allPages = [
    ...allPosts.map((slug: any) => `blogs/${slug.replace(".mdx", "")}`),
    ...["", "work", "blogs", "privacy", "terms", "refund"],
  ];

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
