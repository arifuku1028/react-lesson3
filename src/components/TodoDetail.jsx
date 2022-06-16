/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { DayPick } from "./DayPick";
import toast, { Toaster } from "react-hot-toast";

export const TodoDetail = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const incompleteTodos = state ? state.incompleteTodos : [];
  const completeTodos = state ? state.completeTodos : [];

  const { list_name, index } = useParams();
  const isComplete = list_name === "completes";
  const todo = isComplete
    ? state.completeTodos[index]
    : state.incompleteTodos[index];

  const [todoName, setTodoName] = useState(todo.name);
  const [todoLimit, setTodoLimit] = useState(todo.limit);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditLimit, setEditLimit] = useState(false);

  const onChangeTodoName = (event) => setTodoName(event.target.value);

  const onClickEditName = () => {
    if (isEditName) {
      if (todoName === "") {
        if (todoName === "") {
          toast.error("TODO名を入力してください。");
          return;
        }
      }
      if (todo.name !== todoName) {
        todo.name = todoName;
        toast.success("TODO名を更新しました。");
      }
      setIsEditName(false);
    } else {
      setIsEditName(true);
    }
  };

  const onClickEditLimit = () => {
    if (isEditLimit) {
      if (todo.limit !== todoLimit) {
        todo.limit = todoLimit;
        toast.success("TODOの期限を更新しました。");
      }
      setEditLimit(false);
    } else {
      setEditLimit(true);
    }
  };

  const onClickBack = () => {
    navigate("../", {
      state: {
        incompleteTodos,
        completeTodos,
      },
    });
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div css={isComplete ? completeContainerStyle : incompleteContainerStyle}>
        <p className="title">TODOの詳細</p>
        <ul>
          <li>
            TODO名:
            <br />
            {isEditName ? (
              <>
                <input value={todoName} onChange={onChangeTodoName} />
                <button onClick={onClickEditName}>確定</button>
              </>
            ) : (
              <>
                {todoName}
                <button onClick={onClickEditName}>編集</button>
              </>
            )}
          </li>
          <li>
            TODOの期限:
            <br />
            {isEditLimit ? (
              <>
                <DayPick dateString={todoLimit} setDateString={setTodoLimit} />
                <button onClick={onClickEditLimit}>確定</button>
              </>
            ) : (
              <>
                {todo.limit ? todo.limit : <>期限なし</>}
                <button onClick={onClickEditLimit}>編集</button>
              </>
            )}
          </li>
        </ul>
        <button onClick={onClickBack}>戻る</button>
      </div>
    </>
  );
};

const incompleteContainerStyle = css`
  background-color: #c6ffe2;
  width: 400px;
  min-height: 200px;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
`;

const completeContainerStyle = css`
  background-color: #ffffe0;
  width: 400px;
  min-height: 200px;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
`;
