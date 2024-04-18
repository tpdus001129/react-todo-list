export interface Todo {
  id: number;
  regDate: string;
  performDate: string;
  content: string;
  completed: boolean;
}

export interface Status {
  todoId: number | null;
  opened: boolean;
  close: () => void;
  open: (id: number) => void;
}

export interface TodoListItemType {
  onCompletedBtnClicked: (id: number) => void;
  todo: Todo;
  index: number;
  openDrawer: (id: number) => void;
}
