import Link from "next/link";
import React from "react";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import orangearrow from "../../public/images/arrow-orange.png";
import { BuildingsToolsQuery } from "../../tina/__generated__/types";

const BuildingsToolsCard = (buildingsTools: BuildingsToolsQuery) => {
  return (
    <div className="flex flex-row w-full">
      <div className="basis-[5%] lg:mt-9 pt-10 pb-14 hidden md:block">
        <h2 className="border-b-[#a4a8a9] py-[18px] text-[#0A0A0A99] text-2xl lg:text-4xl border-b-4 border-dashed">
          .
        </h2>
      </div>
      <div className="basis-[95%] flex flex-col md:flex-row">
        {buildingsTools.buildingsTools?.detailSection?.map((item, idx) => {
          if (!item) {
            return null;
          }
          return (
            <div
              key={idx}
              className={`w-full lg:mt-9 pt-4 pb-4 md:pt-10 md:pb-14 bg-[#0A0A0A99]`}
            >
              <h2
                data-tina-field={tinaField(item, "title")}
                className="border-b-[#FF7800] border-b-2 md:border-b-4 text-white  text-2xl lg:text-4xl py-3 "
              >
                {idx + 1}. {item?.title}
                <div className="h-3 w-3 bg-[#ff7800] rounded-full hidden md:block md:translate-y-[160%] xl:translate-y-[160%] 2xl:translate-y-5" />
              </h2>

              <div
                className={`flex flex-col gap-7 max-w-[222px] lg:max-w-[422px] pt-10 max-[1144px]: justify-between min-h-[220px] `}
              >
                <p
                  data-tina-field={tinaField(item, "description")}
                  className={`text-[16px] 2xl:text-[20px] leading-[140%] text-[#A2A5A6] font-['libre-franklin'] font-normal`}
                >
                  {item?.description}
                </p>

                <Link
                  href={item?.url ?? ""}
                  className={`flex gap-4 leading-normal h-[1rem] items-center 2xl:text-[20px]`}
                >
                  <div
                    data-tina-field={tinaField(item, "actionButton")}
                    className={`text-[#FF7800]`}
                  >
                    {item?.actionButton}
                  </div>
                  <Image
                    src={orangearrow}
                    priority={true}
                    alt="white arrow"
                    width={14}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuildingsToolsCard;
