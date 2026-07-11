/* Almacenamiento local sin módulos nativos; compatible con Windows. */
const fs = require('fs'), path = require('path');
const file = path.join(__dirname, 'data', 'sonder-data.json');
fs.mkdirSync(path.dirname(file), { recursive: true });
let data = { plays: [], codes: [], nextCodeId: 1 };
try { data = { ...data, ...JSON.parse(fs.readFileSync(file, 'utf8')) }; } catch (_) {}
const save = () => fs.writeFileSync(file, JSON.stringify(data, null, 2));
module.exports = {
  addPlay: p => { data.plays.push(p); save(); }, updatePlay: (id,v) => { const p=data.plays.find(x=>x.id===id); if(p){Object.assign(p,v);save();} },
  attempts: (ip,since) => data.plays.filter(x=>x.ip===ip&&x.created_at>=since).length,
  addCode: c => { c.id=data.nextCodeId++;data.codes.push(c);save(); }, codeExists: c => data.codes.some(x=>x.code===c), emailExists:e=>data.codes.some(x=>x.email===e),
  codes:()=>[...data.codes].sort((a,b)=>b.id-a.id), redeem:(id,time)=>{const c=data.codes.find(x=>x.id===Number(id)&&!x.redeemed);if(!c)return false;c.redeemed=1;c.used_at=time;save();return true;},
  stats:()=>{const plays=data.plays.length,winners=data.plays.filter(x=>x.status==='winner').length;return{plays,winners,precision:plays?Math.round(data.plays.reduce((s,x)=>s+(x.average_precision||0),0)/plays*10)/10:0,codes:data.codes.length,redeemed:data.codes.filter(x=>x.redeemed).length};}
};
