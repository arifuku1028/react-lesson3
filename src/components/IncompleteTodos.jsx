/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  const navigate = useNavigate();
  const onClickDetail = (index) => {
    navigate(`/${index}`, { state: todos });
  };

  return (
    <div css={containerStyle}>
      <p className="title">未完了のTODO</p>
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
