import { useEffect, useState } from 'react'

const COOKIE_NAME = 'accept_cookies'

export const useAcceptCookies = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_NAME)) {
      setAcceptedCookies(false)
    }
  }, [acceptedCookies])

  const acceptCookies = () => {
    setAcceptedCookies(true)
    localStorage.setItem(COOKIE_NAME, 'accept')
  }

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  }
}
