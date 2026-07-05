/* ---------- THEME ---------- */
function applyTheme(mode){
  document.body.classList.toggle('light', mode === 'light');
  const btn = document.getElementById('modeToggle');
  if(btn) btn.textContent = mode === 'light' ? 'MODE: LIGHT' : 'MODE: DARK';
}

function toggleMode(){
  const next = document.body.classList.contains('light') ? 'dark' : 'light';
  applyTheme(next);
  try{ localStorage.setItem('theme', next); }catch(e){}
}

(function loadTheme(){
  let saved = 'dark';
  try{ saved = localStorage.getItem('theme') || 'dark'; }catch(e){}
  applyTheme(saved);
})();

/* ---------- ACTIVE NAV LINK ---------- */
(function markActive(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });
})();

/* ---------- SCROLL REVEAL ---------- */
(function reveal(){
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  if(!('IntersectionObserver' in window)){
    els.forEach(el=>el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:.15 });
  els.forEach(el=>io.observe(el));
})();

/* ---------- PROJECT MODAL ---------- */
function showProjectDetails(title, description, tag){
  const modal = document.getElementById('projectModal');
  if(!modal) return;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDescription').textContent = description;
  const tagEl = document.getElementById('modalTag');
  if(tagEl) tagEl.textContent = tag || 'PROJECT';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  const modal = document.getElementById('projectModal');
  if(!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e)=>{
  const modal = document.getElementById('projectModal');
  if(modal && e.target === modal) closeModal();
});
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
});
