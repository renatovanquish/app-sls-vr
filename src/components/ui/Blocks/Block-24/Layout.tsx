import { useState, useEffect, useRef } from "react";
import { useBreakPoints } from "hooks/useBreakPoints";
import generateSortFn from "lib/generateSortFn";
import cn from "classnames";
import { useUI } from "components/ui/context";
import { useSchedule } from "hooks/useSchedule";
import { useScreen } from "hooks/useScreen";
import useElementSize from "hooks/useElementSize";
import { ArrowLeft } from "components/icons";

import { Storage } from "aws-amplify";
Storage.configure({ level: "protected" });

import Moment from "moment";

import Play from "./Play";
import List from "./List";
import Info from "./Info";
import Extra from "./Extra";
import Schedules from "./Schedules";
import Rating from "./Rating";
import Certificate from "./Certificate";

import { Message } from "components/message";

interface Props {
  relationLink: any;
  user: any;
  padX: string;
  setContentSel: any;
}

export default function Layout(props: Props) {
  const { relationLink, user, padX, setContentSel } = props;
  const { isSm, isMd } = useBreakPoints();
  const [tabSel, setTabSel] = useState(0);
  const [contents, setContents] = useState([] as any);
  const [restrictedContentSel, setRestrictedContentSel] = useState({} as any);
  const [extra, setExtra] = useState([] as any);
  const [schedules, setSchedules] = useState(false as any);
  const { hideSearch, showSearch, heightNavBar } = useUI();
  const { listSchedulesByRelationDateTime } = useSchedule();
  const { screenHeight } = useScreen();
  const [squareRef, { width, height }] = useElementSize();

  useEffect(() => {
    let isMounted = true;
    if (isMounted && relationLink && relationLink.id) {
      hideSearch();
      const s = breakGroup(
        relationLink.relation.restrictedContents.items.sort(
          generateSortFn([
            { name: "group", reverse: false },
            { name: "subGroup", reverse: false },
            { name: "order", reverse: false },
          ])
        )
      );
      const s2 = s.map((item: any) => {
        return {
          ...item,
          content: item.content ? JSON.parse(item.content) : {},
        };
      });
      let lastView = localStorage.getItem(relationLink.relation.id)
        ? (localStorage.getItem(relationLink.relation.id) as any)
        : 0;
      setRestrictedContentSel(s2[lastView]);
      setContents(s2);

      const fetchSchedules = async () => {
        const { items } = await listSchedulesByRelationDateTime({
          relationID: relationLink.relation.id,
        });
        setSchedules(items);
      };
      fetchSchedules();
    }
    return () => {
      isMounted = false;
      showSearch();
      setSchedules(false as any);
    };
  }, [relationLink]);

  useEffect(() => {
    if (restrictedContentSel && restrictedContentSel.id) {
      const fetchExtras = async (id: string, identityId: string) => {
        setExtra([] as any);
        const items = await Storage.list(`restricted/${id}/extra/`, {
          level: "protected",
          identityId,
        });
        const { files } = processStorageList(items);
        setExtra(files);
      };
      fetchExtras(restrictedContentSel.id, restrictedContentSel.identityId);
    }
  }, [restrictedContentSel]);

  return isSm || isMd ? (
    <div>
      {restrictedContentSel && (
        <div>
          <div ref={squareRef}>
            <Play width={width} contentSel={restrictedContentSel} userID={user.id} />
            <div className="w-full flex flex-row justify-between gap-4 bg-slate-200 p-1 md:p-2">
              <div
                onClick={() => setTabSel(0)}
                className={cn(
                  "text-center cursor-pointer py-1 px-4 rounded line-clamp-1",
                  { "bg-accent-0 text-accent-9 font-bold shadow": tabSel === 0 }
                )}
              >
                {restrictedContentSel.title}
              </div>
              <div
                onClick={() => setTabSel(1)}
                className={cn("text-center cursor-pointer py-1 px-4 rounded", {
                  "bg-accent-0 text-accent-9 font-bold shadow": tabSel === 1,
                })}
              >
                Aulas
              </div>
              {extra.length > 0 && (
                <div
                  onClick={() => setTabSel(2)}
                  className={cn(
                    "text-center cursor-pointer py-1 px-4 rounded",
                    {
                      "bg-accent-0 text-accent-9 font-bold shadow":
                        tabSel === 2,
                    }
                  )}
                >
                  Extras
                </div>
              )}
              {schedules.length > 0 && (
                <div
                  onClick={() => setTabSel(3)}
                  className={cn(
                    "text-center cursor-pointer py-1 px-4 rounded",
                    {
                      "bg-accent-0 text-accent-9 font-bold shadow":
                        tabSel === 3,
                    }
                  )}
                >
                  Avisos
                </div>
              )}
            </div>
          </div>

          <div
            style={{ height: screenHeight - (height + heightNavBar) }}
            className="pb-20 overflow-y-auto"
          >
            {tabSel === 0 && (
              <div className={cn({ "px-4": padX === "none" })}>
                <Info contentSel={restrictedContentSel} />
                <div className="mt-6 flex flex-row justify-between">
                  <a
                    onClick={() => setContentSel(false as any)}
                    className="btn btn-outline btn-sm"
                  >
                    <ArrowLeft /> Meus Cursos
                  </a>
                  <Rating contentSel={restrictedContentSel} userID={user.id} />
                </div>

                <div className="h-6"></div>
                <Message
                  userID={user.id}
                  relationID={relationLink.relation.id}
                  restrictedContentID={restrictedContentSel.id}
                  id="restrictedContentID"
                  members={relationLink.relation.members}
                  title="Comentários"
                  moderation={true}
                />
              </div>
            )}

            {tabSel === 1 && (
              <div className={cn("pt-4", { "px-4": padX === "none" })}>
                <List
                  contents={contents}
                  setContentSel={setRestrictedContentSel}
                  contentSel={restrictedContentSel}
                  setTabSel={setTabSel}
                  userID={user.id}
                  relationID={relationLink.relation.id}
                />

                <Certificate relationLink={relationLink} user={user} />
              </div>
            )}

            {tabSel === 2 && (
              <div className={cn({ "px-4": padX === "none" })}>
                <Extra
                  user={user}
                  content={extra}
                  identityId={restrictedContentSel.identityId}
                />
              </div>
            )}

            {tabSel === 3 && (
              <div className={cn("pt-4", { "px-4": padX === "none" })}>
                <Schedules items={schedules} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>
      {restrictedContentSel && (
        <div className="grid grid-cols-3 gap-4">
          <div ref={squareRef} className={cn("col-span-2", { "ml-4": padX === "none" })}>
            <Play width={width} contentSel={restrictedContentSel} userID={user.id} />

            <div className="mt-4 flex flex-row justify-between">
              <div className="text-tertiary-2 text-xl font-bold">
                {restrictedContentSel.title}
              </div>
              <div>
                <Rating contentSel={restrictedContentSel} userID={user.id} />
              </div>
            </div>

            {restrictedContentSel.description && (
              <div className="font-bold text-accent-9">
                {restrictedContentSel.description}
              </div>
            )}

            {restrictedContentSel.notes && (
              <div className="text-accent-5">{restrictedContentSel.notes}</div>
            )}

            {restrictedContentSel.lifetime === "PERIOD" &&
              restrictedContentSel.expiration && (
                <div className="mt-2 text-xs bg-red-500 text-white px-1 rounded tooltip">
                  EXPIRA EM{" "}
                  {Moment(restrictedContentSel.expiration).format("DD-MM-YYYY")}
                </div>
              )}

            {extra.length > 0 && (
              <Extra
                user={user}
                content={extra}
                identityId={restrictedContentSel.identityId}
              />
            )}

            <div className="h-6"></div>
            {relationLink && relationLink.relationID && (
              <Message 
                userID={user.id}
                relationID={relationLink.relation.id}
                restrictedContentID={restrictedContentSel.id}
                id="restrictedContentID"
                members={relationLink.relation.members}
                title="Comentários"
                moderation={true}
              />
            )}

            <a
              onClick={() => setContentSel(false as any)}
              className="mb-4 btn btn-outline cursor-pointer"
            >
              <ArrowLeft /> Meus cursos
            </a>
          </div>

          <div className={cn({ "mb-4 mr-4": padX === "none" })}>
            {schedules.length > 0 && <Schedules items={schedules} />}
            {schedules.length > 0 && <div className="divider"></div>}
            {relationLink && relationLink.relation.id && (
              <List
                contents={contents}
                setContentSel={setRestrictedContentSel}
                contentSel={restrictedContentSel}
                userID={user.id}
                relationID={relationLink.relation.id}
              />
            )}

            <Certificate relationLink={relationLink} user={user} />
          </div>
        </div>
      )}
    </div>
  );
}

function breakGroup(items: any) {
  let last = "";
  const itemsMaped = items.map((v: any) => {
    v.break = false;
    if (v.group !== last) {
      v.break = true;
      last = v.group;
    }
    return v;
  });
  return itemsMaped;
}

function processStorageList(result: any) {
  const files: any[] = [];
  const folders: any[] = [];
  result.forEach((res: any) => {
    if (res.size) {
      files.push(res);
      const possibleFolder = res.key.split("/").slice(0, -1).join("/");
      if (possibleFolder && folders.indexOf(possibleFolder) === -1) {
        folders.push(possibleFolder);
      }
    } else {
      folders.push(res.key);
    }
  });
  return { files, folders };
}
