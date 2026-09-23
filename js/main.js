/**
 * Roberta Personalizados - Script Principal
 * Padrão: Clean Code / Modular / SOLID (Single Responsibility Principle)
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

/**
 * Inicializador global da Aplicação
 */
const App = {
  init() {
    this.setupFooterYear();
    MobileMenu.init();
    ProductCarousel.init();
    SearchOverlay.init();
    SmoothScroll.init();
  },

  setupFooterYear() {
    // Atualiza dinamicamente o ano no rodapé
    const yearSpan = document.getElementById("year-span");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }
};

/**
 * Módulo: Menu Mobile
 * Responsabilidade: Gerenciar abertura, fechamento e interações do menu lateral em telas menores.
 */
const MobileMenu = {
  init() {
    this.menuBtn = document.getElementById("menu-btn");
    this.menuClose = document.getElementById("menu-close");
    this.mobileMenu = document.getElementById("mobile-menu");

    if (!this.menuBtn || !this.mobileMenu) return;

    this.bindEvents();
  },

  bindEvents() {
    // Abre o menu
    this.menuBtn.addEventListener("click", () => this.open());
    
    // Fecha o menu pelo botão de fechar
    if (this.menuClose) {
      this.menuClose.addEventListener("click", () => this.close());
    }

    // Fecha o menu ao clicar fora dele (overlay escuro)
    this.mobileMenu.addEventListener("click", (e) => {
      if (e.target === this.mobileMenu) this.close();
    });

    // Fecha o menu ao clicar em qualquer link de navegação
    this.mobileMenu.querySelectorAll("a[href^='#']").forEach(link => {
      link.addEventListener("click", () => this.close());
    });
  },

  open() {
    this.mobileMenu.classList.remove("hidden");
  },

  close() {
    this.mobileMenu.classList.add("hidden");
  }
};

/**
 * Módulo: Carrossel de Produtos
 * Responsabilidade: Controlar a rolagem horizontal da vitrine de produtos no topo do site.
 */
const ProductCarousel = {
  init() {
    this.track = document.getElementById("produtos-track");
    this.prevBtn = document.getElementById("produtos-prev");
    this.nextBtn = document.getElementById("produtos-next");

    if (!this.track || !this.prevBtn || !this.nextBtn) return;

    this.bindEvents();
  },

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.scroll(-1));
    this.nextBtn.addEventListener("click", () => this.scroll(1));
  },

  // Calcula dinamicamente o quanto a tela deve rolar com base no tamanho do item + espaçamento (gap)
  getScrollAmount() {
    const item = this.track.querySelector("a");
    if (!item) return 200;
    
    const style = getComputedStyle(this.track);
    const gap = parseInt(style.columnGap || style.gap || "16", 10);
    return item.offsetWidth + gap;
  },

  // Move o carrossel na direção informada (-1 para trás, 1 para frente)
  scroll(direction) {
    const amount = this.getScrollAmount() * 2 * direction;
    this.track.scrollBy({ left: amount, behavior: "smooth" });
  }
};

/**
 * Módulo: Sistema de Busca
 * Responsabilidade: Controlar a sobreposição (overlay) de pesquisa, auto-complete e o filtro de produtos.
 */
