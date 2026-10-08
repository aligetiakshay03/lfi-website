import React, { forwardRef } from 'react';
import styles from "./index.module.scss";
import { Col, Collapse, Row } from 'antd';
import HeaderComponent from '../HeaderComponent';
const { Panel } = Collapse;
interface SolutionsReviewProps {
    ref?: React.Ref<HTMLDivElement>
}
const SolutionsReview = forwardRef<HTMLDivElement, SolutionsReviewProps>((props, ref) => {
    const statusName = "Consulting services";
    const title = "Salesforce Consulting Services";
    const description = "Our certified Salesforce consultants work closely with you to unlock the full potential of the Salesforce ecosystem. Through a thorough analysis of your business processes, engaging consultations with key stakeholders, and a keen understanding of your business goals, we provide tailored Salesforce Consulting Services.";
    const list = [
        {
            title: "Optimized CRM Strategy & Assessment",
        },
        {
            title: "Streamlined CRM Onboarding Process",
        },
        {
            title: "Customized Salesforce Roadmap Development",
        }
    ]
    const items = list.map((item, index) => ({
        key: index + 1,
        label: (
            <p
                className={`${styles.header} !p-0`}
            >
                {item.title}
            </p>
        ),
    }));
    return (
        <div ref={ref}
            className={` 
        ${styles.container} bg-[url('/backgroud-images/Our_process_BG_1x.png')] bg-cover text-white`}
        >
            <div className="p-[100px]  max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-sm:p-[20px]">
                <Row className={styles.gap}>
                    <Col span={10} className={styles.row} xs={24} xl={10}>
                        <HeaderComponent title={statusName} font={"font-['libre-franklin']"} />
                        <h1
                            className={styles.title}
                        >
                            {title}
                        </h1>
                        <p
                            className={styles.description}
                        >
                            {description}
                        </p>
                    </Col>
                    <Col span={12} className={styles.row} xs={24} xl={11}>
                        {items.map((item, index) => (
                            <Panel
                                key={item.key || 1}
                                header={item.label}
                                className={`border-[#3B3B3B] ${index === 0 ? "" : "border-t-[1px]"} min-[1560px]:mt-5 `}
                            >
                                {item.label}
                            </Panel>
                        ))}
                    </Col>
                </Row>
            </div>
        </div>
    )
});
SolutionsReview.displayName = 'SolutionsReview';
export default SolutionsReview