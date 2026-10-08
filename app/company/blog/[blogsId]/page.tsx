import React from 'react'
import databaseClient from '../../../../tina/__generated__/databaseClient';
import IndividualBlogPanel from '../../../../components/Company/BlogsPanel/IndividualBlog';

export async function generateStaticParams() {
  const result = await databaseClient.queries.blogsSectionConnection();
  const edges = result.data?.blogsSectionConnection?.edges || [];
  return edges
    .map((edge) => edge?.node?._sys?.relativePath)
    .filter((p): p is string => Boolean(p))
    .filter((p) => p.endsWith('.md'))
    .map((relativePath) => ({
      blogsId: relativePath.slice(0, -'.md'.length),
    }));
}

const Articles = async({params}, req) => {
    const decodedData = decodeURIComponent(params.blogsId)
    const [blogs, result] = await Promise.all([
      databaseClient.queries.blogsSection({
        relativePath: `${decodedData}.md`,
      }),
      databaseClient.queries.blogsSectionConnection(),
    ]);
  return (
    <div className='p-[100px] max-[1565px]:p-[80px] max-[1025px]:p-[40px]  max-[1025px]:mt-[35px] max-sm:p-[20px] max-sm:mt-[55px]'>


        <IndividualBlogPanel blogPosts={JSON.parse(JSON.stringify(blogs))} urlData={decodedData} result={JSON.parse(JSON.stringify(result))} />
    </div>
  )
}

export default Articles
