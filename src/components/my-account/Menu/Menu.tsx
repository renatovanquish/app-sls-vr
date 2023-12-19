import Link from 'next/link'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useTheme } from 'next-themes'
import { Logo } from 'components/ui'
import { useUserAuth } from 'components/userAuth/context'
import cn from 'classnames'

import {
  Person,
  Key,
  Power,
  IconList,
  Pin,
  Cart,
  Info,
  Preferences,
  CreditCard,
  Cog,
  Briefcase,
  Payments,
  Receipts,
  Home,
  Logout,Moon,Sun
} from 'components/icons'

interface Props {
  user: any
  target: string | undefined
}

export default function MenuPage(props: Props) {
  const { user, target } = props
  const { isSm } = useBreakPoints()
  const { theme } = useTheme()

  return (
    <div>
      {!isSm && <Header />}

      <div
        className={cn('p-4 grid gap-y-3 z-35', {
          ['mb-20 pr-4']: isSm,
        })}
      >
        <h2 className="mt-4 opacity-50 tracking-widest text-xs title-font font-semibold text-tertiary-2 mb-1">
          MINHA CONTA (PERFIL)
        </h2>

        <Link href="/my-account/pd">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              (!target && !isSm) || target == 'pd'
                ? 'bg-accent-2'
                : 'bg-accent-1',
            ].join(' ')}
          >
            <Person className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

            <div className="ml-4">
              <p
                className={[
                  'font-bold md:font-semibold text-lg md:text-base',
                  (!target && !isSm) || target == 'pd'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                ].join(' ')}
              >
                Dados Pessoais
              </p>
            </div>
          </a>
        </Link>

        {user && user.groups.indexOf('Profissional') !== -1 && (
          <Link href="/my-account/pp">
            <a
              className={[
                'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                target == 'pp' ? 'bg-accent-2' : 'bg-accent-1',
              ].join(' ')}
            >
              <Briefcase className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

              <div className="ml-4">
                <p
                  className={[
                    'font-bold md:font-semibold text-lg md:text-base',
                    target == 'pp'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                  ].join(' ')}
                >
                  Dados Profissionais
                </p>
              </div>
            </a>
          </Link>
        )}

        <Link href="/my-account/addresses">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'addresses' ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <Pin className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

            <div className="ml-4">
              <p
                className={[
                  'font-bold md:font-semibold text-lg md:text-base',
                  target == 'addresses'
                  ? 'text-accent-6'
                  : theme === 'dark'
                  ? 'text-accent-4'
                  : 'text-accent-6',
                ].join(' ')}
              >
                Endereços
              </p>
            </div>
          </a>
        </Link>

        {process.env.APP_COMMERCE && (
          <Link href="/my-account/paymethods">
            <a
              className={[
                'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                target == 'paymethods'
                ? 'bg-accent-2'
                : 'bg-accent-1',
              ].join(' ')}
            >
              <CreditCard className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

              <div className="ml-4">
                <p
                  className={[
                    'font-bold md:font-semibold text-lg md:text-base',
                    target == 'paymethods'
                    ? 'text-accent-6'
                    : theme === 'dark'
                    ? 'text-accent-4'
                    : 'text-accent-6',
                  ].join(' ')}
                >
                  Cartões
                </p>
              </div>
            </a>
          </Link>
        )}

        <Link href="/my-account/cpw">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'cpw' ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <Key className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

            <div className="ml-4">
              <p
                className={[
                  'font-bold md:font-semibold text-lg md:text-base',
                  target == 'cpw'
                  ? 'text-accent-6'
                  : theme === 'dark'
                  ? 'text-accent-4'
                  : 'text-accent-6',
                ].join(' ')}
              >
                Alterar Senha
              </p>
            </div>
          </a>
        </Link>

        <Link href="/my-account/logs">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'logs'
                ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <IconList className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

            <div className="ml-4">
              <p
                className={[
                  'font-bold md:font-semibold text-lg md:text-base',
                  target == 'logs'
                  ? 'text-accent-6'
                  : theme === 'dark'
                  ? 'text-accent-4'
                  : 'text-accent-6',
                ].join(' ')}
              >
                Atividades Recentes
              </p>
            </div>
          </a>
        </Link>

        {process.env.APP_COMMERCE && (
          <>
            <h2 className="mt-4 opacity-50 tracking-widest text-xs title-font font-semibold text-tertiary-2 mb-1">
              INFORMAÇÕES DE COMPRAS
            </h2>
            <Link href="/my-account/orders">
              <a
                className={[
                  'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                  target == 'orders'
                    ? 'bg-accent-2' : 'bg-accent-1',
                ].join(' ')}
              >
                <Cart className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

                <div className="ml-4">
                  <p
                    className={[
                      'font-bold md:font-semibold text-lg md:text-base',
                      target == 'orders'
                      ? 'text-accent-6'
                      : theme === 'dark'
                      ? 'text-accent-4'
                      : 'text-accent-6',
                    ].join(' ')}
                  >
                    Minhas Compras
                  </p>
                </div>
              </a>
            </Link>
            {false && (
              <Link href="/my-account/payments">
                <a
                  className={[
                    'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target == 'payments'
                      ? 'bg-accent-2' : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Payments className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

                  <div className="ml-4">
                    <p
                      className={[
                        'font-bold md:font-semibold text-lg md:text-base',
                        target == 'payments'
                        ? 'text-accent-6'
                        : theme === 'dark'
                        ? 'text-accent-4'
                        : 'text-accent-6',
                      ].join(' ')}
                    >
                      Pagamentos
                    </p>
                  </div>
                </a>
              </Link>
            )}
            {false && (
              <Link href="/my-account/receipts">
                <a
                  className={[
                    'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
                    target == 'receipts'
                      ? 'bg-accent-2' : 'bg-accent-1',
                  ].join(' ')}
                >
                  <Receipts className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

                  <div className="ml-4">
                    <p
                      className={[
                        'font-bold md:font-semibold text-lg md:text-base',
                        target == 'receipts'
                        ? 'text-accent-6'
                        : theme === 'dark'
                        ? 'text-accent-4'
                        : 'text-accent-6',
                      ].join(' ')}
                    >
                      Recebimentos
                    </p>
                  </div>
                </a>
              </Link>
            )}
          </>
        )}

        <h2 className="mt-4 opacity-50 tracking-widest text-xs title-font font-semibold text-tertiary-2 mb-1">
          OUTROS
        </h2>

        <Link href="/my-account/consent">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'consent'
                ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <Preferences className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

            <div className="ml-4">
              <p
                className={[
                  'font-bold md:font-semibold text-lg md:text-base',
                  target == 'consent'
                  ? 'text-accent-6'
                  : theme === 'dark'
                  ? 'text-accent-4'
                  : 'text-accent-6',
                ].join(' ')}
              >
                Consentimento
              </p>
            </div>
          </a>
        </Link>

        <Link href="/my-account/advanced">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'advanced'
                ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <Cog className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

            <div className="ml-4">
              <p
                className={[
                  'font-bold md:font-semibold text-lg md:text-base',
                  target == 'advanced'
                  ? 'text-accent-6'
                  : theme === 'dark'
                  ? 'text-accent-4'
                  : 'text-accent-6',
                ].join(' ')}
              >
                Gerenciamento Avançado
              </p>
            </div>
          </a>
        </Link>

        <Link href="/my-account/aboutapp">
          <a
            className={[
              'shadow p-3 flex items-center rounded-lg hover:bg-accent-2',
              target == 'aboutapp'
                ? 'bg-accent-2' : 'bg-accent-1',
            ].join(' ')}
          >
            <Info className="flex-shrink-0 h-7 w-7 text-tertiary-2"/>

            <div className="ml-4">
              <p
                className={[
                  'font-bold md:font-semibold text-lg md:text-base',
                  target == 'aboutapp'
                  ? 'text-accent-8'
                  : theme === 'dark'
                  ? 'text-accent-4'
                  : 'text-accent-6',
                ].join(' ')}
              >
                Sobre o App
              </p>
            </div>
          </a>
        </Link>

        {user.isAdmin && (
          <Link href="/admin">
            <a className="shadow p-3 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1">
              <Power className="flex-shrink-0 h-7 w-7 text-tertiary-2" />

              <div className="ml-4">
                <p
                  className={[
                    'font-bold md:font-semibold  text-lg md:text-base',
                    theme === 'dark' ? 'text-accent-4' : 'text-accent-6',
                  ].join(' ')}
                >
                  Admin
                </p>
              </div>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}

function Header() {
  const { user, signOut } = useUserAuth()
  const { theme, setTheme } = useTheme()
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

        {user.isAdmin && (
          <Link href="/admin">
            <a className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center">
              <Power />
            </a>
          </Link>
        )}

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
