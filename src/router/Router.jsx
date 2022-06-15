import { Route, Routes } from "react-router-dom";
import { TodoMenu } from "../components/TodoMenu";
import { InputTodo } from "../components/InputTodo";
import { TodoList } from "../components/TodoList";
import { TodoDetail } from "../components/TodoDetail";

export const Router = () => {
  return (
    <Routes>
      <Route path="" element={<TodoMenu />} />
      <Route path="new" element={<InputTodo />} />
      <Route path=":list_name">
        <Route path="" element={<TodoList />} />
        <Route path=":index" element={<TodoDetail />} />
      </Route>
    </Routes>
  );
};
