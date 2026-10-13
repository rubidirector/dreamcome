if(window.top!==window.self){try{window.top.location.replace(location.href)}catch(e){document.documentElement.style.display='none'}}
(function(){
const KEY='dreamcome.v4';
const MOODS=[['지침',1],['가라앉음',2],['보통',3],['괜찮음',4],['반짝임',5]];
const RATE={1:.6,2:.7,3:.9,4:1,5:1};
const PRESETS=[10,15,25,40,50];
const WD=['일','월','화','수','목','금','토'];
const dk=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const $=id=>document.getElementById(id);
const fmtMin=m=>{m=Math.round(m);const h=Math.floor(m/60),r=m%60;return h?h+'h'+(r?' '+r+'m':''):r+'m'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T=dk(new Date());
const GR={S:{name:'천사날개토끼',how:'하루 총 공부 4시간 달성'},A:{name:'생크림딸기토끼',how:'40분 이상 타이머 완주'},B:{name:'딸기마카롱토끼',how:'25분 이상 타이머 완주'},C:{name:'딸기우유토끼',how:'10분 이상 타이머 완주'}};
const ORDER=['S','A','B','C'];
const RB=[["C","딸기우유토끼"],["S","생크림딸기토끼"],["B","꽃다발토끼"],["C","당근모자토끼"],["A","클로버왕관토끼"],["C","찻잔토끼"],["B","셰프토끼"],["B","화가토끼"],["A","잠꾸러기토끼"],["A","천사날개토끼"],["A","꼬마악마토끼"],["C","튤립토끼"],["C","책벌레토끼"],["S","비옷토끼"],["A","구름토끼"],["A","아이스크림토끼"],["C","롤리팝토끼"],["S","멜론빵토끼"],["S","버섯토끼"],["C","우편배달토끼"],["A","꿀벌토끼"],["A","곰돌이토끼"],["A","별요정토끼"],["B","세일러토끼"],["C","체리토끼"],["C","티타임토끼"],["C","음악토끼"],["B","리본상자토끼"],["C","토마토토끼"],null,["A","딸기케이크토끼"],["B","꽃밭토끼"],["C","당근냠냠토끼"],["B","행운토끼"],["C","코코아토끼"],["C","반죽토끼"],["B","그림토끼"],["A","달잠토끼"],null,["A","박쥐날개토끼"],["C","상자속토끼"],["A","별똥별토끼"],["C","정원사토끼"],["B","곰친구토끼"],null,["B","망원경토끼"],null,["C","우산토끼"],["S","소라빵토끼"],["C","헤드폰토끼"],null,["S","고양이모자토끼"],["B","깜짝선물토끼"],["A","리본사탕토끼"],["A","파티시에토끼"],["B","나비토끼"],["A","마술사토끼"],["C","담요토끼"],["B","쿠키토끼"],["C","식빵토끼"],["S","우주토끼"],["B","솜사탕토끼"],["C","버블티토끼"],["C","머랭토끼"],["B","풍선토끼"],["B","목욕토끼"],["C","도토리토끼"],["S","트리토끼"],["C","붕어빵토끼"]];
const poolOf=g=>RB.map((r,i)=>r&&r[0]===g?i:-1).filter(i=>i>=0);
const ownedSet=()=>new Set(S.rewards.map(r=>r.id));
function pick(g,own){const pool=poolOf(g),fresh=pool.filter(i=>!own.has(i)),arr=fresh.length?fresh:pool;return arr[Math.floor(Math.random()*arr.length)]}
const rimg=id=>`<img src="r${String(id).padStart(2,'0')}.webp" alt="${RB[id][1]}" loading="lazy">`;
const reveal=list=>list.map(r=>`<figure>${rimg(r.id)}<span class="gb ${r.grade}">${r.grade}</span> ${RB[r.id][1]}</figure>`).join('');
const gradeOf=pl=>pl>=40?'A':pl>=25?'B':pl>=10?'C':pl>=1?'D':null;const gradeR=g=>g==='D'?'C':g;
function backfill(st){const r=[],days={};
  st.sessions.forEach(s=>{if(s.done&&s.claimed!==false){const g=gradeOf(s.planned);if(g)r.push({date:s.date,grade:gradeR(g)})}days[s.date]=(days[s.date]||0)+s.min});
  Object.keys(days).forEach(d=>{if(d!==T&&days[d]>=240)r.push({date:d,grade:'S'})});
  return r.sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0)}

function seed(){
  const t=new Date(),sessions=[],moods={};
  const mins=[180,210,150,240,170,120,60,210,240,270,290,300,260];
  const md=[4,4,3,4,4,3,4,3,3,3,2,2,2];
  for(let i=13;i>=1;i--){const d=dk(add(t,-i)),x=13-i;moods[d]=md[x];let m=mins[x],k=0;
    while(m>0){const plan=[25,50,40][k%3],fail=plan===50&&(x+k)%2===0,len=Math.min(m,fail?30:plan);
      sessions.push({date:d,subject:'',min:len,planned:fail?plan:len,done:!fail});m-=len;k++}}
  [[55,'수학 문제집 2단원'],[55,'영어 독해 3지문'],[55,'국어 문학 정리']].forEach(([m,k])=>sessions.push({date:T,subject:'',task:k,min:m,planned:m,done:true,claimed:true}));
  [[10,'영단어 30개'],[25,'기출 3문제 풀기'],[40,'오답 노트 정리']].forEach(([m,k])=>sessions.push({date:T,subject:'',task:k,min:m,planned:m,done:true,claimed:false}));
  const rests=[];for(let i=12;i>=1;i-=(i>6?2:1))rests.push(dk(add(t,-i)));while(rests.length>9)rests.shift();rests.push(T);
  return {sample:true,goal:240,lastPlan:25,subjects:[],sessions,moods,rests,claims:{},
    notes:[['모의고사 결과가 신경 쓰였지만 오답 정리는 끝냈다.',1],['도서관 창가 자리에서 공부하니 집중이 잘 됐다.',2],['영단어 시험 만점! 작은 성공도 기쁘다.',3],['너무 피곤해서 일찍 잤다. 그래도 괜찮아.',4],['수학 문제 하나를 30분 동안 붙잡고 결국 풀었다.',5],['친구랑 같이 공부하니 덜 지루했다.',6]].map(([x,i])=>({date:dk(add(t,-i)),kind:'일기',text:x}))};
}
/* storage: never overwrite user data on update */
const SCHEMA=2;
const blank=()=>({schema:SCHEMA,sample:false,goal:240,lastPlan:25,subjects:[],sessions:[],moods:{},rests:[],claims:{},rewards:[],notes:[],goals:{},updatedAt:0});
const lsGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
function migrate(s){
  if(!s||typeof s!=='object')return blank();
  if((s.schema||1)<SCHEMA)lsSet(KEY+'.pre'+SCHEMA,JSON.stringify(s));
  const b=blank();for(const k in b)if(s[k]==null)s[k]=b[k];
  s.schema=SCHEMA;return clean(s);
}
/* validate everything that comes from storage or the cloud: types, ranges, lengths */
const DRE=/^\d{4}-\d{2}-\d{2}$/;
const nz=(v,lo,hi,d)=>{v=+v;return isFinite(v)?Math.min(hi,Math.max(lo,v)):d};
const sz=(v,n)=>typeof v==='string'?v.slice(0,n):'';
const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
function clean(s){
  s.sample=!!s.sample;s.guided=!!s.guided;
  s.goal=nz(s.goal,0,1440,240);s.lastPlan=nz(s.lastPlan,1,600,25);s.updatedAt=nz(s.updatedAt,0,8.64e15,0);
  s.subjects=(Array.isArray(s.subjects)?s.subjects:[]).filter(v=>typeof v==='string'&&v).map(v=>v.slice(0,12)).slice(0,60);
  s.sessions=(Array.isArray(s.sessions)?s.sessions:[]).filter(x=>isObj(x)&&DRE.test(x.date)).slice(-20000).map(x=>{const o={...x};
    if('subject' in o)o.subject=sz(o.subject,12);if('task' in o&&o.task!==undefined)o.task=sz(o.task,100);
    o.min=nz(o.min,0,1440,0);o.planned=nz(o.planned,0,1440,0);o.done=!!o.done;if('claimed' in o)o.claimed=!!o.claimed;return o});
  s.notes=(Array.isArray(s.notes)?s.notes:[]).filter(x=>isObj(x)&&DRE.test(x.date)).slice(-5000).map(x=>({...x,date:x.date,text:sz(x.text,500)}));
  s.rests=(Array.isArray(s.rests)?s.rests:[]).filter(v=>typeof v==='string'&&DRE.test(v)).slice(-20000);
  const mo={};if(isObj(s.moods))for(const k of Object.keys(s.moods)){const v=Math.round(+s.moods[k]);if(DRE.test(k)&&v>=1&&v<=5)mo[k]=v}s.moods=mo;
  const gl={};if(isObj(s.goals))for(const k of Object.keys(s.goals)){const v=+s.goals[k];if(DRE.test(k)&&isFinite(v)&&v>=0&&v<=1440)gl[k]=v}s.goals=gl;
  const cl={};if(isObj(s.claims))for(const k of Object.keys(s.claims)){if(/^[A-Za-z0-9:_-]{1,40}$/.test(k)&&s.claims[k])cl[k]=1}s.claims=cl;
  s.rewards=(Array.isArray(s.rewards)?s.rewards:[]).filter(r=>isObj(r)&&DRE.test(r.date)).slice(-20000).map(r=>{const o={...r};
    if(Number.isInteger(+r.id)&&r.id!==null&&RB[+r.id]){o.id=+r.id;o.grade=RB[o.id][0]}else{o.id=null;if(!ORDER.includes(o.grade))o.grade='C'}
    if('src' in o)o.src=sz(o.src,24);return o});
  return s;
}
function isEmpty(s){return !s||(!(s.sessions||[]).length&&!(s.rewards||[]).length&&!(s.notes||[]).length&&!(s.rests||[]).length&&!Object.keys(s.moods||{}).length)}
let S=null;
{const raw=lsGet(KEY);
  if(raw){try{S=JSON.parse(raw);lsSet(KEY+'.bak',raw)}catch(e){lsSet(KEY+'.corrupt.'+Date.now(),raw);S=null}}
  if(!S){const bak=lsGet(KEY+'.bak');if(bak){try{S=JSON.parse(bak)}catch(e){}}}}
let seeded=false;
if(!S||!S.sessions||S.sample)S=blank();
const needBF=!S.rewards;
S=migrate(S);
if(needBF)S.rewards=backfill(S);
function fixRewards(st){const own=new Set();st.rewards.forEach(r=>{if(r.id==null||!RB[r.id])r.id=pick(r.grade,own);else if(RB[r.id][0]!==r.grade)r.grade=RB[r.id][0];own.add(r.id)})}
fixRewards(S);
const writeLocal=()=>lsSet(KEY,JSON.stringify(S));
writeLocal();
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
function save(){S.updatedAt=Date.now();writeLocal();if(typeof cloudSchedule==='function')cloudSchedule()}

/* merge two copies of the data without losing anything */
function mergeState(a,b){
  a=migrate(JSON.parse(JSON.stringify(a||{})));b=migrate(JSON.parse(JSON.stringify(b||{})));
  if(isEmpty(a))return migrate(JSON.parse(JSON.stringify(b)));
  if(isEmpty(b))return migrate(JSON.parse(JSON.stringify(a)));
  const nw=(a.updatedAt||0)>=(b.updatedAt||0)?a:b,od=nw===a?b:a;
  const bag=(x=[],y=[])=>{const out=x.slice(),cnt=new Map();x.forEach(v=>{const k=JSON.stringify(v);cnt.set(k,(cnt.get(k)||0)+1)});
    y.forEach(v=>{const k=JSON.stringify(v),c=cnt.get(k)||0;if(c>0)cnt.set(k,c-1);else out.push(v)});return out};
  const byDate=(x,desc)=>x.map((v,i)=>[v,i]).sort((p,q)=>{const d=(p[0].date||p[0])<(q[0].date||q[0])?-1:(p[0].date||p[0])>(q[0].date||q[0])?1:0;return (desc?-d:d)||p[1]-q[1]}).map(p=>p[0]);
  const m=JSON.parse(JSON.stringify(nw));
  m.sessions=byDate(bag(nw.sessions,od.sessions));
  m.rewards=byDate(bag(nw.rewards,od.rewards));
  m.rests=byDate(bag(nw.rests,od.rests));
  m.notes=byDate(bag(nw.notes,od.notes),true);
  m.moods={...(od.moods||{}),...(nw.moods||{})};
  m.goals={...(od.goals||{}),...(nw.goals||{})};
  m.claims={...(od.claims||{}),...(nw.claims||{})};
  m.guided=!!(a.guided||b.guided);
  m.updatedAt=Math.max(a.updatedAt||0,b.updatedAt||0);
  return migrate(m);
}

const minsOn=d=>S.sessions.filter(s=>s.date===d).reduce((a,s)=>a+s.min,0);
const avg=a=>{a=a.filter(v=>v!=null);return a.length?a.reduce((x,y)=>x+y,0)/a.length:null};
const rate=list=>list.length?list.filter(s=>s.done).length/list.length:null;
const sessIn=keys=>S.sessions.filter(s=>keys.includes(s.date));
function weeks(){const now=new Date(),w1=[],w0=[];for(let i=0;i<7;i++){w1.push(dk(add(now,-i)));w0.push(dk(add(now,-i-7)))}return [w1,w0]}

/* tabs */
function go(v){
  if(v!=='mind'&&bTimer)stopBreath();
  document.querySelectorAll('[data-view]').forEach(s=>s.hidden=s.dataset.view!==v);
  document.querySelectorAll('[data-tab]').forEach(b=>b.dataset.tab===v?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current'));
  if(v==='report')renderReport();
  if(v==='rewards')renderRewards();
  scrollTo({top:0});
}
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>go(b.dataset.tab));
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));

