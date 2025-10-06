/**
 * Staggered Menu - Vanilla JavaScript with GSAP
 * Animated menu with staggered layer effects
 */

class StaggeredMenu {
  constructor(options = {}) {
    this.options = {
      position: options.position || 'right',
      colors: options.colors || ['#B19EEF', '#5227FF'],
      items: options.items || [],
      socialItems: options.socialItems || [],
      displaySocials: options.displaySocials !== false,
      displayItemNumbering: options.displayItemNumbering !== false,
      menuButtonColor: options.menuButtonColor || '#fff',
      openMenuButtonColor: options.openMenuButtonColor || '#fff',
      accentColor: options.accentColor || '#4F46E5',
      changeMenuColorOnOpen: options.changeMenuColorOnOpen !== false,
      onMenuOpen: options.onMenuOpen || null,
      onMenuClose: options.onMenuClose || null
    };

    this.isOpen = false;
    this.busy = false;
    this.textLines = ['Menu', 'Close'];

    this.init();
  }

  init() {
    this.createHTML();
    this.cacheElements();
    this.setupGSAP();
    this.bindEvents();
  }

  createHTML() {
    const wrapper = document.createElement('div');
    wrapper.className = 'staggered-menu-wrapper';
    wrapper.setAttribute('data-position', this.options.position);
    if (this.options.accentColor) {
      wrapper.style.setProperty('--sm-accent', this.options.accentColor);
    }

    // Create prelayers
    const prelayers = this.createPrelayers();

    // Create header
    const header = this.createHeader();

    // Create panel
    const panel = this.createPanel();

    wrapper.appendChild(prelayers);
    wrapper.appendChild(header);
    wrapper.appendChild(panel);

    document.body.appendChild(wrapper);
    this.wrapper = wrapper;
  }

  createPrelayers() {
    const container = document.createElement('div');
    container.className = 'sm-prelayers';
    container.setAttribute('aria-hidden', 'true');

    let colors = [...this.options.colors].slice(0, 4);
    if (colors.length >= 3) {
      const mid = Math.floor(colors.length / 2);
      colors.splice(mid, 1);
    }

    colors.forEach(color => {
      const layer = document.createElement('div');
      layer.className = 'sm-prelayer';
      layer.style.background = color;
      container.appendChild(layer);
    });

    return container;
  }

