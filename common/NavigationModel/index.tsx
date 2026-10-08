import React, { useEffect } from 'react'
import styles from "./navigationModel.module.scss"
import Link from 'next/link'
import { NavbarLinks, NavbarLinksChildren } from '../../tina/__generated__/types'
import { tinaField } from 'tinacms/dist/react'
import Image from 'next/image';
import Button from "../../common/Button";
import orangearrow from "../../public/images/arrow-orange.png";




export interface NavigationModelProps {
  title?: string,
  description?: string,

  navigationLinks?: Array<{
    label: string,
    url: string,
    subNavigationLinks?: Array<{
      label: string,
      url: string
    }>
  }>
}
interface INavList {
  list: NavbarLinks

}






const NavigationModel = ({ list }: INavList) => {
  useEffect(() => {



  }, [list]);
  return (
    <div className={styles.navigationModelContainer}>
      <div className={styles.contentSection}>
        {
          list.label && (
            list.href ? (
              <Link data-tina-field={tinaField(list, "href")}
                className={styles.titleSection} href={list.href}>{
                  <span className='cursor-pointer hover:text-[#ff7800]'> {list.label} </span>
                }</Link>
            ) : (
              <span
                data-tina-field={tinaField(list, "label")}
                className={styles.titleSection}>{list.label}</span>
            )
          )
        }
        {
          // list.description && (
          //   <span
          //     data-tina-field={tinaField(list, "description")}
          //     className={styles.descriptionSection}>{list.description}</span>
          // )
        }
        <div className={styles.imageWrapper}>

          {list.coverImage && (
            <Image
              src={list.coverImage}
              alt={list.label}
              width={1000}
              height={1000}
              data-tina-field={tinaField(list, "coverImage")}
              className={styles.imageSection}
            />
          )}
        </div>


      </div>

      <div className={styles.linkSection}>
        {
          list.children && (
            <>
              {
                list.children.map((link, index) => {
                  return (
                    link && (<div data-tina-field={tinaField(link, "label")}
                      key={`navigation-link-${index}`} className={styles.navigationsvg} >



                      <div className={styles.iconWrapper}>

                        {link.icon && (
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={32}
                            height={32}
                            data-tina-field={tinaField(list, "coverImage")}
                            className={styles.iconSection}
                          />
                        )}

                      </div>

                      <div className={styles.navigationLink}>
                        {
                          link.href ? (
                          <Link
                          className={styles.navigationLinkOuter}
                          href={link.href}
                          {...(link.openInNewTab == true
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                        >
                          {link.label}
                        </Link>
                          ) :
                            <span>{link.label}</span>
                        }
                        {
                          link.children && link.children.length > 0 && (
                            <div className={styles.subNavigationLinks}>
                              {
                                link.children.map((subLink, index) => {
                                  return (
                                    subLink && subLink.href ? (<Link data-tina-field={tinaField(subLink, "label")}
                                      key={`subLink-${index}`} href={subLink.href}>{subLink.label}</Link>) : null
                                  )
                                })
                              }
                            </div>
                          )
                        }

                        {/* <div className='flex flex-col justify-between h-full gap-[16px]'> */}
                        <div className={styles.navigationdesc}>


                          {link.description && link.description.trim().length > 0 && (
                            <p className={styles.linkDescription}>{link.description}</p>
                          )}
                          {
                            link && link.navbutton && link.navbutton.label && link.navbutton.href && (
                              <Link href={link.navbutton.href} {...(link.openInNewTab == true
                                ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                : {})}>
                                <Button
                                  text={link.navbutton.label}
                                  icon={orangearrow}
                                  className=""
                                  bgColor="transparent"
                                  labelClass="text-[16px] text-[#FF7800] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal max-[769px]:text-[12px] max-[769px]:leading-[15.81px]"


                                />
                              </Link>
                            )
                          }

                        </div>


                      </div>
                    </div>)
                  )
                })
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default NavigationModel