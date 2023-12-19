import { Storage } from 'aws-amplify'
import React, { useCallback, FC } from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import cn from 'classnames'
import { Container } from 'components/ui'
import { useUI } from 'components/ui/context'
import { Camera, ArrowLeft, Moon, Sun } from 'components/icons'

import { useDropzone } from 'react-dropzone'
import { useUserAuth } from 'components/userAuth/context'
import { toast } from 'react-toast'

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
  const isMyaccount = rootPathname == 'my-account'
  const isHome = isMyaccount && !target

  const { theme, setTheme } = useTheme()
  const { user, updateUser } = useUserAuth()
  const { setProgress } = useUI()

  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    const file = acceptedFiles[0]
    const extension = file.name.split('.').pop()
    const fileName = `avatar-${user.id}.${extension}`

    try {
      const tempAvatar = window.URL.createObjectURL(file)
      await updateUser({ id: user.id, avatar: fileName, tempAvatar })
      await Storage.put(fileName, file, {
        level: 'public',
        progressCallback(progress: { loaded: any; total: any }) {
          const { loaded, total } = progress
          const p = ((loaded / total) * 100).toFixed(0)
          setProgress(p)
        },
      })
      setProgress(0)
      toast('Avatar atualizado com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': []},
    onDrop,
  })

  return (
    <div className='shadow-xl rounded-b-3xl bg-tertiary text-tertiary sticky top-0 z-40 transition-all duration-150'>
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
              'mt-4 font-bold text-2xl flex flex-wrap content-center',
              {
                'justify-around mt-0': isHome,
              }
            )}
            onClick={() => router.push('/my-account/')}
          >
            {!isHome && <ArrowLeft className="mr-2" width={32} height={32} />}
            {!isHome && <div>Minha Conta</div>}
          </div>
          
          {isHome && (
            <div className="flex justify-around z-20">
              <div
                className="pt-12 text-accent-1"
                onClick={() =>
                  theme === 'dark' ? setTheme('light') : setTheme('dark')
                }
              >
                {theme == 'dark' ? (
                  <Moon width={30} height={30} />
                ) : (
                  <Sun width={30} height={30} />
                )}
              </div>
              <div className="mt-4 avatar">
                <div
                  className="rounded-full w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {(user && user.tempAvatar) && <img
                    alt=""
                    src={user.tempAvatar}
                  />}
                  {(user && user.avatar) && <Image
                    src={`${process.env.MIDIA_CLOUDFRONT}${user.avatar}`}
                    alt=""
                    width={120}
                    height={120}
                  />}
                  {(!user || (!user.avatar && !user.tempAvatar)) &&<img
                    alt=""
                    src='/user/user.png'
                  />}
                </div>
              </div>
              <div className="pt-12" {...getRootProps()}>
                <input {...getInputProps()} />
                <Camera width={28} height={28} />
              </div>
            </div>
          )}
          {isHome && user && (
            <div className="mt-2 flex flex-col w-full">
              <div className="font-semibold text-xl text-center">
                {user.name}
              </div>
              <div className="mt-1 flex justify-center">
                {user &&
                  user.groups.map((group: string, k: number) => (
                    <div className="mx-1 badge badge-sm" key={k}>
                      {group}
                    </div>
                  ))}
              </div>
            </div>
          )}
          {isHome && (
            <div
              className="absolute w-full z-10"
            >
              <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                id="wave"
                style={{ transform: "rotate(180deg)", transition: '0.3s'}}
                viewBox="0 0 1440 350"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="sw-gradient-0"
                    x1="0"
                    x2="0"
                    y1="1"
                    y2="0"
                  >
                    <stop
                      stopColor="#EE8600"
                      offset="0%"
                    />
                    <stop
                      stopColor="#EC7900"
                      offset="100%"
                    />
                  </linearGradient>
                </defs>
                <path
                  style={{ transform:'translate(0, 0px)', opacity:1 }}
                  fill="url(#sw-gradient-0)"
                  d="M0,0L34.3,5.8C68.6,12,137,23,206,29.2C274.3,35,343,35,411,52.5C480,70,549,105,617,151.7C685.7,198,754,257,823,239.2C891.4,222,960,128,1029,81.7C1097.1,35,1166,35,1234,52.5C1302.9,70,1371,105,1440,110.8C1508.6,117,1577,93,1646,122.5C1714.3,152,1783,233,1851,274.2C1920,315,1989,315,2057,309.2C2125.7,303,2194,292,2263,274.2C2331.4,257,2400,233,2469,221.7C2537.1,210,2606,210,2674,175C2742.9,140,2811,70,2880,81.7C2948.6,93,3017,187,3086,186.7C3154.3,187,3223,93,3291,99.2C3360,105,3429,210,3497,256.7C3565.7,303,3634,292,3703,262.5C3771.4,233,3840,187,3909,186.7C3977.1,187,4046,233,4114,245C4182.9,257,4251,233,4320,233.3C4388.6,233,4457,257,4526,274.2C4594.3,292,4663,303,4731,297.5C4800,292,4869,268,4903,256.7L4937.1,245L4937.1,350L4902.9,350C4868.6,350,4800,350,4731,350C4662.9,350,4594,350,4526,350C4457.1,350,4389,350,4320,350C4251.4,350,4183,350,4114,350C4045.7,350,3977,350,3909,350C3840,350,3771,350,3703,350C3634.3,350,3566,350,3497,350C3428.6,350,3360,350,3291,350C3222.9,350,3154,350,3086,350C3017.1,350,2949,350,2880,350C2811.4,350,2743,350,2674,350C2605.7,350,2537,350,2469,350C2400,350,2331,350,2263,350C2194.3,350,2126,350,2057,350C1988.6,350,1920,350,1851,350C1782.9,350,1714,350,1646,350C1577.1,350,1509,350,1440,350C1371.4,350,1303,350,1234,350C1165.7,350,1097,350,1029,350C960,350,891,350,823,350C754.3,350,686,350,617,350C548.6,350,480,350,411,350C342.9,350,274,350,206,350C137.1,350,69,350,34,350L0,350Z"
                />
                <defs>
                  <linearGradient
                    id="sw-gradient-1"
                    x1="0"
                    x2="0"
                    y1="1"
                    y2="0"
                  >
                    <stop
                      stopColor="#EE8600"
                      offset="0%"
                    />
                    <stop
                      stopColor="#FDD000"
                      offset="100%"
                    />
                  </linearGradient>
                </defs>
                <path
                  style={{transform:'translate(0, 50px)', opacity:0.9}}
                  fill="url(#sw-gradient-1)"
                  d="M0,315L34.3,315C68.6,315,137,315,206,303.3C274.3,292,343,268,411,227.5C480,187,549,128,617,93.3C685.7,58,754,47,823,70C891.4,93,960,152,1029,180.8C1097.1,210,1166,210,1234,192.5C1302.9,175,1371,140,1440,110.8C1508.6,82,1577,58,1646,70C1714.3,82,1783,128,1851,128.3C1920,128,1989,82,2057,87.5C2125.7,93,2194,152,2263,186.7C2331.4,222,2400,233,2469,204.2C2537.1,175,2606,105,2674,99.2C2742.9,93,2811,152,2880,163.3C2948.6,175,3017,140,3086,110.8C3154.3,82,3223,58,3291,75.8C3360,93,3429,152,3497,163.3C3565.7,175,3634,140,3703,110.8C3771.4,82,3840,58,3909,75.8C3977.1,93,4046,152,4114,157.5C4182.9,163,4251,117,4320,105C4388.6,93,4457,117,4526,134.2C4594.3,152,4663,163,4731,192.5C4800,222,4869,268,4903,291.7L4937.1,315L4937.1,350L4902.9,350C4868.6,350,4800,350,4731,350C4662.9,350,4594,350,4526,350C4457.1,350,4389,350,4320,350C4251.4,350,4183,350,4114,350C4045.7,350,3977,350,3909,350C3840,350,3771,350,3703,350C3634.3,350,3566,350,3497,350C3428.6,350,3360,350,3291,350C3222.9,350,3154,350,3086,350C3017.1,350,2949,350,2880,350C2811.4,350,2743,350,2674,350C2605.7,350,2537,350,2469,350C2400,350,2331,350,2263,350C2194.3,350,2126,350,2057,350C1988.6,350,1920,350,1851,350C1782.9,350,1714,350,1646,350C1577.1,350,1509,350,1440,350C1371.4,350,1303,350,1234,350C1165.7,350,1097,350,1029,350C960,350,891,350,823,350C754.3,350,686,350,617,350C548.6,350,480,350,411,350C342.9,350,274,350,206,350C137.1,350,69,350,34,350L0,350Z"
                />
              </svg>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Navbar
