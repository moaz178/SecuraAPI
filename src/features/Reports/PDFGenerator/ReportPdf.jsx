import React, { useState, useEffect } from "react";
// import EditableInput from "./EditableInput";
import EditableFileImage from "./EditableFileImage";
import Document from "./Document";
import Page from "./Page";
import View from "./View";
import Text from "./Text";
import { Font } from "@react-pdf/renderer";
import Download from "./DownloadPDF";
import { useScanContext } from "../../../contexts/scanContext/scanContext";
import "../Report.css";

export const initialProductLine = {
  description: "",
  quantity: "1",
  rate: "0.00",
};

export const initialInvoice = {
  logo: "",
  logoWidth: 100,
  signature: "",
  title: "INVOICE",
  companyName: "",
  name: "",
  companyAddress: "",
  companyAddress2: "",
  companyCountry: "United States",
  billTo: "Bill To:",
  clientName: "",
  clientAddress: "",
  clientAddress2: "",
  clientCountry: "United States",
  invoiceTitleLabel: "Invoice#",
  invoiceTitle: "",
  invoiceDateLabel: "Invoice Date",
  invoiceDate: "",
  invoiceDueDateLabel: "Due Date",
  invoiceDueDate: "",
  productLineDescription: "Item Description",
  productLineQuantity: "Qty",
  productLineQuantityRate: "Rate",
  productLineQuantityAmount: "Amount",
  productLines: [
    {
      description: "Brochure Design",
      quantity: "2",
      rate: "100.00",
    },
    { ...initialProductLine },
    { ...initialProductLine },
  ],
  subTotalLabel: "Sub Total",
  taxLabel: "Sale Tax (10%)",
  totalLabel: "TOTAL",
  currency: "$",
  notesLabel: "Notes",
  notes: "It was great doing business with you.",
  termLabel: "Terms & Conditions",
  term: "Please make the payment by the due date.",
};

