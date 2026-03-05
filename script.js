// ========== script.js ==========
// Este arquivo contém todas as interações do site

// Aguarda o carregamento completo da página antes de executar
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== EFEITO 1: ÁREA INTERATIVA (MUDAR COR E FRASE) =====
    
    // Pegando os elementos do HTML
    const botao = document.getElementById('botaoInterativo');
    const caixa = document.getElementById('caixaInterativa');
    const mensagem = document.getElementById('mensagemInterativa');
    
    // Array com frases sobre sustentabilidade (baseado nos slides)
    const frasesSustentaveis = [
        "🌱 Produzir alimentos sem destruir o meio ambiente!",
        "⚖️ Equilíbrio entre ambiental, econômico e social!",
        "📡 Agricultura de precisão evita desperdício!",
        "🌿 Bioinsumos: menos veneno, mais natureza!",
        "🔄 Logística reversa: embalagens viram recursos!",
        "⚡ 80% da nossa energia é limpa e renovável!",
        "⚠️ Desmatamento ilegal é o maior desafio!",
        "💚 Cada pequena atitude faz a diferença!"
    ];
    
    // Array com as cores da paleta (verde amarelado, claro, apagado, escuro)
    const coresPaleta = [
        "#b8d97a",  // verde amarelado
        "#e3ffb2",  // verde amarelado claro
        "#6a8e5a",  // verde apagado
        "#3d6b3d",  // verde amarelado escuro
        "#d4f0b0",  // variação do claro
        "#9fc58a"   // variação do apagado
    ];
    
    // Função que será executada quando clicar no botão
    function ativarInteracao() {
        // 1. Escolher uma frase aleatória
        const indiceFrase = Math.floor(Math.random() * frasesSustentaveis.length);
        const fraseEscolhida = frasesSustentaveis[indiceFrase];
        
        // 2. Colocar a frase na mensagem
        mensagem.textContent = fraseEscolhida;
        
        // 3. Escolher uma cor aleatória da paleta
        const indiceCor = Math.floor(Math.random() * coresPaleta.length);
        const corEscolhida = coresPaleta[indiceCor];
        
        // 4. Mudar a cor de fundo da caixa
        caixa.style.backgroundColor = corEscolhida;
        
        // 5. Opcional: mudar a cor da borda também
        caixa.style.borderColor = "#3d6b3d";  // verde escuro
        
        // 6. Mostrar no console (para aprendizado)
        console.log("Interação ativada! Frase: " + fraseEscolhida);
        console.log("Cor aplicada: " + corEscolhida);
    }
    
    // Adicionar o evento de clique ao botão
    botao.addEventListener('click', ativarInteracao);
    
    
    // ===== EFEITO 2: DESTACAR ITEM DO MENU AO ROLAR =====
    
    // Pegar todas as seções e links do menu
    const secoes = document.querySelectorAll('section');
    const linksMenu = document.querySelectorAll('.menu-lista a');
    
    // Função para verificar qual seção está visível na tela
    function destacarMenuAtivo() {
        // Posição atual do scroll
        let posicaoScroll = window.scrollY;
        
        // Para cada seção, verificar se ela está na área visível
        secoes.forEach(secao => {
            // Posição da seção
            const topoSecao = secao.offsetTop - 100;  // desconto de 100px para ativar um pouco antes
            const fundoSecao = topoSecao + secao.offsetHeight;
            const idSecao = secao.getAttribute('id');
            
            // Verificar se a seção está visível
            if (posicaoScroll >= topoSecao && posicaoScroll < fundoSecao) {
                // Remover classe ativa de todos os links
                linksMenu.forEach(link => {
                    link.classList.remove('ativo');
                });
                
                // Adicionar classe ativa ao link correspondente
                const linkAtivo = document.querySelector(`.menu-lista a[href="#${idSecao}"]`);
                if (linkAtivo) {
                    linkAtivo.classList.add('ativo');
                }
            }
        });
    }
    
    // Adicionar classe CSS para o link ativo (vai no style.css)
    const estiloAtivo = document.createElement('style');
    estiloAtivo.textContent = `
        .menu-lista a.ativo {
            background-color: var(--verde-amarelado-claro);
            color: var(--verde-escuro);
            font-weight: 700;
        }
    `;
    document.head.appendChild(estiloAtivo);
    
    // Adicionar evento de scroll para destacar menu
    window.addEventListener('scroll', destacarMenuAtivo);
    
    
    // ===== EFEITO 3: ANIMAÇÃO DE APARECIMENTO DOS CARDS =====
    
    // Criar um observador para ver quando os cards entram na tela
    const cards = document.querySelectorAll('.card');
    
    // Configuração do observador
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            // Se o card está visível
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2,  // 20% do card visível já ativa
        rootMargin: '0px'
    });
    
    // Aplicar estilos iniciais e observar cada card
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    
    // ===== EFEITO 4: BOTÃO VOLTAR AO TOPO =====
    
    // Criar botão de voltar ao topo
    const botaoTopo = document.createElement('button');
    botaoTopo.textContent = '↑';
    botaoTopo.setAttribute('aria-label', 'Voltar ao topo');
    botaoTopo.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--verde-escuro);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    // Adicionar hover no botão
    botaoTopo.addEventListener('mouseenter', () => {
        botaoTopo.style.backgroundColor = 'var(--verde-amarelado)';
        botaoTopo.style.transform = 'scale(1.1)';
    });
    
    botaoTopo.addEventListener('mouseleave', () => {
        botaoTopo.style.backgroundColor = 'var(--verde-escuro)';
        botaoTopo.style.transform = 'scale(1)';
    });
    
    // Adicionar botão ao body
    document.body.appendChild(botaoTopo);
    
    // Mostrar/esconder botão conforme o scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            botaoTopo.style.display = 'block';
        } else {
            botaoTopo.style.display = 'none';
        }
    });
    
    // Função para voltar ao topo
    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // rolagem suave
        });
    });
    
    
    // ===== EFEITO 5: MENSAGEM DE BOAS-VINDAS =====
    
    // Mostrar uma mensagem quando a página carregar
    console.log('🌱 Site Futuro Sustentável carregado!');
    console.log('Bem-vindo(a) ao trabalho do 2º ano EM!');
    
    // Opcional: alerta de boas-vindas (comentado para não ser invasivo)
    // alert('🌱 Bem-vindo ao site sobre Futuro Sustentável!');
    
}); // Fim do DOMContentLoaded