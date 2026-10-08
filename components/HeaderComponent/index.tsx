import React from "react";

interface IHeaderProps {
  title: string | any;
  font?: string;
  className?: string;
}

const HeaderComponent = ({ title, font, className }: IHeaderProps) => {
  return (
    <div className={`${className} flex gap-3 min-[1561px]:gap-[15px] items-center py-[12px] xl:pt-[15px] xl:pb-[15px] rounded-[10px]`}>
      <div className="h-2 w-2 min-[1561px]:-mt-0.5 xl:h-2.5 xl:w-2.5 min-[1561px]:h-3 min-[1561px]:w-3 bg-[#ff7800] rounded-full" />
      <div
        className={`text-[#FF7800] text-[14px] lg:text-[12px] xl:text-base min-[1561px]:text-xl ${
          font ? `${font}` : "font-[HelveticaNeueSmall]"
        } leading-normal capitalize`}
      >
        {title?.toUpperCase()}
      </div>
    </div>
  );
};

export default HeaderComponent;
