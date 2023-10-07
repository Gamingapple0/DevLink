import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

// Load environment variables
const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const CLIENT_SECRET = process.env.REACT_APP_STRIPE_CLIENT_SECRET;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <Elements stripe={stripeTestPromise}>
        <PaymentForm clientSecret={CLIENT_SECRET} />
      </Elements>
    </>
  );
}
