import React, { useState, Fragment } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch('https://e9c61hf4pb.execute-api.us-east-2.amazonaws.com/default/amrutaCompliment')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    console.log(data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    fetchData();
    setIsClicked(true);
    setParticlesVisible(true);
    openModal();

    setTimeout(() => {
      setIsClicked(false);
    }, 100)

    setTimeout(() => {
      setParticlesVisible(false);
    }, 700);
  };

  const particles = [];
  const tStep = (2 * Math.PI) / 30;
  for (let i = 0; i < 30; i++) {
    const t = i * tStep;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const randomColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
    const scaleFactor = -12;
    particles.push(
      <motion.div
        key={i}
        className={`absolute w-2 h-2 rounded-full`}
        style={{
          backgroundColor: randomColor,
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ opacity: 1, scale: 0 }}
        animate={{
          x: [0, x * scaleFactor, x * scaleFactor],
          y: [0, y * scaleFactor, y * scaleFactor],
          scale: [1, 1.5, 0],
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 1.5, // Adjust this duration as needed
          ease: 'easeOut',
          times: [0, 0.2, 1],
        }}
      />
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-none overscroll-none">
      <div className="w-full max-w-[250px] relative">
        <motion.div
          className="text-white text-center fill-pink-400"
          onClick={handleClick}
          initial={{ scale: 1 }}
          animate={{ scale: isClicked ? 0.8 : 1 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 400 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>
        </motion.div>
        <AnimatePresence>{particlesVisible && <>{particles}</>}</AnimatePresence>
      </div>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Here's something I love about you:
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 text-center">
                      {data}
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default App;
