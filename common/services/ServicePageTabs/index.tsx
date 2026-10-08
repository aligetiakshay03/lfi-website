import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { ServiceTabContent } from "./ServiceTabContent";
import styles from "./servicePageTabs.module.scss";
import { tinaField } from "tinacms/dist/react";
import {
  AutomationTabItems,
  CloudTabItems,
  ConsultingTabItems,
  EngineeringTabItems,
  It_Infra_And_SolutionsTabItems,
  TeamsTabItems,
  TechnologyTabItems,
} from "../../../tina/__generated__/types";
export interface ServicePageTabsProps {
  tabItems:
    | ConsultingTabItems[]
    | CloudTabItems[]
    | TeamsTabItems[]
    | AutomationTabItems[]
    | EngineeringTabItems[]
    | TechnologyTabItems[]
    |It_Infra_And_SolutionsTabItems[];
}

const ServicePageTabs = ({ tabItems }: ServicePageTabsProps) => {
  return (
    <>
      {tabItems.length > 0 && (
        <Tabs
          className={styles.tabContainer}
          animated={{ inkBar: true, tabPane: false }}
          items={tabItems.map((tab, i) => {
            const id = i + 1;
            return {
              label: (
                <span
                  data-tina-field={tinaField(tab, "title")}
                  className={` ${id > 2 ? "w-[11px]" : "w-full"}`}
                >
                  {tab?.title}
                </span>
              ),

              key: String(id),
              children: <ServiceTabContent {...tab} />,
            };
          })}
        ></Tabs>
      )}
    </>
  );
};

export default ServicePageTabs;
