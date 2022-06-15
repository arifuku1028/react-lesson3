/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { DayPick } from "./DayPick";

export const TodoDetail = () => {
  const navigate = useNavigate();

  const { list_name, index } = useParams();
  const isComplete = list_name === "completes";

  const { state } = useLocation();
  const incompleteTodos = state ? state.incompleteTodos : [];
  const completeTodos = state ? state.completeTodos : [];

  const todo = isComplete
    ? state.completeTodos[index]
    : state.incompleteTodos[index];

  const [todoContent, setTodoContent] = useState(todo.content);
  const onChangeTodoContent = (event) => setTodoContent(event.target.value);

  const [todoDeadline, setTodoDeadline] = useState(todo.deadline);

  const [isEditContent, setIsEditContent] = useState(false);
  const onClickEditContent = () => {
    if (isEditContent) {
      todo.content = todoContent;
      setIsEditContent(false);
    } else {
      setIsEditContent(true);
    }
  };

  const [isEditDeadline, setIsEditDeadline] = useState(false);
  const onClickEditDeadline = () => {
    if (isEditDeadline) {
      todo.deadline = todoDeadline;
      setIsEditDeadline(false);
    } else {
      setIsEditDeadline(true);
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
    <div css={isComplete ? completeContainerStyle : incompleteContainerStyle}>
      <p className="title">TODOの詳細</p>
      <ul>
        <li>
          TODOの内容:
          <br />
          {isEditContent ? (
            <>
              <input value={todoContent} onChange={onChangeTodoContent} />
              <button onClick={onClickEditContent}>更新</button>
            </>
          ) : (
            <>
              {todoContent}
              <button onClick={onClickEditContent}>編集</button>
            </>
          )}
        </li>
        <li>
          TODOの期限:
          <br />
          {isEditDeadline ? (
            <>
              <DayPick deadline={todoDeadline} setDeadline={setTodoDeadline} />
              <button onClick={onClickEditDeadline}>更新</button>
            </>
          ) : (
            <>
              {todo.deadline ? todo.deadline : <>期限なし</>}
              <button onClick={onClickEditDeadline}>編集</button>
            </>
          )}
        </li>
      </ul>
      <button onClick={onClickBack}>戻る</button>
    </div>
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
