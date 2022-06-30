import axios from "axios";

let config = {
  // replace this key with yours
  publicKey: "test_public_key_498f69f02b8f4eada26339a6add4a976",
  productIdentity: "1857",
  productName: "AHJIN Ecommerce",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      let config = {
        headers: {
          Authorization: "test_secret_key_03be0d8b8acd4e099a4a95bf5caa1fc0",
        },
      };

      axios
        .post("http://localhost:8000/api/orders/khalti/pay/", data, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      // axios
      //   .post(`/api/orders/khalti/pay/`, data)
      //   .then((response) => {
      //     payOrder({ paymentResult: payload, paymentMethod: "Khalti" });
      //     console.log("WOW SUCCESS", response.data);
      //   })
      //   .catch((error) => {
      //     console.log("UFF", error);
      //   });
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
