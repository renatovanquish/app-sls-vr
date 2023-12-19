import ConsentData from './ConsentData'
import ConsentCookies from './ConsentCookies'

export default function Consent(props: any) {
  return (
    <>
      <ConsentData user={props.user} />
      <ConsentCookies user={props.user} />
    </>
  )
}
