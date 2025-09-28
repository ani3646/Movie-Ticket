import React from "react";

const AboutUs = () => {
  return (
    <div className="px-6 md:px-16 lg:px-36 py-20 text-gray-200">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-lg leading-relaxed mb-4">
        Welcome to <span className="font-semibold">Quick Show</span>! 🎬  
        Our platform is designed to help you quickly explore movies,
        check availability, and stay updated with the latest shows.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        We believe in making entertainment accessible, easy to find, and fun to
        explore. Whether you are a casual watcher or a movie enthusiast,
        Quick Show is here to guide you to your next favorite film.
      </p>
      <p className="text-lg leading-relaxed">
        <span className="font-semibold">Our mission:</span>  
        To create a smooth, user-friendly experience for everyone who loves
        watching movies and series.
      </p>
    </div>
  );
};

export default AboutUs;
