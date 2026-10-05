/* ============ Fireworks ============ */
const canvas = document.getElementById('fw-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
let particles = [];
const fwColors = ['#d9b8e8','#ffb59e','#cdeee0','#e8b74d','#f2a6c6','#ffffff','#ffe28a'];
function createBurst(x,y){
  const count = 55;
  for(let i=0;i<count;i++){
    const angle = (Math.PI*2*i)/count, speed = 2+Math.random()*3.5;
    particles.push({x,y, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, alpha:1, color: fwColors[Math.floor(Math.random()*fwColors.length)]});
  }
}
let fwActive = false;
function animateFireworks(){
  if(!fwActive) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.vy+=0.03; p.alpha-=0.011;
    ctx.globalAlpha = Math.max(p.alpha,0);
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fill();
  });
  particles = particles.filter(p=>p.alpha>0);
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}
function launchFireworks(){
  canvas.style.display='block'; fwActive = true;
  let bursts = 0; const totalBursts = 26;
  const interval = setInterval(()=>{
    createBurst(Math.random()*canvas.width*0.85+canvas.width*0.075, Math.random()*canvas.height*0.55+canvas.height*0.08);
    if(Math.random()>0.45) createBurst(Math.random()*canvas.width*0.85+canvas.width*0.075, Math.random()*canvas.height*0.55+canvas.height*0.08);
    bursts++;
    if(bursts>=totalBursts){
      clearInterval(interval);
      setTimeout(()=>{ fwActive=false; canvas.style.display='none'; particles=[]; }, 3000);
    }
  }, 320);
  animateFireworks();
}
function burstGiftConfetti(){
  canvas.style.display='block'; fwActive = true;
  createBurst(window.innerWidth/2, window.innerHeight/2);
  createBurst(window.innerWidth/2-80, window.innerHeight/2-40);
  createBurst(window.innerWidth/2+80, window.innerHeight/2-40);
  animateFireworks();
  setTimeout(()=>{ fwActive=false; canvas.style.display='none'; particles=[]; }, 1800);
}
