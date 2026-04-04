import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const id = hash.replace("#", "")
    
    const scrollToElement = () => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        return true
      }
      return false
    }

    if (!scrollToElement()) {
      const observer = new MutationObserver(() => {
        if (scrollToElement()) {
          observer.disconnect()
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      const timeout = setTimeout(() => {
        observer.disconnect()
      }, 2000)

      return () => {
        clearTimeout(timeout)
        observer.disconnect()
      }
    }
  }, [pathname, hash])

  return null
}