/* today */
$('yr').textContent=new Date().getFullYear()+'년';
$('todayDate').textContent=new Date().toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'long'});
$('moods').innerHTML=MOODS.map(([w,v])=>`<button type="button" class="mood" data-v="${v}" aria-pressed="false"><i></i>${w}</button>`).join('');
$('moods').onclick=e=>{const b=e.target.closest('.mood');if(!b)return;S.moods[T]=+b.dataset.v;save();renderToday()};

function burnoutText(){
  const [w1,w0]=weeks();
  const m1=w1.reduce((a,d)=>a+minsOn(d),0),m0=w0.reduce((a,d)=>a+minsOn(d),0);
  const a1=avg(w1.map(d=>S.moods[d])),a0=avg(w0.map(d=>S.moods[d]));
  if(m0>0&&a1!=null&&a0!=null&&m1>m0*1.1&&a1<=a0-.4)
    return `이번 주 공부 시간은 지난주보다 ${Math.round((m1/m0-1)*100)}% 늘었는데, 컨디션은 계속 내려가고 있어요. 오늘은 가볍게 가도 괜찮아요.`;
  return '';
}
function goalFor(d){return (S.goals&&S.goals[d])||S.goal||240}
function recText(mood){
  if(!mood)return '컨디션을 고르면 오늘에 맞는 공부 시간을 추천해 드려요';
  const past=[];for(let i=1;i<=14;i++)past.push(dk(add(new Date(),-i)));
  const am=avg(past.map(d=>S.moods[d])),days=past.map(minsOn).filter(m=>m>0);
  const avgMin=days.length?days.reduce((a,b)=>a+b,0)/days.length:null;
  const r10=m=>Math.max(10,Math.round(m/10)*10);
  if(avgMin==null)return mood<=2?'컨디션이 낮은 날이에요. 짧은 타이머부터 시작해 봐요':'좋아요. 오늘 목표를 향해 한 칸씩 가 봐요';
  const low=am!=null?mood<=am-.5:mood<=2,high=am!=null&&mood>=am+.5;
  if(low)return `평소보다 컨디션이 낮아요. 오늘은 ${fmtMin(r10(avgMin*RATE[mood]))} 정도를 추천해요`;
  if(high)return `평소보다 컨디션이 좋아요. 최근 평균 ${fmtMin(r10(avgMin))}만큼 해 볼까요?`;
  return `평소와 비슷한 컨디션이에요. 최근 평균은 ${fmtMin(r10(avgMin))}이에요`;
}
function sessLabel(s){return s.subject||s.task||'공부'}
function renderToday(){
  $('sampleBanner').hidden=!S.sample;
  const mood=S.moods[T];
  $('moods').querySelectorAll('.mood').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.v===mood)));
  $('moodQ').textContent=mood?'오늘 컨디션을 기록했어요':'오늘 컨디션은 어때요?';
  const goal=goalFor(T);
  const done=minsOn(T),pct=Math.min(100,Math.round(done/goal*100));
  $('goalDone').textContent=fmtMin(done);
  $('goalOf').textContent='오늘 목표 '+fmtMin(goal);
  $('goalWhy').textContent=recText(mood);
  $('ringArc').setAttribute('stroke-dashoffset',(314.16*(1-pct/100)).toFixed(1));
  $('ringPct').textContent=pct+'%';
  const b=burnoutText();$('burnout').hidden=!b;$('burnout').textContent=b;
  drawChart('chartToday');
  const list=S.sessions.filter(s=>s.date===T);
  $('todayList').innerHTML=list.length?list.map(s=>`<li><span class="t">${esc(sessLabel(s))}${s.subject&&s.task?`<div class="sub">${esc(s.task)}</div>`:''}</span><span class="num">${s.done?`${fmtMin(s.min)}<span class="tag">완주</span>`:`${fmtMin(s.min)} / ${fmtMin(s.planned)}<span class="tag part">중간 종료</span>`}</span></li>`).join(''):'<li class="muted">아직 기록이 없어요. 짧은 타이머 하나로 시작해 봐요.</li>';
}

