/* ============ Gift unwrap ============ */
let giftClicks = 0;
const giftBox = document.getElementById('gift-box');
const pips = document.querySelectorAll('.pip');
const giftOverlay = document.getElementById('gift-overlay');
giftBox.addEventListener('click', ()=>{
  if(giftClicks>=5) return;
  giftClicks++;
  pips[giftClicks-1].classList.add('on');
  giftBox.animate([{transform:'scale(1)'},{transform:'scale(1.08)'},{transform:'scale(1)'}], {duration:220});
  playChime();
  if(giftClicks>=5){
    setTimeout(()=>{
      burstGiftConfetti();
      giftOverlay.classList.add('hide');
      setTimeout(()=>{ if(giftOverlay.parentNode) giftOverlay.remove(); }, 700);
    }, 300);
  }
});
