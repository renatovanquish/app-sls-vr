import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Share, Moon, Sun, Phone, Play } from "components/icons";
import { useBreakPoints } from "hooks/useBreakPoints";
import { useScreen } from "hooks/useScreen";
import Masonry from "react-masonry-css";
import config from "config/seo.json";
import Link from "next/link";
import Image from "next/image";

interface Props {
  className?: string;
  children?: any;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  info?: string;
  content: string;
  footerSm: string;
  footerLg: string;
}

const Footer: FC<Props> = ({
  className,
  facebook,
  twitter,
  instagram,
  youtube,
  linkedin,
  info,
  content,
  footerSm,
  footerLg,
}) => {
  const router = useRouter();
  const { isSm, isMd } = useBreakPoints();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState("");
  const { screenWidth } = useScreen();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setMounted(true);

      if (isSm) {
        if (footerSm && footerSm !== "hide") {
          setShow(footerSm);
        }
      } else {
        if (footerLg && footerLg !== "hide") {
          setShow(footerLg);
        }
      }
    }
    return () => {
      setMounted(false);
      setShow("");
    };
  }, [isSm, footerSm, footerLg]);

  const { theme, setTheme } = useTheme();

  return show ? (
    <footer className="bg-primary lg:bg-accent-1 mx-4 p-4 rounded-lg shadow-lg">
      {show === "showAll" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 justify-items-center">
          <div className="lg:col-span-2 w-full pr-0 lg:pr-20">
            <div className="flex justify-center lg:justify-start">
              <Image
                alt=""
                width={96}
                height={96}
                className="rounded-full"
                src="/icons/144x144-icon.png"
              />
            </div>
            <div className="mt-3 text-center lg:text-left font-bold text-2xl text-tertiary-2">
              Você Radiologista
            </div>
            <div className="mt-1 text-center lg:text-left text-lg text-accent-6 leading-tight">
              Ajudamos médicos a interpretar exames de imagem com segurança
              através de uma didática inovadora!
            </div>
          </div>
          {screenWidth && (
            <div className="py-2 lg:col-span-3 w-full">
              <Masonry
                breakpointCols={isSm ? 2 : 3}
                className="gallery-grid"
                columnClassName="gallery-grid_column"
              >
                <div
                  style={{
                    width: isSm
                      ? (screenWidth / 2).toFixed(0)
                      : (screenWidth / 5).toFixed(0),
                  }}
                  className="w-full mt-4 flex flex-col gap-2 lg:gap-1 px-0 md:px-2"
                >
                  <div className="pb-2 text-accent-7 text-center lg:text-left text-xl font-semibold">
                    A empresa
                  </div>
                  <Link href="/page/sobre_nos">
                    <a className="text-center lg:text-left text-accent-5">
                      Sobre nós
                    </a>
                  </Link>
                  <Link href="/page/time">
                    <a className="text-center lg:text-left text-accent-5">
                      Nosso time
                    </a>
                  </Link>
                  <Link href="/page/depoimentos">
                    <a className="text-center lg:text-left text-accent-5">
                      Depoimentos
                    </a>
                  </Link>
                  <Link href="/page/termos_de_uso">
                    <a className="text-center lg:text-left text-accent-5">
                      Termos de uso
                    </a>
                  </Link>
                  <Link href="/page/privacidade">
                    <a className="text-center lg:text-left text-accent-5">
                      Politica de privacidade
                    </a>
                  </Link>
                </div>
                <div
                  style={{
                    width: isSm
                      ? (screenWidth / 2).toFixed(0)
                      : (screenWidth / 5).toFixed(0),
                  }}
                  className="w-full mt-4 flex flex-col gap-2 lg:gap-1 px-0 md:px-2"
                >
                  <div className="pb-2 text-accent-7 text-center lg:text-left text-xl font-semibold">
                    Nossos Cursos
                  </div>
                  <Link href="/product/curso_intensivo_de_radiografia/">
                    <a className="text-center lg:text-left text-accent-5">
                      Radiografia
                    </a>
                  </Link>
                  <Link href="/product/curso_de_tomografia/">
                    <a className="text-center lg:text-left text-accent-5">
                      Tomografia
                    </a>
                  </Link>
                  <Link href="/product/curso_de_ultrassom/">
                    <a className="text-center lg:text-left text-accent-5">
                      Ultrassom
                    </a>
                  </Link>
                  <Link href="/product/curso_de_anatomia_radiologica/">
                    <a className="text-center lg:text-left text-accent-5">
                      Anatomia Radiológica
                    </a>
                  </Link>
                  <Link href="/product/curso_de_raio_x_do_torax/">
                    <a className="text-center lg:text-left text-accent-5">
                      Raio-X de Tórax
                    </a>
                  </Link>
                </div>
                <div
                  style={{
                    width: isSm
                      ? (screenWidth / 2).toFixed(0)
                      : (screenWidth / 5).toFixed(0),
                  }}
                  className="w-full mt-4 flex flex-col gap-2 lg:gap-1 px-0 md:px-2"
                >
                  <div className="pb-2 text-accent-7 text-center lg:text-left text-xl font-semibold">
                    Mais
                  </div>

                  <Link href="/page/meus_cursos/">
                    <a className="cursor-pointer flex flex-row justify-center lg:justify-start gap-2 text-accent-5 lg:text-left">
                      <Play width={20} height={20} />
                      <span>Meus Cursos</span>
                    </a>
                  </Link>

                  <a
                    href={`https://wa.me/5571993065466?lang=pt_br&text=APP`}
                    target="_blank"
                    title="Compartilhar WhatsApp"
                    className="mt-2 cursor-pointer flex flex-row justify-center lg:justify-start gap-2 text-accent-5 lg:text-left"
                    rel="noreferrer"
                  >
                    <img
                      className={`${
                        theme == "dark" ? "opacity-60" : "opacity-100"
                      }`}
                      alt=""
                      src="/whatsapp/icon.png"
                      width={22}
                      height={22}
                    />
                    <div>WhatsApp</div>
                  </a>

                  <a
                    className="mt-4 cursor-pointer flex flex-row justify-center lg:justify-start gap-2 text-accent-5 lg:text-left"
                    href={`tel:1195049-6122`}
                  >
                    <Phone width={20} height={20} />
                    <div>(71) 99306-5466</div>
                  </a>

                  <a
                    className="mt-4 cursor-pointer flex flex-row justify-center lg:justify-start gap-2 text-accent-5 lg:text-left"
                    onClick={() =>
                      theme === "dark" ? setTheme("light") : setTheme("dark")
                    }
                  >
                    <div>
                      {theme == "dark" ? (
                        <Moon width={24} height={24} />
                      ) : (
                        <Sun width={24} height={24} />
                      )}
                    </div>
                    <div>Tema</div>
                  </a>
                </div>
              </Masonry>
            </div>
          )}
        </div>
      )}

      {show === "showAll" && (
        <hr className={`my-8 lg:mt-4 ${theme == "dark" ? "opacity-30" : ""}`} />
      )}

      <div className="mx-auto flex items-center lg:flex-row flex-col">
        {!isSm && !isMd && info && (
          <div>
            <div
              className="font-medium text-accent-6 text-sm text-center lg:text-base lg:text-left pt-6 lg:pt-0"
              dangerouslySetInnerHTML={{ __html: info }}
            />
            <a
              className="cursor-pointer flex flex-row justify-center lg:justify-start gap-2 text-accent-5 lg:text-left"
              href={`mailto:contato@invictusimoveis.com.br`}
            >
              <div className="text-xs">contato@voceradiologista.com.br</div>
            </a>
          </div>
        )}
        <div className="inline-flex lg:ml-auto justify-center lg:justify-start">
          {(mounted && window && window.navigator && window.navigator.canShare) && (
            <div
              className="mr-6 text-accent-6"
              onClick={async () => {
                const path = router.asPath.substr(1);
                const pathFmt =
                  path.indexOf("?") === -1
                    ? path
                    : path.substring(0, path.indexOf("?"));
                await window.navigator.share({
                  title: config.title,
                  text: config.description,
                  url: `${process.env.URL}${pathFmt}`,
                });
              }}
            >
              <Share width={21} height={21} />
            </div>
          )}

          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noreferrer"
              className="text-accent-7"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noreferrer"
              className="ml-6 text-accent-7"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="ml-6 text-accent-7"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
          )}
          {youtube && (
            <a
              style={{ marginTop: -1 }}
              href={youtube}
              target="_blank"
              rel="noreferrer"
              className="ml-6 text-accent-7"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-8 h-8"
                viewBox="0 0 16 16"
              >
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
              </svg>
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="ml-6 text-accent-7"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          )}
        </div>
        {(isSm || isMd) && info && (
          <div
            className="text-accent-6 text-sm text-center lg:text-left pt-6 lg:pt-0"
            dangerouslySetInnerHTML={{ __html: info }}
          />
        )}
      </div>
    </footer>
  ) : (
    <></>
  );
};

export default Footer;
