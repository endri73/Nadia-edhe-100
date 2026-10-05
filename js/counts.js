/* ============ Persisted counts per mode ============ */
const STORAGE_KEY = 'nadia_bday_counts_v1';
function loadCounts(){
  try{ return Object.assign({balloon:0, petal:0, butterfly:0, none:0}, JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch(e){ return {balloon:0, petal:0, butterfly:0, none:0}; }
}
function saveCounts(){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(counts)); }catch(e){} }
let counts = loadCounts();
