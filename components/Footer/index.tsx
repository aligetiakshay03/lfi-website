"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./footer.module.scss";
import { tinaField, useTina } from "tinacms/dist/react";
import { IFooter } from "../../interfaces/footer";
// import router from "next/router";
import { useRouter } from 'next/navigation';
import styles from "./footer.module.scss";

const Footer = (props: { footerData: IFooter }) => {
  const { data: footerLink } = useTina(props.footerData);
  const footerLinks = footerLink.footer;

  const handleIconClick = (link) => {
    window.open(link, "_blank");
  };


  return (
    <>
      <div className="flex flex-col !font-['HelveticaNeueExtraSmall']">
        <div className=" bg-[#111]  px-[100px] py-[84px]  max-[1560px]:p-[80px]  max-[1025px]:px-[40px] max-[1025px]:py-[35px] max-sm:px-[20px]  divide-x-red-400 grid xl:grid-cols-[repeat(6,minmax(max-content,auto))] md:grid-cols-[repeat(3,minmax(max-content,auto))]  sm:grid-cols-[repeat(2,minmax(min-content,auto))] grid-cols-1 gap-y-10 md:gap-y-20 place-content-between md:place-content-between w-full">
          {/* <div className="flex flex-col gap-[20px] md:gap-[35px] xl:gap-[48px]">
            <div className="relative w-[181px] h-[46px] md:hidden">
              <Image
                src="/images/linkfields_logo_1.png"
                alt="linfields-logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="relative min-[1561px]:w-[181px] min-[1561px]:h-[46px] md:w-[128px] md:h-[33px]">
              <Image
                src="/images/linkfields_logo_1.png"
                alt="linfields-logo"
                layout="fill"
                objectFit="contain"
              />
            </div>

            <div className="flex flex-col gap-[24px] md:gap-[35px] xl:gap-[48px]">
              <span
                data-tina-field={
                  footerLinks?.sections?.[0]?.title
                    ? tinaField(footerLinks?.sections?.[0], "title")
                    : undefined
                }
                className="min-[1561px]:text-xl text-base leading-[15px] text-[#ffffff] opacity-50 !font-['libre-franklin'] font-normal"
              >
                {footerLinks?.sections?.[0]?.title}
              </span>
              <div className="w-178 relative flex flex-col gap-[24px] sm:items-center">
                {footerLinks?.sections?.[0]?.logos?.map((logo, index) => {
                  return (
                    logo?.image && (
                      <div
                        style={{
                          objectFit: "contain",
                          height: logo?.height ? logo?.height : 120,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={`section-image-${index}`}
                      >
                        <Image
                          src={logo?.image}
                          alt="section Image"
                          width={logo?.width ? logo?.width : 120}
                          height={logo?.height ? logo?.height : 120}
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div> */}

          {footerLinks?.sections?.map((section, index) => {
            return (
              <div
                className={`flex flex-col gap-[24px] md:gap-[25px] xl:gap-[25px] ${
                  section?.mobileVisible == true ? "flex" : "hidden md:flex"}`}
                key={`sections-${index}`}
              >
                <span
                  data-tina-field={
                    section ? tinaField(section, "title") : undefined
                  }
                  className="min-[1561px]:text-xl text-base leading-[15px] text-[#ffffff] opacity-50 !font-['libre-franklin'] font-normal"
                >
                  {section?.title}
                </span>
                {section?.logos && section?.logos?.length > 0 && (
                  <div className="w-178 relative flex flex-col gap-[24px] sm:items-center">
                    {section?.logos?.map((logo, index) => {
                      return (
                        logo?.image && (
                          <div
                          style={{ height: logo?.height ? logo?.height : 120 }}
                          className={`flex sm:justify-center justify-start items-center ${styles.imageContainer}`}
                            key={`section-image-${index}`}
                          >
                            <Image
                              src={logo?.image}
                              alt="section Image"
                              width={logo?.width ? logo?.width : 120}
                              height={logo?.height ? logo?.height : 120}
                              key={`section-image-${index}`}
                            />
                          </div>
                        )
                      );
                    })}
                  </div>
                )}
                {section?.links && section?.links?.length > 0 && (
                  <div className="grid grid-cols-1 gap-3">
                    {section?.links?.map((link, index) => {
                      return (
                        <Link
                          data-tina-field={
                            link ? tinaField(link, "label") : undefined
                          }
                          key={`quick-links-${index}`}
                          href={link?.link || ""}
                        >
                          <span className="min-[1561px]:text-lg xl:text-sm xl:leading-[13px] md:text-base text-sm text-[#E6ECED] min-[1561px]:whitespace-nowrap !font-['libre-franklin'] font-normal">
                            {link?.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* <div className="hidden md:flex flex-col gap-[20px] md:gap-[35px] xl:gap-[48px]">
            <span
              data-tina-field={
                footerLinks?.services
                  ? tinaField(footerLinks.services, "title")
                  : undefined
              }
              className="min-[1561px]:text-xl text-base  leading-[15px] text-[#ffffff] opacity-50 !font-['libre-franklin'] font-normal"
            >
              {footerLinks.services?.title}
            </span>
            <div className="grid grid-cols-1 gap-3 xl:gap-4 min-[1561px]:gap-5">
              {footerLinks.services?.services?.map((service, index) => {
                return (
                  service &&
                  service.url &&
                  service.serviceName && (
                    <Link
                      data-tina-field={
                        service?.url ? tinaField(service, "url") : undefined
                      }
                      key={`quick-links-${index}`}
                      href={service?.url}
                    >
                      <span className="min-[1561px]:text-lg xl:leading-[13px] text-sm text-[#E6ECED] xl:whitespace-nowrap !font-['libre-franklin'] font-normal">
                        {service?.serviceName}
                      </span>
                    </Link>
                  )
                );
              })}
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-[25px] md:gap-[35px] xl:gap-[48px] col-span-full md:col-span-1">
            <span
              data-tina-field={
                footerLinks?.industries
                  ? tinaField(footerLinks.industries, "title")
                  : undefined
              }
              className="min-[1561px]:text-xl text-base  leading-[15px] text-[#ffffff] opacity-50 !font-['libre-franklin'] font-normal"
            >
              {footerLinks.industries?.title}
            </span>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 xl:gap-4 min-[1561px]:gap-5">
              {footerLinks.industries?.links?.map((industriesLink, index) => {
                return (
                  <Link
                    data-tina-field={
                      industriesLink
                        ? tinaField(industriesLink, "link")
                        : undefined
                    }
                    key={`quick-links-${index}`}
                    href={industriesLink?.link || ""}
                  >
                    <span className="min-[1561px]:text-lg xl:leading-[13px] text-sm text-[#E6ECED] !font-['libre-franklin'] font-normal">
                      {industriesLink?.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-[20px] md:gap-[35px] xl:gap-[48px]">
            <span
              data-tina-field={
                footerLinks?.solutions
                  ? tinaField(footerLinks.solutions, "title")
                  : undefined
              }
              className="min-[1561px]:text-xl text-base  leading-[15px] text-[#ffffff] opacity-50 !font-['libre-franklin'] font-normal"
            >
              {footerLinks.solutions?.title}
            </span>
            <div className="grid grid-cols-1 gap-3 xl:gap-4 min-[1561px]:gap-5">
              {footerLinks.solutions?.links?.map((solutionLink, index) => {
                return (
                  <Link
                    data-tina-field={
                      solutionLink ? tinaField(solutionLink, "link") : undefined
                    }
                    key={`quick-links-${index}`}
                    href={solutionLink?.link || ""}
                  >
                    <span className="min-[1561px]:text-lg xl:leading-[13px] text-sm text-[#E6ECED] xl:whitespace-nowrap !font-['libre-franklin'] font-normal">
                      {solutionLink?.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-[25px] md:gap-[35px] xl:gap-[48px] col-span-full md:col-span-1">
            <span
              data-tina-field={
                footerLinks?.quickLinks
                  ? tinaField(footerLinks.quickLinks, "title")
                  : undefined
              }
              className="min-[1561px]:text-xl text-base  leading-[15px] text-[#ffffff] opacity-50 !font-['libre-franklin'] font-normal"
            >
              {footerLinks.quickLinks?.title}
            </span>
            <div className="grid grid-cols-1 gap-3">
              {footerLinks.quickLinks?.links?.map((quickLink, index) => {
                return (
                  <Link
                    data-tina-field={
                      quickLink ? tinaField(quickLink, "label") : undefined
                    }
                    key={`quick-links-${index}`}
                    href={quickLink?.link || ""}
                  >
                    <span className="min-[1561px]:text-lg xl:text-sm xl:leading-[13px] md:text-base text-sm text-[#E6ECED] min-[1561px]:whitespace-nowrap !font-['libre-franklin'] font-normal">
                      {quickLink?.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div> */}
        </div>
        <div className="bg-[#0B0B0B] px-[100px] py-[40px] max-[1560px]:px-[80px] max-[1560px]:py-[20px] max-[1025px]:px-[40px] max-sm:px-[20px]   grid xl:grid-cols-[repeat(4,minmax(max-content,auto))] md:grid-cols-[repeat(2,minmax(max-content,auto))] grid-cols-1 gap-3 w-full md:place-content-between place-content-start md: place-items-start">
          <div className="flex items-center w-full justify-between md:hidden">
            <Link
              data-tina-field={
                footerLinks.bottomFooterLinks
                  ? tinaField(footerLinks.bottomFooterLinks, "link")
                  : undefined
              }
              title="mail to"
              href="mailto:info@linkfields.com"
              className="text-[#E6ECED] xl:text-[15px] md:text-[13px] text-[12px] break-all xl:break-normal !font-['libre-franklin'] font-normal"
            >
              {footerLinks.bottomFooterLinks?.link}
            </Link>
            <div className="flex md:gap-5 gap-3">
              <Image
                src="/images/linkedin.svg"
                alt="linfields-logo"
                width={22}
                height={22}
                onClick={() => handleIconClick('https://www.linkedin.com/company/40661516/admin/feed/posts')}
                className="cursor-pointer"
              />
              <Image
                src="/images/twitter-new-X.png"
                alt="linfields-logo"
                width={22}
                height={22}
                onClick={() => handleIconClick('https://x.com/LinkfieldsI')}
                className="cursor-pointer"
              />

              <Image
                src="/images/youtube.svg"
                alt="linfields-logo"
                width={22}
                height={22}
                onClick={() => handleIconClick('https://www.youtube.com/channel/UCiSaCEnC7Gtu7YkanoA6mpg')}
                className="cursor-pointer"
              />

              <Image
                src="https://assets.goodfirms.co/badges/icon/white-goodfirms-icon.svg"
                alt="goodfirms-logo"
                width={22}
                height={22}
                onClick={() => handleIconClick('https://www.goodfirms.co/company/linkfields-innovations')}
                className="cursor-pointer"
              />

            </div>
          </div>
          <span className="text-[#ffffff] opacity-50 hidden md:block min-[1561px]:text-[15px] xl:text-[14px] md:text-[13px] text-[12px] break-all xl:break-normal !font-['libre-franklin'] font-normal">
            © Copyright {new Date().getFullYear()} Linkfields. All Rights
            Reserved
          </span>
          <div className="w-full flex justify-between md:justify-between sm:flex-row md:flex-row gap-2 sm:px-2">
            {footerLinks.bottomFooterLinks?.aboutCompanyLinks?.map(
              (footerLink, index) => {
                return (
                  <Link
                    data-tina-field={
                      footerLink ? tinaField(footerLink, "link") : undefined
                    }
                    key={`footer-links-${index}`}
                    href={footerLink?.link || ""}
                  >
                    <span
                      className={`text-[#ffffff] opacity-50 break-all xl:break-normal min-[1561px]:text-[15px] xl:text-[14px] md:text-[13px] text-[12px] !font-['libre-franklin'] font-normal ${footerLinks.bottomFooterLinks?.aboutCompanyLinks &&
                        index !==
                          footerLinks.bottomFooterLinks.aboutCompanyLinks
                            .length -
                            1
                          ? "xl:w-0 xl:border-[#ffffff] opacity-50 xl:border-r-[0.1px] xl:h-28 xl:px-3"
                          : null
                      }`}
                    >
                      {footerLink?.label}
                    </span>
                  </Link>
                );
              }
            )}
          </div>
          <div className="hidden md:flex items-center w-full">
            <Link
              data-tina-field={
                footerLinks.bottomFooterLinks
                  ? tinaField(footerLinks.bottomFooterLinks, "link")
                  : undefined
              }
              title="mail to"
              href="mailto:info@linkfields.com"
              // 3b3b3b
              className="text-[#ffffff] opacity-50 xl:text-[15px] md:text-[13px] text-[12px] break-all xl:break-normal !font-['libre-franklin'] font-normal"
            >
              {footerLinks.bottomFooterLinks?.link}
            </Link>
          </div>
          <div className="hidden md:flex gap-3">
            <Image
              src="/images/linkedin.svg"
              alt="linfields-logo"
              width={30}
              height={30}
              onClick={() => handleIconClick('https://www.linkedin.com/company/40661516/admin/feed/posts')}
              className="cursor-pointer"
            />
            <Image
              src="/images/twitter-new-X.png"
              alt="linfields-logo"
              width={30}
              height={30}
              onClick={() => handleIconClick('https://x.com/LinkfieldsI')}
              className="cursor-pointer"


            />
            <Image
              src="/images/youtube.svg"
              alt="linfields-logo"
              width={30}
              height={30}
              onClick={() => handleIconClick('https://www.youtube.com/channel/UCiSaCEnC7Gtu7YkanoA6mpg')}
              className="cursor-pointer"


            />

            <Image
              src="https://assets.goodfirms.co/badges/icon/white-goodfirms-icon.svg"
              alt="goodfirms-logo"
              width={30}
              height={30}
              onClick={() => handleIconClick('https://www.goodfirms.co/company/linkfields-innovations')}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
