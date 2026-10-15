// ✏️ Replace with your email address:
const HIS_EMAIL = "d.wieser1991@gmail.com";
const HER_NAME_FALLBACK = "my love";

const PLACES=[["🍝","Candlelit Dinner","Cozy Italian vibes"],["🎬","Movie Night","Popcorn & cuddles"],["🌅","Sunset Picnic","Blanket, wine, stars"],["🥂","Wine Tasting","Sip & swirl"],["🎡","Fun Fair / Walk","Hand in hand"],["🏨","Spa & Wellness","Pure relaxation"],["🚗","Surprise Trip","He plans it all"],["🏠","Cook Together","Our own kitchen"]];
const TIMES=[["🌤️","Afternoon","2 – 5 pm"],["🌇","Early Evening","5 – 8 pm"],["🌙","Late Night","8 pm onward"],["☀️","Full Day","Morning to midnight"]];
const EXTRAS=[["🌹","Roses"],["🍫","Chocolates"],["🎶","Music"],["📸","Photos"],["🍰","Dessert"],["💌","Love letter"]];
const S={date:new Set(),place:null,time:null,extras:new Set(),note:"",name:""};
let step=0;
const $=s=>document.querySelector(s);
const card=$("#card");

// floating hearts
const hs=$("#hearts");
for(let i=0;i<18;i++){const s=document.createElement("span");s.textContent=["💖","💕","💗","🌸","💘"][i%5];
s.style.left=Math.random()*100+"%";s.style.fontSize=(14+Math.random()*26)+"px";
s.style.animationDuration=(9+Math.random()*10)+"s";s.style.animationDelay=(-Math.random()*15)+"s";hs.appendChild(s)}

const END=new Date(2026,10,15); // letzter wählbarer Tag: 15.11.2026 (Monat 10 = November)
function days(){const a=[],d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+1);while(d<=END){a.push(new Date(d));d.setDate(d.getDate()+1)}return a}
const dl=()=>[...S.date].map(s=>new Date(s)).sort((a,b)=>a-b).map(fmt).join(" / ");
const fmt=d=>d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const progress=()=>`<div class="bar"><i style="width:${step/5*100}%"></i></div>`;

function grid(items,key,multi){return `<div class="grid">`+items.map((it,i)=>{
 const sel=multi?S.extras.has(it[1]):S[key]===it[1];
 return `<button class="opt ${sel?"sel":""}" data-k="${key}" data-v="${it[multi?1:1]}"><span class="e">${it[0]}</span>${it[1]}${it[2]?`<small>${it[2]}</small>`:""}</button>`}).join("")+`</div>`}

function render(){
 let h="";
 if(step===0){
  h=`<div class="big">💌</div><h1>Hey, beautiful…</h1>
  <p>I have a little question for you.<br>Would you do me the honor of going on a date with me?</p>
  <div class="row"><button class="btn" id="yes">Yes, of course! 💕</button><button class="btn" id="no" style="background:var(--line);color:var(--soft);box-shadow:none">No</button></div>
  <p style="font-size:.8rem;margin-top:18px">(psst… the “No” button is shy)</p>`;
 }else if(step===1){
  h=progress()+`<h2>📅 Pick our days</h2><p>Swipe and tap every day that works for you – you can choose several.</p>
  <div class="dates">`+days().map((d,i)=>`<button class="opt ${S.date.has(d.toDateString())?"sel":""}" data-k="date" data-v="${d.toDateString()}"><small>${d.toLocaleDateString("en-GB",{weekday:"short"})}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString("en-GB",{month:"short"})}</small></button>`).join("")+`</div>`+nav(S.date.size>0);
 }else if(step===2){
  h=progress()+`<h2>🕰️ When shall we meet?</h2><p>What time of day feels right?</p>`+grid(TIMES,"time")+nav(!!S.time);
 }else if(step===3){
  h=progress()+`<h2>📍 What's the plan?</h2><p>Choose the kind of date you're in the mood for.</p>`+grid(PLACES,"place")+nav(!!S.place);
 }else if(step===4){
  h=progress()+`<h2>✨ Little extras</h2><p>Pick as many as you like (or none).</p>`+grid(EXTRAS.map(e=>[e[0],e[1]]),"extras",true)+`<p style="margin:4px 0 0;font-style:italic">or…..</p><div class="one">`+grid([["😘","me?"]],"extras",true)+`</div>`+
  `<input id="name" placeholder="Your name (optional)" value="${S.name}" style="width:100%;border:2px solid var(--line);border-radius:14px;padding:10px;font:inherit;background:var(--card);color:var(--ink);margin-bottom:10px">
  <textarea id="note" rows="2" placeholder="Anything else you'd like to tell me? 💭">${S.note}</textarea>`+nav(true,"See our date 💞");
 }else{
  const d=new Date(S.date);
  h=`<div class="big">💖</div><h1>It's a date!</h1><p>Here's what we've planned:</p>
  <div class="sum">📅 <b>${dl().split(" / ").join("<br>&nbsp;&nbsp;&nbsp;&nbsp;")}</b><br>🕰️ <b>${S.time}</b><br>📍 <b>${S.place}</b>${S.extras.size?`<br>✨ <b>${[...S.extras].join(", ")}</b>`:""}${S.note?`<br>💭 <i>${esc(S.note)}</i>`:""}</div>
  <p>Tap the button to send me your booking confirmation ✉️</p>
  <button class="btn" id="send">Send confirmation 💌</button>
  <div id="fb" style="margin-top:14px"></div>
  <button class="ghost" id="restart">↺ Change something</button>`;
 }
 card.innerHTML=h;bind();
}
const esc=s=>s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
function nav(ok,label="Next 💕"){return `<div class="row">${step>1?`<button class="ghost" id="back">← Back</button>`:""}<button class="btn" id="next" ${ok?"":"disabled"}>${label}</button></div>`}

