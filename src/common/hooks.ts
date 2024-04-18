import { useState, useRef, useMemo } from "react";
import { useRecoilState } from "recoil";
import produce from "immer";
import { todosAtom, lastTodoIdAtom } from "./atoms";
import { dateToStr } from "./util";
import { Todo } from "./type";

export function useTodoOptionDrawerStatus() {
  const [todoId, setTodoId] = useState<number | null>(null);
  const opened = useMemo(() => todoId !== null, [todoId]);
  const close = () => setTodoId(null);
  const open = (id: number) => setTodoId(id);

  return {
    todoId,
    opened,
    close,
    open,
  };
}

export function useTodosStatus() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [lastTodoId, setLastTodoId] = useRecoilState(lastTodoIdAtom);
  const lastTodoIdRef = useRef(lastTodoId);

  lastTodoIdRef.current = lastTodoId;

  const addTodo = (performDate: string, newContent: string) => {
    const id = ++lastTodoIdRef.current;
    setLastTodoId(id);

    const newTodo: Todo = {
      id,
      regDate: dateToStr(new Date()),
      performDate: dateToStr(new Date(performDate)),
      content: newContent,
      completed: false,
    };

    setTodos((todos: Todo[]) => [newTodo, ...todos]);

    return id;
  };

  const modifyTodo = (index: number, performDate: string, content: string) => {
    const newTodos = produce(todos, (draft: Todo[]) => {
      draft[index].performDate = dateToStr(new Date(performDate));
      draft[index].content = content;
    });

    setTodos(newTodos);
  };

  const modifyTodoById = (id: number, performDate: string, newContent: string) => {
    const index = findTodoIndexById(id);

    if (index === -1) {
      return;
    }

    modifyTodo(index, performDate, newContent);
  };

  // 삭제
  const removeTodo = (index: number) => {
    const removedTodo = todos[index];
    const newTodos = todos.filter((_: Todo, _index: number) => _index !== index);

    if (removedTodo.id !== lastTodoId) {
      const updatedTodos = newTodos.map((todo: Todo) => {
        if (todo.id > removedTodo.id) {
          return { ...todo, id: todo.id - 1 };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } else {
      setTodos(newTodos);
    }

    setLastTodoId(lastTodoId - 1);
  };

  const removeTodoById = (id: number) => {
    const index = findTodoIndexById(id);

    if (index !== -1) {
      removeTodo(index);
    }
  };

  const findTodoIndexById = (id: number) => {
    return todos.findIndex((todo: Todo) => todo.id === id);
  };

  const findTodoById = (id: number) => {
    const index = findTodoIndexById(id);

    if (index === -1) {
      return null;
    }

    return todos[index];
  };

  const toggleTodoCompletedById = (id: number) => {
    const index = findTodoIndexById(id);

    if (index === -1) {
      return;
    }

    setTodos(
      produce(todos, (draft: Todo[]) => {
        draft[index].completed = !draft[index].completed;
      })
    );
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    modifyTodoById,
    removeTodo,
    removeTodoById,
    findTodoById,
    toggleTodoCompletedById,
  };
}
