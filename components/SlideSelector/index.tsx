import React from "react";
import styles from "./slide_selector.module.scss";
interface ISlideSelectorProps {
  className?: string;
  selectors: string[];
  currentSlideIndex: number;
  onClickSelector: (index: number) => void;
}
const SlideSelector = (props: ISlideSelectorProps) => {
  const { className, selectors, onClickSelector, currentSlideIndex } = props;
  return (
    <div className={`${styles.root}  ${className ? className : ""}`}>
      {selectors?.map((item, index) => (
        <div
          onClick={() => onClickSelector(index)}
          key={`selector-${index}`}
          className={`${styles.selector_item} ${
            currentSlideIndex === index ? styles.selector_active : ""
          } lf-btn`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
export default SlideSelector;
