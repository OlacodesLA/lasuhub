import React from "react";
import AboutPage from "@/components/Landing/AboutPage";
import Transition from "@/components/Transition";
import Footer from "@/components/Landing/Footer";

const About = () => {
  return <Transition>
    <AboutPage/>
    <Footer/>
  </Transition>;
};

export default About;
