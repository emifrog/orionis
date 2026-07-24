// Ciel étoilé discret (respecte prefers-reduced-motion, suit le thème)
(function(){
  const c = document.getElementById('stars');
  if(!c) return;
  const ctx = c.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [], lastW = 0, lastH = 0;

  function resize(){
    const w = innerWidth, h = innerHeight;
    if(w === lastW && h === lastH) return;
    c.width = w; c.height = h;
    if(w !== lastW){
      const n = Math.min(90, Math.floor(w/14));
      stars = Array.from({length:n}, () => ({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.3 + .3,
        a: Math.random()*.5 + .15,
        s: Math.random()*.008 + .002,
        p: Math.random()*Math.PI*2
      }));
    } else {
      // Seule la hauteur a changé (barre d'adresse mobile) : on garde les étoiles
      const k = h / lastH;
      for(const st of stars) st.y *= k;
    }
    lastW = w; lastH = h;
    if(reduce) draw(0);
  }

  function draw(t){
    const rgb = document.documentElement.dataset.theme === 'light' ? '70,120,180' : '140,190,240';
    ctx.clearRect(0,0,c.width,c.height);
    for(const st of stars){
      const alpha = reduce ? st.a : st.a * (0.6 + 0.4*Math.sin(t*st.s + st.p));
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${rgb},${alpha})`;
      ctx.fill();
    }
    if(!reduce) requestAnimationFrame(draw);
  }

  addEventListener('resize', resize);
  addEventListener('themechange', () => { if(reduce) draw(0); });
  resize();
  if(!reduce) requestAnimationFrame(draw);
})();

// Bascule mode clair / sombre (le choix est appliqué avant le premier rendu
// par le script inline du <head>, et mémorisé dans localStorage)
(function(){
  const root = document.documentElement;
  const btn = document.querySelector('.theme-toggle');
  if(!btn) return;

  function label(){
    btn.setAttribute('aria-label', root.dataset.theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair');
  }
  label();
  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    if(next === 'light') root.dataset.theme = 'light'; else delete root.dataset.theme;
    try{ localStorage.setItem('theme', next) }catch(e){}
    label();
    dispatchEvent(new Event('themechange'));
  });
})();

// Menu mobile
(function(){
  const btn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('nav-menu');
  if(!btn || !menu) return;

  function setOpen(open){
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }
  btn.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if(e.target.closest('a')) setOpen(false); });
  addEventListener('keydown', e => { if(e.key === 'Escape') setOpen(false); });
})();

// Bouton remonter
(function(){
  const btn = document.querySelector('.to-top');
  if(!btn) return;

  const onScroll = () => btn.classList.toggle('show', scrollY > 600);
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  btn.addEventListener('click', () => {
    scrollTo({top:0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  });
})();
