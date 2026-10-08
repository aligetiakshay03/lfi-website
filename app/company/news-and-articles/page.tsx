import React from 'react'
import databaseClient from '../../../tina/__generated__/databaseClient';
import NewsPanel from '../../../components/Company/NewsPanel';
import SEO from '../../../common/seo'

const NewsAndArticles = async() => {
    const data=await databaseClient.queries.newsSectionConnection()
    const categories = await databaseClient.queries.keyWordsConnection()
  return (
    <>
    <SEO title="News & Articles" description="News & Articles | Linkfields Innovations" />
    <div>
        <NewsPanel blogPosts={JSON.parse(JSON.stringify(data))} categories={JSON.parse(JSON.stringify(categories))} />
    </div>
    </>
  )
}

export default NewsAndArticles