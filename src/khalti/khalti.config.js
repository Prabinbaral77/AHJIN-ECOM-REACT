import axios from "axios";
import { useSelector } from "react-redux";

let config = {
  // replace this key with yours
  publicKey: "test_public_key_ad21e5a28b0c4a46bec1e93f7144d126",
  productIdentity: "1857",
  productName: "AHJIN Ecommerce",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      let config = {
        headers: {
          Authorization: "test_secret_key_2207b50cd52144c1b0e7fffdf8158f23",
        },
      };

      axios
        .post(`http://0.0.0.0:8000/api/khalti/pay`, data)
        .then((response) => {
          console.log("WOW SUCCESS");
          const paymentMethod = "K";
          // axios.post(
          //   "http://0.0.0.0:8000/api/user/login/",
          //   {
          //     // ...data
          //   },
          //   {
          //     headers: {
          //       authorization: `Bearer ${accessToken}`,
          //     },
          //   }
          // );
        })
        .catch((error) => {
          console.log("WTF", error);
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
