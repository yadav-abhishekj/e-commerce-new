import { useEffect } from "react";

function GlobalModal({
  title,
  message,
  primaryText = "OK",
  secondaryText,
  onPrimary,
  onSecondary,
  onClose,
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md mx-4 rounded-3xl shadow-2xl p-8 animate-modalEnter">
        {title && (
          <h2 className="text-2xl font-black text-gray-900 mb-4">{title}</h2>
        )}

        <p className="text-gray-600 leading-relaxed mb-6">{message}</p>

        <div className="flex justify-end gap-4">
          {secondaryText && (
            <button
              onClick={onSecondary || onClose}
              className="px-6 py-3 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              {secondaryText}
            </button>
          )}

          <button
            onClick={onPrimary || onClose}
            className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/20"
          >
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GlobalModal;