$('goalH').innerHTML=Array.from({length:13},(_,i)=>`<option value="${i}">${i}h</option>`).join('');
$('goalEdit').onclick=()=>{const f=$('goalForm'),open=f.hidden;f.hidden=!open;$('goalEdit').setAttribute('aria-expanded',String(open));
  if(open){const g=goalFor(T);$('goalH').value=Math.floor(g/60);$('goalM').value=g%60>=30?30:0}};
$('goalForm').onsubmit=e=>{e.preventDefault();const m=(+$('goalH').value)*60+(+$('goalM').value);
  if(m<30){$('goalWhy').textContent='목표는 30분 이상으로 정해 주세요.';return}
  if(!S.goals)S.goals={};S.goals[T]=m;S.goal=m;save();$('goalForm').hidden=true;$('goalEdit').setAttribute('aria-expanded','false');renderToday()};
let armed=false;
$('clearSample').onclick=function(){
  if(!armed){armed=true;this.textContent='정말 지울까요? 한 번 더 눌러요';return}
  S={sample:false,goal:240,lastPlan:plan,subjects:[],sessions:[],moods:{},notes:[]};
  S.rewards=[];S.rests=[];S.claims={};save();renderAll();
};

/* subjects (optional, user-written) */
let subject='',editSub=false;
function renderSubjects(){
  if(subject&&!S.subjects.includes(subject))subject='';
  if(!S.subjects.length)editSub=false;
  $('subjects').innerHTML=S.subjects.length?S.subjects.map((s,i)=>`<button type="button" class="chip" data-i="${i}" aria-pressed="${!editSub&&s===subject}"${editSub?` aria-label="${esc(s)} 삭제"`:''}>${esc(s)}${editSub?'<span class="x" aria-hidden="true">×</span>':''}</button>`).join(''):'<span class="muted">과목은 적지 않아도 괜찮아요</span>';
  $('subEdit').hidden=!S.subjects.length;
  $('subEdit').textContent=editSub?'완료':'편집';$('subEdit').setAttribute('aria-pressed',String(editSub));
}
$('subjects').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;const i=+b.dataset.i;
  if(editSub){S.subjects.splice(i,1);save()}else subject=subject===S.subjects[i]?'':S.subjects[i];renderSubjects()};
$('subForm').onsubmit=e=>{e.preventDefault();const v=$('subInput').value.trim();if(!v)return;
  if(!S.subjects.includes(v))S.subjects.push(v);subject=v;editSub=false;$('subInput').value='';save();renderSubjects()};
$('subEdit').onclick=()=>{editSub=!editSub;renderSubjects()};

