import "./Card.css";
import { Card, Icon, Image, Rating } from "semantic-ui-react";
import { useState } from "react";
import { useNavigate } from "react-router";

// CardT component for displaying teacher cards
function CardT(props) {
  const [expand, setExpand] = useState(false);

  // Expand/collapse card
  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <>
      {/* Teacher Card */}
      <Card style={{ height: expand ? 'max-content' : 'max-content' }}>
        <Image src={props.img} wrapped ui={false} />
        <div onClick={toggleExpand} className="expand-click">
          <Card.Content>
            <Card.Header>{props.name}</Card.Header>
            <Card.Description>{props.desc}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Rating />
            {props.star}
          </Card.Content>
        </div>
        
        {/* Conditionally render the additional details */}
        <div className={`card-details ${expand ? "expand" : ""}`}>
          {/* Additional teacher details */}
          <div>Education: {props.education}</div>
          <div>E-mail: {props.email}</div>
          <div>Looking For: {props.availability}</div>
        </div>
      </Card>
    </>
  );
}

// CardJ component for displaying job cards
export function CardJ(props) {
  const [show, setShow] = useState(true);
  const [expand, setExpand] = useState(false);
  const nav = useNavigate();

  // Toggle show/hide card details
  const toggleShow = () => {
    setShow(!show);
  };

  // Expand/collapse card
  const toggleExpand = () => {
    setExpand(!expand);
  };

  // Handle chat button click
  const sendChat = () => {
    nav("/chats");
  
    // Use setTimeout to delay showing the alert by 1500 milliseconds (1.5 seconds)
    setTimeout(() => {
      alert("Start Chat with user: " + props.user);
    }, 1500);
  };

  return (
    <>
      {show && (
        // Job Card
        <Card style={{ height: expand ? 'max-content' : 'max-content' }}>
          <i onClick={toggleShow} id="x" className="x icon"></i>
          <Image src={props.img} wrapped ui={false} />
          <div onClick={toggleExpand} className="expand-click">
            <Card.Content>
              <Card.Header>{props.title}</Card.Header>
              <Card.Description>
                {props.desc}
                {props.type}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <ul>
                {props.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </Card.Content>
            <button onClick={sendChat} className="send-chat">Start Chat</button>
          </div>

          {/* Conditionally render the additional details */}
          <div className={`card-details ${expand ? "expand" : ""}`}>
            {/* Additional job details */}
            <div>Length: {props.length}</div>
            <div>Min Pay: ${props.min}</div>
            <div>Max Pay: ${props.max}</div>
            <div>Weekly Hours: {props.hours}</div>
            <div>Posted By: {props.user}</div>
            {props.type === "employment" && (
              <>
                Experienced In: {props.experience}
                <br></br>
                For: {props.years} years
              </>
            )}
          </div>
        </Card>
      )}
    </>
  );
}

export default CardT;
