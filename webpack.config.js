//  a / (barra) no windows troca para \\, por isso do import do PATH
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefrashWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// a const isDevelopmento verifica se estou em ambiente de desenvolvimento (process.env e uma variavel ambiente)
const isDevelopment = process.env.NODE_ENV !== "production";
module.exports = {
  // no mode, faz um if, se eu estiver em ambiente de desenvolvimento (isDevelipment), o mode roda  development, caso contrario, roda em production
  mode: isDevelopment ? "development" : "production",
  // da mesma forma que foi feito a condição no mode, em devtool tambem é feito esse if
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  //    entrey: qual o arquivo principal da aplicação
  //    path.resolve resolve o problema da / (barra)
  //    __dirname pega o arquivo onde está (literalmente, ESTA DAQUI) a instruçõo
  //    com o __dirname, instruo para que va para a pasta src (ela esta dentro da mesma pasta que esse arquivo), e em vez de colocar a / (barra), coloca a virgula
  entry: path.resolve(__dirname, "src", "index.tsx"),
  //output tem a instruçõo de onde o arquivo deve sair, o PATH é o caminho/pastas, e o filename é o nome do arquivo
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  //    por padrao, webpack lê JS, mas caso tenha que add uma extensao, é presico passar essa instruçõo, e nesse caso, preciso passar a instruçõo para ler JSX
  resolve: {
    extensions: [".js", ".jsx", ".ts", "tsx"],
  },
  // devServer (webpack-dev-server) fica assistindo as alterações e muda elas em tempo real, e com o directory, indico onde está o conteúdo estático
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: true,
  },
  // lista de plugins
  plugins: [
    isDevelopment && new ReactRefrashWebpackPlugin(),
    // html-webpack-plugin redenriza o HTML dentro da pasta PUBLIC, já com a tag script referenciando o bundle.js
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),
  // filter(Boolean) vai remover o false da condicional

  //   com module, posso instuir como deve trabalhar com cada tipo de arquivo
  module: {
    //   rules é uma array de regras
    rules: [
      //    cada objeto, é um tipo de arquivo
      {
        //   regra do arquivo jsx
        //   test verifica se o arquivo é JSX ou nao
        //   o arquivo deve terminar com .jsxÇ o $ é onde ele deve terminar
        test: /\.(j|t)sx$/,
        //   exclude: exluir todos os arquivos que estao dentro da pasta node_modules
        exclude: /node_modules/,
        //   e nessa regra, é utilizada o babel-loader, lib que faz a integração do babel com o webpack (CONVERTER O JSX PARA O BUNDLE.JS)
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      // regra do arquivo css
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        // quando for dois loaders se utiliza array
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
