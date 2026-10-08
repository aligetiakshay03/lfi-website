
import { SES, SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { NextRequest, NextResponse } from "next/server";
import { render } from '@react-email/render';
import MyEmail, { adminEmailContent } from '../../../components/emails';

const awsRegion = process.env.AWS_SES_REGION ?? "";
const accessKey = process.env.AWS_ACCESS_KEY_ID ?? "";
const secretKey = process.env.AWS_SECRET_ACCESS_KEY ?? "";

const createSES = () =>
  new SES({
    region: awsRegion,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });


const newEmailHtml = (data) => render(MyEmail(data))

const adminEmailHtml = (data) => render(adminEmailContent(data))

export async function POST(req: NextRequest) {
  const data = await req.json();

  const customParams: any = {
    Source: process.env.SOURCE_EMAIL,
    Destination: {
      ToAddresses: [data.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: newEmailHtml(data),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Confirmation: We've Received Your Details",
      },
    },
  };

  const adminParams: any = {
    Source: process.env.SOURCE_EMAIL,
    Destination: {
      ToAddresses: [process.env.ADMIN_EMAIL],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: adminEmailHtml(data),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "New Client Details Submission",
      },
    },
  };
  console.log("data", customParams, adminParams)
  try {
    let response;
    const ses = createSES();
    try{
      const command = new SendEmailCommand(customParams);
      response = await ses.send(command);
    }catch(e){
      console.log("error", e)
    }
    const adminCommand = new SendEmailCommand(adminParams);
    const emailOutcome = await ses.send(adminCommand);
    return NextResponse.json({ data, message: "data recieved successfully", messageId: response, emailOutcome });
  } catch (error: any) {
    console.log("error", error)
    return typeof error.stack !== 'undefined' ? error.stack : error;
  }
}
