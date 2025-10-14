/**
 * Manage Vendors Controller - Glowee
 * Gerencia a página de gerenciamento de vendedores e suas funcionalidades
 */

class ManageVendorsController {
  constructor() {
    this.searchInput = null;
    this.resultsCount = null;
    this.vendorsTable = null;
    this.noResults = null;
    this.deleteModal = null;
    this.confirmDeleteButton = null;
    this.vendorNameToDelete = null;
    this.allVendors = [];
    this.filteredVendors = [];
    this.vendorToDelete = null;

    this.init();
  }

  /**
   * Inicializa o controlador de gerenciamento de vendedores
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
    // Configura os elementos de busca
    this.setupSearchElements();

    // Inicializa os vendedores
    this.initializeVendors();

    // Configura o modal de exclusão
    this.setupDeleteModal();

    // Configura os event listeners
    this.setupEventListeners();
  }

  /**
   * Configura os elementos de busca
   */
  setupSearchElements() {
    this.searchInput = document.getElementById("vendorsSearch");
    this.resultsCount = document.getElementById("resultsCount");
    this.vendorsTable = document.getElementById("vendorsTable");
    this.noResults = document.getElementById("noResults");
  }

  /**
   * Configura o modal de exclusão
   */
  setupDeleteModal() {
    this.deleteModal = new bootstrap.Modal(
      document.getElementById("deleteModal")
    );
    this.confirmDeleteButton = document.getElementById("confirmDelete");
    this.vendorNameToDelete = document.getElementById("vendorNameToDelete");
  }

