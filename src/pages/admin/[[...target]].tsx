import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, FormCard } from "components/ui";
import { Layout } from "components/common";

import { useBreakPoints } from "hooks/useBreakPoints";
import { useScreen } from "hooks/useScreen";
import { useUserAuth } from "components/userAuth/context";
import { useUI } from "components/ui/context";
import { useCategory } from "hooks/useCategory";
import { OrderStatus } from "API";

import Moment from "moment";

import {
  Menu,
  Config,
  Logs,
  Users,
  Pages,
  FormPage,
  MidiasLib,
  Seo,
  Orders,
  Deliveries,
  Message,
  Products,
  FormProduct,
  Categories,
  FormCategory,
  Menus,
  FormMenu,
  DeliveryMethods,
  FormDeliveryMethod,
  Coupons,
  FormCoupon,
  Invites,
  FormInvite,
  Bot,
  RestrictedContent,
  FormContent,
  Quiz,
  FormQuiz,
} from "components/admin";

export default function AdminPage() {
  const router = useRouter();
  const { target } = router.query;

  const { user } = useUserAuth();
  const { isSm } = useBreakPoints();
  const { screenHeight } = useScreen();
  const { hideSearch, showNavBarBottom, setHeightNavBar } = useUI();

  useEffect(() => {
    setHeightNavBar(0);
    showNavBarBottom();
    hideSearch();
  }, []);

  const [categories, setCategories] = useState([] as any);
  const [subCategories, setSubCategories] = useState([] as any);
  const { listCategories } = useCategory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = async () => {
        const { items } = await listCategories({ limit: 1000 });
        const c: any[] = [];
        const s: any[] = [];
        items.map((i: any) => {
          if (i.isSub) {
            s.push(i);
          } else {
            c.push(i);
          }
        });
        setCategories(c);
        setSubCategories(s);
      };
      fetchData();
    }
    return () => {
      setCategories([] as any);
      setSubCategories([] as any);
    };
  }, []);

  return user && user.isAdmin ? (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div className={`md:col-span-1 ${target ? "hidden" : ""} md:block`}>
          <div style={{ height: screenHeight }} className="overflow-y-auto">
            <Menu user={user} target={target} />
          </div>
        </div>

        {(target || !isSm) && (
          <div className="md:col-span-2 lg:col-span-3">
            <div
              style={{ height: screenHeight }}
              className={`${!isSm ? "overflow-y-auto" : "pb-24"}`}
            >
              {(!target || target == "users" || target[0] == "users") && (
                <Users
                  user={user}
                  search={target && target[1] ? target[1] : ""}
                />
              )}
              {target && target[0] == "logs" && <Logs user={user} />}
              {target == "seo" && <Seo user={user} />}
              {target == "config" && <Config />}
              {target == "bot" && <Bot />}
              {target == "images" && <MidiasLib userID={user.id} />}
              {target && target[0] == "message" && <Message user={user} />}

              {target && target[0] == "menus" && !target[1] && (
                <Menus userID={user.id} />
              )}

              {target &&
                target[0] == "menus" &&
                target[1] &&
                target[1] == "add" && (
                  <FormCard title="Novo menu">
                    <FormMenu menu={null} userID={user.id} />
                  </FormCard>
                )}

              {target && target[0] == "categories" && !target[1] && (
                <Categories userID={user.id} />
              )}

              {target &&
                target[0] == "categories" &&
                target[1] &&
                target[1] == "add" && (
                  <FormCard title="Nova categoria">
                    <FormCategory category={null} userID={user.id} />
                  </FormCard>
                )}

              {target && target[0] == "invites" && !target[1] && (
                <Invites userID={user.id} />
              )}

              {target &&
                target[0] == "invites" &&
                target[1] &&
                target[1] == "add" && (
                  <FormCard title="Novo convite">
                    <FormInvite invite={null} userID={user.id} />
                  </FormCard>
                )}

              {target &&
                target[0] == "coupons" &&
                (!target[1] || (target[1] && target[1] !== "add")) && (
                  <Coupons userID={user.id} />
                )}

              {target &&
                target[0] == "coupons" &&
                target[1] &&
                target[1] == "add" && (
                  <FormCard title="Novo cupom de desconto">
                    <FormCoupon coupon={null} userID={user.id} />
                  </FormCard>
                )}

              {target && target[0] == "deliverymethod" && !target[1] && (
                <DeliveryMethods userID={user.id} />
              )}

              {target &&
                target[0] == "deliverymethod" &&
                target[1] &&
                target[1] == "add" && (
                  <FormCard title="Novo método de entrega">
                    <FormDeliveryMethod
                      deliveryMethod={null}
                      userID={user.id}
                    />
                  </FormCard>
                )}

              {target &&
                target[0] == "orders" &&
                (!target[1] ||
                  target[1].toString() === OrderStatus.APPROVED.toLowerCase() ||
                  target[1].toString() === OrderStatus.CANCELED.toLowerCase() ||
                  target[1].toString() ===
                    OrderStatus.DELIVERED.toLowerCase() ||
                  target[1].toString() ===
                    OrderStatus.IN_PREPARATION.toLowerCase() ||
                  target[1].toString() ===
                    OrderStatus.IN_TRANSIT.toLowerCase() ||
                  target[1].toString() === OrderStatus.REJECTED.toLowerCase() ||
                  target[1].toString() ===
                    OrderStatus.STANDBY.toLowerCase()) && (
                  <Orders
                    status={
                      target[1]
                        ? target[1].toString().toUpperCase()
                        : OrderStatus.STANDBY
                    }
                  />
                )}

              {target &&
                target[0] == "orders" &&
                target[1] &&
                target[1].match(/^[0-9]+$/) !== null && (
                  <Orders status={undefined} />
                )}

              {target && target[0] == "deliveries" && <Deliveries />}

              {target &&
                target[0] == "restrictedcontent" &&
                (!target[1] || target[1].toString() !== "add") && (
                  <RestrictedContent userID={user.id} />
                )}

              {target &&
                target[0] == "restrictedcontent" &&
                target[1] &&
                target[1] == "add" && (
                  <FormCard title="Novo conteúdo restrito">
                    <FormContent content={null} userID={user.id} />
                  </FormCard>
                )}

              {target &&
                target[0] == "quiz" &&
                (!target[1] || target[1].toString() !== "add") && (
                  <Quiz userID={user.id} />
                )}

              {target &&
                target[0] == "quiz" &&
                target[1] &&
                target[1] == "add" && (
                  <FormCard title="Novo Quiz">
                    <FormQuiz content={null} userID={user.id} />
                  </FormCard>
                )}

              {target &&
                target[0] == "pages" &&
                (!target[1] || target[1].toString() !== "add") && (
                  <Pages userID={user.id} />
                )}

              {target &&
                target[0] == "pages" &&
                target[1] &&
                target[1] == "add" && (
                  <FormCard title="Nova página">
                    <FormPage page={null} userID={user.id} />
                  </FormCard>
                )}

              {target &&
                target[0] == "products" &&
                (!target[1] || target[1].toString() !== "add") && (
                  <Products
                    userID={user.id}
                    categories={categories}
                    subCategories={subCategories}
                  />
                )}

              {target &&
                target[0] == "products" &&
                target[1] &&
                target[1] == "add" && (
                  <FormCard title="Novo produto ou serviço">
                    <FormProduct product={null} userID={user.id} />
                  </FormCard>
                )}

              {((target && target[1] == "add") ||
                target == "images" ||
                target == "bot" ||
                target == "config" ||
                target == "seo") && <div className="h-24 lg:h-0"></div>}
            </div>
          </div>
        )}
      </div>
    </Container>
  ) : (
    <div></div>
  );
}

AdminPage.Layout = Layout;
