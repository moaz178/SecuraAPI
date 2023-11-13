import { createContext, useContext, useState, useEffect } from "react";

const ScanContext = createContext({
  scanDetails: {},
  setScanDetails: () => {},
  submittedScriptRes: null,
  setSubmittedScriptRes: () => {},
});

export const useScanContext = () => useContext(ScanContext);

const ScanProvider = ({ children }) => {
  const [scanDetails, setScanDetails] = useState({});
  const [submittedScriptRes, setSubmittedScriptRes] = useState({});

  return (
    <ScanContext.Provider
      value={{
        scanDetails,
        setScanDetails,
        submittedScriptRes,
        setSubmittedScriptRes,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};

export default ScanProvider;
