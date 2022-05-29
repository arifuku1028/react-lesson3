/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const InputTodo = (props) => {
  const { todoText, onChange, onClick, disabled } = props;

  return (
    <div css={containerStyle}>
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
      />
      <button disabled={disabled} onClick={onClick}>
        追加
      </button>
    </div>
  );
};

const containerStyle = css`
  background-color: #c1ffff;
  width: 400px;
  height: 30px;
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
`;
