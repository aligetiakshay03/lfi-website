import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Col, Flex, Row } from "antd";
import styles from "./blogPreview.module.scss";
import "./blogPreview.module.scss";

interface BlogPostPreviewProps {
  url?: string;
  children: any;
}

export const BlogPostPreview = ({
  url = "",
  children,
}: BlogPostPreviewProps) => {
  return (
    <Link href={url} style={{ minHeight: "100%" }}>
      {children}
    </Link>
  );
};

BlogPostPreview.SplitView = function SplitView({
  imageUrl,
  title = "",
  description = "",
  alignment = "",
  contentSectionStyle = {},
  textContentStyle = {},
  heading = "",
}) {
  return (
    <Row className={styles.blogPreviewContainer}>
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
              {title}
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
  );
};

interface CoverViewProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  contentSectionStyle?: React.CSSProperties;
  textContentStyle?: React.CSSProperties;
  heading?: string;
}

BlogPostPreview.CoverView = function CoverView({
  imageUrl,
  title,
  description,
  contentSectionStyle = {},
  textContentStyle = {},
  heading = "News",
}: CoverViewProps) {
  return (
    <Flex className={styles.blogPreviewContainer}>
      <Flex
        vertical
        justify="space-between"
        flex={1}
        className={styles.blogPreviewCoverViewContentSection}
      >
        <span
          style={textContentStyle}
          className={styles.blogPreviewHeadingSection+" max-md:hidden"}
        >
          {heading}
        </span>
        <Flex
          vertical
          gap={14}
          justify="center"
          className={styles.blogPreviewCoverViewDataSection}
        >
          <span
          style={textContentStyle}
          className={styles.blogPreviewHeadingSection+" "+" md:hidden"}
        >
          {heading}
        </span>
          <span
            style={textContentStyle}
            className={styles.blogPreviewTitleSection}
          >
            {title}
          </span>
          <span
            style={textContentStyle}
            className={styles.blogPreviewDescSection}
          >
            {description}
          </span>
        </Flex>
      </Flex>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="bg-image"
          fill
          className={styles.blogPreviewCoverViewImageSection}
          style={{ objectFit: "cover" }}
        />
      )}
    </Flex>
  );
};
