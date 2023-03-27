import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const PlaceDetailsPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }
  if (showGallery) {
    return (
      <div className="absolute inset-0 min-h-screen">
        <div className="bg-black p-8 bg-opacity-95 grid gap-4">
          <div>
            <div className="text-center">
              <h2 className="text-lg text-white text-cneter">
                Photos of {place?.title}
              </h2>
            </div>

            <button
              className="fixed top-12 left-10 flex gap-1 py-2 px-4 font-semibold rounded-2xl bg-white text-black shadow shadow-md shadow-black"
              onClick={() => setShowGallery(false)}
            >
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back
            </button>
          </div>
          {place.photos.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img
                  key={photo}
                  src={`${import.meta.env.VITE_UPLOADS_PATH}/${photo}`}
                  alt={photo}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-8 bg-gray-100 -mx-8 p-8">
      <h1 className="text-3xl">{place?.title}</h1>
      <a
        target="_blank"
        className="underline my-3 font-semibold block flex gap-1"
        href={`https://maps.google.com/?q=${place?.address}`}
      >
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place?.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          {place?.photos?.[0] && (
            <>
              <div>
                <img
                  src={`${import.meta.env.VITE_UPLOADS_PATH}/${
                    place?.photos[0]
                  }`}
                  alt="Main"
                  className="aspect-square object-cover"
                />
              </div>
              <div className="grid ">
                {place?.photos?.[1] && (
                  <img
                    src={`${import.meta.env.VITE_UPLOADS_PATH}/${
                      place?.photos[1]
                    }`}
                    alt="Second"
                    className="aspect-square  object-cover"
                  />
                )}
                <div className=" overflow-hidden">
                  {place?.photos?.[2] && (
                    <img
                      src={`${import.meta.env.VITE_UPLOADS_PATH}/${
                        place?.photos[2]
                      }`}
                      alt="Third"
                      className="aspect-square relative top-2  object-cover"
                    />
                  )}
                </div>
              </div>
              {place?.photos.length > 3 && (
                <button
                  onClick={() => setShowGallery(true)}
                  className="absolute bottom-3 right-4 px-4 py-2 bg-white rounded-2xl  flex gap-1 text-lg shadow shadow-md shadow-gray"
                >
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
                      d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                    />
                  </svg>
                  Show more photos
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="my-4 ">
        <h2 className="text-2xl font-semibold">Description</h2>
        {place?.description}
      </div>
      {/* <div className="grid grid-cols-2 ">
        <div>
            <b>Check</b>
        </div>
        <h2 className="text-2xl font-semibold">Description</h2>
        {place.description}
      </div> */}
      <div className="bg-white shadow p-4 rounded-2xl ">
        <div className="text-2xl text-center">Price: ${place?.price}</div>
        <button className="primary">Book Now</button>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
