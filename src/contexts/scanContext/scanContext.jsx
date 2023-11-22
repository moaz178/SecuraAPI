import { createContext, useContext, useState, useEffect } from "react";

const ScanContext = createContext({
  scanDetails: {},
  setScanDetails: () => {},
  submittedScriptRes: null,
  setSubmittedScriptRes: () => {},
  file: "",
  setFile: () => null,
  script: "",
  setScript: () => {},
  selectOptions: {},
  setSelectOptions: () => {},
  selectedItem: "",
  setSelectedItem: () => null,
});

export const useScanContext = () => useContext(ScanContext);

const ScanProvider = ({ children }) => {
  const [scanDetails, setScanDetails] = useState({});
  const [submittedScriptRes, setSubmittedScriptRes] = useState({});
  const [file, setFile] = useState("");
  const [selectOptions, setSelectOptions] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [script, setScript] = useState(
    "//You will get your script here by selecting any item ! \n\nvar message = 'Secura Scan!'\n//Please Upload the Specs first to get the script \nconsole.log(message);"
  );

  return (
    <ScanContext.Provider
      value={{
        scanDetails,
        setScanDetails,
        submittedScriptRes,
        setSubmittedScriptRes,
        file,
        setFile,
        script,
        setScript,
        selectOptions,
        setSelectOptions,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};

export default ScanProvider;
