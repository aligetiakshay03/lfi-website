'use client'
import React from 'react'
import { useTina } from 'tinacms/dist/react'
import BlogsList from '../../BlogsList'
import { KeyWordsConnectionEdges } from '../../../tina/__generated__/types'
import { IBlogsSectionConnection } from '../../../interfaces/IBlogsConnection'
import { ICategoryGroupsProps } from '../../../interfaces/ICategoryGroupsProps'

const BlogsPanel = (props: {blogPosts: IBlogsSectionConnection, categories:ICategoryGroupsProps}) => {
    const { data: blogPosts } = useTina(props.blogPosts);
    const {edges}=blogPosts?.blogsSectionConnection
    const allCategories=props.categories.data.keyWordsConnection.edges
    return (
        <div className="mt-[45px] p-[100px]  max-[1560px]:mt-[25px] max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-[640px]:mt-[50px] max-sm:p-[20px]">
            <BlogsList blogPosts={edges} categories={allCategories as KeyWordsConnectionEdges[]} />
        </div>
    )
}

export default BlogsPanel