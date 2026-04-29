import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckOut = ({data}) => {
     const stripe = useStripe();
  const elements = useElements();
  const [clientSecret,setClientSecret]=useState('')
  const axiosSecure=useAxiosSecure()
  const {user,loading}=useContext(AuthContext)
  const [error,setError]=useState('')
  const [transactionId,setTransactionId]=useState('')
 
   const totalPrice=data.reduce((total,item)=>total+item.offer,0)
  useEffect(() => {
        if (totalPrice > 0) { // ✅ avoid creating intent for empty/zero cart
            axiosSecure.post('/create-checkout-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure,totalPrice]);


if(loading){
    return <p>please wait...</p>
}

  const handleSubmit=async(event)=>{
    event.preventDefault()
    if(!stripe || !elements){
        return;
    }

    const card=elements.getElement(CardElement)
    if(card==null) return;

    const {error,paymentMethod}=await stripe.createPaymentMethod({
        type:'card',
        card
    })
    if(error){
        setError(error.message)
    }else{
        console.log('paymentMethod');
    }
    const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
          card,
          billing_details:{
            name:user?.displayName,
            email:user.email
          }
        }
    })
    if(confirmError){
        setError(confirmError.message)
        return
    }
     if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            Swal.fire({
                      title: `Thank You ${user.displayName} for Payment....`,
                      icon: "success",
                      draggable: true
                    });

            const payment = {
                email: user.email,
                title:data.map(item=>item.title),
                location:data.map(item=>item.location),
                name:user.displayName,
                price: totalPrice,
                cartIds: data.map(item => item._id),
                propertyIds: data.map(item => item.propertyId),
                transactionId: paymentIntent.id,
                 agentName:data.map(item=>item.agentName),
                date: new Date(),
            };

           
            axiosSecure.post('/payment', payment)
                .then(res => {
                    // console.log(res.data);
                    if (res.data?.insertedId) {
                        // refetch(); // ✅ clear the cart from UI after payment recorded
                    }
                });
        }
  }

    return (
     <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                />
                <button
                    className='btn btn-sm btn-primary my-3'
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
                <p className='text-red-600'>{error}</p>
                {transactionId && (
                  <div className="badge badge-dash ">Your transaction Id: <span className='text-green-600'> {transactionId} </span> </div>
                )}
            </form>
        </div>
    );
};

export default CheckOut;