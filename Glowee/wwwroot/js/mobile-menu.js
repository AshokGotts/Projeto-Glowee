/**
 * Mobile Menu Controller - Glowee
 * Gerencia o comportamento do menu hambúrguer mobile
 */

class MobileMenuController {
  constructor() {
    this.menuToggle = null;
    this.mobileMenuDropdown = null;
    this.menuIcon = null;
    this.isMenuOpen = false;

    this.init();
  }

  /**
   * Inicializa o controlador do menu mobile
   */
  init() {
    // Aguarda o DOM estar carregado
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
    this.menuToggle = document.getElementById("menuToggle");
    this.mobileMenuDropdown = document.getElementById("mobileMenuDropdown");

    if (!this.menuToggle || !this.mobileMenuDropdown) {
      console.warn("Elementos do menu mobile não encontrados");
      return;
    }

    this.menuIcon = this.menuToggle.querySelector("i");
    this.setupEventListeners();
  }

  /**
   * Configura os event listeners
   */
  setupEventListeners() {
    // Toggle do menu ao clicar no botão
    this.menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        this.isMenuOpen &&
        !this.menuToggle.contains(e.target) &&
        !this.mobileMenuDropdown.contains(e.target)
      ) {
        this.closeMenu();
      }
    });

    // Fechar menu ao pressionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  /**
   * Alterna o estado do menu (abrir/fechar)
   */
  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  /**
   * Abre o menu mobile
   */
  openMenu() {
    this.mobileMenuDropdown.classList.add("show");
    this.menuIcon.classList.remove("fa-bars");
    this.menuIcon.classList.add("fa-times");
    this.isMenuOpen = true;

    // Adiciona classe ao body para evitar scroll
    document.body.classList.add("menu-open");

    // Foca no primeiro link do menu para acessibilidade
    const firstLink =
      this.mobileMenuDropdown.querySelector(".mobile-menu-link");
    if (firstLink) {
      firstLink.focus();
    }
  }

  /**
   * Fecha o menu mobile
   */
  closeMenu() {
    this.mobileMenuDropdown.classList.remove("show");
    this.menuIcon.classList.remove("fa-times");
    this.menuIcon.classList.add("fa-bars");
    this.isMenuOpen = false;

    // Remove classe do body
    document.body.classList.remove("menu-open");

    // Retorna foco para o botão toggle
    this.menuToggle.focus();
  }

  /**
   * Verifica se o menu está aberto
   */
  isOpen() {
    return this.isMenuOpen;
  }
}

// Inicializa o controlador quando o script é carregado
const mobileMenu = new MobileMenuController();

// Exporta para uso global se necessário
window.MobileMenuController = MobileMenuController;
window.mobileMenu = mobileMenu;
