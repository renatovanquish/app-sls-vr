import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditorCore from 'suneditor/src/lib/core'
import { useUI } from 'components/ui/context'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
})

interface Props {
  fieldName?: string
  value: string
  setValue?: any
  setContent?: any
  mode?: string
  height?: number
}

export default function Editor(props: Props) {
  const { value, setValue, fieldName, mode, setContent, height } = props

  const editor = useRef<SunEditorCore>()

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor
  }

  const [mounted, setMounted] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const { setProgress } = useUI()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setMounted(true)
    }
    return () => {
      isMounted = false
      setMounted(false)
    }
  }, [value])

  const handleChange = (c: string) => {
    if (setValue) {
      setValue(fieldName ? fieldName : 'content', c)
    }
    if (setContent) {
      setContent(c)
    }
  }

  const toggleFullScreen = (e: any) => {
    setIsFullScreen(e)
  }

  const handleImageUploadBefore = async (
    files: any,
    info: any,
    uploadHandler: any
  ) => {
    const { key } = await Storage.put(`images/${files[0].name}`, files[0], {
      level: 'public',
      contentType: `${files[0].type}`,
      progressCallback(progress: any) {
        const { loaded, total } = progress
        const p = ((loaded / total) * 100).toFixed(0)
        setProgress(p)
      },
    })
    const response = {
      result: [
        {
          url: `${process.env.MIDIA_CLOUDFRONT}${key}`,
          name: files[0].name,
          size: files[0].size,
        },
      ],
    }
    uploadHandler(response)
  }

  return mounted ? (
    <div className="w-full">
      <SunEditor
        getSunEditorInstance={getSunEditorInstance}
        lang="pt_br"
        defaultValue={value}
        onChange={handleChange}
        setDefaultStyle="font-size: 14px;"
        width="100%"
        height={height ? `${height}px` : '150px'}
        autoFocus={true}
        toggleFullScreen={toggleFullScreen}
        setOptions={mode === 'essential' ? ToolBarEssential : ToolBarFull}
        name={fieldName}
        onImageUploadBefore={handleImageUploadBefore}
      />
    </div>
  ) : (
    <div></div>
  )
}

const ToolBarEssential = {
  defaultTag: 'p',
  linkProtocol: 'https://',
  imageGalleryUrl: '',
  buttonList: [
    ['font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic'],
    ['fontColor', 'hiliteColor'],
    ['removeFormat'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['undo', 'redo'],
  ],
}

const ToolBarFull = {
  defaultTag: 'p',
  linkProtocol: 'https://',
  imageGalleryUrl: '',
  buttonList: [
    ['font', 'fontSize', 'formatBlock'],
    // ['paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor'], // 'textStyle'
    ['removeFormat'],
    // '/', // Line break
    ['outdent', 'indent'],
    ['align', 'list', 'horizontalRule', 'lineHeight'],
    ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // , 'imageGallery' You must add the 'katex' library at options to use the 'math' plugin.
    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
    ['codeView'], // , 'fullScreen', 'save', 'showBlocks',
    // ['preview', 'print'],
    // ['template'], // 'save'
    ['undo', 'redo'],
  ],
  templates: [
    {
      name: 'Template-1',
      html: '<div classname="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"><div>1</div><div>2</div><div>3</div></div>',
    },
    {
      name: 'Template-2',
      html: '<p>HTML source2</p>',
    },
  ],
  // plugins: [font] set plugins, all plugins are set by default
  // Other option
}
