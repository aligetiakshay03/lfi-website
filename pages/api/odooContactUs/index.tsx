import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phoneNo, message, industry, companySize, timeline } =
    req.body ?? {};

  const submission = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    phoneNo,
    industry,
    companySize,
    timeline,
    message,
  };

  const DB = process.env.DB ?? "";
  const Authorization = process.env.AUTHORISATION ?? "";
  const targetLink = process.env.CRM_URL ?? "";

  if (!targetLink) {
    console.log(
      "[odoo-contact] CRM_URL not configured yet, mocking response. Submission:",
      JSON.stringify(submission, null, 2)
    );
    return res.status(200).json({
      status: "Success",
      messages:
        "Lead Created Successfully. (mocked - Odoo CRM not connected yet)",
    });
  }

  try {
    // URLSearchParams (not string concatenation) because industry/message are
    // free text and could otherwise contain "&" and corrupt the request.
    const body = new URLSearchParams({
      name: name ?? "",
      email: email ?? "",
      phone: phoneNo ?? "",
      industry: industry ?? "",
      company_size: companySize ?? "",
      erp_timeline: timeline ?? "",
      description: message ?? "",
      utm_source: "OdooConference",
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", Authorization);
    myHeaders.append("Db", DB);

    const fetchResponse = await fetch(targetLink, {
      method: "POST",
      headers: myHeaders,
      body: body.toString(),
      redirect: "follow",
    });

    const rawBody = await fetchResponse.text();
    let data: any;
    try {
      data = JSON.parse(rawBody);
    } catch {
      // The tunnel/upstream (e.g. ngrok, or Odoo itself) can answer with an
      // HTML error page instead of JSON when it can't reach the test instance.
      console.error(
        "[odoo-contact] Non-JSON response from Odoo",
        fetchResponse.status,
        rawBody.slice(0, 500)
      );
      return res.status(502).json({
        error:
          "The Odoo CRM service is unreachable right now. Please try again shortly.",
      });
    }

    console.log("[odoo-contact] Lead Response", data);

    return res.status(200).json(data);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Something went wrong" });
  }
};

export default handler;
