import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ShoppingCart, 
  Pizza, 
  ChefHat, 
  Minus, 
  Plus, 
  X, 
  Check, 
  Trash2, 
  Droplets,
  ArrowRight,
  Star,
  Flame,
  Info,
  MapPin,
  CreditCard,
  User,
  Phone,
  Home,
  CheckCircle,
  Loader2,
  QrCode,
  Copy,
  RefreshCw,
  Clock,
  Wallet
} from 'lucide-react';
import { pizzas, tamanhos, bebidas } from './data/cardapio.js';
import './App.css';

// Configuração da API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Notificação Toast
function NotificacaoToast({ mensagem, tipo, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const corFundo = tipo === 'sucesso' ? 'bg-green-500' : tipo === 'erro' ? 'bg-red-500' : 'bg-blue-500';
  
  return (
    <div className={`${corFundo} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideUp`}>
      {tipo === 'sucesso' && <Check className="w-5 h-5" />}
      {tipo === 'erro' && <X className="w-5 h-5" />}
      {tipo === 'info' && <Info className="w-5 h-5" />}
      <span className="font-medium">{mensagem}</span>
    </div>
  );
}

// Header Component
function Header({ quantidadeCarrinho, onCarrinhoClick }) {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const handleScroll = () => setRolou(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${rolou ? 'glass shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <Pizza className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Pizza<span className="text-red-600">Vibe</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#cardapio" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Cardápio</a>
            <a href="#bebidas" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Bebidas</a>
            <a href="#sobre" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Sobre</a>
          </nav>

          <button 
            onClick={onCarrinhoClick}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors btn-press"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {quantidadeCarrinho > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scaleIn">
                {quantidadeCarrinho}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function Hero({ onPedirClick }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pizza-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-red-50/60 to-yellow-50/80" />
      
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/40 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6 animate-fadeIn">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Saindo fresquinho do forno</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-slideUp stagger-1">
          Crie Sua Pizza
          <span className="block gradient-text mt-2">Perfeita</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-slideUp stagger-2">
          Monte sua pizza com até 4 sabores. Pague com PIX ou cartão, direto pelo app!
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp stagger-3">
          <button 
            onClick={onPedirClick}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all btn-press flex items-center gap-2"
          >
            <ChefHat className="w-5 h-5" />
            Pedir Agora
          </button>
          <a 
            href="#cardapio"
            className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all btn-press flex items-center gap-2"
          >
            Ver Cardápio
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slideUp stagger-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">8+</div>
            <div className="text-sm text-gray-600">Sabores</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">PIX</div>
            <div className="text-sm text-gray-600">& Cartão</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">30min</div>
            <div className="text-sm text-gray-600">Entrega</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Modal de Montagem de Pizza
function ModalMontagemPizza({ aberto, onFechar, onAdicionarCarrinho }) {
  const [etapa, setEtapa] = useState('tamanho');
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const [saboresSelecionados, setSaboresSelecionados] = useState([]);

  useEffect(() => {
    if (aberto) {
      setEtapa('tamanho');
      setTamanhoSelecionado(null);
      setSaboresSelecionados([]);
    }
  }, [aberto]);

  if (!aberto) return null;

  const handleSelecionarTamanho = (tamanho) => {
    setTamanhoSelecionado(tamanho);
    setSaboresSelecionados([]);
    setEtapa('sabores');
  };

  const handleToggleSabor = (pizza) => {
    if (!tamanhoSelecionado) return;
    
    const selecionado = saboresSelecionados.find(s => s.id === pizza.id);
    
    if (selecionado) {
      setSaboresSelecionados(prev => prev.filter(s => s.id !== pizza.id));
    } else if (saboresSelecionados.length < tamanhoSelecionado.maxSabores) {
      setSaboresSelecionados(prev => [...prev, pizza]);
    }
  };

  const handleAdicionarCarrinho = () => {
    if (!tamanhoSelecionado || saboresSelecionados.length === 0) return;
    
    const precoMedioSabores = saboresSelecionados.reduce((soma, s) => soma + s.preco, 0) / saboresSelecionados.length;
    const precoTotal = tamanhoSelecionado.precoBase + precoMedioSabores;
    
    const nomePizza = saboresSelecionados.length === 1 
      ? saboresSelecionados[0].nome 
      : `Pizza ${tamanhoSelecionado.label} - ${saboresSelecionados.length} sabores`;
    
    const itemCarrinho = {
      id: `pizza-${Date.now()}`,
      tipo: 'pizza',
      nome: nomePizza,
      tamanho: tamanhoSelecionado,
      sabores: saboresSelecionados,
      quantidade: 1,
      preco: precoTotal
    };
    
    onAdicionarCarrinho(itemCarrinho);
    onFechar();
  };

  const podeAdicionar = tamanhoSelecionado && saboresSelecionados.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onFechar} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scaleIn">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {etapa === 'tamanho' ? 'Escolha o Tamanho' : 'Selecione os Sabores'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {etapa === 'tamanho' 
                ? 'Escolha um tamanho para começar sua pizza' 
                : `Selecione até ${tamanhoSelecionado?.maxSabores} sabores para sua pizza ${tamanhoSelecionado?.nome}`}
            </p>
          </div>
          <button onClick={onFechar} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {etapa === 'tamanho' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tamanhos.map((tamanho) => (
                <button
                  key={tamanho.id}
                  onClick={() => handleSelecionarTamanho(tamanho)}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-bold text-gray-900">{tamanho.label}</span>
                    <span className="text-2xl">{tamanho.id === 'pequena' ? '🍕' : tamanho.id === 'media' ? '🍕🍕' : '🍕🍕🍕'}</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">{tamanho.nome}</div>
                  <div className="text-sm text-gray-500 mb-2">{tamanho.descricao}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-bold">R$ {tamanho.precoBase.toFixed(2)}</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      Até {tamanho.maxSabores} sabores
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                    {tamanhoSelecionado?.label}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Pizza {tamanhoSelecionado?.nome}</div>
                    <div className="text-sm text-gray-500">Base: R$ {tamanhoSelecionado?.precoBase.toFixed(2)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${saboresSelecionados.length === tamanhoSelecionado?.maxSabores ? 'text-orange-600' : 'text-gray-600'}`}>
                    {saboresSelecionados.length} de {tamanhoSelecionado?.maxSabores} sabores
                  </div>
                  <button 
                    onClick={() => setEtapa('tamanho')}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Mudar tamanho
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pizzas.map((pizza) => {
                  const selecionado = saboresSelecionados.find(s => s.id === pizza.id);
                  const desabilitado = !selecionado && saboresSelecionados.length >= (tamanhoSelecionado?.maxSabores || 0);
                  
                  return (
                    <button
                      key={pizza.id}
                      onClick={() => handleToggleSabor(pizza)}
                      disabled={desabilitado}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        selecionado 
                          ? 'border-red-500 bg-red-50' 
                          : desabilitado 
                            ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-red-300 hover:bg-red-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{pizza.nome}</span>
                            {selecionado && <Check className="w-4 h-4 text-red-500" />}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{pizza.descricao}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {pizza.ingredientes.slice(0, 3).map((ing, i) => (
                              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {ing}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-red-600 font-bold ml-2">+R$ {pizza.preco.toFixed(2)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {etapa === 'sabores' && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Preço Total</div>
                <div className="text-2xl font-bold text-gray-900">
                  R$ {tamanhoSelecionado && saboresSelecionados.length > 0 
                    ? (tamanhoSelecionado.precoBase + saboresSelecionados.reduce((soma, s) => soma + s.preco, 0) / saboresSelecionados.length).toFixed(2)
                    : tamanhoSelecionado?.precoBase.toFixed(2)}
                </div>
              </div>
              <button
                onClick={handleAdicionarCarrinho}
                disabled={!podeAdicionar}
                className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all ${
                  podeAdicionar
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Card de Pizza
function CardPizza({ pizza, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover-lift cursor-pointer card-glow border border-gray-100"
    >
      <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center relative">
        <div className="text-6xl">🍕</div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-red-600 font-bold">R$ {pizza.preco.toFixed(2)}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{pizza.nome}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{pizza.descricao}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {pizza.ingredientes.slice(0, 3).map((ing, i) => (
            <span key={i} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
              {ing}
            </span>
          ))}
          {pizza.ingredientes.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              +{pizza.ingredientes.length - 3}
            </span>
          )}
        </div>
        <button className="w-full py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Personalizar
        </button>
      </div>
    </div>
  );
}

// Card de Bebida
function CardBebida({ bebida, quantidade, onQuantidadeChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover-lift border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
          {bebida.id.includes('coca') ? '🥤' : bebida.id.includes('sprite') ? '🍋' : bebida.id.includes('fanta') ? '🍊' : bebida.id.includes('agua') ? '💧' : '🧃'}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{bebida.nome}</h3>
          <p className="text-sm text-gray-500">{bebida.descricao}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-red-600 font-bold">R$ {bebida.preco.toFixed(2)}</span>
            <span className="text-xs text-gray-400">{bebida.volume}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onQuantidadeChange(-1)}
            disabled={quantidade === 0}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold">{quantidade}</span>
          <button 
            onClick={() => onQuantidadeChange(1)}
            className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors"
          >
            <Plus className="w-4 h-4 text-red-600" />
          </button>
        </div>
        {quantidade > 0 && (
          <div className="text-sm text-gray-500">
            Subtotal: <span className="font-semibold text-gray-900">R$ {(bebida.preco * quantidade).toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Sidebar do Carrinho
function SidebarCarrinho({ aberto, onFechar, carrinho, onAtualizarQuantidade, onRemoverItem, onFinalizarCompra }) {
  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  const quantidadeItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onFechar} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl animate-slideInRight">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Seu Carrinho</h2>
              <p className="text-sm text-gray-500">{quantidadeItens} itens</p>
            </div>
            <button onClick={onFechar} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {carrinho.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Seu carrinho está vazio</h3>
                <p className="text-gray-500">Adicione algumas pizzas deliciosas e bebidas!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {carrinho.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.tipo === 'pizza' ? '🍕' : '🥤'}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.nome}</h4>
                            {item.tipo === 'pizza' && item.tamanho && (
                              <div className="text-sm text-gray-500">
                                Tamanho: {item.tamanho.label} ({item.tamanho.nome})
                              </div>
                            )}
                          </div>
                        </div>
                        {item.tipo === 'pizza' && item.sabores && item.sabores.length > 1 && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="text-gray-400">Sabores: </span>
                            {item.sabores.map(s => s.nome).join(', ')}
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => onRemoverItem(item.id)}
                        className="p-1.5 hover:bg-red-100 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => onAtualizarQuantidade(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantidade}</span>
                        <button 
                          onClick={() => onAtualizarQuantidade(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-gray-900">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {carrinho.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-700">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Entrega</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold pt-2 border-t">
                  <span className="text-gray-900">Total</span>
                  <span className="text-red-600">R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={onFinalizarCompra}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all btn-press flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Modal de Checkout com PIX e Cartão
function ModalCheckout({ aberto, onFechar, carrinho, onPagamentoSucesso }) {
  const [etapa, setEtapa] = useState('entrega');
  const [metodoPagamento, setMetodoPagamento] = useState(null);
  const [dadosEntrega, setDadosEntrega] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
    complemento: ''
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [pedidoInfo, setPedidoInfo] = useState(null);
  const [statusPagamento, setStatusPagamento] = useState('pendente');
  const pollingRef = useRef(null);

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  useEffect(() => {
    if (!aberto) {
      setEtapa('entrega');
      setMetodoPagamento(null);
      setPedidoInfo(null);
      setStatusPagamento('pendente');
      setErro('');
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    }
  }, [aberto]);

  if (!aberto) return null;

  const handleInputChange = (campo, valor) => {
    setDadosEntrega(prev => ({ ...prev, [campo]: valor }));
  };

  const validarDadosEntrega = () => {
    if (!dadosEntrega.nome || !dadosEntrega.telefone || !dadosEntrega.endereco || 
        !dadosEntrega.numero || !dadosEntrega.bairro || !dadosEntrega.cidade || !dadosEntrega.cep) {
      setErro('Por favor, preencha todos os campos obrigatórios');
      return false;
    }
    setErro('');
    return true;
  };

  const handleContinuarParaPagamento = () => {
    if (validarDadosEntrega()) {
      setEtapa('pagamento');
    }
  };

  const handleSelecionarMetodo = (metodo) => {
    setMetodoPagamento(metodo);
  };

  const handleProcessarPagamento = async () => {
    if (!metodoPagamento) {
      setErro('Selecione um método de pagamento');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const itens = carrinho.map(item => ({
        nome: item.nome,
        descricao: item.tipo === 'pizza' && item.sabores 
          ? `Sabores: ${item.sabores.map(s => s.nome).join(', ')}`
          : '',
        quantidade: item.quantidade,
        preco: item.preco
      }));

      if (metodoPagamento === 'pix') {
        // Criar pagamento PIX
        const response = await fetch(`${API_URL}/criar-pix`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itens, dadosEntrega })
        });

        const data = await response.json();

        if (data.erro) {
          throw new Error(data.erro);
        }

        setPedidoInfo(data);
        setEtapa('pix');
        
        // Iniciar polling para verificar status
        pollingRef.current = setInterval(() => {
          verificarStatusPagamento(data.pedidoId);
        }, 5000);

      } else if (metodoPagamento === 'cartao') {
        // Criar preferência para cartão (checkout embutido)
        const response = await fetch(`${API_URL}/criar-preferencia`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itens, dadosEntrega, metodoPagamento: 'cartao' })
        });

        const data = await response.json();

        if (data.erro) {
          throw new Error(data.erro);
        }

        setPedidoInfo(data);
        setEtapa('cartao');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      setErro('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const verificarStatusPagamento = async (pedidoId) => {
    try {
      const response = await fetch(`${API_URL}/verificar-pagamento/${pedidoId}`);
      const data = await response.json();
      
      if (data.status === 'approved') {
        setStatusPagamento('aprovado');
        clearInterval(pollingRef.current);
        setTimeout(() => {
          onPagamentoSucesso();
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
    }
  };

  const handleSimularPagamentoPix = async () => {
    if (!pedidoInfo) return;
    
    try {
      await fetch(`${API_URL}/simular-pagamento-pix/${pedidoInfo.pedidoId}`, {
        method: 'POST'
      });
      setStatusPagamento('aprovado');
      setTimeout(() => {
        onPagamentoSucesso();
      }, 1500);
    } catch (error) {
      console.error('Erro ao simular pagamento:', error);
    }
  };

  const handleCopiarPix = () => {
    if (pedidoInfo?.qrCode) {
      navigator.clipboard.writeText(pedidoInfo.qrCode);
      alert('Código PIX copiado!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onFechar} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {etapa === 'entrega' && 'Dados de Entrega'}
              {etapa === 'pagamento' && 'Forma de Pagamento'}
              {etapa === 'pix' && 'Pagar com PIX'}
              {etapa === 'cartao' && 'Pagar com Cartão'}
            </h2>
          </div>
          <button onClick={onFechar} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* ETAPA: DADOS DE ENTREGA */}
          {etapa === 'entrega' && (
            <div className="space-y-4">
              {erro && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {erro}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={dadosEntrega.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={dadosEntrega.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Home className="w-4 h-4 inline mr-1" />
                    Endereço *
                  </label>
                  <input
                    type="text"
                    value={dadosEntrega.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Rua, Avenida..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número *</label>
                  <input
                    type="text"
                    value={dadosEntrega.numero}
                    onChange={(e) => handleInputChange('numero', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                <input
                  type="text"
                  value={dadosEntrega.complemento}
                  onChange={(e) => handleInputChange('complemento', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Apto, Bloco, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro *</label>
                  <input
                    type="text"
                    value={dadosEntrega.bairro}
                    onChange={(e) => handleInputChange('bairro', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Seu bairro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
                  <input
                    type="text"
                    value={dadosEntrega.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="00000-000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                <input
                  type="text"
                  value={dadosEntrega.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Sua cidade"
                />
              </div>
            </div>
          )}

          {/* ETAPA: SELEÇÃO DE MÉTODO DE PAGAMENTO */}
          {etapa === 'pagamento' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Resumo do Pedido</h3>
                <div className="space-y-1 text-sm">
                  {carrinho.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.quantidade}x {item.nome}</span>
                      <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 font-bold">
                    <div className="flex justify-between text-lg">
                      <span>Total</span>
                      <span className="text-red-600">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {erro && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {erro}
                </div>
              )}

              <h3 className="font-semibold text-gray-900 mb-3">Escolha como pagar:</h3>

              <div className="space-y-3">
                {/* Opção PIX */}
                <button
                  onClick={() => handleSelecionarMetodo('pix')}
                  className={`w-full p-4 border-2 rounded-xl flex items-center gap-4 transition-all ${
                    metodoPagamento === 'pix' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">PIX</div>
                    <div className="text-sm text-gray-500">Pagamento instantâneo com QR Code</div>
                  </div>
                  {metodoPagamento === 'pix' && <Check className="w-5 h-5 text-green-500" />}
                </button>

                {/* Opção Cartão */}
                <button
                  onClick={() => handleSelecionarMetodo('cartao')}
                  className={`w-full p-4 border-2 rounded-xl flex items-center gap-4 transition-all ${
                    metodoPagamento === 'cartao' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Cartão de Crédito</div>
                    <div className="text-sm text-gray-500">Pague com cartão de crédito</div>
                  </div>
                  {metodoPagamento === 'cartao' && <Check className="w-5 h-5 text-blue-500" />}
                </button>
              </div>
            </div>
          )}

          {/* ETAPA: PIX */}
          {etapa === 'pix' && pedidoInfo && (
            <div className="space-y-4 text-center">
              {statusPagamento === 'aprovado' ? (
                <div className="py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pagamento Confirmado!</h3>
                  <p className="text-gray-600">Seu pedido está sendo preparado...</p>
                </div>
              ) : (
                <>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2 flex items-center justify-center gap-2">
                      <QrCode className="w-5 h-5" />
                      Escaneie o QR Code
                    </h3>
                    <p className="text-sm text-green-700">
                      Abra o app do seu banco e escaneie o código abaixo
                    </p>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-green-100">
                      {pedidoInfo.qrCodeBase64 ? (
                        <img 
                          src={pedidoInfo.qrCodeBase64} 
                          alt="QR Code PIX" 
                          className="w-48 h-48"
                        />
                      ) : (
                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Código PIX */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Ou copie o código PIX:</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={pedidoInfo.qrCode || ''}
                        readOnly
                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono truncate"
                      />
                      <button
                        onClick={handleCopiarPix}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copiar
                      </button>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Aguardando pagamento...
                  </div>

                  {/* Botão de simulação (apenas para testes) */}
                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-400 mb-2">Modo de teste:</p>
                    <button
                      onClick={handleSimularPagamentoPix}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Simular pagamento PIX
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ETAPA: CARTÃO */}
          {etapa === 'cartao' && pedidoInfo && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pagar com Cartão
                </h3>
                <p className="text-sm text-blue-700">
                  Você será redirecionado para o checkout seguro do Mercado Pago
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Resumo do Pedido</h3>
                <div className="space-y-1 text-sm">
                  {carrinho.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.quantidade}x {item.nome}</span>
                      <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 font-bold">
                    <div className="flex justify-between text-lg">
                      <span>Total</span>
                      <span className="text-red-600">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={pedidoInfo.initPoint}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Ir para o Pagamento
              </a>

              <p className="text-xs text-gray-500 text-center">
                Ambiente seguro do Mercado Pago
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {etapa === 'entrega' && (
          <div className="p-6 border-t bg-gray-50">
            <button
              onClick={handleContinuarParaPagamento}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all btn-press flex items-center justify-center gap-2"
            >
              Continuar para Pagamento
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {etapa === 'pagamento' && (
          <div className="p-6 border-t bg-gray-50">
            <button
              onClick={handleProcessarPagamento}
              disabled={carregando || !metodoPagamento}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all btn-press flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {carregando ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pagar R$ {total.toFixed(2)}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Página de Sucesso
function PaginaSucesso({ onVoltar }) {
  return (
    <div className="min-h-screen flex items-center justify-center pizza-pattern p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-scaleIn">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-6">
          Seu pagamento foi processado com sucesso. Em breve sua pizza estará a caminho!
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex items-center gap-2 justify-center text-sm text-gray-500">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>Tempo estimado: 30-45 minutos</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Acompanhe pelo WhatsApp</span>
          </div>
        </div>
        
        <button
          onClick={onVoltar}
          className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all btn-press"
        >
          Fazer Novo Pedido
        </button>
      </div>
    </div>
  );
}

// App Principal
function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [montagemAberta, setMontagemAberta] = useState(false);
  const [checkoutAberto, setCheckoutAberto] = useState(false);
  const [pedidoSucesso, setPedidoSucesso] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  const [quantidadesBebidas, setQuantidadesBebidas] = useState({});

  const adicionarNotificacao = useCallback((mensagem, tipo = 'sucesso') => {
    const id = Date.now().toString();
    setNotificacoes(prev => [...prev, { id, mensagem, tipo }]);
  }, []);

  const removerNotificacao = useCallback((id) => {
    setNotificacoes(prev => prev.filter(n => n.id !== id));
  }, []);

  const handleAdicionarPizzaCarrinho = useCallback((item) => {
    setCarrinho(prev => {
      const existente = prev.find(i => 
        i.tipo === 'pizza' && 
        i.tamanho?.id === item.tamanho?.id && 
        i.sabores?.length === item.sabores?.length &&
        i.sabores?.every((s, idx) => s.id === item.sabores?.[idx].id)
      );
      
      if (existente) {
        return prev.map(i => 
          i.id === existente.id 
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }
      
      return [...prev, item];
    });
    
    adicionarNotificacao('Pizza adicionada ao carrinho!', 'sucesso');
  }, [adicionarNotificacao]);

  const handleQuantidadeBebidaChange = useCallback((bebidaId, delta) => {
    setQuantidadesBebidas(prev => {
      const atual = prev[bebidaId] || 0;
      const novaQuantidade = Math.max(0, atual + delta);
      
      if (delta > 0 && atual === 0) {
        const bebida = bebidas.find(b => b.id === bebidaId);
        if (bebida) {
          setCarrinho(carrinhoPrev => [...carrinhoPrev, {
            id: `bebida-${bebidaId}-${Date.now()}`,
            tipo: 'bebida',
            nome: bebida.nome,
            quantidade: 1,
            preco: bebida.preco
          }]);
          adicionarNotificacao(`${bebida.nome} adicionado ao carrinho!`, 'sucesso');
        }
      } else if (delta < 0 && atual === 1) {
        const bebida = bebidas.find(b => b.id === bebidaId);
        setCarrinho(carrinhoPrev => carrinhoPrev.filter(item => 
          !(item.tipo === 'bebida' && item.nome === bebida?.nome)
        ));
      } else if (atual > 0) {
        const bebida = bebidas.find(b => b.id === bebidaId);
        setCarrinho(carrinhoPrev => carrinhoPrev.map(item => {
          if (item.tipo === 'bebida' && item.nome === bebida?.nome) {
            return { ...item, quantidade: novaQuantidade };
          }
          return item;
        }));
      }
      
      return { ...prev, [bebidaId]: novaQuantidade };
    });
  }, [adicionarNotificacao]);

  const handleAtualizarQuantidadeCarrinho = useCallback((id, delta) => {
    setCarrinho(prev => prev.map(item => {
      if (item.id === id) {
        const novaQuantidade = Math.max(1, item.quantidade + delta);
        return { ...item, quantidade: novaQuantidade };
      }
      return item;
    }));
  }, []);

  const handleRemoverItemCarrinho = useCallback((id) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
    adicionarNotificacao('Item removido do carrinho', 'info');
  }, [adicionarNotificacao]);

  const handleFinalizarCompra = () => {
    setCarrinhoAberto(false);
    setCheckoutAberto(true);
  };

  const handlePagamentoSucesso = () => {
    setCheckoutAberto(false);
    setPedidoSucesso(true);
    setCarrinho([]);
    setQuantidadesBebidas({});
  };

  const handleVoltarInicio = () => {
    setPedidoSucesso(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quantidadeCarrinho = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  if (pedidoSucesso) {
    return <PaginaSucesso onVoltar={handleVoltarInicio} />;
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--pizza-warm-white))]">
      <Header quantidadeCarrinho={quantidadeCarrinho} onCarrinhoClick={() => setCarrinhoAberto(true)} />
      
      <main>
        <Hero onPedirClick={() => {
          document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
        }} />
        
        <section id="cardapio" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-4">
                <Star className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">Nossas Especialidades</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Escolha Sua Pizza</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Clique em qualquer pizza para personalizar com seu tamanho preferido e misturar até 4 sabores!
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pizzas.map((pizza, index) => (
                <div key={pizza.id} className={`animate-slideUp stagger-${index + 1}`} style={{ opacity: 0, animationFillMode: 'forwards' }}>
                  <CardPizza 
                    pizza={pizza} 
                    onClick={() => setMontagemAberta(true)} 
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button 
                onClick={() => setMontagemAberta(true)}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all btn-press inline-flex items-center gap-2"
              >
                <ChefHat className="w-5 h-5" />
                Monte Sua Pizza Personalizada
              </button>
            </div>
          </div>
        </section>
        
        <section id="bebidas" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">Refrescantes</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Bebidas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete seu pedido com nossa seleção de bebidas refrescantes
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {bebidas.map((bebida, index) => (
                <div key={bebida.id} className={`animate-slideUp stagger-${index + 1}`} style={{ opacity: 0, animationFillMode: 'forwards' }}>
                  <CardBebida 
                    bebida={bebida} 
                    quantidade={quantidadesBebidas[bebida.id] || 0}
                    onQuantidadeChange={(delta) => handleQuantidadeBebidaChange(bebida.id, delta)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 pizza-pattern">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover-lift">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Forno a Lenha</h3>
                <p className="text-gray-600">Forno tradicional a lenha para aquela crosta crocante perfeita</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover-lift">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ingredientes Frescos</h3>
                <p className="text-gray-600">Apenas os melhores ingredientes, frescos todos os dias</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover-lift">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">PIX & Cartão</h3>
                <p className="text-gray-600">Pague do seu jeito, com PIX ou cartão de crédito</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <Pizza className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Pizza<span className="text-red-400">Vibe</span></span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
            </div>
            
            <div className="text-sm text-gray-500">
              © 2024 PizzaVibe. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
      
      <ModalMontagemPizza 
        aberto={montagemAberta} 
        onFechar={() => setMontagemAberta(false)}
        onAdicionarCarrinho={handleAdicionarPizzaCarrinho}
      />
      
      <SidebarCarrinho 
        aberto={carrinhoAberto}
        onFechar={() => setCarrinhoAberto(false)}
        carrinho={carrinho}
        onAtualizarQuantidade={handleAtualizarQuantidadeCarrinho}
        onRemoverItem={handleRemoverItemCarrinho}
        onFinalizarCompra={handleFinalizarCompra}
      />

      <ModalCheckout
        aberto={checkoutAberto}
        onFechar={() => setCheckoutAberto(false)}
        carrinho={carrinho}
        onPagamentoSucesso={handlePagamentoSucesso}
      />
      
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {notificacoes.map(notificacao => (
          <NotificacaoToast 
            key={notificacao.id} 
            mensagem={notificacao.mensagem} 
            tipo={notificacao.tipo}
            onClose={() => removerNotificacao(notificacao.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
