import { Col, Flex, Row, message } from "antd";
import React from "react";
import styles from "./messageBanner.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd/lib";
import { tinaField } from "tinacms/dist/react";
export interface IMessageBanner {
  title?: string | null | undefined;
  description?: string | null | undefined;
  url?: string | null | undefined;
  urlMessage?: any;
  onClick?: () => void;
  titleStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties; // Corrected typo in property name
  urlStyle?: React.CSSProperties;
  showArrowIcon?: boolean;
}

const MessageBanner = (props: IMessageBanner) => {
  const {
    title = "",
    url = "",
    description = "",
    titleStyle = {},
    urlStyle = {},
    urlMessage = "",
    onClick,
    showArrowIcon = true,
  } = props;
  const BannerButton = () => {
    return (
      <Flex
        wrap="wrap"
        align="center"
        gap="middle"
        className={styles.urlMessageSectionContainer}
      >
        <span
          data-tina-field={tinaField(props, "urlMessage")}
          className={styles.textSection}
        >
          {urlMessage}
        </span>
        {showArrowIcon && (
          <div className={styles.iconSection}>
            <Image
              src="/images/bannerMessage/right-arrow-banner.svg"
              alt=""
              fill
              style={{ position: "absolute" }}
            ></Image>
          </div>
        )}
      </Flex>
    );
  };

  return (
    <Row className={styles.messageBannerContainer}>
      {title || description ? (
        <Col xs={24} md={17} lg={19} className={styles.messageSection}>
          {title ? (
            <p
              data-tina-field={tinaField(props, "title")}
              className={styles.titleSection}
              style={titleStyle}
            >
              {title}
            </p>
          ) : null}
          {description ? (
            <p
              data-tina-field={tinaField(props, "description")}
              className={styles.descriptionSection}
            >
              {description}
            </p>
          ) : null}
        </Col>
      ) : null}
      {urlMessage ? (
        <Col
          xs={24}
          md={8}
          lg={6}
          style={urlStyle}
          className={styles.linkSection}
        >
          {url ? (
            <Link href={url} className={styles.hrefSection}>
              {<BannerButton />}
            </Link>
          ) : onClick ? (
            <Button
              htmlType="button"
              type="primary"
              className={styles.hrefSection}
              onClick={() => {
                onClick();
              }}
            >
              {<BannerButton />}
            </Button>
          ) : null}
        </Col>
      ) : null}
    </Row>
  );
};

export default MessageBanner;
