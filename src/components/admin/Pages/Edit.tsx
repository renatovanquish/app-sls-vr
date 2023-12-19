import { useState } from 'react'
import { Blocks, Editor, Button } from 'components/ui'
import { Check, Cross } from 'components/icons'
import { useScreen } from 'hooks/useScreen'
import { usePage } from 'hooks/usePage'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { PageSideColumn } from 'models'
import { toast } from 'react-toast'
import cn from 'classnames'
import { FormPage } from 'components/admin'

interface Props {
  userID: string
  page: any
  indexSel?: number
  handleUpdate?: any
  handleUpdateBlocks?: any
  onClose?: any
  menus?: any
}

export default function EditPage(props: Props) {
  const { userID, page, indexSel, handleUpdate, handleUpdateBlocks, onClose, menus } =
    props

  const [loading, setLoading] = useState(false)
  const [tabSel, setTabSel] = useState(
    (page.blocks && page.blocks.items.length === 0 && page.content) ? '0' : '2'
  )

  const [content, setContent] = useState(page.content)
  const [sideColumnContent, setSideColumnContent] = useState(
    page.sideColumnContent
  )

  const { updatePage } = usePage()
  const { screenWidth, screenHeight } = useScreen()
  const { isSm, isMd } = useBreakPoints()

  const saveContent = async () => {
    setLoading(true)
    const { description } = page

    let search = ''
    if (content) {
      search = search + content.toLowerCase()
    }
    if (sideColumnContent) {
      search = search + sideColumnContent.toLowerCase()
    }
    if (description) {
      search = search + description.toLowerCase()
    }
    if (page) {
      page.blocks.items.map((block: any) => {
        search = search + block.content.toLowerCase()
      })
    }

    const input = {
      id: page.id,
      content,
      sideColumnContent,
      search,
    } as any

    await updatePage(input)

    if (handleUpdate) {
      handleUpdate(input)
    }

    setLoading(false)
    toast(`Página atualizada com sucesso.`, {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  return (
    <div style={{ width: screenWidth, height: screenHeight }}>
      <div
        className="overflow-y-auto bg-accent-0 pr-2"
        style={{ height: screenHeight }}
      >
        <div className="sticky top-0 z-50 bg-accent-0">
          <div className="flex justify-between">
            <div className="w-full">
              <div className="h-16 grid grid-cols-1 content-between">
                <div className="pl-4 pt-1 text-base font-semibold line-clamp-1">
                  {page.title}
                </div>
                <div className="pl-4 pb-1">
                  <select
                    defaultValue={tabSel}
                    className="py-0 bg-accent-1 text-blue-500 rounded-lg border-2 border-accent-1 outline-none"
                    onChange={(e: any) => {
                      setTabSel(e.target.value)
                    }}
                  >
                    <option value="0">Editor</option>
                    <option value="1">Lateral</option>
                    <option value="2">Blocos</option>
                    <option value="3">Configurações</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pt-3 pr-4 pl-2 flex flex-row">
              {tabSel !== '2' && (
                <div>
                  <button
                    onClick={saveContent}
                    className="mr-2 cursor-pointer bg-accent-1 p-2 rounded-full"
                  >
                    <Check className="h-7 w-7" />
                  </button>
                </div>
              )}
              <div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="cursor-pointer bg-accent-1 p-2 rounded-full"
                >
                  <Cross className="h-7 w-7" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {tabSel === '0' && (
          <Editor
            value={page && page.content ? page.content : ''}
            setContent={setContent}
            height={
              screenWidth > 1140 ? screenHeight - 148 : screenHeight - 192
            }
          />
        )}

        {tabSel === '1' && (
          <Editor
            value={page && page.sideColumnContent ? page.sideColumnContent : ''}
            setContent={setSideColumnContent}
            height={
              screenWidth > 1140 ? screenHeight - 148 : screenHeight - 192
            }
          />
        )}

        {tabSel === '2' && (
          <Blocks
            pageID={page.id}
            userID={userID}
            handleUpdateBlocks={handleUpdateBlocks}
          />
        )}

        {tabSel === '3' && <div className='px-4'>
        <FormPage page={page} userID={userID} handleUpdate={handleUpdate} />
          </div>}
      </div>
    </div>
  )
}
