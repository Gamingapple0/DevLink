import './Error.css'

// Error component for displaying login error messages
function Error(props) {
  return (
    <div className="login-error">
      {props.reason}
    </div>
  )
}

export default Error;
