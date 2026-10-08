import React from 'react'
import databaseClient from '../../../../tina/__generated__/databaseClient';
import IndividualNewsPanel from '../../../../components/Company/NewsPanel/IndividualNews';

export async function generateStaticParams() {
  const result = await databaseClient.queries.newsSectionConnection();
  const edges = result.data?.newsSectionConnection?.edges || [];
  return edges
    .map((edge) => edge?.node?._sys?.relativePath)
    .filter((p): p is string => Boolean(p))
    .filter((p) => p.endsWith('.md'))
    .map((relativePath) => ({
      newsId: relativePath.slice(0, -'.md'.length),
    }));
}

const Articles = async({params}, req) => {
    const decodedData = decodeURIComponent(params.newsId)
    const [blogs, result] = await Promise.all([
      databaseClient.queries.newsSection({
        relativePath: `${decodedData}.md`,
      }),
      databaseClient.queries.newsSectionConnection(),
    ]);
  return (
    <div className='2xl:p-[100px] lg:p-[60px] p-[20px] mt-[100px]'>
        <IndividualNewsPanel blogPosts={JSON.parse(JSON.stringify(blogs))} urlData={decodedData} result={JSON.parse(JSON.stringify(result))} />
    </div>
  )
}

export default Articles
