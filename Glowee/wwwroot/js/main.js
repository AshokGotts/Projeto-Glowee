/**
 * Main JavaScript - Glowee
 * Arquivo principal que gerencia todas as funcionalidades do site
 */

// Namespace principal do Glowee
window.Glowee = window.Glowee || {};

/**
 * Inicializador principal da aplicação
 */
class GloweeApp {
  constructor() {
    this.modules = [];
    this.isInitialized = false;
  }

  /**
   * Inicializa a aplicação
   */
  init() {
    if (this.isInitialized) {
      console.warn("GloweeApp já foi inicializada");
      return;
    }

    console.log("🌟 Inicializando Glowee App...");

    // Inicializa módulos
    this.initializeModules();

    // Configura event listeners globais
    this.setupGlobalEventListeners();

    this.isInitialized = true;
    console.log("✅ Glowee App inicializada com sucesso!");
  }

  /**
   * Inicializa todos os módulos da aplicação
   */
  initializeModules() {
    // Módulo de busca
    this.initSearchModule();

    // Módulo de animações
    this.initAnimationsModule();

    // Módulo de acessibilidade
    this.initAccessibilityModule();
  }

  /**
   * Inicializa o módulo de busca
   */
  initSearchModule() {
    const searchInput = document.querySelector(".search-box input");
    if (searchInput) {
      searchInput.addEventListener("input", this.handleSearchInput.bind(this));
      searchInput.addEventListener(
        "keypress",
        this.handleSearchKeypress.bind(this)
      );
    }
  }

  /**
   * Inicializa o módulo de animações
   */
  initAnimationsModule() {
    // Animações de entrada para elementos
    this.observeElements();
  }

  /**
   * Inicializa o módulo de acessibilidade
   */
  initAccessibilityModule() {
    // Melhora a navegação por teclado
    this.setupKeyboardNavigation();
  }

  /**
   * Configura event listeners globais
   */
  setupGlobalEventListeners() {
    // Smooth scroll para links internos
    document.addEventListener("click", (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        this.smoothScrollTo(e.target.getAttribute("href"));
      }
    });
  }

  /**
   * Manipula input de busca
   */
  handleSearchInput(e) {
    const query = e.target.value.trim();
    if (query.length > 2) {
      // Aqui você pode implementar busca em tempo real
      console.log("Buscando por:", query);
    }
  }

  /**
   * Manipula tecla Enter na busca
   */
  handleSearchKeypress(e) {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) {
        // Aqui você pode implementar a navegação para página de busca
        console.log("Executando busca:", query);
      }
    }
  }

  /**
   * Observa elementos para animações
   */
  observeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observa cards de produtos
    document.querySelectorAll(".product-card").forEach((card) => {
      observer.observe(card);
    });
  }

  /**
   * Configura navegação por teclado
   */
  setupKeyboardNavigation() {
    // Melhora a navegação por teclado nos botões
    document.querySelectorAll("button, a").forEach((element) => {
      element.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          element.click();
        }
      });
    });
  }

  /**
   * Scroll suave para elementos
   */
  smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.gloweeApp = new GloweeApp();
  window.gloweeApp.init();
});

// Exporta para uso global
window.GloweeApp = GloweeApp;
