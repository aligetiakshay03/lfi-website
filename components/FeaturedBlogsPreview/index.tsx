import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./FeaturedBlogs.module.scss";
import orangearrow from "../../public/images/arrow-orange.png";
import Button from "../../common/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FeaturedBlogsPreview = (props: { blogPosts: any, blogsstyle?: React.CSSProperties, hideHeading?: boolean, newHeading?: string, className?: string }) => {

  const router = useRouter();
  const blogPosts = props?.blogPosts;
  const blogClassName = props.className || ''

  const blogsstyle = props.blogsstyle || {}
  const hideHeading = props.hideHeading || false
  const newHeading = props.newHeading || null

  const blogItems = blogPosts?.map((item) => {
    const list = item?.blogList

    if (list?.image && list.heading && list.title) {
      const { image, heading, title } = list;
      return { image, heading, title, filename: list?._sys?.filename, url: list?.url };
    } else {
      return { image: "", heading: "", title: "", filename: "", url: "" }
    }
  });

  useEffect(() => {
    props.blogPosts.forEach((item: any) => {
      const filename = item?.blogList?._sys?.filename
      console.log("router is--->", filename)
      router.prefetch(`/company/blog/${filename}`)
    })
  }, [props.blogPosts])


  return (
    <div className={styles.container + ` ${blogClassName}`} style={blogsstyle}>
      {!hideHeading && (<h2 className={styles.heading}>Insights & Updates</h2>)}
      {newHeading && (<h2 className={styles.heading}>{newHeading}</h2>)}
      <div className={styles.mainimage}>

        {blogItems?.map(({ image, heading, title, filename, url }, index) => (
          heading === "Blog" ? (
            <Link key={index} href={`/company/blog/${filename}`} passHref prefetch={true} >
              <div key={index} className={styles.slider} >
                <div key={index} className={styles.card}>
                  <Image
                    src={image}
                    alt={heading}

                    fill
                    className={styles.cardimage}

                  />

                  <div className={styles.cardContent}>
                    <div className={styles.cardheading}> <h4 >{heading}</h4>
                    </div>


                    <div className={styles.carddescription}>  <p>{title}

                      <Button
                        text="Read more"
                        icon={orangearrow}
                        className="mt-5"
                        bgColor="transparent"
                        labelClass="2xl:text-[20px] text-[#FF7800] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal md:text-[14px] md:leading-[15.81px]"
                      />
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>) : (
            <Link key={index} href={url} target="_blank" >
              <div key={index} className={styles.slider} >
                <div key={index} className={styles.card}>
                  <Image
                    src={image}
                    alt={heading}

                    fill
                    className={styles.cardimage}

                  />


                  <div className={styles.cardContent}>
                    <div className={styles.cardheading}> <h4 >{heading}</h4>
                    </div>


                    <div className={styles.carddescription}>  <p>{title}
                      <Button
                        text="Read more"
                        icon={orangearrow}
                        className="mt-5"
                        bgColor="transparent"
                        labelClass="2xl:text-[20px] text-[#FF7800] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal md:text-[14px] md:leading-[15.81px]"
                      />
                    </p>

                    </div>
                  </div>
                </div>
              </div>
            </Link>)
        ))}
      </div>
    </div>

  );
};

export default FeaturedBlogsPreview;






