import React, { forwardRef, useEffect, useRef, useState } from 'react'
import styles from "./index.module.scss";
import { Tabs, Grid } from 'antd';
import SalesforceServiceTabContent from '../../common/SalesforceServiceTabContent';
import { TabsPosition } from 'antd/es/tabs';
import { NoNameBtn } from '../Button/Button';

const { useBreakpoint } = Grid;

interface SalesforceServicesProps {
    ref?: React.Ref<HTMLDivElement>;


}

const SalesforceServices = forwardRef<HTMLDivElement, SalesforceServicesProps>((props, ref) => {

    const [activeKey, setActiveKey] = useState('0');
    const tabContainerRef = useRef<HTMLDivElement>(null);

    const screens = useBreakpoint();
    let tabPosition: TabsPosition | undefined = 'left';
    if (screens.lg) {
        tabPosition = 'left';
    } else if (screens.md) {
        tabPosition = 'top';
    } else if (screens.sm) {
        tabPosition = 'top';
    } else if (screens.xs) {
        tabPosition = 'top';
    }
    else if (screens.xl) {
        tabPosition = 'left';
    }
    const servicePageTitle = "Salesforce Services";
    const component = [
        {
            tabName: "Implementation Services",
            content: {
                titleName: "Salesforce implementation services",
                description: "Our seasoned professionals ensure that your Salesforce implementation aligns with your business objectives, runs smoothly, and adheres to industry best practices.",
                cards: [
                    {
                        icon: '/icons/salesCloud.svg',
                        serviceName: "Sales cloud",
                    },
                    {
                        icon: "/icons/serviceCloud.svg",
                        serviceName: "Service cloud",
                    },
                    {
                        icon: "/icons/marketingCloud.svg",
                        serviceName: "Marketing cloud",
                    },
                    {
                        icon: "/icons/nonProfitCloud.svg",
                        serviceName: "Non profit cloud",
                    },
                    {
                        icon: "/icons/educationCloud.svg",
                        serviceName: "Education cloud",
                    },
                    {
                        icon: "/icons/exeperienceCloud.svg",
                        serviceName: "Experience cloud",
                    },
                    {
                        icon: "/icons/healthCould.svg",
                        serviceName: "Health cloud",
                    },
                    {
                        icon: "/icons/financialServiceCloud.svg",
                        serviceName: "Financial service cloud",
                    },
                    {
                        icon: "/icons/dataCloud.svg",
                        serviceName: "Data cloud",
                    }
                ]
            },
        },
        {
            tabName: "Integration services",
            content: {
                titleName: "Salesforce integration services",
                description: "Integrate Salesforce seamlessly with your existing business tools to boost productivity and minimize time spent toggling between applications. ",
                cards: [
                    {
                        icon: "/icons/tableauIntegration.svg",
                        serviceName: "Tableau Integration",
                    },
                    {
                        icon: "/icons/sharepointIntegration.svg",
                        serviceName: "SharePoint Integration",
                    },
                    {
                        icon: "/icons/erPintegration.svg",
                        serviceName: "ERP Integration",
                    },
                    {
                        icon: "/icons/docsignIntegration.svg",
                        serviceName: "DocuSign Integration",
                    },
                    {
                        icon: "/icons/stripeIntegration.svg",
                        serviceName: "Stripe Integration",
                    },
                    {
                        icon: "/icons/outlookIntegration.svg",
                        serviceName: "Outlook Integration",
                    },
                    {
                        icon: "/icons/mailchimpIntegration.svg",
                        serviceName: "MailChimp Integration",
                    },
                    {
                        icon: "/icons/sapIntegration.svg",
                        serviceName: "SAP Integration",
                    },
                    {
                        icon: "/icons/soapApi.svg",
                        serviceName: "SOAP API",
                    },
                ]
            },
        },
        {
            tabName: "Development services",
            content: {
                titleName: "Salesforce development services",
                description: "At Linkfields, we understand that every business has unique needs. Our Salesforce Development Services are designed to help you scale your CRM capabilities, with solutions crafted by certified Salesforce developers and architects. ",
                cards: [
                    {
                        icon: "/icons/customApp.svg",
                        serviceName: "Custom App Cloud Development",
                    },
                    {
                        icon: "/icons/appExchangeProduct.svg",
                        serviceName: "AppExchange Product Development"
                    },
                    {
                        icon: "/icons/mobileFirst.svg",
                        serviceName: "Mobile-First Solution Rollout",
                    },
                    {
                        icon: "/icons/salesforceCloud.svg",
                        serviceName: "Salesforce Customization"
                    }
                ]
            }
        },
        {
            tabName: "Migration services",
            content: {
                titleName: "Salesforce migration services",
                description:'Transitioning to the Salesforce should be smooth and efficient. Our experts specialize in seamless migrations, addressing functionality gaps and mitigating risks such as data loss and business disruptions. ',
                cards: [
                    {
                        icon: "/icons/salesforceClassic.svg",
                        serviceName: "Salesforce Classic to Lightning Migration",
                    },
                    {
                        icon: "/icons/salesforceMigration.svg",
                        serviceName: "Third-Party to Salesforce Migration",
                    }
                ]
            }
        },
        {
            tabName: "Support services",
            content: {
                titleName: "Salesforce support services",
                description: "Our comprehensive Salesforce Support Services cover everything from bug fixes to user training. We ensure your Salesforce org operates at peak performance, offering daily management, issue resolution, upgrades, and enhancements. ",
                cards: [
                    {
                        icon: "/icons/managedServices.svg",
                        serviceName: "Managed Services",
                    },
                    {
                        icon: "/icons/remoteAdmin.svg",
                        serviceName: "Remote Administrator",
                    },
                    {
                        icon: "/icons/productionsupport.svg",
                        serviceName: "Production Support and Administration",
                    },
                    {
                        icon: "/icons/useradmin.svg",
                        serviceName: "User, Admin, and Management Training"
                    }
                ]
            }
        }
    ];


    const goToNextTab = () => {
        if (!component || component.length === 0) return;
        const nextKey = (parseInt(activeKey)+1) % component.length;
        setActiveKey(nextKey.toString());

        const tabElements = tabContainerRef.current?.querySelectorAll<HTMLElement>('.ant-tabs-tab');
        const nextTabElement = tabElements?.[nextKey];

        if (nextTabElement) {
            nextTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    };

    const items = component.map((tab, i) => {
        const id = i;
        return {
            label: (
                <span className={`${styles.tabName} w-full text-[32px]`}>
                    {tab?.tabName}
                </span>
            ),
            key: String(id),
            children: <SalesforceServiceTabContent {...tab.content} />,
        };
    });

    return (
        <div ref={ref} className={`${styles.container}`}>
            <div className={`${styles.sideTabs} w-full relative`}>
                <div className={`${styles.headerDiv} bg-[#000] border border-r-black border-l-0 border-t-0 border-b-0 absolute top-0 h-[246px] pt-8`}>
                    {/* <div className={` ${styles.nestedHeader} absolute`}> */}
                        <h1 className={`${styles.header} text-[56px]  text-right text-white lg:text-[36px]`}>{servicePageTitle}</h1>
                    {/* </div> */}
                </div>
                {component.length > 0 && (
                    <Tabs
                        className={styles.tabContainer}
                        animated={{ inkBar: true, tabPane: false }}
                        tabPosition={tabPosition}
                        activeKey={activeKey}
                        onChange={(key) => {
                            setActiveKey(key);
                        }}
                        items={items}
                    />
                )}
                {tabPosition === "top" && (
                    <div className={`${styles.button_con}`}>
                        <NoNameBtn
                            theme="dark"
                            onClick={goToNextTab}
                            className={styles.nextBtn}
                        />
                    </div>
                )}
            </div>
        </div>


    )
});

SalesforceServices.displayName = 'SalesforceServices';

export default SalesforceServices