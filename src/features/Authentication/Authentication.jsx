import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Container, Form } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Editor from "@monaco-editor/react";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import "./Authentication.css";

const Authentication = () => {
  const [loading, setLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [script, setScript] = useState(
    "//You will get your script here by selecting any item ! \n\nvar message = 'Hello World!'\n//Please Upload the Specs first to get the script \nconsole.log(message);"
  );

  //Scan context
  const { scanDetails, setSubmittedScriptRes } = useScanContext();

  useEffect(() => {
    if (Object.keys(scanDetails).length > 0) {
      const params = {
        secura_referenceId: scanDetails.referenceId,
        secura_key: "6m1fcduh0lm3h757ofun4194jn",
      };
      // setLoading(true);
      axios
        .post(`http://192.168.18.20:8082/SecuraCore/ListAuthScript`, params)
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
      .post(`http://192.168.18.20:8082/SecuraCore/ShowAuthScript`, scriptParams)
      .then(function (res) {
        setLoading(false);
        if (res.data.script.Error) {
          toast.error(res.data.script.Error);
        } else if (res.data.script == null) {
          toast.error("Something went wrong");
        } else {
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

  const submitScrip = () => {
    const submitParams = {
      secura_scriptId: selectedItem,
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_script: btoa(script),
      secura_scanId: scanDetails.scanId,
    };
    console.log("submitted params", submitParams);
    axios
      .post(`http://192.168.18.20:8082/SecuraCore/AuthScriptLoad`, submitParams)
      .then(function (res) {
        if (res.data.script.Error) {
          toast.error(res.data.script.Error);
        } else if (res.data.script == null) {
          toast.error("Something went wrong");
        } else {
          console.log("submittes Script Response: ", res.data.script);
          setSubmittedScriptRes(res.data.script);
          toast.success(res.data.script.status);
        }
      })
      .catch(function (error) {
        toast.error(error);
        console.log("submit script error", error);
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

      <div className="auth-parent-container">
        <div className="auth-container">
          <div>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <div>
                    <strong className="fs-30">Add Autentication</strong>
                  </div>
                  <br />

                  <Form style={{ width: "350px" }}>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Select
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                      >
                        <option value="">Select</option>
                        {selectOptions &&
                          Object.entries(selectOptions).map(
                            ([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            )
                          )}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                  <br />
                  <div>
                    <div>
                      <label className="fs-14">
                        <strong>Grant Type :</strong>
                      </label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="form-control fs-14"
                      // placeholder="Enter email"
                      required
                      disabled
                    />
                    <br />
                    <div>
                      <label className="fs-14">
                        <strong>Token URL :</strong>
                      </label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="form-control fs-14"
                      // placeholder="Enter email"
                      required
                      disabled
                    />
                    <br />
                    <div>
                      <label className="fs-14">
                        <strong>Callback URL :</strong>
                      </label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="form-control fs-14"
                      // placeholder="Enter email"
                      required
                      disabled
                    />
                  </div>
                </div>
                <br />
                <br />
              </div>
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-lg btn-info btn-block mb-2"
              onClick={submitScrip}
              disabled={selectedItem === ""}
            >
              Save
            </button>

            <br />
          </div>
        </div>
        <Editor
          className="mt-5"
          height="463px"
          width="700px"
          language="javascript"
          theme="vs-dark"
          value={script}
          options={{
            inlineSuggest: true,
            fontSize: "16px",
            formatOnType: true,
            autoClosingBrackets: true,
            minimap: { scale: 10 },
          }}
        />
      </div>
    </>
  );
};

export default Authentication;
