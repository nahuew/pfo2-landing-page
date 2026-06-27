(function () {
  'use strict';

  /* ================================================================
     Mobile Menu Toggle
     ================================================================ */

  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('nav--open');
      hamburger.classList.toggle('hamburger--active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        hamburger.classList.remove('hamburger--active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ================================================================
     Header Scroll Shadow
     ================================================================ */

  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    });
  }

  /* ================================================================
     Scroll Reveal Animations
     ================================================================ */

  function initReveal() {
    const elements = document.querySelectorAll(
      '.hero__content, .hero__visual, .about__text, .about__stat, .card, .testimonial, .contact__form, .contact__info'
    );

    elements.forEach(function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  if ('IntersectionObserver' in window) {
    initReveal();
  }

  /* ================================================================
     Counter Animation (About stats)
     ================================================================ */

  function animateCounters() {
    var counters = document.querySelectorAll('.about__stat-number');
    if (!counters.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var counter = entry.target;
            var target = parseInt(counter.getAttribute('data-target'), 10);
            animateCounter(counter, target);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (c) {
      observer.observe(c);
    });
  }

  function animateCounter(el, target) {
    var current = 0;
    var increment = target / 60;
    var frame = function () {
      current += increment;
      if (current >= target) {
        el.textContent = target + (target === 98 ? '%' : '+');
        return;
      }
      el.textContent = Math.floor(current) + '+';
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    animateCounters();
  }

  /* ================================================================
     Contact Form Validation
     ================================================================ */

  var form = document.getElementById('contactForm');
  var feedback = document.getElementById('formFeedback');

  if (form && feedback) {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var messageInput = document.getElementById('message');
    var nameError = document.getElementById('nameError');
    var emailError = document.getElementById('emailError');
    var messageError = document.getElementById('messageError');

    var validators = {
      name: function (val) {
        return val.trim().length >= 2 ? '' : 'El nombre debe tener al menos 2 caracteres.';
      },
      email: function (val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
          ? ''
          : 'Ingresá un correo electrónico válido.';
      },
      message: function (val) {
        return val.trim().length >= 10
          ? ''
          : 'El mensaje debe tener al menos 10 caracteres.';
      }
    };

    function validateField(input, errorEl, validator) {
      var err = validator(input.value);
      errorEl.textContent = err;
      input.classList.toggle('form-input--error', !!err);
      return !err;
    }

    nameInput.addEventListener('blur', function () {
      validateField(nameInput, nameError, validators.name);
    });

    emailInput.addEventListener('blur', function () {
      validateField(emailInput, emailError, validators.email);
    });

    messageInput.addEventListener('blur', function () {
      validateField(messageInput, messageError, validators.message);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isNameValid = validateField(nameInput, nameError, validators.name);
      var isEmailValid = validateField(emailInput, emailError, validators.email);
      var isMessageValid = validateField(messageInput, messageError, validators.message);

      if (isNameValid && isEmailValid && isMessageValid) {
        feedback.className = 'contact__disclaimer contact__disclaimer--success';
        feedback.textContent = 'Mensaje enviado con éxito. Te contactaremos pronto.';
        form.reset();
      } else {
        feedback.className = 'contact__disclaimer contact__disclaimer--error';
        feedback.textContent = 'Por favor, corregí los errores antes de enviar.';
        var firstError = form.querySelector('.form-input--error');
        if (firstError) firstError.focus();
      }
    });
  }
})();
