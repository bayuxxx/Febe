import React from "react";

const Teams = () => {
  return (
    <section id="teams" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Tech Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our talented developers and engineers who bring innovation to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Fullstack Developers */}
          <TeamCard
            image="https://randomuser.me/api/portraits/men/1.jpg"
            name="Pira"
            role="UI/UX Designer"
            linkedin="https://linkedin.com/in/alexjohnson"
          />
          <TeamCard
            image="https://randomuser.me/api/portraits/men/4.jpg"
            name="I Gede Bayu Balawa Tangub"
            role="Fullstack Developer"
            linkedin="https://linkedin.com/in/bayuxxx"
          />
          <TeamCard
            image="https://randomuser.me/api/portraits/men/2.jpg"
            name="Desi"
            role="Front End Developer"
            linkedin="https://linkedin.com/in/davidkim"
          />

          {/* Machine Learning Engineers */}
          <TeamCard
            image="https://randomuser.me/api/portraits/women/2.jpg"
            name="Ghani"
            role="Machine Learning Engineer"
            linkedin="https://linkedin.com/in/emilyrodriguez"
          />
          <TeamCard
            image="https://randomuser.me/api/portraits/men/3.jpg"
            name="rifky"
            role="Machine Learning Engineer"
            linkedin="https://linkedin.com/in/michaelzhang"
          />
          <TeamCard
            image="https://randomuser.me/api/portraits/women/3.jpg"
            name="Gevira"
            role="Machine Learning Engineer"
            linkedin="https://linkedin.com/in/lisaparker"
          />
        </div>
      </div>
    </section>
  );
};

const TeamCard = ({ image, name, role, linkedin }) => {
  return (
    <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100">
      <div className="mb-6 overflow-hidden rounded-full w-48 h-48 mx-auto">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center whitespace-nowrap overflow-hidden text-ellipsis px-2">
        {name}
      </h3>
      <p className="text-gray-600 mb-6 text-center font-medium">{role}</p>
      <div className="text-center">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-2 bg-[#0077b5] hover:bg-[#006699] text-white rounded-lg transition-colors duration-300"
        >
          Connect on LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Teams;