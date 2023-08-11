import { useEffect, useState } from "react";
import db from "./firebasefile";
import classes from "./PlansScreen.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice"; 

// Plans component to display all plans fetched from database
function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    db.collection("customers")
      .doc(user?.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user?.uid]);
  // console.log(subscription);
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  // console.log(products);
  // console.log(user?.uid);
  const unsubscribe = async () => {
    setSubscription({
      role: 'Nan',
      current_period_end: null,
      current_period_start: null,
    });
    const docRef = await db.collection("customers")
      // .doc(user?.uid)
      // .collection("subscriptions")
      // .add(
      //   {
      //     role: 'Nan',
      //     current_period_end: 0,
      //     current_period_start: 0,
      //   }
      // )
      // docRef.onSnapshot((snap) => {
      //   const { error, url } = snap.data();
      //   // console.log(snap)
      //   if (error) {
      //     // Show an error to the customer and
      //     // inspect your Cloud Function logs in the Firebase console.
      //     alert(`An error occured: ${error.message}`);
      //   }
      //   if (url) {
      //     //  Stripe Checkout URL, redirect.
      //     window.location.assign(url);
      //   }
      // });
      const snapshot = await docRef
      .doc(user?.uid)
      .collection("subscriptions")
      .get();
      snapshot.forEach((snap) => {
        snap.ref.delete()
        // console.log(snap);
      });
  }
  const loadCheckout = async (priceId) => {
    // console.log(priceId)
    // console.log("Ashish" + user.uid);

    // const docRef = await db
    //   .collection("customers")
    //   .doc(user.uid)
    //   .collection("checkout_session")
    //   .add({
    //     price: priceId,
    //     success_url: window.location.origin,
    //     cancel_url: window.location.origin,
    //   });
    // docRef.onSnapshot(async (snap) => {
    //   console.log(snap.data());
    //   const { error, sessionId } = snap.data();

    //   if (error) {
    //     alert(`An error occured: ${error.message}`);
    //   }

    //   if (sessionId) {
    //     const stripe = await loadStripe(
    //       "rk_test_51NLTAuSHyag4YdKgptKPjFUhyjpIcYIQbX5tT2B9WBggjORofkcubVI1vSItC9SxXAsSmkSBi4K0k5UT7tDY8MxL00zC8Orhh9"
    //     );
    //     stripe.redirectToCheckout({sessionId})
    //   }
    // });
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
      console.log(db
        .collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions"));
    // Wait for the CheckoutSession to get attached by the extension
    docRef.onSnapshot((snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to the customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        //  Stripe Checkout URL, redirect.
        window.location.assign(url);
      }
    });
  };
  return (
    <div className={classes.plansScreen}>
      {subscription && (
        <p>
          Plan renews on :{" "}
          {subscription?.current_period_end!==null?
          new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString():'No active plan'
          }
        </p>
      )}
      <h2>Popular Plans :</h2>
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.includes(subscription?.role);
        return (
          <div
            className={
              isCurrentPackage
                ? classes.plansScreen__plan__disabled
                : classes.plansScreen__plan
            }
          >
            <div className={classes.plansScreen__info}>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
              <h6>{productData.prices!=undefined?'INR:' +productData.prices.priceData.unit_amount/100 + '/-':''}</h6>
            </div>
            <button
              className={classes.plansScreen__button}
              onClick={() => {
                isCurrentPackage?unsubscribe():loadCheckout(productData.prices.priceId
              )}}
            >
              {isCurrentPackage ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;