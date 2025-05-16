// import React from 'react'

const ReachUs = () => {
  return (
    <div className="w-full h-[100vh] px-40 pt-28 pb-24">
      <div className="w-full h-full flex justify-between">
        <div className="h-full w-2/6">
          <div className="relative h-1/4">
            <h1 className="font-semibold text-5xl text-[#4A4A4A] inline-block h-1/2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[19rem] after:border-b-2 after:border-[#D5D5D5] after:mt-2">
              <span className="">Reach Us</span>
            </h1>
          </div>

          <div className="h-3/4 font-alice text-lg text-[#4A4A4A]">
            <p>Mercy Hospital, St. Louis</p>
            <p>615 South New Ballas Road</p>
            <p>Saint Louis, Missouri 63141</p>
            <p>United States</p>
            <p>MO 631283</p>
            <p className="mt-6">Call Us: +1 314-525-1000</p>
          </div>
        </div>
        <div className="h-full w-4/6">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d99910.21756320211!2d-90.46357136661702!3d38.506229531254384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x87d8cf3612e5eb35%3A0xe949014fce135c06!2s10010%20Kennerly%20Rd%2C%20St.%20Louis%2C%20MO%2063128%2C%20United%20States!3m2!1d38.5062584!2d-90.3811704!5e0!3m2!1sen!2sin!4v1727291815033!5m2!1sen!2sin"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ReachUs;
