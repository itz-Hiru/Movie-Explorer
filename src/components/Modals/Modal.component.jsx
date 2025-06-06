const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-white/20">
      <div
        className={`relative flex flex-col bg-black shadow-lg rounded-lg overflow-hidden`}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="md:text-lg font-medium text-black">{title}</h3>
            {showActionBtn && (
              <button
                className="btn-small-light mr-12"
                onClick={() => onActionClick()}
              >
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}
        <button
          className="text-white bg-black hover:bg-white hover:text-black rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
