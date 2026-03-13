// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2200);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE NAV =====
function openMobileNav() {
    document.getElementById('mobileNav').classList.add('open');
    document.getElementById('mobileOverlay').classList.add('open');
}
function closeMobileNav() {
    document.getElementById('mobileNav').classList.remove('open');
    document.getElementById('mobileOverlay').classList.remove('open');
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.service-card, .project-card, .why-item, .stat-item').forEach(el => {
    observer.observe(el);
});

// Process line animation
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.getElementById('processLineFill').style.width = '100%';
        }
    });
}, { threshold: 0.3 });
const processSection = document.getElementById('process');
if (processSection) processObserver.observe(processSection);

// Stagger service cards
document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = Math.floor(start) + (target >= 100 ? '+' : '+');
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-num').forEach(el => {
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ===== TESTIMONIALS =====
let currentTestimonial = 0;
const items = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.t-dot');

function goToTestimonial(index) {
    items[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');
    currentTestimonial = index;
    items[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

setInterval(() => {
    goToTestimonial((currentTestimonial + 1) % items.length);
}, 5000);

// ===== FORM SUBMIT =====
(function () {
  emailjs.init("8ubgE8b4ov9ekYiIC");
})();
// function handleSubmit() {
//     const btn = document.querySelector('.btn-submit');
//     btn.textContent = '✓ Enquiry Sent! We\'ll be in touch shortly.';
//     btn.style.background = 'linear-gradient(135deg, #2d8a2d, #3da83d)';
//     setTimeout(() => {
//         btn.textContent = 'Send Enquiry →';
//         btn.style.background = '';
//     }, 4000);
// }

function handleSubmit() {

  const formData = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    project_type: document.getElementById("projectType").value,
    message: document.getElementById("message").value
  };
//   console.log(formData)

  emailjs.send(
    "service_3f17zxu",   // your service id
    "template_9lql3w9",  // your template id
    formData
  )
  .then(function () {
    alert("Enquiry sent successfully!");
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("projectType").value = "";
    document.getElementById("message").value = "";
  })
//   .catch(function (error) {
//     console.log("FAILED", error);
//   });

}


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
