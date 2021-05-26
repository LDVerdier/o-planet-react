import { toast } from 'react-toastify';

export default (() => {
  const info = (message, config = {}) => {
    toast.info((message), {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...config,
    });
  };
  const error = (message = 'Une erreur s\'est produite', config = {}) => {
    toast.error((message), {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...config,
    });
  };

  return {
    info,
    error,
  };
})();
