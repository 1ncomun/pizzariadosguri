require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Payment, Preference } = require('mercadopago');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

// Configuração do Mercado Pago
const mpConfig = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || 'TEST-0000000000000000-000000-00000000000000000000000000000000-000000000'
});

const paymentClient = new Payment(mpConfig);
const preferenceClient = new Preference(mpConfig);

// Middleware
app.use(cors());
app.use(express.json());
const supabase = require('./supabase');

app.get('/teste', async (req, res) => {
  const { data, error } = await supabase
    .from('pedidos')
    .select('*');

  if (error) {
    console.error(error);
    return res.status(500).json({ error });
  }

  res.json(data);

});
app.get('/criar-pedido-teste', async (req, res) => {
  const { data, error } = await supabase
    .from('pedidos')
    .insert([
      {
        nome_cliente: 'Igor',
        telefone: '999999999',
        total: 59.90,
        status: 'pendente'
      }
    ])
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json({ error });
  }

  res.json(data);
});


// Armazenamento em memória dos pedidos (em produção, use banco de dados)
const pedidos = new Map();

// Dados do cardápio
const cardapio = {
  pizzas: [
    { id: 'margherita', nome: 'Margherita', descricao: 'Clássica italiana com mussarela fresca, tomates e manjericão', preco: 8, ingredientes: ['Molho de Tomate', 'Mussarela', 'Manjericão Fresco', 'Azeite'] },
    { id: 'pepperoni', nome: 'Pepperoni', descricao: 'Clássico americano com fatias de pepperoni e queijo derretido', preco: 10, ingredientes: ['Molho de Tomate', 'Mussarela', 'Pepperoni', 'Orégano'] },
    { id: 'calabresa', nome: 'Calabresa', descricao: 'Linguiça calabresa com cebolas e pimentões', preco: 11, ingredientes: ['Molho de Tomate', 'Mussarela', 'Calabresa', 'Cebola', 'Pimentão'] },
    { id: 'quatro-queijos', nome: 'Quatro Queijos', descricao: 'Mistura de mussarela, gorgonzola, parmesão e catupiry', preco: 12, ingredientes: ['Mussarela', 'Gorgonzola', 'Parmesão', 'Catupiry', 'Molho Branco'] },
    { id: 'frango-catupiry', nome: 'Frango com Catupiry', descricao: 'Frango desfiado com catupiry cremoso - favorita dos brasileiros', preco: 13, ingredientes: ['Frango Desfiado', 'Catupiry', 'Milho', 'Orégano'] },
    { id: 'portuguesa', nome: 'Portuguesa', descricao: 'Tradicional com presunto, ovos, cebola e azeitonas', preco: 11, ingredientes: ['Molho de Tomate', 'Mussarela', 'Presunto', 'Ovos', 'Cebola', 'Azeitonas'] },
    { id: 'bbq-frango', nome: 'Frango BBQ', descricao: 'Frango grelhado com molho barbecue, cebola roxa e coentro', preco: 12, ingredientes: ['Molho BBQ', 'Mussarela', 'Frango Grelhado', 'Cebola Roxa', 'Coentro'] },
    { id: 'vegetariana', nome: 'Vegetariana', descricao: 'Legumes frescos do jardim com cogumelos e azeitonas', preco: 10, ingredientes: ['Molho de Tomate', 'Mussarela', 'Cogumelos', 'Pimentão', 'Cebola', 'Azeitonas', 'Tomates'] }
  ],
  tamanhos: [
    { id: 'pequena', nome: 'Pequena', label: 'P', precoBase: 10, maxSabores: 2, descricao: 'Perfeita para uma pessoa' },
    { id: 'media', nome: 'Média', label: 'M', precoBase: 15, maxSabores: 3, descricao: 'Ideal para dividir com um amigo' },
    { id: 'grande', nome: 'Grande', label: 'G', precoBase: 20, maxSabores: 4, descricao: 'Perfeita para família e amigos' }
  ],
  bebidas: [
    { id: 'coca-cola', nome: 'Coca-Cola', descricao: 'Refrigerante clássico e refrescante', preco: 3, volume: '350ml' },
    { id: 'sprite', nome: 'Sprite', descricao: 'Refrigerante de limão', preco: 3, volume: '350ml' },
    { id: 'fanta-laranja', nome: 'Fanta Laranja', descricao: 'Refrigerante sabor laranja', preco: 3, volume: '350ml' },
    { id: 'agua', nome: 'Água Mineral', descricao: 'Água sem gás refrescante', preco: 2, volume: '500ml' },
    { id: 'suco-laranja', nome: 'Suco de Laranja', descricao: 'Suco natural de laranja', preco: 4, volume: '300ml' }
  ]
};

// Rotas
app.get('/api/cardapio', (req, res) => {
  res.json(cardapio);
});

