import Link from 'next/link'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useTheme } from 'next-themes'
import { OrderStatus } from 'API'
import { Logo } from 'components/ui'
import { useUserAuth } from 'components/userAuth/context'
import cn from 'classnames'

import {
  Team,
  IconList,
  Pages,
  Cog,
  Plus2,
  Picture,
  Cart,
  Dashboard,
  Files,
  Chat,
  Pin,
  Apps,
  Location,
  Command,
  Bot,
  Ticket,
  Lock,
  Person,
  Home,
  Logout,
  Moon,
  Sun,
  Server
} from 'components/icons'

export default function MenuPage(props: any) {
  const { target } = props
  const { isSm, isMd } = useBreakPoints()
  const { theme } = useTheme()

  return (
    <div>
      {!isSm && <Header />}

      <div
        className={cn('p-4 grid gap-y-3 z-35', {
          ['mb-20 pr-4']: isSm,
        })}
      >
        <div className="mt-4 opacity-50 tracking-widest text-xs title-font font-semibold text-tertiary-2 mb-1">
          USUÁRIOS E INTERAÇÕES
        </div>

        <Link href="/admin/users">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              (!target && !isSm) ||
              target == 'users' ||
              (target && target[0] == 'users')
                ? 'bg-accent-2'
                : 'bg-accent-1',
            ].join(' ')}
          >
            <Team className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

            <div className="ml-4">
              <p
                className={[
                  'font-semibold md:font-medium text-lg md:text-base',
                  (!target && !isSm) ||
                  target == 'users' ||
                  (target && target[0] == 'users')
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              >
                Usuários
              </p>
            </div>
          </a>
        </Link>

        <Link href="/admin/message">
          <a
            className={[
              'shadow p-3 flex justify-between items-center rounded-lg hover:bg-accent-2',
              target == 'message' ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <div className="flex items-center">
              <Chat className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

              <div className="ml-4">
                <p
                  className={[
                    'font-semibold md:font-medium text-lg md:text-base',
                    target == 'message'
                      ? 'text-accent-6'
                      : theme === 'dark'
                      ? 'text-accent-4'
                      : 'text-accent-6',
                  ].join(' ')}
                >
                  Mensagens
                </p>
              </div>
            </div>
            {false && <div className="badge badge-lg badge-accent">0</div>}
          </a>
        </Link>

        <div className="flex justify-between">
          <Link href="/admin/invites">
            <a
              className={[
                'w-full mr-3 shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                target && target[0] == 'invites'
                  ? 'bg-accent-2'
                  : 'bg-accent-1',
              ].join(' ')}
            >
              <Location className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

              <div className="ml-4">
                <p
                  className={[
                    'font-semibold md:font-medium text-lg md:text-base',
                    target && target[0] == 'invites'
                      ? 'text-accent-6'
                      : theme === 'dark'
                      ? 'text-accent-4'
                      : 'text-accent-6',
                  ].join(' ')}
                >
                  Convites
                </p>
              </div>
            </a>
          </Link>
          <Link href="/admin/invites/add">
            <a
              className={[
                'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                target && target[0] == 'invites' && target[1] == 'add'
                  ? 'bg-accent-2'
                  : 'bg-accent-1',
              ].join(' ')}
            >
              <Plus2
                className={[
                  'flex-shrink-0 h-7 w-7',
                  target && target[0] == 'invites' && target[1] == 'add'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              />
            </a>
          </Link>
        </div>

        <Link href="/admin/logs">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target && target[0] == 'logs' ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <IconList className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

            <div className="ml-4">
              <p
                className={[
                  'font-semibold md:font-medium text-lg md:text-base',
                  target && target[0] == 'logs'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              >
                Logs de acessos
              </p>
            </div>
          </a>
        </Link>

        <h2 className="mt-4 opacity-50 tracking-widest text-xs title-font font-semibold text-tertiary-2 mb-1">
          MENUS, PÁGINAS E CONTEÚDOS
        </h2>
        <div className="flex justify-between">
          <Link href="/admin/menus">
            <a
              className={[
                'w-full mr-3 shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                target && target[0] == 'menus' ? 'bg-accent-2' : 'bg-accent-1',
              ].join(' ')}
            >
              <Apps className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

              <div className="ml-4">
                <p
                  className={[
                    'font-semibold md:font-medium text-lg md:text-base',
                    target && target[0] == 'menus'
                      ? 'text-accent-6'
                      : theme === 'dark'
                      ? 'text-accent-4'
                      : 'text-accent-6',
                  ].join(' ')}
                >
                  Menus
                </p>
              </div>
            </a>
          </Link>
          <Link href="/admin/menus/add">
            <a
              className={[
                'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                target && target[0] == 'menus' && target[1] == 'add'
                  ? 'bg-accent-2'
                  : 'bg-accent-1',
              ].join(' ')}
            >
              <Plus2
                className={[
                  'flex-shrink-0 h-7 w-7',
                  target && target[0] == 'menus' && target[1] == 'add'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              />
            </a>
          </Link>
        </div>
        <div className="flex justify-between">
          <Link href="/admin/pages">
            <a
              className={[
                'w-full mr-3 shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                (target && target[0]) == 'pages'
                  ? 'bg-accent-2'
                  : 'bg-accent-1',
              ].join(' ')}
            >
              <Pages className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

              <div className="ml-4">
                <p
                  className={[
                    'font-semibold md:font-medium text-lg md:text-base',
                    (target && target[0]) == 'pages'
                      ? 'text-accent-6'
                      : theme === 'dark'
                      ? 'text-accent-4'
                      : 'text-accent-6',
                  ].join(' ')}
                >
                  Páginas {!isSm && !isMd && <span> e conteúdos</span>}
                </p>
              </div>
            </a>
          </Link>
          <Link href="/admin/pages/add">
            <a
              className={[
                'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                target && target[0] == 'pages' && target[1] == 'add'
                  ? 'bg-accent-2'
                  : 'bg-accent-1',
              ].join(' ')}
            >
              <Plus2
                className={[
                  'flex-shrink-0 h-7 w-7',
                  target && target[0] == 'pages' && target[1] == 'add'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              />
            </a>
          </Link>
        </div>
        <div className="flex justify-between">
          <Link href="/admin/restrictedcontent">
            <a
              className={[
                'w-full mr-3 shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                (target && target[0]) == 'restrictedcontent'
                  ? 'bg-accent-2'
                  : 'bg-accent-1',
              ].join(' ')}
            >
              <Lock className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

              <div className="ml-4">
                <p
                  className={[
                    'font-semibold md:font-medium text-lg md:text-base',
                    (target && target[0]) == 'restrictedcontent'
                      ? 'text-accent-6'
                      : theme === 'dark'
                      ? 'text-accent-4'
                      : 'text-accent-6',
                  ].join(' ')}
                >
                  Conteúdos Restritos
                </p>
              </div>
            </a>
          </Link>
          <Link href="/admin/restrictedcontent/add">
            <a
              className={[
                'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                target && target[0] == 'restrictedcontent' && target[1] == 'add'
                  ? 'bg-accent-2'
                  : 'bg-accent-1',
              ].join(' ')}
            >
              <Plus2
                className={[
                  'flex-shrink-0 h-7 w-7',
                  target &&
                  target[0] == 'restrictedcontent' &&
                  target[1] == 'add'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              />
            </a>
          </Link>
        </div>
        <div className="flex justify-between">
          <Link href="/admin/quiz">
            <a
              className={[
                'w-full mr-3 shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                (target && target[0]) == 'quiz'
                  ? 'bg-accent-2'
                  : 'bg-accent-1',
              ].join(' ')}
            >
              <Server className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

              <div className="ml-4">
                <p
                  className={[
                    'font-semibold md:font-medium text-lg md:text-base',
                    (target && target[0]) == 'quiz'
                      ? 'text-accent-6'
                      : theme === 'dark'
                      ? 'text-accent-4'
                      : 'text-accent-6',
                  ].join(' ')}
                >
                  Quiz
                </p>
              </div>
            </a>
          </Link>
          <Link href="/admin/quiz/add">
            <a
              className={[
                'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                target && target[0] == 'quiz' && target[1] == 'add'
                  ? 'bg-accent-2'
                  : 'bg-accent-1',
              ].join(' ')}
            >
              <Plus2
                className={[
                  'flex-shrink-0 h-7 w-7',
                  target &&
                  target[0] == 'quiz' &&
                  target[1] == 'add'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              />
            </a>
          </Link>
        </div>

        {process.env.APP_COMMERCE && (
          <>
            <h2 className="mt-4 opacity-50 tracking-widest text-xs title-font font-semibold text-tertiary-2 mb-1">
              E-COMMERCE
            </h2>
            <Link href={`/admin/orders/${OrderStatus.APPROVED.toLowerCase()}`}>
              <a
                className={[
                  'shadow p-3 flex justify-between items-center rounded-lg hover:bg-accent-2',
                  target == 'orders' || (target && target[0] == 'orders')
                    ? 'bg-accent-2'
                    : 'bg-accent-1',
                ].join(' ')}
              >
                <div className="flex items-center">
                  <Files className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

                  <div className="ml-4">
                    <p
                      className={[
                        'font-semibold md:font-medium text-lg md:text-base',
                        target == 'orders' || (target && target[0] == 'orders')
                          ? 'text-accent-6'
                          : theme === 'dark'
                          ? 'text-accent-4'
                          : 'text-accent-6',
                      ].join(' ')}
                    >
                      Pedidos
                    </p>
                  </div>
                </div>
                {/** <div className="badge badge-lg badge-warning">0</div> */}
              </a>
            </Link>
            <Link href="/admin/deliveries">
              <a
                className={[
                  'shadow p-3 flex justify-between items-center rounded-lg hover:bg-accent-2',
                  target == 'deliveries' ? 'bg-accent-2' : 'bg-accent-1',
                ].join(' ')}
              >
                <div className="flex items-center">
                  <Pin className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

                  <div className="ml-4">
                    <p
                      className={[
                        'font-semibold md:font-medium text-lg md:text-base',
                        target == 'deliveries'
                          ? 'text-accent-6'
                          : theme === 'dark'
                          ? 'text-accent-4'
                          : 'text-accent-6',
                      ].join(' ')}
                    >
                      Entregas e Delivery
                    </p>
                  </div>
                </div>
                {/** <div className="badge badge-lg badge-warning">0</div> */}
              </a>
            </Link>
            <div className="flex justify-between">
              <Link href="/admin/categories">
                <a
                  className={[
                    'w-full mr-3 shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target && target[0] == 'categories'
                      ? 'bg-accent-2'
                      : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Apps className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

                  <div className="ml-4">
                    <p
                      className={[
                        'font-semibold md:font-medium text-lg md:text-base',
                        target && target[0] == 'categories'
                          ? 'text-accent-6'
                          : theme === 'dark'
                          ? 'text-accent-4'
                          : 'text-accent-6',
                      ].join(' ')}
                    >
                      Categorias
                    </p>
                  </div>
                </a>
              </Link>
              <Link href="/admin/categories/add">
                <a
                  className={[
                    'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target && target[0] == 'categories' && target[1] == 'add'
                      ? 'bg-accent-2'
                      : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Plus2
                    className={[
                      'flex-shrink-0 h-7 w-7',
                      target && target[0] == 'categories' && target[1] == 'add'
                        ? 'text-accent-6'
                        : theme === 'dark'
                        ? 'text-accent-4'
                        : 'text-accent-6',
                    ].join(' ')}
                  />
                </a>
              </Link>
            </div>
            <div className="flex justify-between">
              <Link href="/admin/products">
                <a
                  className={[
                    'w-full mr-3 shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target && target[0] == 'products'
                      ? 'bg-accent-2'
                      : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Cart className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

                  <div className="ml-4">
                    <p
                      className={[
                        'font-semibold md:font-medium text-lg md:text-base',
                        target && target[0] == 'products'
                          ? 'text-accent-6'
                          : theme === 'dark'
                          ? 'text-accent-4'
                          : 'text-accent-6',
                      ].join(' ')}
                    >
                      Produtos {!isSm && !isMd && <span>e Serviços</span>}
                    </p>
                  </div>
                </a>
              </Link>
              <Link href="/admin/products/add">
                <a
                  className={[
                    'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target && target[0] == 'products' && target[1] == 'add'
                      ? 'bg-accent-2'
                      : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Plus2
                    className={[
                      'flex-shrink-0 h-7 w-7',
                      target && target[0] == 'products' && target[1] == 'add'
                        ? 'text-accent-6'
                        : theme === 'dark'
                        ? 'text-accent-4'
                        : 'text-accent-6',
                    ].join(' ')}
                  />
                </a>
              </Link>
            </div>
            <div className="flex justify-between">
              <Link href="/admin/deliverymethod">
                <a
                  className={[
                    'w-full mr-3 shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target && target[0] == 'deliverymethod'
                      ? 'bg-accent-2'
                      : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Command className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

                  <div className="ml-4">
                    <p
                      className={[
                        'font-semibold md:font-medium text-lg md:text-base',
                        target && target[0] == 'deliverymethod'
                          ? 'text-accent-6'
                          : theme === 'dark'
                          ? 'text-accent-4'
                          : 'text-accent-6',
                      ].join(' ')}
                    >
                      Metodos de Entregas
                    </p>
                  </div>
                </a>
              </Link>
              <Link href="/admin/deliverymethod/add">
                <a
                  className={[
                    'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target &&
                    target[0] == 'deliverymethod' &&
                    target[1] == 'add'
                      ? 'bg-accent-2'
                      : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Plus2
                    className={[
                      'flex-shrink-0 h-7 w-7',
                      target &&
                      target[0] == 'deliverymethod' &&
                      target[1] == 'add'
                        ? 'text-accent-6'
                        : theme === 'dark'
                        ? 'text-accent-4'
                        : 'text-accent-6',
                    ].join(' ')}
                  />
                </a>
              </Link>
            </div>
            <div className="flex justify-between">
              <Link href="/admin/coupons">
                <a
                  className={[
                    'w-full mr-3 shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target && target[0] == 'coupons'
                      ? 'bg-accent-2'
                      : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Ticket className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

                  <div className="ml-4">
                    <p
                      className={[
                        'font-semibold md:font-medium text-lg md:text-base',
                        target && target[0] == 'coupons'
                          ? 'text-accent-6'
                          : theme === 'dark'
                          ? 'text-accent-4'
                          : 'text-accent-6',
                      ].join(' ')}
                    >
                      Cupons de desconto
                    </p>
                  </div>
                </a>
              </Link>
              <Link href="/admin/coupons/add">
                <a
                  className={[
                    'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target && target[0] == 'coupons' && target[1] == 'add'
                      ? 'bg-accent-2'
                      : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Plus2
                    className={[
                      'flex-shrink-0 h-7 w-7',
                      target && target[0] == 'coupons' && target[1] == 'add'
                        ? 'text-accent-6'
                        : theme === 'dark'
                        ? 'text-accent-4'
                        : 'text-accent-6',
                    ].join(' ')}
                  />
                </a>
              </Link>
            </div>
          </>
        )}

        <h2 className="mt-4 opacity-50 tracking-widest text-xs title-font font-semibold text-tertiary-2 mb-1">
          OUTROS
        </h2>

        <Link href="/admin/images">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'images' ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <Picture className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

            <div className="ml-4">
              <p
                className={[
                  'font-semibold md:font-medium text-lg md:text-base',
                  target == 'images'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              >
                Galeria de Mídias
              </p>
            </div>
          </a>
        </Link>
        <Link href="/admin/bot">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'bot' ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <Bot className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

            <div className="ml-4">
              <p
                className={[
                  'font-semibold md:font-medium text-lg md:text-base',
                  target == 'bot'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              >
                Bot (Robô)
              </p>
            </div>
          </a>
        </Link>
        <Link href="/admin/seo">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'seo' ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <Dashboard className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

            <div className="ml-4">
              <p
                className={[
                  'font-semibold md:font-medium text-lg md:text-base',
                  target == 'seo'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              >
                SEO (Otimização)
              </p>
            </div>
          </a>
        </Link>
        <Link href="/admin/config">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'config' ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <Cog className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

            <div className="ml-4">
              <p
                className={[
                  'font-semibold md:font-medium text-lg md:text-base',
                  target == 'config'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              >
                Configurações
              </p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

function Header() {
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useUserAuth()
  return (
    <div className="p-4 w-full sticky top-0 z-40 bg-primary">
      <Link href={`${process.env.HOME}`}>
        <a className="cursor-pointer" aria-label="Logo">
          <Logo maxHeight={45} /> 
        </a>
      </Link>
      <div className="pt-2 flex flex-row justify-start gap-3">
        <Link href={`${process.env.HOME}`}>
          <a className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center">
            <Home />
          </a>
        </Link>

        <Link href="/my-account">
          <a className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center">
            <Person />
          </a>
        </Link>

        <a
          className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
          onClick={() =>
            theme === 'dark' ? setTheme('light') : setTheme('dark')
          }
        >
          {theme == 'dark' ? (
            <Moon width={20} height={20} />
          ) : (
            <Sun width={20} height={20} />
          )}
        </a>

        <a
          onClick={() => {
            signOut(user.id)
          }}
          className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
        >
          <Logout />
        </a>
      </div>
    </div>
  )
}
