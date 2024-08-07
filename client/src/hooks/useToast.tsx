import { useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  theme?: "light" | "dark" | "colored";
  type?: "success" | "error" | "info" | "warning";
  message: string;
}

const useToast = () => {
  const notify = useCallback(
    ({
      message,
      theme = "colored",
      type = "info",
      position = "top-right",
      duration = 3000,
    }: ToastOptions) => {
      toast(message, {
        position,
        autoClose: duration,
        theme,
        type,
      });
    },
    []
  );

  return {
    notify,
  };
};

export default useToast;
