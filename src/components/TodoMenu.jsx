/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const TodoMenu = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [incompleteTodos, setIncompleteTodos] = useState(
    state ? state.incompleteTodos : []
  );
  const [completeTodos, setCompleteTodos] = useState(
    state ? state.completeTodos : []
  );

  const navigateTo = (dest) => {
    navigate(`./${dest}`, {
      state: {
        incompleteTodos,
        completeTodos,
      },
    });
  };
  const onClickCreate = () => {
    if (incompleteTodos.length >= 5) {
      alert("登録できるTODOは5個までです!消化してください！");
      return;
    }
    navigateTo("new");
  };

  const onClickIncompleteTodos = () => {
    navigateTo("incompletes");
  };

  const onClickCompleteTodos = () => {
    navigateTo("completes");
  };

  return (
    <>
      <div css={containerStyle}>
        <button onClick={onClickCreate}>TODOを作成</button>
        <button onClick={onClickIncompleteTodos}>未完了のTODO</button>
        <button onClick={onClickCompleteTodos}>完了したTODO</button>
      </div>
      {/* <div css={inconmpleteContainerStyle}>
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={index} className="list-row">
                <li>{todo.content}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDetail(todo.id)}>詳細</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div css={completeContainerStyle}>
        <p className="title">完了したTOOD</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={index} className="list-row">
                <li>{todo.content}</li>
                <button onClick={() => onClickReturn(index)}>戻す</button>
                <button onClick={() => onClickDetail(todo.id)}>詳細</button>
              </div>
            );
          })}
        </ul>
      </div> */}
    </>
  );
};

const containerStyle = css`
  background-color: #c1ffff;
  width: 400px;
  min-height: 30px;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
  display: flex;
  flex-flow: column;
  align-items: center;

  > button {
    display: inline-block;
    width: 125px;
    margin: 3px 0;
  }
`;

// const inconmpleteContainerStyle = css`
//   background-color: #c6ffe2;
//   width: 400px;
//   min-height: 200px;
//   padding: 8px;
//   margin: 8px;
//   border-radius: 8px;
// `;

// const completeContainerStyle = css`
//   background-color: #ffffe0;
//   width: 400px;
//   min-height: 200px;
//   padding: 8px;
//   margin: 8px;
//   border-radius: 8px;
// `;
