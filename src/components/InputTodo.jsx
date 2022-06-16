/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DayPick } from "./DayPick";
import toast, { Toaster } from "react-hot-toast";

export const InputTodo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [todoName, setTodoName] = useState("");
  const [todoLimit, setTodoLimit] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(
    state ? state.incompleteTodos : []
  );

  // TODO入力時の処理
  const onChangeTodoName = (event) => setTodoName(event.target.value);

  // '追加'ボタンの処理
  const onClickAdd = () => {
    if (incompleteTodos.length >= 5) {
      toast.error("登録できるTODOは5個までです!");
      toast("まずはTODOを消化しましょう！");
      return;
    }
    if (todoName === "") {
      toast.error("TODO名を入力してください");
      return;
    }

    const newTodo = {
      name: todoName,
      limit: todoLimit,
    };
    setIncompleteTodos([...incompleteTodos, newTodo]);
    setTodoName("");
    setTodoLimit("");
    toast.success(`新しいTODO "${newTodo.name}" を追加しました`);
  };

  // '戻る'ボタンの処理
  const onClickBack = () => {
    navigate("/", {
      state: {
        incompleteTodos,
        completeTodos: state.completeTodos,
      },
    });
  };

  return (
    <>
      <div>
        <Toaster reverseOrder={true} />
      </div>
      <div css={containerStyle}>
        <p className="title">TODOを作成</p>
        <ul>
          <li>
            <p css={itemNameStyle}>TODO名</p>

            <input
              placeholder="TODOを入力"
              value={todoName}
              onChange={onChangeTodoName}
            />
          </li>
          <li>
            <p css={itemNameStyle}>TODO期限</p>
            <DayPick dateString={todoLimit} setDateString={setTodoLimit} />
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

const itemNameStyle = css`
  font-size: 13px;
  margin: 0;
`;

const buttonStyle = css`
  margin: 3px 5px 0 0;
`;