function bind(){
 const g=id=>document.getElementById(id);
 if(g("yes"))g("yes").onclick=()=>{burst();step=1;render()};
 const no=g("no");
 if(no){const run=()=>{no.style.transform=`translate(${(Math.random()-.5)*160}px,${(Math.random()-.5)*80}px)`};no.onmouseenter=run;no.ontouchstart=e=>{e.preventDefault();run()};no.onclick=run}
 if(g("next"))g("next").onclick=()=>{if(step===4){S.name=g("name").value.trim();S.note=g("note").value.trim()}step++;render();if(step===5)burst()};
 if(g("back"))g("back").onclick=()=>{step--;render()};
 if(g("restart"))g("restart").onclick=()=>{step=1;render()};
 if(g("send"))g("send").onclick=send;
 document.querySelectorAll(".opt[data-k]").forEach(b=>b.onclick=()=>{
  const k=b.dataset.k,v=b.dataset.v;
  if(k==="extras"){S.extras.has(v)?S.extras.delete(v):S.extras.add(v);b.classList.toggle("sel")}
  else if(k==="date"){S.date.has(v)?S.date.delete(v):S.date.add(v);b.classList.toggle("sel");g("next").disabled=!S.date.size}
  else{S[k]=v;if(step===4){}else{ if(step===1||step===2||step===3){S[k]=v;render();} }}
 });
}

function message(){
 const who=S.name||"Your girlfriend";
 return `Date confirmation 💕\n\nWho: ${who}\nPossible days: ${dl()}\nTime: ${S.time}\nPlan: ${S.place}\nExtras: ${S.extras.size?[...S.extras].join(", "):"none"}\nNote: ${S.note||"-"}\n\nI'm looking forward to it! ❤️`;
}
function send(){
 const body=message();
 const url=`mailto:${HIS_EMAIL}?subject=${encodeURIComponent("💕 Our date is booked!")}&body=${encodeURIComponent(body)}`;
 const fb=document.getElementById("fb");
 const wa="https://wa.me/?text="+encodeURIComponent(body);
 const st="display:inline-block;text-decoration:none;font-size:.95rem;padding:11px 20px;margin:4px";
 fb.innerHTML=`<p style="font-size:.9rem">Choose how to send it to me 💕</p><div class="row"><a class="btn" style="${st}" href="https://mail.google.com/mail/?view=cm&to=${HIS_EMAIL}&su=${encodeURIComponent("💕 Our date is booked!")}&body=${encodeURIComponent(body)}" target="_blank" rel="noopener">📧 Gmail</a><a class="btn" style="${st}" href="${wa}" target="_blank" rel="noopener">💬 WhatsApp</a></div><button class="ghost" id="cp">📋 Copy confirmation</button>`;
 document.getElementById("cp").onclick=async()=>{try{await navigator.clipboard.writeText(body);document.getElementById("cp").textContent="✅ Copied!"}catch(e){prompt("Copy this:",body)}};
 try{if(navigator.share)navigator.share({title:"💕 Our date",text:body}).catch(()=>{})}catch(e){}
 burst();
}
function burst(){
 for(let i=0;i<26;i++){const s=document.createElement("span");s.textContent=["💖","💕","🌹","✨","💘"][i%5];
  Object.assign(s.style,{position:"fixed",left:"50%",top:"55%",fontSize:(16+Math.random()*22)+"px",pointerEvents:"none",zIndex:5,transition:"all 1.3s cubic-bezier(.2,.8,.3,1)",opacity:1});
  document.body.appendChild(s);
  requestAnimationFrame(()=>{s.style.transform=`translate(${(Math.random()-.5)*600}px,${-Math.random()*500}px) rotate(${Math.random()*360}deg)`;s.style.opacity=0});
  setTimeout(()=>s.remove(),1400)}
}
render();