/* countdown timer */
let plan=S.lastPlan||25,remain=plan*60000,endAt=0,running=false,started=false,tick=null,wake=null,actx=null,pending=null;
function renderPresets(){
  const box=$('presets'),custom=box.querySelector('.custom');
  box.querySelectorAll('.chip').forEach(c=>c.remove());
  PRESETS.forEach(m=>{const b=document.createElement('button');b.type='button';b.className='chip';b.dataset.m=m;b.textContent=fmtMin(m);
    b.setAttribute('aria-pressed',String(m===plan));b.disabled=started;box.insertBefore(b,custom)});
  $('customMin').value=PRESETS.includes(plan)?'':plan;$('customMin').disabled=started;
  $('promise').textContent=`${fmtMin(plan)} 안에 끝내기로 약속해요. 짧게 잡아도 괜찮아요.`;
  $('plannedTxt').textContent=fmtMin(plan)+' 목표';
}
function setPlan(m){if(started)return;m=Math.max(1,Math.min(180,Math.round(m)||0));if(!m)return;plan=m;remain=m*60000;S.lastPlan=m;save();renderPresets();draw()}
$('presets').onclick=e=>{const b=e.target.closest('.chip');if(b)setPlan(+b.dataset.m)};
$('customMin').onchange=e=>setPlan(+e.target.value);
const left=()=>running?Math.max(0,endAt-Date.now()):remain;
function draw(){
  const r=left(),s=Math.ceil(r/1000),h=Math.floor(s/3600),m=Math.floor(s/60)%60,sec=s%60;
  $('clock').textContent=(h?h+':'+String(m).padStart(2,'0'):String(m).padStart(2,'0'))+':'+String(sec).padStart(2,'0');
  $('progArc').setAttribute('stroke-dashoffset',(100*(1-r/(plan*60000))).toFixed(2));
  if(running&&r<=0)complete();
}
function lockScreen(on){
  try{if(on&&navigator.wakeLock)navigator.wakeLock.request('screen').then(w=>wake=w,()=>{});else if(wake){wake.release();wake=null}}catch(e){}
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&running)lockScreen(true)});
function halt(){if(running){remain=Math.max(0,endAt-Date.now());running=false}clearInterval(tick);lockScreen(false)}
$('startBtn').onclick=function(){
  if(running){halt();this.textContent='계속';$('clockSub').textContent='잠시 멈췄어요';return}
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();actx.resume()}catch(e){}
  started=true;running=true;endAt=Date.now()+remain;tick=setInterval(draw,250);lockScreen(true);
  this.textContent='일시정지';$('finishBtn').disabled=false;
  $('clockSub').textContent=($('task').value.trim()||subject||'공부')+' 하는 중';
  renderPresets();draw();
};
$('finishBtn').onclick=()=>{
  halt();
  const m=Math.round((plan*60000-remain)/60000);
  if(m<1){resetTimer();$('clockSub').textContent='1분이 안 돼서 기록하지 않았어요';return}
  const next=Math.max(5,Math.floor(m/5)*5);
  pending={date:T,subject,task:$('task').value.trim()||undefined,min:m,planned:plan,done:false};
  openSheet('Good try','여기까지 한 것도 충분해요',
    `${fmtMin(plan)} 중 ${fmtMin(m)} 공부했어요. 다음엔 ${fmtMin(next)}처럼 끝까지 갈 수 있는 길이로 잡아 볼까요?`,
    next<plan?next:0);
};
function complete(){
  halt();remain=0;chime();
  pending={date:T,subject,task:$('task').value.trim()||undefined,min:plan,planned:plan,done:true};
  openSheet('Well done','약속한 시간을 다 채웠어요',`${fmtMin(plan)} 완주. 5분 정도 일어나서 쉬고 다음 한 칸을 시작해요.`,0);
}
function chime(){
  try{if(!actx)return;const t=actx.currentTime;
    [659,880].forEach((f,i)=>{const o=actx.createOscillator(),g=actx.createGain(),at=t+i*.35;
      o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(.18,at+.02);g.gain.exponentialRampToValueAtTime(.001,at+1.2);
      o.connect(g);g.connect(actx.destination);o.start(at);o.stop(at+1.3)})}catch(e){}
}
function openSheet(l,t,sum,suggest){
  $('sheetL').textContent=l;$('sheetT').textContent=t;
  {const g=pending&&pending.done&&gradeOf(pending.planned),tot=pending?minsOn(T)+pending.min>=240&&!S.claims['total:'+T]:false;
   const msg=[g?'타이머 미션':'',tot?'4시간 미션':''].filter(Boolean).join('과 ');
   $('sheetSum').textContent=sum+' '+(msg?`저장하면 ${msg}을 완료해요. 리워드 탭에서 받을 수 있어요.`:'타이머를 끝까지 채우면 리워드 미션이 완료돼요.');$('sheetArt').innerHTML='';}
  $('saveSess').textContent='저장';
  $('suggestBtn').hidden=!suggest;$('suggestBtn').dataset.m=suggest||'';$('suggestBtn').textContent=`다음엔 ${fmtMin(suggest)}`;
  $('scrim').hidden=false;
}
function resetTimer(){started=false;running=false;remain=plan*60000;clearInterval(tick);
  $('startBtn').textContent='시작';$('finishBtn').disabled=true;$('clockSub').textContent='준비되면 시작을 눌러요';$('scrim').hidden=true;pending=null;renderPresets();draw()}
function rewardsFor(p){const out=[],g=p.done&&gradeOf(p.planned);if(g)out.push(gradeR(g));
  if(!S.rewards.some(r=>r.date===T&&r.grade==='S'&&r.src!=='rest')&&minsOn(T)+p.min>=240)out.push('S');return out}
function commit(){if(pending){pending.claimed=false;S.sessions.push(pending);save()}$('task').value='';}
$('discard').onclick=()=>{resetTimer()};
$('saveSess').onclick=()=>{commit();resetTimer();renderToday();go('today')};
$('suggestBtn').onclick=e=>{const m=+e.currentTarget.dataset.m;commit();resetTimer();setPlan(m);renderToday()};

/* chart: study bars + condition line */
function drawChart(id){
  const now=new Date(),days=[];for(let i=6;i>=0;i--)days.push(add(now,-i));
  const W=340,L=34,R=40,top=28,bot=188,cw=(W-L-R)/7;
  const mins=days.map(d=>minsOn(dk(d))),mx=Math.max(180,Math.ceil(Math.max(...mins)/60)*60);
  const y=v=>bot-(v/mx)*(bot-top),ym=v=>bot-10-((v-1)/4)*(bot-top-20),cx=i=>L+i*cw+cw/2;
  let s='';
  for(let h=0;h<=mx;h+=60)s+=`<line class="${h?'grid':'base'}" x1="${L}" x2="${W-R}" y1="${y(h)}" y2="${y(h)}"/><text class="ax" x="${L-8}" y="${y(h)+4}" text-anchor="end">${h/60}</text>`;
  s+=`<text class="ax" x="${L-8}" y="${top-10}" text-anchor="end">시간</text><text class="ax m" x="${W-R+8}" y="${top-10}">컨디션</text>`;
  [1,3,5].forEach(v=>s+=`<text class="ax m" x="${W-R+8}" y="${(ym(v)+4).toFixed(1)}">${v}</text>`);
  days.forEach((d,i)=>{const w=cw*.5,x=cx(i)-w/2,v=mins[i];
    if(v)s+=`<rect class="bar${i===6?' today':''}" x="${x.toFixed(1)}" y="${y(v).toFixed(1)}" width="${w.toFixed(1)}" height="${(bot-y(v)).toFixed(1)}" rx="2"/>`;
    s+=`<text class="ax" x="${cx(i).toFixed(1)}" y="${bot+20}" text-anchor="middle">${i===6?'오늘':WD[d.getDay()]}</text>`});
  const md=days.map(d=>S.moods[dk(d)]||null),p=md.map((v,i)=>v==null?null:[cx(i),ym(v)]).filter(Boolean);
  if(p.length>1)s+=`<polyline class="mline" points="${p.map(q=>q.map(n=>n.toFixed(1)).join(',')).join(' ')}"/>`;
  md.forEach((v,i)=>{if(v!=null)s+=`<circle class="mdot" cx="${cx(i).toFixed(1)}" cy="${ym(v).toFixed(1)}" r="8"/><text class="mv" x="${cx(i).toFixed(1)}" y="${(ym(v)+4).toFixed(1)}" text-anchor="middle">${v}</text>`});
  $(id).innerHTML=s;
}

