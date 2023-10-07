import './Experience.css'

export default function Experience(props) {
  return (
    <>
      {/* Experience form container */}
      <div className="form-cont exp">
        <h2 className="head-form">Experience</h2>
        <div className="inner-exp">
          {/* Input for "Experienced in" */}
          <div className="project-cond-length">
            <h3>Experienced in</h3>
            <input
              onChange={(e) => {
                // Update experience value in the parent component's state
                props.setExtraData((prev) => ({
                  ...prev,
                  experience: e.target.value,
                }));
              }}
            ></input>
          </div>
          {/* Input for "For at least" */}
          <div className="project-cond-length">
            <h3>For at least</h3>
            <input
              type="number"
              onChange={(e) => {
                // Parse years as a floating-point number and update in the parent component's state
                props.setExtraData((prev) => ({
                  ...prev,
                  years: parseFloat(e.target.value),
                }));
              }}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
