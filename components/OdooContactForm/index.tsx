"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { odooContactUsInputs } from "../../utils/constants/inputs";
import {
  IOdooContactDetails,
  IOdooContactDetailsKeys,
} from "../../utils/interfaces";
import Button from "../../common/Button";
import Dropdown from "./Dropdown";

interface IOdooContactFormProps {
  ref: any;
  darkTheme?: boolean;
  contactusClassName?: string;
}

// Proper tokens make the browser offer the right saved value per field instead
// of guessing from the input's name.
const autoCompleteTokens: Record<string, string> = {
  name: "name",
  email: "email",
  phoneNo: "tel",
  industry: "off",
  message: "off",
};

const emptyDetails: IOdooContactDetails = {
  name: "",
  phoneNo: "",
  email: "",
  industry: "",
  companySize: "",
  timeline: "",
  message: "",
};

const OdooContactForm = forwardRef<HTMLDivElement, IOdooContactFormProps>(
  ({ darkTheme, contactusClassName }, ref) => {
    const [odooContactDetails, setOdooContactDetails] =
      useState<IOdooContactDetails>({ ...emptyDetails });

    // "submitting" is the in-flight state; success visuals must wait for the result.
    const [status, setStatus] = useState<"idle" | "submitting" | "success">(
      "idle"
    );

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Drives the floating label: a field's label lifts while it is focused or filled.
    const [focusedField, setFocusedField] = useState<string>("");

    const [submitError, setSubmitError] = useState<string>("");

    // Chrome fills fields on load without dispatching input events, so React state
    // stays empty while the browser shows values — the labels would sit over the
    // text and a submit would send blanks. Read the DOM back once things settle.
    useEffect(() => {
      const syncAutofilled = () => {
        setOdooContactDetails((previous) => {
          let changed = false;
          const next = { ...previous };
          odooContactUsInputs.forEach((input) => {
            if (input.type === "select") return;
            const element = document.getElementById(
              `odoo-${input.name}`
            ) as HTMLInputElement | null;
            if (
              element &&
              element.value &&
              element.value !== previous[input.name]
            ) {
              next[input.name] = element.value;
              changed = true;
            }
          });
          return changed ? next : previous;
        });
      };

      const timers = [
        setTimeout(syncAutofilled, 120),
        setTimeout(syncAutofilled, 700),
      ];
      return () => timers.forEach(clearTimeout);
    }, []);

    const handleOnChange = (key: IOdooContactDetailsKeys, value: any) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "",
      }));
      setOdooContactDetails((odooContactDetails) => ({
        ...odooContactDetails,
        [key]: value,
      }));
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // The phone input strips non-digits as the user types, so only digit forms
    // reach here. Indian mobile numbers: 10 digits starting 6-9 (9876543210),
    // optionally prefixed with the country code without the leading + (919876543210)
    const phoneRegex = /^(91)?[6-9]\d{9}$/;

    const handleSubmit = async () => {
      const newErrors: { [key: string]: string } = {};

      odooContactUsInputs.forEach((input) => {
        switch (input.name) {
          case "email":
            if (!emailRegex.test(odooContactDetails.email)) {
              newErrors.email = "Please enter a valid email address";
            }
            break;
          case "phoneNo":
            if (!odooContactDetails.phoneNo) {
              newErrors.phoneNo = "Phone no is required";
            } else if (!phoneRegex.test(odooContactDetails.phoneNo)) {
              newErrors.phoneNo =
                "Please enter a valid 10-digit Indian mobile number";
            }
            break;
          default:
            if (input.required && !odooContactDetails[input.name]) {
              newErrors[input.name] = `${input.label} is required`;
            }
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setStatus("idle");
      } else {
        setStatus("submitting");
        setSubmitError("");
        // The form collapses into a short spinner/success block, shrinking page
        // height enough that the browser clamps scroll position under the header.
        window.scrollTo({ top: 0, behavior: "smooth" });

        try {
          const response = await fetch("/api/odooContactUs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: odooContactDetails.name.trim(),
              email: odooContactDetails.email.trim(),
              phoneNo: odooContactDetails.phoneNo.trim(),
              industry: odooContactDetails.industry.trim(),
              companySize: odooContactDetails.companySize,
              timeline: odooContactDetails.timeline,
              message: odooContactDetails.message.trim(),
            }),
          });

          // A non-JSON body (gateway error page, empty 204) must not throw here —
          // the status is what decides success.
          const data = await response.json().catch(() => null);

          // Odoo answers every request with HTTP 200; success/failure lives in
          // the body's `status` field ("Success" / "Failed"), not the HTTP code.
          if (!response.ok) {
            const apiError =
              data && typeof data === "object" && "error" in data
                ? String((data as { error: unknown }).error)
                : "";
            throw new Error(
              apiError || `Submission failed (${response.status})`
            );
          }

          if (!data || data.status !== "Success") {
            throw new Error(
              (data && typeof data.messages === "string" && data.messages) ||
                "We couldn't submit your enquiry. Please try again."
            );
          }

          // Only discard what they typed once the lead is safely away.
          setOdooContactDetails({ ...emptyDetails });
          setStatus("success");
        } catch (error) {
          console.error("Odoo enquiry submission failed", error);
          // Keep their answers so a retry costs nothing.
          setSubmitError(
            error instanceof Error
              ? error.message
              : "We couldn't reach the server. Please check your connection and try again."
          );
          setStatus("idle");
        }
      }
    };

    return (
      <div
        className={`${
          darkTheme
            ? "bg-[url('/backgroud-images/contact-us-mobile-dark.jpg')] md:bg-[url('/backgroud-images/contact-us-dark.jpg')] bg-[#161211]"
            : "bg-[url('/backgroud-images/contact-us-mobile.jpg')] md:bg-[url('/backgroud-images/contact-us.png')] bg-[#E5E8E8]"
        }  bg-center bg-cover md:bg-[length:100%_auto] bg-no-repeat w-full flex flex-col gap-[100px] p-[100px] max-[1560px]:p-[80px] max-[1560px]:gap-[56px] max-[1025px]:p-[40px] max-[1025px]:gap-[40px] max-sm:p-[20px] max-sm:gap-[20px] max-sm:object-center`}
      >
        <div
          ref={ref}
          className={`flex flex-col ${
            darkTheme
              ? "gap-3 md:gap-4 xl:gap-[18px]"
              : "gap-[16px] min-[1561px]:gap-9"
          }`}
        >
          <span
            className={`${
              darkTheme ? contactusClassName : ""
            } relative inline-flex items-center gap-2.5 self-start overflow-hidden rounded-full border px-4 py-2 md:px-5 md:py-2.5 animate-badgeIn motion-reduce:animate-none ${
              darkTheme
                ? "border-[#D1D6D7]/45 bg-white/[0.06] animate-badgeGlow motion-reduce:animate-none"
                : "border-[#8A8E8F]/60 bg-black/[0.04]"
            }`}
          >
            {/* Silver sheen sweeping across the badge, nodding to the tier. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-badgeSheen motion-reduce:hidden"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="relative h-4 w-4 md:h-[18px] md:w-[18px] shrink-0"
            >
              <defs>
                {/* Vertical gradient so the shield reads as brushed metal rather than flat grey. */}
                <linearGradient
                  id="odooSilverShield"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#F4F6F6" />
                  <stop offset="55%" stopColor="#C7CDCE" />
                  <stop offset="100%" stopColor="#98A0A1" />
                </linearGradient>
              </defs>
              <path
                d="M10 1.6 16.7 4.2 V10.1 C16.7 13.9 13.9 16.9 10 18.4 C6.1 16.9 3.3 13.9 3.3 10.1 V4.2 Z"
                fill="url(#odooSilverShield)"
                strokeLinejoin="round"
              />
              <path
                d="M6.9 9.9 9.1 12.1 13.1 7.8"
                fill="none"
                stroke="#161211"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`relative text-[12px] md:text-[13px] min-[1561px]:text-[15px] uppercase tracking-[0.16em] ${
                darkTheme ? "text-[#E6ECED]" : "text-[#272727]"
              } font-['libre-franklin'] font-medium whitespace-nowrap`}
            >
              Odoo Silver Partner
            </span>
          </span>
          <span
            className={`${
              darkTheme
                ? "text-[#E6ECED] text-[24px] leading-[28px] md:text-4xl md:leading-[46px] min-[1561px]:text-[48px] min-[1561px]:leading-[36px] font-['libre-franklin'] font-normal"
                : "text-[#272727] text-[24px] leading-[28px] md:leading-[24px] min-[1561px]:text-[56px] min-[1561px]:leading-[56px] font-['libre-franklin'] font-normal"
            }`}
          >
            Thinking about Odoo? Let&apos;s talk specifics.
          </span>
          <p
            className={`${
              darkTheme ? "text-[#A4A8A9]" : "text-[#4a4a4a]"
            } max-w-[680px] text-[15px] leading-[1.65] md:text-[17px] min-[1561px]:text-[19px] font-['libre-franklin'] font-normal`}
          >
            Whether you&apos;re evaluating ERP or already mid-rollout, tell us
            where you are. Our Odoo team will come back to you within 24 hours.
          </p>
        </div>
        <div className="w-full">
          {status !== "idle" ? (
            <div
              className="flex items-center justify-center flex-col"
              aria-live="polite"
            >
              <label
                className={`${
                  status === "success"
                    ? "animate-none border-[#FF7800] transition duration-500 ease-out"
                    : "animate-spin border-l-white"
                } relative h-[125px] w-[125px] inline-flex items-center justify-center border-[6px] border-[#FF7800] rounded-full`}
              >
                {status === "success" && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[60px] w-[60px]"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#FF7800"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={30}
                      strokeDasharray={30}
                      className="animate-checkDraw"
                    />
                  </svg>
                )}
              </label>
              <p
                className={`${
                  darkTheme ? "text-[#E6ECED]" : "text-[#272727]"
                } text-[24px] font-normal mt-[100px] max-[1560px]:mt-[56px] max-[1025px]:mt-[40px] max-sm:mt-[20px] text-center font-['libre-franklin']`}
              >
                {status === "success"
                  ? "Thanks, we've got your details. One of our Odoo consultants will be in touch shortly."
                  : "Sending your details…"}
              </p>
              {status === "success" && (
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className={`mt-6 text-[15px] underline underline-offset-4 transition-colors duration-150 font-['libre-franklin'] ${
                    darkTheme
                      ? "text-[#A4A8A9] hover:text-[#E6ECED]"
                      : "text-[#5a5a5a] hover:text-[#272727]"
                  }`}
                >
                  Submit another enquiry
                </button>
              )}
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col lg:gap-[80px] md:gap-[50px] gap-[50px]"
            >
              <div className="grid md:grid-cols-2 gap-[16px] md:gap-[30px] min-[1561px]:gap-[60px]  grid-cols-1 relative">
                {odooContactUsInputs.map((input, index) => {
                  const fieldId = `odoo-${input.name}`;
                  const fieldValue = odooContactDetails[`${input.name}`] ?? "";
                  const isFloating =
                    Boolean(fieldValue) || focusedField === input.name;
                  const labelText = input.required
                    ? `${input.label} *`
                    : `${input.label} (optional)`;
                  return (
                    <div
                      key={`odoo-contactus-input-${index}`}
                      className="flex flex-col last:col-span-full"
                    >
                      <div className="relative flex flex-col pt-[28px]">
                        <label
                          htmlFor={fieldId}
                          className={`pointer-events-none absolute left-0 md:left-3 min-[1561px]:left-4 flex items-center transition-all duration-200 ease-out font-['HelveticaNeueSmallBold'] ${
                            isFloating
                              ? "top-0 h-[18px] text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-[#A4A8A9]"
                              : "top-[28px] bottom-0 text-xl md:text-lg min-[1561px]:text-2xl text-[#8A8E8F]"
                          }`}
                        >
                          {labelText}
                        </label>
                        {input.type === "select" ? (
                          <Dropdown
                            id={fieldId}
                            options={input.options ?? []}
                            value={fieldValue}
                            ariaLabel={input.label}
                            darkTheme={darkTheme}
                            hasError={Boolean(errors[input.name])}
                            showPlaceholder={false}
                            onChange={(nextValue) => {
                              handleOnChange(input.name, nextValue);
                            }}
                          />
                        ) : (
                          <input
                            id={fieldId}
                            onFocus={() => setFocusedField(input.name)}
                            onBlur={() => setFocusedField("")}
                            className={`${
                              errors[input.name]
                                ? "border-red-500/80"
                                : darkTheme
                                ? "border-[#D1D6D7]"
                                : "border-[#272727]"
                            } ${
                              darkTheme
                                ? "placeholder:text-[#8A8E8F] text-[#e6eced]"
                                : "placeholder:text-[#8A8E8F] text-[#272727]"
                            } bg-transparent border-b md:border md:rounded-[5px] px-0 py-3 md:p-3 min-[1561px]:p-4 text-xl md:text-lg min-[1561px]:text-2xl focus:outline-none transition-colors duration-150 font-['HelveticaNeueSmallBold']`}
                            type={input.type}
                            placeholder=""
                            autoComplete={
                              autoCompleteTokens[input.name] ?? "off"
                            }
                            spellCheck={false}
                            autoCorrect="off"
                            autoCapitalize={
                              input.name === "email" ? "off" : "sentences"
                            }
                            inputMode={
                              input.name === "phoneNo" ? "numeric" : undefined
                            }
                            aria-label={input.label}
                            aria-invalid={Boolean(errors[input.name])}
                            value={fieldValue}
                            name={input.name}
                            onChange={(e) => {
                              const nextValue =
                                input.name === "phoneNo"
                                  ? e.target.value.replace(/\D/g, "")
                                  : e.target.value;
                              handleOnChange(input.name, nextValue);
                            }}
                          />
                        )}
                      </div>
                      {errors[input.name] && (
                        <span className="mt-2 text-[13px] text-red-400 font-['libre-franklin']">
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
                  text="Request a callback"
                  bgColor="#FF7800"
                  className="w-full sm:w-[218px] 2xl:w-[268px] 2xl:h-[68px] md:h-[48px] md:gap-3 h-[54px] whitespace-nowrap"
                  labelClass="2xl:text-[20px] 2xl:leading-[19.76px] font-['libre-franklin'] font-normal text-[16px] leading-[15.81px]"
                />
              </div>
            </form>
          )}
        </div>

        <style jsx>
          {`
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
              -webkit-text-fill-color: ${darkTheme ? "#e6eced" : "#272727"};
              caret-color: ${darkTheme ? "#e6eced" : "#272727"};
              transition: background-color 0s 600000s, color 0s 600000s;
            }

            input:-internal-autofill-previewed {
              -webkit-text-fill-color: ${darkTheme ? "#e6eced" : "#272727"};
              transition: background-color 0s 600000s, color 0s 600000s;
            }

            input:-internal-autofill-selected {
              -webkit-text-fill-color: ${darkTheme ? "#e6eced" : "#272727"};
              transition: background-color 0s 600000s, color 0s 600000s;
            }
          `}
        </style>
      </div>
    );
  }
);

OdooContactForm.displayName = "OdooContactForm";

export default OdooContactForm;
