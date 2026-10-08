import React from 'react'
import MessageBanner from '../../common/MessageBanner'
import styles from "./messageBannerSection.module.scss"
import Image from 'next/image'
import { Flex } from 'antd'
const MessageBannerSection = () => {
  const bannerSection = {
    title: "Ready to kick off your software development project?",
    description: "Let's talk about what you need",
    url: "/",
    urlMessage: "Contact us"
  }

  return (
    <MessageBanner title={bannerSection.title} description={bannerSection.description} url={bannerSection.url} urlMessage={bannerSection.urlMessage} />
  )
}

export default MessageBannerSection
