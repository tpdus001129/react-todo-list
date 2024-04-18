import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function TodosEmpty() {
  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <div className="grid gap-4">
          <span>
            <span className="text-primary">할 일</span>을 입력해주세요.
          </span>

          <Button variant="contained" to="/write" component={NavLink}>
            할 일 추가하기
          </Button>
        </div>
      </div>
    </>
  );
}
