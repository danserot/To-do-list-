import { createFileRoute } from '@tanstack/react-router'
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <Container maxW="4xl" py="12">
      <Box
        borderWidth="1px"
        rounded="2xl"
        p={{ base: '6', md: '10' }}
        shadow="sm"
      >
        <Text
          mb="2"
          fontSize="sm"
          fontWeight="600"
          color="teal.500"
          textTransform="uppercase"
        >
          About
        </Text>

        <Heading
          mb="4"
          size="2xl"
          lineHeight="1.1"
        >
          A modern starter powered by TanStack Router.
        </Heading>

        <Text
          mb="8"
          fontSize="lg"
          color="gray.600"
          lineHeight="8"
          maxW="3xl"
        >
          This project demonstrates modern React architecture
          using TanStack Router, TypeScript, SSR concepts,
          layouts, loaders, navigation, and Chakra UI
          components.
        </Text>

        <Stack gap="5">
          <Box
            borderWidth="1px"
            rounded="xl"
            p="5"
          >
            <Heading size="md" mb="2">
              Type-Safe Routing
            </Heading>

            <Text color="gray.600">
              Routes, navigation, params, and search
              parameters are fully typed with TypeScript.
            </Text>
          </Box>

          <Box
            borderWidth="1px"
            rounded="xl"
            p="5"
          >
            <Heading size="md" mb="2">
              Modern React Stack
            </Heading>

            <Text color="gray.600">
              Built with React, Vite, TanStack Router,
              Chakra UI, and TypeScript.
            </Text>
          </Box>

          <Box
            borderWidth="1px"
            rounded="xl"
            p="5"
          >
            <Heading size="md" mb="2">
              Scalable Structure
            </Heading>

            <Text color="gray.600">
              The application uses layouts, reusable
              components, and file-based routing for
              scalability.
            </Text>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}