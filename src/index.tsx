// import da função render serve para rederizar o html dentro do .js
import { render } from "react-dom";

// não precisa colocar a extensão .jsx quando importa um .jsx, pois no webpack.config.js, tem o resolve: { extensions: [".js", ".jsx"], },
import { App } from "./App";

// funcao que coloca o html dentro do js
render(<App />, document.getElementById("root"));
