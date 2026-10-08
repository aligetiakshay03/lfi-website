import React from "react";
import ContactUsPanel from "../../components/ContactUsPanel";
import databaseClient from "../../tina/__generated__/databaseClient";
import SEO from "../../common/seo";

const ContactUs = async () => {
  const contactUs = await databaseClient.queries.contactUsPage({
    relativePath: "contact-us.json",
  });
  return (
    <>
      <SEO
        title="Contact Us | Linkfields Innovations"
        description="Contact Us | Linkfields Innovations"
      />
      <ContactUsPanel
        className="!mt-[45px] max-[850px]:!mt-[65px]"
        data={JSON.parse(JSON.stringify(contactUs))}
      />
    </>
  );
};

export default ContactUs;