/* report */
function renderReport(){
  drawChart('chart');
  const [w1,w0]=weeks(),tot=w=>w.reduce((a,d)=>a+minsOn(d),0);
  const r1=rate(sessIn(w1)),r0=rate(sessIn(w0));
  const rows=[
    ['공부',tot(w1),tot(w0),v=>fmtMin(v),v=>(v<0?'-':'')+fmtMin(Math.abs(v))],
    ['컨디션',avg(w1.map(d=>S.moods[d])),avg(w0.map(d=>S.moods[d])),v=>v.toFixed(1),v=>v.toFixed(1)],
    ['완주율',r1==null?null:r1*100,r0==null?null:r0*100,v=>Math.round(v)+'%',v=>Math.round(v)+'%p']];
  $('cmp').innerHTML=rows.map(([k,a,b,f,fd])=>{const d=a!=null&&b!=null?a-b:null;
    return `<div><div class="k">${k}</div><div class="v">${a==null?'–':f(a)}</div><div class="d ${d==null?'':d>=0?'up':'down'}">${d==null?'지난주 기록 없음':(d>=0?'+':'')+fd(d)+'<br>지난주 대비'}</div></div>`}).join('');

  const ins=[],b=burnoutText();if(b)ins.push(b);
  const all=[];for(let i=0;i<14;i++)all.push(dk(add(new Date(),-i)));
  const recent=sessIn(all),sh=rate(recent.filter(s=>s.planned<=30)),lg=rate(recent.filter(s=>s.planned>=45));
  if(sh!=null&&lg!=null&&sh-lg>=.2)ins.push(`30분 이하 타이머는 ${Math.round(sh*100)}% 완주했는데, 45분 이상은 ${Math.round(lg*100)}%예요. 긴 공부는 짧게 나눠 보세요.`);
  const after=[],other=[];
  all.forEach(d=>{const m=S.moods[d];if(!m)return;const prev=dk(add(new Date(d+'T12:00'),-1));(minsOn(prev)>=240?after:other).push(m)});
  const aa=avg(after),ao=avg(other);
  if(aa!=null&&ao!=null&&ao-aa>=.3)ins.push(`4시간 넘게 공부한 다음 날은 컨디션이 평균 ${aa.toFixed(1)}점으로, 다른 날(${ao.toFixed(1)}점)보다 낮아요.`);
  if(!ins.length)ins.push('기록이 쌓이면 공부와 컨디션 사이의 패턴을 알려 드릴게요.');
  $('insights').innerHTML=ins.map(t=>`<li><span class="t">${t}</span></li>`).join('');
}

/* mind: breathing (rAF-driven: 4s in, 4s hold, 6s out, seamless) */
var bTimer=null,bRaf=0;
const BMIN=.55,BMAX=1,BCYC=14,BTOTAL=BCYC*9;
const eio=k=>.5-.5*Math.cos(Math.PI*k);
$('bBtn').onclick=function(){
  if(bTimer){stopBreath();return}
  this.textContent='그만하기';
  const f=$('bfill');f.style.transition='none';
  const st=performance.now();let lastW='',lastR=-1;bTimer=1;
  const frame=now=>{
    if(!bTimer)return;
    const el=(now-st)/1000;
    if(el>=BTOTAL){stopBreath();$('bword').textContent='잘했어요';$('bleft').textContent='몸이 조금 가벼워졌기를 바라요';onRest();return}
    const c=el%BCYC;let w,sc;
    if(c<4){w='들이쉬기';sc=BMIN+(BMAX-BMIN)*eio(c/4)}
    else if(c<8){w='멈추기';sc=BMAX}
    else{w='내쉬기';sc=BMAX-(BMAX-BMIN)*eio((c-8)/6)}
    f.style.transform=`scale(${sc.toFixed(4)})`;
    if(w!==lastW){$('bword').textContent=w;lastW=w}
    const r=Math.ceil(BTOTAL-el);if(r!==lastR){$('bleft').textContent=`남은 시간 ${Math.floor(r/60)}:${String(r%60).padStart(2,'0')}`;lastR=r}
    bRaf=requestAnimationFrame(frame)};
  bRaf=requestAnimationFrame(frame);
};
function breathTo(sc,sec){const f=$('bfill');f.style.transition=`transform ${sec}s cubic-bezier(.37,0,.63,1)`;f.style.transform=`scale(${sc})`}
function stopBreath(){cancelAnimationFrame(bRaf);bTimer=null;$('bBtn').textContent='호흡 시작';breathTo(BMIN,1.2);$('bword').textContent='준비';$('bleft').textContent='4초 들이쉬고, 4초 멈추고, 6초 내쉬어요'}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&bTimer)stopBreath()});

/* mind: notes */
$('noteForm').onsubmit=e=>{e.preventDefault();const t=$('noteText').value.trim();if(!t)return;
  S.notes.unshift({date:T,kind:'일기',text:t});save();$('noteText').value='';renderNotes()};
let notesOpen=false;
$('moreNotes').onclick=()=>{notesOpen=!notesOpen;renderNotes()};
function renderNotes(){
  const list=S.notes.filter(n=>n.kind!=='걱정');
  $('notes').innerHTML=list.length?(notesOpen?list:list.slice(0,4)).map(n=>`<li><span class="t">${esc(n.text)}<div class="sub num">${n.date.slice(5).replace('-','/')}</div></span></li>`).join(''):'<li class="muted">아직 남긴 일기가 없어요.</li>';
  $('moreNotes').hidden=list.length<=4;$('moreNotes').textContent=notesOpen?'접기':`더보기 (${list.length-4})`;
}
document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=()=>{
  const ok=()=>{b.textContent='복사됨';setTimeout(()=>b.textContent='번호 복사',1500)};
  try{navigator.clipboard.writeText(b.dataset.copy).then(ok,()=>{})}catch(e){}
});

