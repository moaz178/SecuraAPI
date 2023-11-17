import { createContext, useContext, useState, useEffect } from "react";

const ScanContext = createContext({
  scanDetails: {},
  setScanDetails: () => {},
  submittedScriptRes: null,
  setSubmittedScriptRes: () => {},
  file: "",
  setFile: () => null,
});

export const useScanContext = () => useContext(ScanContext);

const ScanProvider = ({ children }) => {
  const [scanDetails, setScanDetails] = useState({});
  const [submittedScriptRes, setSubmittedScriptRes] = useState({});
  const [file, setFile] = useState("");

  return (
    <ScanContext.Provider
      value={{
        scanDetails,
        setScanDetails,
        submittedScriptRes,
        setSubmittedScriptRes,
        file,
        setFile,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};

export default ScanProvider;
