import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { triggerOrderAfterReward } from "../../redux/products/action";

const UpdateOrderStatus = ({
  open,
  handleModal,
  id,
  paymentMethod,
  setTrigger,
  trigger,
}) => {
  const dispatch = useDispatch;

  const [isDelivered, setIsDelivered] = useState(true);
  const userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const accessToken = userDetail?.access_token;
  const updateModalHandler = () => {
    axios
      .patch(
        `http://localhost:8000/api/orders/${id}`,
        {
          paymentMethod: paymentMethod,
          delivered: isDelivered,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Updated successfully.");
        // dispatch(triggerOrderAfterReward());
        setTrigger(!trigger);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong.");
      });
    handleModal();
  };

  return (
    <div className="bg-[#1F2937]">
      <Toaster />

      <Modal
        fullscreen=""
        size="lg"
        isOpen={open}
        toggle={handleModal}
        className="w-full rounded-full "
      >
        <ModalHeader className=" font-bold text-xl flex text-center mx-auto">
          Order Update
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center justify-center gap-x-[5rem]">
            <div>
              <input
                type="radio"
                id="notdeliverd"
                name="delivered"
                value={isDelivered}
                onClick={() => setIsDelivered(false)}
              />
              <div>
                <label
                  for="notdeliverd"
                  className="bg-yellow-300 cursor-pointer px-2 py-2 rounded-md -ml-5"
                >
                  Not Delivered
                </label>
              </div>
            </div>
            <div>
              <input
                type="radio"
                id="deliverd"
                name="delivered"
                value={isDelivered}
                onClick={() => setIsDelivered(true)}
              />

              <div>
                <label
                  for="deliverd"
                  className="-ml-7 cursor-pointer bg-green-300 px-2 py-2 rounded-md"
                >
                  Delivered
                </label>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleModal} className="bg-red-400 hover:bg-red-500">
            Cancel
          </Button>
          <Button
            onClick={updateModalHandler}
            className="bg-blue-400 hover:bg-blue-500"
          >
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateOrderStatus;
