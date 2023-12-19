import { useEffect, useState } from "react";
import { Layout } from "components/common";
import { Loading } from "components/ui";
import { useUserAuth } from "components/userAuth/context";
import { useUI } from "components/ui/context";
import { useBreakPoints } from "hooks/useBreakPoints";
import { Device } from "@capacitor/device";
import { QrReader } from "react-qr-reader";
import { toast } from "react-toast";
import { useUser } from "hooks/useUser";
import { useLog } from "hooks/useLog";
import { useQrCodeScan } from "hooks/useQrCodeScan";
import { useRelationLink } from "hooks/useRelationLink";
import { validate as uuidValidate } from "uuid";
import cn from "classnames";
import Moment from "moment";

export default function QrCodePage() {
  const { user } = useUserAuth();
  const { hideSearch, showNavBarBottom } = useUI();
  const { isSm } = useBreakPoints();
  const { updateProfile } = useUser();
  const { setLogUser } = useLog();
  const { createQrCodeScan } = useQrCodeScan();
  const { listRelationsLinkByRelationUser } = useRelationLink();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [device, setDevice] = useState({} as any);
  const [uuid, setUuid] = useState("");
  const [showQrCode, setShowQrCode] = useState(true);

  useEffect(() => {
    hideSearch();
    showNavBarBottom();

    const Checks = async () => {
      setLoading(true);
      let d = (await Device.getInfo()) as any;
      const u = await Device.getId();
      d.uuid = u.uuid;
      setDevice(d);
      setLoading(false);
      setVerified(true);
    };

    if (user && user.profile) {
      setUuid(user.profile.uuid);
      Checks();
    }

    return () => {
      setLoading(true);
      setVerified(false);
      setDevice({} as any);
      setShowQrCode(true);
    };
  }, [user]);

  const registerMobile = async () => {
    await updateProfile({
      userID: user.id,
      uuid: device.uuid,
    });
    setUuid(device.uuid);

    setLogUser({
      userID: user.id,
      tag: "REGISTRO DE CELULAR",
      notes: "Registro de celular na conta.",
      message: JSON.stringify(device),
    });

    toast.hideAll();
    toast("Celular registrado com sucesso.", {
      backgroundColor: "#263238",
      color: "#fff",
    });
  };

  return (
    <div className="px-4">
      {loading && <Loading />}

      {verified && !uuid && (
        <div className="mt-4 flex flex-col items-center">
          <button
            className={cn("btn", {
              "btn-block": isSm,
              "btn-wide": !isSm,
            })}
            onClick={() => {
              registerMobile();
            }}
          >
            Registrar seu Celular
          </button>
          <div className="mt-4 text-center">
            <div className="text-xl font-semibold">
              Sua conta não possui um celular registrado.
            </div>
            <div className="mt-2">
              Para acessar os cursos através de um computador ou tablet, é
              necessário escanear o qrcode do curso com seu celular previamente
              registrado em sua conta.
            </div>
            <div>
              Caso você esteja utilizando o seu celular, faço o registro,
              clicando no botão acima.
            </div>
            <div className="text-red-500">
              Lembre-se que você sempre precisará estar com este celular em mãos
              para escanear o qrcode e ter acesso aos cursos. Após realizar o
              registro, ele somente poderá ser alterado pelo suporte do Você
              Radiologista.
            </div>
          </div>
        </div>
      )}

      {verified && uuid && uuid === device.uuid && showQrCode && (
        <div className="-mt-5 flex flex-col items-center">
          <QrReader
            onResult={async (result: any, error) => {
              if (!!result) {
                const resultParts = result.text.split("|");
                const qrCodeUserID = resultParts[0];
                const qrCodeRelationID = resultParts[1];
                const qrCodeTimestamp = resultParts[2];

                const seconds = Moment().diff(
                  Moment.unix(qrCodeTimestamp),
                  "seconds"
                );

                if (
                  !qrCodeUserID ||
                  !uuidValidate(qrCodeUserID) ||
                  !qrCodeRelationID ||
                  !uuidValidate(qrCodeRelationID) ||
                  !qrCodeTimestamp ||
                  qrCodeUserID != user.id
                ) {
                  toast.hideAll();
                  toast("Qrcode inválido.", {
                    backgroundColor: "#ef4444",
                    color: "#fff",
                  });
                  return null;
                }

                const { items } = await listRelationsLinkByRelationUser({
                  relationID: qrCodeRelationID,
                  userID: { eq: qrCodeUserID },
                });

                if (items.length === 0) {
                  toast.hideAll();
                  toast("Você não tem acesso a este curso.", {
                    backgroundColor: "#ef4444",
                    color: "#fff",
                  });
                  return null;
                }

                if (seconds <= 10) {
                  await createQrCodeScan({
                    userID: qrCodeUserID,
                    relationID: qrCodeRelationID,
                    uuid: device.uuid,
                  });
                  setShowQrCode(false);
                  toast.hideAll();
                  toast("Escaner realizado com sucesso.", {
                    backgroundColor: "#263238",
                    color: "#fff",
                  });
                }
              }
            }}
            constraints={{ facingMode: "environment" }}
            containerStyle={{ width: 300 }}
          />
          <div className="text-center text-lg font-semibold">
            Aponte sua camera para o qrcode do curso.
          </div>
        </div>
      )}

      {verified && uuid && uuid !== device.uuid && showQrCode && (
        <div className="mt-4 bg-accent-2 rounded p-4 text-red-600">
          <div className="text-center text-xl font-semibold">Este celular possui um ID diferente do registrado em sua conta.</div>
          <div className="text-center ">
             É necessário utilizar o mesmo celular utilizado no registro para
            escanear o qrcode do curso ou solicitar para o suporte reiniciar seu
            registro.
          </div>
        </div>
      )}

      {verified && uuid && uuid === device.uuid && showQrCode && (
        <div className="-mt-10 flex flex-col items-center">
          <QrReader
            onResult={async (result: any, error) => {
              if (!!result) {
                const resultParts = result.text.split("|");
                const qrCodeUserID = resultParts[0];
                const qrCodeRelationID = resultParts[1];
                const qrCodeTimestamp = resultParts[2];

                const seconds = Moment().diff(
                  Moment.unix(qrCodeTimestamp),
                  "seconds"
                );

                if (
                  !qrCodeUserID ||
                  !uuidValidate(qrCodeUserID) ||
                  !qrCodeRelationID ||
                  !uuidValidate(qrCodeRelationID) ||
                  !qrCodeTimestamp ||
                  qrCodeUserID != user.id
                ) {
                  toast.hideAll();
                  toast("Qrcode inválido.", {
                    backgroundColor: "#ef4444",
                    color: "#fff",
                  });
                  return null;
                }

                const { items } = await listRelationsLinkByRelationUser({
                  relationID: qrCodeRelationID,
                  userID: { eq: qrCodeUserID },
                });

                if (items.length === 0) {
                  toast.hideAll();
                  toast("Você não tem acesso a este curso.", {
                    backgroundColor: "#ef4444",
                    color: "#fff",
                  });
                  return null;
                }

                if (seconds <= 10) {
                  await createQrCodeScan({
                    userID: qrCodeUserID,
                    relationID: qrCodeRelationID,
                    uuid: device.uuid,
                  });
                  setShowQrCode(false);
                  toast.hideAll();
                  toast("Escaner realizado com sucesso.", {
                    backgroundColor: "#263238",
                    color: "#fff",
                  });
                }
              }
            }}
            constraints={{ facingMode: "environment" }}
            containerStyle={{ width: isSm ? "100%" : "50%" }}
          />
          <div className="text-center text-lg font-semibold">
            Aponte sua camera para o qrcode.
          </div>
        </div>
      )}

      {!showQrCode && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              setShowQrCode(true);
            }}
            className="btn"
          >
            Escanear novamente?
          </button>
        </div>
      )}

      <pre>{JSON.stringify(device, null, 4)}</pre>
    </div>
  );
}

QrCodePage.Layout = Layout;
