import { useEffect } from 'react'
import { Layout } from 'components/common'

import { useUserAuth } from 'components/userAuth/context'
import { useUI } from 'components/ui/context'
import { useScreen } from 'hooks/useScreen'

export default function Page() {
  const { user } = useUserAuth()
  const { screenWidth, screenHeight } = useScreen()
  const url = `https://meet.jit.si/vqs`
  const { hideSearch } = useUI()

  useEffect(() => {
    hideSearch()
  }, [])

  return (
    <div>
      <iframe
        height={screenHeight - 98}
        width={screenWidth}
        allow="camera *;microphone *"
        src={url}
      ></iframe>
    </div>
  )
}

Page.Layout = Layout
