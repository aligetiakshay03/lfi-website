import React from "react";
import Image from "next/image";
import styles from "./discoverblogs.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Discoverblogs = (props: { blogPosts: any }) => {
    const discoverblogPost = props.blogPosts;

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Discover more blogs</h3>
            <div className={styles.mainimage}>
                {discoverblogPost.map((blog: any, index: number) => {
                    const filename = blog.node._sys.filename; 
                    return (
                        <Link key={index} href={`/company/blog/${filename}`} passHref>
                            <div className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={blog.node.image}
                                        alt={blog.node.heading}
                                        layout="fill"
                                        className={styles.cardimage}
                                    />
                                </div>
                                <div className={styles.cardcontent}>
                                    <div className={styles.cardheading}>
                                        <h4>{blog.node.heading}</h4>
                                    </div>
                                    <div className={styles.carddescription}>
                                        <p>{blog.node.title}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Discoverblogs;
