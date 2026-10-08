"use client";
import React from "react";
import ContactUsForm from "../ContactUsForm";
import OdooContactForm from "../OdooContactForm";
import Benefits from "../Benefits";
import { IContactUsProps } from "../../interfaces/contactUs";
import { tinaField, useTina } from "tinacms/dist/react";
import styles from "./contactUs.module.scss";
import Link from "next/link";

const ContactUsPanel = (props: {
  data: IContactUsProps;
  className?: string;
  variant?: "default" | "odoo";
}) => {
  const { data: contactUs } = useTina(props.data);
  const contactUsData = contactUs.contactUsPage;
  return (
    <div>
      {props.variant === "odoo" ? (
        <OdooContactForm
          darkTheme={true}
          contactusClassName={props.className}
        />
      ) : (
        <ContactUsForm darkTheme={true} contactusClassName={props.className} />
      )}
      <div className={styles.banner}>
        {contactUsData.banner?.map((item, idx) => {
          return (
            <div key={idx} className={styles.textContent}>
              <div className={styles.title}>
                <div className={styles.circle} />
                <h1
                  className={styles.heading}
                  data-tina-field={item && tinaField(item, "title")}
                >
                  {item?.title}
                </h1>
              </div>
              <p
                className={styles.emailId}
                data-tina-field={item && tinaField(item, "emailId")}
              >
                <Link title="mail to" href={`mailto:${item?.emailId}`}>
                  {item?.emailId}
                </Link>
              </p>
            </div>
          );
        })}
      </div>
      <Benefits data={props.data} />
    </div>
  );
};

export default ContactUsPanel;

// "use client";
// import React from "react";
// import { ContactUsForm } from "../ContactUsForm";
// import styles from "./contactUs.module.scss";
// import Benefits from "../Benefits";
// import { IContactUsProps } from "../../interfaces/contactUs";
// import { tinaField, useTina } from "tinacms/dist/react";

// const ContactUsPanel = (props: { data: IContactUsProps }) => {
//   const { data: contactUs } = useTina(props.data);
//   const contactUsData = contactUs.contactUsPage;
//   return (
//     <div>
//       <ContactUsForm darkTheme={true} />
//       <div className={styles.banner}>
//         {contactUsData.banner?.map((item, idx) => {
//           return (
//             <>
//               <div key={idx} className={styles.textContent}>
//                 <div className={styles.title}>
//                   <div className={styles.circle} />
//                   <h1
//                     className={styles.heading}
//                     data-tina-field={item && tinaField(item, "title")}
//                   >
//                     {item?.title}
//                   </h1>
//                 </div>
//                 <p
//                   className={styles.emailId}
//                   data-tina-field={item && tinaField(item, "emailId")}
//                 >
//                   {item?.emailId}
//                 </p>
//               </div>
//             </>
//           );
//         })}
//       </div>
//       <Benefits data={props.data} />
//     </div>
//   );
// };

// export default ContactUsPanel;
