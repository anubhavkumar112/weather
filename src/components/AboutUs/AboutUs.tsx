import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 mb-8">
          <h2 className="text-xl font-semibold mb-2">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo cursus
            justo vel porta. Vivamus nec diam velit. Sed sit amet ipsum vel ex vestibulum
            pretium. Quisque maximus hendrerit justo, a fermentum nisi mattis non.
          </p>
        </div>
        <div className="w-full md:w-1/2 mb-8">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Proin eget odio elementum, dictum metus nec, interdum eros. Sed auctor risus vel
            erat placerat, vitae laoreet nunc varius. Duis quis justo sit amet quam feugiat
            hendrerit.
          </p>
        </div>
        <div className="w-full md:w-1/2 mb-8">
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            <li>Integrity</li>
            <li>Innovation</li>
            <li>Customer Satisfaction</li>
            <li>Teamwork</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 mb-8">
          <h2 className="text-xl font-semibold mb-2">Join Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Interested in joining our team? Visit our Careers page for current job openings
            and opportunities.
          </p>
          <a href="/" className="text-blue-600 hover:underline inline-block mt-2 transition duration-300 ease-in-out transform hover:scale-105">Explore Careers</a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
