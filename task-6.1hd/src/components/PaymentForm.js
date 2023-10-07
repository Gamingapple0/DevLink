import { React, useState } from "react";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useLocation } from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase.js';

// Card element options for styling
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm() {
    const location = useLocation();
    const { state } = location; // Access the state object

    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const paymentResult = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        const error = paymentResult.error;
        const paymentMethod = paymentResult.paymentMethod;

        if (!error) {
            try {
                console.log('sending')
                const {id} = paymentMethod
                const response = await axios.post("https://devlinksmarket.netlify.app:4000/payment",{
                    amount:1000,
                    id:id
                })
                if (true) {
                    console.log(response)
                    console.log("Successful Payment")
                    setSuccess(true)
                    if (state && state.newJobData) {
                        const { newJobData } = state;
                        console.log(newJobData);
                        addDoc(collection(db, 'jobs'), newJobData).then(() => { console.log("Saved") })
                    } 
                }
            }
            catch (e) {
                console.error(e)
            }
        }
    }

    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit} style={{ margin: 'auto', maxWidth: "700px " }}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS}></CardElement>
                        </div>
                    </fieldset>
                    <button className="payment">Pay</button>
                </form>
                :
                <div className="job-posted">
                    <h2>New Job of Type Employment Posted!</h2>
                </div>
            }
        </>
    )
}
