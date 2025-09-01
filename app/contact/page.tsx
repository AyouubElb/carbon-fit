import ContactForm from "@/components/contact/contact-form";
import React from "react";

const ContactPage = () => {
  return (
    <section className=" bg-[#1f1f21] px-4 py-7 md:p-[50px]">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-[56px] md:text-[80px] text-[#E8E8E8] font-medium mb-10 text-center leading-tight">
          Contact
        </h1>

        <ContactForm />
      </div>
    </section>
  );
};

export default ContactPage;