  /**
   * Configura os event listeners
   */
  setupEventListeners() {
    // Event listener para busca
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => this.filterVendors());
    }

    // Event listeners para botões de exclusão
    this.setupDeleteButtons();

    // Event listener para confirmação de exclusão
    if (this.confirmDeleteButton) {
      this.confirmDeleteButton.addEventListener("click", () =>
        this.confirmDelete()
      );
    }
  }

  /**
   * Configura os botões de exclusão
   */
  setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-vendor");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const vendorId = e.target.getAttribute("data-vendor-id");
        const vendorName = e.target.getAttribute("data-vendor-name");
        this.showDeleteModal(vendorId, vendorName);
      });
    });
  }

  /**
   * Inicializa os vendedores
   */
  initializeVendors() {
    const vendorRows = document.querySelectorAll(".vendor-row");
    const vendorCards = document.querySelectorAll(".vendor-card");

    // Inicializa vendedores da tabela
    this.allVendors = Array.from(vendorRows).map((row, index) => {
      const name = row.querySelector(".vendor-name span")?.textContent || "";
      const email = row.querySelector(".vendor-email")?.textContent || "";
      const salesCount = row.querySelector(".sales-count")?.textContent || "";
      const salesTotal = row.querySelector(".sales-total")?.textContent || "";

      return {
        element: row,
        cardElement: vendorCards[index], // Associa o card correspondente
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        salesCount: salesCount,
        salesTotal: salesTotal,
        originalIndex: index,
      };
    });

    this.filteredVendors = [...this.allVendors];
    this.updateResultsCount();
  }

  /**
   * Filtra os vendedores baseado na busca
   */
  filterVendors() {
    const searchTerm = this.searchInput?.value.toLowerCase() || "";

    this.filteredVendors = this.allVendors.filter((vendor) => {
      const matchesSearch =
        !searchTerm ||
        vendor.name.includes(searchTerm) ||
        vendor.email.includes(searchTerm);

      return matchesSearch;
    });

    this.updateVendorsVisibility();
    this.updateResultsCount();
  }

  /**
   * Atualiza a visibilidade dos vendedores
   */
  updateVendorsVisibility() {
    // Oculta todos os vendedores (tabela e cards)
    this.allVendors.forEach((vendor) => {
      if (vendor.element) {
        vendor.element.style.display = "none";
      }
      if (vendor.cardElement) {
        vendor.cardElement.style.display = "none";
      }
    });

    // Mostra apenas os vendedores filtrados (tabela e cards)
    this.filteredVendors.forEach((vendor) => {
      if (vendor.element) {
        vendor.element.style.display = "";
      }
      if (vendor.cardElement) {
        vendor.cardElement.style.display = "block";
      }
    });

    // Mostra/oculta mensagem de "nenhum resultado"
    if (this.filteredVendors.length === 0) {
      if (this.vendorsTable) {
        this.vendorsTable.style.display = "none";
      }
      this.noResults.style.display = "block";
    } else {
      if (this.vendorsTable) {
        this.vendorsTable.style.display = "table";
      }
      this.noResults.style.display = "none";
    }
  }

  /**
   * Atualiza o contador de resultados
   */
  updateResultsCount() {
    if (this.resultsCount) {
      const total = this.allVendors.length;
      const filtered = this.filteredVendors.length;

      if (filtered === total) {
        this.resultsCount.textContent = `Mostrando todos os ${total} vendedores`;
      } else {
        this.resultsCount.textContent = `Mostrando ${filtered} de ${total} vendedores`;
      }
    }
  }

  /**
   * Mostra o modal de confirmação de exclusão
   */
  showDeleteModal(vendorId, vendorName) {
    this.vendorToDelete = {
      id: vendorId,
      name: vendorName,
    };

    if (this.vendorNameToDelete) {
      this.vendorNameToDelete.textContent = vendorName;
    }

    this.deleteModal.show();
  }

  /**
   * Confirma a exclusão do vendedor
   */
  async confirmDelete() {
    if (!this.vendorToDelete) return;

    // Mostra estado de carregamento
    this.setDeleteButtonLoading(true);

    try {
      // Simula a exclusão (substitua por chamada real à API)
      await this.deleteVendor(this.vendorToDelete.id);

      // Remove o vendedor da lista
      this.removeVendorFromList(this.vendorToDelete.id);

      // Fecha o modal
      this.deleteModal.hide();

      // Mostra mensagem de sucesso
      this.showMessage(
        `Vendedor ${this.vendorToDelete.name} excluído com sucesso!`,
        "success"
      );

      // Limpa a referência
      this.vendorToDelete = null;
    } catch (error) {
      // Mostra mensagem de erro
      this.showMessage("Erro ao excluir vendedor. Tente novamente.", "error");
      console.error("Erro ao excluir vendedor:", error);
    } finally {
      // Remove estado de carregamento
      this.setDeleteButtonLoading(false);
    }
  }

  /**
   * Simula a exclusão do vendedor
   */
  async deleteVendor(vendorId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simula sucesso 90% das vezes
        if (Math.random() > 0.1) {
          resolve({ id: vendorId, deleted: true });
        } else {
          reject(new Error("Erro simulado"));
        }
      }, 1500);
    });
  }

  /**
   * Remove o vendedor da lista
   */
  removeVendorFromList(vendorId) {
    // Encontra e remove o vendedor da lista
    this.allVendors = this.allVendors.filter(
      (vendor) =>
        vendor.element.querySelector(`[data-vendor-id="${vendorId}"]`) === null
    );

    // Remove o elemento da tabela do DOM
    const vendorRow = document.querySelector(`[data-vendor-id="${vendorId}"]`);
    if (vendorRow) {
      vendorRow.closest("tr").remove();
    }

    // Remove o card correspondente do DOM
    const vendorCard = document.querySelector(
      `.vendor-card .delete-vendor[data-vendor-id="${vendorId}"]`
    );
    if (vendorCard) {
      vendorCard.closest(".vendor-card").remove();
    }

    // Atualiza a lista filtrada
    this.filterVendors();
  }

  /**
   * Define o estado de carregamento do botão de exclusão
   */
  setDeleteButtonLoading(isLoading) {
    if (this.confirmDeleteButton) {
      this.confirmDeleteButton.disabled = isLoading;

      if (isLoading) {
        this.confirmDeleteButton.innerHTML =
          '<i class="fas fa-spinner fa-spin me-2"></i>Excluindo...';
      } else {
        this.confirmDeleteButton.innerHTML =
          '<i class="fas fa-trash me-2"></i>Excluir';
      }
    }
  }

  /**
   * Mostra uma mensagem para o usuário
   */
  showMessage(message, type = "info") {
    // Remove mensagens anteriores
    const existingMessage = document.querySelector(".alert-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Cria nova mensagem
    const messageDiv = document.createElement("div");
    messageDiv.className = `alert-message alert alert-${
      type === "error" ? "danger" : type === "success" ? "success" : "info"
    }`;
    messageDiv.style.position = "fixed";
    messageDiv.style.top = "20px";
    messageDiv.style.right = "20px";
    messageDiv.style.zIndex = "9999";
    messageDiv.style.minWidth = "300px";
    messageDiv.style.fontFamily = "var(--font-primary)";
    messageDiv.innerHTML = `
      <i class="fas fa-${
        type === "error"
          ? "exclamation-triangle"
          : type === "success"
          ? "check-circle"
          : "info-circle"
      } me-2"></i>
      ${message}
    `;

    document.body.appendChild(messageDiv);

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }

  /**
   * Limpa a busca
   */
  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = "";
      this.filterVendors();
    }
  }

  /**
   * Adiciona um novo vendedor à lista
   */
  addVendor(vendorData) {
    const tbody = this.vendorsTable.querySelector("tbody");
    const newRow = document.createElement("tr");
    newRow.className = "vendor-row";

    newRow.innerHTML = `
      <td class="vendor-name">
        <div class="vendor-info">
          <i class="fas fa-user-circle vendor-avatar"></i>
          <span>${vendorData.name}</span>
        </div>
      </td>
      <td class="vendor-email">${vendorData.email}</td>
      <td class="vendor-sales">
        <span class="sales-count">${vendorData.salesCount}</span>
        <span class="sales-total">${vendorData.salesTotal}</span>
      </td>
      <td class="vendor-actions">
        <button class="btn btn-danger btn-sm delete-vendor" data-vendor-id="${vendorData.id}" data-vendor-name="${vendorData.name}">
          <i class="fas fa-trash me-1"></i>Excluir
        </button>
      </td>
    `;

    tbody.appendChild(newRow);

    // Atualiza a lista de vendedores
    this.initializeVendors();
    this.filterVendors();

    // Configura o novo botão de exclusão
    this.setupDeleteButtons();
  }

  /**
   * Obtém estatísticas dos vendedores
   */
  getVendorsStats() {
    const totalVendors = this.filteredVendors.length;
    const totalSales = this.filteredVendors.reduce((sum, vendor) => {
      const salesMatch = vendor.salesCount.match(/(\d+)/);
      return sum + (salesMatch ? parseInt(salesMatch[1]) : 0);
    }, 0);

    return {
      totalVendors,
      totalSales,
    };
  }
}

// Inicializa o controlador quando o script é carregado
const manageVendorsController = new ManageVendorsController();

// Exporta para uso global se necessário
window.ManageVendorsController = ManageVendorsController;
window.manageVendorsController = manageVendorsController;

// Funções globais para demonstração (podem ser chamadas do console)
window.clearVendorsSearch = () => manageVendorsController.clearSearch();
window.getVendorsStats = () => manageVendorsController.getVendorsStats();
