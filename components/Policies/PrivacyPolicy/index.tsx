"use client";
import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { IPrivacyPolicy } from "../../../interfaces/privacyPolicy";

const PrivacyPolicyPanel = (props: { data: IPrivacyPolicy }) => {
  const { data: privacyPolicyData } = useTina(props.data);

  return (
    <div className="bg-black text-white mt-[45px] p-[100px]  max-[1560px]:mt-[40px] max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-[640px]:mt-[50px] max-sm:p-[20px]">
      <h2
        className="text-3xl md:text-[40px] mb-5"
        data-tina-fields={tinaField(privacyPolicyData.privacyPolicy, "heading")}
      >
        {privacyPolicyData.privacyPolicy.heading}
      </h2>
      <div
        data-tina-fields={tinaField(privacyPolicyData.privacyPolicy, "content")}
      >
        <TinaMarkdown
          content={privacyPolicyData.privacyPolicy.content}
          components={{
            p: (privacyPolicyData) => (
              <p className="mb-4 text-[#A2A5A6]" {...privacyPolicyData} />
            ),
            h1: (props) => (
              <h1 className="md:text-2xl my-4 text-[#E6ECED]" {...props} />
            ),
            h2: (props) => <h2 className="md:text-xl my-5" {...props} />,
            a: (props) => (
              <a
                href={`${props?.url}`}
                className="text-[#FF7800] hover:text-blue-500 hover:underline"
              >
                {props?.children}
              </a>
            ),
            li: (props) => (
              <li className="md:ml-4 py-3 md:py-0 flex items-start md:items-center gap-3 ">
                <span
                  className="text-[#FF7800] text-base md:text-4xl 2xl:text-[48px] text-center "
                  style={{ marginRight: "4px" }}
                >
                  •
                </span>
                <div className="md:pr-5">{props?.children}</div>
              </li>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default PrivacyPolicyPanel;
