/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const TodoMenu = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const incompleteTodos = state ? state.incompleteTodos : [];
  const completeTodos = state ? state.completeTodos : [];

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
      toast.error("登録できるTODOは5個までです!");
      toast("まずはTODOを消化しましょう！");
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
      <div>
        <Toaster reverseOrder={true} />
      </div>
      <div css={containerStyle}>
        <button onClick={onClickCreate}>TODOを作成</button>
        <button onClick={onClickIncompleteTodos}>未完了のTODO</button>
        <button onClick={onClickCompleteTodos}>完了したTODO</button>
      </div>
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
