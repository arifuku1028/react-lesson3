import { Route, Routes } from "react-router-dom";
import { IncompleteTodos } from "../components/IncompleteTodos";
import { TodoDetail } from "../components/TodoDetail";

export const Router = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;

  return (
    <Routes>
      <Route
        exact
        path=""
        element={
          <IncompleteTodos
            todos={todos}
            onClickComplete={onClickComplete}
            onClickDelete={onClickDelete}
          />
        }
      ></Route>
      <Route exact path=":index" element={<TodoDetail todos={todos} />}></Route>
    </Routes>
  );
};
