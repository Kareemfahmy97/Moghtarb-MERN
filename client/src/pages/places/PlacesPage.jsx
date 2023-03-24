import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccNavigation from "../../components/navbar/AccNavigation";
import axios from "axios";
const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/places")
      .then(({ data }) => {
        setPlaces(data);
        console.log("done");
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div>
      <AccNavigation />
      <div className="text-center flex justify-center">
        <Link
          to="/account/places/new"
          className="inline-flex gap-1 bg-primary rounded-full text-white px-6 py-2"
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="mt-8">
        {places.length > 0 &&
          places.map((place) => {
            let maxLength = 150;
            let trimmedDesc = place.description.substr(0, maxLength);
            trimmedDesc = place.description.substr(
              0,
              Math.min(trimmedDesc.length, trimmedDesc.lastIndexOf(" "))
            );
            return (
              <Link
                to={`/account/places/${place._id}`}
                className="flex bg-gray-200 gap-4 m-4 p-4 rounded-2xl"
              >
                <div className="flex w-32 h-32 shrink-0">
                  {place.photos.length > 0 && (
                    <img
                      className="object-cover rounded-2xl"
                      src={"http://localhost:4000/uploads/" + place.photos[0]}
                      alt={place.name}
                    />
                  )}
                </div>
                <div className="grow-0">
                  <h2 className="text-xl font-bold">{place.title}</h2>
                  <p className="text-sm mt-2">{`${trimmedDesc} ...`}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;
