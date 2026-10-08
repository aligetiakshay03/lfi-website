import React from 'react'
import styles from './index.module.scss'
import Image, { StaticImageData } from 'next/image'
import whitearrow from "../../public/images/arrow.png";
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';

interface IButtonProps {
    className?: string; //height, width and margins
    onClick?: () => void;
    btnType?: "button" | "submit" | "reset";
    text?: string;
    icon?: StaticImageData;
    bgColor?: string;
    hideIcon?: boolean;
    borderColor?: string;
    link?: string;
    textColor?: string;
    tinaProps?: any;
    labelClass?: string;
}

const Button = ({ className, bgColor, onClick, text, icon, hideIcon, borderColor, link, textColor, tinaProps, labelClass, btnType }: IButtonProps) => {
    if (link) {
        return (
            <Link href={link}>
                <button
                    type={btnType}
                    style={{
                        color: "#FFFFFF",
                        background: bgColor || "#FF7800",
                        border: borderColor ? `2px solid ${borderColor}` : "0px",
                    }}
                    onClick={onClick}
                    className={`rounded-[12px] flex items-center justify-center gap-5 ${className}`}
                >
                    <p data-tina-field={tinaField(tinaProps?.data, tinaProps?.labelText)} className={`${labelClass}`}>
                        {text}
                    </p>
                    {!hideIcon && (
                        <Image src={icon || whitearrow} priority={true} alt="white arrow" width={14} height={14} />
                    )}
                </button>
            </Link>
        );
    } else {
        return (
            <button
                type={btnType}
                style={{
                    color: "#FFFFFF",
                    background: bgColor || "#FF7800",
                    border: borderColor ? `3px solid ${borderColor}` : "0px",
                }}
                onClick={onClick}
                className={`rounded-[12px] flex items-center justify-center gap-5 ${className}`}
            >
                <p data-tina-field={tinaField(tinaProps?.data, tinaProps?.labelText)} className={`${labelClass}`}>
                    {text}
                </p>
                {!hideIcon && (
                    <Image src={icon || whitearrow} priority={true} alt="white arrow" width={14} height={14} />
                )}
            </button>
        );
    }
}

export default Button