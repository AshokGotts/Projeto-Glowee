/**
 * Sales Controller - Glowee
 * Gerencia a página de vendas e suas funcionalidades
 */

class SalesController {
  constructor() {
    this.searchInput = null;
    this.categoryFilter = null;
    this.resultsCount = null;
    this.salesTable = null;
    this.noResults = null;
    this.allSales = [];
    this.filteredSales = [];

    this.init();
  }

  /**
   * Inicializa o controlador de vendas
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
    // Configura os elementos de filtro e busca
    this.setupFilterElements();

    // Inicializa as vendas
    this.initializeSales();
  }

  /**
   * Configura os elementos de filtro e busca
   */
  setupFilterElements() {
    this.searchInput = document.getElementById("salesSearch");
    this.categoryFilter = document.getElementById("categoryFilter");
    this.resultsCount = document.getElementById("resultsCount");
    this.salesTable = document.getElementById("salesTable");
    this.noResults = document.getElementById("noResults");

    // Event listeners para busca
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => this.filterSales());
    }

    // Event listeners para filtro de categoria
    if (this.categoryFilter) {
      this.categoryFilter.addEventListener("change", () => this.filterSales());
    }
  }

  /**
   * Inicializa as vendas
   */
  initializeSales() {
    const saleRows = document.querySelectorAll(".sale-row");
    this.allSales = Array.from(saleRows).map((row, index) => {
      const name = row.querySelector(".product-name")?.textContent || "";
      const description =
        row.querySelector(".product-description")?.textContent || "";
      const category =
        row.querySelector(".product-category .category-badge")?.textContent ||
        "";
      const priceText = row.querySelector(".product-price")?.textContent || "";
      const date = row.querySelector(".sale-date")?.textContent || "";

      return {
        element: row,
        name: name.toLowerCase(),
        description: description.toLowerCase(),
        category: category,
        price: this.extractPrice(priceText),
        date: date,
        originalIndex: index,
      };
    });

    this.filteredSales = [...this.allSales];
    this.updateResultsCount();
  }

  /**
   * Extrai o preço numérico do texto
   */
  extractPrice(priceText) {
    const match = priceText.match(/R\$\s*(\d+(?:,\d{2})?)/);
    return match ? parseFloat(match[1].replace(",", ".")) : 0;
  }

  /**
   * Filtra as vendas baseado na busca e categoria
   */
  filterSales() {
    const searchTerm = this.searchInput?.value.toLowerCase() || "";
    const selectedCategory = this.categoryFilter?.value || "";

    this.filteredSales = this.allSales.filter((sale) => {
      const matchesSearch =
        !searchTerm ||
        sale.name.includes(searchTerm) ||
        sale.description.includes(searchTerm) ||
        sale.category.toLowerCase().includes(searchTerm);

      const matchesCategory =
        !selectedCategory || sale.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    this.updateSalesVisibility();
    this.updateResultsCount();
  }

  /**
   * Atualiza a visibilidade das vendas
   */
  updateSalesVisibility() {
    // Oculta todas as vendas
    this.allSales.forEach((sale) => {
      sale.element.style.display = "none";
    });

    // Mostra apenas as vendas filtradas
    this.filteredSales.forEach((sale) => {
      sale.element.style.display = "";
    });

    // Mostra/oculta mensagem de "nenhum resultado"
    if (this.filteredSales.length === 0) {
      this.salesTable.style.display = "none";
      this.noResults.style.display = "block";
    } else {
      this.salesTable.style.display = "table";
      this.noResults.style.display = "none";
    }
  }

  /**
   * Atualiza o contador de resultados
   */
  updateResultsCount() {
    if (this.resultsCount) {
      const total = this.allSales.length;
      const filtered = this.filteredSales.length;

      if (filtered === total) {
        this.resultsCount.textContent = `Mostrando todas as ${total} vendas`;
      } else {
        this.resultsCount.textContent = `Mostrando ${filtered} de ${total} vendas`;
      }
    }
  }

  /**
   * Adiciona uma nova venda à tabela
   */
  addSale(saleData) {
    const tbody = this.salesTable.querySelector("tbody");
    const newRow = document.createElement("tr");
    newRow.className = "sale-row";

    newRow.innerHTML = `
      <td class="product-name">${saleData.name}</td>
      <td class="product-description">${saleData.description}</td>
      <td class="product-category">
        <span class="category-badge category-${saleData.category.toLowerCase()}">${
      saleData.category
    }</span>
      </td>
      <td class="product-price">R$ ${saleData.price
        .toFixed(2)
        .replace(".", ",")}</td>
      <td class="sale-date">${saleData.date}</td>
    `;

    tbody.appendChild(newRow);

    // Atualiza a lista de vendas
    this.initializeSales();
    this.filterSales();
  }

  /**
   * Remove uma venda da tabela
   */
  removeSale(saleIndex) {
    if (saleIndex >= 0 && saleIndex < this.allSales.length) {
      this.allSales[saleIndex].element.remove();
      this.initializeSales();
      this.filterSales();
    }
  }

  /**
   * Limpa todos os filtros
   */
  clearFilters() {
    if (this.searchInput) {
      this.searchInput.value = "";
    }
    if (this.categoryFilter) {
      this.categoryFilter.value = "";
    }
    this.filterSales();
  }

  /**
   * Exporta as vendas filtradas para CSV
   */
  exportToCSV() {
    if (this.filteredSales.length === 0) {
      alert("Não há vendas para exportar.");
      return;
    }

    const headers = [
      "Produto",
      "Descrição",
      "Categoria",
      "Preço",
      "Data da Venda",
    ];
    const csvContent = [
      headers.join(","),
      ...this.filteredSales.map((sale) =>
        [
          `"${sale.element.querySelector(".product-name").textContent}"`,
          `"${sale.element.querySelector(".product-description").textContent}"`,
          `"${sale.category}"`,
          `"${sale.element.querySelector(".product-price").textContent}"`,
          `"${sale.date}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `vendas_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Calcula estatísticas das vendas
   */
  getSalesStats() {
    const totalSales = this.filteredSales.length;
    const totalRevenue = this.filteredSales.reduce(
      (sum, sale) => sum + sale.price,
      0
    );
    const averagePrice = totalSales > 0 ? totalRevenue / totalSales : 0;

    const categoryStats = {};
    this.filteredSales.forEach((sale) => {
      categoryStats[sale.category] = (categoryStats[sale.category] || 0) + 1;
    });

    return {
      totalSales,
      totalRevenue,
      averagePrice,
      categoryStats,
    };
  }
}

// Inicializa o controlador quando o script é carregado
const salesController = new SalesController();

// Exporta para uso global se necessário
window.SalesController = SalesController;
window.salesController = salesController;

// Funções globais para demonstração (podem ser chamadas do console)
window.clearSalesFilters = () => salesController.clearFilters();
window.exportSalesCSV = () => salesController.exportToCSV();
window.getSalesStats = () => salesController.getSalesStats();
