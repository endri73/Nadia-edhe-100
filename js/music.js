/* ============ Music (no glitch: single source of truth) ============ */
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
let playing = false;
function updateMusicIcon(){ musicBtn.textContent = playing ? '🔊' : '🔇'; }
function startMusic(){
  music.play().then(()=>{ playing = true; updateMusicIcon(); }).catch(()=>{ playing=false; updateMusicIcon(); });
}
function stopMusic(){ music.pause(); playing = false; updateMusicIcon(); }
musicBtn.addEventListener('click', ()=>{ playing ? stopMusic() : startMusic(); });
updateMusicIcon();
