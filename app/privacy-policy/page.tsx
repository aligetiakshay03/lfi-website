"use server";
import React from "react";
import databaseClient from "../../tina/__generated__/databaseClient";
import PrivacyPolicyPanel from "../../components/Policies/PrivacyPolicy";
import SEO from "../../common/seo";

async function PrivacyPolicy() {
  const privacyPolicy = await databaseClient.queries.privacyPolicy({
    relativePath: "privacy-policy.md",
  });

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy | Linkfields Innovations"
      />
      <PrivacyPolicyPanel data={JSON.parse(JSON.stringify(privacyPolicy))} />
    </>
  );
}

export default PrivacyPolicy;
