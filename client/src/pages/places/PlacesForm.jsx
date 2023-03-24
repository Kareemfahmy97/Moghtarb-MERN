import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PhotosUploader from "../../components/form/PhotosUploader";
import Perks from "../../components/form/Perks";
import { useNavigate } from "react-router-dom";
import AccNavigation from "../../components/navbar/AccNavigation";

const PlacesForm = () => {
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [addedImgs, setAddedImgs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const formInitialValues = {
    title: "",
    address: "",
    description: "",
    extrainfo: "",
    photos: [],
    perks: [],
  };

  const [formValues, setFormValues] = useReducer(
    (currentVals, newVals) => ({ ...currentVals, ...newVals }),
    formInitialValues
  );

  const { title, address, description, extrainfo, photos, perks } = formValues;
  useEffect(() => {
    if (id) {
      axios.get(`/places/${id}`).then((res) => {
        const { data } = res;
        console.log("data from API", data);

        Object.keys(data).forEach(function (key, index) {
          setFormValues({ [key]: data[key] });
        });
        setSelectedPerks(data.perks);
        setAddedImgs(data.photos);

        // setAddedImgs(photos);
        // setPerks(perks);
      });
    }
  }, [id]);

  useEffect(() => {
    setFormValues({ ["perks"]: selectedPerks });
    setFormValues({ ["photos"]: addedImgs });
  }, [selectedPerks, addedImgs]);
  function handleFormChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  }
  async function savePlaceHandler(ev) {
    ev.preventDefault();
    if (id) {
      await axios.put(`/places/${id}`, formValues);
    } else {
      await axios.post("/places", formValues);
    }
    navigate("/account/places");
  }
  return (
    <div className="">
      <AccNavigation />
      <div className="text-center flex justify-center">
        <form onSubmit={savePlaceHandler}>
          <label className="text-2xl mt-4 ">
            Title
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleFormChange}
              className="text-sm"
              placeholder="Ex: Excellent Appartemnet in Zayed"
            />
          </label>
          <label className="text-2xl mt-4 ">
            Address
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleFormChange}
              className="text-sm"
              placeholder="Ex: Egypt - Abasya - Main St.8"
            />
          </label>
          <label className="text-2xl mt-4 ">
            Photos
            <PhotosUploader addedImgs={addedImgs} onChange={setAddedImgs} />
          </label>
          <label className="text-2xl mt-4 ">
            Description
            <textarea
              placeholder="Describe anything here!"
              name="description"
              className="text-sm"
              value={description}
              onChange={handleFormChange}
            />
          </label>
          <Perks onChange={setSelectedPerks} selected={selectedPerks} />
          <div className=" mt-4">
            <label className="text-2xl ">
              Extra Info
              <textarea
                placeholder="House rules and anything you want to add."
                className="text-sm"
                name="extrainfo"
                value={extrainfo}
                onChange={handleFormChange}
              />
            </label>
          </div>
          <div className="mt-2">
            <button className="primary my-4" type="submit">
              {`${id ? "Save" : "Add"} Place`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlacesForm;
