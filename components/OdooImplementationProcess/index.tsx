import React, { forwardRef } from 'react'
import styles from "./index.module.scss";
import analysis from '/public/icons/Analysis.png'
import calenderClock from "/public/icons/calendar-clock.png";
import customisation from "/public/icons/customization.png";
import development from "/public/icons/app-window.png";
import testing from "/public/icons/shield-check.png";
import dataMigration from "/public/icons/server-cog.png";
import deployment from "/public/icons/release.png";
import training from "/public/icons/clipboard-pen-line.png";
import HeaderComponent from '../HeaderComponent';
import { Card, Col } from 'antd';
import Image from "next/image";
import odooImage from "/public/images/odoo-img.png"

interface OdooImplementationProcessProps {
  ref?: React.Ref<HTMLDivElement>;
}

const OdooImplementationProcess = forwardRef<HTMLDivElement, OdooImplementationProcessProps>((props, ref) => {

  const status1 = "Implementation process";

  const ImplementationProcess = [
    {
      icon: analysis,
      image: "",
      title: "Analysis",
      content: "We start with a thorough analysis to understand your unique business requirements and challenges."
    },
    {
      icon: calenderClock,
      image: "",
      title: "Planning",
      content: "Developing additional functionalities or modules required for your business."
    },
    {
      icon: customisation,
      image: "",
      title: "Customization",
      content: "Adapting and customizing Odoo to fit your specific business needs and processes."
    },

    {
      icon: development,
      image: "",
      title: "Development",
      content: "Developing additional functionalities or modules required for your business."
    },


    {
      image: odooImage,
    },

    {
      icon: dataMigration,
      image: "",
      title: "Data Migration",
      content: "Safely migrating existing data to the new Odoo system, ensuring integrity and accessibility."
    },

    {
      icon: testing,
      image: "",
      title: "Testing",
      content: "Rigorously testing the system to ensure it meets all requirements and operates flawlessly."
    },

    {
      icon: deployment,
      image: "",
      title: "Deployment",
      content: "Deploying the new Odoo system in your business environment, ensuring a smooth transition."
    },

    {
      icon: training,
      image: "",
      title: "Training",
      content: "Providing comprehensive training to ensure your staff is fully equipped to use the Odoo system effectively."
    },
  ]
  return (
    <div ref={ref}
      className={`${styles.container} 
           bg-[url('/backgroud-images/whats-in-it-for-you.jpg')]
           bg-[#0a0a0a]
        `}
    >
      <div className="mb-12">
        <HeaderComponent title={status1} font={"font-['libre-franklin']"} />
      </div>

      <Col
        className={`${styles.row} ${ImplementationProcess.length > 0 ? "grid lg:grid-cols-3" : "flex flex-col"
          }`}
      >
        {ImplementationProcess.map((item, index: number) =>
          ImplementationProcess.length > 0 && index != 4 ? (
            <>
              <Card
                key={index}
                className={styles.cards}
                bordered={false}
                hoverable={true}
              >
                <div className="flex flex-col gap-4 md:gap-0 items-start justify-start">
                  <div className=" flex items-center gap-4 xl:gap-6 2xl:gap-9 w-full">
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
                    <h1
                      className={`${styles.heading
                        } text-xl leading-[26px] font-['libre-franklin'] font-medium ${item.icon
                          ? "md:text-xl md:leading-[21px] 2xl:text-[24px] 2xl:leading-[33px}"
                          : "md:text-xl md:leading-[21px] 2xl:text-4xl 2xl:leading-[36px]"
                        }`}
                    >
                      {item.title}
                    </h1>
                  </div>
                  <div className="w-full h-[1px] bg-[#FF7800] mt-[10px]"></div>
                  <p
                    className={`${styles.desc} ${styles.textColor} mt-4`}
                  >
                    {item.content}
                  </p>
                </div>
              </Card>
            </>
          ) : (
            <div key={index} className='max-w-[282px] h-auto m-auto'>
              <Image
                src={item.image}
                alt={"plus"}
                quality={100}
                objectFit="contain"
              />
            </div>
          )
        )}
      </Col>
    </div>
  )
});

OdooImplementationProcess.displayName = 'OdooImplementationProcess';

export default OdooImplementationProcess;
