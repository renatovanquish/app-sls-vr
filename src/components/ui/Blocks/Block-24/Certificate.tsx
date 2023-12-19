import { useState, useEffect, useRef } from "react";
import { Loading, Modal } from "components/ui";
import { useScreen } from "hooks/useScreen";
import { Cross, Check } from "components/icons";
import { useReactToPrint } from 'react-to-print'

interface Props {
  relationLink: any;
  user: any;
}

export default function Certificate(props: Props) {
  const { relationLink, user } = props;
  const { relation, totalViewed } = relationLink;
  const restrictedContents = relation.restrictedContents.items;
  const { certificatePerContent, minimumPercentage, totalHours } =
    relation.config;

  const totalViewedNum = parseInt(totalViewed);
  const minimumPercentageNum = parseInt(minimumPercentage);

  const [contentsViewed, setContentsViewed] = useState([] as any);
  const [displayModal, setDisplayModal] = useState(false);
  const { screenWidth, screenHeight } = useScreen();

  useEffect(() => {
    setContentsViewed([] as any);
    if (certificatePerContent) {
      const r = [] as any;
      restrictedContents.map((rc: any) => {
        console.log(rc);
        if (rc.viewed >= minimumPercentage) {
          r.push(rc.title);
        }
      });
      setContentsViewed(r);
    }
  }, [restrictedContents, certificatePerContent]);

  return (
    <div>
      {certificatePerContent && contentsViewed.length > 0 && (
        <div className="mt-4">
          {totalViewedNum >= minimumPercentageNum && (
            <div
              className="btn btn-block btn-warning"
              onClick={() => {
                setDisplayModal(true);
              }}
            >
              Você já tem {contentsViewed.length}
              {contentsViewed.length === 1 && (
                <span>&nbsp;certificado&nbsp;;</span>
              )}
              {contentsViewed.length > 1 && (
                <span>&nbsp;certificados&nbsp;</span>
              )}
              disponível.
            </div>
          )}
        </div>
      )}

      {!certificatePerContent && (
        <div className="mt-4">
          {totalViewedNum >= minimumPercentageNum && (
            <div
              className="btn btn-block btn-warning"
              onClick={() => {
                setDisplayModal(true);
              }}
            >
              Seu certificado já esta disponível.
            </div>
          )}
        </div>
      )}

      <Modal
        hideHeader={true}
        open={displayModal}
        onClose={() => {
          setDisplayModal(false);
        }}
        focusTrap={false}
        fullSize={true}
        title=""
      >
        <div
          className="bg-white overflow-y-auto"
          style={{ width: screenWidth, height: screenHeight }}
        >
          <div className="sticky top-0 z-50 bg-accent-0">
            <div className="flex justify-between">
              <div className="py-2 px-4">
                <div className="text-xl font-bold">
                  Certificado Você Radiologista
                </div>
                <div>{relation.name}</div>
              </div>
              <div className="py-3 pr-4 pl-2 flex flex-row">
                <div>
                  <button
                    onClick={() => {
                      setDisplayModal(false);
                    }}
                    aria-label="Close"
                    className="cursor-pointer bg-accent-1 p-2 rounded-full"
                  >
                    <Cross className="h-7 w-7" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {!certificatePerContent && (
            <Page
              name={user.name}
              content={relation.name}
              totalHours={totalHours}
              contentsViewed={contentsViewed}
            />
          )}

          {certificatePerContent && contentsViewed.length > 0 && (
            <div>
              {contentsViewed.map((cv: any, index: number) => (
                <div key={index}>
                  <Page
                    name={user.name}
                    content={`${relation.name} - ${cv}`}
                    totalHours={totalHours}
                    contentsViewed={contentsViewed}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

function Page(props: any) {
  const { name, content, totalHours, contentsViewed } = props;
  
  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any,
  })

  return (
    <div>
      <div ref={componentRef} className="bg-white mt-4 mx-4 shadow-xl border-2 border-slate-100">
        <div className="w-full flex justify-between">
          <div>
            <img alt="" src="/certificate/tl.png" />
          </div>
          <div>
            <img alt="" src="/certificate/tr.png" />
          </div>
        </div>

        <div className="text-center -mt-36 text-6xl tracking-wide">
          CERTIFICADO
        </div>
        <div className="px-60 divider text-xl">DE CONCLUSÃO</div>

        <div className="mt-16 px-60 text-xl text-center font-bold uppercase">
          {name} COMPLETOU COM SUCESSO O {content} PELA INSTITUIÇÃO VOCÊ
          RADIOLOGISTA, COM {totalHours} HORAS DE DURAÇÃO.
        </div>

        <div className="mt-20 w-full flex justify-center">
          <img alt="" src="/certificate/ass.png" />
        </div>

        <div className="-mt-56 w-full flex justify-between items-end">
          <div>
            <img alt="" src="/certificate/bl.png" />
          </div>
          <div>
            <img alt="" src="/certificate/br.png" />
          </div>
        </div>
      </div>
      <div className="mt-4 mb-10 flex justify-center">
        <button onClick={handlePrint} className="btn btn-sm">IMPRIMIR</button>
      </div>
    </div>
  );
}
