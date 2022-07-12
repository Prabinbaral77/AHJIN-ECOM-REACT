import { PaperAirplaneIcon } from "@heroicons/react/outline";
import React from "react";

function Newsletter() {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div
      className={
        "h-96 transition-all w-full px-6 mt-4 bg-gray-800 shadow-sm flex justify-center items-center flex-col space-y-6 text-gray-100 "
      }
    >
      <h1 className="text-7xl font-serif">Newsletter</h1>

      <p className="text-lg font-mono text-center">
        Get timely updates of your favorite products
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex lg:w-1/2 w-full rounded-l-lg h-10 items-center justify-center"
      >
        <input
          type="email"
          placeholder="Your email"
          className={
            " h-full rounded-l-xl pl-2 outline-none w-screen bg-gray-700 text-gray-100 "
          }
        />
        <a
          target="_blank"
          // rel="noopener noreferrer"
          href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBmzhGwpLMpztTbhjMRcZsdTcDMRWcHXfkJlBbdFwBKhfwxTClGfNRVfLzxQGmzkBWnCsvg"
          send
          mail
          // onClick={sendMail}
        >
          <PaperAirplaneIcon className="h-10 w-10 p-1 rotate-90 bg-green-700 text-gray-200 rounded-t-lg cursor-pointer " />
        </a>
      </form>
    </div>
  );
}

export default Newsletter;
