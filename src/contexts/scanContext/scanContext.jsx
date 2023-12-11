import { createContext, useContext, useState, useEffect } from "react";

const ScanContext = createContext({
  specStatus: "Not Initiated",
  setSpecStatus: () => null,
  scanStatus: "Not Initiated",
  setScanStatus: () => null,
  scanningStart: false,
  setScanningStart: () => null,
  scanResults: null,
  setScanResutls: () => {},
  scanDetails: {},
  setScanDetails: () => {},
  submittedScriptRes: null,
  setSubmittedScriptRes: () => {},
  file: "",
  setFile: () => null,
  inputUrlVal: "",
  setInputUrlVal: () => null,
  script: "",
  setScript: () => {},
  selectOptions: {},
  setSelectOptions: () => {},
  selectedItem: "",
  setSelectedItem: () => null,
  authStatus: "Not Added",
  setAuthStatus: () => null,
});

export const useScanContext = () => useContext(ScanContext);

const ScanProvider = ({ children }) => {
  const [file, setFile] = useState("");
  const [inputUrlVal, setInputUrlVal] = useState("");
  const [scanningStart, setScanningStart] = useState(false);
  const [specStatus, setSpecStatus] = useState("Not Initiated");
  const [scanStatus, setScanStatus] = useState("Not Initiated");
  const [scanDetails, setScanDetails] = useState({});
  const [scanResults, setScanResutls] = useState(null);
  const [submittedScriptRes, setSubmittedScriptRes] = useState({});
  const [selectOptions, setSelectOptions] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [authStatus, setAuthStatus] = useState("Not Added");
  const [script, setScript] = useState(
    "//You will get your script here by selecting any item ! \n\nvar message = 'Secura Scan!'\n//Please Upload the Specs first to get the script \nconsole.log(message);"
  );

  return (
    <ScanContext.Provider
      value={{
        scanningStart,
        setScanningStart,
        specStatus,
        setSpecStatus,
        scanStatus,
        setScanStatus,
        scanResults,
        setScanResutls,
        scanDetails,
        setScanDetails,
        submittedScriptRes,
        setSubmittedScriptRes,
        file,
        setFile,
        inputUrlVal,
        setInputUrlVal,
        script,
        setScript,
        selectOptions,
        setSelectOptions,
        selectedItem,
        setSelectedItem,
        authStatus,
        setAuthStatus,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};

export default ScanProvider;
