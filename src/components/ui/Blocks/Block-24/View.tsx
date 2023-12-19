/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { Loading } from "components/ui";
import { useBreakPoints } from "hooks/useBreakPoints";
import { Info } from "components/icons";
import cn from "classnames";
import Image from "next/image";
import generateSortFn from "lib/generateSortFn";
import { useRelationLink } from "hooks/useRelationLink";
import { ListRelationsLinkByUserTypeNotifyUpdatedAtQueryVariables } from "API";
import getPhoto from "lib/getPhoto";
import { useScreen } from "hooks/useScreen";
import Access from "./Access";
import { useTheme } from "next-themes";
import { useRestrictedContentView } from "hooks/useRestrictedContentView";

interface Props {
  block: any;
  user?: any;
  hasLateral: boolean;
}

export default function View(props: Props) {
  const { block, user, hasLateral } = props;
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({} as any);
  const [config, setConfig] = useState({} as any);
  const [relationLinks, setRelationLinks] = useState([] as any);
  const [contentSel, setContentSel] = useState(false as any);

  const { isSm } = useBreakPoints();
  const { screenWidth } = useScreen();
  const { theme } = useTheme();

  const { listRelationsLinkByUserTypeNotifyUpdatedAt } = useRelationLink();
  const { listRestrictedContentViewByRestrictedContentUser } =
    useRestrictedContentView();

  const fetchRL = async (type: string, types: any) => {
    setLoading(true);
    if (type !== "ALL") {
      const { items, nextToken } =
        await listRelationsLinkByUserTypeNotifyUpdatedAt({
          userID: user.id,
          typeNotifyUpdatedAt: {
            between: [
              { type, notify: 0 },
              { type, notify: 999999999 },
            ],
          },
          limit: 1000,
        } as ListRelationsLinkByUserTypeNotifyUpdatedAtQueryVariables);
      const rls = items.map((item: any) => {
        const tl = types.find((t: any) => t.type === item.type);
        item.typeLabel = tl ? tl.label : "";
        return item;
      });
      const rls2 = rls.sort(
        generateSortFn([
          { name: "typeLabel", reverse: false },
          { name: "search", reverse: false },
        ])
      );
      setRelationLinks(rls2);
      setLoading(false);
    } else {
      const all = types
        .sort(generateSortFn([{ name: "type", reverse: false }]))
        .map(async (t: any) => {
          const { items, nextToken } =
            await listRelationsLinkByUserTypeNotifyUpdatedAt({
              userID: user.id,
              typeNotifyUpdatedAt: {
                between: [
                  { type: t.type, notify: 0 },
                  { type: t.type, notify: 999999999 },
                ],
              },
              limit: 1000,
            } as ListRelationsLinkByUserTypeNotifyUpdatedAtQueryVariables);
          const itemsFmt: any[] = [];
          items.map((item: any) => {
            if (item && item.relation && item.relation.status === "rc-on") {
              item.relation.config = JSON.parse(item.relation.config)
              const tl = types.find((t: any) => t.type === item.type);
              item.typeLabel = tl ? tl.label : "";
              itemsFmt.push(item);
            }
          });
          setRelationLinks((relationLinks: any) => [
            ...relationLinks,
            ...itemsFmt,
          ]);
        });
      const combine = Promise.all(all);
      await combine;
      setLoading(false);
    }
  };

  const fetchRC = async () => {
    const rlFmt = relationLinks.map(async (rl: any) => {
      let totalViewed = 0;
      const rrcFmt = rl.relation.restrictedContents.items.map(
        async (rrc: any) => {
          const { items } =
            await listRestrictedContentViewByRestrictedContentUser({
              restrictedContentID: rrc.id,
              userID: { eq: user.id },
            });
          rrc.viewed =
            items && items[0] && items[0].percentage ? items[0].percentage : 0;
          totalViewed = totalViewed + rrc.viewed;
          return rrc;
        }
      );
      const combineRRC = Promise.all(rrcFmt);
      const r = await combineRRC;
      rl.relation.restrictedContents.items = r;
      rl.totalContent = rl.relation.restrictedContents.items.length * 100;
      rl.totalViewed = ((totalViewed / rl.totalContent) * 100).toFixed(0);
      return rl;
    });
    const combineRL = Promise.all(rlFmt);
    const r2 = await combineRL;
    setRelationLinks(r2);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (block && block.config) {
        const configParse = JSON.parse(block.config);
        setConfig(configParse);
      }
      if (block && block.content) {
        const contentParse = JSON.parse(block.content);
        setContent(contentParse);

        const t = (process.env.RELATIONS as any).filter((rl: any) => {
          return rl.restricted;
        });

        if (user && user.id) {
          setLoading(true);
          fetchRL(contentParse.type, t);
        } else {
          setLoading(false);
        }
      }
    }
    return () => {
      isMounted = false;
      setLoading(true);
      setContent({} as any);
      setConfig({} as any);
      setRelationLinks([] as any);
      setContentSel(false as any);
    };
  }, [block, user]);

  useEffect(() => {
    if (!loading && relationLinks.length > 0) {
      fetchRC();
    }
  }, [loading]);

  return (
    <section
      className={cn({
        ["hidden"]: config.view === "hide" || (config.view === "guest" && user),
        ["md:hidden"]: config.view === "sm",
        ["hidden md:block"]: config.view === "lg",
        ["px-0"]: config.padX && config.padX === "none",
        ["px-4"]: !config.padX || config.padX === "small",
        ["px-8"]: config.padX && config.padX === "normal",
        ["px-12"]: config.padX && config.padX === "large",
        ["px-24"]: config.padX && config.padX === "extra",
        ["py-0"]: config.padY && config.padY === "none",
        ["py-4"]: !config.padY || config.padY === "small",
        ["py-8"]: config.padY && config.padY === "normal",
        ["py-12"]: config.padY && config.padY === "large",
        ["py-24"]: config.padY && config.padY === "extra",
        ["bg-accent-1"]: config.bgMode === "auto",
        ["bg-local"]: config.bgMode === "image",
      })}
      style={{
        backgroundColor:
          config.bgMode === "custom" && config.bgColor ? config.bgColor : null,
        backgroundImage:
          config.bgMode === "image" ? `url(${config.bgImage})` : "",
        backgroundRepeat: config.bgMode === "image" ? "no-repeat" : "",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {config.anchor && <a id={`${config.anchor}`}></a>}

      {(!contentSel || relationLinks.length === 0) && (
        <div
          className={cn({
            "px-4": config.padX === "none",
            "pb-20": isSm,
          })}
        >
          {loading && <Loading />}

          {!loading && relationLinks.length === 0 && (
            <div className="alert bg-orange-100 text-dark text-xl">
              <div className="flex-1">
                <div className="pt-2">
                  <Info width={32} height={32} />
                </div>
                <label className="ml-4">
                  <h4>Nenhum conteúdo disponível.</h4>
                  <p className="text-sm text-base-content text-opacity-60">
                    Retorne novamente em breve, por favor.
                  </p>
                </label>
              </div>
            </div>
          )}

          {!contentSel && (
            <div className="flex flex-row justify-evenly gap-10 mx-auto flex-wrap">
              {relationLinks.map(
                (item: any, index: number) =>
                  item.relation.status === "rc-on" && (
                    <div
                      key={index}
                      style={
                        isSm
                          ? { width: screenWidth }
                          : {
                              minWidth: 320,
                              maxWidth:
                                screenWidth >= 630 && screenWidth < 700
                                  ? 270
                                  : screenWidth >= 700 && screenWidth < 800
                                  ? 300
                                  : screenWidth >= 800 && screenWidth < 950
                                  ? 320
                                  : screenWidth >= 950 && screenWidth < 1116
                                  ? 280
                                  : screenWidth >= 1116 && screenWidth < 1282
                                  ? 300
                                  : screenWidth >= 1282 && screenWidth < 1450
                                  ? 320
                                  : screenWidth < 630
                                  ? screenWidth * 0.8
                                  : 320,
                              width:
                                screenWidth < 630 ? screenWidth * 0.6 : "auto",
                            }
                      }
                      className={cn(
                        "cursor-pointer rounded-lg shadow-lg md:hover:shadow-xl transform transition duration-500 md:hover:scale-105",
                        {
                          "bg-accent-0": theme === "light",
                          "bg-accent-1": theme === "dark",
                          "w-full": isSm,
                          "m-4": !isSm,
                        }
                      )}
                      onClick={() => {
                        setContentSel(item);
                      }}
                    >
                      {content.thumbnail !== "hide" && (
                        <div className="relative h-56 w-full">
                          <Image
                            alt={item.name}
                            className="object-cover object-center rounded-t-lg"
                            src={getPhoto(item.relation.avatar)}
                            layout="fill"
                          />
                        </div>
                      )}

                      <div className="p-4">
                        <div className="flex justify-between">
                          <div className="font-bold text-xl">
                            {item.relation.name}
                          </div>
                          {item.notify != "0" && (
                            <div className="btn btn-circle btn-xs bg-red-500 border-none text-white font-semibold">
                              {item.notify}
                            </div>
                          )}
                        </div>
                        {content.showDescription !== "hide" &&
                          item.relation.description && (
                            <div
                              className={cn("mt-1 text-accent-8", {
                                "line-clamp-1":
                                  content.showDescription === "show-1",
                                "line-clamp-2":
                                  content.showDescription === "show-2",
                                "line-clamp-3":
                                  content.showDescription === "show-3",
                              })}
                            >
                              {item.relation.description}
                            </div>
                          )}
                        {content.showReference !== "hide" &&
                          item.relation.reference && (
                            <div
                              className={cn("mt-3 text-accent-5 text-sm", {
                                "line-clamp-1":
                                  content.showReference === "show-1",
                                "line-clamp-2":
                                  content.showReference === "show-2",
                                "line-clamp-3":
                                  content.showReference === "show-3",
                              })}
                            >
                              {item.relation.reference}
                            </div>
                          )}
                        <progress
                          className="progress progress-accent w-full"
                          value={item.totalViewed}
                          max="100"
                        ></progress>
                        <div className="text-xs text-accent-9">
                          Seu progresso
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      )}

      {contentSel && (
        <Access
          relationLink={contentSel}
          security={content.security}
          setContentSel={setContentSel}
          user={user}
          padX={config.padX}
        />
      )}

      {false && <pre>{JSON.stringify(contentSel, null, 4)}</pre>}
    </section>
  );
}
