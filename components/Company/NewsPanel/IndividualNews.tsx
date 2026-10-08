"use client";
import React, { createRef, useEffect, useRef, useState } from 'react'
import { tinaField, useTina } from 'tinacms/dist/react';
import { IBlogCollection } from '../../../interfaces/blogs';
import Image from 'next/image';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { BlogsSection } from '../../../tina/__generated__/types';
// import whitearrow from "../../public/images/arrow.png";
import whitearrow from '../../../public/images/arrow.png'
import { IBlogsSectionQuery } from '../../../interfaces/IBlogsSection';
import styles from '../BlogsPanel/individualBlog.module.scss'
import { Alert, Button, Input, Tooltip } from 'antd';
import { IBlogsSectionConnection } from '../../../interfaces/IBlogsConnection';
import { renderImageAboveContent, renderSingleContent } from '../../BlogsList';
import HeaderComponent from '../../HeaderComponent';
import { INewsSectionQuery } from '../../../interfaces/INewsSectionQuery';
import { INewsConnection } from '../../../interfaces/INewsConnection';


const IndividualNewsPanel = (props: { blogPosts: INewsSectionQuery, urlData, result: INewsConnection }) => {
    const allBlogs = props.result.data.newsSectionConnection.edges
    const [input, setInput] = useState("")
    const [error, setError] = useState({ status: false, message: "" })
    const firstDivRef = useRef<HTMLDivElement>(null);
    const [showSecondDiv, setShowSecondDiv] = useState(true);
    const [indexScrollPos, setIndexScrollPos] = useState(0)
    useEffect(() => {
        const rect = firstDivRef?.current?.getBoundingClientRect();
        if (rect) {
            setIndexScrollPos(prev => prev = rect.top)
        }
    }, [firstDivRef, indexScrollPos])

    useEffect(() => {
        const onScroll = () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos > indexScrollPos) {
                setShowSecondDiv(false)
            } else {
                setShowSecondDiv(true)
            }
        };
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [showSecondDiv, indexScrollPos]);

    const { data: blogPosts } = useTina(props.blogPosts);
    const { title, heading, author, content, createdAt, description, image, keyWord } = blogPosts?.newsSection;
    let innerIndex = 0;
    let alignment = 0;
    const renderedItems: JSX.Element[] = [];

    const relatedBlogs = allBlogs?.filter((item) => {
        if (item?.node?.keyWord?.name?.includes(keyWord?.name!) && item.node?.title !== title && innerIndex < 3) {
            innerIndex++
            return item
        }
    })
    const createdDate = new Date(`${createdAt}`)
    const formattedDate = createdDate?.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    const listRef = useRef<HTMLHeadingElement>(null);
    const elementsRef = useRef(
        content.children
            .filter(item => item.type === 'h1')
            .map(item => ({
                text: item.children,
                itemRef: createRef()
            }))
    );

    const scrollToRef = (ref) => {
        ref.scrollIntoView({ behavior: 'smooth' });
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = () => {
        if (error.message) {
            setError({ message: "Please enter a valid email id", status: true })
        } else {
            if (!error.status) {
                
            }
        }
    }

    if (relatedBlogs?.length === 1) {
        alignment++;
        const singleItem = renderSingleContent(relatedBlogs[0], alignment);
        renderedItems.push(singleItem);
    } else {
        if (relatedBlogs?.length === 2) {
            relatedBlogs.map((innerItem) => {
                alignment++;
                return renderedItems.push(renderSingleContent(innerItem, alignment));
            });
        } else {
            const chunkElements = relatedBlogs?.slice(0, relatedBlogs.length).map((item, index) => (
                <React.Fragment key={index}>
                    {renderImageAboveContent(item, index)}
                </React.Fragment>
            ));
            renderedItems.push(
                <div className="flex max-md:flex-col" key="chunkElements">
                    {chunkElements}
                </div>
            );
        }
    }


    return (
        <div>
            <div className='xl:max-w-[800px] max-w-[600px] xl:mx-auto relative max-md:mx-auto'>
                <button className='bg-[#FF7800] px-3 py-[6px] leading-[20px] text-[14px] rounded-md text-[#FFFFFF] font-["libre-franklin"] font-normal' onClick={() => { }}>{keyWord?.name}</button>
                <h1 ref={listRef} data-tina-field={tinaField(blogPosts.newsSection, "title")} className='text-[#FFFFFF] leading-10 text-[36px] mt-4'>{title}</h1>

                <div className='mt-5 flex items-center'>
                    <div className='bg-purple-400 w-7 l-7 rounded-full'>
                        {author?.avatar && <Image className='w-7 l-7 rounded-full' src={author.avatar} height={1000} width={1000} alt='avatar' />}
                    </div>
                    <p data-tina-field={blogPosts.newsSection.author && tinaField(blogPosts.newsSection.author, "name")} className='ml-2 text-[14px] leading-5 text-[#696A75]'>{author?.name}</p>
                    <p className='ml-6 text-[14px] leading-5 text-[#696A75]'>{formattedDate}</p>
                </div>
                <div data-tina-field={tinaField(blogPosts.newsSection, "image")} className='w-full mt-8'>
                    {image && <Image className='md:h-[462px] w-full rounded-xl' src={image} height={1000} width={1000} alt='blogimage' />}
                </div>
                <div className='mt-8'>
                    <p data-tina-field={tinaField(blogPosts.newsSection, "description")} className='text-[20px] leading-8 font-["HelveticaNeueSmall"] text-[#BABABF]'>{description}</p>
                </div>
                <div data-tina-field={tinaField(blogPosts.newsSection, "content")} className='text-white'>
                    <TinaMarkdown content={content} components={{
                        p: (props) => {
                            if (props?.children?.props.content[0]?.text?.includes("“") || props?.children?.props.content[0]?.text?.includes('"')) {
                                return <p className='bg-[#242535] p-8 text-[#FFFFFF] leading-8 text-[20px] lg:text-[24px] rounded-[12px] border-l-4 border-[#FFFFFF] my-8 font-["HelveticaNeueSmall"]' {...props} />
                            }
                            return (
                                <p className="mb-4 text-[#A2A5A6] font-['libre-franklin'] font-normal" {...props} />
                            )
                        },
                        h1: props => {
                            const val = elementsRef.current.find((item) => item.text[0].text === props?.children.props.content[0].text)
                            return <h1 ref={val?.itemRef} className="md:text-[36px] my-4 text-[#E6ECED]" {...props} />
                        },
                        h2: props => <h2 className="md:text-[24px] my-5" {...props} />,
                        a: (props) => (
                            <a
                                href={`${props?.url}`}
                                className="text-[#FF7800] hover:text-blue-500 hover:underline"
                            >
                                {props?.children}
                            </a>
                        ),
                        img: (props) => <Image className='md:h-[462px] w-full rounded-xl' src={props?.url || ""} height={1000} width={1000} alt='blogimage' />,
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
                    }} />
                    <div ref={firstDivRef} className='flex justify-between py-[48px] border-t-2 mt-[64px] max-lg:flex-col max-lg:gap-12'>
                        <h1 className='text-[#FFFFFF] text-[22px] leading-[26px] md:text-[28px] md:leading-[30px] lg:w-[80%] xl:w-full text-center md:text-left'>Like what you read? Share with a friend!</h1>
                        <div className='flex gap-8 justify-center'>
                            <Image
                                src="/images/link-45deg.png"
                                alt="linfields-logo"
                                width={32}
                                height={32}
                            />
                            <Image
                                src="/images/linkedin.svg"
                                alt="linfields-logo"
                                width={32}
                                height={32}
                            />
                            <Image
                                src="/images/twitter.svg"
                                alt="linfields-logo"
                                width={32}
                                height={32}
                            />
                        </div>
                    </div>
                </div>
                <div className={showSecondDiv ? styles.indexContainer : styles.fixedIndexContainer}>
                    <h3 className='text-[16px] leading-6 tracking-[-1.1px] font-["libre-franklin"] font-normal text-[#98989A]'>Table of contents</h3>
                    <div className='px-8 py-[18px]  bg-[#1A1A1A] rounded-lg'>
                        <ul className='flex flex-col gap-4 text-[#FFFFFF] list-disc font-["libre-franklin"] font-normal !tracking-[1px]'>
                            <li className='cursor-pointer' onClick={() => scrollToRef(listRef.current)}>Introduction</li>
                            {content.children
                                .filter(item => item?.type === 'h1') // Filter out undefined items
                                .map((item, index) => {
                                    return (
                                        <li className='cursor-pointer' onClick={() => {
                                            if (elementsRef?.current[index]) {
                                                scrollToRef(elementsRef?.current[index]?.itemRef.current);
                                            }
                                        }} key={index}>{item.children[0].text}</li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.circle}></div>
                    <h1>
                        SUBSCRIPTION
                    </h1>
                </div>
                <h4
                    className={styles.desc}
                >
                    Subscribe to our Newsletter
                </h4>
                <div className='md:w-[500px]'>
                    {error.status && <span className='text-red-500'>{error.message}</span>}
                    <Input
                        placeholder="Email address"
                        variant='outlined'
                        style={{ background: 'transparent' }}
                        status={error.status ? 'error' : ''}
                        count={{
                            show: true,
                            max: 20,
                        }}
                        className={styles.input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            if (!emailRegex.test(input) && error.status) {
                                setError({ status: true, message: "Please enter a valid email address" });
                            } else if (!emailRegex.test(input)) {
                                setError({ ...error, message: "Please enter a valid email address" });
                            } else {
                                setError({ status: false, message: "" });
                            }
                        }}
                        suffix={
                            <Tooltip title="Extra information">
                                <Image
                                    onClick={handleSubmit}
                                    src={whitearrow}
                                    priority={true}
                                    alt="white arrow"
                                    width={14}
                                    height={14}
                                />
                            </Tooltip>
                        }
                    />

                </div>
            </div>

            <div>
                <HeaderComponent title={"Related Blog Posts"} className='justify-center mt-[90px] mb-8' font={"font-['libre-franklin']"} />
                {renderedItems}
            </div>
        </div>
    )
}

export default IndividualNewsPanel