import React, { useEffect, useState } from "react";
import "./Body.css";
import CardT from "./Card";
import { Button } from "semantic-ui-react";
import News from "./News";
import Chatbot from "./Chatbot";
import { useNavigate } from "react-router";
import { fetchDocs } from "./FindJobs";

function Body() {
  // Initialize the navigation hook
  const nav = useNavigate();

  // Sample data for featured developers
  const dev_data = [
    {
      img: "https://picsum.photos/240",
      name: "Will Smith",
      desc: "Robotics Developer",
      education: "Bachelor of Computer Science",
      email: "will.smith@email.com",
      availability: "Open to new robotics projects",
      star: 5,
    },
    {
      img: "https://picsum.photos/212",
      name: "Jackie Stone",
      desc: "React Developer",
      education: "Bachelor of Science in Computer Engineering",
      email: "jackie.stone@email.com",
      availability: "Available for React development opportunities.",
      star: 4.5,
    },
    {
      img: "https://picsum.photos/220",
      name: "Bruno Oswald",
      desc: "Java Developer",
      education: "Bachelor of Computer Science",
      email: "bruno.oswald@email.com",
      availability: "Java projects.",
      star: 4,
    },
  ];

  // Map developer data to Card components
  const dev_cards = dev_data.map((data) => (
    <CardT
      key={data.email} // Provide a unique key for each card
      skills={data.skills}
      education={data.education}
      email={data.email}
      availability={data.availability}
      img={data.img}
      name={data.name}
      desc={data.desc}
      star={data.star}
    />
  ));

  // Function to navigate to the login page
  const loginNav = () => {
    nav("/login");
  };

  // Function to navigate to the jobs page
  const jobsNav = () => {
    nav("/jobs");
  };

  // State to store featured job cards
  const [featuredCards, setFeaturedCards] = useState([]);

  useEffect(() => {
    // Fetch featured job data when the component mounts
    const fetchFeaturedJobs = async () => {
      try {
        const result = await fetchDocs();
        const slicedResult = result.slice(0, 3);
        setFeaturedCards(slicedResult);
        console.log("Fetched featured jobs");
      } catch (error) {
        // Handle error here (e.g., show an error message to the user)
        console.error("Error fetching featured jobs:", error);
      }
    };

    // Call the fetchFeaturedJobs function
    fetchFeaturedJobs();
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div>
      {/* Section 1: Welcome Banner */}
      <section id="section-1">
        <div className="content-slider">
          <input
            type="radio"
            id="banner1"
            className="sec-1-input"
            name="banner"
            checked
          />
          <div class="slider">
            <div id="top-banner-1" class="banner">
              <div className="banner-inner-wrapper">
                <h1>Welcome to DevLinks Marketplace</h1>
                <div className="line"></div>
                <div className="learn-more-button">
                  <a id="landing-button" onClick={loginNav}>
                    Sign-In
                  </a>
                </div>
              </div>
            </div>
          </div>
          <nav></nav>
        </div>
      </section>

      {/* Section 2: Featured Jobs */}
      <h2 className="title">Featured Jobs</h2>
      <div className="cards">{featuredCards}</div>
      <Button onClick={jobsNav}>See More</Button>

      {/* Section 3: Featured Developers */}
      <h2 className="title">Featured Developers</h2>
      <div className="cards">{dev_cards}</div>

      {/* Section 4: News */}
      <News />

      {/* Section 5: Chatbot */}
      <Chatbot />
    </div>
  );
}

export default Body;
