"use server";
import React from "react";
import databaseClient from "../../tina/__generated__/databaseClient";
import TermsOfUsePanel from "../../components/Policies/TermsOfUse";
import SEO from "../../common/seo";

async function TermsOfUse() {
  const termsOfUse = await databaseClient.queries.termsOfUse({
    relativePath: "terms-of-use.md",
  });

  return (
    <>
      <SEO
        title="Terms Of Use"
        description="Terms Of Use | Linkfields Innovations"
      />
      <TermsOfUsePanel data={JSON.parse(JSON.stringify(termsOfUse))} />
    </>
  );
}

export default TermsOfUse;
