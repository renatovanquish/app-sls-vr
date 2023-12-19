/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'
import cn from 'classnames'
import Image from 'next/image'
import { useScreen } from 'hooks/useScreen'
import { useBreakPoints } from 'hooks/useBreakPoints'

import { Modal } from 'components/ui'

interface Props {
  block: any
  hasLateral?: boolean
  user: any
}

export default function View(props: Props) {
  const { block, hasLateral, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const [m, setM] = useState(0)

  const [displayModal, setDisplayModal] = useState(false)
  const [photoModal, setPhotoModal] = useState('')

  const { isSm, isMd, isLg } = useBreakPoints()
  const { screenWidth, screenHeight } = useScreen()

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config)
      setConfig(configParse)
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setContent(contentParse)

      if (contentParse.imageMode === 'responsiveLg') {
        if (hasLateral) {
          setM(0)
        } else {
          setM(
            isSm
              ? 0
              : isMd
              ? screenWidth * 0.04
              : isLg
              ? screenWidth * 0.08
              : screenWidth * 0.12
          )
        }
      } else if (contentParse.imageMode === 'responsiveMd') {
        if (hasLateral) {
          setM(
            isSm
              ? screenWidth * 0.15
              : isMd
              ? screenWidth * 0.18
              : isLg
              ? screenWidth * 0.15
              : screenWidth * 0.14
          )
        } else {
          setM(
            isSm
              ? screenWidth * 0.15
              : isMd
              ? screenWidth * 0.18
              : isLg
              ? screenWidth * 0.21
              : screenWidth * 0.25
          )
        }
      } else if (contentParse.imageMode === 'responsiveSm') {
        if (hasLateral) {
          setM(
            isSm
              ? screenWidth * 0.26
              : isMd
              ? screenWidth * 0.31
              : isLg
              ? screenWidth * 0.25
              : screenWidth * 0.28
          )
        } else {
          setM(
            isSm
              ? screenWidth * 0.26
              : isMd
              ? screenWidth * 0.31
              : isLg
              ? screenWidth * 0.36
              : screenWidth * 0.39
          )
        }
      } else {
        setM(0)
      }
    }
    return () => {
      setConfig({} as any)
      setContent({} as any)
      setM(0)
      setDisplayModal(false)
    }
  }, [block, screenWidth])

  const handleHeightPalalax = () => {
    let h = !isSm ? 400 : 200
    if (isSm && content.imageHeightSm) {
      h = parseInt(content.imageHeightSm)
    } else if (content.imageHeight) {
      h = parseInt(content.imageHeight)
    }
    return h
  }

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
        backgroundColor: config.bgMode === 'custom' && config.bgColor ? config.bgColor : null,
        backgroundImage: config.bgMode === 'image' ? `url(${config.bgImage})` : '',
        backgroundRepeat: config.bgMode === 'image' ? 'no-repeat' : '',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >{config.anchor && <a id={`${config.anchor}`}></a>}
      {(!content.imageMode || content.imageMode === 'paralax') && (
        <ParallaxBanner
          layers={[
            {
              image: isSm && content.imageUrlSm ? content.imageUrlSm : content.imageUrl,
              speed: -5,
              scale: [1.15, 1, 'easeOutCubic'],
              shouldAlwaysCompleteAnimation: true,
            },
          ]}
          style={{
            height: handleHeightPalalax(),
          }}
        ></ParallaxBanner>
      )}

      {content.imageUrl && content.imageMode !== 'paralax' && (
        <div style={{ paddingLeft: m, paddingRight: m, display: 'block' }}>
          <div
            className={cn('cursor-pointer', {
              ['flex justify-center']: content.imageMode === 'intrinsic',
              [`shadow${content.viewShadow}`]:
                content.imageMode !== 'intrinsic' &&
                content.imageMask === 'none' &&
                content.viewShadow &&
                content.viewShadow !== '-none',
              [`p-${content.viewBorder}`]:
                content.imageMode !== 'intrinsic' &&
                content.imageMask === 'none' &&
                content.viewBorder &&
                content.viewBorder !== '0',
              [`bg-accent-${content.viewBgColor}`]:
                content.imageMode !== 'intrinsic' &&
                content.imageMask === 'none' &&
                content.viewBgColor &&
                content.viewBgColor !== 'none',
              [`rounded${content.viewRounded}`]:
                content.imageMode !== 'intrinsic' &&
                content.imageMask === 'none' &&
                content.viewRounded &&
                content.viewRounded !== '-none',
            })}
          >
            <Image
              alt=""
              src={content.imageUrl}
              quality={content.quality ? parseInt(content.quality) : 75}
              width={
                content.aspectRatio && content.aspectRatio !== 'custom'
                  ? content.aspectRatio.split(':')[0]
                  : content.aspectRatio &&
                    content.aspectRatio === 'custom' &&
                    content.aspectRatioCustom
                  ? content.aspectRatioCustom.split(':')[0]
                  : 100
              }
              height={
                content.aspectRatio && content.aspectRatio !== 'custom'
                  ? content.aspectRatio.split(':')[1]
                  : content.aspectRatio &&
                    content.aspectRatio === 'custom' &&
                    content.aspectRatioCustom
                  ? content.aspectRatioCustom.split(':')[1]
                  : 100
              }
              layout={
                content.imageMode === 'intrinsic' ? 'intrinsic' : 'responsive'
              }
              className={cn(
                `object-${
                  content.objectMode ? content.objectMode : 'none'
                } object-center`,
                {
                  [`rounded${content.viewRounded}`]:
                    content.viewRounded && content.viewRounded !== '-none',
                  ['mask mask-circle']: content.imageMask === 'circle',
                  ['mask mask-squircle']: content.imageMask === 'squircle',
                  ['mask mask-heart']: content.imageMask === 'heart',
                  ['mask mask-hexagon']: content.imageMask === 'hexagon',
                  ['mask mask-hexagon-2']: content.imageMask === 'hexagon2',
                  ['mask mask-decagon']: content.imageMask === 'decagon',
                  ['mask mask-pentagon']: content.imageMask === 'pentagon',
                  ['mask mask-diamond']: content.imageMask === 'diamond',
                  ['mask mask-star']: content.imageMask === 'star',
                  ['mask mask-star-2']: content.imageMask === 'star2',
                  ['mask mask-triangle']: content.imageMask === 'triangle',
                  ['mask mask-triangle-2']: content.imageMask === 'triangle2',
                  ['mask mask-triangle-3']: content.imageMask === 'triangle3',
                  ['mask mask-triangle-4']: content.imageMask === 'triangle4',
                  ['mask mask-parallelogram']:
                    content.imageMask === 'parallelogram',
                  ['mask mask-parallelogram-2']:
                    content.imageMask === 'parallelogram2',
                  ['mask mask-parallelogram-3']:
                    content.imageMask === 'parallelogram3',
                  ['mask mask-parallelogram-4']:
                    content.imageMask === 'parallelogram4',
                }
              )}
              onClick={() => {
                setPhotoModal(`${content.imageUrl}`)
                setDisplayModal(true)
              }}
            />
          </div>

          <Modal
            open={displayModal && photoModal ? true : false}
            onClose={() => {
              setDisplayModal(false)
            }}
            focusTrap={false}
            fullSize={true}
            absolute={true}
          >
            <img
              alt=""
              src={photoModal}
              className="mx-auto cursor-pointer shadow-lg p-2"
              style={{
                maxWidth: screenWidth * 0.9,
                maxHeight: screenHeight * 0.9,
              }}
            />
          </Modal>
        </div>
      )}
    </div>
  )
}
