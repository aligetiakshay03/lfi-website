'use client'
import React from 'react'
import { useTina } from 'tinacms/dist/react'
import { ICategoryGroupsProps } from '../../../interfaces/ICategoryGroupsProps'
import { INewsConnection } from '../../../interfaces/INewsConnection'
import FeaturedBlogsPreview from '../../FeaturedBlogsPreview'

const NewsPanel = (props: {blogPosts: INewsConnection, categories:ICategoryGroupsProps}) => {
    const { data: blogPosts } = useTina(props.blogPosts);
    const {edges}=blogPosts?.newsSectionConnection
    const allCategories=props.categories.data.keyWordsConnection.edges
    return (
        <div className='mt-[100px] max-[1565px]:mt-[80px] max-[1025px]:mt-[80px] max-sm:mt-[80px]' >
            <FeaturedBlogsPreview  blogPosts={blogPosts.newsSectionConnection.edges?.map(edge=>{return {blogList:edge?.node} } )} hideHeading newHeading='News and Articles'/>
        </div>
    )
}

export default NewsPanel