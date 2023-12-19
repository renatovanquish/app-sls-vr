import { useEffect, useState } from "react";
import { Info } from "components/icons";
import { useRelation } from "hooks/useRelation";
import { useRelationLink } from "hooks/useRelationLink";
import { Loading } from "components/ui";
import generateSortFn from "lib/generateSortFn";
import { ListRelationsByTypeUpdatedAtQueryVariables } from "API";
import Moment from "moment";

interface Props {
  user: any;
}

export default function TabContents(props: Props) {
  const { user } = props;

  const [loading, setLoading] = useState(true);
  const { listRelationsByTypeUpdatedAt } = useRelation();
  const [relations, setRelations] = useState([] as any);

  const fetchRL = async (types: any) => {
    setLoading(true);
    const all = types
      .sort(generateSortFn([{ name: "type", reverse: false }]))
      .map(async (t: any) => {
        const { items, nextToken } = await listRelationsByTypeUpdatedAt({
          type: t.type,
          limit: 1000,
        } as ListRelationsByTypeUpdatedAtQueryVariables);
        const itemsFmt: any[] = [];
        items.map((item: any) => {
          if (item && item.type === t.type && item.status === "rc-on") {
            item.registered = item.members.indexOf(user.id) >= 0 ? true : false;
            const tl = types.find((t: any) => t.type === item.type);
            item.typeLabel = tl ? tl.label : "";
            itemsFmt.push(item);
          }
        });
        setRelations((relations: any) => [...relations, ...itemsFmt]);
      });
    const combine = Promise.all(all);
    await combine;
    setLoading(false);
  };

  useEffect(() => {
    if (user.id) {
      const t = (process.env.RELATIONS as any).filter((rl: any) => {
        return rl.restricted;
      });

      fetchRL(t);
    }
    return () => {
      setRelations([] as any);
      setLoading(true);
    };
  }, [user]);

  return (
    <div>
      {loading && <Loading />}
      {!loading && relations.length === 0 && (
        <div className="alert alert-warning">
          <div className="flex-1">
            <Info />
            <label className="ml-2">Nenhum conteúdo por aqui.</label>
          </div>
        </div>
      )}
      {!loading &&
        relations.map((rl: any) => (
          <div className="p-4 shadow rounded-lg" key={rl.id}>
            <div className="flex flex-start gap-4 items-center">
              <CheckBoxRegistered
                relation={rl}
                userID={user.id}
              />
              <div>
                <div className="text-lg font-semibold">{rl.name}</div>
                {rl.description && (
                  <div className="text-sm">{rl.description}</div>
                )}
                <div className="flex mt-1 gap-2 text-xs">
                  <div className="bg-blue-500 text-white px-1 rounded">
                    {rl.typeLabel}
                  </div>
                  <div
                    className="hidden lg:block bg-accent-1 rounded px-1 mr-2 text-accent-7 tooltip"
                    data-tip="Última atualização"
                  >
                    <span>{Moment(rl.createdAt).format("DD-MM-YYYY")}</span>
                    &nbsp;
                    <span>{Moment(rl.createdAt).format("HH:mm")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

function CheckBoxRegistered(props: any) {
  const { relation, userID } = props;
  const [registered, setRegistered] = useState(relation.registered ? true : false);

  const { listRelationsLinkByRelationUser, createRelationLink, deleteRelationLink } = useRelationLink();
  const { updateRelation } = useRelation();

  const handleCheckboxChange = async (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (target.name === relation.id) {
      setRegistered(value);

      if (value) {
        const { items } = await listRelationsLinkByRelationUser({
          relationID: relation.id,
          userID: { eq: userID }
        })

        if (items.length === 0) {
          await createRelationLink({
            userID,
            relationID: relation.id,
            type: relation.type,
            notify: 0,
          });
        }

        if(relation.members.indexOf(userID) === -1) {
          relation.members.push(userID)
          await updateRelation({
            id: relation.id,
            mode: relation.mode,
            members: relation.members,
            status: relation.status,
          })
        }
        
      } else {
        const { items } = await listRelationsLinkByRelationUser({
          relationID: relation.id,
          userID: { eq: userID }
        })

        if (items[0] && items[0].id) {
          await deleteRelationLink({ id: items[0].id })
        }

        if(relation.members.indexOf(userID) >= 0) {
          const r = relation.members.filter((member: any) => member !== userID)
          await updateRelation({
            id: relation.id,
            mode: relation.mode,
            members: r,
            status: relation.status,
          })
        }
      }
    }
  };

  return relation && (
    <input
      type="checkbox"
      id={relation.id}
      name={relation.id}
      checked={registered}
      onChange={handleCheckboxChange}
      className="checkbox"
    />
  );
}
