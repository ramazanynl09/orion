const $=id=>document.getElementById(id);
const M={
moon:{n:'Lunar Rover Landing',d:'Land a robotic rover on the Moon. Close and easy on comms and power, but landing is risky.',budget:820,dv:2.6,sun:1,need:1,target:60,req:['cam'],reqT:'Camera',days:5,rad:.1,col:'#b9b9b9'},
mars:{n:'Mars Rock Sampler',d:'Reach Mars and analyse rock. Needs a sampling tool, a decent antenna and a lot of delta-v.',budget:1270,dv:3.0,sun:.43,need:3,target:90,req:['arm','drill'],reqT:'Robotic Arm or Drill',days:210,rad:.25,col:'#c1440e'},
europa:{n:'Europa Ice Probe',d:'Explore Jupiter\u2019s icy moon. Sunlight is 4% of Earth\u2019s, data rates are tough, radiation is brutal.',budget:2050,dv:4.2,sun:.04,need:6,target:110,req:['radar'],reqT:'Radar Sounder',days:2200,rad:.7,col:'#9ec5d6'},
venus:{n:'Venus Cloud Probe',d:'Study the acid clouds of Venus. Sunlight is strong so solar power is great, but the cloud-top entry is demanding.',budget:1100,dv:2.8,sun:1.9,need:2,target:75,req:['spec'],reqT:'Spectrometer',days:150,rad:.15,col:'#e3b45c'},
titan:{n:'Titan Lander',d:'Land on Saturn\u2019s hazy moon. Almost no sunlight, enormous distance and a very expensive delta-v bill.',budget:2380,dv:4.6,sun:.01,need:7,target:120,req:['spec'],reqT:'Spectrometer',days:2600,rad:.2,col:'#d9a441'},
asteroid:{n:'Asteroid Sample Grab',d:'Touch down on a small asteroid and grab a sample. Cheap and low gravity, but faint sunlight and a tight power budget.',budget:780,dv:2.0,sun:.35,need:2,target:55,req:['arm','drill'],reqT:'Robotic Arm or Drill',days:400,rad:.2,col:'#8b7d6b'},
io:{n:'Io Volcano Lander',d:'Land on Jupiter\u2019s volcanic moon. Searing radiation, almost no sunlight and violent terrain. Thermal imaging or spectroscopy is essential.',budget:2380,dv:4.6,sun:.04,need:8,target:140,req:['therm','spec'],reqT:'Thermal Imager or Spectrometer',days:2300,rad:.95,col:'#e0c050'},
enceladus:{n:'Enceladus Plume Sampler',d:'Fly through the geysers of Saturn\u2019s ice moon and taste the ocean below. Very far away, almost no power, delicate science.',budget:2750,dv:5.0,sun:.011,need:9,target:150,req:['plume','gc'],reqT:'Plume Sampler or Gas Chromatograph',days:2700,rad:.15,col:'#e8f2f8'},
triton:{n:'Triton Cryo Lander',d:'The most distant mission yet: Neptune\u2019s frozen moon. Enormous delta-v, no sunlight and a painfully slow data link.',budget:3100,dv:5.6,sun:.001,need:11,target:170,req:['radar','seis'],reqT:'Radar Sounder or Seismometer',days:4000,rad:.2,col:'#c9d6e8'}};
const L=[{n:'Micro Launcher',cap:450,c:25,r:87},{n:'Light Launcher',cap:1200,c:60,r:91},{n:'Medium Launcher',cap:2500,c:150,r:94},{n:'Reusable Medium Launcher',cap:2200,c:115,r:92},{n:'Heavy Launcher',cap:6000,c:350,r:96},{n:'Super Heavy Launcher',cap:12000,c:700,r:97},{n:'Mega Launcher',cap:25000,c:1400,r:97}];
const ROCKET=[
{scale:.72,height:42,width:7,boosters:[],body:'#d8e1eb',accent:'#3e67b3',windows:1},
{scale:.82,height:48,width:8,boosters:[-13,13],body:'#e5e9ef',accent:'#d94c55',windows:1},
{scale:.94,height:55,width:9,boosters:[-15,15],body:'#eef1f4',accent:'#e34f55',windows:2},
{scale:.9,height:54,width:9,boosters:[],body:'#dbe9f0',accent:'#2796a8',windows:2,reusable:true},
{scale:1.04,height:62,width:10,boosters:[-23,-13,13,23],body:'#e5e9ef',accent:'#e2763c',windows:2},
{scale:1.16,height:70,width:11,boosters:[-25,-15,15,25],body:'#dce4ef',accent:'#4476c9',windows:3},
{scale:1.28,height:78,width:12,boosters:[-34,-23,-12,12,23,34],body:'#f0e9d8',accent:'#d6a64e',windows:3}
];
const B=[{n:'Micro Bus',m:120,c:30,r:-5,sh:0},{n:'Basic Bus',m:200,c:40,r:-2,sh:.1},{n:'Standard Bus',m:300,c:90,r:0,sh:.3},{n:'Hardened Bus',m:430,c:230,r:4,sh:.8},{n:'Radiation-Proof Bus',m:540,c:340,r:6,sh:1},{n:'Armored Deep-Space Bus',m:700,c:460,r:8,sh:1}];
const P=[{n:'Small Solar Array',m:60,c:20,w:300,rtg:0},{n:'Medium Solar Array',m:90,c:30,w:500,rtg:0},{n:'Large Solar Array',m:120,c:40,w:700,rtg:0},{n:'Huge Solar Array',m:200,c:70,w:1200,rtg:0},{n:'RTG (Nuclear Battery)',m:45,c:110,w:300,rtg:1},{n:'Dual RTG',m:85,c:200,w:500,rtg:1},{n:'Advanced RTG',m:70,c:260,w:800,rtg:1},{n:'Fission Reactor',m:300,c:420,w:2000,rtg:1}];
const C=[{n:'Low-Gain Antenna',m:15,c:10,rate:1,d:20},{n:'Medium-Gain Antenna',m:40,c:30,rate:3,d:40},{n:'Small Dish',m:65,c:50,rate:5,d:60},{n:'High-Gain Dish',m:90,c:70,rate:8,d:80},{n:'Deep-Space Array',m:150,c:130,rate:12,d:120},{n:'Laser Comm Terminal',m:120,c:220,rate:18,d:150}];
const I={cam:{n:'Camera',m:25,c:30,s:20,d:40},spec:{n:'Spectrometer',m:40,c:55,s:30,d:60},arm:{n:'Robotic Arm',m:60,c:80,s:25,d:90},drill:{n:'Drill',m:110,c:140,s:45,d:200},radar:{n:'Radar Sounder',m:70,c:100,s:35,d:150},seis:{n:'Seismometer',m:30,c:60,s:20,d:30},mag:{n:'Magnetometer',m:20,c:35,s:15,d:20},dust:{n:'Dust Analyzer',m:35,c:50,s:22,d:35},wx:{n:'Weather Station',m:25,c:40,s:18,d:25},gc:{n:'Gas Chromatograph',m:55,c:90,s:40,d:70},therm:{n:'Thermal Imager',m:35,c:60,s:25,d:45},plume:{n:'Plume Sampler',m:50,c:85,s:35,d:60}};
const G=[{n:'Recycled Parts',c:.5,r:-10,t:'-50% cost, -10 reliability'},{n:'Budget Parts',c:.7,r:-6,t:'-30% cost, -6 reliability'},{n:'Standard Parts',c:1,r:0,t:'Baseline'},{n:'Flight-Proven Parts',c:1.35,r:4,t:'+35% cost, +4 reliability'},{n:'Space-Qualified Parts',c:1.7,r:7,t:'+70% cost, +7 reliability'},{n:'Rad-Hardened Parts',c:2,r:10,t:'+100% cost, +10 reliability'}];
const MG=[{n:'No margin',v:0,t:'Lightest, no safety net'},{n:'5% margin',v:.05,t:'Tiny buffer for minor tweaks'},{n:'10% margin',v:.1,t:'Covers small corrections'},{n:'15% margin',v:.15,t:'Covers almost every correction'},{n:'20% margin',v:.2,t:'Heavy, very safe'},{n:'30% margin',v:.3,t:'Very heavy, maximum safety'}];
const WN=[{n:'Express Burn',dv:1.25,c:0,t:.6,d:'Launch immediately: delta-v x1.25, much shorter trip.'},{n:'Fast Track',dv:1.12,c:0,t:.8,d:'Launch now: delta-v x1.12, shorter trip.'},{n:'Optimal Window',dv:1,c:30,t:1,d:'Wait for planetary alignment: baseline delta-v, +$30M operations.'},{n:'Gravity Assist',dv:.85,c:20,t:1.6,d:'Planetary flyby: delta-v x0.85, +60% travel time, more radiation risk, +$20M.'},{n:'Low-Energy Transfer',dv:.75,c:10,t:2.2,d:'Slow spiral path: delta-v x0.75, more than double travel time, +$10M.'},{n:'Multi-Planet Tour',dv:.65,c:45,t:3,d:'Several flybys: delta-v x0.65, three times the travel time, more radiation exposure, +$45M.'}];
const S={w:2,m:'moon',g:2,l:1,b:2,p:0,c:1,mg:2,t:0,i:new Set(['cam']),busy:false};
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function calc(){const ty=TY[S.t],m=Object.assign({},M[S.m],{target:Math.round(M[S.m].target*ty.tg),budget:Math.round(M[S.m].budget*ty.bg)}),g=G[S.g],b=B[S.b],p=P[S.p],c=C[S.c],ins=[...S.i].map(k=>I[k]);
const dry=ty.m+b.m+p.m+c.m+ins.reduce((a,x)=>a+x.m,0),dv=m.dv*ty.dv*WN[S.w].dv*(1+MG[S.mg].v),fuel=dry*(Math.exp(dv/3.14)-1),wet=dry+fuel,sf=clamp(.75+.45*Math.max(0,(L[S.l].cap-wet)/L[S.l].cap)+.8*MG[S.mg].v-.15*Math.min(1,dry/1500),.6,1.5);
const cost=L[S.l].c+ty.c+g.c*(b.c+p.c+c.c+ins.reduce((a,x)=>a+x.c,0))+fuel*.04+40+m.days*WN[S.w].t*.012+WN[S.w].c;
const rel=clamp(90+b.r+g.r-.8*ins.length,40,99),avail=p.rtg?p.w:p.w*m.sun,need=80+ty.w+c.d+ins.reduce((a,x)=>a+x.d,0);
const sci=ins.reduce((a,x)=>a+x.s,0),hasReq=m.req.some(k=>S.i.has(k));
return{sf,days:m.days*WN[S.w].t/sf,m,g,b,p,c,ins,dry,fuel,wet,cost,rel,avail,need,sci,hasReq,cap:L[S.l].cap,okMass:wet<=L[S.l].cap,okBud:cost<=m.budget}}
function grp(title,hint,items,key,fmt){return `<section><h2>${title}</h2><p class="hint">${hint}</p><div class="opts">`+items.map((x,i)=>`<button class="o ${S[key]===i?'sel':''}" data-f="${key}${i}" aria-pressed="${S[key]===i}" onclick="S.${key}=${i};draw()"><b>${x.n}</b><small>${fmt(x)}</small></button>`).join('')+'</div></section>'}
function draw(){const m=M[S.m],fa=document.activeElement&&document.activeElement.dataset?document.activeElement.dataset.f:null;
let h=HOW+`<section><h2>1 · Choose Mission</h2><p class="hint">${m.d}</p><div class="opts">`+Object.entries(M).map(([k,x])=>`<button class="o ${S.m===k?'sel':''}" data-f="m${k}" aria-pressed="${S.m===k}" onclick="pick('${k}')"><b>${x.n}</b><small>Budget $${x.budget}M · Δv ${x.dv} km/s</small><small>Science target: ${x.target} pts · ${DIF[k]}</small></button>`).join('')+'</div></section>';
h+=grp('1b · Mission Type','How you explore matters: orbiters are cheap and safe, rovers and sample returns earn more science but cost mass and money.',TY,'t',x=>x.d);
h+=grp('2 · Launch Vehicle','Bigger rockets lift more mass but eat the budget.',L,'l',x=>`Lifts ${x.cap} kg · $${x.c}M · ${x.r}% reliable`);
h+=grp('3 · Spacecraft Bus','Cheap buses fail more often and offer little radiation shielding.',B,'b',x=>`${x.m} kg · $${x.c}M · reliability ${x.r>=0?'+':''}${x.r}`);
h+=`<section><h2>4 · Science Payload</h2><p class="hint">Required for this mission: <b>${m.reqT}</b>. Each instrument adds mass, power draw and failure risk.</p><div class="opts">`+Object.entries(I).map(([k,x])=>`<button class="o ${S.i.has(k)?'sel':''}" data-f="i${k}" aria-pressed="${S.i.has(k)}" onclick="tog('${k}')"><b>${x.n}</b><small>${x.m} kg · $${x.c}M · ${x.d} W</small><small>Science +${x.s}</small></button>`).join('')+'</div></section>';
h+=grp('5 · Power System','Solar output drops with distance from the Sun. RTGs work anywhere but are expensive.',P,'p',x=>`${x.m} kg · $${x.c}M · ${x.w} W${x.rtg?'':' at Earth'}`);
h+=grp('6 · Communications','Deep space needs a higher data rate to send your results home.',C,'c',x=>`${x.m} kg · $${x.c}M · rate ${x.rate} · ${x.d} W`);
h+=grp('7 · Part Quality','Trade cost against reliability.',G,'g',x=>x.t);
h+=grp('8 · Delta-v Margin','Extra fuel for surprise trajectory corrections.',MG,'mg',x=>x.t);
h+=grp('9 · Orbital Window','Pick when and how to depart. Alignment saves fuel but costs time or money.',WN,'w',x=>x.d);
h+=AUTO();
$('left').innerHTML=h;
const k=calc(),bar=(v,mx,bad)=>`<div class="bar ${bad?'over':''}"><i style="width:${clamp(v/mx*100,0,100)}%"></i></div>`;
$('stats').innerHTML=`<div class="row"><span>Cost</span><b class="${k.okBud?'':'bad'}">$${k.cost.toFixed(0)}M / $${k.m.budget}M</b></div>${bar(k.cost,k.m.budget,!k.okBud)}
<div class="row"><span>Launch mass</span><b class="${k.okMass?'':'bad'}">${k.wet.toFixed(0)} / ${k.cap} kg</b></div>${bar(k.wet,k.cap,!k.okMass)}
<div class="row"><span>Dry mass</span><b>${k.dry.toFixed(0)} kg</b></div><div class="row"><span>Fuel needed</span><b>${k.fuel.toFixed(0)} kg</b></div><div class="row"><span>Transit time</span><b>${k.days>=365?(k.days/365).toFixed(1)+' yr':Math.round(k.days)+' days'}</b></div>
<div class="row"><span>Cruise speed</span><b>${(9*k.sf/WN[S.w].t).toFixed(1)} km/s</b></div>
<div class="row"><span>Power</span><b class="${k.avail>=k.need?'good':'bad'}">${k.avail.toFixed(0)} / ${k.need} W</b></div>${bar(k.avail,k.need,k.avail<k.need)}
<div class="row"><span>Comms rate</span><b class="${k.c.rate>=k.m.need?'good':'bad'}">${k.c.rate} / ${k.m.need}</b></div>
<div class="row"><span>Science</span><b>${k.sci} / ${k.m.target} pts</b></div>
<div class="row"><span>Spacecraft reliability</span><b>${k.rel.toFixed(0)}%</b></div>`;
const ck=[[k.okMass,'Fits on the rocket','Too heavy: pick a bigger launcher or remove equipment.'],[k.okBud,'Within budget','Over budget: choose cheaper parts or a smaller launcher.'],[k.hasReq,'Has the key instrument ('+k.m.reqT+')','Add: '+k.m.reqT+'.'],[k.avail>=k.need,'Enough electrical power','Add a bigger solar array or an RTG.'],[k.c.rate>=k.m.need,'Antenna strong enough','Weak antenna: some data will be lost.'],[k.sci>=k.m.target,'Science target reachable','Add more instruments.']];
$('warns').innerHTML='<ul class="ck">'+ck.map(c=>`<li><span aria-hidden="true">${c[0]?'✅':'❌'}</span><span><b>${c[1]}</b>${c[0]?'':'<small>'+c[2]+'</small>'}</span></li>`).join('')+'</ul>';
$('go').disabled=S.busy||!k.okMass||!k.okBud;$('go').textContent=!k.okMass?'Too heavy to launch':!k.okBud?'Over budget':'🚀 LAUNCH!';
if(fa){const e=document.querySelector('[data-f="'+fa+'"]');if(e)e.focus({preventScroll:true})}}
function pick(k){AM='';S.m=k;S.i=new Set(M[k].req.slice(0,1));$('out').innerHTML='';draw()}
function tog(k){S.i.has(k)?S.i.delete(k):S.i.add(k);draw()}
const spd=()=>+$('spd').value||1;const sl=ms=>new Promise(r=>setTimeout(r,ms/spd()));
$('go').onclick=async()=>{const k=calc(),m=k.m;S.busy=true;draw();
$('out').innerHTML='<section><h2>Mission Control</h2><ol id="steps" class="steps" aria-label="Mission phases"><li>1 Launch</li><li>2 Cruise</li><li>3 Arrival</li><li>4 Science</li></ol><canvas id="cv" width="800" height="320" role="img" aria-label="Animation of your spacecraft flight" style="width:100%;height:auto;border-radius:10px;background:#04060f"></canvas><p id="cap" aria-live="polite" style="margin:8px 0 0"></p></section><section><h2>Mission Log</h2><div id="log" aria-live="polite" role="log"></div></section>';$('out').scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});A.col=m.col;A.tn=S.m[0].toUpperCase()+S.m.slice(1);A.tr=S.m==='asteroid'?13:S.m==='moon'?20:26;A.days=k.days;A.parts=[];A.cause='';A.time=0;A.rocket=S.l;A.sm=1;A.oa=-2.2;A.rev=0;A.rv=0;A.lift=0;A.lifting=0;A.cs=clamp(k.sf/WN[S.w].t,.5,2.2);A.as=1+.5*Math.max(0,(k.cap-k.wet)/k.cap);A.ls=1+MG[S.mg].v;
const log=(t,c)=>{const p=document.createElement('p');p.innerHTML=t;if(c)p.className=c;$('log').appendChild(p);$('log').scrollTop=1e9};
const end=async(why,sci)=>{await sl(why==='Mission complete'?2200:4000);S.busy=false;draw();report(k,why,sci)};
setPh('ascent');log('T-10 … ignition sequence start.');await sl(2700);
if(Math.random()*100>L[S.l].r){A.cause=rnd(WHY.launch)+' (This launcher is '+L[S.l].r+'% reliable.)';setPh('boom');log('💥 The rocket failed during ascent. Payload lost.','bad');log('Cause: '+A.cause,'bad');return end('Launch failure',0)}
log('✅ Liftoff! Atmosphere cleared, spacecraft in orbit.','good');await sl(1500);
A.evb=1;setPh('cruise');log(`Trans-planetary injection burn complete (${WN[S.w].n}). Cruise: ~${Math.round(k.days)} days at ${(9*k.sf/WN[S.w].t).toFixed(1)} km/s.`);await sl(1100);
let ins=[...S.i],pl=1,cl=1,lk=0,cd=1;
let stop=false,doom=null;const esl=async ms=>{if(stop)throw'stop';await sl(ms);if(stop)throw'stop'},elog=(t,c)=>{if(stop)throw'stop';log(t,c)};
const evs=(async()=>{try{if(Math.random()<1.3*m.rad*Math.sqrt(k.days/m.days)){A.stormT=420;elog('☢ Radiation storm hits the spacecraft!','warn');await esl(1600);
if(Math.random()>k.b.sh&&ins.length){const lost=ins.splice(Math.floor(Math.random()*ins.length),1)[0];elog(`Shielding insufficient: the ${I[lost].n} was damaged.`,'bad')}else elog('Shielding held. No damage.','good');await esl(1600)}
else{elog('Quiet space weather. Systems nominal.');await esl(800)}
const extra=Math.random()*.15,mg=MG[S.mg].v;
if(Math.random()<.5){elog(`🛠 Trajectory correction required (+${(extra*100).toFixed(0)}% Δv).`,'warn');await esl(900);
if(extra>mg){elog('Fuel margin too small! Insertion is marginal.','bad');if(Math.random()<.5){A.cause='A +'+(extra*100).toFixed(0)+'% Δv correction was needed but the margin was only '+(mg*100).toFixed(0)+'%, so the tanks ran dry.';setPh('boom');elog('🔥 Out of fuel before arrival. Mission lost.','bad');elog('Cause: '+A.cause,'bad');doom='Fuel exhausted';return}}else elog('Correction burn done within margin.','good');await esl(900)}
if(Math.random()<.4){A.metT=300;elog('Micrometeoroid swarm: minor hits, no critical damage.');await esl(1800)}
if(Math.random()<.3){A.showerT=420;elog('☄ Meteor shower! The spacecraft flies through a dense stream of debris.','warn');await esl(2200);
if(!P[S.p].rtg&&Math.random()>B[S.b].sh*.6){pl=.8;elog('Solar panels were pitted by impacts: power -20%.','bad')}else if(ins.length&&Math.random()>B[S.b].sh){const lost=ins.splice(Math.floor(Math.random()*ins.length),1)[0];elog('A strike damaged the '+I[lost].n+'.','bad')}else elog('Shielding held. No damage from the meteor shower.','good');await esl(1500)}
if(Math.random()<.28){A.glT=300;elog('⚠ Flight computer glitch! The spacecraft enters safe mode.','warn');await esl(1800);
if(Math.random()*100<k.rel+8)elog('Watchdog reset worked. Systems restored.','good');else if(ins.length){const lost=ins.splice(Math.floor(Math.random()*ins.length),1)[0];elog('Recovery failed: the '+I[lost].n+' could not be restarted.','bad')}await esl(1200)}
if(Math.random()<.28){A.flrT=300;elog('☀ Solar flare! A burst of charged particles hits the antenna electronics.','warn');await esl(1800);if(Math.random()>B[S.b].sh*.5){cl=.85;elog('Communications electronics damaged: data rate -15%.','bad')}else elog('Shielding protected the radio. No damage.','good');await esl(1200)}
if(Math.random()<.22){A.lkT=300;elog('🛢 Fuel valve leak! Propellant is escaping.','warn');await esl(1800);if(Math.random()*100<k.rel+10)elog('Valve sealed in time. Only a little fuel lost.','good');else{lk=.12;elog('Leak not fully sealed: the landing burn will be risky.','bad')}await esl(1200)}
if(Math.random()<.18){A.twT=300;elog('🌠 Lucky gravity tailwind! A passing body gives the spacecraft a free boost.','good');await esl(1800);lk-=.05;elog('Landing odds improved.','good');await esl(1200)}
if(Math.random()<.28){const d=Math.random()<.5;elog(d?'🎯 Sensor calibration drift detected: data will be a bit noisier.':'🎯 Perfect calibration run: sensors are extra precise.',d?'warn':'good');cd=d?.9:1.1;await esl(1500)}
{const ev=MEV[S.m];if(ev&&Math.random()<Math.min(.9,ev.p+.15)){A.evT=360;A.evC=ev.c;A.evX=ev.t;elog('⚠ '+ev.t.slice(2)+': '+ev.l,ev.v>1?'good':'warn');await esl(2000);
if(ev.fx==='sol'){if(!P[S.p].rtg){pl*=ev.v;elog('Solar output cut to '+Math.round(ev.v*100)+'%.','bad')}else elog('The RTG is unaffected.','good')}
else if(ev.fx==='land'){lk+=ev.v;elog('The arrival is more dangerous now.','bad')}
else if(ev.fx==='ins'){if(ins.length&&Math.random()>B[S.b].sh){const lost=ins.splice(Math.floor(Math.random()*ins.length),1)[0];elog('The '+I[lost].n+' was damaged.','bad')}else elog('Shielding protected the electronics.','good')}
else if(ev.fx==='cd'){cd*=ev.v;elog(ev.v>1?'Bonus science opportunity: +20% data!':'Image quality reduced: science -'+Math.round((1-ev.v)*100)+'%.',ev.v>1?'good':'bad')}
await esl(1200)}}}catch(e){if(e!=='stop')throw e}})();
A.evb=0;{let n=0;while(A.p<.999&&A.ph==='cruise'&&n++<900)await new Promise(r=>setTimeout(r,60))}stop=true;A.stormT=A.metT=A.showerT=A.glT=A.flrT=A.lkT=A.twT=A.evT=0;if(doom)return end(doom,0);
setPh('land');log('Arrival! Beginning orbit insertion / landing sequence …');await sl(3600);
if(Math.random()<TY[S.t].lr*(.5-k.rel/200)+lk){A.cause=rnd(['mars','venus','titan'].includes(S.m)?WHY.arrive.concat('The parachute failed to deploy in the atmosphere.'):WHY.arrive)+' (Spacecraft reliability: '+k.rel.toFixed(0)+'%.)';if(lk>0)A.cause='An earlier fuel leak left too little propellant for the braking burn. (Spacecraft reliability: '+k.rel.toFixed(0)+'%.)';setPh('boom');log('💥 Insertion/landing failed. Spacecraft lost.','bad');log('Cause: '+A.cause,'bad');return end('Arrival failure',0)}
setPh('done');log('✅ '+TY[S.t].ok+' Starting science operations.','good');await sl(1000);if(S.t===2){log('🤖 The rover drives out to explore and analyse the terrain…');await sl(3500)}
const ok=ins.filter(x=>{const f=Math.random()*100>(100-k.rel)*1.2;if(!f)log(`${I[x].n} failed during operations.`,'bad');return f});
const pf=Math.min(1,k.avail*pl/k.need),cf=Math.min(1,k.c.rate*cl/m.need);
let sci=ok.reduce((a,x)=>a+I[x].s,0)*pf*cf*cd;if(!m.req.some(r=>ok.includes(r))){sci*=.4;log('Required instrument unavailable: science value cut by 60%.','warn')}
log(`Data returned: ${sci.toFixed(0)} pts (power ${(pf*100).toFixed(0)}%, comms ${(cf*100).toFixed(0)}%).`,'good');await sl(600);
if(S.t===3){log('🚀 Samples collected. The ascent vehicle is launching from the surface…');A.lifting=1;const wl=async x=>{let n=0;while((A.lift||0)<x&&n++<300)await new Promise(r=>setTimeout(r,50))};await wl(.45);
if(Math.random()<.06+(.5-k.rel/200)*.8){A.lifting=0;A.cause='The ascent vehicle failed to reach orbit, so the samples never left the surface. (Spacecraft reliability: '+k.rel.toFixed(0)+'%.)';setPh('boom');log('💥 Ascent failed. Samples lost.','bad');log('Cause: '+A.cause,'bad');return end('Return failure',sci*.4)}
await wl(1);A.lifting=0;A.lift=0;A.rev=1;A.evb=0;setPh('cruise');log('🛰 Orbit reached. The sample capsule is heading back to Earth…','good');await sl(500);
{let n=0;while(A.p<.999&&n++<900)await new Promise(r=>setTimeout(r,60))}
A.rv=1;setPh('ascent');A.p=1;log('☄ Re-entry! The capsule hits Earth\u2019s atmosphere and opens its parachute…','warn');
{let n=0;while(A.p>.02&&n++<400)await new Promise(r=>setTimeout(r,60))}log('✅ Splashdown! The samples are recovered on Earth.','good');await sl(1500)}
end('Mission complete',sci)};
function report(k,why,sci){const m=k.m,pct=sci/m.target,left=Math.max(0,m.budget-k.cost);
const score=sci?Math.min(100,pct*100)*.75+Math.min(25,left/m.budget*30):0;
const gr=score>=90?'S':score>=75?'A':score>=60?'B':score>=40?'C':score>0?'D':'F';
const col=gr<'C'||gr==='S'?'good':'bad';LAST={s:Math.round(score),g:gr,m:m.n,c:Math.round(k.cost)};
$('out').innerHTML+=`<section class="card"><h2>Report Card</h2><div class="grade ${col}">${gr}</div><p class="sub">${why} · Score ${score.toFixed(0)}/100</p>
<table><tr><td>Mission</td><td>${m.n} · ${TY[S.t].n}</td></tr>${A.cause?'<tr><td>Cause of failure</td><td>'+A.cause+'</td></tr>':''}<tr><td>Science returned</td><td>${sci.toFixed(0)} / ${m.target} pts (${(pct*100).toFixed(0)}%)</td></tr><tr><td>Total cost</td><td>$${k.cost.toFixed(0)}M of $${m.budget}M</td></tr><tr><td>Budget left</td><td>$${left.toFixed(0)}M</td></tr><tr><td>Launch mass</td><td>${k.wet.toFixed(0)} kg</td></tr><tr><td>Spacecraft reliability</td><td>${k.rel.toFixed(0)}%</td></tr></table><div class="tips"><b>💡 Tips</b>${tipsFor(k,why,sci,score).map(t=>'<p>'+t+'</p>').join('')}</div>
${score>0?'<p><input id="nm" maxlength="14" placeholder="Your name" style="padding:9px;border-radius:8px;border:1px solid var(--line);background:transparent;color:var(--ink);font:inherit"> <button class="o" style="display:inline-block;width:auto" onclick="saveHS()">🏆 Save score</button></p>':''}<button class="go" style="max-width:260px" onclick="$('out').innerHTML='';scrollTo(0,0)">Redesign Mission</button></section>`;
$('out').scrollIntoView({behavior:'smooth',block:'end'})}
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,W=800,H=320;
const A={ph:'idle',scene:'ascent',p:0,f:0,time:0,parts:[],col:'#999',tn:'',tr:26,days:1,on:0,stormT:0,metT:0,flash:0,bx:0,by:0,br:0};
const DIF={moon:'Easy',asteroid:'Medium',venus:'Medium',mars:'Medium',europa:'Hard',titan:'Hard',io:'Very Hard',enceladus:'Very Hard',triton:'Extreme'};let AM='';
const HOW=`<section><h2>How to play</h2><div class="how"><div><b>1. Design</b><br>Pick a mission, then choose a rocket, spacecraft and instruments. Stuck? Press Auto-Design.</div><div><b>2. Balance</b><br>Heavier means more fuel and more cost. Cheaper parts break more often. Follow the checklist on the right.</div><div><b>3. Launch</b><br>Watch the flight. You earn a grade from F to S, plus tips to improve.</div></div><details><summary>What do the terms mean?</summary><dl><dt>Payload</dt><dd>The science instruments your spacecraft carries.</dd><dt>Delta-v</dt><dd>The push needed to change speed. More delta-v needs much more fuel.</dd><dt>RTG</dt><dd>A nuclear battery that gives steady power far from the Sun.</dd><dt>Reliability</dt><dd>How likely your parts are to work without breaking.</dd><dt>Orbital window</dt><dd>The timing of your departure. Good alignment saves fuel.</dd><dt>Comms rate</dt><dd>How fast your antenna can send data home.</dd></dl></details></section>`;
const AUTO=()=>`<section><h2>Need help?</h2><p class="hint">Let the computer build a balanced spacecraft for this mission. You can still change anything.</p><button class="o" style="width:auto" data-f="auto" onclick="auto()"><b>✨ Auto-Design for me</b></button>${AM?'<p class="hint" role="status">'+AM+'</p>':''}</section>`;
const TY=[{n:'Lander',d:'Land a science package on the surface. The baseline mission.',m:0,c:0,dv:1,w:0,tg:1,bg:1,lr:1,ok:'Touchdown confirmed.'},
{n:'Orbiter',d:'Circle the body and map it. No landing: 20% less delta-v and half the arrival risk, but less science.',m:0,c:-20,dv:.8,w:20,tg:.85,bg:1,lr:.5,ok:'Stable science orbit achieved.'},
{n:'Rover',d:'Drive across the surface. +250 kg, +$180M, +100 W, harder landing, but 30% more science and a 25% bigger budget.',m:250,c:180,dv:1,w:100,tg:1.3,bg:1.25,lr:1.3,ok:'Touchdown! The rover rolls off its ramp.'},
{n:'Sample Return',d:'Grab samples and fly them home. +400 kg, +$300M, delta-v x1.6 and a risky ascent, but 10% more science and a 60% bigger budget.',m:400,c:300,dv:1.6,w:40,tg:1.1,bg:1.6,lr:1.2,ok:'Touchdown! Sample collection begins.'}];
const MEV={moon:{p:.5,t:'🌙 LUNAR DUST CLOUD',l:'Electrostatic dust clings to the solar panels.',c:'#b9b9b9',fx:'sol',v:.88},
mars:{p:.5,t:'🌪 GLOBAL DUST STORM',l:'A planet-wide storm blots out the Sun.',c:'#d9822b',fx:'sol',v:.7},
venus:{p:.5,t:'☁ ACID CLOUD CORROSION',l:'Sulphuric acid eats at the electronics.',c:'#e8d34a',fx:'ins'},
io:{p:.55,t:'🌋 VOLCANIC ERUPTION',l:'A giant plume erupts near the landing zone.',c:'#ff4a2a',fx:'land',v:.1},
europa:{p:.5,t:'☢ JUPITER RADIATION BELT',l:'The spacecraft crosses the most intense radiation belt in the Solar System.',c:'#9a6bff',fx:'ins'},
titan:{p:.5,t:'🌫 THICK ORANGE HAZE',l:'Methane smog hides the surface from the cameras.',c:'#d99a3a',fx:'cd',v:.85},
asteroid:{p:.5,t:'🪨 BOULDER FIELD',l:'The target site is covered in house-sized rocks.',c:'#8b7d6b',fx:'land',v:.08},
enceladus:{p:.5,t:'💧 GEYSER ERUPTION',l:'A fresh plume bursts out right as you pass.',c:'#9fe3ff',fx:'cd',v:1.2},
triton:{p:.5,t:'❄ DEEP FREEZE',l:'Temperatures plunge and the electronics struggle to stay warm.',c:'#a9c4ff',fx:'ins'}};
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const WHY={launch:['The main engine turbopump failed shortly after liftoff.','The guidance computer lost attitude control and the rocket tumbled.','A fuel-line leak caused an engine shutdown during ascent.','Stage separation failed and the upper stage never ignited.','Structural stress at Max-Q tore the rocket apart.'],arrive:['The landing thrusters cut out too early during the final braking burn.','A navigation error put the spacecraft outside the safe entry corridor.','The braking engine failed to ignite for orbit insertion.','A critical component failed under thermal stress during approach.']};
let LASTA='',AN=0;
const AFF={moon:['cam','seis','mag','dust'],mars:['arm','drill','spec','wx','dust','cam'],europa:['radar','mag','spec','cam'],venus:['spec','wx','cam','mag'],titan:['spec','wx','seis','cam'],asteroid:['arm','drill','dust','cam','mag'],io:['therm','spec','mag','cam','dust'],enceladus:['plume','gc','spec','therm','cam'],triton:['radar','seis','therm','cam','mag']};
function why(m,mk){const r=[];if(m.sun<.1)r.push('very little sunlight, so it favours strong or nuclear power');else if(m.sun>1.5)r.push('plenty of sunlight, so solar panels are efficient');if(m.rad>=.5)r.push('severe radiation, so it shields the electronics');else if(m.rad>=.2)r.push('moderate radiation, so it weighs shielding');if(m.need>=6)r.push('a long way home, so it picks a powerful antenna');if(m.dv>=4)r.push('a big delta-v bill, so it needs a strong rocket');if(m.budget<=900)r.push('a tight budget, so it keeps costs down');return r.length?r.slice(0,3).join('; ')+'.':'a balanced design.'}
function auto(){const keep={l:S.l,b:S.b,p:S.p,c:S.c,g:S.g,mg:S.mg,w:S.w,i:new Set(S.i)},ik=Object.keys(I),cand=[];
const mfit=(k,b)=>{const m=k.m,af=AFF[S.m]||[],hit=[...S.i].filter(x=>af.includes(x)).length,miss=S.i.size-hit,rd=1-m.rad*(1-B[b].sh)*.6,pw=Math.min(1.25,k.avail/k.need),cm=Math.min(1.25,k.c.rate/m.need);return(1+.06*hit)*Math.pow(.96,miss)*rd*(.9+.1*pw)*(.9+.1*cm)};
const rm=M[S.m].req.reduce((a,r)=>a|1<<ik.indexOf(r),0);
const bits=v=>v.toString(2).replace(/0/g,'').length,aff=(AFF[S.m]||ik).map(x=>ik.indexOf(x)),rq=M[S.m].req.map(x=>ik.indexOf(x));
const mks=[...new Set(Array.from({length:30},()=>{let mk=1<<rnd(rq);const n=2+Math.floor(Math.random()*6);while(bits(mk)<n)mk|=1<<(Math.random()<.65?rnd(aff):Math.floor(Math.random()*ik.length));return mk}))];
for(let l=0;l<L.length;l++)for(let b=0;b<B.length;b++)for(let p=0;p<P.length;p++)for(let c=0;c<C.length;c++)for(let g=0;g<G.length;g++)for(const mk of mks){
Object.assign(S,{l,b,p,c,g,mg:2,i:new Set(ik.filter((_,j)=>mk>>j&1))});const k=calc();if(!k.okMass||!k.okBud||!k.hasReq)continue;
const pct=Math.min(1,k.sci*Math.min(1,k.avail/k.need)*Math.min(1,k.c.rate/k.m.need)/k.m.target),e=(pct*75+Math.min(25,(k.m.budget-k.cost)/k.m.budget*30))*L[l].r*k.rel*k.rel/1e6*mfit(k,b);
cand.push({e,l,b,p,c,g,mk})}
cand.sort((x,y)=>y.e-x.e);
if(cand.length){const top=cand.filter((x,i)=>i<60&&x.e>=cand[0].e*.8),key=x=>[x.l,x.b,x.p,x.c,x.g,x.mk].join('-');
let pool=top.filter(x=>key(x)!==LASTA);if(!pool.length)pool=top;const pk=pool[Math.floor(Math.random()*pool.length)];LASTA=key(pk);
const base={l:pk.l,b:pk.b,p:pk.p,c:pk.c,g:pk.g,i:new Set(ik.filter((_,j)=>pk.mk>>j&1))},ok=[];
for(let mg=2;mg<MG.length;mg++){Object.assign(S,base,{mg});const k=calc();if(k.okMass&&k.okBud)ok.push(mg)}
const mg=ok.length?ok[Math.floor(Math.random()*ok.length)]:2;Object.assign(S,base,{mg});AN++;
AM=`Tailored for ${M[S.m].n}: ${why(M[S.m])} Scenario #${AN}: ${L[S.l].n} · ${B[S.b].n} · ${P[S.p].n} · ${C[S.c].n} · ${G[S.g].n} · ${MG[S.mg].n} · ${S.i.size} instruments. Press Auto-Design again for a different scenario.`}
else{Object.assign(S,keep);AM='No design fits this budget with the chosen window. Try another orbital window.'}
$('out').innerHTML='';draw()}
function tipsFor(k,why,sci,score){const t=[],m=k.m;
if(why==='Launch failure')t.push('The rocket failed on the way up. Try a more reliable launcher or Flight-Proven parts.');
if(why==='Fuel exhausted')t.push('You ran out of fuel. Use a bigger delta-v margin (10% or 20%).');
if(why==='Arrival failure')t.push('The landing failed. Better bus and parts raise reliability and your odds.');
if(why==='Mission complete'){if(k.avail<k.need)t.push('Power was short: add a bigger solar array or an RTG.');if(k.c.rate<m.need)t.push('Antenna too weak: some data was lost.');if(!k.hasReq)t.push('Add the key instrument: '+m.reqT+'.');if(sci<m.target)t.push('Add more instruments to reach the science target.');if(m.budget-k.cost>m.budget*.3)t.push('You have budget left: buy better parts for higher reliability.')}
if(score<60)t.push('Press Auto-Design to see a balanced spacecraft.');if(!t.length)t.push('Excellent design! Try a harder mission.');return t}
const CAP={ascent:['Liftoff','The rocket must climb through the atmosphere. A more reliable launcher means a safer climb.'],cruise:['Cruise','Travelling through space. Radiation storms and course corrections can happen.'],land:['Arrival','The spacecraft must slow down with its remaining fuel and land safely.'],done:['Science','Success! The instruments are collecting data and sending it home.'],boom:['Mission lost','Something went wrong. See the tips on your report card.']};
const STEP={ascent:0,cruise:1,land:2,done:3};
const hx=c=>[1,3,5].map(i=>parseInt(c.substr(i,2),16));
const mix=(a,b,t)=>'rgb('+hx(a).map((v,i)=>Math.round(v+(hx(b)[i]-v)*t)).join(',')+')';
const emit=(px,py,vx,vy,c,r,d)=>{if(A.parts.length<500)A.parts.push({x:px,y:py,vx,vy,c,r,d,l:1})};
const EX=()=>W-100;
const ORB=(a,rf)=>{const t=-.22,ex=190*rf*Math.cos(a),ey=70*rf*Math.sin(a);return[W/2+ex*Math.cos(t)-ey*Math.sin(t),H/2+10+ex*Math.sin(t)+ey*Math.cos(t)]};
function shipPos(){const p=A.p;
if(A.ph==='ascent'){const turn=clamp((p-.16)/.84,0,1);return[W/2+turn*turn*48,H-95-Math.min(1,p*2.5)*H*.4]}
if(A.ph==='cruise'){const q=A.rev?1-p:p,u=1-q,y0=H*.55;return[u*u*90+2*u*q*W/2+q*q*EX(),u*u*y0+2*u*q*30+q*q*y0]}
if(S.t===1&&(A.ph==='land'||A.ph==='done'))return ORB(A.oa||0,A.ph==='land'?1.35-.35*p:1);
if(A.ph==='land')return[W/2,30+p*(H-132)];return[W/2,H-102-(A.lift||0)*H]}
function setPh(ph){const q=shipPos();
if(ph==='boom'){A.flash=1;A.bx=q[0];A.by=q[1];A.br=0;const n=RM?15:70;for(let i=0;i<n;i++){const a=Math.random()*6.3,v=1+Math.random()*4;emit(q[0],q[1],Math.cos(a)*v,Math.sin(a)*v,['#ffd54a','#ff9a2f','#ff5a3c','#cfd6e6'][i%4],3,.012)}}
else A.scene=ph==='done'?'land':ph;
if(ph==='done'&&S.t!==1)for(let i=0;i<30;i++)emit(W/2,H-84,(Math.random()-.5)*5,-Math.random()*1.5,'#d9c9a0',4,.015);
if(ph!=='boom'&&A.ph!=='idle'&&ph!==A.ph)A.fade=1;A.ph=ph;A.p=0;const c=ph==='boom'&&A.cause?['Mission lost',A.cause]:CAP[ph];if($('cap'))$('cap').innerHTML='<b>'+c[0]+':</b> '+c[1];
const idx=STEP[ph==='boom'?A.scene:ph];document.querySelectorAll('#steps li').forEach((li,i)=>li.className=ph==='boom'?(i<idx?'ok':i===idx?'fail':''):(i<idx?'ok':i===idx?(ph==='done'?'ok':'on'):''));
if(!A.on){A.on=1;loop()}}
let DT=1,LT=0;function loop(t){if(t){DT=LT?Math.min(2,(t-LT)/16.667):1;LT=t}const cv=$('cv');if(cv)drawCv(cv);requestAnimationFrame(loop)}
function drawCv(cv){const x=cv.getContext('2d'),ph=A.ph,v=spd()*DT,sc=A.scene,prevTime=A.time;A.f++;A.time+=v/60;
const tick=rate=>Math.floor(A.time*rate)!==Math.floor(prevTime*rate);
const sp={ascent:.0045*(A.as||1)*(.5+A.p),cruise:.00286*Math.sqrt(A.cs||1),land:.005*(A.ls||1)*(1.2-.3*A.p)}[ph];if(sp)A.p=ph==='ascent'&&A.rv?Math.max(0,A.p-sp*v):Math.min(1,A.p+sp*v);if(A.lifting)A.lift=Math.min(1.05,(A.lift||0)+.004*(1+3*(A.lift||0))*v);const p=A.p;if(S.t===1&&sc==='land'&&A.oa!=null)A.oa+=(ph==='land'?.018*(1.2-.4*p):.011)*v;
const TS=Math.min(1.5,Math.max(1,W/(cv.clientWidth||W))),tx=(t,px,py,al='center',c='#fff',f='bold 15px system-ui,sans-serif')=>{let fs=15;f=f.replace(/(\d+)px/,(m,n)=>(fs=Math.round(n*TS))+'px');x.font=f;x.textAlign=al;x.fillStyle=c;x.shadowColor='#000';x.shadowBlur=4;const i=t.indexOf(' ',t.length/2),ls=TS>1&&t.length>45&&i>0?[t.slice(0,i),t.slice(i+1)]:[t];ls.forEach((l,j)=>x.fillText(l,px,py+j*fs*1.25));x.shadowBlur=0};
const pl=(cx,cy,r,c,atm)=>{if(atm){const ag=x.createRadialGradient(cx,cy,r*.86,cx,cy,r+9);ag.addColorStop(0,'rgba(120,180,255,0)');ag.addColorStop(1,atm);x.fillStyle=ag;x.beginPath();x.arc(cx,cy,r+9,0,7);x.fill()}const g=x.createRadialGradient(cx-r*.4,cy-r*.4,r*.1,cx,cy,r);g.addColorStop(0,mix(c,'#ffffff',.4));g.addColorStop(.6,c);g.addColorStop(1,mix(c,'#000000',.68));x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.save();x.beginPath();x.arc(cx,cy,r,0,7);x.clip();const shade=x.createLinearGradient(cx-r*.08,cy,cx+r,cy);shade.addColorStop(0,'rgba(0,0,0,0)');shade.addColorStop(.38,'rgba(0,0,0,.06)');shade.addColorStop(1,'rgba(0,0,0,.62)');x.fillStyle=shade;x.fillRect(cx-r,cy-r,r*2,r*2);x.restore()};
const earth=(cx,cy,r)=>{pl(cx,cy,r,'#2a6fd6','rgba(120,180,255,.3)');x.save();x.beginPath();x.arc(cx,cy,r,0,7);x.clip();x.translate(cx,cy);x.rotate(A.time*.035);x.fillStyle='rgba(65,174,113,.9)';x.beginPath();x.ellipse(-r*.3,-r*.15,r*.34,r*.23,.5,0,7);x.ellipse(r*.38,r*.22,r*.25,r*.16,-.4,0,7);x.ellipse(-r*.05,r*.45,r*.16,r*.1,.2,0,7);x.fill();x.strokeStyle='rgba(220,245,255,.42)';x.lineWidth=Math.max(1,r*.07);for(let i=-1;i<=1;i++){x.beginPath();x.ellipse(i*r*.15,0,r*.78,r*(.24+Math.abs(i)*.1),i*.25,0,7);x.stroke()}x.restore()};
const stars=(a,sh)=>{x.fillStyle='#fff';for(let i=0;i<70;i++){const sy=(i*71+A.time*(2+i%4*2))%H;x.globalAlpha=a*(.45+.35*Math.sin(A.time*.7+i*2.4));x.fillRect(((i*131-sh*(1+i%3))%W+W)%W,sy,i%9===0?2:1.3,i%9===0?2:1.3)}x.globalAlpha=1};
const sy0=shipPos();
const drawLauncher=(rotation=0,size=1,flame=false)=>{const model=ROCKET[A.rocket??S.l],{height,width,boosters,body,accent}=model,pulse=.5+.5*Math.sin(A.time*21);x.save();x.rotate(rotation);x.scale(model.scale*size,model.scale*size);
const steel=x.createLinearGradient(-width*1.6,0,width*1.6,0);steel.addColorStop(0,'#737f91');steel.addColorStop(.22,body);steel.addColorStop(.5,'#f8fbff');steel.addColorStop(.78,body);steel.addColorStop(1,'#58677a');
if(flame){const f=23+pulse*8,g=x.createLinearGradient(0,18,0,18+f*2);x.save();x.shadowColor='#ffad45';x.shadowBlur=14;g.addColorStop(0,'#fff9dc');g.addColorStop(.2,'#ffc15a');g.addColorStop(.6,'#ff713d');g.addColorStop(1,'rgba(255,90,35,0)');x.fillStyle=g;x.beginPath();x.moveTo(-width*.8,18);x.quadraticCurveTo(-width*.4,24+f*.4,0,18+f*2);x.quadraticCurveTo(width*.4,24+f*.4,width*.8,18);x.closePath();x.fill();x.restore()}
for(const offset of boosters){const bw=width*.66;x.save();x.translate(offset,0);x.fillStyle=steel;x.beginPath();x.moveTo(-bw,-height+13);x.lineTo(-bw*.7,-height+4);x.lineTo(-bw*.35,-height);x.lineTo(bw*.35,-height);x.lineTo(bw*.7,-height+4);x.lineTo(bw,-height+13);x.lineTo(bw,8);x.lineTo(-bw,8);x.closePath();x.fill();x.fillStyle=accent;x.fillRect(-bw,-height*.42,bw*2,2);x.fillRect(-bw,-height*.18,bw*2,2);x.fillStyle='#596779';x.beginPath();x.moveTo(-bw,3);x.lineTo(-bw-4,17);x.lineTo(-bw,14);x.closePath();x.fill();x.beginPath();x.moveTo(bw,3);x.lineTo(bw+4,17);x.lineTo(bw,14);x.closePath();x.fill();x.restore()}
x.fillStyle=steel;x.beginPath();x.moveTo(-width,-height+13);x.lineTo(-width*.8,-height+4);x.lineTo(-width*.4,-height);x.lineTo(width*.4,-height);x.lineTo(width*.8,-height+4);x.lineTo(width,-height+13);x.lineTo(width,15);x.lineTo(-width,15);x.closePath();x.fill();
x.fillStyle='rgba(255,255,255,.55)';x.fillRect(-1,-height+15,1,height-19);x.fillStyle=accent;x.fillRect(-width,-height*.54,width*2,2);x.fillRect(-width,-height*.2,width*2,2);
x.fillStyle='#26384d';x.beginPath();x.moveTo(-width,-height+13);x.lineTo(-width*.8,-height+4);x.lineTo(-width*.4,-height);x.lineTo(width*.4,-height);x.lineTo(width*.8,-height+4);x.lineTo(width,-height+13);x.closePath();x.fill();
for(let wi=0;wi<model.windows;wi++){const wy=-height*.73+wi*height*.19;x.fillStyle='#4b6986';x.beginPath();x.ellipse(0,wy,2.7,3.8,0,0,Math.PI*2);x.fill();x.strokeStyle='rgba(240,250,255,.8)';x.lineWidth=.8;x.stroke()}
x.fillStyle='#465365';x.fillRect(-width*.82,15,width*1.64,4);x.fillStyle='#b8c5d1';x.fillRect(-width,18,width*2,3);
if(model.reusable){x.strokeStyle='#74bfd2';x.lineWidth=1.5;x.beginPath();x.moveTo(-width*.65,10);x.lineTo(-width*1.65,20);x.moveTo(width*.65,10);x.lineTo(width*1.65,20);x.stroke()}
x.restore()};
if(sc==='ascent'){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,mix('#3c7fe0','#02030a',Math.min(1,p*1.4)));g.addColorStop(1,mix('#bfe0ff','#0a1a40',Math.min(1,p*1.2)));x.fillStyle=g;x.fillRect(0,0,W,H);stars(Math.max(0,(p-.3)*1.4),0);if(ph==='ascent'&&p>.1&&!RM){x.strokeStyle='rgba(255,255,255,.28)';x.lineWidth=1.5;for(let i=0;i<14;i++){const lx=(i*57+30)%W,ly=((A.f*(14+i%5*4)+i*83)%(H+60))-30;x.beginPath();x.moveTo(lx,ly);x.lineTo(lx,ly+22+i%4*8);x.stroke()}}
if(p<.6){x.fillStyle='rgba(255,255,255,'+.8*(1-p*1.6)+')';for(let i=0;i<5;i++){x.beginPath();x.ellipse((i*173+60)%W,(i*97+p*H*2.4)%(H+60),55,14,0,0,7);x.fill()}}
const gy=H-70+p*H*1.6;if(gy<H){x.fillStyle='#3a7d44';x.fillRect(0,gy,W,H-gy);x.fillStyle='#6b7184';x.fillRect(W/2-45,gy,90,7);x.fillStyle='#8a8fa3';x.fillRect(W/2+34,gy-72,8,72)}
if(!A.rv&&p>.5&&p<.95){x.save();x.translate(W/2+(p-.5)*90,sy0[1]+30+(p-.5)*H*1.4);x.rotate((p-.5)*3);x.fillStyle='#9aa3b8';x.fillRect(-6,-12,12,26);x.restore();if(p<.85)tx('Stage separation',W/2+90,sy0[1],'left','#ffd54a')}
if(ph==='ascent'){tx('Altitude: '+Math.round(p*400)+' km',14,26,'left');tx('Velocity: '+Math.round(Math.pow(p,1.3)*7800)+' m/s',14,48,'left','#cfd6e6','13px system-ui');if(!A.rv&&p>.2&&p<.5)tx('Max-Q: peak aerodynamic pressure',W/2+80,sy0[1],'left','#ffd54a','13px system-ui')}}
else if(sc==='cruise'){x.fillStyle='#04060f';x.fillRect(0,0,W,H);stars(1,p*260);if(!RM){const t=(A.f%240)/240,qx=W*(1.1-t*1.3),qy=30+t*120;x.strokeStyle='rgba(255,255,255,'+(1-t)+')';x.lineWidth=2;x.beginPath();x.moveTo(qx,qy);x.lineTo(qx+60,qy-25);x.stroke()}const sg=x.createRadialGradient(40,40,2,40,40,70);sg.addColorStop(0,'rgba(255,230,120,1)');sg.addColorStop(1,'rgba(255,200,60,0)');x.fillStyle=sg;x.fillRect(0,0,140,140);
const ey=H*.55;earth(90,ey,20);pl(W-100,ey,A.tr,A.col,'rgba(255,255,255,.1)');tx('Earth',90,ey+40,'center','#cfd6e6','13px system-ui');tx(A.tn,W-100,ey+A.tr+20,'center','#cfd6e6','13px system-ui');
x.setLineDash([4,7]);x.strokeStyle='#4b5a85';x.lineWidth=2;x.beginPath();x.moveTo(90,ey);x.quadraticCurveTo(W/2,30,EX(),ey);x.stroke();x.setLineDash([]);
x.strokeStyle='#6b93ff';x.lineWidth=3;x.beginPath();x.moveTo(A.rev?EX():90,ey);for(let i=0;i<=p;i+=.02){const t=A.rev?1-i:i,u=1-t;x.lineTo(u*u*90+2*u*t*W/2+t*t*EX(),u*u*ey+2*u*t*30+t*t*ey)}x.stroke();
x.fillStyle='rgba(255,255,255,.15)';x.fillRect(80,H-30,W-160,8);x.fillStyle='#6b93ff';x.fillRect(80,H-30,(W-160)*p,8);tx((A.rev?'Return trip · day ':'Day ')+Math.round(p*A.days)+' of '+Math.round(A.days),W/2,H-40,'center','#fff','13px system-ui')}
else if(S.t===1){x.fillStyle='#02030a';x.fillRect(0,0,W,H);stars(1,A.f*.1);
const cx=W/2,cy=H/2+10,rf=ph==='land'?1.35-.35*p:1,a=A.oa||0,tl=-.22,[ox,oy]=ORB(a,rf),far=Math.sin(a)<0,
dx=-190*Math.sin(a)*Math.cos(tl)-70*Math.cos(a)*Math.sin(tl),dy=-190*Math.sin(a)*Math.sin(tl)+70*Math.cos(a)*Math.cos(tl),ang=Math.atan2(dy,dx);
const sat=()=>{x.save();x.translate(ox,oy);x.rotate(ang);x.fillStyle='#3b6fe0';x.fillRect(-5,-26,10,15);x.fillRect(-5,11,10,15);x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=1;x.strokeRect(-5,-26,10,15);x.strokeRect(-5,11,10,15);x.fillStyle='#e8ecff';x.fillRect(-9,-9,18,18);x.fillStyle='#ffd54a';x.fillRect(-9,-9,18,4);x.fillStyle='#cfd6e6';x.beginPath();x.arc(9,0,6,-Math.PI/2,Math.PI/2);x.fill();
if(ph==='land'){const f=16+(RM?6:Math.random()*14),g=x.createLinearGradient(-9,0,-9-f*1.8,0);g.addColorStop(0,'#fff6b0');g.addColorStop(.5,'#ff9a2f');g.addColorStop(1,'rgba(255,60,20,0)');x.fillStyle=g;x.beginPath();x.moveTo(-9,-5);x.lineTo(-9-f*1.8,0);x.lineTo(-9,5);x.fill()}x.restore()};
x.setLineDash([5,8]);x.strokeStyle='rgba(120,150,255,.5)';x.lineWidth=1.5;x.beginPath();x.ellipse(cx,cy,190*rf,70*rf,tl,0,7);x.stroke();x.setLineDash([]);
for(let k=1;k<=26;k++){const[qx,qy]=ORB(a-k*.045,rf);x.fillStyle='rgba(140,170,255,'+(.5-k*.019)+')';x.beginPath();x.arc(qx,qy,2.2,0,7);x.fill()}
if(far)sat();
pl(cx,cy,72,A.col,'rgba(255,255,255,.14)');
x.setLineDash([5,8]);x.strokeStyle='rgba(120,150,255,.7)';x.lineWidth=1.5;x.beginPath();x.ellipse(cx,cy,190*rf,70*rf,tl,0,Math.PI);x.stroke();x.setLineDash([]);
if(!far)sat();
if(ph==='done'&&!far){x.fillStyle='rgba(61,220,151,'+(.1+.08*Math.sin(A.f/6))+')';x.beginPath();x.moveTo(ox,oy);x.lineTo(cx-26,cy+34);x.lineTo(cx+10,cy+44);x.closePath();x.fill()}
if(ph==='land')tx('Orbit insertion burn…',14,26,'left');
if(ph==='done'){tx('✓ Orbit achieved: mapping the surface',W/2,34,'center','#3ddc97','bold 20px system-ui');earth(W-70,70,14);tx('Earth',W-70,102,'center','#cfd6e6','12px system-ui');for(let i=0;i<4;i++){const t=(A.f/110+i/4)%1;x.fillStyle='rgba(107,147,255,'+(1-t*.7)+')';x.beginPath();x.arc(ox+(W-70-ox)*t,oy+(70-oy)*t-Math.sin(t*3.14)*24,3.5,0,7);x.fill()}tx('Sending data home…',W/2,H-18,'center','#cfd6e6','13px system-ui')}}
else{const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#02030a');g.addColorStop(1,mix(A.col,'#000000',.55));x.fillStyle=g;x.fillRect(0,0,W,H);stars(.8,0);pl(W/2,H+520,600,A.col,'rgba(255,255,255,.12)');x.fillStyle='rgba(0,0,0,.18)';[[-150,-30,26],[120,-24,20],[30,-12,14]].forEach(c=>{x.beginPath();x.ellipse(W/2+c[0],H+c[1],c[2],c[2]*.3,0,0,7);x.fill()});
if(ph==='land')tx(S.t===1?'Orbit insertion burn…':'Braking burn: slowing down…',14,26,'left');if(ph==='done'){const r=(A.f%60)/60;x.strokeStyle='rgba(61,220,151,'+(.8-.8*r)+')';x.lineWidth=3;x.beginPath();x.arc(W/2,H-100,24+r*50,0,7);x.stroke();tx('✓ Mission success',W/2,34,'center','#3ddc97','bold 22px system-ui');earth(W/2+230,60,14);tx('Earth',W/2+230,92,'center','#cfd6e6','12px system-ui');for(let i=0;i<5;i++){const t=(A.f/110+i/5)%1;x.fillStyle='rgba(107,147,255,'+(1-t*.7)+')';x.beginPath();x.arc(W/2+t*230,H-110-t*50-Math.sin(t*3.1)*90,3.5,0,7);x.fill()}tx(S.t===2?'🤖 Rover exploring · sending data home…':'Sending data home…',W/2,H-18,'center','#cfd6e6','13px system-ui');if(!RM&&A.f%4===0)emit(W/2+(Math.random()-.5)*60,H-110,Math.random()-.5,-1-Math.random(),['#ffd54a','#3ddc97','#6b93ff'][A.f%3],3,.015)}}
if(ph==='land'){const[px,py]=sy0,atm=S.t!==1&&['mars','venus','titan'].includes(A.tn.toLowerCase());if(atm&&p<.3){x.fillStyle='rgba(255,140,40,'+.4*(1-p/.3)+')';x.beginPath();x.ellipse(px,py+18,26,44,0,0,7);x.fill()}if(atm&&p>.2&&p<.7){x.fillStyle='#ff7a3c';x.beginPath();x.arc(px,py-72,34,Math.PI,0);x.fill();x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=1;[-34,-12,12,34].forEach(o=>{x.beginPath();x.moveTo(px+o,py-72);x.lineTo(px,py-30);x.stroke()})}if(S.t!==1&&p>.85&&A.f%2===0)emit(W/2+(Math.random()-.5)*40,H-84,(Math.random()-.5)*4,-Math.random()*.8,'#d9c9a0',3,.02)}
if(ph==='done'&&S.t===2&&sc==='land'){const T=A.f*.011,d=40+130*(.5-.5*Math.cos(T)),dir=Math.sin(T)>=0?1:-1,rt=Math.sqrt(360000-d*d),gy=H+520-rt;x.save();x.translate(W/2+d,gy);x.rotate(Math.atan(d/rt));x.scale(dir*1.3,1.3);
x.fillStyle='#3b6fe0';x.fillRect(-19,-23,26,4);x.fillStyle='#e8ecff';x.fillRect(-20,-18,40,9);x.fillStyle='#9aa3b8';x.fillRect(9,-34,3,16);x.fillStyle='#cfd6e6';x.fillRect(6,-39,11,6);x.fillStyle='#ffd54a';x.beginPath();x.arc(15,-36,1.8,0,7);x.fill();
x.strokeStyle='#cfd6e6';x.lineWidth=2;x.beginPath();x.moveTo(19,-13);x.lineTo(28,-19+Math.sin(A.f*.07)*4);x.lineTo(33,-11+Math.sin(A.f*.07)*5);x.stroke();
[-14,0,14].forEach(wx=>{x.save();x.translate(wx,-5);x.fillStyle='#2a2f3d';x.beginPath();x.arc(0,0,5.5,0,7);x.fill();x.strokeStyle='#9aa3b8';x.lineWidth=1.2;x.rotate(A.f*.2*dir);x.beginPath();x.moveTo(-4.5,0);x.lineTo(4.5,0);x.moveTo(0,-4.5);x.lineTo(0,4.5);x.stroke();x.restore()});x.restore();
if(!RM&&A.f%7===0)emit(W/2+d-dir*24,gy-2,-dir*.4,-.25,'#d9c9a0',2,.03)}
if(ph==='ascent'&&p<.18){const smokeFade=1-p/.18;x.save();for(let i=0;i<9;i++){const drift=Math.sin(A.time*1.7+i*2.1)*12,spread=18+i*5,r=12+i*2.2;x.globalAlpha=smokeFade*.12;x.fillStyle=i%2?'#c3d0dd':'#edf3fa';x.beginPath();x.ellipse(W/2+drift+(i%3-1)*spread,H-42-(A.time*18+i*19)%92,r*1.5,r,.12,0,Math.PI*2);x.fill()}x.restore()}
if(ph!=='boom'&&ph!=='idle'&&!(S.t===1&&sc==='land')){const[sx,sy]=sy0,fl=(ph==='ascent'&&!A.rv)||ph==='land'||A.lift>0;x.save();x.translate(sx,sy);if(ph==='ascent'&&!A.rv)x.rotate(clamp((p-.16)/.84,0,1)*.62);
if(sc==='cruise'){const q=A.rev?1-p:p,u=1-q,cdx=2*u*(W/2-90)+2*q*(EX()-W/2),cdy=2*u*(30-H*.55)+2*q*(H*.55-30),ang=Math.atan2(A.rev?-cdy:cdy,A.rev?-cdx:cdx),burn=A.time%6<.72;drawLauncher(ang+Math.PI/2,.72,burn)}
else if(A.rv&&ph==='ascent'){if(p>.15&&!RM||p>.5){const g=x.createLinearGradient(0,-14,0,-80);g.addColorStop(0,'rgba(255,170,60,'+Math.min(.9,p)+')');g.addColorStop(1,'rgba(255,90,30,0)');x.fillStyle=g;x.beginPath();x.moveTo(-14,-12);x.lineTo(0,-80-Math.random()*20);x.lineTo(14,-12);x.fill()}
if(p<.55){x.fillStyle='#ff7a3c';x.beginPath();x.arc(0,-78,36,Math.PI,0);x.fill();x.fillStyle='#f4f6ff';x.beginPath();x.arc(0,-78,36,Math.PI*1.35,Math.PI*1.65);x.lineTo(0,-78);x.fill();x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=1;[-36,-12,12,36].forEach(o=>{x.beginPath();x.moveTo(o,-78);x.lineTo(0,-16);x.stroke()})}
x.fillStyle='#d8dde8';x.beginPath();x.moveTo(-15,10);x.lineTo(-8,-14);x.lineTo(8,-14);x.lineTo(15,10);x.closePath();x.fill();x.fillStyle='#4a4f5c';x.fillRect(-15,10,30,5);x.fillStyle='#5aa9ff';x.beginPath();x.arc(0,-3,3.5,0,7);x.fill()}
else if(ph==='ascent'&&!A.rv){
const model=ROCKET[A.rocket??S.l],{height,width,boosters,body,accent}=model;x.scale(model.scale,model.scale);
const steel=x.createLinearGradient(-width*1.6,0,width*1.6,0);steel.addColorStop(0,'#737f91');steel.addColorStop(.22,body);steel.addColorStop(.5,'#f8fbff');steel.addColorStop(.78,body);steel.addColorStop(1,'#58677a');
if(fl){const pulse=.5+.5*Math.sin(A.time*21),f=26+pulse*8,g=x.createLinearGradient(0,20,0,20+f*2.1);x.save();x.shadowColor='#ffad45';x.shadowBlur=18;g.addColorStop(0,'#fff9dc');g.addColorStop(.18,'#ffc15a');g.addColorStop(.56,'#ff713d');g.addColorStop(1,'rgba(255,90,35,0)');x.fillStyle=g;x.beginPath();x.moveTo(-12,20);x.quadraticCurveTo(-8,24+f*.4,-6,20+f);x.quadraticCurveTo(0,25+f*.8,6,20+f);x.quadraticCurveTo(9,24+f*.4,12,20);x.closePath();x.fill();x.restore();
if(tick(30)){for(let i=0;i<3;i++){const spread=(Math.random()-.5)*8;emit(sx+spread,sy+23,Math.sin(A.time*5+i)*.55,1.5+Math.random()*1.5,i===0?'#fff3c1':'#ff9b4a',2+Math.random()*2,.018)}}}
for(const offset of boosters){const bw=width*.66;x.save();x.translate(offset,0);x.fillStyle=steel;x.beginPath();x.moveTo(-bw,-height+13);x.lineTo(-bw*.7,-height+4);x.lineTo(-bw*.35,-height);x.lineTo(bw*.35,-height);x.lineTo(bw*.7,-height+4);x.lineTo(bw,-height+13);x.lineTo(bw,8);x.lineTo(-bw,8);x.closePath();x.fill();x.fillStyle=accent;x.fillRect(-bw,-height*.42,bw*2,2);x.fillRect(-bw,-height*.18,bw*2,2);x.fillStyle='#596779';x.beginPath();x.moveTo(-bw,3);x.lineTo(-bw-4,17);x.lineTo(-bw,14);x.closePath();x.fill();x.beginPath();x.moveTo(bw,3);x.lineTo(bw+4,17);x.lineTo(bw,14);x.closePath();x.fill();x.fillStyle='#303c4d';x.fillRect(-bw*.6,8,bw*1.2,7);x.restore()}
x.fillStyle=steel;x.beginPath();x.moveTo(-width,-height+13);x.lineTo(-width*.8,-height+4);x.lineTo(-width*.4,-height);x.lineTo(width*.4,-height);x.lineTo(width*.8,-height+4);x.lineTo(width,-height+13);x.lineTo(width,15);x.lineTo(-width,15);x.closePath();x.fill();
x.fillStyle='rgba(255,255,255,.55)';x.fillRect(-1,-height+15,1,height-19);x.fillStyle=accent;x.fillRect(-width,-height*.54,width*2,2);x.fillRect(-width,-height*.2,width*2,2);
x.fillStyle='#26384d';x.beginPath();x.moveTo(-width,-height+13);x.lineTo(-width*.8,-height+4);x.lineTo(-width*.4,-height);x.lineTo(width*.4,-height);x.lineTo(width*.8,-height+4);x.lineTo(width,-height+13);x.closePath();x.fill();
for(let wi=0;wi<model.windows;wi++){const wy=-height*.73+wi*height*.19;x.fillStyle='#4b6986';x.beginPath();x.ellipse(0,wy,2.7,3.8,0,0,Math.PI*2);x.fill();x.strokeStyle='rgba(240,250,255,.8)';x.lineWidth=.8;x.stroke()}
x.fillStyle='#465365';x.fillRect(-width*.82,15,width*1.64,4);x.fillStyle='#b8c5d1';x.fillRect(-width,18,width*2,3);
if(model.reusable){x.strokeStyle='#74bfd2';x.lineWidth=1.5;x.beginPath();x.moveTo(-width*.65,10);x.lineTo(-width*1.65,20);x.moveTo(width*.65,10);x.lineTo(width*1.65,20);x.stroke();x.fillStyle='#26384d';x.fillRect(-width*.45,-height*.15,width*.9,2)}
if(tick(28)){emit(sx+(Math.random()-.5)*6,sy+25,(Math.random()-.5)*1.3,1+Math.random(),'#c8d6e5',3,.025)}
}
else drawLauncher(0,.82,fl);
x.restore()}
A.parts=A.parts.filter(q=>q.l>0);A.parts.forEach(q=>{q.x+=q.vx*v;q.y+=q.vy*v;q.l-=q.d*v;x.globalAlpha=Math.max(0,q.l);x.fillStyle=q.c;x.beginPath();x.arc(q.x,q.y,q.r*(q.c==='#e7ecf7'?2-q.l:1),0,7);x.fill()});x.globalAlpha=1;
if(A.stormT>0){A.stormT-=v;x.fillStyle='rgba(255,60,40,'+(RM?.12:.08+.07*Math.sin(A.f/3))+')';x.fillRect(0,0,W,H);if(!RM){x.strokeStyle='rgba(255,220,120,.7)';x.lineWidth=1.5;for(let i=0;i<22;i++){const a=Math.random()*W,b=Math.random()*H;x.beginPath();x.moveTo(a,b);x.lineTo(a-26,b+14);x.stroke()}}tx('☢ RADIATION STORM',W/2,28,'center','#ffd54a')}
if(A.metT>0){A.metT-=v;x.strokeStyle='rgba(255,255,255,.8)';x.lineWidth=1.5;for(let i=0;i<6;i++){const a=Math.random()*W,b=Math.random()*H;x.beginPath();x.moveTo(a,b);x.lineTo(a-40,b-8);x.stroke()}tx('Micrometeoroids!',W/2,28,'center','#fff')}
if(A.showerT>0){A.showerT-=v;const al=Math.min(1,A.showerT/60);for(let i=0;i<14;i++){const mx=W+80-((A.f*(5+i%4*2)+i*97)%(W+240)),my=((A.f*(2.5+i%3)+i*53)%(H+60))-30,g=x.createLinearGradient(mx,my,mx+90,my-45);g.addColorStop(0,'rgba(255,255,255,'+al+')');g.addColorStop(.3,'rgba(255,170,60,'+.7*al+')');g.addColorStop(1,'rgba(255,90,30,0)');x.strokeStyle=g;x.lineWidth=2.5;x.beginPath();x.moveTo(mx,my);x.lineTo(mx+90,my-45);x.stroke()}tx('☄ METEOR SHOWER',W/2,56,'center','#ffb35a')}
if(A.glT>0){A.glT-=v;if(!RM)for(let i=0;i<6;i++){x.fillStyle='rgba(120,255,200,'+(.05+Math.random()*.12)+')';x.fillRect(0,Math.random()*H,W,3+Math.random()*10)}tx('⚠ FLIGHT COMPUTER GLITCH',W/2,84,'center','#7dffc8')}
if(A.flrT>0){A.flrT-=v;const a=Math.min(1,A.flrT/60),g=x.createRadialGradient(40,40,5,40,40,220+(1-a)*260);g.addColorStop(0,'rgba(255,240,150,'+.8*a+')');g.addColorStop(1,'rgba(255,200,60,0)');x.fillStyle=g;x.fillRect(0,0,W,H);tx('☀ SOLAR FLARE',W/2,112,'center','#ffe36b')}
if(A.lkT>0){A.lkT-=v;if(A.f%2===0){const q=shipPos();emit(q[0],q[1],(Math.random()-.5)*1.5,1+Math.random(),'#cfe8ff',3,.02)}tx('🛢 FUEL LEAK',W/2,140,'center','#9fd4ff')}
if(A.twT>0){A.twT-=v;x.strokeStyle='rgba(120,190,255,.5)';x.lineWidth=2;for(let i=0;i<10;i++){const ty=(i*37+20)%H,t0=((A.f*14+i*131)%(W+200))-100;x.beginPath();x.moveTo(t0,ty);x.lineTo(t0+90,ty);x.stroke()}tx('🌠 GRAVITY TAILWIND',W/2,168,'center','#8fd0ff')}
if(A.evT>0){A.evT-=v;const a=Math.min(1,A.evT/80);x.globalAlpha=.28*a;x.fillStyle=A.evC;x.fillRect(0,0,W,H);x.globalAlpha=1;tx(A.evX,W/2,196,'center',A.evC)}
if(A.fade>0){x.fillStyle='rgba(4,6,15,'+Math.min(1,A.fade)+')';x.fillRect(0,0,W,H);A.fade-=.05*v}
if(A.flash>0){x.fillStyle='rgba(255,255,255,'+A.flash*.8+')';x.fillRect(0,0,W,H);A.flash-=.035*v}
if(ph==='boom'){A.br+=4*v;x.strokeStyle='rgba(255,150,50,'+Math.max(0,1-A.br/160)+')';x.lineWidth=4;x.beginPath();x.arc(A.bx,A.by,A.br,0,7);x.stroke();if(A.flash<.5){tx('MISSION LOST',W/2,H/2,'center','#ff6b6b','bold 38px system-ui');if(A.cause)tx(A.cause,W/2,H/2+34,'center','#fff','14px system-ui')}}}
let LAST=null,HSM=[];
function gHS(){try{const v=localStorage.getItem('smdg_hs');if(v)return JSON.parse(v)}catch(e){}return HSM}
function saveHS(){if(!LAST)return;const a=gHS();a.push({...LAST,n:($('nm').value||'Anonymous').trim().slice(0,14)});a.sort((p,q)=>q.s-p.s);HSM=a.slice(0,10);try{localStorage.setItem('smdg_hs',JSON.stringify(HSM))}catch(e){}LAST=null;$('nm').parentNode.innerHTML='Saved! 🏆';rHS()}
function clrHS(){HSM=[];try{localStorage.removeItem('smdg_hs')}catch(e){}rHS()}
function rHS(){const a=gHS();$('hs').innerHTML='<section><h2>🏆 Hall of Fame</h2>'+(a.length?'<table>'+a.map((e,i)=>`<tr><td>#${i+1} ${e.n.replace(/</g,'&lt;')}</td><td style="font-weight:400;color:var(--mut)">${e.m} · $${e.c}M</td><td>${e.g} · ${e.s}</td></tr>`).join('')+'</table><p><button class="o" style="width:auto" onclick="clrHS()">Clear scores</button></p>':'<p class="hint">No scores yet. Complete a mission and save your result.</p>')+'</section>'}
const pan=$('pan'),side=$('side'),dock=$('dock'),wideMQ=matchMedia('(min-width:821px)');
function place(){const wide=wideMQ.matches,lb=$('left').getBoundingClientRect().bottom,dk=wide&&lb<=innerHeight-20,t=dk?dock:side;
if(pan.parentNode!==t)t.appendChild(pan);pan.classList.toggle('docked',dk);$('ph').textContent=dk?'10 · Launch':'Mission Status';
dock.style.minHeight=wide?(dk?pan.offsetHeight+12:(dock.dataset.h||340))+'px':'0';if(dk)dock.dataset.h=pan.offsetHeight+12}
function mbar(){const k=calc();$('mbar').innerHTML=`<span><b class="${k.okBud?'':'bad'}">$${k.cost.toFixed(0)}M</b> / ${k.m.budget}</span><span><b class="${k.okMass?'':'bad'}">${k.wet.toFixed(0)}</b> / ${k.cap} kg</span><button onclick="$('pan').scrollIntoView({behavior:'smooth',block:'center'})">Launch ↓</button>`}
const _draw=draw;draw=function(){_draw();place();mbar()};
addEventListener('scroll',place,{passive:true});addEventListener('resize',place);
const pointerGlow=document.querySelector('.pointer-glow');
const reducePointerMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
let pointerTarget={x:0,y:0},pointerCurrent={x:0,y:0},pointerFrame=0;
function followPointer(){
pointerCurrent.x+=(pointerTarget.x-pointerCurrent.x)*(reducePointerMotion?1:.14);
pointerCurrent.y+=(pointerTarget.y-pointerCurrent.y)*(reducePointerMotion?1:.14);
pointerGlow.style.setProperty('--x',pointerCurrent.x+'px');pointerGlow.style.setProperty('--y',pointerCurrent.y+'px');
if(Math.abs(pointerTarget.x-pointerCurrent.x)>.5||Math.abs(pointerTarget.y-pointerCurrent.y)>.5)pointerFrame=requestAnimationFrame(followPointer);else pointerFrame=0}
addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;pointerTarget={x:e.clientX,y:e.clientY};pointerGlow.classList.add('is-visible');if(reducePointerMotion){followPointer();return}if(!pointerFrame)pointerFrame=requestAnimationFrame(followPointer)},{passive:true});
document.addEventListener('pointerout',e=>{if(!e.relatedTarget)pointerGlow.classList.remove('is-visible')});
addEventListener('blur',()=>pointerGlow.classList.remove('is-visible'));
rHS();draw();
