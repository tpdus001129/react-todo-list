import TodosEmpty from "../components/TodosEmpty";
import { useTodosStatus } from "../common/hooks";
import TodoListPage from "./TodoListPage";

export default function MainPage() {
  const todosStatus = useTodosStatus();

  const todosEmpty = todosStatus.todos.length === 0;

  if (todosEmpty) {
    return <TodosEmpty />;
  }

  return (
    <>
      <TodoListPage />
    </>
  );
}
