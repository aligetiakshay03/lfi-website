import React from "react";
import ContactUsPanel from "../../../components/ContactUsPanel";
import databaseClient from "../../../tina/__generated__/databaseClient";
import SEO from "../../../common/seo";

const OdooContactUs = async () => {
  const contactUs = await databaseClient.queries.contactUsPage({
    relativePath: "contact-us.json",
  });
  return (
    <>
      <SEO
        title="Contact Us | Odoo ERP | Linkfields Innovations"
        description="Talk to Linkfields Innovations about your Odoo ERP implementation. Share your industry, company size and expected timeline and our team will get in touch within 24 hours."
      />
      <ContactUsPanel
        variant="odoo"
        className="!mt-[45px] max-[850px]:!mt-[65px]"
        data={JSON.parse(JSON.stringify(contactUs))}
      />
    </>
  );
};

export default OdooContactUs;
