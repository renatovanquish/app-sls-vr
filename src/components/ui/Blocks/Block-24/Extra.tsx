import { useEffect, useState } from "react";
import { Loading, Modal } from "components/ui";
import { useScreen } from "hooks/useScreen";
import { useBreakPoints } from "hooks/useBreakPoints";
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";
import {
  Browser,
  Download,
  Cross,
  ArrowLeft,
  RightArrow,
} from "components/icons";
import { useTheme } from "next-themes";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { Storage } from "aws-amplify";
Storage.configure({ level: "protected" });

import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface Props {
  user: any;
  content: any;
  identityId: any;
}

export default function Extra(props: Props) {
  const { content, identityId, user } = props;
  const [showPDF, setShowPDF] = useState(false);
  const [selPDF, setSelPDF] = useState("");
  const { theme } = useTheme();
  const [url, setUrl] = useState("");
  const [fileBlob, setFileBlob] = useState({} as any);
  const [loading, setLoading] = useState(false);
  const { isSm } = useBreakPoints();
  const { screenWidth } = useScreen();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleViewPDF = async (key: string) => {
    setUrl("");
    setPageNumber(1);
    setLoading(true);
    setShowPDF(true);
    const u = await Storage.get(key, {
      level: "protected",
      download: false,
      expires: 10800,
      identityId: identityId,
    });
    setUrl(u.toString());
  };

  const handleDownloadPDF = async (key: string) => {
    const u = await Storage.get(key, {
      level: "protected",
      download: false,
      expires: 10800,
      identityId: identityId,
    });

    const existingPdfBytes = await fetch(u).then((res: any) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    pages.map((p: any) => {
      const { width, height } = p.getSize();
      console.log(height)
      p.drawText(
        `${user.name}${user.profile.doc ? " - " + user.profile.doc : ""}`,
        {
          x: 25,
          y: height / 2 + 300,
          size: 40,
          font: helveticaFont,
          color: rgb(0.1, 0.1, 0.1),
          opacity: 0.2,
          rotate: degrees(-45),
        }
      );
    });

    const pdfBytes = (await pdfDoc.save()) as any;
    const bytes = new Uint8Array(pdfBytes);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const docUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = docUrl;
    a.download = key.split("/").pop() as string;
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", clickHandler);
      }, 150);
    };
    a.addEventListener("click", clickHandler, false);
    a.click();
    return a;
  };

  function onDocumentLoadSuccess(e: any) {
    setLoading(false);
    setNumPages(e._transport._numPages);
  }

  return (
    <div
      className={cn("my-4 w-full rounded-lg p-4", {
        "bg-accent-0": theme === "light",
        "bg-accent-1": theme === "dark",
      })}
    >
      {content.length > 0 && (
        <div className="text-xl font-semibold">Material complementar</div>
      )}
      <div className="mt-2 flex flex-col gap-2">
        {content.map((f: any, i: number) => (
          <div
            className={cn("p-2 rounded-lg", {
              "bg-accent-1": theme === "light",
              "bg-accent-0": theme === "dark",
            })}
            key={i}
          >
            <div className="flex flex-row justify-between">
              <div className="selected-none">{f.key.split("/").pop()}</div>
              <div className="flex gap-4">
                <div
                  onClick={() => {
                    handleViewPDF(f.key);
                  }}
                  data-tip="Visualizar"
                  className="tooltip cursor-pointer text-tertiary-2"
                >
                  <Browser />
                </div>
                <div
                  onClick={() => {
                    handleDownloadPDF(f.key);
                  }}
                  data-tip="Download"
                  className="tooltip cursor-pointer text-tertiary-2"
                >
                  <Download />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        hideHeader={true}
        open={showPDF}
        onClose={() => {
          setShowPDF(false);
        }}
        focusTrap={false}
        fullSize={true}
        title={numPages}
      >
        <div
          style={{ minWidth: 250 }}
          className={cn("flex justify-between p-4")}
        >
          {loading && (
            <div className="pt-2">
              <Loading />
            </div>
          )}
          {!loading && (
            <div className="flex flex-start gap-4">
              <button
                disabled={pageNumber === 1}
                onClick={() => {
                  const p = pageNumber - 1;
                  setPageNumber(p);
                }}
                className="btn btn-circle"
              >
                <ArrowLeft />
              </button>
              <button
                disabled={pageNumber === numPages}
                onClick={() => {
                  const p = pageNumber + 1;
                  setPageNumber(p);
                }}
                className="btn btn-circle"
              >
                <RightArrow />
              </button>
            </div>
          )}
          <div>
            <button
              onClick={() => setShowPDF(false)}
              aria-label="Close"
              className="cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
            >
              <Cross className="h-7 w-7" />
            </button>
          </div>
        </div>

        <div className={cn("select-none", { "p-4": loading })}>
          {url && (
            <Document file={url}>
              <Page
                pageNumber={pageNumber}
                width={isSm ? screenWidth : undefined}
                onLoadSuccess={onDocumentLoadSuccess}
              />
            </Document>
          )}
        </div>
      </Modal>
    </div>
  );
}
