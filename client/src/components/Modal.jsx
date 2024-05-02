import {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline';

export default function Modal({
  title,
  message,
  dangerOption,
  cancelOption,
  dangerAction,
  cancelAction,
  showModal,
}) {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const handleDanger = () => {
    setOpen(false);
    dangerAction();
  };

  const handleCancel = () => {
    setOpen(false);
    cancelAction();
  };

  useEffect(() => {
    if (showModal) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [showModal]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="modal_wrapper">
                <div className="modal-details">
                  <ExclamationTriangleIcon
                    className="modal-icon h-12 w-12 text-red-600"
                    aria-hidden="true"
                  />
                  <div className="">
                    <Dialog.Title as="h3" className="text-lg font-bold ">
                      {title}
                    </Dialog.Title>
                    <div className="">
                      <p className="text-sm">{message}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-btn">
                  <button
                    type="button"
                    className="modal-cancel_btn"
                    onClick={handleCancel}
                    ref={cancelButtonRef}>
                    {cancelOption}
                  </button>
                  <button
                    type="button"
                    className="modal-danger_btn"
                    onClick={handleDanger}>
                    {dangerOption}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
