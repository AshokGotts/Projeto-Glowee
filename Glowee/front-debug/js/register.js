/**
 * Register Controller - Glowee
 * Gerencia o formulário de cadastro e suas funcionalidades
 */

class RegisterController {
  constructor() {
    this.form = null;
    this.fullNameInput = null;
    this.emailInput = null;
    this.passwordInput = null;
    this.confirmPasswordInput = null;
    this.passwordToggle = null;
    this.confirmPasswordToggle = null;
    this.submitButton = null;
    this.isSubmitting = false;

    this.init();
  }

  /**
   * Inicializa o controlador de cadastro
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
    this.form = document.getElementById("registerForm");
    this.fullNameInput = document.getElementById("fullName");
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.confirmPasswordInput = document.getElementById("confirmPassword");
    this.passwordToggle = document.getElementById("passwordToggle");
    this.confirmPasswordToggle = document.getElementById(
      "confirmPasswordToggle"
    );
    this.submitButton = this.form?.querySelector(".register-btn");

    if (
      !this.form ||
      !this.fullNameInput ||
      !this.emailInput ||
      !this.passwordInput ||
      !this.confirmPasswordInput
    ) {
      console.warn("Elementos do formulário de cadastro não encontrados");
      return;
    }

    this.setupEventListeners();
  }

  /**
   * Configura os event listeners
   */
  setupEventListeners() {
    // Submit do formulário
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Toggle de visibilidade das senhas
    if (this.passwordToggle) {
      this.passwordToggle.addEventListener("click", () =>
        this.togglePasswordVisibility(this.passwordInput, this.passwordToggle)
      );
    }

    if (this.confirmPasswordToggle) {
      this.confirmPasswordToggle.addEventListener("click", () =>
        this.togglePasswordVisibility(
          this.confirmPasswordInput,
          this.confirmPasswordToggle
        )
      );
    }

    // Validação em tempo real
    this.fullNameInput.addEventListener("blur", () => this.validateFullName());
    this.emailInput.addEventListener("blur", () => this.validateEmail());
    this.passwordInput.addEventListener("blur", () => this.validatePassword());
    this.confirmPasswordInput.addEventListener("blur", () =>
      this.validateConfirmPassword()
    );

    // Limpar erros ao digitar
    this.fullNameInput.addEventListener("input", () =>
      this.clearFieldError(this.fullNameInput)
    );
    this.emailInput.addEventListener("input", () =>
      this.clearFieldError(this.emailInput)
    );
    this.passwordInput.addEventListener("input", () =>
      this.clearFieldError(this.passwordInput)
    );
    this.confirmPasswordInput.addEventListener("input", () =>
      this.clearFieldError(this.confirmPasswordInput)
    );

    // Validação de confirmação de senha em tempo real
    this.passwordInput.addEventListener("input", () => {
      if (this.confirmPasswordInput.value) {
        this.validateConfirmPassword();
      }
    });
  }