/* rabbits */
const ODDS={1:{C:60,B:30,A:9.9,S:.1},daily:{C:60,B:30,A:9.9,S:.1},5:{C:40,B:40,A:19.5,S:.5},10:{B:60,A:39.3,S:.7},30:{A:99,S:1},total:{A:95,S:5}};
function roll(t){const o=ODDS[t];let x=Math.random()*100;for(const g of ['C','B','A','S']){if(!o[g])continue;if((x-=o[g])<0)return g}return Object.keys(o).sort((a,b)=>o[b]-o[a])[0]}
function onRest(){S.rests.push(T);save();$('bleft').textContent='마음 휴식 미션을 완료했어요. 리워드 탭에서 받아요.'}
const MISSION={timer:{D:'C등급',C:'C등급',B:'B등급',A:'B등급'},total:'A~S등급 랜덤',1:'C~S등급 랜덤',5:'C~S등급 랜덤',10:'B~S등급 랜덤',30:'A~S등급 랜덤'};
let lastRid=null;
function claim(key){
  let g=null;const [k,v]=key.split(':');
  if(k==='timer'){const ck='timer:'+v+':'+T,need={D:1,C:10,B:25,A:40}[v];if(S.claims[ck]||!need||!S.sessions.some(x=>x.date===T&&x.done&&x.planned>=need))return;S.claims[ck]=1;g={D:'C',C:'C',B:'B',A:'B'}[v]}
  else if(k==='total'){if(minsOn(T)<240||S.claims['total:'+T])return;S.claims['total:'+T]=1;g=roll('total')}
  else if(k==='restd'){if(!S.rests.includes(T)||S.claims['restd:'+T])return;S.claims['restd:'+T]=1;g=roll('daily')}
  else if(k==='rest'){const m=+v;if(S.rests.length<m||S.claims['rest:'+m])return;S.claims['rest:'+m]=1;g=roll(m)}
  if(!g)return;
  const id=pick(g,ownedSet());lastRid=id;S.rewards.push({date:T,grade:g,id,src:k});save();
  $('rwT').textContent='미션 완료!';$('rwSum').textContent=`${g}등급 토끼가 찾아왔어요.`;
  $('rwArt').innerHTML=reveal([{grade:g,id}]);$('rwScrim').hidden=false;renderRewards();
}
$('rwClose').onclick=()=>{$('rwScrim').hidden=true};
$('rwGo').onclick=()=>{$('rwScrim').hidden=true;
  const t=lastRid!=null&&document.querySelector(`.ctile[data-rid="${lastRid}"]`);
  if(!t){$('coll').scrollIntoView({behavior:'smooth',block:'start'});return}
  t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
  t.classList.remove('glow');void t.offsetWidth;t.classList.add('glow');t.addEventListener('animationend',()=>t.classList.remove('glow'),{once:true});setTimeout(()=>t.classList.remove('glow'),4200)};
function renderMissions(){
  const tot=minsOn(T),n=S.rests.length;
  const btn=(key,label)=>`<button class="claim" type="button" data-claim="${key}">${label}</button>`;
  const row=(done,t,grade,st,bar)=>`<li class="${done?'ok':''}"><span class="dot"></span><div class="mt">${t}<div class="ms"><span class="gtag">${grade}</span></div>${bar!=null?`<div class="pbar"><i style="width:${bar}%"></i></div>`:''}</div><span class="st">${st}</span></li>`;
  let h='<div class="mgroup">매일 미션 · 하루 한 번씩 받을 수 있어요</div><ul class="missions">';
  const best=Math.max(0,...S.sessions.filter(x=>x.date===T).map(x=>x.min));
  [['D','1분 타이머 완주',1],['C','10분 이상 타이머 완주',10],['B','25분 이상 타이머 완주',25],['A','40분 이상 타이머 완주',40]].forEach(([g,t,m])=>{
    const td=S.sessions.some(x=>x.date===T&&x.done&&x.planned>=m),c=S.claims['timer:'+g+':'+T];
    h+=row(td,t,MISSION.timer[g],c?'받음':td?btn('timer:'+g,'받기'):Math.min(99,Math.round(best/m*100))+'%')});
  const tc=S.claims['total:'+T];
  h+=row(tot>=240,'하루 총 4시간 공부',MISSION.total,tc?'받음':tot>=240?btn('total','받기'):Math.min(99,Math.round(tot/240*100))+'%',tc||tot>=240?null:Math.min(100,Math.round(tot/240*100)));
  h+='</ul><div class="mgroup">마음 휴식 미션 · 누적, 2분 호흡을 끝까지</div><ul class="missions">';
  [1,5,10,30].forEach(m=>{const c=S.claims['rest:'+m];h+=row(n>=m,`마음 휴식 ${m}회`,MISSION[m],c?'받음':n>=m?btn('rest:'+m,'받기'):Math.min(99,Math.round(n/m*100))+'%',c||n>=m?null:Math.min(100,Math.round(n/m*100)))});
  $('missions').innerHTML=h+'</ul>';
}
$('missions').onclick=e=>{const b=e.target.closest('[data-claim]');if(b)claim(b.dataset.claim)};
function renderRewards(){
  renderMissions();
  $('rTotal').textContent=S.rewards.length+'마리';
  const cnt={};S.rewards.forEach(r=>cnt[r.id]=(cnt[r.id]||0)+1);
  $('rDex').textContent=`도감 ${Object.keys(cnt).length} / ${RB.filter(Boolean).length}`;
  $('coll').innerHTML=ORDER.map(g=>{const pool=poolOf(g),have=pool.filter(i=>cnt[i]).length;
    return `<div class="cgroup"><div class="cgh"><span class="gb ${g}">${g}</span>${have} / ${pool.length}</div><div class="cgrid">${pool.map(id=>{const n=cnt[id]||0;
      return `<div class="ctile${n?'':' lock'}" data-rid="${id}">${rimg(id)}<div class="cn">${n?RB[id][1]:'???'}</div>${n>1?`<span class="cc num">×${n}</span>`:''}</div>`}).join('')}</div></div>`}).join('');
}

