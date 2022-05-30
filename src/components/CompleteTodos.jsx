/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const CompleteTodos = (props) => {
  const { todos, onClickBack } = props;

  return (
    <div css={containerStyle} className="complete-area">
      <p className="title">完了のTOOD</p>
      <ul>
        {todos.map((todo, index) => {
          return (
            <div key="{index}" className="list-row">
              <li>{todo.content}</li>
              <button onClick={() => onClickBack(index)}>戻す</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

const containerStyle = css`
  background-color: #ffffe0;
  width: 400px;
  min-height: 200px;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
`;
