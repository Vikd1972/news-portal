import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message: string) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    transition: Flip,
  });
};

export default showToast;
