import axios from "axios";
import React, { useState } from "react";
const PhotosUploader = ({ addedImgs, onChange }) => {
  const [imgLink, setImgLink] = useState("");
  function uploadPhoto(ev) {
    ev.preventDefault();
    const photoFiles = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < photoFiles.length; i++) {
      data.append("photos", photoFiles[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: photosNames } = response;
        onChange((prev) => {
          return [...prev, ...photosNames];
        });
      });
  }
  async function addImgByLink(ev) {
    ev.preventDefault();
    const { data: imgName } = await axios.post("/upload-img-link", {
      link: imgLink,
    });
    onChange((prev) => {
      return [...prev, imgName];
    });
    setImgLink("");
  }
  return (
    <>
      <div className="flex gap-1">
        <input
          type="text"
          name="photos"
          className="text-sm"
          value={imgLink}
          onChange={(ev) => {
            setImgLink(ev.target.value);
          }}
          placeholder="Add photos using link (URL)."
        />
        <button
          onClick={addImgByLink}
          className="bg-gray-200 rounded-2xl px-4 text-sm"
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className=" mt-2 gap-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 ">
        {addedImgs.length > 0 &&
          addedImgs.map((link) => (
            <div key={link} className="flex">
              <img
                src={`http://localhost:4000/uploads/${link}`}
                className="rounded-2xl object-cover w-full"
              />
            </div>
          ))}
        <label className="flex h-32 cursor-pointer gap-2 justify-center items-center border bg-transparent rounded-2xl text-2xl text-gray-600 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input
            onChange={uploadPhoto}
            type="file"
            multiple
            name="imgFile"
            className="hidden"
          />
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
