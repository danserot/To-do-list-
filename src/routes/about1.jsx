import { createFileRoute } from '@tanstack/react-router'
import { Button, HStack } from "@chakra-ui/react"

export const Route = createFileRoute('/about1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about1"!
     <HStack>
          <Button>Click me</Button>
          <Button>Click me</Button>
        </HStack>
  </div>
}
