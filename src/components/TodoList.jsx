import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { IncompleteTodos } from "./IncompleteTodos";
import { CompleteTodos } from "./CompleteTodos";
import toast, { Toaster } from "react-hot-toast";

export const TodoList = () => {
  const navigate = useNavigate();
  const { list_name } = useParams();
  const { state } = useLocation();
  const [incompleteTodos, setIncompleteTodos] = useState(
    state ? state.incompleteTodos : []
  );
  const [completeTodos, setCompleteTodos] = useState(
    state ? state.completeTodos : []
  );
  const isComplete = list_name === "completes";

  const onClickDetail = (index) => {
    navigate(`./${index}`, {
      state: {
        incompleteTodos,
        completeTodos,
      },
    });
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
    toast.success(
      `TODO "${incompleteTodos[index].name}" を「完了したTODO」に移動しました`
    );
  };

  const onClickReturnToIncompletes = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    const newIncompeleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompeleteTodos);
    toast.success(
      `TODO "${completeTodos[index].name}" を「未完了のTODO」に戻しました`
    );
  };

  const onClickDelete = (index, todos) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    if (isComplete) {
      setCompleteTodos(newTodos);
    } else {
      setIncompleteTodos(newTodos);
    }
    toast.success(`TODO "${todos[index].name}" を削除しました`);
  };

  const onClickBackToMenu = () => {
    navigate("/", {
      state: {
        incompleteTodos,
        completeTodos,
      },
    });
  };

  return (
    <>
      <div>
        <Toaster reverseOrder={true} />
      </div>
      {isComplete ? (
        <CompleteTodos
          todos={completeTodos}
          onClickDetail={onClickDetail}
          onClickReturn={onClickReturnToIncompletes}
          onClickDelete={onClickDelete}
          onClickBackToMenu={onClickBackToMenu}
        />
      ) : (
        <IncompleteTodos
          todos={incompleteTodos}
          onClickDetail={onClickDetail}
          onClickComplete={onClickComplete}
          onClickDelete={onClickDelete}
          onClickBackToMenu={onClickBackToMenu}
        />
      )}
    </>
  );
};
