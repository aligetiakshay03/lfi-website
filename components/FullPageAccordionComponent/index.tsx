import { Collapse, CollapseProps } from 'antd'
import Image from 'next/image'
import React, { CSSProperties, useEffect, useState } from 'react'
import arrowDown from "../../public/images/arrow_down.png";
import styles from './index.module.scss'
import { SapSpecialExpertiseFullPageAccordion } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';

const FullPageAccordion = (props) => {
    const [padding, setPadding] = useState('100px');



    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width <= 639) {
                setPadding('15px 20px');
            } else if (width <= 1025) {
                setPadding('25px 40px');

            } else if (width <= 1560) {
                setPadding('40px 80px');
            } else {
                setPadding('50px 100px');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let newArray = Object.values(props).map((item, index) => {
        return item;
    });
    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => {
        const dataCollapse = newArray.map((item: SapSpecialExpertiseFullPageAccordion, index) => {
            const backgroundColor = index % 2 === 0 ? 'url("/backgroud-images/S1.png")' : '';
            return {
                key: `${index + 1}`,
                label: <h1 data-tina-field={tinaField(item, "title")} className={styles.componentHeader}>{item?.title}</h1>,
                children: (<>
                    {item?.content?.map((data, index) => {
                        return <div key={data?.heading} className={styles.contentContainer}>
                            <h1 data-tina-field={data?.heading && tinaField(data, "heading")}>{data?.heading}</h1>
                            <p data-tina-field={data?.description && tinaField(data, "description")}>{data?.description}</p>
                            {data?.list &&
                                <ol className={styles.list}>
                                    {data?.list.map((listItem, index) => (<li key={index}>{listItem?.listItem}</li>))}
                                </ol>}
                        </div>
                    })}
                </>),
                style: {
                    ...panelStyle,
                    background: backgroundColor,
                }
            }
        })
        return dataCollapse
    }

    const panelStyle: React.CSSProperties = {
        border: 'none',
        padding: padding,
        background: 'green',
    };

    return (
        <div className={styles.container}>
            <Collapse
                bordered={false}
                expandIcon={({ isActive }) => (
                    <Image
                        src={isActive ? "/images/minus.svg" : "/images/plus.svg"}
                        height={20}
                        width={20}
                        alt={isActive ? "minus" : "plus"}
                        className="mt-[25px]"
                    />
                )}
                items={getItems(panelStyle)}
                expandIconPosition='end'
            />
        </div>
    )
}

export default FullPageAccordion