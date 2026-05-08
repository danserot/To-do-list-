import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

export const Route = createFileRoute("/")({
  component: App,
});

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [task, setTask] = useState("");

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "qwe", completed: false },
    { id: 2, text: "hello", completed: true },
    { id: 3, text: "delectus aut autem", completed: true },
    {
      id: 4,
      text: "quis ut nam facilis et officia qui",
      completed: true,
    },
    { id: 5, text: "fugiat veniam minus", completed: false },
  ]);

  function addTodo() {
    if (!task.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ?
          {
            ...todo,
            completed: !todo.completed,
          }
        : todo,
      ),
    );
  }
  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  function clearAll() {
    setTodos([]);
  }

  return (
    <Box minH="100vh" bg="#f1f1f1" py="10" fontFamily="mono">
      <Container maxW="4xl">
        <Heading
          textAlign="center"
          mb="10"
          size="lg"
          letterSpacing="widest"
          color="black">
          To do list example with TanStack Router
        </Heading>

        <HStack mb="3" align="stretch">
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            border="2px solid"
            borderColor="gray.600"
            bg="white"
            rounded="none"
            size="lg"
            _focus={{
              borderColor: "black",
              boxShadow: "none",
            }}
          />

          <Button
            onClick={addTodo}
            rounded="none"
            border="2px solid"
            borderColor="gray.600"
            bg="white"
            color="black"
            px="6"
            _hover={{
              bg: "gray.200",
            }}>
            Create todo
          </Button>
        </HStack>
        <HStack mb="4">
          <Button
            onClick={clearCompleted}
            rounded="none"
            bg="red.500"
            color="white"
            _hover={{
              bg: "red.600",
            }}>
            Clear Completed
          </Button>

          <Button
            onClick={clearAll}
            rounded="none"
            bg="black"
            color="white"
            _hover={{
              bg: "gray.800",
            }}>
            Clear All
          </Button>
        </HStack>

        <Stack gap="2">
          {todos.map((todo) => (
            <Flex
              key={todo.id}
              justify="space-between"
              align="center"
              border="2px solid"
              borderColor="gray.600"
              bg="white"
              px="5"
              py="4"
              cursor="pointer"
              onClick={() => toggleTodo(todo.id)}>
              <Text
                fontSize="2xl"
                color="#247886"
                textDecoration={todo.completed ? "line-through" : "none"}
                lineHeight="1.2">
                {todo.text}
              </Text>

              <Text fontSize="xs" color="black">
                {todo.completed ? "Complete" : ""}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
