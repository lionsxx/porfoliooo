document.getElementById('year').textContent = new Date().getFullYear();

// ---- Project data ----
const projects = {
  onlyou: {
    title: 'Creator monetization platform',
    banner: 'url(imgs/onlyyou.png) center/cover no-repeat',
    tags: [['Laravel', 'tag-green'], ['PHP', 'tag-green'], ['Real-time', 'tag-green']],
    desc: 'OnlyYou is a creator monetization platform that enables creators to earn through subscriptions, premium content, tips, and direct messaging. It features Stripe and PayPal integration, real-time chat, creator dashboards, content management, and a complete administration panel.',
    points: [
      'Real-time messaging infrastructure',
      'Content paywall & transaction flow',
      'Built for white-label / resale'
    ],
    images: [
      'imgs/onlyyou.png',
      'imgs/onlyyou2.png'
    ],
    link: '#'
  },
  'Streaming Platform': {
    title: 'Streaming & Platform Tools',
    banner: 'url(imgs/streaming.jpg) center/cover no-repeat',
    tags: [['Laravel', 'tag-green'], ['NodeJS', 'tag-green'], ['MCP', 'tag-purple']],
    desc: '',
    points: [
      'WebSocket bridge for live local access',
      'MCP-based tool architecture',
      'Agent-driven file & code operations'
    ],
    images: [
      'imgs/streaming.jpg',
      'imgs/streaming2.jpg'
    ],
    link: '#'
  },
  ucp: {
    title: 'UCP SA-MP',
    banner: 'url(imgs/ucp.png) center/cover no-repeat',
    tags: [['PHP', 'tag-orange'], ['MySQL', 'tag-orange']],
    desc: 'A complete User Control Panel (UCP) developed for a SA-MP server, providing players with a centralized platform to manage their accounts, track statistics, view character information, manage assets, and access server-related features through a modern and user-friendly web interface.',
    points: [
      'Comprehensive player account management',
      'Real-time stats & character information',
      'Asset management with image uploads'
    ],
    images: [
      'imgs/ucp.png',
      'imgs/ucp2.png',
      'imgs/ucp3.png',
      'imgs/ucp4.png'
    ],
    link: '#'
  },
  arenaX: {
    title: 'Esports Competition Platform', 
    banner: 'url(imgs/arenax.png) center/cover no-repeat',
    tags: [['Roblox', 'tag-blue'], ['Game Architecture', 'tag-blue']],
    desc: 'Arena X is a competitive esports challenge platform that allows players to create and join skill-based matches for popular games. Users can challenge opponents, participate in head-to-head competitions, manage match entries, track results, and compete through an integrated tournament and matchmaking system. The platform includes user management, payment processing, match administration, and a comprehensive operator dashboard.',
    points: [
      'Skill-based matchmaking & tournament system',
      'Comprehensive match management & administration',
      'Payment processing & user management'
    ],
    images: [
      'imgs/arenax.png',
      'imgs/arenax2.png',
      'imgs/arenax3.png',
    ],
    link: '#'
  }
};

// ---- Modal logic ----
const overlay = document.getElementById('modal-overlay');
const modalMedia = document.getElementById('modal-media');
const modalTitle = document.getElementById('modal-title');
const modalTags = document.getElementById('modal-tags');
const modalDesc = document.getElementById('modal-desc');
const modalPoints = document.getElementById('modal-points');
const modalLink = document.getElementById('modal-link');
const closeBtn = document.getElementById('modal-close');

function openModal(key) {
  const p = projects[key];
  if (!p) return;

  const firstImage = p.images && p.images.length ? p.images[0] : null;
  modalMedia.style.background = firstImage
    ? `url(${firstImage}) center/cover no-repeat`
    : p.banner || 'linear-gradient(135deg,#1d4e89,#0c1e3a)';
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalLink.href = p.link;

  modalTags.innerHTML = '';
  p.tags.forEach(([label, cls]) => {
    const span = document.createElement('span');
    span.className = `tag ${cls}`;
    span.textContent = label;
    modalTags.appendChild(span);
  });

  modalPoints.innerHTML = '';
  p.points.forEach(point => {
    const li = document.createElement('li');
    li.textContent = point;
    modalPoints.appendChild(li);
  });

  renderGallery(p.images || []);

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function renderGallery(images) {
  const gallery = document.getElementById('modal-gallery');
  gallery.innerHTML = '';

  images.forEach((src, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'modal-gallery-item';
    item.style.backgroundImage = `url(${src})`;
    item.setAttribute('aria-label', `View image ${index + 1}`);
    if (index === 0) item.classList.add('active');

    item.addEventListener('click', () => {
      modalMedia.style.background = `url(${src}) center/cover no-repeat`;
      gallery.querySelectorAll('.modal-gallery-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    });

    gallery.appendChild(item);
  });
}

function closeModal() {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.card').forEach(card => {
    const key = card.dataset.modal;
    const project = projects[key];
    const media = card.querySelector('.card-media');
    if (project && media) {
      media.style.background = project.banner || 'linear-gradient(135deg,#1d4e89,#0c1e3a)';
    }

    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('click', () => openModal(key));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(key);
      }
    });
  });
closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
});