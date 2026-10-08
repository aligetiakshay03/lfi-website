import React, { forwardRef } from 'react';
import styles from "./index.module.scss";
import { Col, Row } from 'antd';
import HeaderComponent from '../HeaderComponent';
import CountUp from "react-countup";
interface WhyChooseUsProps {
    ref?: React.Ref<HTMLDivElement>;
}
const WhyChooseUs = forwardRef<HTMLDivElement, WhyChooseUsProps>((props, ref) => {
    const statusName = "Why us";
    const title = "Why choose us";
    const achivements = [
        {
            number: 5,
            suffix: "+",
            description: "Years"
        },
        {
            number: 50,
            suffix: "+",
            description: "Projects successfully delivered"
        },
        {
            number: 6,
            suffix: "+",
            description: "Solutions & Accelerators"
        },
        {
            number: null,
            suffix: "5/5",
            description: "Customer CSAT"
        },
        {
            number: 300,
            suffix: "+",
            description: "Certifications"
        },
        {
            number: 60,
            suffix: "+",
            description: "Salesforce Practice Size"
        }
    ];
    return (
        <div ref={ref}
            className={`${styles.container} 
           bg-[url('/backgroud-images/salesforce-services-BG.png')]
           bg-[#0a0a0a]
        `}
        >
            <section className={styles.sec1}>
                <div
                >
                    <HeaderComponent
                        title={statusName}
                        font={"font-['libre-franklin']"}
                    />
                </div>
                <div className={styles.header}>
                    <h3
                        className={styles.sec1_heading}
                    >
                        {title}
                    </h3>
                </div>
            </section>
            <Row className={styles.sec2} gutter={[16, 16]}>
                {achivements.map(
                    (item, index) => (
                        <Col key={index} xs={4} md={6} className={styles.cols}>
                            <section className={styles.sec2_item}>
                                <h2
                                    className={styles.sec2_title}
                                >
                                    {item.number != null ? (<CountUp
                                        end={Number(item?.number)}
                                        duration={6}
                                        suffix={`${item?.suffix}`}
                                        enableScrollSpy={true}
                                    />) : item?.suffix}
                                </h2>
                                <p
                                    className={styles.sec2_desc}
                                >
                                    {item?.description}
                                </p>
                            </section>
                        </Col>
                    )
                )}
            </Row>
        </div>
    )
});
WhyChooseUs.displayName = 'WhyChooseUs';
export default WhyChooseUs