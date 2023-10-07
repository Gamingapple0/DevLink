import { useState } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../firebase.js'; // Import your Firestore configuration
import JobDescription from "./JobDescription";
import ProjectConditions from "./ProjectConditions";
import Experience from "./Experience";
import './NewJob.css'
import { storage } from '../firebase.js';
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage';
import { doc, addDoc, collection, put } from "firebase/firestore"; 
import { useAuth } from '../contexts/AuthContext.js';

export default function NewJob() {
  const [isEmployment, setIsEmployment] = useState(true);
  const { user } = useAuth();
  const [jobData, setJobData] = useState({
    // Initialize with default values
    title: '',
    description: '',
    skills: '',
    length: '',
    min: 0,
    max: 0,
    hours: 0,
    image: '',
    user: user.displayName,
    type: 'freelance'
    // Add other job data fields here
  });

  const [extraData, setExtraData] = useState({
    experience: '',
    years: 0
  })

  const [image, setImage] = useState(null);

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmployment) {
      console.log(true)
      console.log(jobData)

      const newishJobData = {
        ...jobData,
        ...extraData,
        type: 'employment'
      }
    } else {
      const newishJobData = {
        ...jobData,
        ...extraData,
        type: 'employment'
      }
    }
    try {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);

      // Add the document to Firestore

      // Upload the image bytes
      await uploadBytes(imageRef, image);

      // Get the download URL of the uploaded image
      const downloadUrl = await getDownloadURL(imageRef);

      // Update the state with the download URL

      setJobData((prev) => ({
        ...prev,
        image: downloadUrl,
      }));

      var newJobData = { ...jobData, image: downloadUrl }

      if (isEmployment) {
        newJobData = {
          ...newJobData,
          ...extraData,
          type: 'employment'
        }
      }

      // Navigate to the next step
      if (isEmployment) {
        nav('/payment', { state: { newJobData } }); // Note the use of { state: { newJobData } }
      } else {
        const docRef = await addDoc(collection(db, 'jobs'), newJobData);
        console.log(jobData)
        nav('/jobs')
      }

      console.log('Job posting saved to Firestore with image URL.');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="new-job">
        <form className="job-form" onSubmit={handleSubmit}>
          <h2>New Job</h2>
          <div className="job-sel">
            <span>Select Job Type: </span>
            <input id="freelance" type="radio" name="job" checked={!isEmployment} onChange={() => setIsEmployment(false)} value="freelance" />
            <label htmlFor="freelance">Freelance</label>
            <input id="employment" name="job" type="radio" onChange={() => setIsEmployment(true)} value="employment" checked={isEmployment}></input>
            <label htmlFor="employment">Employment</label>
          </div>
          <JobDescription setJobData={setJobData}></JobDescription>
          <ProjectConditions setJobData={setJobData} setImage={setImage} image={image}></ProjectConditions>
          {isEmployment && <Experience setExtraData={setExtraData}></Experience>}
          <div className="submit-job">
            <button type="submit">{isEmployment ? "Pay" : "Post"}</button>
          </div>
        </form>
      </div>
    </>
  );
}
