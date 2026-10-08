"use client";
import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ITermsOfUse } from "../../../interfaces/termsOfUse";

const TermsOfUsePanel = (props: { data: ITermsOfUse }) => {
  const { data: termsOfUseData } = useTina(props.data);

  return (
    <div className="bg-black text-white mt-[45px] p-[100px]  max-[1560px]:mt-[40px] max-[1560px]:p-[80px] max-[1025px]:p-[40px] max-[640px]:mt-[50px] max-sm:p-[20px]">
      <h2
        className="text-3xl md:text-[40px] mb-5"
        data-tina-fields={tinaField(termsOfUseData.termsOfUse, "heading")}
      >
        {termsOfUseData.termsOfUse.heading}
      </h2>
      <div data-tina-fields={tinaField(termsOfUseData.termsOfUse, "content")}>
        <TinaMarkdown
          content={termsOfUseData.termsOfUse.content}
          components={{
            p: (termsOfUseData) => (
              <p className="mb-4 text-[#A2A5A6]" {...termsOfUseData} />
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
                  className="text-[#FF7800] text-base md:text-4xl 2xl:text-[48px] text-center"
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

export default TermsOfUsePanel;
