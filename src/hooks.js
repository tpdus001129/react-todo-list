/* eslint-disable */
import { useState, useRef, useMemo } from "react";
import { useRecoilState } from "recoil";
import produce from "immer";

import { todosAtom, lastTodoIdAtom } from "./atoms";
import { dateToStr } from "./util";

export function useTodoOptionDrawerStatus() {
  const [todoId, setTodoId] = useState(null);
  const opened = useMemo(() => todoId !== null, [todoId]);
  const close = () => setTodoId(null);
  const open = (id) => setTodoId(id);

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

  const addTodo = (performDate, newContent) => {
    const id = ++lastTodoIdRef.current;
    setLastTodoId(id);

    const newTodo = {
      id,
      regDate: dateToStr(new Date()),
      performDate: dateToStr(new Date(performDate)),
      content: newContent,
      completed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);

    return id;
  };

  const modifyTodo = (index, performDate, content) => {
    const newTodos = produce(todos, (draft) => {
      draft[index].performDate = dateToStr(new Date(performDate));
      draft[index].content = content;
    });

    setTodos(newTodos);
  };

  const modifyTodoById = (id, performDate, newContent) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return;
    }

    modifyTodo(index, performDate, newContent);
  };

  // 삭제
  const removeTodo = (index) => {
    const removedTodo = todos[index];
    const newTodos = todos.filter((_, _index) => _index !== index);

    if (removedTodo.id !== lastTodoId) {
      const updatedTodos = newTodos.map((todo) => {
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

  const removeTodoById = (id) => {
    const index = findTodoIndexById(id);

    if (index != -1) {
      removeTodo(index);
    }
  };

  const findTodoIndexById = (id) => {
    return todos.findIndex((todo) => todo.id == id);
  };

  const findTodoById = (id) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return null;
    }

    return todos[index];
  };

  const toggleTodoCompletedById = (id) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return;
    }

    setTodos(
      produce(todos, (draft) => {
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
