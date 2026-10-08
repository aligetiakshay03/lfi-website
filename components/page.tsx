"use client";
import { useTina } from "tinacms/dist/react";
import { IHomePage } from "../interfaces/heroSection";
import { IBlogCollection } from "../interfaces/blogs";
import { IFeaturedBlogs } from "../interfaces/IFeaturedBlogs";
import { IContactUsBanner } from "../interfaces/contactUs";
import Hero from "./modern/Hero";
import Partners from "./modern/Partners";
import SolutionSelector from "./modern/SolutionSelector";
import ServiceStory from "./modern/ServiceStory";
import IndustryGallery from "./modern/IndustryGallery";
import AIProductShowcase from "./modern/AIProductShowcase";
import CompanyStory from "./modern/CompanyStory";
import Approach from "./modern/Approach";
import Values from "./modern/Values";
import Experience from "./modern/Experience";
import Recognition from "./modern/Recognition";
import Insights from "./modern/Insights";
import Careers from "./modern/Careers";
import ContactSection from "./modern/ContactSection";
import GlobalPresence from "./modern/GlobalPresence";
import { useScrollTriggerRefresh } from "./modern/lib/motion";
import ChipMarquee from "./modern/ChipMarquee";
import SectionRail from "./modern/SectionRail";

// Tina query results passed through from app/page.tsx; typed loosely at this boundary.
type TinaResult = { query: string; variables: Record<string, unknown>; data: any };

/**
 * Modern Linkfields homepage. All copy and imagery come from the official Tina content
 * (home, navbar, aboutUs, ourApproach, careersPage, featuredBlogs); AI & Analytics comes
 * from the audited lfiai.com catalogue (utils/data/lfiAi.ts).
 */
export function Page(props: {
  homePage: IHomePage;
  blogPosts: IBlogCollection;
  featuredBlogs: IFeaturedBlogs;
  contactUsBanner: IContactUsBanner;
  navbar: TinaResult;
  aboutUs: TinaResult;
  ourApproach: TinaResult;
  careersPage: TinaResult;
}) {
  useScrollTriggerRefresh();
  const { data: homeData } = useTina(props.homePage);
  const { data: featured } = useTina(props.featuredBlogs);
  const { data: navData } = useTina(props.navbar);
  const { data: aboutData } = useTina(props.aboutUs);
  const { data: approachData } = useTina(props.ourApproach);
  const { data: careersData } = useTina(props.careersPage);

  const home = homeData.home;
  const about = aboutData.aboutUs;
  const approach = approachData.ourApproach;
  const careers = careersData.careersPage;
  const navServices = navData.navbar.links?.find((l: any) => l?.label === "Services")?.children;
  const navSolutions = navData.navbar.links?.find((l: any) => l?.label === "Solutions")?.children;
  // Official solutions + services line-up (navigation), shown as the chained chip strip.
  const chips = [...(navSolutions || []), ...(navServices || [])]
    .filter((c: any) => c?.label && c?.href && c.href.startsWith("/"))
    .map((c: any) => ({ label: c.label.replace(/\s+/g, " ").trim(), href: c.href }));

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--lf-base)" }}>
      <Hero messages={home.HeroSection?.services} />
      <Partners />
      <ChipMarquee start="LFI" chips={chips} badge="AI & Analytics" ariaLabel="Linkfields solutions and services" />
      <div className="lf-rail-band">
        <SectionRail labels={["Our Partners", "Our Solutions", "Our Services"]} />
      </div>
      <SolutionSelector data={home.ourSolutions} />
      <ServiceStory data={home.ourServices} navServices={navServices} />
      <IndustryGallery
        industries={home.industry}
        intro="We have rich experience in your industry. We also share insights across industries to help you uncover new opportunities to adapt and disrupt."
      />
      <AIProductShowcase index="06" />
      <CompanyStory
        story={about?.transformingFuture}
        csr={about?.betterFuture}
        visionCards={about?.visionCards}
        subheading={about?.heroSectionData?.subheading1}
      />
      <Approach howWeWork={approach?.whatweoffer} exploration={approach?.exploration} />
      <Values eyebrow={about?.transformationFlow?.status1} title={about?.transformationFlow?.heading1} values={about?.transformationCards} />
      <Experience data={home.ourJourney} />
      <Recognition awards={home.awardsAndRecognition} />
      <Insights posts={featured.featuredBlogs.blogListArray?.slice(0, 3)} />
      <Careers home={home.carrers} media={careers?.careersMedia} images={careers?.slider?.images} />
      <ContactSection index="12" />
      <GlobalPresence data={careers?.ourPresence} />
    </div>
  );
}
