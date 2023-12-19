import Image from 'next/image'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useTheme } from 'next-themes'

interface Props {
  photo: string
  title: string
  description?: string
  link?: string
  objectFit?: string
  viewFormat?: string
}

export default function Card3(props: Props): JSX.Element {
  const { photo, title, description, link, objectFit, viewFormat } = props
  const router = useRouter()
  const { theme } = useTheme()
  return link ? (
    <div
      className="cursor-pointer relative h-full w-full z-10"
      onClick={() => router.push(link)}
    >
      <Image
        alt=""
        className={`absolute object-${objectFit ? objectFit : 'cover'} object-center`}
        src={photo}
        layout="fill"
        priority
      />
      <div className={cn("absolute z-20 w-full font-sans text-accent-0 whitespace-normal",{
        ['text-center text-xs font-bold bottom-4 grid justify-items-stretch p-0']: viewFormat && viewFormat === 'circle-sm',
        ['text-center text-base font-semibold bottom-6 grid justify-items-stretch p-0']: viewFormat && viewFormat === 'circle-md',
        ['text-center text-xl font-semibold bottom-8 grid justify-items-stretch p-0']: viewFormat && viewFormat === 'circle-lg',
        ['bottom-0 text-xs font-bold p-1']: viewFormat && viewFormat === 'square-sm',
        ['bottom-0 text-base font-semibold p-1']: viewFormat && viewFormat === 'square-md',
        ['bottom-0 text-xl font-semibold p-2']: viewFormat && viewFormat === 'square-lg',
        ['bottom-0 p-3 text-2xl font-semibold']: !viewFormat || (
          viewFormat !== 'square-lg' && 
          viewFormat !== 'square-md' && 
          viewFormat !== 'square-sm' && 
          viewFormat !== 'circle-lg' && 
          viewFormat !== 'circle-md' && 
          viewFormat !== 'circle-sm')
      })}>
        <div className={cn('line-clamp-2', {
          'text-accent-1': theme === 'light',
          'text-accent-9': theme === 'dark'
        })} style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.6)' }}>{title}</div>
        <p
          style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.6)' }}
          className={cn({
            'text-accent-2': theme === 'light',
            'text-accent-6': theme === 'dark'
          }, {
            ['text-xs line-clamp-1']: viewFormat && (viewFormat === 'circle-sm' || viewFormat === 'square-sm'),
            ['text-xs line-clamp-2']: viewFormat && (viewFormat === 'circle-md' || viewFormat === 'square-md'),
            ['text-sm line-clamp-3']: !viewFormat || (viewFormat !== 'circle-sm' && viewFormat !== 'circle-md' && viewFormat !== 'square-sm' && viewFormat !== 'square-md')
          })}
        >
         {description}
        </p>
      </div>
    </div>
  ) : (
    <div className="relative h-full w-full z-10">
      <Image
        alt=""
        className={`absolute object-${objectFit ? objectFit : 'cover'} object-center`}
        src={photo}
        width="350"
        height="350"
        layout="fill"
        priority
      />
      <div className={cn("absolute z-20 w-full font-sans text-accent-0 whitespace-normal",{
        ['text-center text-xs font-bold bottom-4 grid justify-items-stretch p-0']: viewFormat && viewFormat === 'circle-sm',
        ['text-center text-base font-semibold bottom-6 grid justify-items-stretch p-0']: viewFormat && viewFormat === 'circle-md',
        ['text-center text-xl font-semibold bottom-8 grid justify-items-stretch p-0']: viewFormat && viewFormat === 'circle-lg',
        ['bottom-0 text-xs font-bold p-1']: viewFormat && viewFormat === 'square-sm',
        ['bottom-0 text-base font-semibold p-1']: viewFormat && viewFormat === 'square-md',
        ['bottom-0 text-xl font-semibold p-2']: viewFormat && viewFormat === 'square-lg',
        ['bottom-0 p-3 text-2xl font-semibold']: !viewFormat || (
          viewFormat !== 'square-lg' && 
          viewFormat !== 'square-md' && 
          viewFormat !== 'square-sm' && 
          viewFormat !== 'circle-lg' && 
          viewFormat !== 'circle-md' && 
          viewFormat !== 'circle-sm')
      })}>
        <div className={cn('line-clamp-2', {
          'text-accent-1': theme === 'light',
          'text-accent-9': theme === 'dark'
        })} style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.6)' }}>{title}</div>
        <p
          style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.6)' }}
          className={cn({
            'text-accent-2': theme === 'light',
            'text-accent-6': theme === 'dark'
          }, {
            ['text-xs line-clamp-1']: viewFormat && (viewFormat === 'circle-sm' || viewFormat === 'square-sm'),
            ['text-xs line-clamp-2']: viewFormat && (viewFormat === 'circle-md' || viewFormat === 'square-md'),
            ['text-sm line-clamp-3']: !viewFormat || (viewFormat !== 'circle-sm' && viewFormat !== 'circle-md' && viewFormat !== 'square-sm' && viewFormat !== 'square-md')
          })}
        >
          11111{description}
        </p>
      </div>
    </div>
  )
}
