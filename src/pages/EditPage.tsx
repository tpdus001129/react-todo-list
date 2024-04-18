import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useNoticeSnackbarStatus } from "../components/NoticeSnackbar";
import { useTodosStatus } from "../common/hooks";

export default function EditPage() {
  const navigate = useNavigate();
  const { id }: { id?: string } = useParams();

  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();
  const todo = id !== undefined ? todosStatus.findTodoById(parseInt(id, 10)) : undefined;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.performDate.value.length === 0) {
      alert("날짜를 입력해주세요.");
      form.performDate.focus();

      return;
    }

    if (form.content.value.length === 0) {
      alert("내용을 입력해주세요.");
      form.content.focus();

      return;
    }

    const newTodoId = todosStatus.modifyTodoById(
      todo.id,
      form.performDate.value,
      form.content.value
    );

    noticeSnackbarStatus.open(`${todo.id}번 할 일이 수정되었습니다.`);

    navigate(-1);
  };

  const performDateForInput = todo.performDate.slice(0, 16).replace(" ", "T");

  return (
    <>
      <form className="flex-1 flex flex-col gap-7 p-6 sm:p-8" onSubmit={onSubmit}>
        <TextField
          label="언제 해야 하나요?"
          focused
          type="datetime-local"
          name="performDate"
          defaultValue={performDateForInput}
        />
        <TextField
          name="content"
          label="무엇을 해야하나요?"
          className="flex-1 flex"
          InputProps={{ className: "flex-1 flex-col" }}
          inputProps={{ className: "flex-1" }}
          multiline
          defaultValue={todo.content}
        />
        <Button type="submit" variant="contained">
          <span>&nbsp;</span>
          <span>{todo.id}번 할 일 수정&nbsp;</span>
          <span>
            <i className="fa-solid fa-pen"></i>
          </span>
        </Button>
      </form>
    </>
  );
}
