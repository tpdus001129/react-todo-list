import { Chip, Button } from "@mui/material";
import classNames from "classnames";
import { TodoListItemType } from "../common/type";

export default function TodoListItem({
  onCompletedBtnClicked,
  todo,
  index,
  openDrawer,
}: TodoListItemType) {
  return (
    <>
      <li key={todo.id} className="mt-6 sm:mt-10">
        <div className="flex gap-2">
          <Chip label={`번호 : ${todo.id}`} variant="outlined" className="!pt-1" />
          <Chip
            label={todo.performDate.substr(0, 16)} // 날짜 & 시간 조정
            color="primary"
            variant="outlined"
            className="!pt-1"
          />
        </div>
        <div className="mt-2 sm:mt-4 shadow rounded-[20px] flex">
          <Button
            className="flex-shrink-0 !items-start !rounded-[20px_0_0_20px]"
            color="inherit"
            onClick={() => onCompletedBtnClicked(todo.id)}
          >
            <span
              className={classNames(
                "text-4xl",
                "h-[80px]",
                "flex items-center",
                {
                  "text-primary": todo.completed,
                },
                { "text-whiteColor": !todo.completed }
              )}
            >
              <i className="fa-solid fa-check"></i>
            </span>
          </Button>
          <div className="flex-shrink-0 my-5 w-[2px] bg-whiteColor mr-4"></div>
          <div className="whitespace-pre-wrap leading-relaxed hover:text-primary flex-grow flex items-center my-5">
            {todo.content}
          </div>
          <Button
            onClick={() => openDrawer(todo.id)}
            className="flex-shrink-0 !items-start !rounded-[0_20px_20px_0]"
            color="inherit"
          >
            <span className="text-[#dcdcdc] text-2xl h-[80px] flex items-center">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
          </Button>
        </div>
      </li>
    </>
  );
}
