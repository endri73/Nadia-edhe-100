/* ============ Bunting ============ */
const buntingWrap = document.getElementById('bunting');
const FLAG_COUNT = 15, SAG_AMPLITUDE = 16;
for(let i=0;i<FLAG_COUNT;i++){
  const f = document.createElement('div');
  f.className='flag';
  const t = i/(FLAG_COUNT-1);
  f.style.transform = `translateY(${(SAG_AMPLITUDE*Math.sin(Math.PI*t)).toFixed(1)}px)`;
  buntingWrap.appendChild(f);
}