// Criar preferência de pagamento (para checkout embutido)
app.post('/api/criar-preferencia', async (req, res) => {
  try {
    const { itens, dadosEntrega, metodoPagamento } = req.body;
    
    const pedidoId = uuidv4();
    const total = itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
    
    // Criar itens para o Mercado Pago
    const items = itens.map(item => ({
      title: item.nome,
      description: item.tipo === 'pizza' && item.sabores 
        ? `Sabores: ${item.sabores.map(s => s.nome).join(', ')}`
        : item.descricao || '',
      quantity: item.quantidade,
      unit_price: item.preco,
      currency_id: 'BRL'
    }));

    // Configurar preferência
    const preferenceData = {
      items,
      external_reference: pedidoId,
      payer: {
        name: dadosEntrega.nome,
        phone: { number: dadosEntrega.telefone }
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/pagamento/sucesso`,
        failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/pagamento/erro`,
        pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/pagamento/pendente`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: metodoPagamento === 'pix' 
          ? [{ id: 'credit_card' }, { id: 'debit_card' }, { id: 'ticket' }]
          : []
      }
    };

    const preferencia = await preferenceClient.create({ body: preferenceData });
    
    // Salvar pedido
    pedidos.set(pedidoId, {
      id: pedidoId,
      itens,
      dadosEntrega,
      total,
      status: 'pendente',
      metodoPagamento,
      preferenciaId: preferencia.id,
      criadoEm: new Date()
    });

    res.json({
      pedidoId,
      preferenciaId: preferencia.id,
      initPoint: preferencia.init_point,
      sandboxInitPoint: preferencia.sandbox_init_point
    });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ erro: 'Erro ao criar preferência de pagamento' });
  }
});

app.post('/api/criar-pix', async (req, res) => {
  try {
    const { itens, dadosEntrega } = req.body;

    // 1️⃣ calcular total PRIMEIRO
    const total = itens.reduce(
      (soma, item) => soma + (item.preco * item.quantidade),
      0
    );

    // 2️⃣ salvar pedido no banco
    const { data: pedidoCriado, error: erroPedido } = await supabase
      .from('pedidos')
      .insert([
        {
          nome_cliente: dadosEntrega.nome,
          telefone: dadosEntrega.telefone,
          total: total,
          status: 'pendente'
        }
      ])
      .select()
      .single();

    if (erroPedido) {
      console.error("Erro ao salvar pedido:", erroPedido);
      return res.status(500).json({ erro: 'Erro ao salvar pedido no banco' });
    }

    // 3️⃣ pegar ID gerado pelo banco
    const pedidoId = pedidoCriado.id;

    const descricao = itens
      .map(i => `${i.quantidade}x ${i.nome}`)
      .join(', ');

    const body = {
      transaction_amount: total,
      description: `Pedido PizzaVibe #${pedidoId.slice(0, 8)}`,
      payment_method_id: 'pix',
      payer: {
        email: `${dadosEntrega.telefone}@pizzavibe.com`,
        first_name: dadosEntrega.nome.split(' ')[0],
        last_name: dadosEntrega.nome.split(' ').slice(1).join(' ') || ' ',
        identification: {
          type: 'CPF',
          number: '00000000000'
        }
      },
      external_reference: pedidoId
    };

    // aqui você continua com Mercado Pago...


    const response = await paymentClient.create({ body });
    
    if (response.point_of_interaction && response.point_of_interaction.transaction_data) {
      const qrCodeBase64 = await QRCode.toDataURL(
        response.point_of_interaction.transaction_data.qr_code
      );
      
      // Salvar pedido
      pedidos.set(pedidoId, {
        id: pedidoId,
        itens,
        dadosEntrega,
        total,
        status: 'pendente',
        metodoPagamento: 'pix',
        paymentId: response.id,
        qrCode: response.point_of_interaction.transaction_data.qr_code,
        qrCodeBase64,
        criadoEm: new Date()
      });

      res.json({
        pedidoId,
        paymentId: response.id,
        qrCode: response.point_of_interaction.transaction_data.qr_code,
        qrCodeBase64,
        qrCodeUrl: response.point_of_interaction.transaction_data.ticket_url
      });
    } else {
      throw new Error('Resposta do PIX inválida');
    }
  } catch (error) {
    console.error('Erro ao criar PIX:', error);
    res.status(500).json({ erro: 'Erro ao gerar QR Code PIX' });
  }
});

// Verificar status do pagamento
app.get('/api/verificar-pagamento/:pedidoId', async (req, res) => {
  try {
    const { pedidoId } = req.params;
    const pedido = pedidos.get(pedidoId);
    
    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    // Se for PIX, verificar status no Mercado Pago
    if (pedido.metodoPagamento === 'pix' && pedido.paymentId) {
      try {
        const pagamento = await paymentClient.get({ id: pedido.paymentId });
        pedido.status = pagamento.status;
        pedido.statusDetail = pagamento.status_detail;
      } catch (e) {
        console.log('Erro ao verificar no MP, usando status local');
      }
    }

    res.json({
      pedidoId,
      status: pedido.status,
      statusDetail: pedido.statusDetail,
      total: pedido.total,
      metodoPagamento: pedido.metodoPagamento
    });
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    res.status(500).json({ erro: 'Erro ao verificar status do pagamento' });
  }
});

app.post('/api/webhook/mercadopago', async (req, res) => {
  try {
    console.log("Webhook recebido:", req.body);

    const paymentId = req.body?.data?.id;

    if (!paymentId) {
      return res.status(200).send('OK');
    }

    const pagamento = await paymentClient.get({ id: paymentId });

    const pedidoId = pagamento.external_reference;
    const statusPagamento = pagamento.status;

    const { error } = await supabase
      .from('pedidos')
      .update({ status: statusPagamento })
      .eq('id', pedidoId);

    if (error) {
      console.error("Erro ao atualizar pedido:", error);
    } else {
      console.log(`Pedido ${pedidoId} atualizado para ${statusPagamento}`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).send('Erro');
  }
});




// Listar pedidos (para admin)
app.get('/api/pedidos', (req, res) => {
  const listaPedidos = Array.from(pedidos.values()).sort((a, b) => 
    b.criadoEm - a.criadoEm
  );
  res.json(listaPedidos);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mercadoPago: process.env.MERCADO_PAGO_ACCESS_TOKEN ? 'configurado' : 'modo teste'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`💳 Mercado Pago: ${process.env.MERCADO_PAGO_ACCESS_TOKEN ? 'Produção' : 'Modo Teste'}`);
});
