// ===================================================================
// HARIKA NEXUS ACADEMY — Interactions
// Defensive: every feature checks its elements exist before wiring up,
// since not every page contains every widget (multi-page site).
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 40) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Hero facet ambient lighting ---------- */
  const facets = document.querySelectorAll('.facet');
  if (facets.length) {
    let i = 0;
    setInterval(() => {
      facets.forEach(f => f.classList.remove('lit'));
      facets[i % facets.length].classList.add('lit');
      i++;
    }, 1800);
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => statsObserver.observe(c));
  }

  /* ---------- Timeline scroll reveal ---------- */
  const tlItems = document.querySelectorAll('.tl-item');
  if (tlItems.length) {
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    tlItems.forEach(item => tlObserver.observe(item));
  }

  /* ---------- Gallery filter ---------- */
  const filterBtns = document.querySelectorAll('.gf');
  const masonryItems = document.querySelectorAll('.m-item');
  if (filterBtns.length && masonryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        masonryItems.forEach(item => {
          const match = filter === 'all' || item.dataset.cat === filter;
          item.classList.toggle('hide', !match);
        });
      });
    });
  }

  /* ---------- Admission / Contact form (front-end only demo) ---------- */
  document.querySelectorAll('.admission-form, .contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = form.classList.contains('contact-form')
        ? 'ধন্যবাদ! বার্তা পাঠানো হয়েছে ✓'
        : 'ধন্যবাদ! আবেদন গ্রহণ করা হয়েছে ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 3200);
    });
  });

  /* ---------- AI Assistant widget ---------- */
  const aiWidget = document.getElementById('aiWidget');
  const aiFab = document.getElementById('aiFab');
  const aiPanel = document.getElementById('aiPanel');
  const aiClose = document.getElementById('aiClose');
  const aiBody = document.getElementById('aiBody');
  const aiChips = document.querySelectorAll('.ai-chip');

  if (aiWidget && aiFab && aiPanel && aiClose && aiBody) {
    const answers = {
      admission: 'ভর্তি প্রক্রিয়া সম্পূর্ণ অনলাইনে: ফর্ম পূরণ → ডকুমেন্ট আপলোড → নিশ্চিতকরণ → ভর্তি সম্পন্ন। "Apply Online" বাটনে গিয়ে শুরু করতে পারেন।',
      fees: 'প্রতিটি প্রতিষ্ঠানের ফি কাঠামো ভিন্ন। নির্দিষ্ট ফি জানতে প্রসপেক্টাস ডাউনলোড করুন অথবা +880 1713-366224 নম্বরে যোগাযোগ করুন।',
      courses: 'আমাদের ৫টি প্রতিষ্ঠান প্লে-গ্রুপ থেকে ক্যারিয়ার ডেভেলপমেন্ট পর্যন্ত বিস্তৃত — স্কুল, কলেজ প্রস্তুতি, বিশ্ববিদ্যালয় ভর্তি কোচিং এবং স্কিল-ভিত্তিক ক্যারিয়ার প্রোগ্রাম।',
      suitable: 'বয়স ও লক্ষ্য অনুযায়ী উপযুক্ত প্রতিষ্ঠান ভিন্ন হতে পারে। স্কুল-বয়সীদের জন্য Laboratory School বা Edusphere, HSC/ভর্তি প্রস্তুতির জন্য Univision, এবং স্কিল ডেভেলপমেন্টের জন্য Career Edge উপযুক্ত।',
      contact: 'ঠিকানা: Panti, Kushtia, Bangladesh। ফোন/হোয়াটসঅ্যাপ: +880 1713-366224। ইমেইল: info@exariste.com',
      founder: 'প্রতিষ্ঠাতা ও চেয়ারম্যান MD. OHID-UZ-ZAMAN বলেন: "শিক্ষা শুধু গ্রেড অর্জনের প্রতিযোগিতা নয়, এটি চরিত্র ও দৃষ্টিভঙ্গি গড়ে তোলার একটি শিল্প।"'
    };

    const openAi = () => {
      aiPanel.classList.add('open');
      aiFab.setAttribute('aria-expanded', 'true');
    };
    const closeAi = () => {
      aiPanel.classList.remove('open');
      aiFab.setAttribute('aria-expanded', 'false');
    };

    aiFab.addEventListener('click', () => {
      aiPanel.classList.contains('open') ? closeAi() : openAi();
    });
    aiClose.addEventListener('click', closeAi);

    aiChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.dataset.q;
        const userMsg = document.createElement('p');
        userMsg.className = 'ai-msg ai-msg--user';
        userMsg.textContent = chip.textContent;
        aiBody.appendChild(userMsg);

        const botMsg = document.createElement('p');
        botMsg.className = 'ai-msg ai-msg--bot';
        botMsg.textContent = answers[q] || 'দুঃখিত, আরও তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।';
        setTimeout(() => {
          aiBody.appendChild(botMsg);
          aiBody.scrollTop = aiBody.scrollHeight;
        }, 350);
        aiBody.scrollTop = aiBody.scrollHeight;
      });
    });

    /* close AI panel on outside click for touch devices */
    document.addEventListener('click', (e) => {
      if (!aiWidget.contains(e.target)) closeAi();
    });
  }
});
