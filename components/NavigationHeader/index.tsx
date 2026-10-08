"use client";
import React, { useEffect, useState } from "react";
import Styles from "./topNavigation.module.scss";
import Image from "next/image";
import NavigationModel from "../../common/NavigationModel";
import { Drawer, Dropdown, DropdownProps, Flex, Space } from "antd";
import MobileNavigationModel from "../../common/MobileNavigationModel";
import Link from "next/link";
import { tinaField, useTina } from "tinacms/dist/react";
import { NavbarLinks } from "../../tina/__generated__/types";
import { INavbar } from "../../interfaces/navbar";

interface INavBarList {
  list: NavbarLinks;
  index: number;
}
const CustomNavigationDropDown = ({ list, index }: INavBarList) => {
  const [open, setOpen] = useState(false);
  const handleMenuClick = () => {
    setOpen(false);
  };
  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };
  return (
    <>
      <Dropdown
        data-tina-field={tinaField(list, "label")}
        dropdownRender={(_menu) => (
          <div onClick={handleMenuClick}>
            <NavigationModel list={list} />
          </div>
        )}
        overlayClassName={Styles.dropDownContainer}
        trigger={["hover", "click"]}


        placement="bottom"
        autoAdjustOverflow={{ adjustX: 0, adjustY: 1 }}
        onOpenChange={handleOpenChange}
        className={Styles.dropDownButtonClassName}
        open={open}
        getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
        openClassName={Styles.openClassNameSection}
        mouseEnterDelay={0.1}
        mouseLeaveDelay={0.1}
        rootClassName={Styles.dropDownRootClassName}
        key={`drop-down-list-${index}`}
      >
        <div data-tina-field={tinaField(list, "label")}>
          <Space className={Styles.navListDirectLink}>
            {list.label}
            <Image
              src={"/icons/dropdown-arrow.svg"}
              alt="images-dropdown"
              width={12}
              height={9}
              priority={true}
            />
          </Space>
        </div>
      </Dropdown>

      {open && <div className={Styles.outerLayerSection}></div>}
    </>
  );
};

const NavigationHeader = (props: { navBar: INavbar }) => {
  const { data: navBarData } = useTina(props.navBar);

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const onScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrollingDown(currentScrollPos > prevScrollPos && currentScrollPos > 160);

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const [openMobileNavigationPanel, setOpenMobileNavigationPanel] =
    useState(false);
  const toggleMobileNavigationPanel = () => {
    setOpenMobileNavigationPanel(!openMobileNavigationPanel);
  };

  const mobileNavigationClassNames: Array<{
    collapseClass: string;
    fontClass: string;
  }> = [
      { collapseClass: "linkLevel0", fontClass: "fontClassLevel0" },
      { collapseClass: "linkLevel1", fontClass: "fontClassLevel1" },
      { collapseClass: "linkLevel2", fontClass: "fontClassLevel2" },
    ];

  return (
    <>
      {
        <div className={Styles.navRoot}>
          <div className={Styles.navigationHeader}>
            <Link className={Styles.logoSection} href={"/"}>
              <Image
                data-tina-field={tinaField(navBarData.navbar, "logo")}
                src="/images/linkfields_logo 1.svg"
                alt="linkfields_logo"
                fill
                style={{ position: "absolute" }}
                priority={true}
              ></Image>
            </Link>
            {navBarData.navbar.links && navBarData.navbar.links.length > 0 && (
              <div
                className={Styles.navigationList}
              >
                {navBarData.navbar.links.map((list, index) => {
                  if (list && list.children && list.children.length > 0) {
                    return (
                      <CustomNavigationDropDown
                        key={`custom-navigaton-link-${index}`}
                        list={list}
                        index={index}
                      />
                    );
                  } else if (list && list.href) {
                    return (
                      <Link
                        data-tina-field={tinaField(list, "label")}
                        href={list.href}
                        key={`drop-down-list-${index}`}
                        className={Styles.navListDirectLink}
                      >
                        {list.label}
                      </Link>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            )}
            {navBarData.navbar.btn?.href && (
              <Link
                data-tina-field={tinaField(navBarData.navbar, "btn")}
                href={navBarData.navbar.btn?.href}
              >
                <button type="button" className={Styles.contactUsButton}>
                  {navBarData.navbar.btn?.label}
                </button>
              </Link>
            )}

            <div className={Styles.mobilesideBarSection}>
              <Image
                src={`/images/mobile_btn.png`}
                alt="mobilebtn"
                width={39}
                height={26}
                style={{ cursor: "pointer" }}
                onClick={toggleMobileNavigationPanel}
                priority={true}
              />
              <Drawer
                open={openMobileNavigationPanel}
                onClose={toggleMobileNavigationPanel}
                closeIcon={null}
                rootClassName={Styles.drawerRootClassName}
                destroyOnClose={true}
                width={"100%"}
                classNames={{
                  header: Styles.drawerHeader,
                  content: Styles.drawerContentSection,
                  body: Styles.drawerBodySection,
                  footer: Styles.drawerFooterSection,
                }}
                footer={
                  <Link href={"/contact-us"} onClick={()=>{toggleMobileNavigationPanel && typeof toggleMobileNavigationPanel==="function" && toggleMobileNavigationPanel()}}>
                    <div>
                      <span>Contact us</span>
                    </div>
                  </Link>
                }
              >
                <Flex vertical gap={48}>

                  <Flex align="center" justify="space-between">
                    <Image
                      src="/icons/lfi-mobile-icon.svg"
                      alt="image-tag"
                      width={23}
                      height={23}
                      priority={true}
                    />
                    <Image
                      src="/icons/navigation-close.svg"
                      style={{ cursor: "pointer" }}
                      onClick={toggleMobileNavigationPanel}
                      alt="image-tag"
                      width={18}
                      height={20}
                      priority={true}
                    />
                  </Flex>
                  <MobileNavigationModel
                    classNames={mobileNavigationClassNames}
                    level={0}
                    navigationList={navBarData.navbar.links}
                    toggleMobileNavigationPanel={toggleMobileNavigationPanel}
                  />
                </Flex>
              </Drawer>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default NavigationHeader;
