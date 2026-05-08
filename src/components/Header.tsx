import { Link } from "@tanstack/react-router";

import { Box, Container, Flex, HStack, Text, Button } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <Box
      position="sticky"
      top="4"
      zIndex="1000"
      display="flex"
      justifyContent="center"
      px="4">
      <Container maxW="80%">
        <Flex
          align="center"
          justify="space-between"
          px="6"
          py="4"
          borderRadius="24px"
          bg="rgba(255,255,255,0.08)"
          backdropFilter="blur(18px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          boxShadow="0 10px 40px rgba(0,0,0,0.15)">
          <Link to="/">
            <HStack cursor="pointer" gap="3">
              <Flex
                w="42px"
                h="42px"
                borderRadius="14px"
                align="center"
                justify="center"
                bg="black"
                color="white"
                fontWeight="bold"
                fontSize="sm">
                TS
              </Flex>

              <Box>
                <Text
                  color="black"
                  fontWeight="700"
                  fontSize="md"
                  lineHeight="1">
                  TanStack App
                </Text>

                <Text color="black" fontSize="xs" mt="1">
                  Router + Query
                </Text>
              </Box>
            </HStack>
          </Link>

          <HStack gap="3">
            <Link to="/">
              {({ isActive }) => (
                <Button
                  size="sm"
                  borderRadius="full"
                  bg={isActive ? "white" : "whiteAlpha.100"}
                  color={isActive ? "black" : "gray.800"}
                  _hover={{
                    bg: isActive ? "white" : "whiteAlpha.200",
                  }}
                  transition="0.2s">
                  Main
                </Button>
              )}
            </Link>

            <Link to="/about">
              {({ isActive }) => (
                <Button
                  size="sm"
                  borderRadius="full"
                  bg={isActive ? "white" : "whiteAlpha.100"}
                  color={isActive ? "black" : "gray.800"}
                  _hover={{
                    bg: isActive ? "white" : "whiteAlpha.200",
                  }}
                  transition="0.2s">
                  About
                </Button>
              )}
            </Link>

            <ThemeToggle />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
