// import React from 'react'
"use client";
import { Col, Collapse, CollapseProps, Row } from "antd";
import styles from "./index.module.scss";
import Image from "next/image";
import HeaderComponent from "../../components/HeaderComponent";
import { tinaField } from "tinacms/dist/react";
import { forwardRef } from "react";
const { Panel } = Collapse;

// const CollapseComponent = ({ data }) => {\
const CollapseComponent = forwardRef<HTMLDivElement ,{data : any}>(({ data }, ref) => {
  const items = data.list.map((item, index) => ({
    key: index + 1,
    label: (
      <p
        data-tina-field={tinaField(item, "title")}
        className={`${styles.header} !p-0`}
      >
        {item.title}
      </p>
    ),
    children: (
      <p
        data-tina-field={tinaField(item, "description")}
        className={styles.para}
      >
        {item.description}
      </p>
    ),
  }));

  return (
    <div ref={ref} 
      className={` 
        ${styles.container} ${
          data?.bg
          ? "bg-[url('/backgroud-images/Our_process_BG_1x.png')] bg-cover "  
            : "bg-[#0a0a0a] z-80"
        }`}
    >

    {/* <div ref ={ref} className="bg-[url('/backgroud-images/Our_process_full_BG.png')] " > */}
      {data.image ? (
        // <div  className=" p-5 md:p-[50px] xl:p-[60px] min-[1561px]:p-[100px]">
        <div  className="">

          <Row className={styles.gap}>
            <Col span={10} className={styles.row} xs={24} xl={10}>
              {data.header &&<div  data-tina-field={tinaField(data, "header")}>
                <HeaderComponent title={data.header} font={"font-['libre-franklin']"}/>
              </div>}
              <h1  
                data-tina-field={tinaField(data, "title")}
                className={styles.title}
              >
                {data.title}
              </h1>
              <p
                data-tina-field={tinaField(data, "description")}
                className={styles.description}
              >
                {data.description}
              </p>
            </Col>
            <Col span={12} className={styles.row} xs={24} xl={11}>
              <Collapse
                className="!p-0 "
                ghost={true}
                bordered={false}
                // defaultActiveKey={1}
                // defaultActiveKey={0}
                expandIconPosition="end"
                expandIcon={({ isActive }) => (
                  <Image
                    src={isActive ? "/images/minus.svg" : "/images/plus.svg"}
                    height={20}
                    width={20}
                    alt={isActive ? "minus" : "plus"}
                    className="h-[20px] w-[20px] mt-[72px] md:mt-[52px] min-[1560px]:mt-[84px] relative" // Adjust the height and width as needed
                  />
                )}
              >
                {items.map((item, index) => (
                  <Panel
                    key={item.key || 1}
                    header={item.label}
                    className={`border-[#3B3B3B] ${index===0?"":"border-t-[1px]"} min-[1560px]:mt-5`}
                  >
                    {item.children}
                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
          {data.image && (
            <>
              <div className={data.bg ? styles.image_bg : ""} />
              <div className=" relative pb-5 h-96 max-[767px]:h-[10rem] max-[1024px]:h-[15rem] max-[1918px]:h-[30rem] min-[1919px]:h-[597px] ">
                <Image
                  src={data.image}
                  alt={"frame"}
                  fill
                  objectFit="contain"
                  className={`${data.imageStyles} mx-auto xl:mt-16 min-[1919px]:mt-24`}
                // className={`${data.imageStyles} `}


                />
              </div>
            </>
          )}
          {data.imageList && (
            <Row
              gutter={[16, 16]}
              className="flex justify-between items-center md:pt-24  max-md:mb-5"
            >
              <Col xs={5} lg={2}>
                <div className="flex justify-center w-12 h-12 lg:w-[76px] lg:h-[68px] min-[1560px]:h-[76px]">
                  <Image
                    src={"/images/image 85.png"}
                    alt={"diamond"}
                    fill
                    objectFit="contain"
                  />
                </div>
              </Col>
              <Col xs={5} lg={2}>
                <div className="flex justify-center w-12 h-12 lg:w-[76px] lg:h-[68px] min-[1560px]:h-[76px]">
                  <Image
                    src={"/images/image 86.png"}
                    alt={"figma"}
                    fill
                    objectFit="contain"
                  />
                </div>
              </Col>
              <Col xs={5} lg={2}>
                <div className="flex justify-center w-12 h-12 lg:w-[76px] lg:h-[68px] min-[1560px]:h-[76px] ">
                  <Image
                    src={"/images/image 87.png"}
                    alt={"in"}
                    fill
                    objectFit="contain"
                  />
                </div>
              </Col>
              <Col xs={24} lg={2} className="max-md:my-3">
                <div className="flex justify-center w-12 h-12 lg:w-[84px] lg:h-[84px]">
                  <Image
                    src={"/images/axure-2.png"}
                    alt={"axure"}
                    fill
                    objectFit="contain"
                  />
                </div>
              </Col>
              <Col xs={5} lg={2}>
                <div className="flex justify-center w-12 h-12 lg:w-[76px] lg:h-[68px] min-[1560px]:h-[76px] ">
                  <Image
                    src={"/images/image 89.png"}
                    alt={"ai"}
                    fill
                    objectFit="contain"
                  />
                </div>
              </Col>
              <Col xs={5} lg={2}>
                <div className="flex justify-center w-12 h-12 lg:w-[76px] lg:h-[68px] min-[1560px]:h-[76px] ">
                  <Image
                    src={"/images/image 90.png"}
                    alt={"ps"}
                    fill
                    objectFit="contain"
                  />
                </div>
              </Col>
              <Col xs={5} lg={2}>
                <div className="flex justify-center w-12 h-12 lg:w-[76px] lg:h-[68px] min-[1560px]:h-[76px] ">
                  <Image
                    src={"/images/image 84.png"}
                    alt={"ps"}
                    fill
                    objectFit="contain"
                  />
                </div>
              </Col>
            </Row>
          )}
        </div>
      ) : (
        <div className=" relative min-[1561px]:-top-16  ">
          {/* <Image
            src={`/backgroud-images/our-process.jpg`}
            alt={"frame"}
            fill
            className={` mx-auto mt-12 md:mt-24`}
          /> */}

          <Row
            // className={`${styles.gap} p-5 md:p-[50px] xl:p-[60px] min-[1561px]:px-[100px]`}
            className={`${styles.gap} `}

          >
            <Col span={10} className={`${styles.row}  `} xs={24} xl={10}>
            {data.header && <div data-tina-field={tinaField(data, "header")}>
                <HeaderComponent title={data.header} font={"font-['libre-franklin']"}/>
              </div>}
              <h1
                data-tina-field={tinaField(data, "title")}
                className={styles.title}
              >
                {data.title}
              </h1>
              <p
                data-tina-field={tinaField(data, "description")}
                className={styles.description}
              >
                {data.description}
              </p>
            </Col>
            <Col span={12} className={styles.row} xs={24} xl={11}>
              <Collapse
                className="!p-0 "
                ghost={true}
                bordered={false}
                // defaultActiveKey={1}
                // defaultActiveKey={0}

                expandIconPosition="end"
                expandIcon={({ isActive }) => (
                  <Image
                    src={isActive ? "/images/minus.svg" : "/images/plus.svg"}
                    height={20}
                    width={20}
                    alt={isActive ? "minus" : "plus"}
                    className="h-[20px] w-[20px] mt-[72px] md:mt-[52px] min-[1560px]:mt-[84px] relative"
                  />
                )}
              >
                {items.map((item) => (
                  <Panel
                    key={item.key || 1}
                    header={item.label}
                    className={`border-[#3B3B3B] border-t-[1px] min-[1560px]:mt-5`}
                  >
                    {item.children}
                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
});

export default CollapseComponent;
