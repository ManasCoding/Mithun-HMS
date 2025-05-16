// import React from 'react'

import Footer from "@/components/ui/Footer";
import Parallax from "@/components/ui/Parallax";
import ReachUs from "@/components/ui/ReachUs";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if a message was passed via navigate
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  return (
    <>
      <Parallax />

      <div className="w-full h-96 flex items-center justify-center py-12">
        <div className="w-[55%] h-[70%]">
          <h1 className="font-semibold text-[#65adff] text-xl mb-3">
            Our Mission
          </h1>
          <h1 className="text-[#4A4A4A] font-extrabold text-5xl mb-6">
            HEALTH CARE.
          </h1>
          <div className="font-alice flex flex-col gap-2 text-lg">
            <p>
              To ensure accurate and affordable quality health care with
              compassionate behavior.
            </p>
            <p>
              To achieve state of art of excellence in research and academics.
            </p>
            <p>
              To cultivate a safe environment of trust, honesty & mutual respect
              during medical care.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[100vh] bg-[#65adff] px-40 pt-24 pb-10">
        <div className="h-full flex flex-col justify-between">
          <div className="relative">
            <div className="w-full flex justify-between gap-14 pr-10 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[21rem] after:border-b-2 after:border-white after:mt-2">
              <h1 className="font-semibold text-5xl text-white pt-3">
                Departments
              </h1>
              <p className="font-alice text-lg text-white leading-8 flex flex-col">
                <span>
                  MERCY Hospital is an associate of Institute of Medical Sciences
                  and MERCY Hospital, Siksha ‘O’
                </span>
                <span>
                  Anusandhan, Deemed to be University which provides medical
                  education in
                </span>
                <span>
                  Undergraduate, Post Graduate and Super Speciality courses.
                </span>
              </p>
            </div>
          </div>
          <div className="w-full h-2/3 flex">
            <div className="h-full w-1/3 flex flex-col gap-2 font-alice text-lg text-white">
              <span>Anesthesiology</span>
              <span>Cardiology</span>
              <span>Cardiothoracic and Vascular Surgery </span>
              <span>(CTVS)</span>
              <span>Critical Care Medicine</span>
              <span>Dental</span>
              <span>Dermatology</span>
              <span>Endocrinology</span>
              <span>Otorhinolaryngology (ENT)</span>
              <span>Ophthalmology (EYE)</span>
            </div>
            <div className="h-full w-1/3 flex flex-col gap-2 font-alice text-lg text-white">
              <span>Gastroenterology (Medical & Surgical)</span>
              <span>General Medicine</span>
              <span>General Surgery</span>
              <span>Hematology</span>
              <span>Immuno Hematology & Blood Transfusion</span>
              <span>Immunology & Rheumatology</span>
              <span>Neonatology & NICU</span>
              <span>Nephrology</span>
              <span>Neurology</span>
              <span>Neurosurgery</span>
            </div>
            <div className="h-full w-1/3 flex flex-col gap-2 font-alice text-lg text-white">
              <span>Obstetric & Gynaecology</span>
              <span>Oncology (Medical & Surgical)</span>
              <span>Orthopaedic</span>
              <span>Paediatric</span>
              <span>Paediatric Surgery</span>
              <span>Plastic & Reconstructive Surgery</span>
              <span>Psychiatry</span>
              <span>Pulmonary Medicine</span>
              <span>Radio-Diagnosis</span>
              <span>Urology</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[100vh] px-40 pt-24 pb-10">
        <div className="h-full flex flex-col justify-between">
          <div className="w-full flex justify-between gap-40 relative">
            <h1 className="font-semibold text-5xl pt-3 text-[#4A4A4A] inline-block h-1/2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[19rem] after:border-b-2 after:border-[#D5D5D5] after:mt-2">
              <span>Services</span>
            </h1>
            <p className="font-alice text-lg leading-8 flex flex-col">
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

          <div className="w-full flex gap-3">
            <div className="h-full w-1/3 flex flex-col gap-3 font-alice text-lg">
              <h1 className="capitalize text-[#65adff]">Laboratory services</h1>
              <p>
                Clinical Biochemistry, Clinical Microbiology & Serelogy,
                Clinical Pathology, Cytopathology, Haematology, Histopathology,
                Molecular Biology, Toxicology, Blood Transfusion Service.
              </p>
            </div>
            <div className="h-full w-1/3 flex flex-col gap-3 font-alice text-lg">
              <h1 className="capitalize text-[#65adff]">
                diagnostics & imaging services
              </h1>
              <p>
                Bone Densitometry, CT Scanning, DSA Lab, Mammography, MRI, USG,
                X-Ray, 2D Echo, Audiometry, EEG, EMG, Holter Monitoring,
                Spirometry, TMT, Urodynamic Studies, Bronchoscopy, Colonoscopy,
                Endoscopy, Cath Lab, Sleep Study Lab.
              </p>
            </div>
            <div className="h-full w-1/3 flex flex-col gap-3 font-alice text-lg">
              <h1 className="capitalize text-[#65adff]">
                clinical support department
              </h1>
              <p>
                Ambulance, Blood Bank, Dietetics, Psychology, Rehabilitation,
                Occupational, Phsyiotherapy, Speech & Language Therapy, Clinical
                Pharmacology.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ReachUs />

      <Footer />
      <ToastContainer />
    </>
  );
};

export default Home;
