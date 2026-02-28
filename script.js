document.addEventListener("DOMContentLoaded", function () {

  /* ==========================
     PRELOADER
  ========================== */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", function () {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }

  /* ==========================
     NAVBAR SHRINK
  ========================== */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /* ==========================
     MOBILE MENU
  ========================== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  /* ==========================
     SLOW SMOOTH COUNTERS
  ========================== */
  const counters = document.querySelectorAll(".counter");

  if (counters.length > 0) {
    const runCounter = (counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 8000;
      const startTime = performance.now();

      function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        counter.innerText = Math.floor(progress * target);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      }

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(counter => {
      counter.innerText = "0";
      observer.observe(counter);
    });
  }

  /* ==========================
     CONTACT FORM
  ========================== */
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("successPopup");
  const sound = document.getElementById("successSound");
  const submitBtn = document.getElementById("submitBtn");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
      })
      .then(() => {

        if (sound) sound.play().catch(() => {});
        if (popup) popup.classList.add("active");

        form.reset();

        if (submitBtn) {
          submitBtn.innerText = "Send Message";
          submitBtn.disabled = false;
        }

        setTimeout(() => {
          if (popup) popup.classList.remove("active");
        }, 4000);

      })
      .catch(error => {
        console.error("Form error:", error);
      });
    });
  }

  /* ==========================
     SLIDER
  ========================== */
  const slides = document.querySelectorAll(".slide");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots");

  if (slides.length > 0 && dotsContainer) {

    let current = 0;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      slides[index].classList.add("active");
      updateDots(index);
    }

    function createDots() {
      slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
          current = i;
          showSlide(current);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots(index) {
      const dots = document.querySelectorAll(".dot");
      dots.forEach(dot => dot.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");
    }

    createDots();
    showSlide(current);

    if (next) {
      next.addEventListener("click", () => {
        current = (current + 1) % slides.length;
        showSlide(current);
      });
    }

    if (prev) {
      prev.addEventListener("click", () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
      });
    }
  }

  /* ==========================
     COUNTDOWN TIMER
  ========================== */
  const countdown = document.getElementById("countdown");

  if (countdown) {
    const eventDate = new Date("March 25, 2026 09:00:00").getTime();

    setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {

     const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));

     document.getElementById("days").innerText = daysLeft;
     document.getElementById("hours").innerText =
      Math.floor((distance / (1000 * 60 * 60)) % 24);
     document.getElementById("minutes").innerText =
      Math.floor((distance / (1000 * 60)) % 60);
     document.getElementById("seconds").innerText =
      Math.floor((distance / 1000) % 60);

     // 🔥 Glow when close
     if (daysLeft <= 3) {
    countdown.classList.add("event-soon");
  }

} else {
  countdown.innerHTML = "🎉 Event Started!";
}
    }, 1000);
  }

});

/* ==========================
   TYPING SCRIPTURE (UPDATED)
========================== */
const typedVerse = document.getElementById("typed-verse");

if (typedVerse) {
  const text = "Joshua 1:8 — This Book of the Law shall not depart from your mouth, but you shall meditate in it day and night...";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      typedVerse.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 60);
    }
  }

  typedVerse.textContent = "";
  typeEffect();
}


const prayerForm = document.getElementById("prayerForm");
const prayerSound = document.getElementById("successSound");

if (prayerForm) {
  prayerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("prayerName").value;
    const message = document.getElementById("prayerMessage").value;

    const phoneNumber = "256772607774"; // your real number

    const text = `Prayer Request:%0AName: ${name}%0A%0A${message}`;
    const url = `https://wa.me/${phoneNumber}?text=${text}`;

    // Play sound first
    if (prayerSound) {
      prayerSound.currentTime = 0;
      prayerSound.play().catch(() => {});
    }

    // Delay WhatsApp slightly so sound can start
    setTimeout(() => {
      window.open(url, "_blank");
    }, 500);

    prayerForm.reset();
  });
}

/* ==========================
   FLOATING PARTICLES
========================== */
const particlesContainer = document.querySelector(".particles");

if (particlesContainer) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("span");

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = (6 + Math.random() * 8) + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";

    particlesContainer.appendChild(particle);
  }
}