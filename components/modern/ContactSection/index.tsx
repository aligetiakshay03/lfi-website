"use client";
import React from "react";
import Reveal from "../Reveal";
import AnimatedText from "../AnimatedText";
import { contactNextSteps, contactServices, contactUsInputs } from "../../../utils/constants/inputs";
import { useContactForm } from "./useContactForm";
import styles from "./contact.module.scss";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Contact — official wording and fields, with floating-label inputs. */
const ContactSection = ({ index = "12" }: { index?: string }) => {
  const { values, errors, status, submitError, setField, submit, reset } = useContactForm();

  return (
    <section className={`${styles.section} lf-light`} data-header-theme="light" aria-labelledby="lf-contact-title" id="contact">
      <div className={`lf-container ${styles.grid}`}>
        <div className={styles.left}>
          <Reveal>
            <p className="lf-eyebrow">
              <span className="lf-eyebrow__num">{index}</span> Contact Us
            </p>
          </Reveal>
          <AnimatedText as="h2" text="Let's connect over a virtual coffee" highlight={["coffee"]} className={`lf-h2 ${styles.title}`} />

          <Reveal delay={150} className={styles.next}>
            <h3 className={styles.nextTitle}>What happens next?</h3>
            <ol className={styles.nextList}>
              {contactNextSteps.map((s, i) => (
                <li key={i}>
                  <span className={styles.nextNum}>{i + 1}</span>
                  <p>{s.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={100} className={`lf-card ${styles.formWrap}`}>
          <div className={styles.formHead}>
            <span className="lf-tag">Linkfields / Contact</span>
            <span className={styles.formHeadMail}>info@linkfields.com</span>
          </div>
          {status === "sent" ? (
            <div className={styles.success} role="status">
              <svg className={styles.check} viewBox="0 0 52 52" aria-hidden="true">
                <circle cx="26" cy="26" r="24" />
                <path d="M15 27l7 7 15-15" />
              </svg>
              <p>Thank you for your interest in Linkfields. We will get in touch with you shortly.</p>
              <button type="button" className="lf-link-arrow" onClick={reset}>
                <span>Send another message</span>
                <Arrow />
              </button>
            </div>
          ) : (
            <form
              className={styles.form}
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              {contactUsInputs.map((input) => {
                const id = `lf-contact-${input.name}`;
                const error = errors[input.name];
                const value = values[input.name] ?? "";
                const filled = String(value).length > 0;
                return (
                  <div
                    key={input.name}
                    className={`${styles.field} ${input.name === "message" ? styles.fieldFull : ""} ${filled ? styles.filled : ""} ${
                      error ? styles.invalid : ""
                    }`}
                  >
                    <div className={styles.controlWrap}>
                    {input.name === "service" ? (
                      <select
                        id={id}
                        className={styles.control}
                        value={value as string}
                        onChange={(e) => setField(input.name, e.target.value)}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-err` : undefined}
                      >
                        {contactServices.map((s) => (
                          <option key={s.label} value={s.value} disabled={s.value === ""}>
                            {s.value === "" ? "" : s.label}
                          </option>
                        ))}
                      </select>
                    ) : input.name === "message" ? (
                      <textarea
                        id={id}
                        className={styles.control}
                        rows={4}
                        value={value as string}
                        placeholder=" "
                        onChange={(e) => setField(input.name, e.target.value)}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-err` : undefined}
                      />
                    ) : (
                      <input
                        id={id}
                        className={styles.control}
                        type={input.name === "phoneNo" ? "tel" : input.name === "email" ? "email" : "text"}
                        value={value as string}
                        placeholder=" "
                        autoComplete={input.name === "name" ? "name" : input.name === "email" ? "email" : input.name === "phoneNo" ? "tel" : undefined}
                        onChange={(e) => setField(input.name, e.target.value)}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-err` : undefined}
                      />
                    )}
                    <label htmlFor={id} className={styles.label}>
                      {input.name === "service" ? "Select" : input.placeHolder.replace(" *", "")}
                      <span aria-hidden="true"> *</span>
                    </label>
                    <span className={styles.underline} aria-hidden="true" />
                    </div>
                    {error && (
                      <span id={`${id}-err`} className={styles.error}>
                        {error}
                      </span>
                    )}
                  </div>
                );
              })}

              {submitError && (
                <div role="alert" className={styles.submitError}>
                  {submitError}
                </div>
              )}

              <div className={styles.actions}>
                <button type="submit" className="lf-btn" disabled={status === "sending"}>
                  <span>{status === "sending" ? "Sending…" : "Submit"}</span>
                  <span className="lf-btn__arrow">
                    <Arrow />
                  </span>
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
