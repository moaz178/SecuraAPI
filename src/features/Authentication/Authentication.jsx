import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Form } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import CodeMirror from "@uiw/react-codemirror";
import { andromeda } from "@uiw/codemirror-theme-andromeda";
import { javascript } from "@codemirror/lang-javascript";
import { capitalizeFirstLetter } from "../../utils/helper";
import { secura_URL } from "../../utils/endpoint";
import "./Authentication.css";

const Authentication = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFeilds] = useState({});
  const [inputValues, setInputValues] = useState({});
  // const [selectOptions, setSelectOptions] = useState({});
  // const [selectedItem, setSelectedItem] = useState("");
  // const [script, setScript] = useState(
  //   "//You will get your script here by selecting any item ! \n\nvar message = 'Secura Scan!'\n//Please Upload the Specs first to get the script \nconsole.log(message);"
  // );

  //Scan context
  const {
    scanDetails,
    setSubmittedScriptRes,
    script,
    setScript,
    selectOptions,
    setSelectOptions,
    selectedItem,
    setSelectedItem,
    setAuthStatus,
  } = useScanContext();

  useEffect(() => {
    if (Object.keys(scanDetails).length > 0) {
      const params = {
        secura_referenceId: scanDetails.referenceId,
        secura_key: "6m1fcduh0lm3h757ofun4194jn",
      };
      // setLoading(true);
      axios
        .post(`${secura_URL}/ListAuthScript`, params)
        .then(function (res) {
          setLoading(false);
          setSelectOptions(res.data.script);
          if (res.data.script.Error) {
            toast.error(res.data.script.Error);
          }
        })
        .catch(function (error) {
          toast.error(error);
          setLoading(false);
          console.log("select options error", error);
        });
    }
  }, []);

  useEffect(() => {
    selectedItem !== "" && fetchScript();
  }, [selectedItem]);

  const fetchScript = () => {
    const scriptParams = {
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_scriptId: selectedItem,
    };
    // setLoading(true);
    axios
      .post(`${secura_URL}/ShowAuthScript`, scriptParams)
      .then(function (res) {
        setLoading(false);
        if (res.data.script.Error) {
          toast.error(res.data.script.Error);
        } else if (res.data.script == null) {
          toast.error("Something went wrong");
        } else {
          setInputFeilds(res.data.script);
          const encodedScript = Object.values(res.data.script)[0];
          const decodedScript = atob(encodedScript);
          setScript(decodedScript);
        }
      })
      .catch(function (error) {
        toast.error(error);
        setLoading(false);
        console.log("fetch script error", error);
      });
  };

  const handleInputChange = (propertyName, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [propertyName]: value,
    }));
  };

  const submitScrip = () => {
    //Exception for requestBody to be encoded
    const requestBodyValue = inputValues.secura_requestBody;
    const encodedRequestBody = requestBodyValue ? btoa(requestBodyValue) : "";

    const submitParams = {
      secura_scriptId: selectedItem,
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_script: btoa(script),
      secura_scanId: scanDetails.scanId,
      secura_targetHost: scanDetails.targetHost,
      ...inputValues,
      secura_requestBody: encodedRequestBody,
    };

    console.log("submitted params :", submitParams);
    setLoading(true);
    axios
      .post(`${secura_URL}/AuthScriptLoad`, submitParams)
      .then(function (res) {
        setLoading(false);
        if (res.data.script.Error) {
          toast.error(res.data.script.Error);
          setAuthStatus("Not Added");
          setLoading(false);
        } else if (res.data.script == null) {
          toast.error("Something went wrong");
          setAuthStatus("Not Added");
        } else {
          setSubmittedScriptRes(res.data.script);
          toast.success(res.data.script.status);
          setAuthStatus("Added");
          setOpen(false);
        }
      })
      .catch(function (error) {
        toast.error("Invalid Script!");
        console.log("submit script error", error);
        setAuthStatus("Not Added");
        setLoading(false);
      });
  };

  //Checks if all fileds are filled
  // const isAllFieldsFilled = () => {
  //   return Object.entries(inputFields).every(
  //     ([propertyName, fieldType]) =>
  //       !(fieldType === "textBox" || fieldType === "textArea") ||
  //       !!inputValues[propertyName]
  //   );
  // };

  console.log("inoputfeilds", inputFields);

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

      <div className="auth-parent-container">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-3">
            <div>
              <strong className="fs-15">Add Authentication</strong>
            </div>
            <br />
            <Form style={{ width: "100%" }}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  size="sm"
                >
                  <option value="">Select</option>
                  {selectOptions &&
                    Object.entries(selectOptions).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Form>
            <br />
            <div>
              <div className="row">
                {Object.entries(inputFields).map(
                  ([propertyName, fieldType]) =>
                    (fieldType === "textBox" || fieldType === "textArea") && (
                      <div key={propertyName} className="mb-3">
                        <label className="fs-13" htmlFor={propertyName}>
                          <strong>
                            {capitalizeFirstLetter(
                              propertyName.replace(/^secura_/, "")
                            )}
                            :
                          </strong>
                        </label>
                        <input
                          type={fieldType === "textBox" ? "text" : "textarea"}
                          id={propertyName}
                          name={propertyName}
                          className="form-control fs-13"
                          onChange={(e) =>
                            handleInputChange(propertyName, e.target.value)
                          }
                          placeholder={
                            propertyName === "secura_authorization"
                              ? "Bearer"
                              : propertyName === "secura_loginURL"
                              ? "http://url/endpoint"
                              : propertyName === "secura_requestBody"
                              ? "{ username: etc, pass: etc }"
                              : undefined
                          }
                        />
                      </div>
                    )
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-primary mt-2 px-4"
              onClick={submitScrip}
              disabled={selectedItem === ""}
            >
              Save
            </button>
            <br />
          </div>

          {/* Right Column */}
          <div className="col-md-9">
            <CodeMirror
              value={script}
              height={Object.keys(inputFields).length > 3 ? "730px " : "463px"}
              className="editor-scroll"
              theme={andromeda}
              extensions={[javascript({ jsx: true })]}
              onChange={(value, viewUpdate) => {
                setScript(value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
