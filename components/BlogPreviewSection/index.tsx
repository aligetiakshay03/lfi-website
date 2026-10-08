import React, { useRef } from "react";
import { BlogPostPreview } from "../../common/BlogPreview";
import { Carousel, Col, Row } from "antd";
import styles from "./blogPreviewSection.module.scss";
import { CarouselRef } from "antd/es/carousel";
import Image from "next/image";
import { BlogsCollectionQuery } from "../../tina/__generated__/types";

const BlogPreviewSection = (props: { blogPosts: BlogsCollectionQuery }) => {
  const containerRef = useRef<CarouselRef | null>(null);

  const handleCarousalChange = (type: "left" | "right") => {
    switch (type) {
      case "left":
        containerRef.current && containerRef.current.prev();
        break;
      case "right":
        containerRef.current && containerRef.current.next();
        break;
      default:
       
    }
  };

  const blogPosts = props.blogPosts.blogsCollection.blogs;
  return (
    <div className={styles.blogPreviewSectionContainer}>
      <Row className={styles.gridPreviewContainer}>
        {blogPosts?.map((post, index) => {
          const RenderBlogPostPreview =
            post?.type === "semi"
              ? BlogPostPreview.SplitView
              : BlogPostPreview.CoverView;
          return (
            <Col xs={{ span: 24 }} md={{ span: 12 }} key={`blog-post-${index}`}>
              <BlogPostPreview url={post?.url || ""}>
                <RenderBlogPostPreview
                  imageUrl={post?.image || ""}
                  {...(post?.alignment ? { alignment: post?.alignment } : {})}
                  description={post?.description || ""}
                  heading={post?.heading || ""}
                  title={post?.title || ""}
                  contentSectionStyle={
                    post?.contentSectionStyle?.backgroundColor
                      ? {
                          backgroundColor:
                            post.contentSectionStyle.backgroundColor,
                        }
                      : undefined
                  }
                  textContentStyle={
                    post?.textContentStyle?.color
                      ? { color: post?.textContentStyle?.color }
                      : undefined
                  }
                />
              </BlogPostPreview>
            </Col>
          );
        })}
      </Row>

      <div className="bg-white text-[#272727]  md:hidden">
        <p className="text-3xl font-medium pl-5 pt-8 pb-4">News & Updates</p>
      </div>
      <Carousel
        ref={containerRef}
        swipeToSlide={true}
        centerMode={true}
        centerPadding="23px"
        cssEase="linear"
        speed={450}
        touchThreshold={10000}
        slidesToShow={1}
        infinite={true}
        arrows={false}
        dots={false}
        // autoplay={true}
        autoplaySpeed={6000}
      >
        {blogPosts?.map((post, index) => {
          const RenderBlogPostPreview =
            post?.type === "semi"
              ? BlogPostPreview.SplitView
              : BlogPostPreview.CoverView;
          return (
            <Col
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              key={`blog-post-${index}`}
              style={{ minHeight: "100%" }}
            >
              <BlogPostPreview url={post?.url || ""}>
                <RenderBlogPostPreview
                  imageUrl={post?.image || ""}
                  {...(post?.alignment ? { alignment: post?.alignment } : {})}
                  description={post?.description || ""}
                  heading={post?.heading || ""}
                  title={post?.title || ""}
                  contentSectionStyle={
                    post?.contentSectionStyle?.backgroundColor
                      ? {
                          backgroundColor:
                            post.contentSectionStyle.backgroundColor,
                        }
                      : undefined
                  }
                  textContentStyle={
                    post?.textContentStyle?.color
                      ? { color: post?.textContentStyle?.color }
                      : undefined
                  }
                />
              </BlogPostPreview>
            </Col>
          );
        })}
      </Carousel>
      <div className={styles.carousalPreviewSlideButtons}>
        <div
          style={{
            padding: "10px",
            borderRadius: "6px",
            background: "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2))",
          }}
          onClick={() => {
            handleCarousalChange("left");
          }}
        >
          <Image
            src="/images/carousal-left.svg"
            alt=""
            width={21}
            height={16}
          />
        </div>
        <div
          style={{
            padding: "10px",
            borderRadius: "6px",
            background: "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2))",
          }}
          onClick={() => {
            handleCarousalChange("right");
          }}
        >
          <Image
            src="/images/carousal-right.svg"
            alt=""
            width={21}
            height={16}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPreviewSection;
