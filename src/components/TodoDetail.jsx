/** @jsxImportSource @emotion/react */
// import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { css } from "@emotion/react";

export const TodoDetail = (props) => {
  const { todos } = props;
  const { index } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  // const [todos, setTodos] = useState([]);
  // setTodos(location.state.todos);
  const todo = todos[index];

  const onClickBack = () => {
    navigate("/");
  };

  return (
    <div css={containerStyle}>
      <p className="title">TODOの詳細</p>
      <ul>
        <li>id:{todo.id}</li>
        <li>content:{todo.content}</li>
      </ul>
      <button onClick={onClickBack}>戻る</button>
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
