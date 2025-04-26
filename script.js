/**
 * Portfólio Dev Junior
 * Script principal com funcionalidades de:
 * - Alternância de tema (Dark/Light)
 * - Efeito de digitação de texto
 * - Animações e interações
 * - Elemento surpresa no contato
 */

// Aguarda o DOM ser completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // Inicialização de Variáveis
  // =========================

  // Nome para o efeito de digitação (altere para o seu nome)
  const devName = "Arivelton Elias Valim";

  // Elementos do DOM
  const themeSwitcher = document.getElementById("theme-switcher");
  const body = document.body;
  const typingElement = document.querySelector(".typing-effect");
  const surpriseElement = document.getElementById("surpriseElement");
  const contactForm = document.getElementById("contactForm");
  const closeBtn = document.getElementById("closeBtn");
  const currentYearElement = document.getElementById("current-year");

  // =========================
  // Funcionalidade de Tema (Dark/Light)
  // =========================

  // Verificar se há um tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme");

  // Se houver um tema salvo, aplicá-lo
  if (savedTheme === "light") {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    themeSwitcher.checked = true;
  }

  // Função para alternar entre os temas
  function toggleTheme() {
    if (themeSwitcher.checked) {
      // Mudar para tema claro
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      // Mudar para tema escuro
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
  }

  // Adicionar evento de mudança ao switch de tema
  themeSwitcher.addEventListener("change", toggleTheme);

  // =========================
  // Efeito de Digitação
  // =========================

  // Função para criar o efeito de digitação
  function typeEffect(element, text, delay = 150, callback = null) {
    let index = 0;

    // Limpar o elemento antes de começar
    element.textContent = "";

    // Criar intervalo para adicionar uma letra por vez
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, delay);
  }

  // Iniciar o efeito de digitação após um pequeno delay
  setTimeout(() => {
    typeEffect(typingElement, devName);
  }, 500);

  // =========================
  // Interações de Habilidades
  // =========================

  // Selecionar todos os cards de habilidades
  const skillCards = document.querySelectorAll(".skill-card");

  // Adicionar eventos de mouse para cada card
  skillCards.forEach((card) => {
    // Efeito ao passar o mouse
    card.addEventListener("mouseenter", () => {
      // Efeito de destaque já está no CSS via :hover
    });

    // Efeito ao tirar o mouse
    card.addEventListener("mouseleave", () => {
      // Reset já está no CSS quando :hover termina
    });
  });

  // =========================
  // Elemento Surpresa no Contato
  // =========================

  // Função para mostrar o elemento surpresa
  function showSurpriseElement() {
    surpriseElement.classList.add("active");
  }

  // Função para esconder o elemento surpresa
  function hideSurpriseElement() {
    surpriseElement.classList.remove("active");
  }

  // Evento para o envio do formulário
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Impedir o envio padrão do formulário

      // Aqui você poderia adicionar validação de formulário
      // ou envio via AJAX para um backend

      // Mostrando o elemento surpresa
      showSurpriseElement();

      // Limpar o formulário
      contactForm.reset();
    });
  }

  // Evento para fechar o elemento surpresa
  if (closeBtn) {
    closeBtn.addEventListener("click", hideSurpriseElement);
  }

  // Fechar o elemento surpresa ao clicar fora dele
  surpriseElement.addEventListener("click", function (e) {
    if (e.target === this) {
      hideSurpriseElement();
    }
  });

  // =========================
  // Rolagem Suave para Âncoras
  // =========================

  // Selecionar todos os links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  // Adicionar evento de clique para rolagem suave
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calcular a posição de destino com um pequeno offset para o cabeçalho fixo
        const headerOffset = 80;
        const elementPos = targetElement.getBoundingClientRect().top;
        const offsetPos = elementPos + window.pageYOffset - headerOffset;

        // Rolar suavemente para o destino
        window.scrollTo({
          top: offsetPos,
          behavior: "smooth",
        });
      }
    });
  });

  // =========================
  // Efeitos de Animação ao Rolar
  // =========================

  // Função para verificar se um elemento está visível na viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Função para adicionar animações conforme o scroll
  function handleScrollAnimations() {
    // Animar cards de habilidades quando visíveis
    document.querySelectorAll(".skill-card").forEach((card) => {
      if (isInViewport(card) && !card.classList.contains("animated")) {
        card.classList.add("animated");
        card.style.animation = "fadeInUp 0.6s ease forwards";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        // Adicionar delay crescente para cada card
        const delay = Array.from(card.parentNode.children).indexOf(card) * 0.1;
        card.style.animationDelay = `${delay}s`;
      }
    });

    // Animar outras seções quando visíveis
    document.querySelectorAll("section h2").forEach((heading) => {
      if (isInViewport(heading) && !heading.classList.contains("animated")) {
        heading.classList.add("animated");
        heading.style.animation = "fadeInDown 0.6s ease forwards";
        heading.style.opacity = "0";
        heading.style.transform = "translateY(-20px)";
      }
    });
  }

  // Adicionar evento de scroll para acionar animações
  window.addEventListener("scroll", handleScrollAnimations);

  // Executar uma vez no carregamento para animar elementos já visíveis
  handleScrollAnimations();

  // =========================
  // Animação de Código no Elemento Surpresa
  // =========================

  // Adicionar animação ao código no elemento surpresa
  const codeElement = document.querySelector(".code-animation code");
  if (codeElement) {
    // Esta animação já está definida no CSS
  }

  // =========================
  // Configurações Adicionais
  // =========================

  // Atualizar o ano no rodapé
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // =========================
  // Melhorias de Performance
  // =========================

  // Usar um debounce para a função de scroll para melhorar performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Substituir o evento de scroll direto por uma versão com debounce
  window.removeEventListener("scroll", handleScrollAnimations);
  window.addEventListener("scroll", debounce(handleScrollAnimations, 10));

  // =========================
  // Inicialização de Animações
  // =========================

  // Configurar keyframes para as animações em CSS
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerHTML = `
      @keyframes fadeInUp {
          from {
              opacity: 0;
              transform: translateY(20px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
          }
      }
      
      @keyframes fadeInDown {
          from {
              opacity: 0;
              transform: translateY(-20px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
          }
      }
  `;
  document.head.appendChild(styleSheet);

  // =========================
  // Inicialização de Efeitos na Seção de Contato
  // =========================

  // Adicionar pequeno delay nos campos do formulário
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );
  formInputs.forEach((input, index) => {
    input.style.opacity = "0";
    input.style.transform = "translateY(10px)";
    input.style.animation = `fadeInUp 0.5s ease forwards ${0.3 + index * 0.1}s`;
  });

  // Efeito no botão de envio
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.style.opacity = "0";
    submitBtn.style.transform = "translateY(10px)";
    submitBtn.style.animation = `fadeInUp 0.5s ease forwards ${
      0.3 + formInputs.length * 0.1
    }s`;
  }

  // =========================
  // Preloader (opcional)
  // =========================

  // Função para mostrar que a página está totalmente carregada
  window.addEventListener("load", function () {
    // Aqui você poderia adicionar um preloader se desejasse
    console.log("Página totalmente carregada!");

    // Adicionar classe ao body para indicar que está pronto
    document.body.classList.add("page-loaded");
  });
});

/**
 * Keyframes das animações CSS adicionadas dinamicamente
 * via JavaScript acima, mas também poderiam ser adicionadas
 * diretamente no arquivo CSS.
 */
