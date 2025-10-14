/**
 * Products Controller - Glowee
 * Gerencia a página de produtos e suas funcionalidades
 */

class ProductsController {
  constructor() {
    this.isLoggedIn = false;
    this.infoModal = null;
    this.vendorInfoElements = [];
    this.infoIconElements = [];
    this.allProducts = [];
    this.filteredProducts = [];
    this.searchInput = null;
    this.categoryFilter = null;
    this.sortSelect = null;
    this.resultsCount = null;

    this.init();
  }

  /**
   * Inicializa o controlador de produtos
   */
  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupElements());
    } else {
      this.setupElements();
    }
  }

  /**
   * Configura os elementos DOM necessários
   */
  setupElements() {
    // Verifica se o usuário está logado
    this.checkLoginStatus();

    // Configura os elementos de filtro e busca
    this.setupFilterElements();

    // Configura o modal de informação
    this.setupModal();

    // Configura os elementos de informação do vendedor
    this.setupVendorInfo();

    // Configura os ícones de informação
    this.setupInfoIcons();

    // Inicializa os produtos
    this.initializeProducts();

    // Aplica as regras de visibilidade baseadas no status de login
    this.applyVisibilityRules();
  }

  /**
   * Verifica o status de login do usuário
   * Verifica se há dados de sessão no servidor
   */
  checkLoginStatus() {
    // Em uma aplicação ASP.NET Core MVC, o status de login é verificado no servidor
    // O JavaScript apenas aplica regras de visibilidade baseadas nos dados do servidor
    this.isLoggedIn = false; // Será definido pelo servidor via Razor

    console.log(`Usuário ${this.isLoggedIn ? "logado" : "não logado"}`);
  }

  /**
   * Configura os elementos de filtro e busca
   */
  setupFilterElements() {
    this.searchInput = document.getElementById("productSearch");
    this.categoryFilter = document.getElementById("categoryFilter");
    this.sortSelect = document.getElementById("sortSelect");
    this.resultsCount = document.getElementById("resultsCount");

    // Event listeners para busca
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => this.filterProducts());
    }

    // Event listeners para filtro de categoria
    if (this.categoryFilter) {
      this.categoryFilter.addEventListener("change", () =>
        this.filterProducts()
      );
    }

    // Event listeners para ordenação
    if (this.sortSelect) {
      this.sortSelect.addEventListener("change", () => this.sortProducts());
    }
  }

  /**
   * Configura o modal de informação
   */
  setupModal() {
    this.infoModal = new bootstrap.Modal(document.getElementById("infoModal"));
  }

  /**
   * Configura os elementos de informação do vendedor
   */
  setupVendorInfo() {
    // Encontra todos os elementos de informação do vendedor
    for (let i = 1; i <= 5; i++) {
      const vendorInfo = document.getElementById(`vendorInfo${i}`);
      if (vendorInfo) {
        this.vendorInfoElements.push(vendorInfo);
      }
    }
  }

  /**
   * Configura os ícones de informação
   */
  setupInfoIcons() {
    // Encontra todos os ícones de informação
    for (let i = 1; i <= 5; i++) {
      const infoIcon = document.getElementById(`infoIcon${i}`);
      if (infoIcon) {
        this.infoIconElements.push(infoIcon);

        // Adiciona event listeners para hover e click
        this.setupInfoIconEvents(infoIcon);
      }
    }
  }

  /**
   * Inicializa os produtos
   */
  initializeProducts() {
    const productCards = document.querySelectorAll(".product-card");
    this.allProducts = Array.from(productCards).map((card, index) => {
      const name = card.querySelector(".product-name")?.textContent || "";
      const description =
        card.querySelector(".product-description")?.textContent || "";
      const category =
        card.querySelector(".product-category")?.textContent || "";
      const priceText = card.querySelector(".product-price")?.textContent || "";
      const price = this.extractPrice(priceText);

      return {
        element: card,
        name: name.toLowerCase(),
        description: description.toLowerCase(),
        category: category,
        price: price,
        originalIndex: index,
      };
    });

    this.filteredProducts = [...this.allProducts];
    this.updateResultsCount();
  }

  /**
   * Configura os eventos dos ícones de informação
   */
  setupInfoIconEvents(infoIcon) {
    // Evento de hover para mostrar tooltip
    infoIcon.addEventListener("mouseenter", () => {
      this.showTooltip(infoIcon, "Ver detalhes do vendedor");
    });

    infoIcon.addEventListener("mouseleave", () => {
      this.hideTooltip();
    });

    // Evento de click para abrir modal
    infoIcon.addEventListener("click", (e) => {
      e.preventDefault();
      this.showInfoModal();
    });

    // Evento de teclado para acessibilidade
    infoIcon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.showInfoModal();
      }
    });
  }

  /**
   * Aplica as regras de visibilidade baseadas no status de login
   */
  applyVisibilityRules() {
    if (this.isLoggedIn) {
      // Usuário logado: mostra informações do vendedor, oculta ícones
      this.showVendorInfo();
      this.hideInfoIcons();
    } else {
      // Usuário não logado: oculta informações do vendedor, mostra ícones
      this.hideVendorInfo();
      this.showInfoIcons();
    }
  }

  /**
   * Mostra as informações do vendedor
   */
  showVendorInfo() {
    this.vendorInfoElements.forEach((element) => {
      element.style.display = "block";
      element.setAttribute("aria-hidden", "false");
    });
  }

  /**
   * Oculta as informações do vendedor
   */
  hideVendorInfo() {
    this.vendorInfoElements.forEach((element) => {
      element.style.display = "none";
      element.setAttribute("aria-hidden", "true");
    });
  }

  /**
   * Mostra os ícones de informação
   */
  showInfoIcons() {
    this.infoIconElements.forEach((element) => {
      element.style.display = "block";
      element.setAttribute("aria-hidden", "false");
      element.setAttribute("tabindex", "0");
    });
  }

  /**
   * Oculta os ícones de informação
   */
  hideInfoIcons() {
    this.infoIconElements.forEach((element) => {
      element.style.display = "none";
      element.setAttribute("aria-hidden", "true");
      element.removeAttribute("tabindex");
    });
  }

  /**
   * Mostra o modal de informação
   */
  showInfoModal() {
    if (this.infoModal) {
      this.infoModal.show();
    }
  }

  /**
   * Mostra tooltip personalizado
   */
  showTooltip(element, message) {
    // Remove tooltip existente
    this.hideTooltip();

    // Cria novo tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    tooltip.textContent = message;
    tooltip.style.cssText = `
      position: absolute;
      background: var(--primary-dark);
      color: var(--white);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.8rem;
      font-family: var(--font-primary);
      z-index: 10000;
      max-width: 200px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      pointer-events: none;
    `;

    // Posiciona o tooltip
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    tooltip.style.left = `${rect.left + scrollLeft + rect.width / 2}px`;
    tooltip.style.top = `${rect.top + scrollTop - 5}px`;
    tooltip.style.transform = "translateX(-50%) translateY(-100%)";

    // Adiciona ao DOM
    document.body.appendChild(tooltip);
    this.currentTooltip = tooltip;
  }

  /**
   * Oculta o tooltip
   */
  hideTooltip() {
    if (this.currentTooltip) {
      this.currentTooltip.remove();
      this.currentTooltip = null;
    }
  }

  /**
   * Extrai o preço numérico do texto
   */
  extractPrice(priceText) {
    const match = priceText.match(/R\$\s*(\d+(?:,\d{2})?)/);
    return match ? parseFloat(match[1].replace(",", ".")) : 0;
  }

  /**
   * Filtra os produtos baseado na busca e categoria
   */
  filterProducts() {
    const searchTerm = this.searchInput?.value.toLowerCase() || "";
    const selectedCategory = this.categoryFilter?.value || "";

    this.filteredProducts = this.allProducts.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.includes(searchTerm) ||
        product.description.includes(searchTerm);

      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    this.updateProductVisibility();
    this.updateResultsCount();
    this.sortProducts();
  }

  /**
   * Ordena os produtos filtrados
   */
  sortProducts() {
    const sortValue = this.sortSelect?.value || "name-asc";

    this.filteredProducts.sort((a, b) => {
      switch (sortValue) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "recent":
          return b.originalIndex - a.originalIndex;
        default:
          return 0;
      }
    });

    this.updateProductVisibility();
  }

  /**
   * Atualiza a visibilidade dos produtos
   */
  updateProductVisibility() {
    // Oculta todos os produtos
    this.allProducts.forEach((product) => {
      product.element.style.display = "none";
    });

    // Mostra apenas os produtos filtrados
    this.filteredProducts.forEach((product) => {
      product.element.style.display = "block";
    });
  }

  /**
   * Atualiza o contador de resultados
   */
  updateResultsCount() {
    if (this.resultsCount) {
      const total = this.allProducts.length;
      const filtered = this.filteredProducts.length;

      if (filtered === total) {
        this.resultsCount.textContent = `Mostrando todos os ${total} produtos`;
      } else {
        this.resultsCount.textContent = `Mostrando ${filtered} de ${total} produtos`;
      }
    }
  }

  /**
   * Atualiza a visibilidade dos elementos
   */
  refreshVisibility() {
    this.checkLoginStatus();
    this.applyVisibilityRules();
  }
}

// Inicializa o controlador quando o script é carregado
const productsController = new ProductsController();

// Exporta para uso global se necessário
window.ProductsController = ProductsController;
window.productsController = productsController;

// Função global para atualizar visibilidade (pode ser chamada do console)
window.refreshProducts = () => productsController.refreshVisibility();
