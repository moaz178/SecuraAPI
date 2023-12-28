import React, { useEffect, useState } from "react";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import ReportPdf from "./ReportPdf";

const Download = ({ data }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);

    const timeout = setTimeout(() => {
      setShow(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <div
      className={"download-pdf " + (!show ? "loading" : "")}
      title="Save PDF"
    >
      {show && (
        <PDFDownloadLink
          document={<ReportPdf pdfMode={true} data={data} />}
          fileName={`${
            data.invoiceTitle ? data.invoiceTitle.toLowerCase() : "securaReport"
          }.pdf`}
          aria-label="Save PDF"
        >
          <img src="/dist/download.svg" />
          {/* Download report */}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default Download;
