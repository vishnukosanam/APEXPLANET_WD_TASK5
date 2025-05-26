// scripts.js

// Highlight active navigation link
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    // Compare only the pathname for robustness
    if (link.pathname === window.location.pathname) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Animate sections on scroll
  const sections = document.querySelectorAll('main section');
  const revealSection = () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        section.style.opacity = 1;
        section.style.transform = "none";
      }
    });
  };
  window.addEventListener('scroll', revealSection);
  revealSection();

  // Smooth scroll for internal navigation (if any anchor links are added in the future)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Responsive profile image alt text update (for accessibility)
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    profileImg.onerror = function () {
      this.alt = "Profile image not found";
      this.style.opacity = 0.5;
    };
  }
});