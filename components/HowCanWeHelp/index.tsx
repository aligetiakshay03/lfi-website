import React, { forwardRef } from "react";
import styles from "./style.module.scss";
import HeaderComponent from "../HeaderComponent";
import { tinaField } from "tinacms/dist/react";

interface HowCanWeHelpProps {
  data: {
    status1?: string;
    heading1?: string;
    desc?: string | undefined | null;
    ref? : any
    helpItems:
      | ({
          description?: string | null | undefined;
        } | null)[]
      | null
      | undefined;
  };
}

  const HowCanWeHelp = forwardRef<HTMLDivElement, HowCanWeHelpProps>(({ data }, ref) => {
  return (
    <div ref={ ref} className={styles.container}>
      {data?.status1 && (
        <div   data-tina-field={tinaField(data, "status1")}>
          <HeaderComponent title={data.status1} font={"font-['libre-franklin']"}/>
        </div>
      )}
      <h2
        data-tina-field={tinaField(data, "heading1")}
        className={styles.title}
      >
        {data?.heading1}
      </h2>
      <div className={styles.itemsContainer}>
        {data.helpItems?.map((item, index) => (
          <div className={styles.helpItem} key={index}>
            <div className={styles.serialNo}>{index + 1}</div>
            <div data-tina-field={item && tinaField(item, "description")}>
              <p>{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

HowCanWeHelp.displayName = "HowCanWeHelp";
export default HowCanWeHelp;