Font.register({
  family: "Nunito",

  fonts: [
    { src: "https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf" },
    {
      src:
        "https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf",
      fontWeight: 600,
    },
  ],
});
const description = [1, 2, 3, 4, 5, 6];
const ReportPdf = ({ data, pdfMode, onChange }) => {
  const [invoice, setInvoice] = useState(
    data ? { ...data } : { ...initialInvoice }
  );

  const invoiceDate =
    invoice.invoiceDate !== "" ? new Date(invoice.invoiceDate) : new Date();
  const invoiceDueDate =
    invoice.invoiceDueDate !== ""
      ? new Date(invoice.invoiceDueDate)
      : new Date(invoiceDate.valueOf());

  if (invoice.invoiceDueDate === "") {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30);
  }

  useEffect(() => {
    if (onChange) {
      onChange(invoice);
    }
  }, [onChange, invoice]);

  //Scan context
  const { selectedReport } = useScanContext();
  console.log("selectedReport: ", selectedReport);

  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper" pdfMode={pdfMode}>
        {!pdfMode && <Download data={invoice} />}

        <View className="flex mb-20" pdfMode={pdfMode}>
          <View className="w-50" pdfMode={pdfMode}>
            <View className="w-60" pdfMode={pdfMode}>
              <EditableFileImage
                className="logo"
                placeholder="Your Logo"
                value={"/dist/securaLogo.png"}
                width={"300px"}
                pdfMode={pdfMode}
              />
            </View>
          </View>
          <View className="w-50" pdfMode={pdfMode}>
            <View className="w-85" pdfMode={pdfMode}>
              <View className="flex mb-1" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <Text className="dark bold" pdfMode={pdfMode}>
                    Scan Started
                  </Text>
                </View>
                <View className="w-60" pdfMode={pdfMode}>
                  <Text className="dark" pdfMode={pdfMode}>
                    Thu Dec 28 17:32:03 2023 PKT
                  </Text>
                </View>
              </View>
              <View className="flex mb-1" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <Text className="dark bold" pdfMode={pdfMode}>
                    Scan Ended
                  </Text>
                </View>
                <View className="w-60" pdfMode={pdfMode}>
                  <Text className="dark" pdfMode={pdfMode}>
                    Thu Dec 28 17:32:22 2023 PKT
                  </Text>
                </View>
              </View>
              <View className="flex mb-1" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <Text className="dark bold" pdfMode={pdfMode}>
                    Scan Duration
                  </Text>
                </View>
                <View className="w-60" pdfMode={pdfMode}>
                  <Text className="dark" pdfMode={pdfMode}>
                    0:0:19
                  </Text>
                </View>
              </View>
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-40" pdfMode={pdfMode}>
                  <Text className="dark bold" pdfMode={pdfMode}>
                    Scan Status
                  </Text>
                </View>
                <View className="w-60" pdfMode={pdfMode}>
                  <Text
                    className="bg-success white fs-12 bold p-5px p-1 w-30 badge badge-success"
                    pdfMode={pdfMode}
                  >
                    Finished
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* <View className="w-50" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  R/O Open Date
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  123-45666-77
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Time Recieved
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Mar 01, 2022
                </Text>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Current Mileage
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Feb 03, 2022
                </Text>
              </View>
            </View>
          </View> */}
        </View>

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Report ID
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  01
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  UserKey
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Null
                </Text>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Report Date
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Dec 28, 2023
                </Text>
              </View>
            </View>
          </View>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  User ID
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  123-45666-77
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  User Name
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Aiman
                </Text>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  User Email
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  aiman.ali@rc.com
                </Text>
              </View>
            </View>
          </View>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Refrence ID
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  SECURA_1702643980
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Target Host
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  http://192.168.18.20:8081
                </Text>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Authentication
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Null
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex bg-dark white mb-5 mt-20 mb-20" pdfMode={pdfMode}>
          <Text className="ml-2 pl-5px" pdfMode={pdfMode}>
            Risk Findings
          </Text>
        </View>
        <View className="flex" pdfMode={pdfMode}>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  High
                </Text>
              </View>
              <View className="w-40 mb-5px" pdfMode={pdfMode}>
                <Text className="bold bg-danger white pl-5px" pdfMode={pdfMode}>
                  12
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold " pdfMode={pdfMode}>
                  Medium
                </Text>
              </View>
              <View className="w-40 mb-5px" pdfMode={pdfMode}>
                <Text className="bold bg-warning dark pl-5px" pdfMode={pdfMode}>
                  05
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Low
                </Text>
              </View>
              <View className="w-40 mb-5px" pdfMode={pdfMode}>
                <Text
                  className="bold bg-primary white pl-5px"
                  pdfMode={pdfMode}
                >
                  0
                </Text>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Informational
                </Text>
              </View>
              <View className="w-40 mb-5px" pdfMode={pdfMode}>
                <Text
                  className="bold bg-success white pl-5px"
                  pdfMode={pdfMode}
                >
                  10
                </Text>
              </View>
            </View>
          </View>

          <View className="w-60" pdfMode={pdfMode}>
            <Text className="dark" pdfMode={pdfMode}>
              Any <strong className="text-danger">High</strong> and{" "}
              <strong className="text-warning">Medium</strong> risk
              vulnerabilities should be investigated and confirmed so that
              remedation can take place.
              <strong className="text-primary"> Low</strong> risk items should
              not be ignored as they can be chained with other vulnerabilities
              to enable further attacks.
            </Text>
          </View>
        </View>

        {/* <View className="w-100 flex" pdfMode={pdfMode}>
          <View className="w-60" pdfMode={pdfMode}>
            <Text className="dark" pdfMode={pdfMode}>
              #1 - Customer Reports: driver window inoperable
            </Text>
          </View>

          <View className="w-20 flex" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Estimate :
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-20" pdfMode={pdfMode}>
                  <Text className="dark" pdfMode={pdfMode}>
                    .00
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  CC.00
                </Text>
              </View>
            </View>
          </View>
        </View> */}
        {/* <View className="w-100 flex" pdfMode={pdfMode}>
          <View className="w-60" pdfMode={pdfMode}>
            <Text className="dark w-50" pdfMode={pdfMode}>
              #2 - Customer Reports: key fob working inconsistently, please
              check and advise
            </Text>
          </View>

          <View className="w-20 flex" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Estimate :
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="flex mb-5" pdfMode={pdfMode}>
                <View className="w-20" pdfMode={pdfMode}>
                  <Text className="dark" pdfMode={pdfMode}>
                    .00
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  CC.00
                </Text>
              </View>
            </View>
          </View>
        </View> */}

        <View className="flex bg-dark white mb-5 mt-20 mb-20" pdfMode={pdfMode}>
          <Text className="ml-2 pl-5px" pdfMode={pdfMode}>
            Vulnerability Summary
          </Text>
        </View>
        {description.map(() => {
          return (
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  MI1
                </Text>
              </View>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  1234
                </Text>
              </View>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  22/12/22
                </Text>
              </View>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  3322
                </Text>
              </View>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  James Aderson
                </Text>
              </View>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="white" pdfMode={pdfMode}>
                  -
                </Text>
              </View>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="datk" pdfMode={pdfMode}>
                  TG
                </Text>
              </View>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  .00
                </Text>
              </View>
              <View className="w-20" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  .00
                </Text>
              </View>
            </View>
          );
        })}

        <View className="mt-5" pdfMode={pdfMode}>
          <Text className="dark bold" pdfMode={pdfMode}>
            Note:
          </Text>

          <Text className="dark fs-13" pdfMode={pdfMode}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </Text>
        </View>
      </Page>

      {/* 2nd Layout For Report */}
      {/* <Page className="invoice-wrapper" pdfMode={pdfMode}>
        {!pdfMode && <Download data={invoice} />}
        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50" pdfMode={pdfMode}>
            <EditableFileImage
              className="logo"
              placeholder="Your Logo"
              value={"/dist/securaLogo.png"}
              width={"300px"}
              pdfMode={pdfMode}
            />
            <Text className="dark bold" pdfMode={pdfMode}>
              Company Name
            </Text>
            <Text className="dark bold" pdfMode={pdfMode}>
              Your Name
            </Text>
            <Text className="dark bold" pdfMode={pdfMode}>
              Company Address
            </Text>
            <Text className="dark bold" pdfMode={pdfMode}>
              Company Address 2
            </Text>
          </View>
          <View className="w-50" pdfMode={pdfMode}>
            <Text className="dark bold" pdfMode={pdfMode}>
              Invoice
            </Text>
          </View>
        </View>

        <View className="flex mt-10" pdfMode={pdfMode}>
          <View className="w-55" pdfMode={pdfMode}>
            <Text className="dark bold" pdfMode={pdfMode}>
              Bill To{" "}
            </Text>

            <Text className="dark bold" pdfMode={pdfMode}>
              Client Name
            </Text>

            <Text className="dark bold" pdfMode={pdfMode}>
              Address 1
            </Text>

            <Text className="dark bold" pdfMode={pdfMode}>
              Address 2
            </Text>

            <Text className="dark bold" pdfMode={pdfMode}>
              Country Code
            </Text>
          </View>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Invoice#;
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  123-45666-77
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Invoice Date
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Mar 01, 2022
                </Text>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Due Date
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Feb 03, 2022
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex mt-5" pdfMode={pdfMode}>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Year
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  123-45666-77
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Make
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Mar 01, 2022
                </Text>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Modal
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Feb 03, 2022
                </Text>
              </View>
            </View>
          </View>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Body
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  123-45666-77
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Engine Code
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Mar 01, 2022
                </Text>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Service Advisor
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Feb 03, 2022
                </Text>
              </View>
            </View>
          </View>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Vehicle ID No#
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  123-45666-77
                </Text>
              </View>
            </View>
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Color
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  SILVER
                </Text>
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text className="dark bold" pdfMode={pdfMode}>
                  Lisence No#
                </Text>
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text className="dark" pdfMode={pdfMode}>
                  Feb 03, 2022
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex bg-dark white w-100 mt-5" pdfMode={pdfMode}>
          <View className="w-30" pdfMode={pdfMode}>
            <Text className="white" pdfMode={pdfMode}>
              <span style={{ marginLeft: "10px" }}>Item description</span>
            </Text>
          </View>
          <View className="w-30" pdfMode={pdfMode}>
            <Text className="white" pdfMode={pdfMode}>
              Quantity
            </Text>
          </View>
          <View className="w-30" pdfMode={pdfMode}>
            <Text className="white" pdfMode={pdfMode}>
              Rate{" "}
            </Text>
          </View>

          <View className="w-40" pdfMode={pdfMode}>
            <Text className="white" pdfMode={pdfMode}>
              Amount
            </Text>
          </View>
        </View>

        <View className="mt-5" pdfMode={pdfMode}>
          <Text className="dark bold" pdfMode={pdfMode}>
            Notes
          </Text>
          <Text className="dark " pdfMode={pdfMode}>
            It was great doing business with you.{" "}
          </Text>
        </View>
        <View className="mt-2" pdfMode={pdfMode}>
          <Text className="dark bold" pdfMode={pdfMode}>
            Terms &amp; Conditions
          </Text>

          <Text className="dark" pdfMode={pdfMode}>
            Please make the payment by the due date.{" "}
          </Text>
        </View>
      </Page> */}
    </Document>
  );
};

export default ReportPdf;
