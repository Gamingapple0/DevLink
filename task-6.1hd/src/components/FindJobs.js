import "./FindJobs.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { CardJ } from "./Card";
import { useEffect, useState } from "react";
import React from "react";
import DropdownMenu from "./Dropdown.js";

// Global variable to store fetched job data from Firestore.
var jobJSON;

// Function to fetch job documents from Firestore
export const fetchDocs = async () => {
  const querySnapshot = await getDocs(collection(db, "jobs"));
  const cards = [];
  jobJSON = querySnapshot.docs.map((doc) => doc.data());

  querySnapshot.forEach((doc) => {
    const jobData = doc.data();
    const skills = jobData.skills ? jobData.skills.split(",") : [];

    // Create a CardJ component based on jobData
    const card = (
      <CardJ
        key={doc.id}
        title={jobData.title}
        desc={jobData.description}
        img={jobData.image}
        type={jobData.type}
        skills={skills}
        length={jobData.length}
        min={jobData.min}
        max={jobData.max}
        hours={jobData.hours}
        experience={jobData.experience}
        years={jobData.years}
        user={jobData.user}
      />
    );

    cards.push(card);
  });
  
  return cards;
};

export default function FindJobs() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState(cards);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedCards = await fetchDocs();
        setCards(fetchedCards);
        setFilteredCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Function to handle search input
  const search = (e) => {
    const inputValue = e.target.value.toLowerCase();
    
    if (option === 'Title') {
      setFilteredCards(
        cards.filter((card) => {
          const cardTitle = card.props.title.toLowerCase();
          return inputValue === "" ? card : cardTitle.includes(inputValue) ? card : null;
        })
      );
    } else {
      setFilteredCards(
        cards.filter((card) => {
          const cardTitle = card.props.skills.join(" ").toLowerCase();
          return inputValue === "" ? card : cardTitle.includes(inputValue) ? card : null;
        })
      );
    }
  };

  const [option, setOption] = useState();
  
  return (
    <div>
      <br />
      <br />
      <br />
      <div class="ui search">
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            onChange={(e) => {
              search(e);
            }}
            placeholder="Search job..."
          />
          <i class="search icon"></i>
        </div>
        <DropdownMenu setOption={setOption}></DropdownMenu>
      </div>
      <div class="job-cards">
        {filteredCards}
      </div>
    </div>
  );
}
