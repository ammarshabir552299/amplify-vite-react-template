// src/App.tsx

import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => <TodoApp signOut={signOut} />}
    </Authenticator>
  );
}

function TodoApp({ signOut }: { signOut: () => void }) {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    return () => sub.unsubscribe();
  }, []);

  async function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      await client.models.Todo.create({ content });
    }
  }

  async function deleteTodo(id: string) {
    await client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>My Todos</h1>
      <button onClick={createTodo}>+ New</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App hosted! Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Next tutorial step.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