  createHeader() {
    const header = document.createElement('header');
    header.className = 'staggered-menu-header';
    header.setAttribute('aria-label', 'Main navigation header');

    // Logo
    const logo = document.createElement('div');
    logo.className = 'sm-logo';
    logo.innerHTML = `
      <i class="fas fa-graduation-cap"></i>
      <span class="sm-logo-text">OUIIPROF</span>
    `;

    // Toggle button
    const button = document.createElement('button');
    button.className = 'sm-toggle';
    button.setAttribute('aria-label', 'Open menu');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('type', 'button');

    const textWrap = document.createElement('span');
    textWrap.className = 'sm-toggle-textWrap';
    textWrap.setAttribute('aria-hidden', 'true');

    const textInner = document.createElement('span');
    textInner.className = 'sm-toggle-textInner';
    this.textLines.forEach(line => {
      const span = document.createElement('span');
      span.className = 'sm-toggle-line';
      span.textContent = line;
      textInner.appendChild(span);
    });

    textWrap.appendChild(textInner);

    const icon = document.createElement('span');
    icon.className = 'sm-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `
      <span class="sm-icon-line"></span>
      <span class="sm-icon-line sm-icon-line-v"></span>
    `;

    button.appendChild(textWrap);
    button.appendChild(icon);

    header.appendChild(logo);
    header.appendChild(button);

    return header;
  }

  createPanel() {
    const panel = document.createElement('aside');
    panel.className = 'staggered-menu-panel';
    panel.setAttribute('aria-hidden', 'true');

    const inner = document.createElement('div');
    inner.className = 'sm-panel-inner';

    // Menu items
    const list = document.createElement('ul');
    list.className = 'sm-panel-list';
    list.setAttribute('role', 'list');
    if (this.options.displayItemNumbering) {
      list.setAttribute('data-numbering', '');
    }

    if (this.options.items && this.options.items.length) {
      this.options.items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = 'sm-panel-itemWrap';

        const link = document.createElement('a');
        link.className = 'sm-panel-item';
        link.href = item.link || '#';
        link.setAttribute('data-index', idx + 1);
        if (item.ariaLabel) link.setAttribute('aria-label', item.ariaLabel);

        const label = document.createElement('span');
        label.className = 'sm-panel-itemLabel';
        label.textContent = item.label;

        link.appendChild(label);
        li.appendChild(link);
        list.appendChild(li);
      });
    }

    inner.appendChild(list);

    // Socials
    if (this.options.displaySocials && this.options.socialItems && this.options.socialItems.length) {
      const socials = document.createElement('div');
      socials.className = 'sm-socials';
      socials.setAttribute('aria-label', 'Social links');

      const title = document.createElement('h3');
      title.className = 'sm-socials-title';
      title.textContent = 'Socials';

      const socialList = document.createElement('ul');
      socialList.className = 'sm-socials-list';
      socialList.setAttribute('role', 'list');

      this.options.socialItems.forEach(social => {
        const li = document.createElement('li');
        li.className = 'sm-socials-item';

        const link = document.createElement('a');
        link.className = 'sm-socials-link';
        link.href = social.link || '#';
        link.textContent = social.label;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        li.appendChild(link);
        socialList.appendChild(li);
      });

      socials.appendChild(title);
      socials.appendChild(socialList);
      inner.appendChild(socials);
    }

    panel.appendChild(inner);
    return panel;
  }

  cacheElements() {
    this.panel = this.wrapper.querySelector('.staggered-menu-panel');
    this.prelayersContainer = this.wrapper.querySelector('.sm-prelayers');
    this.prelayers = Array.from(this.prelayersContainer.querySelectorAll('.sm-prelayer'));
    this.toggleBtn = this.wrapper.querySelector('.sm-toggle');
    this.icon = this.wrapper.querySelector('.sm-icon');
    this.plusH = this.wrapper.querySelector('.sm-icon-line:not(.sm-icon-line-v)');
    this.plusV = this.wrapper.querySelector('.sm-icon-line-v');
    this.textInner = this.wrapper.querySelector('.sm-toggle-textInner');
  }

  setupGSAP() {
    const offscreen = this.options.position === 'left' ? -100 : 100;

    gsap.set([this.panel, ...this.prelayers], { xPercent: offscreen });
    gsap.set(this.plusH, { transformOrigin: '50% 50%', rotate: 0 });
    gsap.set(this.plusV, { transformOrigin: '50% 50%', rotate: 90 });
    gsap.set(this.icon, { rotate: 0, transformOrigin: '50% 50%' });
    gsap.set(this.textInner, { yPercent: 0 });
    gsap.set(this.toggleBtn, { color: this.options.menuButtonColor });
  }

  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.toggle());
  }

  toggle() {
    if (this.busy) return;

    this.isOpen = !this.isOpen;
    this.toggleBtn.setAttribute('aria-expanded', this.isOpen);
    this.panel.setAttribute('aria-hidden', !this.isOpen);
    this.toggleBtn.setAttribute('aria-label', this.isOpen ? 'Close menu' : 'Open menu');

    if (this.isOpen) {
      this.open();
      if (this.options.onMenuOpen) this.options.onMenuOpen();
    } else {
      this.close();
      if (this.options.onMenuClose) this.options.onMenuClose();
    }

    this.animateIcon(this.isOpen);
    this.animateText(this.isOpen);
    this.animateColor(this.isOpen);
  }

  open() {
    this.busy = true;

    const itemEls = Array.from(this.panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(this.panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = this.panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(this.panel.querySelectorAll('.sm-socials-link'));

    // Set initial states
    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        this.busy = false;
      }
    });

    // Animate prelayers
    this.prelayers.forEach((layer, i) => {
      tl.to(layer, {
        xPercent: 0,
        duration: 0.5,
        ease: 'power4.out'
      }, i * 0.07);
    });

    // Animate main panel
    const panelStart = this.prelayers.length * 0.07 + 0.08;
    tl.to(this.panel, {
      xPercent: 0,
      duration: 0.65,
      ease: 'power4.out'
    }, panelStart);

    // Animate items
    if (itemEls.length) {
      const itemsStart = panelStart + 0.65 * 0.15;
      tl.to(itemEls, {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: { each: 0.1, from: 'start' }
      }, itemsStart);

      if (numberEls.length) {
        tl.to(numberEls, {
          duration: 0.6,
          ease: 'power2.out',
          '--sm-num-opacity': 1,
          stagger: { each: 0.08, from: 'start' }
        }, itemsStart + 0.1);
      }
    }

    // Animate socials
    if (socialTitle || socialLinks.length) {
      const socialsStart = panelStart + 0.65 * 0.4;
      if (socialTitle) {
        tl.to(socialTitle, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(socialLinks, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' }
        }, socialsStart + 0.04);
      }
    }
  }

  close() {
    const offscreen = this.options.position === 'left' ? -100 : 100;
    const all = [...this.prelayers, this.panel];

    gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        this.busy = false;
      }
    });
  }

  animateIcon(opening) {
    if (opening) {
      gsap.to(this.icon, {
        rotate: 225,
        duration: 0.8,
        ease: 'power4.out',
        overwrite: 'auto'
      });
    } else {
      gsap.to(this.icon, {
        rotate: 0,
        duration: 0.35,
        ease: 'power3.inOut',
        overwrite: 'auto'
      });
    }
  }

  animateColor(opening) {
    if (this.options.changeMenuColorOnOpen) {
      const targetColor = opening ? this.options.openMenuButtonColor : this.options.menuButtonColor;
      gsap.to(this.toggleBtn, {
        color: targetColor,
        delay: 0.18,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  animateText(opening) {
    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;

    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    // Update DOM
    this.textInner.innerHTML = '';
    seq.forEach(text => {
      const span = document.createElement('span');
      span.className = 'sm-toggle-line';
      span.textContent = text;
      this.textInner.appendChild(span);
    });

    gsap.set(this.textInner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    gsap.to(this.textInner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }
}

// Initialize menu when DOM is ready
if (typeof gsap !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
      { label: 'Accueil', ariaLabel: 'Aller à l\'accueil', link: '#home' },
      { label: 'Services', ariaLabel: 'Voir nos services', link: '#services' },
      { label: 'Matières', ariaLabel: 'Voir les matières', link: '#subjects' },
      { label: 'À Propos', ariaLabel: 'En savoir plus', link: '#about' },
      { label: 'Contact', ariaLabel: 'Nous contacter', link: '#appointment' }
    ];

    const socialItems = [
      { label: 'Facebook', link: '#' },
      { label: 'LinkedIn', link: '#' },
      { label: 'Instagram', link: '#' }
    ];

    window.staggeredMenu = new StaggeredMenu({
      position: 'right',
      items: menuItems,
      socialItems: socialItems,
      displaySocials: true,
      displayItemNumbering: true,
      colors: ['#B19EEF', '#5227FF', '#764ba2'],
      menuButtonColor: '#fff',
      openMenuButtonColor: '#1A1A1A',
      accentColor: '#4F46E5',
      changeMenuColorOnOpen: true,
      onMenuOpen: () => console.log('Menu opened'),
      onMenuClose: () => console.log('Menu closed')
    });
  });
}
