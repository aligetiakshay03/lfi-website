"use client"
import React from 'react'
import styles from "./contactusBanner.module.scss";
import Image from 'next/image';
import { ContactusbannerQuery } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { BRAND_ICONS, brandIconFor } from '../SocialBrandIcons';


const ContactusBanner = (props: ContactusbannerQuery) => {

    const handleIconClick = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div className={styles.banner}>
            <div className={styles.textContent}>
                <div className={styles.title}>
                    <h3 className={styles.heading}>{props?.contactusbanner?.heading || ""}</h3>
                </div>
                <div className={styles.icons}>
                    {props?.contactusbanner?.contactCards?.map((platform, index) => {
                        const brand = brandIconFor(platform?.title);
                        return (
                            <button
                                type="button"
                                className={styles.iconItem}
                                key={index}
                                aria-label={`Follow Linkfields on ${platform?.title} (opens in a new tab)`}
                                onClick={() => handleIconClick(platform?.link)}
                            >
                                {brand ? (
                                    <span
                                        className={styles.brandIcon}
                                        style={{ "--brand-glow": brand.glow, color: brand.color } as React.CSSProperties}
                                    >
                                        {brand.svg}
                                    </span>
                                ) : platform?.icon ? (
                                    <div className={styles.svgicon}>
                                        <Image src={platform.icon} alt={platform.title} className='absolute' fill />
                                    </div>
                                ) : null}
                                <div className={styles.iconText}>
                                    <p className={styles.iconmaintext} data-tina-field={platform && tinaField(platform, "title")}>
                                        {platform?.title}
                                    </p>

                                    <p data-tina-field={platform && tinaField(platform, "emailId")} className={styles.iconsubtext}>{platform?.emailId}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default ContactusBanner
