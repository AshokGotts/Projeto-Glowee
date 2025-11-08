# Projeto Glowee (PPADS)
```markdown
# 🛍️ Glowee - E-commerce de Dermocosméticos

## 📋 Sobre o Projeto
Glowee é uma plataforma de e-commerce especializada em dermocosméticos, desenvolvida em ASP.NET Core MVC 8.0. O sistema oferece funcionalidades completas de compras, gestão de produtos e painel administrativo.

## 🚀 Tecnologias Utilizadas
- **Backend**: ASP.NET Core 8.0 MVC
- **ORM**: Entity Framework Core
- **Database**: SQL Server
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Autenticação**: ASP.NET Core Identity

## 📥 Pré-requisitos
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express edition é suficiente)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) ou [Visual Studio Code](https://code.visualstudio.com/)

## 🛠️ Configuração e Execução

### 1. Clone o Repositório
```bash
git clone https://github.com/AshokGotts/Projeto-Glowee.git
cd Projeto-Glowee/Glowee
```

### 2. Configure a String de Conexão
No arquivo `appsettings.json`, atualize a string de conexão com seu SQL Server:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=GloweeDB;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

### 3. Execute as Migrations
No Terminal do NuGet Package Manager ou via CLI:

```bash
dotnet ef database update
```

### 4. Execute a Aplicação
```bash
dotnet run
```
Ou via Visual Studio:
- Pressione `F5` ou `Ctrl + F5`

### 5. Acesse a Aplicação
Abra o navegador e acesse: `https://localhost:7000` (porta pode variar)

## 👥 Contas de Teste

### Administrador
- **Email**: admin@glowee.com
- **Senha**: Admin123!

### Vendedor
- **Email**: vendedor@glowee.com
- **Senha**: Vendedor123!

### Cliente
- **Email**: cliente@glowee.com
- **Senha**: Cliente123!

*Ou crie uma nova conta através do formulário de registro*

## 📁 Estrutura do Projeto

```
Glowee/
├── Controllers/          # Controladores MVC
├── Models/              # Modelos de dados
├── Views/               # Views Razor
├── Data/                # Contexto do EF e Migrations
├── wwwroot/             # Arquivos estáticos
└── Services/            # Serviços de negócio
```

## 🧪 Funcionalidades Implementadas

### Para Clientes
- ✅ Cadastro e login de usuários
- ✅ Navegação em catálogo de produtos
- ✅ Carrinho de compras
- ✅ Processo de checkout
- ✅ Histórico de pedidos
- ✅ Gestão de endereços

### Para Vendedores
- ✅ Cadastro e gestão de produtos
- ✅ Acompanhamento de pedidos
- ✅ Atualização de status de pedidos

### Para Administradores
- ✅ Gestão completa de usuários
- ✅ Controle de produtos
- ✅ Visualização de todos os pedidos

## 🔧 Desenvolvimento

### Criando uma Nova Migration
```bash
dotnet ef migrations add NomeDaMigration
dotnet ef database update
```

### Executando Testes
```bash
dotnet test
```

## 📞 Suporte
Em caso de dúvidas ou problemas, entre em contato com a equipe de desenvolvimento através do repositório GitHub.

## 👨‍💻 Desenvolvedores
- Brenda Ribeiro Lacerda Tavares
- João Pedro da Cruz Gomes
- Lucas Francillano da Silva
- Sylvia Regina Pizato Marcondes Gottsfritz
- Tainá de Araujo do Nascimento

---
**Universidade Presbiteriana Mackenzie** - 2025
```

---
