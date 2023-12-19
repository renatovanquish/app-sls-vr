import { Layout } from 'components/common'
import { Container, Loading } from 'components/ui'
import { useUserAuth } from 'components/userAuth/context'
export default function MyCourses(): JSX.Element {
  const { isAuthenticating } = useUserAuth()

  return <Container>
      {isAuthenticating && <Loading />}
    <div className='p-4'>Em construção...</div>  
    </Container>
}

MyCourses.Layout = Layout
