import { RepositoryItem } from "./RepositoryItem";
import "../styles/repositories.scss";
import { useEffect, useState } from "react";
const repository = {
  name: "unform",
  description: "Forms in ReactJS",
  link: "https://github.com/unform/unform",
};
export function RepositoryList() {
  // quando comeca um state com uma lista vazia, entao passa um array vazio, cochetes vazios
  const [repositories, setRepositores] = useState([]);
  // useEffect dispara uma função quando algo acontece na aplicação. O algo pode ser uma variavel mudar. Se ela mudar, posso querer avisar uma API que ela mudou, ou disparar uma função.
  // useEffect recebe dois parametros, o primeiro deles é qual função eu quero executar () => {}.
  // O segundo parametro, é quando quero quando a primeira funcao ocorra []. Passamos um array de depedencias, useEffect rodar a funcao
  useEffect(() => {
    fetch("https://api.github.com/users/filipesalesaraujo/repos")
      .then((response) => response.json())
      .then((data) => setRepositores(data));
  }, []);
  console.log(repositories)
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
      </ul>
    </section>
  );
}
