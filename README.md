
# Lista de Postagens em React

Este é um aplicativo simples para exibição de um feed de postagens e comentários, desenvolvido em React. Permite aos usuários criar novas postagens, adicionar comentários às postagens existentes, excluir postagens e comentários, e visualizar ou ocultar os comentários de uma postagem.

## Dependências

Este projeto foi desenvolvido utilizando as seguintes dependências (no arquivo `package.json` tem todas dependências presentes no projeto, mesmo em versões anteriores):

- `json-server`
- `styled-components`
- `FontAwesomeIcon`

Os ícones das modais são fornecidos pela biblioteca `FontAwesomeIcon`.

## Uso da API

Este aplicativo utiliza a API Json Placeholder para obter dados simulados de postagens e comentários. Você pode encontrar mais informações e documentação sobre a API em [Json Placeholder](https://jsonplaceholder.typicode.com/).

## Como Utilizar

Para utilizar este projeto em sua máquina local, siga estas etapas:

1. Clone este repositório para sua máquina local usando o seguinte comando:

   ```
   git clone https://github.com/seu-usuario/lista-de-postagens-React.git
   ```

2. Navegue até o diretório do projeto:

   ```
   cd lista-de-postagens-React
   ```

3. Instale as dependências necessárias utilizando o Yarn:

   ```
   yarn install
   ```

4. Após a instalação das dependências, inicie o servidor de desenvolvimento:

   ```
   yarn start
   ```

5. Abra seu navegador e acesse http://localhost:3000 para visualizar o aplicativo.


## Uso do useState e useEffect

O `useState` é um hook do React que permite adicionar estado a componentes funcionais. Ele retorna um par de valores: o estado atual e uma função para atualizar esse estado. No projeto, o `useState` é usado para gerenciar o estado das variáveis ​​que armazenam os dados das postagens, comentários e outros elementos do aplicativo.

O `useEffect` é outro hook do React que permite realizar efeitos colaterais em componentes funcionais. Ele é usado para realizar operações secundárias após a renderização do componente, como buscar dados de uma API. No projeto, o `useEffect` é utilizado para buscar os dados das postagens e comentários da API Json Placeholder assim que o componente é montado.
