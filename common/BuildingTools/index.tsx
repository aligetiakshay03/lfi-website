import React, { forwardRef } from "react";
import { tinaField } from "tinacms/dist/react";
import styles from "./buildingTools.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import BuildingsToolsCard from "../../components/buildingsToolsCard";
import { BuildingsToolsQuery } from "../../tina/__generated__/types";

interface Iprops {
  status1?: string;
  heading1?: string;
  cards: BuildingsToolsQuery;
  ref?: any;
}

// const BuildingToolsComponent = (props: Iprops) => {
  const BuildingToolsComponent = forwardRef<HTMLDivElement, Iprops>((props, ref) => {
  return (
    <div className={styles.container}>
      <div ref={ref} data-tina-field={tinaField(props, "status1")}>
        <HeaderComponent title={props.status1} font={"font-['libre-franklin']"} />
      </div>
      <h2
        data-tina-field={tinaField(props, "heading1")}
        className={styles.title}
      >
        {props.heading1}
      </h2>
      <BuildingsToolsCard {...props.cards} />
    </div>
  );
});

export default BuildingToolsComponent;
