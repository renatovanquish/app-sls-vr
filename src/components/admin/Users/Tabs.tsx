import { useState } from "react";

import TabInfo from "./tab-info";
import TabGroups from "./tab-groups";
import TabOrders from "./tab-orders";
import TabRestrictedContent from "./tab-restrictedcontent";
import TabActions from "./tab-actions";

interface Props {
  user: any;
  handleDelete: any;
  index: number;
}

export default function Tabs(props: Props) {
  const { user, handleDelete, index } = props;
  const [tabSel, setTabSel] = useState(0);
  return (
    <div className="mt-6">
      <div className="tabs">
        <a
          onClick={() => setTabSel(0)}
          className={`tab tab-lifted ${tabSel === 0 && "tab-active"}`}
        >
          Dados
        </a>
        <a
          onClick={() => setTabSel(2)}
          className={`tab tab-lifted ${tabSel === 2 && "tab-active"}`}
        >
          Compras
        </a>
        <a
          onClick={() => setTabSel(4)}
          className={`tab tab-lifted ${tabSel === 4 && "tab-active"}`}
        >
          Ações
        </a>
        <div className="flex-1 cursor-default tab tab-lifted"></div>
      </div>
      <div className="mt-5 mb-2 max-w-full w-full mx-auto">
        {tabSel === 2 && <TabOrders user={user} />}
        {tabSel === 4 && (
          <TabActions user={user} handleDelete={handleDelete} index={index} />
        )}
        {tabSel === 0 && (
          <>
            <TabInfo user={user} />
            <div className="mt-4 font-semibold">Grupos</div>
            <TabGroups user={user} />
            <div className="mt-6 font-semibold">Permissões de acesso</div>
            <TabRestrictedContent user={user} />
          </>
        )}
      </div>
    </div>
  );
}
