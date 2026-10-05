/* ============ Candles ============ */
const candles = document.querySelectorAll('.candle');
const hint = document.getElementById('hint');
const cakeWrap = document.getElementById('cake-wrap');
let litCount = candles.length;

candles.forEach(c=>{
  c.addEventListener('click', ()=>{
    if(c.dataset.lit === "1"){
      c.dataset.lit = "0";
      c.classList.add('out');
      litCount--;
      if(litCount === 0){
        hint.textContent = "🎂 I ke fikur të gjithë! Bëj një dëshirë...";
        setTimeout(()=>{
          launchFireworks();
          startFallingLoop();
          startMusic();
        }, 500);
      }
    }
  });
});
