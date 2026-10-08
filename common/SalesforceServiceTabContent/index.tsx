import React from 'react'
import styles from "./index.module.scss";
import { Card, Col } from 'antd';
import Image from "next/image";

interface ServiceContent {
    titleName: string;
    description: string;
    cards: Array<{
        icon?: any;
        serviceName: string;
    }>;
}

const SalesforceServiceTabContent = (tabContent: ServiceContent) => {
    const {titleName, description, cards} = tabContent;
  return (
      <div
              className={`${styles.container} 
           bg-[url('/backgroud-images/salesforce-services-BG.png')]
           bg-[#0a0a0a]
        `}
          >
            <p className={`${styles.title}`}>{titleName}</p>
          <p
              // data-tina-field={tinaField(item, "content")}
              className={`${styles.desc} ${styles.textColor} mt-3 md:mt-[28px] lg:mt-[28px]`}
          >
              {description}
          </p>
          <Col
              className='grid grid-cols-3 gap-[36px] max-2xl:gap-[28px] max-lg:gap-[24px] 
              max-xl:grid-cols-2 
              max-md:grid-cols-1'
          >
              {cards.map((item, index: number) =>
                  (
                  <Card
                      key={index}
                      className={styles.card}
                      bordered={false}
                      hoverable={true}
                  >
                      <div className="flex">
                          {item.icon ? (
                              <div className="relative min-w-[48px] min-h-[48px] mt-1">
                                  <Image
                                      src={item.icon}
                                      fill
                                      alt={"plus"}
                                      quality={100}
                                      objectFit="contain"
                                  />
                              </div>
                          ) : null}
                          <p className={`${styles.description} ml-4 my-auto`}> {/* Add margin-left for spacing */}
                              {item.serviceName}
                          </p>
                      </div>                     
                  </Card>
                  )
              )}
          </Col>
        </div>
  )
}

export default SalesforceServiceTabContent;