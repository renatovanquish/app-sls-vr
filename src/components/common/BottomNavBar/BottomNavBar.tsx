import { FC, useEffect, useState } from "react";
import { Home, Team, Person, Play, Files, QrCode } from "components/icons";
import { useRouter } from "next/router";
import { useUI } from "components/ui/context";
import Link from "next/link";
import s from "./BottomNavBar.module.css";
import cn from "classnames";
import { Device } from "@capacitor/device";
import { useTheme } from "next-themes";

interface Props {
  user: any;
}

const BottomNavBar: FC<Props> = (props: Props) => {
  const { user } = props;

  const { setItemListSelected, setItemListMode, config } = useUI();

  const router = useRouter();
  const { pathname } = router;
  const rootPathname = pathname.split("/")[1];

  const isHome = router.asPath == process.env.HOME;
  const isMyAccount = rootPathname === "my-account";
  const isAdmin = rootPathname === "admin";
  const isRelations = rootPathname === "relations";
  const isOrders = router.asPath == "/orders/";
  const isMyCourses = rootPathname === "my-courses";
  const isQrCode = router.asPath == "/qrcode/";

  const [device, setDevice] = useState({} as any);
  const [isPWA, setIsPWA] = useState(false);
  const [configNavBar, setConfigNavBar] = useState({} as any);

  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const logDeviceInfo = async () => {
        const info = await Device.getInfo();
        setDevice(info);
        if (window.matchMedia("(display-mode: standalone)").matches) {
          setIsPWA(true);
        }
      };
      logDeviceInfo();

      /*
      if (config.navBar) {
        const c = JSON.parse(config.navBar.toString())
        setConfigNavBar(c)
      }
      */
    }
    return () => {
      setDevice({} as any);
      setConfigNavBar({} as any);
    };
  }, [config]);

  return user ? (
    <section
      className={cn(
        "text-accent-6 z-50 block fixed inset-x-0 bottom-0 border-t-2 border-accent-2 rounded-t-box",
        {
          "pb-4": isPWA && device.model === "iPhone",
          "backdrop-blur-md bg-white/80": theme === "light",
          "backdrop-blur-md bg-black/80": theme === "dark",
        }
      )}
    >
      <div className="flex justify-around">
        <Link href={`${process.env.HOME}`}>
          <a className={cn(s.link, { [s.active]: isHome })}>
            <Home width={26} height={26} />
            <span className="block mt-1 subpixel-antialiased text-xs">
              Home
            </span>
          </a>
        </Link>

        {user && (
          <Link href="/page/meus_cursos/">
            <a
              className={cn(s.link, {
                [s.active]: isMyCourses,
              })}
            >
              <Play width={26} height={26} />
              <span className="block mt-1 subpixel-antialiased">
                Meus Cursos
              </span>
            </a>
          </Link>
        )}

        {user && (
          <Link href="/orders/">
            <a
              className={cn(s.link, {
                [s.active]: isOrders,
              })}
            >
              <Files width={26} height={26} />
              <span className="block mt-1 subpixel-antialiased text-xs">
                Compras
              </span>
            </a>
          </Link>
        )}

        {false && (
          <a
            className={cn(s.link, {
              [s.active]: isRelations,
            })}
            onClick={() => {
              if (isRelations) {
                setItemListSelected(false);
                setItemListMode("");
              } else {
                router.push("/relations/");
              }
            }}
          >
            <Team width={26} height={26} />
            <span className="block mt-1 subpixel-antialiased text-xs">
              Contatos
            </span>
          </a>
        )}

        {user && (
          <Link href="/my-account">
            <a
              className={cn(s.link, {
                [s.active]: isMyAccount,
              })}
            >
              <Person width={26} height={26} />
              <span className="block mt-1 subpixel-antialiased text-xs">
                Perfil
              </span>
            </a>
          </Link>
        )}

        {user && (
          <Link href="/qrcode/">
            <a
              className={cn(s.link, {
                [s.active]: isQrCode,
              })}
            >
              <QrCode width={26} height={26} />
              <span className="block mt-1 subpixel-antialiased text-xs">
                Qrcode
              </span>
            </a>
          </Link>
        )}
      </div>
    </section>
  ) : (
    <></>
  );
};

export default BottomNavBar;
