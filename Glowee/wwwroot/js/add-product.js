/**
 * Add Product Controller - Glowee
 * Gerencia a página de cadastro de produto e suas funcionalidades
 */

class AddProductController {
  constructor() {
    this.form = null;
    this.clearButton = null;
    this.submitButton = null;
    this.productName = null;
    this.productDescription = null;
    this.productCategory = null;
    this.productPrice = null;
    this.productImage = null;

    this.init();
  }

  /**
   * Inicializa o controlador de cadastro de produto
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
    // Configura o formulário e seus elementos
    this.setupFormElements();

    // Configura os event listeners
    this.setupEventListeners();
  }

  /**
   * Configura os elementos do formulário
   */
  setupFormElements() {
    this.form = document.getElementById("addProductForm");
    this.clearButton = document.getElementById("clearButton");
    this.submitButton = document.getElementById("submitButton");
    this.productName = document.getElementById("productName");
    this.productDescription = document.getElementById("productDescription");
    this.productCategory = document.getElementById("productCategory");
    this.productPrice = document.getElementById("productPrice");
    this.productImage = document.getElementById("productImage");
  }

  /**
   * Configura os event listeners
   */
  setupEventListeners() {
    // Event listener para o botão limpar
    if (this.clearButton) {
      this.clearButton.addEventListener("click", () => this.clearForm());
    }

    // Event listener para o formulário
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    // Event listeners para validação em tempo real
    if (this.productName) {
      this.productName.addEventListener("blur", () =>
        this.validateProductName()
      );
    }

    if (this.productDescription) {
      this.productDescription.addEventListener("blur", () =>
        this.validateProductDescription()
      );
    }

    if (this.productCategory) {
      this.productCategory.addEventListener("change", () =>
        this.validateProductCategory()
      );
    }

    if (this.productPrice) {
      this.productPrice.addEventListener("blur", () =>
        this.validateProductPrice()
      );
    }

    if (this.productImage) {
      this.productImage.addEventListener("change", () =>
        this.validateProductImage()
      );
    }
  }

  /**
   * Limpa todos os campos do formulário
   */
  clearForm() {
    if (this.productName) this.productName.value = "";
    if (this.productDescription) this.productDescription.value = "";
    if (this.productCategory) this.productCategory.value = "";
    if (this.productPrice) this.productPrice.value = "";
    if (this.productImage) this.productImage.value = "";

    // Remove mensagens de erro
    this.clearValidationMessages();

    // Foca no primeiro campo
    if (this.productName) {
      this.productName.focus();
    }

    // Mostra feedback visual
    this.showMessage("Formulário limpo com sucesso!", "success");
  }

  /**
   * Remove todas as mensagens de validação
   */
  clearValidationMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((message) => message.remove());

    const formControls = document.querySelectorAll(
      ".form-control, .form-select"
    );
    formControls.forEach((control) => {
      control.classList.remove("is-invalid");
    });
  }

  /**
   * Valida o nome do produto
   */
  validateProductName() {
    const value = this.productName.value.trim();
    const isValid = value.length >= 3 && value.length <= 100;

    this.setFieldValidation(
      this.productName,
      isValid,
      "Nome deve ter entre 3 e 100 caracteres"
    );
    return isValid;
  }

  /**
   * Valida a descrição do produto
   */
  validateProductDescription() {
    const value = this.productDescription.value.trim();
    const isValid = value.length >= 10 && value.length <= 500;

    this.setFieldValidation(
      this.productDescription,
      isValid,
      "Descrição deve ter entre 10 e 500 caracteres"
    );
    return isValid;
  }

  /**
   * Valida a categoria do produto
   */
  validateProductCategory() {
    const value = this.productCategory.value;
    const isValid = value !== "";

    this.setFieldValidation(
      this.productCategory,
      isValid,
      "Selecione uma categoria"
    );
    return isValid;
  }

  /**
   * Valida o preço do produto
   */
  validateProductPrice() {
    const value = parseFloat(this.productPrice.value);
    const isValid = !isNaN(value) && value > 0 && value <= 10000;

    this.setFieldValidation(
      this.productPrice,
      isValid,
      "Preço deve ser entre R$ 0,01 e R$ 10.000,00"
    );
    return isValid;
  }

  /**
   * Valida a imagem do produto
   */
  validateProductImage() {
    const file = this.productImage.files[0];
    let isValid = false;
    let errorMessage = "";

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        errorMessage = "Formato inválido. Use JPG, PNG ou GIF";
      } else if (file.size > maxSize) {
        errorMessage = "Arquivo muito grande. Máximo 5MB";
      } else {
        isValid = true;
      }
    } else {
      errorMessage = "Selecione uma imagem";
    }

    this.setFieldValidation(this.productImage, isValid, errorMessage);
    return isValid;
  }

  /**
   * Define a validação de um campo
   */
  setFieldValidation(field, isValid, errorMessage) {
    // Remove mensagens de erro anteriores
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Remove classes de validação
    field.classList.remove("is-valid", "is-invalid");

    if (isValid) {
      field.classList.add("is-valid");
    } else {
      field.classList.add("is-invalid");

      // Adiciona mensagem de erro
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.style.color = "#dc3545";
      errorDiv.style.fontSize = "0.875rem";
      errorDiv.style.marginTop = "0.25rem";
      errorDiv.textContent = errorMessage;

      field.parentNode.appendChild(errorDiv);
    }
  }

  /**
   * Valida todo o formulário
   */
  validateForm() {
    const isNameValid = this.validateProductName();
    const isDescriptionValid = this.validateProductDescription();
    const isCategoryValid = this.validateProductCategory();
    const isPriceValid = this.validateProductPrice();
    const isImageValid = this.validateProductImage();

    return (
      isNameValid &&
      isDescriptionValid &&
      isCategoryValid &&
      isPriceValid &&
      isImageValid
    );
  }

  /**
   * Manipula o envio do formulário
   */
  async handleSubmit(event) {
    if (this.isSubmitting) {
      event.preventDefault();
      return;
    }

    // Valida o formulário
    if (!this.validateForm()) {
      event.preventDefault();
      this.showMessage("Por favor, corrija os erros no formulário", "error");
      return;
    }

    // Se a validação passou, permite o envio do formulário
    this.setLoadingState(true);
  }

  /**
   * Define o estado de carregamento
   */
  setLoadingState(isLoading) {
    if (this.submitButton) {
      this.submitButton.disabled = isLoading;

      if (isLoading) {
        this.submitButton.classList.add("loading");
        this.submitButton.innerHTML =
          '<i class="fas fa-spinner fa-spin me-2"></i>Cadastrando...';
      } else {
        this.submitButton.classList.remove("loading");
        this.submitButton.innerHTML =
          '<i class="fas fa-plus me-2"></i>Registrar';
      }
    }

    if (this.clearButton) {
      this.clearButton.disabled = isLoading;
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
   * Formata o preço para exibição
   */
  formatPrice(price) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  }

  /**
   * Gera um preview da imagem selecionada
   */
  generateImagePreview(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }
}

// Inicializa o controlador quando o script é carregado
const addProductController = new AddProductController();

// Exporta para uso global se necessário
window.AddProductController = AddProductController;
window.addProductController = addProductController;
