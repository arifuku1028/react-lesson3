import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { IncompleteTodos } from "./IncompleteTodos";
import { CompleteTodos } from "./CompleteTodos";

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

  const onClickDetail = (index) => {
    navigate(`./${index}`, {
      state: {
        incompleteTodos,
        completeTodos,
      },
    });
  };

  const onClickBackToMenu = () => {
    navigate("/", {
      state: {
        incompleteTodos,
        completeTodos,
      },
    });
  };

  const isComplete = list_name === "completes";

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
  };

  const onClickReturn = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    const newIncompeleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompeleteTodos);
  };

  const onClickDelete = (index) => {
    if (isComplete) {
      const newTodos = [...CompleteTodos];
      newTodos.splice(index, 1);
      setIncompleteTodos(newTodos);
    } else {
      const newTodos = [...IncompleteTodos];
      newTodos.splice(index, 1);
      setIncompleteTodos(newTodos);
    }
  };

  return (
    <>
      {isComplete ? (
        <CompleteTodos
          todos={completeTodos}
          onClickDetail={onClickDetail}
          onClickReturn={onClickReturn}
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
