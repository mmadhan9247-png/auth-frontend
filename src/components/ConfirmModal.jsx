import React from "react";

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative z-50 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/80">
        <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
        {message && <p className="mt-2 text-xs text-slate-300">{message}</p>}
        <div className="mt-5 flex justify-end gap-2 text-xs">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-800"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full border border-rose-600/80 bg-rose-600/20 px-3 py-1.5 font-medium text-rose-100 hover:bg-rose-600/30"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
