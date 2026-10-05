/* ============ Shared audio (Web Audio synth, no external files) ============ */
let audioCtx = null;
function getAudioCtx(){
  if(!audioCtx){
    try{ audioCtx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return null; }
  }
  return audioCtx;
}
function playPopSound(){
  const ctx = getAudioCtx(); if(!ctx) return;
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type='sine';
  o.frequency.setValueAtTime(650, ctx.currentTime);
  o.frequency.exponentialRampToValueAtTime(90, ctx.currentTime+0.15);
  g.gain.setValueAtTime(0.35, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.18);
  o.connect(g); g.connect(ctx.destination);
  o.start(); o.stop(ctx.currentTime+0.2);
}
function playChime(){
  const ctx = getAudioCtx(); if(!ctx) return;
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type='triangle';
  o.frequency.setValueAtTime(820, ctx.currentTime);
  o.frequency.exponentialRampToValueAtTime(1180, ctx.currentTime+0.12);
  g.gain.setValueAtTime(0.22, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.3);
  o.connect(g); g.connect(ctx.destination);
  o.start(); o.stop(ctx.currentTime+0.3);
}
