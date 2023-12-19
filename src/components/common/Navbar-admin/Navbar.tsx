import React, { FC } from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import { Container } from 'components/ui'
import { ArrowLeft } from 'components/icons'

interface Link {
  href: string
  label: string
}
interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const router = useRouter()
  const { pathname, query } = useRouter()
  const { target } = query
  const rootPathname = pathname.split('/')[1]
  const isAdmin = rootPathname == 'admin'
  const isHome = isAdmin && !target

  const { theme, setTheme } = useTheme()

  return (
    <div className='text-tertiary bg-tertiary shadow-xl rounded-b-3xl sticky top-0 z-40 transition-all duration-150'>
      <NextHead>
      <meta name="theme-color" content={"#EE8600"} />
      </NextHead>
      <Container clean={process.env.FULL_WIDTH ? true : false}>
      <div
          className={cn('relative flex flex-col pb-4', {
            'px-4': !isHome,
          })}
        >
          <div
            className={cn(
              'cursor-pointer mt-4 font-bold text-2xl flex flex-wrap content-center',
              {
                'justify-around mt-0': isHome,
              }
            )}
            onClick={() => router.push('/admin/')}
          >
            {!isHome && <ArrowLeft className="mr-2" width={32} height={32} />}
            {!isHome && <div>Admin</div>}
          </div>
          {isHome && (
            <div className="pt-4 px-4 z-20">
              <div className="font-bold text-2xl">Admin</div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Navbar
