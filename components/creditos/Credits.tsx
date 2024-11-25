import React from "react";

const teamMembers = [
  {
    name: "Dany",
    title: "Product Manager",
    image: "/danyclutch.jpeg",
  },
  {
    name: "Yael",
    title: "Senior Developer",
    image: "/yaelclutch.jpg",
  },
];

const Credits: React.FC = () => {
  return (
    <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-2">
      {teamMembers.map((member, index) => (
        <div className="person text-center" key={index}>
          <div className="container flex justify-center">
            <img
              className="circle w-72 h-72 rounded-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 border-4"
              src={member.image}
              alt={member.name}
              style={{ borderColor: "#8fbdd3" }}
            />
          </div>
          <div className="name">{member.name}</div>
          <div className="title">{member.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Credits;
