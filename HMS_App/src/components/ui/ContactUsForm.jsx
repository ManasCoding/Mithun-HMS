// import React from 'react'

import { useState } from "react";
import { Button } from "./button";

const ContactUsForm = () => {
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const inputChangeHandler = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactForm);
  };

  return (
    <div className="w-full h-[88vh] bg-[#F5F5F5] px-40 pt-10 pb-5">
      <div className="w-full h-full flex">
        <div className="w-2/5 relative">
          <div className="w-2/3 inline-block h-24 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[26rem] after:border-b-2 after:border-[#D5D5D5] after:mt-2">
            <h1 className="font-semibold text-5xl text-[#4A4A4A]">
              Contact Us
            </h1>
          </div>
        </div>
        <div className="w-3/5">
          <form
            className="w-full h-full flex flex-col justify-between"
            onSubmit={handleSubmit}
          >
            <div className="w-full h-1/6 flex flex-col">
              <label htmlFor="name" className="text-xl font-alice text-black">
                <span className="font-medium">Name</span>{" "}
                <span className="text-xs text-[#616161]">(required)</span>{" "}
              </label>

              <div className="w-full h-full flex justify-between">
                <div className="w-[49%] flex flex-col justify-between">
                  <p className="font-alice text-sm">First Name</p>

                  <input
                    type="text"
                    name="firstName"
                    value={contactForm.firstName}
                    onChange={inputChangeHandler}
                    required
                    className="h-full border-2 border-[#A9A9A9] px-2 font-semibold"
                  />
                </div>
                <div className="w-[49%] flex flex-col justify-between">
                  <p className="font-alice text-sm">Last Name</p>

                  <input
                    type="text"
                    name="lastName"
                    value={contactForm.lastName}
                    onChange={inputChangeHandler}
                    className="h-full border-2 border-[#A9A9A9] px-2 font-semibold"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-1/6 flex flex-col">
              <label htmlFor="email" className="text-xl font-alice text-black">
                <span className="font-medium">Email Address</span>{" "}
                <span className="text-xs text-[#616161]">(required)</span>{" "}
              </label>

              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={inputChangeHandler}
                className="h-full border-2 border-[#A9A9A9] px-2 font-semibold"
              />
            </div>
            <div className="w-full h-1/6 flex flex-col">
              <label
                htmlFor="subject"
                className="text-xl font-alice text-black"
              >
                <span className="font-medium">Subject</span>{" "}
                <span className="text-xs text-[#616161]">(required)</span>{" "}
              </label>

              <input
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={inputChangeHandler}
                className="h-full border-2 border-[#A9A9A9] px-2 font-semibold"
              />
            </div>
            <div className="w-full h-2/6 flex flex-col">
              <label
                htmlFor="message"
                className="text-xl font-alice text-black"
              >
                <span className="font-medium">Message</span>{" "}
                <span className="text-xs text-[#616161]">(required)</span>{" "}
              </label>

              <textarea
                name="message"
                value={contactForm.message}
                onChange={inputChangeHandler}
                className="h-full border-2 border-[#A9A9A9] px-2 font-semibold"
              ></textarea>
            </div>

            <div className="">
              <Button variant="outlinePre">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
