import React from "react";

const ContactForm = () => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-transparent border-2 border-[#E8E8E8BF] text-[#E8E8E8] py-3.5 px-5 text-base font-medium focus:outline-none focus:border-[#E8E8E8] transition-colors duration-200 rounded-none placeholder:text-[#E8E8E8BF]"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email *"
            className="w-full bg-transparent border-2 border-[#E8E8E8BF] text-[#E8E8E8] py-3.5 px-5 text-base font-medium focus:outline-none focus:border-[#E8E8E8] transition-colors duration-200 rounded-none placeholder:text-[#E8E8E8BF]"
            required
          />
        </div>
      </div>

      <div>
        <input
          type="tel"
          placeholder="Phone number"
          className="w-full bg-transparent border-2 border-[#E8E8E8BF] text-[#E8E8E8] py-3.5 px-5 text-base font-medium focus:outline-none focus:border-[#E8E8E8] transition-colors duration-200 rounded-none placeholder:text-[#E8E8E8BF]"
        />
      </div>

      {/* Third row: Comment textarea (full width) */}
      <div>
        <textarea
          placeholder="Comment"
          rows={6}
          className="w-full bg-transparent border-2 border-[#E8E8E8BF] text-[#E8E8E8] py-3.5 px-5 text-base font-medium focus:outline-none focus:border-[#E8E8E8] transition-colors duration-200 rounded-none placeholder:text-[#E8E8E8BF] resize-none"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          className="bg-[rgb(236,193,116)] text-black py-3.5 px-10 md:px-12 text-base font-medium hover:bg-[rgb(226,183,106)] transition-colors duration-200 rounded-none uppercase"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
