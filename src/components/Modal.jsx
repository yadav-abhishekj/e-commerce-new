import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  primaryText = "OK",
  secondaryText,
  onPrimary,
  onSecondary,
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-md mx-4 rounded-3xl shadow-2xl p-8 animate-modalEnter">
        {/* Title */}
        {title && (
          <h2 className="text-2xl font-black text-gray-900 mb-4">{title}</h2>
        )}

        {/* Message */}
        <p className="text-gray-600 leading-relaxed mb-6">{message}</p>

        {/* Actions */}
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
