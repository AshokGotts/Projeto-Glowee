# 🧩 Componentes - Glowee

## Botões

### **Botão Primário**
```css
.btn-primary {
  background: var(--primary-dark);
  color: var(--white);
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--primary);
  transform: translateY(-2px);
}
```

### **Botão Secundário**
```css
.btn-secondary {
  background: var(--secondary);
  color: var(--primary-dark);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 6px;
  border: 2px solid var(--primary);
  transition: all 0.3s ease;
}
```

### **Botão de Texto**
```css
.btn-text {
  background: transparent;
  color: var(--primary);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  padding: 8px 16px;
  border: none;
  text-decoration: underline;
}
```

## Cards

### **Card de Produto**
```css
.product-card {
  background: var(--white);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(2, 43, 58, 0.1);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(2, 43, 58, 0.15);
}
```

### **Card de Informação**
```css
.info-card {
  background: var(--light);
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid var(--primary);
}
```

## Formulários

### **Input Padrão**
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--light);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(31, 122, 140, 0.1);
}
```

### **Label**
```css
.form-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: var(--primary-dark);
  margin-bottom: 8px;
  display: block;
}
```

## Navegação

### **Header**
```css
.header {
  background: var(--white);
  padding: 16px 0;
  box-shadow: 0 2px 4px rgba(2, 43, 58, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}
```

### **Menu de Navegação**
```css
.nav-menu {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-link {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: var(--primary-dark);
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
}
```

## Layout

### **Container**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 0 24px;
  }
}
```

### **Grid de Produtos**
```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px 0;
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 32px;
  }
}
```

## Estados

### **Loading**
```css
.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--light);
  border-radius: 50%;
  border-top-color: var(--primary);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### **Error**
```css
.error-message {
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #c33;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
}
```

### **Success**
```css
.success-message {
  background: #efe;
  color: #363;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #363;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
}
```

## Espaçamentos

### **Sistema de Espaçamento**
```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
}
```

---
*Sistema de componentes definido para o projeto Glowee*
*Data: Janeiro 2025*