const SearchOverlay = {
  // Catálogo base de produtos e seus termos de pesquisa associados
  produtos: [
    { nome: "Ímãs personalizados", termos: "imas ima imã imãs geladeira foto lembrança magneto", link: "https://wa.me/5581993657657?text=Ol%C3%A1%2C%20Roberta!%20Acessei%20o%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20%C3%ADm%C3%A3s%20personalizados." },
    { nome: "Chaveiros personalizados", termos: "chaveiro chaveiros chave lembrancinha formatura", link: "https://wa.me/5581993657657?text=Ol%C3%A1%2C%20Roberta!%20Acessei%20o%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20chaveiros%20personalizados." },
    { nome: "Topos de bolo", termos: "topo topos bolo aniversario festa cake topper", link: "https://wa.me/5581993657657?text=Ol%C3%A1%2C%20Roberta!%20Acessei%20o%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20topos%20de%20bolo." },
    { nome: "Bottons", termos: "botton bottons button buttons pin boton", link: "https://wa.me/5581993657657?text=Ol%C3%A1%2C%20Roberta!%20Acessei%20o%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20bottons%20personalizados." },
    { nome: "Canetas personalizadas", termos: "caneta canetas escrita marca empresa", link: "https://wa.me/5581993657657?text=Ol%C3%A1%2C%20Roberta!%20Acessei%20o%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20canetas%20personalizadas." },
    { nome: "Adesivos personalizados", termos: "adesivo adesivos sticker etiqueta embalagem", link: "https://wa.me/5581993657657?text=Ol%C3%A1%2C%20Roberta!%20Acessei%20o%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20adesivos%20personalizados." },
    { nome: "Etiquetas personalizadas", termos: "etiqueta etiquetas nome escola material identificação", link: "https://wa.me/5581993657657?text=Ol%C3%A1%2C%20Roberta!%20Acessei%20o%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20etiquetas%20personalizadas." },
    { nome: "Fotos impressas", termos: "foto fotos impressa impressas polaroid revelação impressao", link: "https://wa.me/5581993657657?text=Ol%C3%A1%2C%20Roberta!%20Acessei%20o%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20impress%C3%A3o%20de%20fotos." },
    { nome: "Placas personalizadas", termos: "placa placas pix wifi aviso sinalização", link: "https://wa.me/5581993657657?text=Ol%C3%A1%2C%20Roberta!%20Acessei%20o%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20placas%20personalizadas." }
  ],

  init() {
    this.searchToggle = document.getElementById("search-toggle");
    this.overlay = document.getElementById("search-overlay");
    this.closeBtn = document.getElementById("search-close");
    this.input = document.getElementById("search-input");
    this.resultsContainer = document.getElementById("search-results");

    if (!this.searchToggle || !this.overlay) return;

    this.bindEvents();
  },

  bindEvents() {
    // Abrir modal de busca
    this.searchToggle.addEventListener("click", () => this.open());
    
    // Fechar modal de busca (botão ou fora da área)
    if (this.closeBtn) this.closeBtn.addEventListener("click", () => this.close());
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Filtro em tempo real (Input) e Atalhos de Teclado
    if (this.input) {
      this.input.addEventListener("input", (e) => this.performSearch(e.target.value));
      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.close();
      });
    }

    // Fecha a busca ao pressionar ESC globalmente
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.overlay.classList.contains("hidden")) {
        this.close();
      }
    });
  },

  open() {
    this.overlay.classList.remove("hidden");
    if (this.input) {
      this.input.value = "";
      // Timeout para focar o input logo após a renderização (UX fluida)
      setTimeout(() => this.input.focus(), 50);
    }
    this.renderDefaultSuggestions();
  },

  close() {
    this.overlay.classList.add("hidden");
  },

  // Filtra e exibe os itens que correspondem à query
  performSearch(query) {
    if (!this.resultsContainer) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      this.renderDefaultSuggestions();
      return;
    }

    const results = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(q) ||
      p.termos.toLowerCase().includes(q)
    );

    this.renderResults(results);
  },

  renderDefaultSuggestions() {
    if (!this.resultsContainer) return;
    
    // Extrai o primeiro termo de cada produto para criar botões de sugestões rápidas
    const tagsHtml = this.produtos.slice(0, 5).map(p => {
      const termoPrincipal = p.nome.split(" ")[0];
      return `<button data-term="${termoPrincipal}" class="px-3 py-1.5 rounded-full border border-brand-pinkLight text-[11px] text-brand-blueDark hover:bg-brand-coral/10 font-medium transition">
                ${termoPrincipal}
              </button>`;
    }).join("");

    this.resultsContainer.innerHTML = `
      <p class="text-xs text-brand-textSec mb-2">Sugestões rápidas:</p>
      <div class="flex flex-wrap gap-2 mb-2">
        ${tagsHtml}
      </div>
      <p class="text-xs text-brand-textSec">Ou digite o nome do produto na busca acima.</p>
    `;

    // Dispara a busca automática ao clicar nas tags de sugestão
    this.resultsContainer.querySelectorAll("button[data-term]").forEach(btn => {
      btn.addEventListener("click", () => {
        const term = btn.getAttribute("data-term") || "";
        if (this.input) this.input.value = term;
        this.performSearch(term);
      });
    });
  },

  renderResults(results) {
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <p class="text-sm text-brand-blueDark mb-1">Não encontramos esse produto.</p>
        <p class="text-xs text-brand-textSec">
          Tente termos como: "ímãs", "chaveiros", "topos de bolo", "bottons"...
        </p>
      `;
      return;
    }

    const itemsHtml = results.map(p => `
      <a href="${p.link}" target="_blank"
        class="flex items-center justify-between gap-3 px-3 py-2 rounded-2xl border border-brand-pinkLight hover:bg-brand-coral/5 text-sm transition">
        <span class="text-brand-blueDark font-medium">${p.nome}</span>
        <span class="text-[11px] uppercase tracking-[0.15em] text-brand-coral font-semibold">Pedir</span>
      </a>
    `).join("");

    this.resultsContainer.innerHTML = `
      <p class="text-xs text-brand-textSec mb-2">Encontramos ${results.length} produto(s):</p>
      <div class="space-y-2">
        ${itemsHtml}
      </div>
    `;
  }
};

/**
 * Módulo: Rolagem Suave (Smooth Scroll)
 * Responsabilidade: Garantir transição fluida ao clicar nos links do menu que apontam para seções da página.
 */
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Ignora links vazios ou sem destino

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
};
