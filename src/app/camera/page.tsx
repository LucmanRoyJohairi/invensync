'use client';
import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';

export default function Page() {
  const [mode, setMode] = useState(null); // 'choose' | 'upload' | 'capture'
  const [imageSrc, setImageSrc] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const webcamRef = useRef(null);

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setMode(null);
    setShowModal(false);
  };

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImageSrc(screenshot);
    setMode(null);
    setShowModal(false);
  };

  const clear = () => {
    setImageSrc(null);
    setMode(null);
    setShowModal(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full h-full">

      <img
        src={imageSrc || '/default-avatar.png'}
        alt="profile"
        onClick={() => setMode('choose')}
        style={{ width: 100, height: 100, borderRadius: '50%', cursor: 'pointer' }}
      />

      {/* First Modal - Choose Upload or Camera */}
      {mode === 'choose' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-xl flex flex-col gap-4 items-center">
            <h3 className="font-bold text-lg">Choose Image Source</h3>
            <button
              className="px-5 py-2 bg-green-300 rounded-full text-sm"
              onClick={() => {
                setMode('upload');
                setShowModal(true);
              }}
            >
              Upload from Device
            </button>
            <button
              className="px-5 py-2 bg-green-500 rounded-full text-sm text-white"
              onClick={() => {
                setMode('capture');
                setShowModal(true);
              }}
            >
              Use Camera
            </button>
            <button
              className="mt-2 text-red-500 text-sm"
              onClick={() => setMode(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Second Modal - Upload Dropzone or Webcam */}
      {showModal && (mode === 'upload' || mode === 'capture') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-xl">
            {mode === 'upload' && (
              <div {...getRootProps()} className="border p-20 w-[500px] text-center cursor-pointer">
                <input {...getInputProps()} accept="image/*" />
                <p className="text-gray-600">Drag & drop or click to select a file</p>
              </div>
            )}

            {mode === 'capture' && (
              <div className="flex flex-col items-center">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={320}
                  height={240}
                  videoConstraints={{ facingMode: "user" }}
                />
                <button
                  onClick={capture}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
                >
                  Capture
                </button>
              </div>
            )}

            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded-full"
              onClick={() => {
                setShowModal(false);
                setMode(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {imageSrc && <img src={imageSrc} alt="Preview" style={{ width: 100, height: 100 }} />}

      <button onClick={clear} className="px-5 py-3 bg-red-500 text-white rounded-full">
        Clear Selection
      </button>
    </div>
  );
}
