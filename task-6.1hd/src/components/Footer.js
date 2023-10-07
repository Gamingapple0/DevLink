import { Icon } from "semantic-ui-react"
import './Footer.css' 

function Footer(){
    return(
        <div className="footer-wrapper">
            <div className="web-footer">
                {/* Developer Information */}
                <div className="dev-footer">
                    <h3>About DevLinks</h3>
                    <h4>&copy; 2023 DevLinks</h4>
                    <h4>Business Hours: 9-5 AEST</h4>
                    <h4>Site Version: 2.3</h4>
                </div>

                {/* Contact Information */}
                <div className="client-footer">
                    <h3>For Contact</h3>
                    <h4>
                    <a href="tel:+610406973781">Phone Number: +61 0406973781</a>
                    </h4>
                    <h4>Address: <a href="https://www.google.com/maps?q=620+Collins+Street">620 Collins Street</a></h4>
                    <h4>Contact Email: <a href="mailto:madhikarmianshu@gmail.com">madhikarmianshu@gmail.com</a></h4>
                </div>

                {/* Social Media Links */}
                <div className="link-footer">
                    <h3  style={{marginBottom:"15px"}}>Stay Connected</h3>
                    <div>
                        <a href="https://www.facebook.com/anshumadhikarmi">
                            <Icon name="facebook" />
                        </a>

                        <a href="https://twitter.com/AnshuMadhikarmi">
                            <Icon name="twitter"/>
                        </a>

                        <a href="https://www.instagram.com/anshumadhikarmi/">
                            <Icon name="instagram"/>
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Additional Footer Content */}
            <div className="etc-footer">
            </div>
            
            <br></br>
            <br></br>
        </div>
    )
}

export default Footer
