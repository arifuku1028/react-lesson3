/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const IncompleteTodos = (props) => {
  const {
    todos,
    onClickDetail,
    onClickComplete,
    onClickDelete,
    onClickBackToMenu,
  } = props;

  return (
    <div css={containerStyle} className="complete-area">
      <p className="title">未完了のTOOD</p>
      <ul>
        {todos.map((todo, index) => {
          return (
            <div key={index} className="list-row">
              <li>{todo.content}</li>
              <button onClick={() => onClickDetail(index)}>詳細</button>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          );
        })}
      </ul>
      <button onClick={onClickBackToMenu}>メニューに戻る</button>
    </div>
  );
};

const containerStyle = css`
  background-color: #c6ffe2;
  width: 400px;
  min-height: 200px;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
`;
