"use client";
import React, { useState } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Col, Drawer, Row } from "antd";
import { INavbar } from "../../interfaces/navbar";
import { useTina } from "tinacms/dist/react";

import closeBtn from "../../public/images/close.png";
import mobileBtn from "../../public/images/mobile_btn.png";
import header_logo from "../../public/images/footer_lfi.png";
import { useRouter } from "next/router";
import arrowDown from "../../public/images/arrow_down.png";
import ButtonC from "../Button/Button";
interface IHeaderProps {
  navbar: INavbar;
}

const Header = (props: IHeaderProps) => {
  const { data: links } = useTina(props.navbar);
  const [open, setOpen] = useState({});
  const [mobile, setMobile] = useState(false);
  const [openDD, setOpenDD] = useState({});
  const [openDD2, setOpenDD2] = useState({});

  function toggleFunction(id) {
    setOpen({
      [id]: !open[id],
    });
  }
  function toggleMobileFunction(id) {
    setOpenDD({
      [id]: !openDD[id],
    });
  }

  function toggleMobileFunction2(id) {
    setOpenDD2({
      [id]: !openDD2[id],
    });
  }

  return (
    <div className={styles.root}>
      <div className={`${styles.container}`}>
        <Link href={"/"}>
          <div className={styles.img_con}>
            <Image
              src={links.navbar.logo as string}
              alt="logo"
              objectFit="cover"
              layout="fill"
              className="bg-color-white"
            />
          </div>
        </Link>
        <div className={styles.links}>
          {links?.navbar?.links?.map((link: any, idx) => {
            return (
              <div key={idx}>
                <Row align="middle" justify="space-between">
                  <Col>
                    <div className={`lf-btn title px-5 text-xl font-semibold`}>
                      {link.label}
                    </div>
                  </Col>
                  <svg
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5.5 5L10 1"
                      stroke="#F0F0F0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Row>
              </div>
            );
          })}
        </div>
        <div className="contactus_btn">
          <span className="lf-btn">{links?.navbar?.btn?.label}</span>
        </div>

        <div className={styles.mobileBtn} onClick={() => setMobile(!mobile)}>
          <Image
            src={mobileBtn}
            alt="mobilebtn"
            layout="fill"
            objectFit="fill"
          />
        </div>
        <Drawer
          title=""
          placement="right"
          closable={false}
          width="100%"
          onClose={() => setMobile(false)}
          open={mobile}
          className={styles.mobileContainer}
          style={{ background: "none" }}
        >
          <div>
            <div className={styles.mobileHeader}>
              <Image
                src={header_logo}
                alt="logo"
                width={30}
                height={32}
              />
              <div
                className={styles.mobile_close}
                onClick={() => setMobile(!mobile)}
              >
                <Image
                  src={closeBtn}
                  alt="close btn"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className={styles.menuContainer}>
              <div>
                {links?.navbar?.links?.map((item, id) => {
                  return (
                    <div className="flex items-center justify-between" key={id}>
                      <h2
                        className={`${styles.title} title py-5 text-3xl`}
                      >
                        {item?.label}
                      </h2>
                      <div
                        className={`${styles.arrow}`}
                        onClick={() => toggleMobileFunction2(id)}
                      >
                        <Image src={arrowDown} alt="arrow" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <ButtonC
            type="primary"
            theme="light"
            name="Contact us"
            noArrow={true}
            className={styles.mansur_1}
          />
        </Drawer>
      </div>

      <style jsx>{`
        .link {
          display: flex;
          align-items: center;
          margin-right: 3rem;
          padding: 3rem 1rem;
          cursor: pointer;
        }

        .link .title {
          margin-right: 0.5rem;
          cursor: pointer;
        }

        .open {
          border-bottom: 2px solid #ff7800;
        }

        .open svg {
          margin-bottom: 3px;
        }

        .contactus_btn {
          cursor: pointer;
          width: 134px;
          height: 50px;
          background: transparent;
          display: flex;
          align-items: center;
          border: 1px solid rgba(240, 240, 240, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          justify-content: center;
        }

        .contactus_btn:hover {
          border: 1px solid #e6eced;
        }

        .contactus_dark_btn {
          cursor: pointer;
          width: 134px;
          height: 50px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          border-radius: 10px;
          color: #272727;
          border: 1px solid rgba(39, 39, 39, 0.8);
        }

        @media screen and (max-width: 1000px) {
          .contactus_btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
