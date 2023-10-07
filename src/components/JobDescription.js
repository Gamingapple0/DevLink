import './JobDescription.css';
import { useState } from 'react';


export default function JobDescription(props) {
    return (
        <>
            <div className="job-desc form-cont">
                <h2 className="head-form">Describe your job</h2>
                <div className="job-desc-pos">
                    <h3>Title/Position</h3>
                    <input
                        onChange={(e) => {
                            props.setJobData((prev) => {
                                return { ...prev, title: e.target.value };
                            });
                        }}
                    ></input>
                </div>
                <div className="job-desc-desc">
                    <h3>Job description</h3>
                    <textarea
                        style={{ marginLeft: '18px' }}
                        onChange={(e) => {
                            props.setJobData((prev) => {
                                return { ...prev, description: e.target.value };
                            });
                        }}
                    ></textarea>
                </div>
                <div className="job-desc-skills">
                    <h3>Skills</h3>
                    <input
                        onChange={(e) => {
                            props.setJobData((prev) => {
                                return { ...prev, skills: e.target.value };
                            });
                        }}
                        placeholder="Please add skills separated with commas e.g. Java, React"
                    ></input>
                </div>
                <h4>Developers will find your job based on the skills you added here</h4>
            </div>
        </>
    );
}
