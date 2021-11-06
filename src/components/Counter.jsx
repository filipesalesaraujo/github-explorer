import { useState } from "react";
export function Counter() {
  const [counter, setCounter] = useState(0);
  // useState armazena
  // counter é o state que armazena a variavel
  // setCounter agenda uma atualização para o objeto state (counter) de um componente. Quando o state muda, o componente responde renderizando novamente.
  function increment() {
    setCounter(counter + 1);
  }
  return (
    <div>
      <h2>{counter}</h2>
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
}
