"use server";
import React from "react";
import databaseClient from "../../tina/__generated__/databaseClient";
import CookiesPolicyPanel from "../../components/Policies/CookiesPolicy";
import SEO from "../../common/seo";

async function CookiesPolicy() {
  const cookiesPolicy = await databaseClient.queries.cookiesPolicy({
    relativePath: "cookies-policy.md",
  });

  return (
    <>
      <SEO
        title="Cookies Policy"
        description="Cookies Policy | Linkfields Innovations"
      />
      <CookiesPolicyPanel data={JSON.parse(JSON.stringify(cookiesPolicy))} />
    </>
  );
}

export default CookiesPolicy;
