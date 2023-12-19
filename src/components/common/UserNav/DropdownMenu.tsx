import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { FC, useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import s from "./DropdownMenu.module.css";
import { useUI } from "components/ui/context";
import { useUserAuth } from "components/userAuth/context";
import ClickOutside from "lib/click-outside";
import { useBreakPoints } from "hooks/useBreakPoints";

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import {
  Home,
  Logout,
  Person,
  Team,
  Power,
  Phone,
  Play,
  Files,
  Moon,
  Sun,
  QrCode
} from "components/icons";

interface DropdownMenuProps {
  open?: boolean;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false }) => {
  const { theme, setTheme } = useTheme();
  const { closeSidebarIfPresent, hideSearch, config } = useUI();
  const { user, signOut } = useUserAuth();
  const { isSm } = useBreakPoints();

  const [display, setDisplay] = useState(false);
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>;

  const router = useRouter();
  const { pathname } = router;
  const rootPathname = pathname.split("/")[1];

  const isHome = router.asPath == process.env.HOME;
  const isMyAccount = rootPathname === "my-account";
  const isMyCourses = router.asPath === "/page/meus_cursos/";
  const isAdmin = rootPathname === "admin";
  const isRelation = rootPathname.indexOf("relation") > -1;
  const isOrders = router.asPath == "/orders/";
  const isQrCode = rootPathname === "qrcode";

  useEffect(() => {
    if (ref.current) {
      if (display) {
        if (isSm) {
          hideSearch();
        }
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [display]);

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div>
        <button
          style={{ outline: "none" }}
          className={s.avatarButton}
          onClick={() => setDisplay(!display)}
          aria-label="Menu"
        >
          {!user.tempAvatar && (
            <div className="avatar">
              <div
                style={{ width: 42, height: 42 }}
                className="inline-block rounded-full border-2 border-accent-3 transition linear-out duration-150"
              >
                {user && user.avatar && (
                  <Image
                    src={`${process.env.MIDIA_CLOUDFRONT}${user.avatar}`}
                    alt=""
                    width={42}
                    height={42}
                    className="rounded-full"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = "/user/user.png";
                    }}
                  />
                )}
                {(!user || !user.avatar) && (
                  <img alt="" src="/user/user.png" className="rounded-full" />
                )}
              </div>
            </div>
          )}
          {user.tempAvatar && (
            <div className="avatar">
              <div
                style={{ width: 42, height: 42 }}
                className="inline-block rounded-full border-2 border-accent-3 transition linear-out duration-150"
              >
                <img
                  alt=""
                  className="rounded-full"
                  src={user.tempAvatar}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = "/user/user.png";
                  }}
                />
              </div>
            </div>
          )}
        </button>
        {display && (
          <ul className={s.dropdownMenu} ref={ref}>
            <li key="home">
              <Link href={`${process.env.HOME}`}>
                <a
                  className={cn(s.link, {
                    ["border-t border-accent-2"]: isSm,
                    [s.active]: isHome,
                  })}
                  onClick={() => {
                    setDisplay(false);
                    closeSidebarIfPresent();
                  }}
                >
                  <Home width={20} height={20} />
                  <span className="ml-3">Home</span>
                </a>
              </Link>
            </li>

            <li key="my-account">
              <div>
                <Link href="/my-account">
                  <a
                    className={cn(s.link, {
                      ["border-t border-accent-2"]: isSm,
                      [s.active]: isMyAccount,
                    })}
                    onClick={() => {
                      setDisplay(false);
                      closeSidebarIfPresent();
                    }}
                  >
                    <Person width={20} height={20} />
                    <span className="ml-3">Perfil</span>
                  </a>
                </Link>
              </div>
            </li>

            <li key="my-courses">
              <div>
                <Link href="/page/meus_cursos/">
                  <a
                    className={cn(s.link, {
                      ["border-t border-accent-2"]: isSm,
                      [s.active]: isMyCourses,
                    })}
                    onClick={() => {
                      setDisplay(false);
                      closeSidebarIfPresent();
                    }}
                  >
                    <Play width={20} height={20} />
                    <span className="ml-3">Meus Cursos</span>
                  </a>
                </Link>
              </div>
            </li>

            <li key="orders">
              <div>
                <Link href="/orders">
                  <a
                    className={cn(s.link, {
                      ["border-t border-accent-2"]: isSm,
                      [s.active]: isOrders,
                    })}
                    onClick={() => {
                      setDisplay(false);
                      closeSidebarIfPresent();
                    }}
                  >
                    <Files width={20} height={20} />
                    <span className="ml-3">Minhas Compras</span>
                  </a>
                </Link>
              </div>
            </li>

            {config && config.phoneSac && (
              <li key="phone">
                <a
                  className={cn(s.link, {
                    ["border-t border-accent-2"]: isSm,
                  })}
                  href={`tel:${config.phoneSac.substring(
                    3,
                    config.phoneSac.length
                  )}`}
                >
                  <Phone width={20} height={20} />
                  <span className="ml-3">Atendimento</span>
                </a>
              </li>
            )}

            {user && config && config.phoneWhatsapp && (
              <li key="w1">
                <a
                  href={`https://wa.me/${config.phoneWhatsapp}?lang=pt_br&text=Olá,%20me%20chamo%20${user.name}%20e%20sou%20usuário(a)%20do%20App.`}
                  target="_blank"
                  title="WhatsApp"
                  className={cn(s.link, {
                    ["border-t border-accent-2"]: isSm,
                  })}
                  rel="noreferrer"
                >
                  <img alt="" src="/whatsapp/icon.png" width={22} height={22} />
                  <span className="ml-3">WhatsApp</span>
                </a>
              </li>
            )}

            {false && (
              <li key="relation">
                <div>
                  <Link href="/relations">
                    <a
                      className={cn(s.link, {
                        ["border-t border-accent-2"]: isSm,
                        [s.active]: isRelation,
                      })}
                      onClick={() => {
                        setDisplay(false);
                        closeSidebarIfPresent();
                      }}
                    >
                      <Team width={20} height={20} />
                      <span className="ml-3">Contatos</span>
                    </a>
                  </Link>
                </div>
              </li>
            )}

            {user.isAdmin && (
              <li key="admin">
                <div>
                  <Link href="/admin">
                    <a
                      className={cn(s.link, {
                        ["border-t border-accent-2"]: isSm,
                        [s.active]: isAdmin,
                      })}
                      onClick={() => {
                        setDisplay(false);
                        closeSidebarIfPresent();
                      }}
                    >
                      <Power width={20} height={20} />
                      <span className="ml-3">Admin</span>
                    </a>
                  </Link>
                </div>
              </li>
            )}

            <li key="qrcode">
              <div>
                <Link href="/qrcode/">
                  <a
                    className={cn(s.link, {
                      ["border-t border-accent-2"]: isSm,
                      [s.active]: isQrCode,
                    })}
                    onClick={() => {
                      setDisplay(false);
                      closeSidebarIfPresent();
                    }}
                  >
                    <QrCode width={20} height={20} />
                    <span className="ml-3">QrCode</span>
                  </a>
                </Link>
              </div>
            </li>

            <li key="theme">
              <a
                className={cn(s.link, {
                  ["border-t border-accent-2"]: isSm,
                })}
                onClick={() =>
                  theme === "dark" ? setTheme("light") : setTheme("dark")
                }
              >
                <div>
                  {theme == "dark" ? (
                    <Moon width={20} height={20} />
                  ) : (
                    <Sun width={20} height={20} />
                  )}
                </div>
                <div className="ml-3">Tema</div>
              </a>
            </li>

            <li>
              <a
                className={cn(s.link, "border-t border-accent-2")}
                onClick={() => {
                  signOut(user.id);
                }}
              >
                <Logout width={20} height={20} />
                <span className="ml-3">Desconectar</span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownMenu;
