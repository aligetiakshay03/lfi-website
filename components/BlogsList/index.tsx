import React, { useEffect, useRef, useState } from "react";
import styles from "./bloglist.module.scss"
import { ImageAboveContent, SingleContent } from "../../common/ImageAboveContent";
import { KeyWordsConnectionEdges } from "../../tina/__generated__/types";
import FeaturedBlogsPreview from "../FeaturedBlogsPreview";
import Discoverblogs from "../Discovermoreblogs";

export const renderSingleContent = (item, alignment, news?: Boolean | undefined) => {
  return <SingleContent
    key={item.node.id}
    news={news || false}
    author={item.node.author?.name}
    imageUrl={item.node.image}
    indexTitle={item?.node?._sys?.filename}
    title={item.node.title || ""}

    description={item.node.description || ""}
    heading={item.node.heading || ""}
    alignment={alignment % 2 === 0 ? "right" : "left"}
    contentSectionStyle={
      item.node.textContentStyle?.backgroundColor
        ? { backgroundColor: item.node.textContentStyle.backgroundColor }
        : undefined
    }
    textContentStyle={
      item.node.textContentStyle?.color
        ? { color: item.node.textContentStyle.color }
        : undefined
    }
  />
};

export const renderImageAboveContent = (item, index, news?: Boolean | undefined) => {
  return <ImageAboveContent
    key={index}
    news={news || false}
    imageUrl={item.node.image}
    title={item.node.title || ""}
    description={item.node.description || ""}
    author={item.node.author?.name}
    heading={item.node.heading || ""}
    indexTitle={item?.node?._sys?.filename}
    alignment={index % 2 === 0 ? "top" : "bottom"}
    contentSectionStyle={
      item.node.textContentStyle?.backgroundColor
        ? { backgroundColor: item.node.textContentStyle.backgroundColor }
        : undefined
    }
    textContentStyle={
      item.node.textContentStyle?.color
        ? { color: item.node.textContentStyle.color }
        : undefined
    }
  />
};

const BlogsList = (props: { blogPosts: any, blogPage?: Boolean, categories?: KeyWordsConnectionEdges[], news?: Boolean }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  let [currentBlogs, setCurrentBlogs] = useState<any[]>([])
  const initialActive = props.categories ? props.categories[0]?.node?.name : null;

  const [active, setActive] = useState<any>(initialActive);
  const [activeFilters, setActiveFilters] = useState<any>([])
  const blogPosts = props.blogPosts;

  

  let blogs = blogPosts;

  useEffect(() => {
    const categoryBlogs = blogs.filter((item) => item?.node?.category?.name.includes(active))
    setCurrentBlogs(categoryBlogs)
    setSelectedCategories([])
  }, [active])

  useEffect(() => {
    const render = props.categories?.filter((item) => item?.node?.name == active)
    setActiveFilters(render)
  }, [active])


  const handleClick = (category: string) => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter(cat => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  if (selectedCategories.length > 0) {
    currentBlogs = currentBlogs.filter((item) => selectedCategories.includes(item?.node?.keyWord?.name));
  }

  return (
    <>
      <div className={styles.blogPreviewSectionContainer}>
        <div className="block">
          <h1 className="2xl:text-[56px] lg:text-[48px] text-[30px] text-[#F0F0F0]">{props.news ? "Latest News" : "Blogs"}</h1>
          <div className="">
            <div className="flex gap-10 md:text-[30px] pt-3 text-[24px] leading-[34px] font-['libre-franklin'] font-normal">{props?.categories?.map((item, id) => {
              return <h1 onClick={() => setActive(item?.node?.name)} className={`cursor-pointer ${active === item?.node?.name ? "text-[#FF7800]" : "text-[#E6ECED]"}`} key={item.node?.id}>{item.node?.name}</h1>
            })}</div>
          </div>
          <div>
            <div className="flex gap-4 mb-[106px] flex-wrap mt-7">
              {activeFilters[0]?.node?.categoryKeyWords?.map((item) => (
                <button
                  className={`text-[#FFFFFF] px-6 py-3 min-w-[128px] text-[20px] leading-6 font-['libre-franklin'] font-normal rounded-md  ${selectedCategories.includes(item?.subCategories?.name || "") ? 'bg-[#FF7800]' : 'bg-[#59575766]'}`}
                  key={item?.subCategories?.name}
                  onClick={() => { handleClick(item?.subCategories?.name || "") }}
                >
                  {item?.subCategories?.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FeaturedBlogsPreview  className="!p-[0px] mt-[-80px] !bg-transparent" hideHeading blogPosts={currentBlogs.map((item) => {

        return ({
          blogList: item.node
        })
      })} />

      {currentBlogs.length === 0 ? (
        <div className="">
          <h2 className="text-[20px] font-family-['libre-franklin'] text-center text-[white]">Exciting updates and new blog content are on the horizon. Stay tuned!</h2>
        </div>
      ) : null}

      <Discoverblogs blogPosts={blogPosts} />
    </>
  );
};

export default BlogsList;
