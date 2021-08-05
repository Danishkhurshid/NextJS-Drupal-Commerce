import PaymentForm from '../src/components/PaymentForm';


import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";


export default function Checkout () {
    const stripePromise = loadStripe(process.env.STRIPE_PUB_KEY);
    return (
    <Elements stripe={stripePromise} >
        <PaymentForm />
    </Elements>
  )
}