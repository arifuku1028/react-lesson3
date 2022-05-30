import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { InputTodo } from "./components/InputTodo";
// import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // TODO入力時の処理
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // '追加'ボタンの処理
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = {
      id: Date.now(),
      content: todoText,
    };
    const newTodos = [...incompleteTodos, newTodo];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // '完了'ボタンの処理
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1); // 配列のindex番目から1個の要素を削除

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // '削除'ボタンの処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // '戻す'ボタンの処理
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <BrowserRouter>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるTODOは5個までです!消化してください！
        </p>
      )}
      <Router
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      ></Router>
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </BrowserRouter>
  );
};
