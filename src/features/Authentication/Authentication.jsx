import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Container, Form } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Editor from "@monaco-editor/react";
import "./Authentication.css";
const Authentication = () => {
  const [loading, setLoading] = useState(false);
  const code =
    "//Write your code here \n\nvar message = 'Monaco Editor!' \nconsole.log(message);";
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
        <div class="auth-container">
          <form>
            <div class="form-group">
              <div class="form-row">
                <div class="col">
                  <div>
                    <strong className="fs-30">Add Autentication</strong>
                  </div>
                  <br />

                  <Form style={{ width: "350px" }}>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Select custom>
                        <option value="1">
                          Authentication Server (OAuth etc)
                        </option>
                        <option value="2">Basic Autentication</option>
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
                      class="form-control fs-14"
                      // placeholder="Enter email"
                      required
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
                      class="form-control fs-14"
                      // placeholder="Enter email"
                      required
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
                      class="form-control fs-14"
                      // placeholder="Enter email"
                      required
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
              class="btn btn-lg btn-info btn-block mb-2"
              // onClick={handleSubmit}
              // disabled={!file.name}
            >
              submit
            </button>

            <br />
          </form>
        </div>
        <Editor
          className="mt-5"
          height="463px"
          width="700px"
          language="javascript"
          theme="vs-dark"
          value={code}
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
