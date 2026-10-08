import React from "react";
import styles from "./index.module.scss";

interface IContentWithVideoProps {
  children: any;
  className?: any;
  imgSrc?: any;
  videoSrc?: any;
  fallbackSrc?: any;
}

const ContentWithVideo = ({
  children,
  className,
  imgSrc,
  videoSrc,
  fallbackSrc,
}: IContentWithVideoProps) => {
  return (
    <div
      className={`${styles.root_container} ${
        className ? className : "min-h-[100vh]"
      }`}
    >
      <div className={`${styles.video_container}`}>
        <video autoPlay loop muted playsInline>
          <source className="h-50" src={videoSrc} type="video/webm" />
          <source  className="h-50" src={fallbackSrc} type="video/mp4" />   
        </video>
      </div>
      <div className={styles.content_container}>{children}</div>
    </div>
  );
};

export default ContentWithVideo;
