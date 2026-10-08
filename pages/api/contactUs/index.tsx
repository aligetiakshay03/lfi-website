import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log("Inside contact us method");
  const { name, email, phoneNo, message, service } = req.body ?? {};

  const DB = process.env.DB ?? "";
  const Authorization = process.env.AUTHORISATION ?? "";
  const targetLink = process.env.CRM_URL ?? "";

  if (!targetLink) {
    console.error("[contact-us] CRM_URL is not configured");
    return res.status(500).json({
      error:
        "The CRM service is not configured. Please contact the site administrator.",
    });
  }

  try {
    const body = new URLSearchParams({
      name: name ?? "",
      email: email ?? "",
      phone: phoneNo ?? "",
      description: message ?? "",
      service: service ?? "",
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
      console.error(
        "[contact-us] Non-JSON response from Odoo",
        fetchResponse.status,
        rawBody.slice(0, 500)
      );
      return res.status(502).json({
        error:
          "The CRM service is unreachable right now. Please try again shortly.",
      });
    }

    console.log("Lead Response", data);

    return res.status(200).json(data);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Something went wrong" });
  }
};

export default handler;
