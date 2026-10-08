import { Collapse, CollapseProps } from 'antd';
import Image from 'next/image';
import React, { CSSProperties, forwardRef, useState } from 'react'
import arrowDown from "../../public/images/arrow_down.png";
import styles from "./index.module.scss"
import HeaderComponent from '../../components/HeaderComponent';

// const CollapseDropDown = (props) => {

const CollapseDropDown = forwardRef<HTMLDivElement, any>((props, ref) => {
    const { heading1, status1, cards } = props;
    // const [activeKey, setActiveKey] = useState<string | string[]>(['1']);

    const [activeKey, setActiveKey] = useState<string | string[]>([]);

    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => {
        return cards.map((item, index) => {
            const isActive = activeKey.includes(`${index + 1}`);
            const itemStyle = {
                ...panelStyle,
                height: isActive ? 'auto' : 'min-content',
            };
            return {
                key: `${index + 1}`,
                label: <h1 className={styles.componentHeader}>{item.heading}</h1>,
                children: <p className={styles.componentContent}>{item.content}</p>,
                style: itemStyle,
            };
        });
    };

    const handlePanelChange = (keys: string | string[]) => {
        setActiveKey(keys);
    };

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: '#272727',
        border: 'none',
        padding: '24px 20px',
        borderRadius: '24px',
    };

    return (
        <div ref={ref} className={styles.container}>
            <HeaderComponent title={status1.toUpperCase()} font={"font-['libre-franklin']"} />
            <h1 className={styles.title}>{heading1}</h1>
            <div className={styles.collapseContainer}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={[]}
                    expandIcon={({ isActive }) => (
                        isActive
                            ? <Image src={`/images/chevron-up.png`} alt={`expand-icon`} width={32} height={32} />
                            : <Image src={arrowDown} alt="arrow" />
                    )}
                    items={getItems(panelStyle)}
                    expandIconPosition='end'
                    activeKey={activeKey}
                    onChange={handlePanelChange}
                />
            </div>
        </div>
    );
});

export default CollapseDropDown;