/* cloud backup (Firebase, optional) + file backup */
var CLOUD={cfg:window.DC_FIREBASE||null,user:null,auth:null,db:null,busy:false,pending:false,timer:0};
const FBV='10.14.1';
function loadScript(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)})}
const UA=navigator.userAgent||'';
const IS_IOS=/iPhone|iPad|iPod/i.test(UA)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const IS_AND=/Android/i.test(UA);
const IS_KAKAO=/KAKAOTALK/i.test(UA);
const INAPP=IS_KAKAO||/Instagram|FBAN|FBAV|FB_IAB|NAVER\(inapp|; ?Line\/|DaumApps|BAND\/|everytimeApp|Whale\/.*inapp/i.test(UA)||(IS_AND&&/; wv\)/.test(UA));
const STANDALONE=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
function openExternal(){const u=location.href;
  if(IS_KAKAO){location.href='kakaotalk://web/openExternal?url='+encodeURIComponent(u);return}
  if(IS_AND){location.href='intent://'+u.replace(/^https?:\/\//,'')+'#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url='+encodeURIComponent(u)+';end';return}}
function renderInapp(force){if(!INAPP&&!force)return;$('inappBox').hidden=false;
  const can=IS_KAKAO||IS_AND;$('extBtn').hidden=!can;
  $('inappMsg').textContent=can?'이 화면에서는 Google 로그인이 안 돼요. 아래 버튼으로 '+(IS_IOS?'Safari':'Chrome')+'에서 열어 주세요.':'이 화면에서는 Google 로그인이 안 돼요. 아래 \'주소 복사\'를 누른 뒤 Safari 주소창에 붙여넣어 열어 주세요. (링크를 열었다면 오른쪽 위·아래의 ··· 메뉴에서 \'Safari로 열기\'도 돼요.)'}
async function cloudInit(){
  if(!CLOUD.cfg||!CLOUD.cfg.apiKey)return;
  $('cloudBox').hidden=false;
  try{
    if(!(window.firebase&&firebase.auth&&firebase.firestore)){
      const base='https://www.gstatic.com/firebasejs/'+FBV+'/';
      await loadScript(base+'firebase-app-compat.js');await loadScript(base+'firebase-auth-compat.js');await loadScript(base+'firebase-firestore-compat.js');}
    if(!firebase.apps.length)firebase.initializeApp(CLOUD.cfg);
    CLOUD.auth=firebase.auth();CLOUD.db=firebase.firestore();
    CLOUD.auth.onAuthStateChanged(u=>{CLOUD.user=u;renderAcct();if(u)cloudSync()});
    initGsi();
  }catch(e){$('authMsg').textContent='클라우드에 연결하지 못했어요. 인터넷 연결을 확인해 주세요.'}
}
function renderAcct(){
  const u=CLOUD.user;$('cloudOut').hidden=!!u;$('cloudIn').hidden=!u;
  if(u){const nv=false;$('acctEmail').textContent=u.email||'내';
    const t=+lsGet(KEY+'.synced')||0;
    $('syncStatus').textContent=nv?'메일 인증을 기다리는 중이에요.':CLOUD.busy?'저장 중…':t?'자동 저장 중 · 마지막 '+new Date(t).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}):'곧 자동으로 저장돼요'}
}
async function cloudSync(){
  if(!CLOUD.user||!CLOUD.db)return;
  if(CLOUD.busy){CLOUD.pending=true;return}
  CLOUD.busy=true;renderAcct();
  try{
    const ref=CLOUD.db.collection('users').doc(CLOUD.user.uid);let merged=null;
    await CLOUD.db.runTransaction(async tx=>{
      const snap=await tx.get(ref);let remote=null;
      if(snap.exists){try{remote=JSON.parse(snap.data().data)}catch(e){}}
      merged=remote?mergeState(S,remote):migrate(JSON.parse(JSON.stringify(S)));
      const payload=JSON.stringify(merged);
      if(payload.length>300000)throw {code:'dc/too-big'};
      tx.set(ref,{data:payload,schema:SCHEMA,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    });
    const changed=JSON.stringify(merged)!==JSON.stringify(S);
    fixRewards(merged);S=merged;writeLocal();lsSet(KEY+'.synced',String(Date.now()));
    if(changed)refreshAll();
    if(/동기화하지/.test($('authMsg').textContent))$('authMsg').textContent='';
  }catch(e){$('authMsg').textContent=e&&e.code==='dc/too-big'?'기록이 너무 많아 저장 한도를 넘었어요. 오래된 일기를 줄여 주세요.':'동기화하지 못했어요. 인터넷 연결을 확인해 주세요. 기록은 이 폰에 안전하게 남아 있어요.'}
  CLOUD.busy=false;renderAcct();
  if(CLOUD.pending){CLOUD.pending=false;cloudSchedule()}
}
function cloudSchedule(){if(!CLOUD||!CLOUD.user)return;clearTimeout(CLOUD.timer);CLOUD.timer=setTimeout(cloudSync,2500)}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&CLOUD.user&&CLOUD.timer){clearTimeout(CLOUD.timer);CLOUD.timer=0;cloudSync()}});
function refreshAll(){renderAll();const v=document.querySelector('[data-tab][aria-current="page"]');if(v&&v.dataset.tab==='report')renderReport();if(v&&v.dataset.tab==='rewards')renderRewards()}
const AUTH_MSG={'auth/invalid-email':'이메일 형식을 확인해 주세요.','auth/user-not-found':'가입된 계정이 없어요. 먼저 가입해 주세요.','auth/wrong-password':'비밀번호가 맞지 않아요.','auth/invalid-credential':'이메일이나 비밀번호가 맞지 않아요.','auth/invalid-login-credentials':'이메일이나 비밀번호가 맞지 않아요.','auth/email-already-in-use':'이미 가입된 이메일이에요. 로그인해 주세요.','auth/weak-password':'비밀번호가 너무 약해요. 영문·숫자·특수문자를 섞어 8자 이상으로 해 주세요.','auth/popup-closed-by-user':'로그인 창이 닫혔어요. 다시 눌러 주세요.','auth/cancelled-popup-request':'로그인 창이 닫혔어요. 다시 눌러 주세요.','auth/popup-blocked':'팝업이 막혔어요. 브라우저에서 팝업을 허용하고 다시 눌러 주세요.','auth/account-exists-with-different-credential':'같은 이메일로 이미 다른 방법으로 가입돼 있어요. 그 방법으로 로그인해 주세요.','auth/unauthorized-domain':'이 주소는 로그인이 허용되지 않았어요.','auth/operation-not-allowed':'이 로그인 방법은 아직 켜지지 않았어요.','auth/network-request-failed':'인터넷 연결을 확인해 주세요.','auth/too-many-requests':'시도가 너무 많았어요. 잠시 후 다시 해 주세요.','auth/missing-password':'비밀번호를 입력해 주세요.'};
const authErr=e=>AUTH_MSG[e&&e.code]||('잠시 후 다시 시도해 주세요.'+(e&&e.code?' ('+String(e.code).replace(/^auth\//,'').slice(0,60)+')':''));
async function initGsi(){
  const id=window.DC_GOOGLE_CLIENT_ID;if(!id||INAPP)return;
  try{
    if(!(window.google&&google.accounts&&google.accounts.id))await loadScript('https://accounts.google.com/gsi/client');
    google.accounts.id.initialize({client_id:id,ux_mode:'popup',auto_select:false,cancel_on_tap_outside:true,
      callback:async r=>{try{$('authMsg').textContent='로그인하는 중…';
        await CLOUD.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(r.credential));
        $('authMsg').textContent='로그인했어요. 계정의 기록을 불러올게요.'}catch(e){$('authMsg').textContent=authErr(e)}}});
    google.accounts.id.renderButton($('gsiBtn'),{type:'standard',theme:'outline',size:'large',text:'signin_with',shape:'rectangular',locale:'ko',width:Math.min(280,Math.max(200,innerWidth-110))});
    $('gsiBtn').hidden=false;$('googleBtn').hidden=true;
  }catch(e){}
}
async function googleDo(){
  if(!CLOUD.auth){$('authMsg').textContent='클라우드에 연결 중이에요. 잠시 후 다시 눌러 주세요.';return}
  if(INAPP){renderInapp();$('authMsg').textContent='';return}
  const p=new firebase.auth.GoogleAuthProvider();p.setCustomParameters({prompt:'select_account'});
  try{await CLOUD.auth.signInWithPopup(p);$('authMsg').textContent='로그인했어요. 계정의 기록을 불러올게요.'}
  catch(e){const c=e&&e.code;
    if(c==='auth/popup-blocked'||c==='auth/operation-not-supported-in-this-environment'){renderInapp(true);$('authMsg').textContent='로그인 창을 열 수 없어요. Safari나 Chrome에서 직접 열어 주세요.';return}
    $('authMsg').textContent=authErr(e)+(STANDALONE&&IS_IOS&&c==='auth/popup-closed-by-user'?' 홈 화면 앱에서 계속 안 되면 Safari에서 로그인해 주세요.':'')}
}
$('signOutBtn').onclick=async()=>{if(CLOUD.timer){clearTimeout(CLOUD.timer);CLOUD.timer=0;await cloudSync()}await CLOUD.auth.signOut();$('authMsg').textContent='로그아웃했어요. 이 폰의 기록은 그대로 남아 있어요.'};
$('googleBtn').onclick=googleDo;
$('extBtn').onclick=openExternal;
$('copyBtn').onclick=async()=>{const u=location.origin+location.pathname;try{await navigator.clipboard.writeText(u);$('authMsg').textContent='주소를 복사했어요. Safari나 Chrome 주소창에 붙여넣어 주세요.'}catch(e){$('authMsg').textContent=u}};
renderInapp();
$('acctBtn').onclick=()=>{renderAcct();$('authMsg').textContent='';$('acctScrim').hidden=false};
$('acctClose').onclick=()=>{$('acctScrim').hidden=true};
cloudInit();

/* opening + first-run guide (tab tour with highlight bars) */
{const op=$('open'),g=$('guide'),card=$('gCard'),f1=$('gF1'),f2=$('gF2');
  const steps=[
  ['today','[data-view="today"] .card.striped','오늘 컨디션부터','오늘 상태를 먼저 골라 보세요.\n컨디션과 최근 기록을 보고 오늘 공부 시간을 추천해 드려요.'],
  ['today','#goalEdit','하루 목표는 내 마음대로','목표 시간 설정에서 오늘의 목표를\n날마다 직접 정할 수 있어요.'],
  ['timer','#presets','정한 시간 안에 끝내기','시간을 고르고 시작해요. 끝까지 채우면 완주,\n중간에 그만두면 다음엔 더 짧은 시간을 권해요.'],
  ['report','[data-view="report"] .card','한 주를 돌아보기','공부 시간과 컨디션이 그래프로 쌓여요.\n지난주와 비교해 패턴도 알려 드려요.'],
  ['mind','.breath','2분 호흡','마음이 복잡할 때 호흡 시작을 눌러\n원이 줄어드는 리듬에 맞춰 숨을 쉬어요.'],
  ['mind','#noteForm','한 줄 일기','오늘의 마음을 한 줄로 남겨요.'],
  ['rewards','#missions','토끼 모으기','미션을 완료 체크하면 토끼를 받아요.\n매일 미션은 하루 한 번, 마음 휴식은 쌓이는 횟수예요.'],
  ['today','#acctBtn','회원가입 · 로그인','맨 아래 \'회원가입 · 로그인\'을 누르고\nGoogle로 로그인하면 기록을 저장할 수 있어요.\n로그인하지 않으면 기록이 날아갈 수 있어요.'],
  ['today','#helpBtn','사용 방법 다시 보기','이 안내는 맨 아래\n\'사용 방법 다시 보기\'를 누르면\n언제든 다시 볼 수 있어요.']];
  let k=0,on=false;
  const place=(f,el,pad,clamp)=>{if(!el){f.style.display='none';return}const r=el.getBoundingClientRect();
    let t=r.top-pad,b=r.bottom+pad;if(clamp){const nt=document.querySelector('nav.tabs').getBoundingClientRect().top;t=Math.max(t,card.getBoundingClientRect().bottom+8);b=Math.min(b,nt-10)}
    if(b-t<10){f.style.display='none';return}
    f.style.display='block';f.style.left=(r.left-pad)+'px';f.style.top=t+'px';f.style.width=(r.width+pad*2-4)+'px';f.style.height=(b-t-4)+'px'};
  const tall=el=>el&&el.getBoundingClientRect().height>innerHeight*.42;
  const layout=()=>{if(!on)return;const [tab,sel]=steps[k];const el=document.querySelector(sel),tb=document.querySelector('nav.tabs [data-tab="'+tab+'"]');
    const r=el?el.getBoundingClientRect():null,mid=r?r.top+r.height/2:0;
    if(r&&(tall(el)||mid>innerHeight*.5)){card.style.top='16px';card.style.bottom='auto'}else{card.style.bottom='calc(78px + env(safe-area-inset-bottom,0px))';card.style.top='auto'}
    place(f1,el,6,tall(el)||mid>innerHeight*.5);place(f2,tb,0,false)};
  const drawG=()=>{const [tab,sel,t,p]=steps[k];go(tab);
    $('gN').textContent=(k+1)+' / '+steps.length;$('gT').textContent=t;$('gP').textContent=p;
    $('gD').innerHTML=steps.map((_,i)=>`<i class="${i===k?'on':''}"></i>`).join('');const last=k===steps.length-1;$('gNext').textContent=last?(CLOUD.user?'시작하기':'로그인하기'):'다음';$('gSkip').textContent=last?(CLOUD.user?'닫기':'나중에'):'건너뛰기';
    const el=document.querySelector(sel);if(el){const y=el.getBoundingClientRect().top+scrollY-(tall(el)?card.offsetHeight+40:96);scrollTo({top:Math.max(0,y)})}
    layout();setTimeout(layout,80);setTimeout(layout,300)};
  const closeG=()=>{on=false;g.classList.add('out');go('today');S.guided=true;save()};
  const openG=()=>{k=0;on=true;g.classList.remove('out');drawG()};
  $('gNext').onclick=()=>{if(k<steps.length-1){k++;drawG()}else{closeG();if(!CLOUD.user)$('acctBtn').click()}};
  $('gSkip').onclick=closeG;
  $('helpBtn').onclick=openG;
  addEventListener('resize',layout);addEventListener('scroll',layout,{passive:true});
  let gone=false;
  const closeO=()=>{if(gone)return;gone=true;op.classList.add('out');setTimeout(()=>op.remove(),800);if(!S.guided)openG()};
  op.onclick=closeO;setTimeout(closeO,2400);
}

function renderAll(){renderToday();renderSubjects();renderPresets();renderNotes();draw()}
renderAll();
})();
