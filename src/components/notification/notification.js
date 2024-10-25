import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { BiSolidError } from "react-icons/bi";
import { motion } from "framer-motion";
const NotificationDialog = ({
  props
}) => {

  const [show, setShow] = useState(true)

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(!show)
      }, [5000])
    }
  }, [show])

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-40"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition show={show}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="notification"
              style={{
                color: "white",
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
            >
              <div className="pointer-events-auto w-[300px] border-[1px] border-[#FFFFFF33] overflow-hidden rounded-lg bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
                <div className="flex w-full p-4">
                  {
                    props &&
                    <div className="w-full">
                      <div className='flex gap-1 items-center' >
                        <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
                        <p className="text-sm font-medium text-green-500"> Success! {props} </p>
                      </div>
                      <p className="mt-1 text-sm text-white">
                        
                      </p>
                    </div>
                  }

                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setShow(false)
                      }}
                      className="inline-flex rounded-md bg-zinc-800 text-white hover:text-white"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </Transition>
        </div >
      </div >
    </>
  )
}

export default NotificationDialog
