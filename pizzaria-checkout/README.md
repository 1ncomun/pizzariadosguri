# 🍕 PizzaVibe - Sistema de Pedidos Online

Sistema completo de pizzaria com cardápio online, carrinho de compras e integração com Stripe para pagamentos.

## 📁 Estrutura do Projeto

```
pizzaria-checkout/
├── frontend/          # Aplicação React + TypeScript + Tailwind
│   ├── src/
│   │   ├── data/     # Dados do cardápio
│   │   ├── App.tsx   # Componente principal
│   │   └── ...
│   └── package.json
├── backend/           # API Node.js + Express + Stripe
│   ├── server.js     # Servidor principal
│   ├── package.json
│   └── .env.example  # Exemplo de variáveis de ambiente
└── README.md
```

## 🚀 Funcionalidades

### Frontend
- ✅ Cardápio completo com 8 sabores de pizza
- ✅ 3 tamanhos de pizza (P, M, G) com limites de sabores (2, 3, 4)
- ✅ Seção de bebidas com 5 opções
- ✅ Carrinho de compras com persistência
- ✅ Fluxo de checkout completo com formulário de endereço
- ✅ Integração com Stripe para pagamentos
- ✅ Página de confirmação de pedido
- ✅ Design responsivo e animações suaves
- ✅ Totalmente em português

### Backend
- ✅ API RESTful
- ✅ Integração completa com Stripe
- ✅ Criação de sessões de checkout
- ✅ Webhooks para confirmação de pagamento
- ✅ CORS habilitado

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- Conta no Stripe (para processar pagamentos)

### 1. Configurar o Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Editar .env com suas chaves do Stripe
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta
STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publica
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret
PORT=3001
```

**Como obter as chaves do Stripe:**
1. Crie uma conta em [stripe.com](https://stripe.com)
2. Vá para Developers > API Keys
3. Copie a Secret Key (modo teste: `sk_test_...`)
4. Para webhooks, configure um endpoint em Developers > Webhooks

```bash
# Iniciar servidor
npm start
# ou para desenvolvimento
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

### 2. Configurar o Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Instalar dependências adicionais
npm install lucide-react

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 💳 Configuração do Stripe

### Modo de Teste

O projeto já vem configurado para usar o Stripe em modo de teste. Você pode usar os seguintes dados de cartão para testar:

| Dado | Valor |
|------|-------|
| Número do cartão | `4242 4242 4242 4242` |
| Data de validade | Qualquer data futura |
| CVC | Qualquer número de 3 dígitos |
| CEP | Qualquer CEP válido |

### Webhooks (Opcional)

Para receber notificações de pagamento em tempo real:

1. Instale o Stripe CLI: `npm install -g stripe`
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3001/api/webhook`
4. Copie o webhook signing secret para o `.env`

## 🌐 Deploy

### Backend (Render/Railway/Heroku)

1. Faça push do código para o GitHub
2. Conecte seu repositório na plataforma
3. Configure as variáveis de ambiente
4. Deploy!

### Frontend (Vercel/Netlify)

1. Conecte seu repositório
2. Configure o diretório como `frontend`
3. Build command: `npm run build`
4. Deploy!

**Importante:** Atualize a URL do backend no frontend antes do deploy.

## 📋 Cardápio

### Pizzas (8 sabores)
- Margherita - R$ 8,00
- Pepperoni - R$ 10,00
- Calabresa - R$ 11,00
- Quatro Queijos - R$ 12,00
- Frango com Catupiry - R$ 13,00
- Portuguesa - R$ 11,00
- Frango BBQ - R$ 12,00
- Vegetariana - R$ 10,00

### Tamanhos
- Pequena (P) - R$ 10,00 base - Até 2 sabores
- Média (M) - R$ 15,00 base - Até 3 sabores
- Grande (G) - R$ 20,00 base - Até 4 sabores

### Bebidas
- Coca-Cola 350ml - R$ 3,00
- Sprite 350ml - R$ 3,00
- Fanta Laranja 350ml - R$ 3,00
- Água Mineral 500ml - R$ 2,00
- Suco de Laranja 300ml - R$ 4,00

## 🔧 Personalização

### Adicionar novos sabores
Edite o arquivo `frontend/src/data/cardapio.ts`:

```typescript
export const pizzas: Pizza[] = [
  {
    id: 'novo-sabor',
    nome: 'Novo Sabor',
    descricao: 'Descrição da pizza',
    preco: 15,
    ingredientes: ['Ingrediente 1', 'Ingrediente 2']
  },
  // ... outras pizzas
];
```

### Alterar preços dos tamanhos
Edite o arquivo `frontend/src/data/cardapio.ts`:

```typescript
export const tamanhos: Tamanho[] = [
  {
    id: 'pequena',
    nome: 'Pequena',
    label: 'P',
    precoBase: 12,  // Altere aqui
    maxSabores: 2,
    descricao: 'Perfeita para uma pessoa'
  },
  // ... outros tamanhos
];
```

## 📱 Screenshots

*(Adicione screenshots do app aqui)*

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Criado com ❤️ para pizzarias que querem vender online!

---

**Dúvidas?** Abra uma issue ou entre em contato!
