import axios from "axios";
import React, { useRef, useState } from "react";
const PhotosUploader = ({ addedImgs, onChange }) => {
  const [imgLink, setImgLink] = useState("");
  const allTheRefs = {};
  const elemRef = useRef(null);
  // function showCardButtons(link) {
  //   allTheRefs[link].classList.remove("hidden");
  // }
  function toggleCardButtons(link) {
    allTheRefs[link].classList.toggle("hidden");
  }

  function removePhoto(photoRemoved) {
    onChange([...addedImgs.filter((photo) => photo !== photoRemoved)]);
  }

  function selectCoverPhoto(coverPhoto) {
    onChange([
      coverPhoto,
      ...addedImgs.filter((photo) => photo !== coverPhoto),
    ]);
  }
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
      <div className=" my-4 gap-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 ">
        {addedImgs.length > 0 &&
          addedImgs.map((link) => (
            <div
              key={link}
              className="flex  relative"
              onMouseEnter={(ev) => {
                ev.preventDefault();
                toggleCardButtons(link);
              }}
              onMouseLeave={(ev) => {
                ev.preventDefault();
                toggleCardButtons(link);
              }}
            >
              <img
                src={`http://localhost:4000/uploads/${link}`}
                className="rounded-2xl object-cover "
              />
              <div
                ref={(ref) => (allTheRefs[link] = ref)}
                className="hidden"
                key={link}
              >
                <button
                  name={link}
                  onClick={(ev) => {
                    ev.preventDefault();
                    removePhoto(link);
                  }}
                  className="absolute right-1 bottom-1 py-2 px-3 bg-black text-white cursor-pointer bg-opacity-60 rounded-2xl"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="0.85em"
                    width="0.85em"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 010 1h-.538l-.853 10.66A2 2 0 0111.115 16h-6.23a2 2 0 01-1.994-1.84L2.038 3.5H1.5a.5.5 0 010-1H5v-1A1.5 1.5 0 016.5 0h3A1.5 1.5 0 0111 1.5zm-5 0v1h4v-1a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5zM4.5 5.029l.5 8.5a.5.5 0 10.998-.06l-.5-8.5a.5.5 0 10-.998.06zm6.53-.528a.5.5 0 00-.528.47l-.5 8.5a.5.5 0 00.998.058l.5-8.5a.5.5 0 00-.47-.528zM8 4.5a.5.5 0 00-.5.5v8.5a.5.5 0 001 0V5a.5.5 0 00-.5-.5z" />
                  </svg>
                </button>
                <button
                  name={link}
                  onClick={(ev) => {
                    ev.preventDefault();
                    selectCoverPhoto(link);
                  }}
                  className="absolute left-1 bottom-1 py-2 px-3 bg-black text-white cursor-pointer bg-opacity-60 rounded-2xl"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill={link === addedImgs[0] ? "#f8a547" : "currentColor"}
                    height="1em"
                    width="1em"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        <label className="flex p-4 cursor-pointer gap-2 justify-center items-center border bg-transparent rounded-2xl text-2xl text-gray-600 ">
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
