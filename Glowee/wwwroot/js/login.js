/**
 * Login Controller - Glowee
 * Gerencia o formulário de login e suas funcionalidades
 */

class LoginController {
  constructor() {
    this.form = null;
    this.emailInput = null;
    this.passwordInput = null;
    this.passwordToggle = null;
    this.submitButton = null;
    this.isSubmitting = false;

    this.init();
  }

  /**
   * Inicializa o controlador de login
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
    this.form = document.getElementById("loginForm");
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.passwordToggle = document.getElementById("passwordToggle");
    this.submitButton = this.form?.querySelector(".login-btn");

    if (!this.form || !this.emailInput || !this.passwordInput) {
      console.warn("Elementos do formulário de login não encontrados");
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

    // Toggle de visibilidade da senha
    if (this.passwordToggle) {
      this.passwordToggle.addEventListener("click", () =>
        this.togglePasswordVisibility()
      );
    }

    // Validação em tempo real
    this.emailInput.addEventListener("blur", () => this.validateEmail());
    this.passwordInput.addEventListener("blur", () => this.validatePassword());

    // Limpar erros ao digitar
    this.emailInput.addEventListener("input", () =>
      this.clearFieldError(this.emailInput)
    );
    this.passwordInput.addEventListener("input", () =>
      this.clearFieldError(this.passwordInput)
    );
  }

  /**
   * Manipula o envio do formulário
   */
  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) return;

    // Validação dos campos
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      this.showFormError("Por favor, corrija os erros no formulário");
      return;
    }

    // Dados do formulário
    const formData = {
      email: this.emailInput.value.trim(),
      password: this.passwordInput.value,
    };

    try {
      this.setLoadingState(true);
      await this.submitLogin(formData);
    } catch (error) {
      this.handleLoginError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Envia os dados de login
   */
  async submitLogin(formData) {
    // Simulação de requisição (substitua pela sua API real)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulação de credenciais válidas
        if (
          formData.email === "admin@glowee.com" &&
          formData.password === "123456"
        ) {
          resolve({ success: true, message: "Login realizado com sucesso!" });
        } else {
          reject({ success: false, message: "E-mail ou senha incorretos" });
        }
      }, 1500);
    });
  }

  /**
   * Manipula erro de login
   */
  handleLoginError(error) {
    console.error("Erro no login:", error);
    this.showFormError(
      error.message || "Erro ao fazer login. Tente novamente."
    );
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

    this.showFieldSuccess(this.passwordInput);
    return true;
  }

  /**
   * Alterna a visibilidade da senha
   */
  togglePasswordVisibility() {
    const icon = this.passwordToggle.querySelector("i");

    if (this.passwordInput.type === "password") {
      this.passwordInput.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      this.passwordInput.type = "password";
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
const loginController = new LoginController();

// Exporta para uso global se necessário
window.LoginController = LoginController;
window.loginController = loginController;
