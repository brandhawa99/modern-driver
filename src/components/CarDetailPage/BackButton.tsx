import { Link, useCanGoBack, useRouter } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { ArrowLeftIcon } from "@phosphor-icons/react"

const BackButton = () => {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const navigateBack = () => {
    if (window.history.length > 1) {
      router.history.back()
    } else {
      router.navigate({ to: "/showroom" })
    }
  }

  const content = (
    <div className="flex items-center gap-2 justify-center">
      <ArrowLeftIcon
        size={32}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />
      Go Back
    </div>
  )

  if (canGoBack) {
    return (
      <Button
        variant="link"
        className="group text-default"
        onClick={() => navigateBack()}    >
        {content}
      </Button>
    )
  }

  return (
    <Button asChild variant="link" className="group text-default">
      <Link to="/showroom">
        {content}
      </Link>
    </Button>
  )
}
export default BackButton