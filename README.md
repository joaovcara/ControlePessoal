# Controle Pessoal de Receitas e Despesas

Este é um sistema de controle pessoal de receitas e despesas, desenvolvido para ajudar os usuários a manterem um acompanhamento preciso e organizado de suas finanças pessoais. O projeto é composto por uma aplicação frontend e uma API backend.

## Descrição do Projeto

O sistema permite ao usuário registrar suas receitas e despesas, categorizá-las e visualizar relatórios de forma simples e intuitiva. A aplicação tem como objetivo proporcionar um controle fácil e eficiente das finanças pessoais, oferecendo uma visão clara do saldo e do histórico de transações.

<img alt="CSharp" src="https://github.com/joaovcara/ControlePessoal/blob/main/image/project/web-login.png?raw=true" height="auto"/>
<img alt="CSharp" src="https://github.com/joaovcara/ControlePessoal/blob/main/image/project/web-dashboard.png?raw=true" height="auto"/>
<img alt="CSharp" src="https://github.com/joaovcara/ControlePessoal/blob/main/image/project/web-categoria.png?raw=true" height="auto"/>
<img alt="CSharp" src="https://github.com/joaovcara/ControlePessoal/blob/main/image/project/web-despesa.png?raw=true" height="auto"/>

### Funcionalidades principais:
- Registro de receitas e despesas.
- Visualização de registros por categorias.
- Geração de relatórios gráficos e tabelas.
- Acompanhamento do saldo e histórico de transações.
- Responsividade para uso em dispositivos móveis e desktop.

## Stacks
### Backend:
<img alt="CSharp" src="https://github.com/joaovcara/ControlePessoal/blob/main/image/project/csharp.png?raw=true" height="85px"/>  **.NET 8.0**: Framework utilizado para criar a API RESTful.

<img alt="sql" src="https://github.com/joaovcara/ControlePessoal/blob/main/image/project/sql.png?raw=true" height="85px"/>  **SQL Server**: Banco de dados utilizado para armazenar as informações do usuário, receitas e despesas.

### Frontend:
<img alt="react" src="https://github.com/joaovcara/ControlePessoal/blob/main/image/project/react.png?raw=true" height="85px"/>  **React**: Biblioteca JavaScript para construir interfaces de usuário dinâmicas.

<img alt="antd" src="https://github.com/joaovcara/ControlePessoal/blob/main/image/project/antd.png?raw=true" height="85px"/>  **Ant Design**: Biblioteca de componentes React para criar interfaces de usuário modernas e responsivas.

### Ferramentas e tecnologias adicionais:
- **Axios**: Para realizar requisições HTTP entre o frontend e o backend.
- **React Router**: Para navegação entre as diferentes páginas da aplicação.
- **Chart.js**: Biblioteca para exibição de gráficos de receitas e despesas.

## Como Executar o Projeto

### Pré-requisitos:
- .NET 8.0
- Node.js
- SQL Server

### Passos para execução:
1. Clone o repositório:
   ```bash
   git clone https://github.com/joaovcara/ControlePessoal.git
2. Navegue até a pasta do backend
   ```bash
   cd ControlePessoal/api
3. Restaure as dependências e execute a API:
   ```bash
   dotnet restore
   dotnet run
4. Navegue até a pasta do frontend:
   ```bash
   cd ../client
5. Instale as dependências e execute a aplicação:
   ```bash
   npm install
   npm start

