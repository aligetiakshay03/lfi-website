"use client";
import React, { forwardRef, useState } from "react";
import {
  contactNextSteps,
  contactServices,
  contactUsInputs,
} from "../../utils/constants/inputs";
import {
  IcontactusDetails,
  IContactusDetailsKeys,
} from "../../utils/interfaces";
import Image from "next/image";
import arrowDown from "../../public/images/arrow_down.png";
import arrowDownBlack from "../../public/images/ArrowDown-black.png";
import Button from "../../common/Button";
// import ContactusBanner from '../ContactusBanner';
// import { Button } from "antd";

interface IContactUsProps {
  ref: any;
  darkTheme?: boolean;
  contactusClassName?: string;
}

// export const ContactUsForm = ({ darkTheme }: IContactUsProps , ref) => {
const ContactUsForm = forwardRef<HTMLDivElement, IContactUsProps>(
  ({ darkTheme, contactusClassName }, ref) => {
    // const contactusClassName = classname || '';
    const [contactUsDetails, setContactUsDetails] = useState<IcontactusDetails>(
      {
        name: "",
        email: "",
        message: "",
        phoneNo: null,
        service: "",
      }
    );

    const [loader, setLoader] = useState(false);
    const [checkMark, setCheckMark] = useState(false);
    const [submitError, setSubmitError] = useState<string>("");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const services = contactServices;

    const contactFromNextSteps = contactNextSteps;

    const handleOnChange = (key: IContactusDetailsKeys, value: any) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "",
      }));
      //for now I am setting directly
      setContactUsDetails((contactUsDetails) => ({
        ...contactUsDetails,
        [key]: value,
      }));
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // South African mobile numbers: local (0821234567) or international (+27821234567)
    const phoneRegex = /^(0\d{9}|\+27\d{9})$/;

    const handleSubmit = async () => {
      const newErrors: { [key: string]: string } = {};

      // Validate form inputs
      contactUsInputs.forEach((input) => {
        switch (input.name) {
          case "email":
            if (!emailRegex.test(contactUsDetails.email)) {
              newErrors.email = "Please enter a valid email address";
            }
            break;
          case "phoneNo":
            if (!contactUsDetails.phoneNo) {
              newErrors.phoneNo = "Phone no is required";
            } else if (
              !phoneRegex.test(
                String(contactUsDetails.phoneNo).replace(/[\s-]/g, "")
              )
            ) {
              newErrors.phoneNo =
                "Please enter a valid phone number (e.g. 0xxxxxxxxx or +27xxxxxxxxx)";
            }
            break;
          case "message":
            if (
              contactUsDetails.message.length > 1 &&
              contactUsDetails.message.length < 10
            ) {
              newErrors.message =
                "Please enter a valid message more than 10 letters";
            } else if (!contactUsDetails.message) {
              newErrors.message = "Message is required";
            }
            break;
          default:
            if (!contactUsDetails[input.name]) {
              newErrors[input.name] = `${input.label} is required`;
            }
        }
      });

      if (Object.keys(newErrors).length > 0) {
        // If errors found, update error state and prevent form submission
        setErrors(newErrors);
        setLoader(false);
      } else {
        setLoader(true);
        setSubmitError("");
        try {
          const response = await fetch("/api/contactUs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: contactUsDetails.name,
              email: contactUsDetails.email,
              phoneNo: contactUsDetails.phoneNo,
              message: contactUsDetails.message,
              service: contactUsDetails.service,
            }),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
          }

          // Odoo answers every request with HTTP 200; success/failure lives in
          // the body's `status` field ("Success" / "Failed"), not the HTTP code.
          if (!data || data.status !== "Success") {
            throw new Error(
              (data && typeof data.messages === "string" && data.messages) ||
                "We couldn't submit your enquiry. Please try again."
            );
          }

          setCheckMark(true);
          setContactUsDetails({
            name: "",
            email: "",
            message: "",
            phoneNo: null,
            service: "",
          });
          setTimeout(() => {
            setLoader(false);
            setCheckMark(false);
          }, 2000);

          return data;
        } catch (e) {
          console.error(e);
          setLoader(false);
          setSubmitError(
            e instanceof Error
              ? e.message
              : "We couldn't reach the server. Please check your connection and try again."
          );
          return e;
        }
      }
    };

    return (
      <div
        className={`${
          darkTheme
            ? "bg-[url('/backgroud-images/contact-us-mobile-dark.jpg')] md:bg-[url('/backgroud-images/contact-us-dark.jpg')] bg-[#161211]"
            : "bg-[url('/backgroud-images/contact-us-mobile.jpg')] md:bg-[url('/backgroud-images/contact-us.png')] bg-[#E5E8E8]"
        }  bg-center bg-cover md:bg-contain bg-no-repeat w-full flex flex-col gap-[100px] p-[100px] max-[1560px]:p-[80px] max-[1560px]:gap-[56px] max-[1025px]:p-[40px] max-[1025px]:gap-[40px] max-sm:p-[20px] max-sm:object-center`}
      >
        <div
          ref={ref}
          className={`flex flex-col ${
            darkTheme ? "xl:gap-[18px]" : "gap-[16px] min-[1561px]:gap-9"
          }`}
        >
          <span
            className={`${
              darkTheme
                ? `text-[#A4A8A9] ${contactusClassName}`
                : "text-[#737575]"
            } text-[32px] md:text-[36px] md:leading-[37px] min-[1561px]:text-[56px] min-[1561px]:leading-[58px] font-['MonsalGothicMedium']`}
          >
            Contact Us
          </span>
          <span
            className={`${
              darkTheme
                ? "text-[#E6ECED] text-[24px] leading-[28px] md:text-4xl md:leading-[46px] min-[1561px]:text-[48px] min-[1561px]:leading-[36px] font-['libre-franklin'] font-normal"
                : "text-[#272727] text-[24px] leading-[28px] md:leading-[24px] min-[1561px]:text-[56px] min-[1561px]:leading-[56px] font-['libre-franklin'] font-normal"
            }`}
          >
            Let&apos;s connect over a virtual coffee
          </span>
        </div>
        <div className="w-full flex max-xl:flex-col max-lg:flex-col">
          <div className="w-full">
            {loader ? (
              <div className="flex items-center justify-center flex-col">
                <label
                  className={`${
                    loader
                      ? "animate-none border-[#FF7800] transition duration-500 ease-out"
                      : "animate-spin border-l-white"
                  } relative h-[125px] w-[125px] inline-block border-[10px] border-[#FF7800] rounded-full`}
                >
                  <div
                    className={`${
                      loader ? "block" : "hidden"
                    } after:absolute after:content-[''] after:h-[56px] after:w-[28px] after:border-t-[10px] after:border-r-[10px]  after:border-t-[#FF7800] after:border-r-[#FF7800] after:top-[45%] after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-scale-x-100 after:rotate-[235deg] after:animate-checkIcon`}
                  ></div>
                </label>
                <p className="text-white text-[24px] font-normal mt-3">
                  Thank you for your interest in Linkfields. We will get in
                  touch with you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="flex flex-col lg:gap-[80px] md:gap-[50px] gap-[50px]"
              >
                <div className="grid md:grid-cols-2 gap-[30px] md:gap-[30px] min-[1561px]:gap-[60px]  grid-cols-1 relative">
                  {contactUsInputs.map((input, index) => {
                    return (
                      <div
                        key={`contactus-input-${index}`}
                        className="flex flex-col last:col-span-full"
                      >
                        {input.name === "service" ? (
                          <>
                            <select
                              className={`select-wrapper select ${
                                darkTheme
                                  ? "border-[#D1D6D7] bg-black placeholder:text-[#8A8E8F] text-[#8A8E8F]"
                                  : "border-[#272727] placeholder:text-[#8A8E8F] text-[#8A8E8F]"
                              } bg-transparent border-b md:border md:rounded-[5px] min-[1561px]:p-4 md:p-3 pb-5 text-xl md:text-lg min-[1561px]:text-2xl last:col-span-full focus:outline-none font-['HelveticaNeueSmallBold']`}
                              value={
                                contactUsDetails[`${input.name}`] ?? undefined
                              }
                              onChange={(e) => {
                                handleOnChange(input.name, e.target.value);
                              }}
                            >
                              {services.map((service, index) => (
                                <option
                                  key={index}
                                  value={service.value}
                                  className={`${darkTheme ? "bg-black" : ""}`}
                                >
                                  {service.label}
                                </option>
                              ))}
                            </select>
                          </>
                        ) : (
                          <input
                            className={`${
                              darkTheme
                                ? "border-[#D1D6D7] placeholder:text-[#8A8E8F] text-[#e6eced]"
                                : "border-[#272727] placeholder:text-[#8A8E8F] text-[#272727]"
                            } bg-transparent border-b md:border md:rounded-[5px] min-[1561px]:p-4 md:p-3 pb-5 text-xl md:text-lg min-[1561px]:text-2xl last:col-span-full focus:outline-none font-['HelveticaNeueSmallBold']`}
                            // type={input.type}
                            type={input.name === "phoneNo" ? "tel" : input.type}
                            placeholder={input.placeHolder}
                            value={
                              contactUsDetails[`${input.name}`] ?? undefined
                            }
                            name={input.name}
                            onChange={(e) => {
                              handleOnChange(input.name, e.target.value);
                            }}
                          />
                        )}
                        {errors[input.name] && (
                          <span className="text-red-500">
                            {errors[input.name]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {submitError && (
                  <div
                    role="alert"
                    className="rounded-[8px] border border-red-500/50 bg-red-500/10 px-4 py-3 text-[14px] text-red-300 font-['libre-franklin']"
                  >
                    {submitError}
                  </div>
                )}
                <div className="flex justify-end">
                  <Button
                    btnType="submit"
                    text="Submit"
                    bgColor="#FF7800"
                    className="2xl:w-[222px] 2xl:h-[68px] md:w-[171px] md:h-[48px] md:gap-3 w-[183px] h-[52px]"
                    labelClass="2xl:text-[20px] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal text-[16px] leading-[15.81px]"
                  />
                </div>
              </form>
            )}
          </div>
          <div className="xl:ml-[50px]">
            <span
              className={`${
                darkTheme
                  ? "text-[#E6ECED] text-[32px] md:text-[36px] md:leading-[37px] min-[1561px]:pt-[100px]"
                  : "text-[#737575]"
              } text-[32px] md:text-[36px] md:leading-[37px] min-[1561px]:text-[56px] min-[1561px]:leading-[58px] font-['MonsalGothicMedium']`}
            >
              What happens next?
            </span>
            <ol
              style={{
                listStyleType: "decimal",
                color: "#FFFFFF",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              {contactFromNextSteps.map((item, index) => (
                <li key={index} className="leading-[180%]">
                  <span
                    className={`${
                      darkTheme
                        ? "text-[#E6ECED] text-[14px] leading-[90%] md:text-[16px] md:leading-[90%] min-[1561px]:text-[18px] min-[1561px]:leading-[90%] font-['libre-franklin'] font-normal"
                        : "text-[#272727] text-[14px] leading-[28px] md:leading-[24px] min-[1561px]:text-[16px] min-[1561px]:leading-[56px] font-['libre-franklin'] font-normal"
                    }`}
                  >
                    {item.description}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <style jsx>
          {`
            select {
              -webkit-appearance: none;
              appearance: none;
            }

            .select-wrapper {
              position: relative;
              // background: red;
            }

            .select-wrapper select {
              border-radius: 5px;
              background: red;
            }

            .select-items {
              position: absolute;
              background-color: purple;
              top: 100%;
              left: 0;
              right: 0;
              z-index: 99;
              border-radius: 200px !important;
            }
          `}
        </style>
      </div>
    );
  }
);

ContactUsForm.displayName = "ContactUsForm";

export default ContactUsForm;
