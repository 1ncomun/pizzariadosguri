export const pizzas = [
  {
    id: 'margherita',
    nome: 'Margherita',
    descricao: 'Clássica italiana com mussarela fresca, tomates e manjericão',
    preco: 8,
    ingredientes: ['Molho de Tomate', 'Mussarela', 'Manjericão Fresco', 'Azeite']
  },
  {
    id: 'pepperoni',
    nome: 'Pepperoni',
    descricao: 'Clássico americano com fatias de pepperoni e queijo derretido',
    preco: 10,
    ingredientes: ['Molho de Tomate', 'Mussarela', 'Pepperoni', 'Orégano']
  },
  {
    id: 'calabresa',
    nome: 'Calabresa',
    descricao: 'Linguiça calabresa com cebolas e pimentões',
    preco: 11,
    ingredientes: ['Molho de Tomate', 'Mussarela', 'Calabresa', 'Cebola', 'Pimentão']
  },
  {
    id: 'quatro-queijos',
    nome: 'Quatro Queijos',
    descricao: 'Mistura de mussarela, gorgonzola, parmesão e catupiry',
    preco: 12,
    ingredientes: ['Mussarela', 'Gorgonzola', 'Parmesão', 'Catupiry', 'Molho Branco']
  },
  {
    id: 'frango-catupiry',
    nome: 'Frango com Catupiry',
    descricao: 'Frango desfiado com catupiry cremoso - favorita dos brasileiros',
    preco: 13,
    ingredientes: ['Frango Desfiado', 'Catupiry', 'Milho', 'Orégano']
  },
  {
    id: 'portuguesa',
    nome: 'Portuguesa',
    descricao: 'Tradicional com presunto, ovos, cebola e azeitonas',
    preco: 11,
    ingredientes: ['Molho de Tomate', 'Mussarela', 'Presunto', 'Ovos', 'Cebola', 'Azeitonas']
  },
  {
    id: 'bbq-frango',
    nome: 'Frango BBQ',
    descricao: 'Frango grelhado com molho barbecue, cebola roxa e coentro',
    preco: 12,
    ingredientes: ['Molho BBQ', 'Mussarela', 'Frango Grelhado', 'Cebola Roxa', 'Coentro']
  },
  {
    id: 'vegetariana',
    nome: 'Vegetariana',
    descricao: 'Legumes frescos do jardim com cogumelos e azeitonas',
    preco: 10,
    ingredientes: ['Molho de Tomate', 'Mussarela', 'Cogumelos', 'Pimentão', 'Cebola', 'Azeitonas', 'Tomates']
  }
];

export const tamanhos = [
  {
    id: 'pequena',
    nome: 'Pequena',
    label: 'P',
    precoBase: 10,
    maxSabores: 2,
    descricao: 'Perfeita para uma pessoa'
  },
  {
    id: 'media',
    nome: 'Média',
    label: 'M',
    precoBase: 15,
    maxSabores: 3,
    descricao: 'Ideal para dividir com um amigo'
  },
  {
    id: 'grande',
    nome: 'Grande',
    label: 'G',
    precoBase: 20,
    maxSabores: 4,
    descricao: 'Perfeita para família e amigos'
  }
];

export const bebidas = [
  {
    id: 'coca-cola',
    nome: 'Coca-Cola',
    descricao: 'Refrigerante clássico e refrescante',
    preco: 3,
    volume: '350ml'
  },
  {
    id: 'sprite',
    nome: 'Sprite',
    descricao: 'Refrigerante de limão',
    preco: 3,
    volume: '350ml'
  },
  {
    id: 'fanta-laranja',
    nome: 'Fanta Laranja',
    descricao: 'Refrigerante sabor laranja',
    preco: 3,
    volume: '350ml'
  },
  {
    id: 'agua',
    nome: 'Água Mineral',
    descricao: 'Água sem gás refrescante',
    preco: 2,
    volume: '500ml'
  },
  {
    id: 'suco-laranja',
    nome: 'Suco de Laranja',
    descricao: 'Suco natural de laranja',
    preco: 4,
    volume: '300ml'
  }
];
