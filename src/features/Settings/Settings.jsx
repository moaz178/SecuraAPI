import React, { useState, useEffect } from "react";
import { secura_URL } from "../../utils/endpoint";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Card } from "react-bootstrap";
import axios from "axios";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState([]);
  const [selectedSettings, setSelectedSettings] = useState([]);
  const securaKey = "6m1fcduh0lm3h757ofun4194jn"; // Moved it outside of component scope

  useEffect(() => {
    setLoading(true);
    const params = {
      secura_key: securaKey,
    };
    axios
      .post(`${secura_URL}/ScanSettingList`, params)
      .then(function (res) {
        console.log("settings", res.data.scanners);
        setSettings(res.data.scanners);
        setLoading(false);
      })
      .catch(function (error) {
        toast.error(error);
        setLoading(false);
        console.log("select options error", error);
      });
  }, [securaKey]);

  // Initialize selected settings when settings change
  useEffect(() => {
    setSelectedSettings(
      settings
        .filter(
          (setting) =>
            setting.alertThreshold === "HIGH" ||
            setting.alertThreshold === "DEFAULT"
        )
        .map((setting) => setting.id) // Using ID instead of name
    );
  }, [settings]);

  const toggleSetting = (id) => {
    setSelectedSettings((prevSelectedSettings) => {
      if (prevSelectedSettings.includes(id)) {
        return prevSelectedSettings.filter((settingId) => settingId !== id);
      } else {
        return [...prevSelectedSettings, id];
      }
    });
  };

  const submitSettings = () => {
    const form = new FormData();
    form.append("settingValue", selectedSettings);
    form.append("securaKey", securaKey);
    setLoading(true);

    axios
      .post(`${secura_URL}/ScanSettingSave`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (res) {
        setLoading(false);
        toast.success("Settings Saved !");
      })
      .catch(function (error) {
        toast.error(error);
        setLoading(false);
        console.log("submit file error", error);
      });
  };

  return (
    <>
      <Loader show={loading} />
      <Toaster
        toastOptions={{
          style: {
            fontWeight: "600",
            fontSize: "12px",
            padding: "20px 10px",
          },
        }}
      />

      {settings === null || settings.length < 1 ? (
        <p className="text-primary fs-15 pl-5 pr-4">Loading...</p>
      ) : (
        <>
          <p
            className="pl-4 pt-3"
            style={{ color: "#aeaeaf", fontSize: "17px" }}
          >
            <i className="fa-solid fa-list-check mr-2"></i>Your Settings
          </p>
          <hr />
          <Card className="mt-4">
            <Card.Body
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "10px",
                marginLeft: "30px",
                marginRight: "10px",
                marginBottom: "30px",
              }}
            >
              {settings.map(({ id, name }) => (
                <div
                  className="form-check mt-3"
                  style={{ marginRight: "50px" }}
                  key={id}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={id}
                    name="settingValue"
                    id={`settingsCheckbox_${id}`}
                    checked={selectedSettings.includes(id)}
                    onChange={() => toggleSetting(id)}
                  />
                  <label htmlFor={`settingsCheckbox_${id}`} className="fs-12">
                    {name}
                  </label>
                </div>
              ))}
            </Card.Body>
          </Card>
          <div className="d-flex" style={{ justifyContent: "end" }}>
            <button
              type="submit"
              className="btn btn-sm btn-primary mt-2 px-4"
              onClick={submitSettings}
            >
              Save
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Settings;
