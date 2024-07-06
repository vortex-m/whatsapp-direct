import React, { useState, useEffect } from "react";
import { RiMailSendLine } from "react-icons/ri";

const Body = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const placeholderTexts = [
    "Enter Phone Number",
    "With Dial Code...",
    "91 9199919991",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (wordIndex < placeholderTexts[placeholderIndex].length - 1) {
        setWordIndex(wordIndex + 1);
      } else {
        setWordIndex(0);
        setPlaceholderIndex((placeholderIndex + 1) % placeholderTexts.length);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [wordIndex, placeholderIndex]);

  const handleInputChange = (e) => {
    let number = e.target.value.replace("+", "").replace(/ /g, "");
    if (e.target.value.length > 6) {
      number = e.target.value;
    }
    setMobileNumber(number);
  };

  const handleKeyPress = (e) => {
    if (mobileNumber.length > 6 && (e.key === "Enter" || e.keyCode === 13)) {
      openWhatsApp();
    }
  };

  const openWhatsApp = () => {
    let url = "https://wa.me/" + mobileNumber;
    window.open(url, "_blank").focus();
  };

  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("sw.js")
        .then((registration) => console.log("SW registered"))
        .catch((err) => console.log("SW registration failed", err));
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setInstallPrompt(null);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-6 h-[80svh]">
        <div className="relative w-full max-w-lg">
          <form>
            <div className="relative border bg-prime w-full rounded-full flex items-center">
              <input
                placeholder={placeholderTexts[placeholderIndex].substring(
                  0,
                  wordIndex
                )}
                name="mobile-number"
                id="mobile-number"
                type="tel"
                className="w-full bg-prime rounded-full h-16 text-xl px-10 py-2 outline-none"
                value={mobileNumber}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                disabled={mobileNumber.length <= 6}
                id="send-btn"
                type="button"
                className="h-10 w-1/4 mt-3 font-semibold text-white shadow-lg hover:bg-green-400 rounded-lg bg-green-500 bg-center"
                onClick={openWhatsApp}
              >
                <div className="flex justify-center items-center gap-2">
                  Message{" "}
                  <span className="mt-0.5">
                    <RiMailSendLine size={20} />
                  </span>
                </div>
              </button>
            </div>
          </form>
        </div>
        <p className="text-center px-4 max-w-6xl">
          How to send a WhatsApp message without saving the phone number? That's
          precisely what this WhatsApp direct service is designed for. If you
          want to send a WhatsApp message without the hassle of adding someone
          to your contact list, this service is ideal for you. Avoid cluttering
          your contacts with every person you ever message. This service is here
          to help.
        </p>
        <div className="w-full h-0.5 bg-gray-300 max-w-6xl"></div>
        <h2 className="max-w-6xl px-4">
          <span className="text-red-500 font-semibold">Note:</span>
          <br />
          <strong>
            No login or registration is required on this website. An active
            WhatsApp account is all you need. Rest assured, this site does not
            use cookies and is designed with your privacy in mind.
          </strong>
        </h2>
      </div>
    </>
  );
};

export default Body;
