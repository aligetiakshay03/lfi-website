import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
    Tailwind,
  } from "@react-email/components";
  import * as React from "react";
  
  
  export const Email = (data) => {
    const createdDate = new Date();
    const formattedDate = createdDate?.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });  
    return (
      <Html>
        <Head />
        <Tailwind>
        <Preview>Thank you for contacting us</Preview>
        <Body style={main}>
          <Container>
            <Section style={logo}>
                <Img src='https://linkfields.vercel.app/_next/image?url=%2Fimages%2Flinkfields_logo_1.png&w=3840&q=75' />
            </Section>
  
            <Section style={content}>
              <Row>
                <Img
                  style={image}
                  width={620}
                  src='https://linkfields.vercel.app/_next/image?url=https%3A%2F%2Fimages-linkfields-poc.s3.eu-west-2.amazonaws.com%2Fcontact-us-1.png&w=3840&q=75'
                />
              </Row>
  
              <Row style={{ ...boxInfos, paddingBottom: "0" }}>
                <Column>
                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Hi {data.name}, Thank you for contacting us!
                  </Heading>
                  <Heading
                    as="h2"
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    We will reach to you asap.
                  </Heading>
  
                </Column>
              </Row>
            </Section>
  
            <Section style={containerImageFooter}>
              <Img
                style={image}
                width={620}
                src='https://linkfields.vercel.app/_next/image?url=%2Fimages%2Flinkfields_logo_1.png&w=3840&q=75'
              />
            </Section>
  
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © 2024 | Linkfields Innovations, 809, 8th Floor, Gowra Fountain Head, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana 500081
            </Text>
          </Container>
        </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default Email;

  export const adminEmailContent = (data) =>{
    const createdDate = new Date();
    const formattedDate = createdDate?.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    });

    return (
      <Html>
        <Head />
        <Tailwind>
          <Preview>Thank you for contacting us</Preview>
          <Body style={main}>
            <Container>
              <Section style={logo}>
                <Img src='https://linkfields.vercel.app/_next/image?url=%2Fimages%2Flinkfields_logo_1.png&w=3840&q=75' />
              </Section>

              <Section style={content}>
                <Row>
                  <Img
                    style={image}
                    width={620}
                    src='https://linkfields.vercel.app/_next/image?url=https%3A%2F%2Fimages-linkfields-poc.s3.eu-west-2.amazonaws.com%2Fcontact-us-1.png&w=3840&q=75'
                  />
                </Row>

                <Row style={{ ...boxInfos, paddingBottom: "0" }}>
                  <Column>
                    <Heading className="text-[24px] font-bold">Summary of the customer details:</Heading>
                    <Text style={{ ...paragraph, marginTop: -5 }}>
                      <b>Date: </b>
                      {formattedDate}
                    </Text>
                    <Text style={{ ...paragraph, marginTop: -5 }}>
                      <b>name: </b>
                      {data.name}
                    </Text>
                    <Text style={{ ...paragraph, marginTop: -5 }}>
                      <b>email: </b>
                      {data.email}
                    </Text>
                    <Text style={{ ...paragraph, marginTop: -5 }}>
                      <b>service: </b>
                      {data.service}
                    </Text>
                    <Text style={{ ...paragraph, marginTop: -5 }}>
                      <b>message: </b>
                      {data.message}
                    </Text>
                    <Text style={{ ...paragraph, marginTop: -5 }}>
                      <b>phone: </b>
                      {data.phoneNo}
                    </Text>   
                  </Column>
                </Row>
              </Section>

              <Section style={containerImageFooter}>
                <Img
                  style={image}
                  width={620}
                  src='https://linkfields.vercel.app/_next/image?url=%2Fimages%2Flinkfields_logo_1.png&w=3840&q=75'
                />
              </Section>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "rgb(0,0,0, 0.7)",
                }}
              >
                © 2024 | Linkfields Innovations, 809, 8th Floor, Gowra Fountain Head, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana 500081
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    )
  }
  
  const main = {
    backgroundColor: "#fff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const logo = {
    padding: "30px 20px",
  };
  
  const containerButton = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };
  
  const button = {
    backgroundColor: "#e00707",
    borderRadius: 3,
    color: "#FFF",
    fontWeight: "bold",
    border: "1px solid rgb(0,0,0, 0.1)",
    cursor: "pointer",
    padding: "12px 30px",
  };
  
  const content = {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
  };
  
  const image = {
    maxWidth: "100%",
  };
  
  const boxInfos = {
    padding: "20px",
  };
  
  const containerImageFooter = {
    padding: "45px 0 0 0",
  };