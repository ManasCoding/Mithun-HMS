// import React from "react";

import Footer from "@/components/ui/Footer";

const AboutUs = () => {
  return (
    <>
      <div className="w-full bg-[#F5F5F5] px-64 pt-24 pb-5">
        <div className="w-full h-full">
          <div className="w-full h-[300px] flex gap-5">
            <div className="w-[60%] h-full bg-section bg-cover bg-center z-0"></div>
            <div className="h-full w-[50%] z-10 ml-[-10%] bg-transparent py-5">
              <div className="w-full h-full bg-white p-14 flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-[#65adff]">
                  MERCY HOSPITAL
                </h1>
                <p className="font-alice text-lg">
                  NABH Accredited Hospital, NABL Accredited diagnostics
                  Laboratory
                </p>
              </div>
            </div>
          </div>

          <div className="my-10">
            <p className="font-alice text-lg mb-5 leading-relaxed">
              MERCY Hospital is the super speciality hospital of Siksha 'O'
              Anusandhan Deemed to be University or SOA Deemed to be University.
              It provides affordable super speciality treatment to those who
              can&apos;t afford said treatment.
            </p>
            <p className="font-alice text-lg mb-5 leading-relaxed">
              The MERCY Hospital is an associate of Institute of Medical
              Sciences and MERCY Hospital, Siksha ‘O’ Anusandhan, Deemed to be
              University, giving medical education in Undergraduate, Post
              Graduate and Super Speciality courses.
            </p>
            <p className="font-alice text-lg leading-relaxed">
              MERCY Hospital is one of the largest Hospitals in USA, providing
              General and Super Speciality medical services at affordable rates.
              It provides Super Speciality services including Cardiothoracic and
              Vascular Surgery, Cardiology, Critical Care Medicine,
              Endocrinology, Gastroenterology (Medical & Surgical), Immunology &
              Rheumatology, Oncology (Medical & Surgical), Nephrology,
              Neurology, Neurosurgery, Pediatric Surgery, Plastic &
              Reconstructive Surgery, Hematology, Urology and Neonatology.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
