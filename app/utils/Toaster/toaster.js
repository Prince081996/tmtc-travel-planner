import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Toaster = (action, message, onClick) => {
  return action === "success"
    ? toast.success(`${message}`, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    : toast.error(`${message}`, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
};

export default Toaster;
