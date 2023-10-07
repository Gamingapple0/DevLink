// Import necessary modules and styles
import './ProjectConditions.css';
import { storage } from '../firebase.js';
import { ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

// Define and export the ProjectConditions component
export default function ProjectConditions(props) {
    // State variables for image and URL
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');

    // Function to handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        props.setImage(file);
    };

    // Function to handle image upload
    const handleUpload = async () => {
        const imageRef = ref(storage, `images/${props.image.name}`);
        await uploadBytes(imageRef, props.image);
    };

    return (
        <>
            <form>
                <div className="form-cont project-cond">
                    <h2 className="head-form">Project Conditions</h2>

                    {/* Project Length */}
                    <div className="project-cond-length">
                        <h3>Project length</h3>
                        <input
                            onChange={(e) => {
                                props.setJobData((prev) => {
                                    return {
                                        ...prev,
                                        length: e.target.value,
                                    };
                                });
                            }}
                        ></input>
                    </div>

                    {/* Payment Range */}
                    <div className="project-cond-payment">
                        <h3>Payment</h3>
                        <div className="payment-min-max">
                            <h3>Min</h3>
                            <input
                                type="number"
                                onChange={(e) => {
                                    props.setJobData((prev) => {
                                        return {
                                            ...prev,
                                            min: parseFloat(e.target.value),
                                        };
                                    });
                                }}
                            ></input>
                            <h3>Max</h3>
                            <input
                                type="number"
                                onChange={(e) => {
                                    props.setJobData((prev) => {
                                        return {
                                            ...prev,
                                            max: parseFloat(e.target.value),
                                        };
                                    });
                                }}
                            ></input>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="project-cond-hours">
                        <h3>Working Hours</h3>
                        <input
                            type="number"
                            onChange={(e) => {
                                props.setJobData((prev) => {
                                    return {
                                        ...prev,
                                        hours: parseFloat(e.target.value),
                                    };
                                });
                            }}
                        ></input>
                    </div>

                    {/* Image Upload */}
                    <div className="project-img">
                        <label htmlFor="image">Select an Image:</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            style={{ height: "30px" }}
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Display uploaded image */}
                    {url && <img src={url} alt="Uploaded" />}
                </div>
            </form>
        </>
    );
}
