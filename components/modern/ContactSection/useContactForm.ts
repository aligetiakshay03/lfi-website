"use client";
import { useState } from "react";
import { contactUsInputs } from "../../../utils/constants/inputs";
import { IcontactusDetails, IContactusDetailsKeys } from "../../../utils/interfaces";

const EMPTY: IcontactusDetails = { name: "", email: "", message: "", phoneNo: null, service: "" };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// South African mobile numbers: local (0821234567) or international (+27821234567)
const phoneRegex = /^(0\d{9}|\+27\d{9})$/;

/**
 * Contact form state + submission. Same validation rules and the same /api/contactUs
 * contract (Odoo answers 200 with status "Success"/"Failed") as components/ContactUsForm.
 */
export function useContactForm() {
  const [values, setValues] = useState<IcontactusDetails>(EMPTY);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [submitError, setSubmitError] = useState("");

  const setField = (key: IContactusDetailsKeys, value: any) => {
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const next: { [key: string]: string } = {};
    contactUsInputs.forEach((input) => {
      switch (input.name) {
        case "email":
          if (!emailRegex.test(values.email)) next.email = "Please enter a valid email address";
          break;
        case "phoneNo":
          if (!values.phoneNo) next.phoneNo = "Phone no is required";
          else if (!phoneRegex.test(String(values.phoneNo).replace(/[\s-]/g, "")))
            next.phoneNo = "Please enter a valid phone number (e.g. 0xxxxxxxxx or +27xxxxxxxxx)";
          break;
        case "message":
          if (values.message.length > 1 && values.message.length < 10)
            next.message = "Please enter a valid message more than 10 letters";
          else if (!values.message) next.message = "Message is required";
          break;
        default:
          if (!values[input.name]) next[input.name] = `${input.label} is required`;
      }
    });
    return next;
  };

  const submit = async () => {
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setStatus("sending");
    setSubmitError("");
    try {
      const response = await fetch("/api/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      if (!data || data.status !== "Success") {
        throw new Error(
          (data && typeof data.messages === "string" && data.messages) ||
            "We couldn't submit your enquiry. Please try again."
        );
      }
      setValues(EMPTY);
      setStatus("sent");
    } catch (e) {
      console.error(e);
      setStatus("idle");
      setSubmitError(
        e instanceof Error ? e.message : "We couldn't reach the server. Please check your connection and try again."
      );
    }
  };

  return { values, errors, status, submitError, setField, submit, reset: () => setStatus("idle") };
}
