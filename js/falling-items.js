/* ============ Falling items (balloons / petals / butterflies) ============ */
const balloonColors = ['#d9b8e8','#ffb59e','#cdeee0','#e8b74d','#f2a6c6','#b6a6e8'];
const balloonUI = document.getElementById('balloon-ui');
const modeSwitch = document.getElementById('mode-switch');
const balloonCounterEl = document.getElementById('balloon-counter');
const balloonCountEl = document.getElementById('balloon-count');
const balloonResetBtn = document.getElementById('balloon-reset');
const modeBtns = document.querySelectorAll('.mode-btn');
let currentMode = 'balloon';
let spawnTimer = null;
let fallingStarted = false;

function getScale(){ return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--u')) || 1; }

function updateCounterDisplay(){
  const btn = document.querySelector(`.mode-btn[data-mode="${currentMode}"]`);
  const emoji = btn ? btn.dataset.emoji : '🎈';
  balloonCounterEl.innerHTML = emoji + ' <span id="balloon-count">' + counts[currentMode] + '</span>';
}

function spawnBalloon(){
  const u = getScale();
  const b = document.createElement('div');
  b.className = 'balloon';
  const color = balloonColors[Math.floor(Math.random()*balloonColors.length)];
  b.style.background = `linear-gradient(135deg, ${color}, #ffffffaa)`;
  b.style.width = (80*u) + 'px';
  b.style.height = (102*u) + 'px';
  b.style.left = Math.random()*88 + 'vw';
  const duration = 7 + Math.random()*4;
  b.style.animationDuration = duration + 's';
  b.style.setProperty('--drift', (Math.random()*160-80)+'px');
  document.body.appendChild(b);
  b.addEventListener('click', ()=> popBalloon(b, color));
  setTimeout(()=>{ if(b.parentNode) b.remove(); }, duration*1000 + 200);
}

function spawnEmoji(mode){
  const emoji = mode === 'petal' ? '🌸' : '🦋';
  const el = document.createElement('div');
  el.className = 'falling-emoji';
  el.textContent = emoji;
  el.style.left = Math.random()*90 + 'vw';
  const duration = 7 + Math.random()*4;
  el.style.animationDuration = duration + 's';
  el.style.setProperty('--drift', (Math.random()*160-80)+'px');
  document.body.appendChild(el);
  el.addEventListener('click', ()=> popEmoji(el, mode));
  setTimeout(()=>{ if(el.parentNode) el.remove(); }, duration*1000 + 200);
}

function popBalloon(b, color){
  sparklePop(b.getBoundingClientRect(), color);
  b.remove();
  playPopSound();
  counts.balloon++;
  saveCounts();
  if(currentMode === 'balloon') updateCounterDisplay();
}
function popEmoji(el, mode){
  sparklePop(el.getBoundingClientRect(), mode==='petal' ? '#f2a6c6' : '#b6a6e8');
  el.remove();
  playChime();
  counts[mode]++;
  saveCounts();
  if(currentMode === mode) updateCounterDisplay();
}

function sparklePop(rect, color){
  for(let i=0;i<12;i++){
    const p = document.createElement('div');
    p.className='pop-particles';
    p.style.background = color;
    p.style.left = (rect.left + rect.width/2) + 'px';
    p.style.top = (rect.top + rect.height/2) + 'px';
    document.body.appendChild(p);
    const angle = (Math.PI*2*i)/12, dist = 40+Math.random()*30;
    p.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`,opacity:0}], {duration:500, easing:'ease-out'});
    setTimeout(()=>p.remove(), 500);
  }
}

function spawnCurrent(){
  if(currentMode === 'none') return;
  if(currentMode === 'balloon') spawnBalloon();
  else spawnEmoji(currentMode);
}
function restartSpawnLoop(){
  if(spawnTimer) clearInterval(spawnTimer);
  if(currentMode === 'none') return;
  spawnCurrent();
  spawnTimer = setInterval(spawnCurrent, 800);
}
function startFallingLoop(){
  fallingStarted = true;
  balloonUI.classList.add('show');
  modeSwitch.classList.add('show');
  updateCounterDisplay();
  restartSpawnLoop();
}

modeBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    modeBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    updateCounterDisplay();
    if(fallingStarted) restartSpawnLoop();
  });
});
balloonResetBtn.addEventListener('click', ()=>{
  counts[currentMode] = 0;
  saveCounts();
  updateCounterDisplay();
});
updateCounterDisplay();
