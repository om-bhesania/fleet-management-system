import useToast from "../../hooks/useToast";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.options.theme || "light"} ${
            toast.options.position || "top-right"
          }`}
          onClick={() => removeToast(toast.id)}
        >
          <div className={`toast-${toast.options.type || "info"}`}>
            {toast.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
