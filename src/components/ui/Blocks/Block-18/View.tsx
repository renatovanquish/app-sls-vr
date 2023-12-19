/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Search } from 'components/icons'
import cn from 'classnames'

interface Props {
  block: any
  user: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const router = useRouter()

  const videoRef = useRef(null as any)

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config)
      setConfig(configParse)
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setContent(contentParse)
    }
    return () => {
      setConfig({} as any)
      setContent({} as any)
    }
  }, [block])

  useEffect(() => {
    videoRef.current?.load()
  }, [content])

  return (
    <div
      className={cn({
        ['hidden']: config.view === 'hide' || (config.view === 'guest' && user),
        ['md:hidden']: config.view === 'sm',
        ['hidden md:block']: config.view === 'lg',
        ['px-0']: config.padX && config.padX === 'none',
        ['px-4']: !config.padX || config.padX === 'small',
        ['px-8']: config.padX && config.padX === 'normal',
        ['px-12']: config.padX && config.padX === 'large',
        ['px-24']: config.padX && config.padX === 'extra',
        ['py-0']: config.padY && config.padY === 'none',
        ['py-4']: !config.padY || config.padY === 'small',
        ['py-8']: config.padY && config.padY === 'normal',
        ['py-12']: config.padY && config.padY === 'large',
        ['py-24']: config.padY && config.padY === 'extra',
        ['bg-accent-1']: config.bgMode === 'auto',
        ['bg-local']: config.bgMode === 'image',
      })}
      style={{
        backgroundColor:
          config.bgMode === 'custom' && config.bgColor ? config.bgColor : null,
        backgroundImage:
          config.bgMode === 'image' ? `url(${config.bgImage})` : '',
        backgroundRepeat: config.bgMode === 'image' ? 'no-repeat' : '',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {config.anchor && <a id={`${config.anchor}`}></a>}
      <div className='flex justify-center'>
      <video
        ref={videoRef}
        width={content.size === 'md' ? 640 : 'auto'}
        className={cn({
          [`shadow${content.viewShadow}`]:
            content.viewShadow && content.viewShadow !== '-none',
          [`p-${content.viewBorder}`]:
            content.viewBorder && content.viewBorder !== '0',
          [`bg-accent-${content.viewBgColor}`]:
            content.viewBgColor && content.viewBgColor !== 'none',
          [`rounded${content.viewRounded}`]:
            content.viewRounded && content.viewRounded !== '-none',
          ['w-full']: content.size === 'lg',
        })}
        controls={content.controls}
        autoPlay={content.autoplay}
        muted={content.muted}
      >
        <source src={content.videoUrl} type="video/mp4" />
      </video>
      </div>
    </div>
  )
}
