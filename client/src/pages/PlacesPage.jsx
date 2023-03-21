import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../components/form/Perks";
import PhotosUploader from "../components/form/PhotosUploader";

const PlacesPage = () => {
  const { action } = useParams();

  const [perks, setPerks] = useState([]);
  const [imgLink, setImgLink] = useState("");
  const [addedImgs, setAddedImgs] = useState([]);
  const [redirect, setRedirect] = useState(null);
  // const [photos,  setPhotos ] = useState('1.2')
  // async function myCurrentPhoto () {
  //   await axios.get(`http:localhost:4000/get:88895${Link}`)
  // }

  async function submitHandler(event) {
    event.preventDefault();
    const placeData = { addedImgs };
    await axios.post("/places", data);
    setRedirect("/account/places");
    const { elements } = event.currentTarget;
    console.log(elements.namedItem("title").value);
    console.log(elements.namedItem("checkbox"));
    console.log(elements);
    const data = {
      title: elements.namedItem("title").value,
      address: elements.namedItem("address").value,
      photos: elements.namedItem("photos").value,
      //   photos: []

      // perks: [
      //   {
      //     wifi: elements.namedItem("wifi").checked,
      //     pets: elements.namedItem("pets").checked,
      //     guests: elements.namedItem("guests").checked,
      //     tv: elements.namedItem("tv").checked,
      //   },
      // ],
      description: elements.namedItem("description").value,
      extrainfo: elements.namedItem("extrainfo").value,
      //   checked: elements.namedItem("checked").value,
      //   perks: elements.namedItem("perks").value,
      //   category: elements.namedItem("category").value,
      //   rating: elements.namedItem("rating").value,
      //   verified: elements.namedItem("verified").checked,
    };
    console.log(data);

    // alert(`Here's your data: ${JSON.stringify(data, undefined, 2)}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <div className="text-center flex justify-center">
        {action !== "new" && (
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
        )}
        {action === "new" && (
          <div className="">
            <form onSubmit={submitHandler}>
              <label className="text-xl mt-4 font-bold">
                Title
                <input
                  type="text"
                  name="title"
                  className="text-sm"
                  placeholder="Ex: Excellent Appartemnet in Zayed"
                />
              </label>
              <label className="text-xl mt-4 font-bold">
                Address
                <input
                  type="text"
                  name="address"
                  className="text-sm"
                  placeholder="Ex: Egypt - Abasya - Main St.8"
                />
              </label>
              <label className="text-xl mt-4 font-bold">
                Photos
                <PhotosUploader addedImgs={addedImgs} onChange={setAddedImgs} />
              </label>
              <label className="text-xl mt-4 font-bold">
                Description
                <textarea
                  placeholder="Describe anything here!"
                  name="description"
                />
              </label>
              <Perks onChange={setPerks} selected={perks} />
              <div className=" mt-4">
                <label className="text-xl font-bold">
                  Extra Info
                  <textarea
                    placeholder="House rules and anything you want to add."
                    name="extrainfo"
                  />
                </label>
              </div>
              <div className="mt-2">
                <button className="primary my-4" type="submit">
                  Add Place
                </button>
              </div>
              {/* <input type="submit" value="Submit" placeholder="title" /> */}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;
