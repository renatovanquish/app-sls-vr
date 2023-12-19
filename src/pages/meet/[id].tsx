import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from 'components/common'

import { useUserAuth } from 'components/userAuth/context'
import { useUI } from 'components/ui/context'
import { useScreen } from 'hooks/useScreen'

export default function Page() {
  const { user } = useUserAuth()

  const router = useRouter()
  const { id } = router.query

  const { screenWidth, screenHeight } = useScreen()

  const url = `https://meet.jit.si/${id}`

  const { hideSearch, heightNavBar } = useUI()

  useEffect(() => {
    hideSearch()
  }, [])

  return (
    <div>
      <iframe
        height={screenHeight - heightNavBar}
        width={screenWidth}
        allow="camera *;microphone *"
        src={url}
      ></iframe>
    </div>
  )
}

Page.Layout = Layout
