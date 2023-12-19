import { Layout } from 'components/common'
import { Container, Loading } from 'components/ui'
import { useUserAuth } from 'components/userAuth/context'

export default function HomePage(): JSX.Element {
  const { isAuthenticating } = useUserAuth()

  return <Container>{isAuthenticating && <Loading />}</Container>
}

HomePage.Layout = Layout

export async function getServerSideProps() {
  return {
    redirect: {
      destination: process.env.HOME,
      permanent: false,
    },
  }
}