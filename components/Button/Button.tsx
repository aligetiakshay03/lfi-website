import React from "react";
import styles from "./button.module.scss";
import { Button } from "antd";
import Image from "next/image";
import arrow_img from "../../public/images/arrow.png";
import noNameArraow from "../../public/images/noNameArrow_1.png";
import darkArrow from "../../public/images/dark_arrow.png";
import typeDefaultArrow from "../../public/images/arrow_dark.png";
import Link from "next/link";

interface IButton {
  type?: "link" | "text" | "default" | "primary" | "dashed";
  theme?: "light" | "dark";
  className?: string;
  noArrow?: true | false;
  name?: string;
  arrowDark?: boolean;
  onClick?: () => void;
  htmlType?: any;
  url?: string;
}

const ButtonC = ({
  theme,
  type,
  className,
  name,
  onClick,
  noArrow,
  arrowDark,
  htmlType,
  url,
}: IButton) => {
  return (
    <>
      {url ? (
        <Link href={url}>
          <Button
            type={type}
            className={`${
              theme === "light" ? styles.light_btn : styles.dark_btn
            }
          ${className || ""} switzer-regular ${
              type === "default" ? styles.outline : null
            }`}
            htmlType={htmlType}
          >
            {name ? (
              <span
                className={`${styles.btn_title} ${
                  noArrow ? "mr-0" : ""
                } lf-btn`}
              >
                {name}
              </span>
            ) : null}
            {noArrow ? null : (
              <Image
                alt="arraow"
                src={arrowDark ? typeDefaultArrow : arrow_img}
                height={14}
                width={14}
              />
            )}
          </Button>
        </Link>
      ) : (
        <Button
          type={type}
          className={`${theme === "light" ? styles.light_btn : styles.dark_btn}
          ${className || ""} switzer-regular ${
            type === "default" ? styles.outline : null
          }`}
          onClick={onClick}
          htmlType={htmlType}
        >
          {name ? (
            <span
              className={`${styles.btn_title} ${noArrow ? "mr-0" : ""} lf-btn`}
            >
              {name}
            </span>
          ) : null}
          {noArrow ? null : (
            <Image
              alt="arraow"
              src={arrowDark ? typeDefaultArrow : arrow_img}
              height={14}
              width={14}
            />
          )}
        </Button>
      )}
    </>
  );
};

interface INonameProps {
  theme: "light" | "dark";
  className?: string;
  onClick?: () => void;
  url?: string;
}

export const NoNameBtn = ({ theme, className, onClick, url }: INonameProps) => {
  return (
    <>
      {url ? (
        <Link href={url ? url : ""}>
          <div
            className={`${
              theme === "light" ? styles.light_theme : styles.dark_theme
            } ${className ? className : ""}`}
            onClick={onClick}
          >
            <Image
              alt="arraow"
              src={theme === "light" ? darkArrow : noNameArraow}
              height={14}
              width={18}
            />
          </div>
        </Link>
      ) : (
        <div
          className={`${
            theme === "light" ? styles.light_theme : styles.dark_theme
          } ${className ? className : ""}`}
          onClick={onClick}
        >
          <Image
            alt="arraow"
            src={theme === "light" ? darkArrow : noNameArraow}
            height={14}
            width={18}
          />
        </div>
      )}
    </>
  );
};

export default ButtonC;
