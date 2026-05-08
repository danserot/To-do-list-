import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

const API_URL = "http://localhost:3000/todos";

async function getTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

async function createTodo(text: string): Promise<Todo> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      completed: false,
    }),
  });

  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

async function updateTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(`${API_URL}/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !todo.completed,
    }),
  });

  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete todo");
}

function App() {
  const [task, setTask] = useState("");
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function addTodo() {
    if (!task.trim()) return;

    addTodoMutation.mutate(task);
    setTask("");
  }

  function toggleTodo(todo: Todo) {
    toggleTodoMutation.mutate(todo);
  }

  function clearCompleted() {
    const completedTodos = todos.filter((todo) => todo.completed);

    completedTodos.forEach((todo) => {
      deleteTodoMutation.mutate(todo.id);
    });
  }

  function clearAll() {
    todos.forEach((todo) => {
      deleteTodoMutation.mutate(todo.id);
    });
  }

  if (isLoading &&!todos) {
    return <Text p="10">Loading...</Text>;
  }

  if (isError) {
    return <Text p="10">Something went wrong</Text>;
  }

  return (
    <Box minH="100vh" bg="#f1f1f1" py="10" fontFamily="mono">
      <Container maxW="4xl">
        <Heading
          textAlign="center"
          mb="10"
          size="lg"
          letterSpacing="widest"
          color="black"
        >
          To do list example with TanStack Router + Query
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
            type="submit"
            onClick={addTodo}
            loading={addTodoMutation.isPending}
            rounded="none"
            border="2px solid"
            borderColor="gray.600"
            bg="white"
            color="black"
            px="6"
            _hover={{
              bg: "gray.200",
            }}
          >
            Create todo
          </Button>
        </HStack>

        <HStack mb="4">
          <Button
              type="button"
            onClick={clearCompleted}
            rounded="none"
            bg="red.500"
            color="white"
            _hover={{
              bg: "red.600",
            }}
          >
            Clear Completed
          </Button>

          <Button
            type="button"
            onClick={clearAll}
            rounded="none"
            bg="black"
            color="white"
            _hover={{
              bg: "gray.800",
            }}
          >
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
              onClick={() => toggleTodo(todo)}
            >
              <Text
                fontSize="2xl"
                color="#247886"
                textDecoration={todo.completed ? "line-through" : "none"}
                lineHeight="1.2"
              >
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