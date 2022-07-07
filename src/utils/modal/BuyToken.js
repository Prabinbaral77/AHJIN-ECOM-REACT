import React, { useContext, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AjhinContext } from "../../context/ahjinContext";

const BuyTokenModal = ({ open, handleModal }) => {
  const { tokenAmount, setTokenAmount, amountDue, setAmountDue, buyToken } =
    useContext(AjhinContext);

  useEffect(() => {
    const calculatePrice = () => {
      let price = parseFloat(tokenAmount * 0.0001);
      price = price.toFixed(4);
      setAmountDue(price);
    };
    calculatePrice();
  }, [tokenAmount]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="bg-[#1F2937]">
      <Modal
        centered
        fullscreen=""
        size="lg"
        isOpen={open}
        toggle={handleModal}
        className="w-full rounded-full "
      >
        <ModalHeader className=" font-bold text-xl flex text-center mx-auto">
          AHJIN COIN Details:
        </ModalHeader>
        <ModalBody>
          <div className="text-3xl font-bold flex justify-center">
            Buy More Ahjin Coin Here.
          </div>
          <div className="flex text-xl justify-center mt-4 mb-4">
            Select How many token you want to buy.
          </div>
          <div className="w-[50%]   rounded-lg p-[10px] flex mx-auto mb-4">
            <input
              type="text"
              placeholder="Token Amount"
              onChange={(e) => setTokenAmount(e.target.value)}
              value={tokenAmount}
              className="w-[70%] p-4 text-xl flex items-center justify-center bg-[#f7f6f2] mx-auto border-2 border-gray-900 rounded-xl"
            />
          </div>
          <div className="w-full h-full flex items-center justify-center  font-bold text-3xl">
            Total Due: {""}
            {tokenAmount && tokenAmount > 0 ? amountDue + "ETH" : "0 ETH"}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleModal} className="bg-red-600 hover:bg-red-500">
            Cancel
          </Button>
          <Button onClick={buyToken} className="bg-blue-600 hover:bg-red-500">
            Request For Token
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default BuyTokenModal;