  /**
   * Manipula o envio do formulário
   */
  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) return;

    // Validação dos campos
    const isFullNameValid = this.validateFullName();
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    const isConfirmPasswordValid = this.validateConfirmPassword();

    if (
      !isFullNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      this.showFormError("Por favor, corrija os erros no formulário");
      return;
    }

    // Dados do formulário
    const formData = {
      fullName: this.fullNameInput.value.trim(),
      email: this.emailInput.value.trim(),
      password: this.passwordInput.value,
    };

    try {
      this.setLoadingState(true);
      await this.submitRegister(formData);
    } catch (error) {
      this.handleRegisterError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Envia os dados de cadastro
   */
  async submitRegister(formData) {
    // Simulação de requisição (substitua pela sua API real)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulação de sucesso
        if (formData.email && formData.password && formData.fullName) {
          resolve({
            success: true,
            message: "Cadastro realizado com sucesso!",
          });
        } else {
          reject({ success: false, message: "Erro ao processar cadastro" });
        }
      }, 1500);
    });
  }

  /**
   * Manipula erro de cadastro
   */
  handleRegisterError(error) {
    console.error("Erro no cadastro:", error);
    this.showFormError(
      error.message || "Erro ao fazer cadastro. Tente novamente."
    );
  }

  /**
   * Valida o campo de nome completo
   */
  validateFullName() {
    const fullName = this.fullNameInput.value.trim();

    if (!fullName) {
      this.showFieldError(this.fullNameInput, "Nome completo é obrigatório");
      return false;
    }

    if (fullName.length < 2) {
      this.showFieldError(
        this.fullNameInput,
        "Nome deve ter pelo menos 2 caracteres"
      );
      return false;
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(fullName)) {
      this.showFieldError(
        this.fullNameInput,
        "Nome deve conter apenas letras e espaços"
      );
      return false;
    }

    this.showFieldSuccess(this.fullNameInput);
    return true;
  }

  /**
   * Valida o campo de e-mail
   */
  validateEmail() {
    const email = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.showFieldError(this.emailInput, "E-mail é obrigatório");
      return false;
    }

    if (!emailRegex.test(email)) {
      this.showFieldError(this.emailInput, "E-mail inválido");
      return false;
    }

    this.showFieldSuccess(this.emailInput);
    return true;
  }

  /**
   * Valida o campo de senha
   */
  validatePassword() {
    const password = this.passwordInput.value;

    if (!password) {
      this.showFieldError(this.passwordInput, "Senha é obrigatória");
      return false;
    }

    if (password.length < 6) {
      this.showFieldError(
        this.passwordInput,
        "Senha deve ter pelo menos 6 caracteres"
      );
      return false;
    }

    if (password.length > 50) {
      this.showFieldError(
        this.passwordInput,
        "Senha deve ter no máximo 50 caracteres"
      );
      return false;
    }

    this.showFieldSuccess(this.passwordInput);
    return true;
  }

  /**
   * Valida o campo de confirmação de senha
   */
  validateConfirmPassword() {
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;

    if (!confirmPassword) {
      this.showFieldError(
        this.confirmPasswordInput,
        "Confirmação de senha é obrigatória"
      );
      return false;
    }

    if (password !== confirmPassword) {
      this.showFieldError(this.confirmPasswordInput, "Senhas não coincidem");
      return false;
    }

    this.showFieldSuccess(this.confirmPasswordInput);
    return true;
  }

  /**
   * Alterna a visibilidade da senha
   */
  togglePasswordVisibility(input, toggle) {
    const icon = toggle.querySelector("i");

    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }

  /**
   * Define o estado de carregamento
   */
  setLoadingState(loading) {
    this.isSubmitting = loading;

    if (loading) {
      this.submitButton.classList.add("loading");
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove("loading");
      this.submitButton.disabled = false;
    }
  }

  /**
   * Mostra erro em um campo específico
   */
  showFieldError(field, message) {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");

    this.removeFieldMessage(field);

    const errorDiv = document.createElement("div");
    errorDiv.className = "form-error";
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  /**
   * Mostra sucesso em um campo específico
   */
  showFieldSuccess(field) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    this.removeFieldMessage(field);
  }

  /**
   * Remove mensagem de erro/sucesso de um campo
   */
  clearFieldError(field) {
    field.classList.remove("is-invalid", "is-valid");
    this.removeFieldMessage(field);
  }

  /**
   * Remove mensagem de campo
   */
  removeFieldMessage(field) {
    const existingMessage = field.parentNode.querySelector(
      ".form-error, .form-success"
    );
    if (existingMessage) {
      existingMessage.remove();
    }
  }

  /**
   * Mostra erro geral do formulário
   */
  showFormError(message) {
    this.removeFormMessage();

    const errorDiv = document.createElement("div");
    errorDiv.className = "form-error";
    errorDiv.style.textAlign = "center";
    errorDiv.style.marginTop = "var(--space-md)";
    errorDiv.textContent = message;

    this.form.appendChild(errorDiv);

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
      this.removeFormMessage();
    }, 5000);
  }

  /**
   * Mostra sucesso do formulário
   */
  showFormSuccess(message) {
    this.removeFormMessage();

    const successDiv = document.createElement("div");
    successDiv.className = "form-success";
    successDiv.style.textAlign = "center";
    successDiv.style.marginTop = "var(--space-md)";
    successDiv.textContent = message;

    this.form.appendChild(successDiv);

    // Redireciona para login após 2 segundos
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }

  /**
   * Remove mensagem do formulário
   */
  removeFormMessage() {
    const existingMessage = this.form.querySelector(
      ".form-error, .form-success"
    );
    if (existingMessage) {
      existingMessage.remove();
    }
  }
}

// Inicializa o controlador quando o script é carregado
const registerController = new RegisterController();

// Exporta para uso global se necessário
window.RegisterController = RegisterController;
window.registerController = registerController;
