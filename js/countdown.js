/* ============ Countdown to next birthday (Oct 5) ============ */
function nextBirthday(){
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 9, 5, 0, 0, 0); // month 9 = October
  if(target.getTime() <= now.getTime()){
    target = new Date(year+1, 9, 5, 0, 0, 0);
  }
  return target;
}
const cdDays = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMins = document.getElementById('cdMins');
const cdSecs = document.getElementById('cdSecs');
function updateCountdown(){
  const now = new Date();
  const target = nextBirthday();
  let diff = target.getTime() - now.getTime();
  if(diff < 0) diff = 0;
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const mins = Math.floor((diff / (1000*60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  cdDays.textContent = days;
  cdHours.textContent = String(hours).padStart(2,'0');
  cdMins.textContent = String(mins).padStart(2,'0');
  cdSecs.textContent = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);
