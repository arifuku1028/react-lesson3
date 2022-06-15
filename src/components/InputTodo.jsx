/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DayPick } from "./DayPick";

export const InputTodo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [todoTitle, setTodoTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  // TODO入力時の処理
  const onChangeTodoTitle = (event) => setTodoTitle(event.target.value);

  // '追加'ボタンの処理
  const onClickAdd = () => {
    if (todoTitle === "") return;
    const newTodo = {
      content: todoTitle,
      deadline,
    };
    const newTodos = [...state.incompleteTodos, newTodo];
    navigate("/", {
      state: {
        incompleteTodos: newTodos,
        completeTodos: state.completeTodos,
      },
    });
    setTodoTitle("");
  };

  // '戻る'ボタンの処理
  const onClickBack = () => {
    navigate("/", {
      state: {
        incompleteTodos: state.incompleteTodos,
        completeTodos: state.completeTodos,
      },
    });
  };

  return (
    <>
      <div css={containerStyle}>
        <p className="title">TODOを作成</p>
        <ul>
          <li>
            <p css={itemTitleStyle}>TODO名</p>

            <input
              placeholder="TODOを入力"
              value={todoTitle}
              onChange={onChangeTodoTitle}
            />
          </li>
          <li>
            <p css={itemTitleStyle}>TODO期限</p>
            <DayPick deadline={deadline} setDeadline={setDeadline} />
          </li>
        </ul>
        <button css={buttonStyle} onClick={onClickBack}>
          一覧へ戻る
        </button>
        <button css={buttonStyle} onClick={onClickAdd}>
          追加
        </button>
      </div>
    </>
  );
};

const containerStyle = css`
  background-color: #c1ffff;
  width: 400px;
  min-height: 195px;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
`;

const itemTitleStyle = css`
  font-size: 13px;
  margin: 0;
`;

const buttonStyle = css`
  margin: 3px 5px 0 0;
`;
