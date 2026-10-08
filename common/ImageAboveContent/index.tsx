import { Col, Row } from "antd";
import React from "react";
import { Flex } from "antd";
import Image from "next/image";
import styles from "./index.module.scss";
import Link from "next/link";

export const ImageAboveContent = ({
  imageUrl,
  title = "",
  indexTitle = "",
  description = "",
  heading = "",
  contentSectionStyle = { backgroundColor: "" },
  textContentStyle = {},
  author,
  alignment = "top", // Default alignment is top
  news,
}) => {
  
  return (
    <div>
      <div style={{ background: `${contentSectionStyle?.backgroundColor}` }} className="bg-red md:max-w-[576px] h-full flex flex-col justify-between group">
        <div className={`${alignment === 'top' ? 'order-2' : 'md:order-1 order-2'} transition-transform overflow-hidden`}>
          {imageUrl && <div className={styles.imgContainer}><Image className="h-[480px] transition-transform group-hover:scale-125 duration-[1000ms] ease-in-out" src={imageUrl} alt="image" width={1800} height={1800} /></div>}
        </div>
        <div className={`p-[33px] order-1 min-h-[480px]`}>
          <p style={textContentStyle} className="text-[18px] leading-5">{heading}</p>
          <h1 className="2xl:text-[24px] text-[20px] mt-[60px] leading-[30px] font-['HelveticaNeueSmall']">
            <span
              style={textContentStyle}
              className={styles.blogPreviewTitleSection + ' group-hover:underline'}
            >
              <Link href={{
                pathname: `${news ? `/company/news-and-articles/${indexTitle}` : `/company/blog/${indexTitle}`}`,
                query: { author: `${author}` },
              }}>{title}</Link>
            </span>
          </h1>
          <p style={textContentStyle} className={`mt-[60px] text-[16px] leading-5 text-ellipsis overflow-hidden line-clamp-3 font-['HelveticaNeueSmall']`}>{description}</p>
        </div>
      </div>
    </div>
  );
};


export const SingleContent = ({
  imageUrl,
  title = "",
  indexTitle = "",
  description = "",
  heading = "",
  alignment = "",
  author,
  contentSectionStyle = {},
  textContentStyle = {},
  news,
}) => {
  
  return (
    <div>
      <Row className={styles.blogPreviewContainer + " max-md:hidden"}>
        {imageUrl ? (
          <Col
            order={alignment === "left" ? 0 : 1}
            xs={24}
            sm={8}
            lg={12}
            className={styles.blogPreviewImageSection}
          >
            <Image
              src={imageUrl}
              alt={imageUrl}
              className={styles.blogPreviewSplitViewImage}
              fill
              style={{ objectFit: "cover" }}
            />
          </Col>
        ) : null}
        <Col xs={24} lg={12} sm={16} style={contentSectionStyle}>
          <Flex
            vertical
            // justify="space-between"
            className={styles.blogPreviewSplitViewContentSection}
          >
            <span
              style={textContentStyle}
              className={styles.blogPreviewHeadingSection}
            >
              {heading}
            </span>
            <Flex
              vertical
              gap={14}
              className={styles.blogPreviewSplitViewDataSection}
            >
              <span
                style={textContentStyle}
                className={styles.blogPreviewTitleSection}
              >
                <Link href={{
                  pathname: `${news ? `/company/news-and-articles/${indexTitle}` : `/company/blog/${indexTitle}`}`,
                  query: { author: `${author}` },
                }}>{title}</Link>
              </span>
              <span
                style={textContentStyle}
                className={styles.blogPreviewDescSection}
              >
                {description}
              </span>
            </Flex>
          </Flex>
        </Col>
      </Row>
      <div className="md:hidden">
        <Row className={styles.blogPreviewContainer}>
          {imageUrl ? (
            <Col
              order={1}
              xs={24}
              sm={8}
              lg={12}
              className={styles.blogPreviewImageSection}
            >
              <Image
                src={imageUrl}
                alt={imageUrl}
                className={styles.blogPreviewSplitViewImage}
                fill
                style={{ objectFit: "cover" }}
              />
            </Col>
          ) : null}
          <Col xs={24} lg={12} sm={16} style={contentSectionStyle}>
            <Flex
              vertical
              // justify="space-between"
              className={styles.blogPreviewSplitViewContentSection}
            >
              <span
                style={textContentStyle}
                className={styles.blogPreviewHeadingSection}
              >
                {heading}
              </span>
              <Flex
                vertical
                gap={14}
                className={styles.blogPreviewSplitViewDataSection}
              >
                <span
                  style={textContentStyle}
                  className={styles.blogPreviewTitleSection}
                >
                  <Link href={{
                    pathname: `${news ? `/company/news-and-articles/${indexTitle}` : `/company/blog/${indexTitle}`}`,
                    query: { author: `${author}` },
                  }}>{title}</Link>
                </span>
                <span
                  style={textContentStyle}
                  className={styles.blogPreviewDescSection}
                >
                  {description}
                </span>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </div>
    </div>
  )
}
