import { Col, Flex, Row } from 'antd'
import React, { useEffect } from 'react'
import styles from "./serviceTabContent.module.scss"
import Image from 'next/image'
import { tinaField } from 'tinacms/dist/react'
import { CloudTabItems, ConsultingTabItems } from '../../../../tina/__generated__/types'
import orangearrow from "../../../../public/images/arrow-orange.png"
import Link from 'next/link'
import Button from '../../../../common/Button'
import { TinaMarkdown } from 'tinacms/dist/rich-text'


export const ServiceTabContent = (tabItems: ConsultingTabItems) => {

  const {
    title,
    descriptions,
    button,
    imageUrl
  } = tabItems;


  return (
    <div className={styles.serviceTabConainer}>
      <span data-tina-field={tinaField(tabItems, 'title')} className={styles.titleSection}> {title}</span>
      {descriptions && <div className={styles.descriptionSection}>

        {/* <span data-tina-field={tinaField(tabItems, 'descriptions')}>
        {descriptions}
        </span> */}
        <TinaMarkdown
          data-tina-field={tinaField(tabItems, 'descriptions')}
          content={descriptions}
          components={{
            p: (descriptions) => (
              <p className={styles.desc} {...descriptions} />
            ),
            h1: (descriptions) => (
              <h1 className={styles.desc} {...descriptions} />
            ),
            h2: (descriptions) => <h2 className={styles.desc} {...descriptions} />,
            a: (descriptions) => (
              <a
                href={`${descriptions?.url}`}
                className={styles.desc}
              >
                {descriptions?.children}
              </a>
            ),
            li: (descriptions) => (
              <li className={styles.desc}>
                <div className='flex flex-row'>
                <span style={{ marginRight: "3px" }}>
                  •
                </span>
                <div className={styles.desc}>{descriptions?.children}</div>
                </div>
              </li>
            ),
          }}
        />
        {button && button.label && button.link && (
          <Link href={button.link}>
            <Button
              text={button.label}
              icon={orangearrow}
              className=""
              bgColor="transparent"
              labelClass="max-2xl:text-[24px] text-[#FF7800] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal md:text-[20px] md:leading-[15.81px]"
            />
          </Link>
        )
        }
      </div>}

      {imageUrl ? (
        <div className={styles.imageSection}>
          <Image data-tina-field={tinaField(tabItems, 'imageUrl')} src={imageUrl} alt={title || ""} fill style={{ borderRadius: "5px" }} />
        </div>
      ) : null}
    </div>
  )
}

