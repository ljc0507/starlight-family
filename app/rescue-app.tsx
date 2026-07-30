"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {avatars,characters,enhancedMissions} from "./course-data";

type CharName=keyof typeof characters;
type Profile={name:string;age:3|5;avatar:string;main:number[];math:number[];phonics:number[];visual:number[];battle:number[];stars:number;lastSteps:Record<string,number>;seenTutorials:string[];missionStartStars:Record<string,number>;orderState:Record<string,(string|null)[]>};
type Store={version:3;profiles:Profile[];active:number;rate:number;volume:number};
const baseProfile=(name:string,age:3|5,avatar:string):Profile=>({name,age,avatar,main:[],math:[],phonics:[],visual:[],battle:[],stars:0,lastSteps:{},seenTutorials:[],missionStartStars:{},orderState:{}});
const initial:Store={version:3,profiles:[baseProfile("小隊長 A",3,avatars[4]),baseProfile("小隊長 B",5,avatars[7])],active:0,rate:.85,volume:.9};
const steps=["接收任務","有聲故事","生活判斷","看圖找答案","步驟排序","情境操作","合作任務","支援任務","基地晚安"];
const characterProfiles:Record<CharName,{role:string;personality:string;skill:string}>={
  星隊長:{role:"救援隊總指揮",personality:"冷靜、溫暖，會先聽大家說完。",skill:"安排任務、鼓勵合作"},
  大力:{role:"黃色工程車",personality:"可靠又有耐心，喜歡把東西整理好。",skill:"建造、分類、收納"},
  挖挖:{role:"橘色怪手",personality:"好奇又細心，會一步一步找線索。",skill:"清潔、挖掘、步驟排序"},
  高高:{role:"紅色雲梯車",personality:"勇敢但不冒失，遇到困難懂得求助。",skill:"安全觀念、登高救援"},
  小焰:{role:"紅色消防車",personality:"活潑又貼心，最會照顧大家的身體。",skill:"刷牙、洗手、情緒冷靜"},
  旋風:{role:"藍白直升機",personality:"觀察力很好，會從空中看清楚全局。",skill:"時間、方向、注音偵察"}
};
const characterFiles:Record<CharName,string>={星隊長:"commander",大力:"dali",挖挖:"wawa",高高:"gaogao",小焰:"xiaoyan",旋風:"xuanfeng"};
const behaviorArt=[
  {theme:"禮",good:["先問好","等一等","輪流用"],bad:["不問好","伸手搶"]},
  {theme:"牙",good:["刷外側","刷內側","刷咬合"],bad:["只刷門牙","後面沒刷"]},
  {theme:"浴",good:["試水溫","站穩洗"],bad:["浴室奔跑","容易滑倒"]},
  {theme:"收",good:["先分類","放回家"],bad:["塞床底","走道凌亂"]},
  {theme:"時",good:["洗澡","刷牙","上床"],bad:["半夜玩車","沒有休息"]},
  {theme:"準",good:["提早收尾","準時出發"],bad:["最後才找","大家等待"]},
  {theme:"衣",good:["看前後","慢慢穿"],bad:["用力拉扯","衣服卡住"]},
  {theme:"手",good:["飯前洗","回家洗"],bad:["看似乾淨","就不洗手"]},
  {theme:"食",good:["每類一點","記得喝水"],bad:["只吃甜點","不喝水"]},
  {theme:"安",good:["停看聽","牽大人"],bad:["直接衝過去","沒有觀察"]},
  {theme:"師",good:["聽示範","收好道謝"],bad:["打斷老師","亂丟工具"]},
  {theme:"心",good:["說出感受","深呼吸"],bad:["推人摔物","傷害別人"]},
  {theme:"家",good:["選一件事","自己完成"],bad:["都等別人","不願幫忙"]},
  {theme:"星",good:["先想步驟","合作完成"],bad:["立刻放棄","不再嘗試"]}
];

function migrate(raw:any):Store{
  const src=raw||initial;
  return {version:3,active:src.active??0,rate:src.rate??.85,volume:src.volume??.9,profiles:(src.profiles||initial.profiles).map((p:any,i:number)=>({
    ...baseProfile(p.name||`小隊長 ${i?"B":"A"}`,p.age===5?5:3,p.avatar||avatars[i?7:4]),...p,
    visual:Array.isArray(p.visual)?p.visual:[],battle:Array.isArray(p.battle)?p.battle:[],lastSteps:p.lastSteps||{},
    seenTutorials:Array.isArray(p.seenTutorials)?p.seenTutorials:[],missionStartStars:p.missionStartStars||{},orderState:p.orderState||{}
  }))};
}

function Character({name,state="idle",small=false}:{name:CharName;state?:"idle"|"talk"|"think"|"success";small?:boolean}){
  return <div className={`character ${state} ${small?"small":""}`} aria-label={name}>
    <div className="characterFrame"><img src={`/characters/${characterFiles[name]}.webp`} alt={name}/><span className="imageFallback">{characters[name].icon}</span></div>
    <span>{name}</span>
  </div>;
}

function useVoice(rate:number,volume:number){
  const [speaking,setSpeaking]=useState(false);
  const [paused,setPaused]=useState(false);
  const speak=(text:string,who:CharName="星隊長",done?:()=>void)=>{
    if(!("speechSynthesis" in window))return;
    speechSynthesis.cancel();
    const cfg=characters[who],u=new SpeechSynthesisUtterance(text);
    const vs=speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith("zh"));
    u.lang="zh-TW";u.rate=Math.max(.62,Math.min(1.05,rate*(cfg.rate/.82)));u.pitch=cfg.pitch;u.volume=volume;
    u.voice=vs[cfg.slot%Math.max(vs.length,1)]||vs.find(v=>v.lang.toLowerCase().includes("zh-tw"))||null;
    u.onstart=()=>{setSpeaking(true);setPaused(false)};u.onend=()=>{setSpeaking(false);setPaused(false);done?.()};u.onerror=()=>setSpeaking(false);
    speechSynthesis.speak(u);
  };
  return {speak,speaking,paused,pause:()=>{speechSynthesis.pause();setPaused(true)},resume:()=>{speechSynthesis.resume();setPaused(false)},stop:()=>{speechSynthesis.cancel();setSpeaking(false)}};
}

export default function RescueApp(){
  const [store,setStore]=useState<Store>(initial),[ready,setReady]=useState(false);
  const [view,setView]=useState<"home"|"map"|"mission"|"parent"|"characters">("home"),[day,setDay]=useState(1),[step,setStepState]=useState(0);
  const [branch,setBranch]=useState<"math"|"phonics"|null>(null),[feedback,setFeedback]=useState("");
  const [dialogueIndex,setDialogueIndex]=useState(0),[selectedCard,setSelectedCard]=useState<string|null>(null),[placed,setPlaced]=useState<(string|null)[]>([]);
  const [battleRound,setBattleRound]=useState(0),[monsterPower,setMonsterPower]=useState(2);
  const [selectedTool,setSelectedTool]=useState<{icon:string;label:string;ok:boolean}|null>(null),[sceneSolved,setSceneSolved]=useState(false),[tutorial,setTutorial]=useState<string|null>(null);
  const [celebration,setCelebration]=useState<{who:CharName;title:string}|null>(null);
  const profile=store.profiles[store.active],m=enhancedMissions[day-1],voice=useVoice(store.rate,store.volume),storyText=m.dialogue[dialogueIndex];
  const autoRef=useRef(false);
  useEffect(()=>{try{const old=localStorage.getItem("starlight-rescue-v2")||localStorage.getItem("starlight-rescue-v1");if(old)setStore(migrate(JSON.parse(old)))}catch{}setReady(true)},[]);
  useEffect(()=>{if(ready)localStorage.setItem("starlight-rescue-v2",JSON.stringify(store))},[store,ready]);
  useEffect(()=>()=>voice.stop(),[]);
  const update=(patch:Partial<Profile>)=>setStore(s=>({...s,profiles:s.profiles.map((p,i)=>i===s.active?{...p,...patch}:p)}));
  const addUnique=(field:"main"|"math"|"phonics"|"visual"|"battle",value:number,star=true)=>{
    const list=profile[field];if(list.includes(value))return;update({[field]:[...list,value],stars:profile.stars+(star?1:0)} as Partial<Profile>);
  };
  const chime=()=>{try{const AC=window.AudioContext||(window as any).webkitAudioContext,ctx=new AC();[523,659,784].forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=f;g.gain.setValueAtTime(.04,ctx.currentTime+i*.12);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.12+.32);o.connect(g);g.connect(ctx.destination);o.start(ctx.currentTime+i*.12);o.stop(ctx.currentTime+i*.12+.34)})}catch{}};
  const celebrate=(who:CharName,title:string,done?:()=>void)=>{chime();setCelebration({who,title});done?.()};
  const showTutorial=(kind:string)=>{setTutorial(kind);if(!profile.seenTutorials.includes(kind))update({seenTutorials:[...profile.seenTutorials,kind]})};
  const setStep=(n:number)=>{voice.stop();setFeedback("");setSelectedTool(null);if(n===5)setSceneSolved(false);setStepState(n);update({lastSteps:{...profile.lastSteps,[day]:n}});const kinds:Record<number,string>={4:"排序",5:"情境",6:"合作"};if(kinds[n]&&!profile.seenTutorials.includes(kinds[n]))setTimeout(()=>showTutorial(kinds[n]),250)};
  const openMission=(d:number)=>{const dm=enhancedMissions[d-1],saved=profile.orderState[d];setDay(d);setBranch(null);setFeedback("");setDialogueIndex(0);setBattleRound(0);setMonsterPower(profile.battle.includes(d)?0:2);setSelectedCard(null);setPlaced(saved?.length?saved:Array(dm.visualChallenges[1].steps.length).fill(null));setSelectedTool(null);setSceneSolved(false);setView("mission");setStepState(profile.lastSteps[d]||0);if(profile.missionStartStars[d]===undefined)update({missionStartStars:{...profile.missionStartStars,[d]:profile.stars}})};
  const visualAnswer=(challenge:number,ok:boolean)=>{if(ok){setFeedback("");celebrate(m.characters[(challenge-1)%2] as CharName,"答對了！",()=>addUnique("visual",day*10+challenge))}else setFeedback("再觀察一次：看看角色真正需要哪一個做法。")};
  const pool=m.visualChallenges[1].steps.filter((x:string)=>!placed.includes(x));
  const placeCard=(slot:number)=>{if(!selectedCard)return;const next=[...placed];next[slot]=selectedCard;setPlaced(next);setSelectedCard(null);voice.speak(selectedCard,m.characters[0] as CharName);update({orderState:{...profile.orderState,[day]:next}})};
  const removePlaced=(slot:number)=>{const next=[...placed];next[slot]=null;setPlaced(next);update({orderState:{...profile.orderState,[day]:next}})};
  const checkOrder=()=>{const ok=placed.every((x,i)=>x===m.visualChallenges[1].steps[i]);if(ok){setFeedback("");celebrate(m.characters[1] as CharName,"順序完全正確！",()=>addUnique("visual",day*10+2))}else setFeedback("第一步還不太對。想想哪件事一定要最先做。")};
  const sceneTarget=()=>{if(!selectedTool){setFeedback("先從工具盤選一個工具，選好後再按橙色的下一步按鈕。");return}if(selectedTool.ok){setSceneSolved(true);setFeedback("");celebrate(m.characters[0] as CharName,"場景修復成功！",()=>addUnique("visual",day*10+3))}else setFeedback("這個工具不適合。請改選另一張工具圖卡，再按橙色按鈕試試看。")};
  const battlePick=(ok:boolean)=>{if(!ok){setFeedback("這個技能還不適合。看看中間的小麻煩需要什麼。");return}setMonsterPower(p=>p-1);setFeedback("");if(battleRound===0){celebrate(m.coopBattle.heroes[0] as CharName,"第一回合成功！");setBattleRound(1)}else celebrate(m.coopBattle.heroes[1] as CharName,"合作成功！",()=>addUnique("battle",day))};
  const playDialogue=(idx=dialogueIndex)=>{const line=m.dialogue[idx];voice.speak(line.text,line.speaker as CharName,()=>{if(autoRef.current&&idx<m.dialogue.length-1){setDialogueIndex(idx+1);playDialogue(idx+1)}})};
  const progress=Math.round(profile.main.length/14*100),enhancedDone=profile.visual.filter(v=>Math.floor(v/10)===day).length;
  const dayStars=Math.max(0,profile.stars-(profile.missionStartStars[day]??profile.stars));
  const nextDay=Math.min(profile.main.length+1,14);
  const completePhonics=useMemo(()=>profile.phonics.length,[profile.phonics]);
  if(!ready)return <main className="loading">正在開啟星光基地…</main>;

  return <main>
    <header className="topbar"><button className="brand" onClick={()=>setView("home")}><span>✦</span> 星光救援指揮中心 <b className="v2">2.1</b></button><nav><button onClick={()=>setView("characters")}>角色圖鑑</button><button onClick={()=>setView("map")}>任務地圖</button><button onClick={()=>setView("parent")}>家長專區</button></nav></header>
    {view==="home"&&<section className="home"><div className="hero"><div className="heroCopy"><p className="eyebrow">全新角色互動版</p><h1>星光亮起，<br/><em>救援隊集合！</em></h1><p>14 天生活力 × 數學 × 注音 × 合作任務</p><button className="primary" onClick={()=>setView("map")}>進入指揮中心 →</button></div><div className="heroStats"><b>{profile.stars}</b><span>任務星星</span><b>{progress}%</b><span>主線完成</span></div></div><div className="profilePanel"><div><p className="eyebrow">今天由誰出任務？</p><div className="profileTabs">{store.profiles.map((p,i)=><button key={i} className={i===store.active?"selected":""} onClick={()=>setStore(s=>({...s,active:i}))}><span>{p.avatar}</span><b>{p.name}</b><small>{p.age} 歲小隊長</small></button>)}</div></div><div className="todayCard"><span className="dayFlag">推薦任務 · 約 12–15 分鐘</span><Character name={(enhancedMissions[nextDay-1].characters[0]) as CharName} small/><div><small>第 {nextDay} 天</small><h2>{enhancedMissions[nextDay-1].title}</h2><p>{enhancedMissions[nextDay-1].goal}</p></div><button className="roundGo" onClick={()=>openMission(nextDay)}>→</button></div></div></section>}
    {view==="map"&&<section className="content roadPage"><div className="sectionHead"><div><p className="eyebrow">從救援基地一路前往星光總部</p><h1>{profile.avatar} {profile.name} 的救援道路</h1></div><div className="starPill">★ {profile.stars} 顆星</div></div><div className="mapLegend"><span>🏠 救援基地</span><span>🚧 沿著道路前進</span><span>🏰 星光總部</span></div><div className="roadMap"><div className="roadLine"/><div className="landmark base">🏠<b>救援基地</b></div>{enhancedMissions.map((x,i)=>{const current=x.day===nextDay,done=profile.main.includes(x.day),who=x.characters[0] as CharName;return <button key={x.day} className={`roadStop side${i%2} ${done?"done":""} ${current?"current":""}`} onClick={()=>openMission(x.day)}><span className="stopDay">{x.day}</span><i>{done?"★":<img src={`/characters/${characterFiles[who]}.webp`} alt={who}/>}</i><b>{x.title}</b>{current&&<small>從這裡繼續</small>}</button>})}<div className="landmark finish">🏰<b>星光總部</b></div><span className="scenery hill">⛰️</span><span className="scenery bridge">🌉</span><span className="scenery school">🏫</span><span className="scenery city">🏙️</span></div></section>}
    {view==="mission"&&<section className="missionView"><button className="back" onClick={()=>{voice.stop();setView("map")}}>← 返回任務地圖</button><div className="missionTitleV2"><Character name={m.characters[0] as CharName} state={voice.speaking?"talk":"idle"}/><div><p className="eyebrow">DAY {day} · {m.hero} 出動 · 已完成新增關卡 {enhancedDone}/3</p><h1>{m.title}</h1><p>{m.goal}</p></div></div><div className="stepper v2steps">{steps.map((s,i)=><button key={s} className={step===i?"active":step>i?"past":""} onClick={()=>setStep(i)}><i>{step>i?"✓":i+1}</i>{s}</button>)}</div><div className="stage visualStage">
      {step===0&&<Scene who="星隊長" title="星隊長的任務簡報"><h2>今晚要學會：{m.goal}</h2><p className="bigTip">「{m.tip}」</p><VoiceButton onClick={()=>voice.speak(`${m.title}。今晚要學會${m.goal}。${m.tip}`,"星隊長")} label="聽星隊長說"/><Next onClick={()=>setStep(1)} label="收到，開始任務"/></Scene>}
      {step===1&&<div className="dialogueStage"><div className="tonightCast"><p className="eyebrow">今晚登場角色</p><div>{m.characters.map((who:string)=><div key={who}><Character name={who as CharName} small/><p><b>{who}</b><span>{characterProfiles[who as CharName].role}</span><small>{characterProfiles[who as CharName].personality}</small></p></div>)}</div></div><div className="storyScene" aria-label={`第 ${dialogueIndex+1} 段情境圖`}><div className="sceneSky"><span>✦</span><span>☾</span></div><div className="sceneEmoji">{m.storyScenes[dialogueIndex]}</div><small>{dialogueIndex===0?"任務發生了":dialogueIndex===1?"隊員正在行動":"大家合作完成"}</small></div><div className="speakerPanel"><Character name={storyText.speaker as CharName} state={voice.speaking?"talk":"idle"}/><div className="speechBubble"><p className="eyebrow">有聲故事 · 第 {dialogueIndex+1}/{m.dialogue.length} 段</p><h2>{storyText.speaker}</h2><p>{storyText.text}</p></div></div><div className="audioConsole"><button disabled={dialogueIndex===0} onClick={()=>{setDialogueIndex(i=>i-1);voice.stop()}}>上一段</button><button className="play" onClick={()=>voice.speaking?(voice.paused?voice.resume():voice.pause()):playDialogue()}>{voice.speaking?(voice.paused?"▶ 繼續":"Ⅱ 暫停"):"▶ 播放"}</button><button disabled={dialogueIndex===m.dialogue.length-1} onClick={()=>{setDialogueIndex(i=>i+1);voice.stop()}}>下一段</button><button onClick={()=>playDialogue()}>↻ 重播</button><label><input type="checkbox" checked={autoRef.current} onChange={e=>{autoRef.current=e.target.checked}}/> 自動播放</label></div><Next onClick={()=>setStep(2)} label="故事聽完了"/></div>}
      {step===2&&<Scene who={m.characters[0] as CharName} title="生活判斷任務"><h2>哪一個做法最棒？</h2><ActionGuide items={["看兩張情境圖","選出好方法","獲得星星"]}/><div className="pictureChoices"><Picture day={day} ok label={m.correct} onClick={()=>celebrate(m.characters[0] as CharName,"答對了！",()=>addUnique("main",day))}/><Picture day={day} ok={false} label={m.wrong} onClick={()=>setFeedback("再想一想，看看角色需要的是安全、整潔還是尊重。")}/></div><Feedback text={feedback}/><Next onClick={()=>setStep(3)} label="前往看圖任務"/></Scene>}
      {step===3&&<ChallengeHead m={m} index={0}><div className="pictureChoices">{m.visualChallenges[0].options.map((o:any)=><Picture key={o.label} day={day} ok={o.ok} label={o.label} onClick={()=>visualAnswer(1,o.ok)}/>)}</div><Feedback text={feedback}/><Next onClick={()=>setStep(4)} label="前往步驟排序"/></ChallengeHead>}
      {step===4&&<ChallengeHead m={m} index={1}><TutorialButton onClick={()=>showTutorial("排序")}/><ActionGuide items={["選下面圖卡","放進發光空格","全部放滿再檢查"]}/><div className="orderSlots">{placed.map((x,i)=><button key={i} className={`${x?"filled":""} ${selectedCard&&!x?"ready":""}`} onClick={()=>x?removePlaced(i):placeCard(i)}><span>{i+1}</span>{x?<><strong className="stepPicture">{m.visualChallenges[1].icons[m.visualChallenges[1].steps.indexOf(x)]}</strong><b>{x}</b></>:<em>放第 {i+1} 步</em>}</button>)}</div><p className="trayLabel">👇 先選一張步驟圖卡</p><div className="cardTray">{pool.map((x:string)=><button key={x} className={selectedCard===x?"selected":""} onClick={()=>setSelectedCard(x)}><span>{m.visualChallenges[1].icons[m.visualChallenges[1].steps.indexOf(x)]}</span>{x}</button>)}</div>{placed.every(Boolean)&&<button className="checkBtn bigCheck" onClick={checkOrder}>✓ 全部放好了，檢查順序</button>}<Feedback text={feedback}/><Next onClick={()=>setStep(5)} label="前往情境操作"/></ChallengeHead>}
      {step===5&&<ChallengeHead m={m} index={2}><TutorialButton onClick={()=>showTutorial("情境")}/><ActionGuide items={["選一個工具","按橙色下一步","看看場景變化"]}/><div className="sceneGame"><div className="sceneProblem"><Character name={m.characters[0] as CharName} state={sceneSolved?"success":"think"} small/><b>{sceneSolved?"任務完成，場景恢復了！":`問題：${m.goal}`}</b><button className={`targetZone ${selectedTool?"ready":""} ${sceneSolved?"fixed":""}`} onClick={sceneTarget}>{sceneSolved?"✨ 完成":"↓ 把工具用在這裡"}</button></div><p className="trayLabel">工具盤：先選一個工具</p><div className="toolTray">{m.visualChallenges[2].options.map((o:any)=><button key={o.label} className={selectedTool?.icon===o.icon?"selected":""} onClick={()=>{setSelectedTool({icon:o.icon,label:o.label,ok:o.ok});setFeedback(`已選「${o.label}」。請按下面的橙色按鈕。`)}}><span>{o.icon}</span><b>{o.label}</b></button>)}</div>{selectedTool&&!sceneSolved&&<button className="sceneApplyButton" onClick={sceneTarget}><small>下一步</small>把「{selectedTool.label}」用到場景裡 →</button>}</div><Feedback text={feedback}/><Next onClick={()=>setStep(6)} label="前往合作任務"/></ChallengeHead>}
      {step===6&&<div className="battleStage"><p className="eyebrow">兩位角色接力 · 每人完成一個生活步驟</p><h2>選對兩個做法，讓「{m.coopBattle.monster}」變成星星！</h2><TutorialButton onClick={()=>showTutorial("合作")}/><ActionGuide items={["看輪到哪位角色","選出正確做法","交棒給下一位"]}/><div className="turnBanner">{store.profiles.length>1?`${store.profiles[battleRound]?.avatar||profile.avatar} ${store.profiles[battleRound]?.name||profile.name}`:`第 ${battleRound+1} 回合`}，請幫 {m.coopBattle.rounds[battleRound]?.speaker} 選方法！</div><div className="battleArena"><Character name={m.coopBattle.heroes[0] as CharName} state={battleRound===0?"talk":"success"}/><div className={`friendlyMonster fixedPower${monsterPower}`}><MonsterPicture name={m.coopBattle.monster} power={monsterPower}/><b>{monsterPower===0?"變成小星星！":m.coopBattle.monster}</b><div>{[0,1].map(i=><i key={i} className={i>=monsterPower?"off":""}/>)}</div></div><Character name={m.coopBattle.heroes[1] as CharName} state={battleRound===1?"talk":"idle"}/></div>{monsterPower>0?<><p className="turnCue">{m.coopBattle.rounds[battleRound].prompt}</p><VoiceButton onClick={()=>voice.speak(`${m.coopBattle.rounds[battleRound].prompt} 可以選 ${m.coopBattle.rounds[battleRound].correctLabel}，或是 ${m.coopBattle.rounds[battleRound].wrongLabel}。`,m.coopBattle.rounds[battleRound].speaker as CharName)} label="聽題目和兩個做法"/><div className="skillRow actionSkills"><button onClick={()=>battlePick(true)}><i>方法 A</i><b>{m.coopBattle.rounds[battleRound].correctLabel}</b><small>點一下選這個做法</small></button><button onClick={()=>battlePick(false)}><i>方法 B</i><b>{m.coopBattle.rounds[battleRound].wrongLabel}</b><small>點一下選這個做法</small></button></div></>:<div className="victory"><b>合作成功！</b><p>{m.coopBattle.thanks}</p></div>}<Feedback text={feedback}/><Next onClick={()=>setStep(7)} label="前往支援任務"/></div>}
      {step===7&&<div className="branchStage">{!branch?<><p className="eyebrow">自由選擇 · 另一關可隨時補玩</p><h2>要去哪一座支援站？</h2><div className="branchChoice"><button onClick={()=>setBranch("math")}><span>∑</span><b>數學補給站</b><small>數量、圖形、規律與空間</small></button><button onClick={()=>setBranch("phonics")}><span>ㄅ</span><b>注音通訊站</b><small>聽音、認形、找朋友</small></button></div></>:branch==="math"?<div className="quizCard"><button className="textBack" onClick={()=>setBranch(null)}>← 換一座支援站</button><h2>{m.math.prompt}</h2><div className="mathVisual">{m.math.visual}</div><div className="answerRow">{m.math.options.map((o:any)=><button key={o} onClick={()=>{setFeedback(o===m.math.answer?"任務成功，獲得數學星！":"再數一次看看。");if(o===m.math.answer)addUnique("math",day)}}>{o}</button>)}</div><Feedback text={feedback}/><Next onClick={()=>setStep(8)} label="完成，回基地"/></div>:<div className="quizCard"><button className="textBack" onClick={()=>setBranch(null)}>← 換一座支援站</button><h2>{day===14?"37 個注音總複習":`今天認識 ${m.phonics.join("、")}`}</h2><div className={`phonicsSet ${day===14?"all":""}`}>{m.phonics.map((p:string)=><button key={p} onClick={()=>voice.speak(p,"旋風")}>{p}<small>點我聽音</small></button>)}</div><button className="checkBtn" onClick={()=>{addUnique("phonics",day);setFeedback("注音通訊完成！")}}>完成今天的注音</button><Feedback text={feedback}/><Next onClick={()=>setStep(8)} label="完成，回基地"/></div>}</div>}
      {step===8&&<div className="goodnight"><Character name={m.characters[1] as CharName} state="success"/><p className="eyebrow">基地燈光已調暗</p><h2>晚安，{profile.name}</h2><p>今天完成了「{m.title}」。<br/>生活實作：{m.practice}</p><div className="dayReward"><b>今天獲得 {dayStars} 顆星</b><div className="starCollection">{dayStars>0?Array.from({length:dayStars},(_,i)=><span key={i} style={{animationDelay:`${i*.12}s`}}>★</span>):<em>☆ 完成一個未完成任務就能獲得星星</em>}</div><small>累積共 {profile.stars} 顆任務星</small></div><VoiceButton onClick={()=>voice.speak(`晚安，${profile.name}。今天獲得${dayStars}顆星，累積共有${profile.stars}顆。`,"星隊長")} label="聽晚安祝福"/><Next onClick={()=>setView("map")} label="收下星星，查看地圖"/></div>}
    </div></section>}
    {tutorial&&<Tutorial kind={tutorial} onClose={()=>setTutorial(null)}/>}
    {celebration&&<Celebration data={celebration} onClose={()=>setCelebration(null)}/>}
    {view==="characters"&&<section className="content characterDex"><div className="sectionHead"><div><p className="eyebrow">先認識夥伴，再開始故事</p><h1>星光救援隊角色圖鑑</h1><p>點擊「聽我介紹」就能聽角色自己說話。</p></div><button className="download" onClick={()=>setView("map")}>前往任務地圖 →</button></div><div className="dexGrid">{(Object.keys(characterProfiles) as CharName[]).map(name=><article key={name}><Character name={name}/><div><p className="eyebrow">{characterProfiles[name].role}</p><h2>{name}</h2><p>{characterProfiles[name].personality}</p><p className="skillTag">擅長：{characterProfiles[name].skill}</p><VoiceButton label="聽我介紹" onClick={()=>voice.speak(`你好，我是${name}，我是${characterProfiles[name].role}。${characterProfiles[name].personality}我最擅長${characterProfiles[name].skill}。`,name)}/></div></article>)}</div></section>}
    {view==="parent"&&<section className="content parent"><div className="sectionHead"><div><p className="eyebrow">家長專區 · 2.1</p><h1>陪伴成長，不比較快慢</h1></div><button className="download" onClick={()=>window.open("/parent-guide.pdf","_blank")}>↓ 下載新版 A4 手冊</button></div><div className="parentGrid"><div className="profileEditor"><h2>孩子檔案</h2><label>暱稱<input value={profile.name} maxLength={8} onChange={e=>update({name:e.target.value})}/></label><label>年齡<div className="ageBtns">{[3,5].map(a=><button key={a} className={profile.age===a?"active":""} onClick={()=>update({age:a as 3|5})}>{a} 歲</button>)}</div></label><label>選擇頭像</label><div className="avatarGrid">{avatars.map(a=><button key={a} className={profile.avatar===a?"active":""} onClick={()=>update({avatar:a})}>{a}</button>)}</div></div><div className="report"><h2>{profile.name} 的成長紀錄</h2><div className="reportRows"><div><span>生活主線</span><b>{profile.main.length}/14</b></div><div><span>新增闖關</span><b>{profile.visual.length}/42</b></div><div><span>合作任務</span><b>{profile.battle.length}/14</b></div><div><span>數學補給</span><b>{profile.math.length}/14</b></div><div><span>注音通訊</span><b>{completePhonics}/14</b></div></div><label>角色語速 <b>{store.rate.toFixed(2)}×</b><input type="range" min=".65" max="1.05" step=".05" value={store.rate} onChange={e=>setStore(s=>({...s,rate:Number(e.target.value)}))}/></label><label>語音音量 <b>{Math.round(store.volume*100)}%</b><input type="range" min="0" max="1" step=".1" value={store.volume} onChange={e=>setStore(s=>({...s,volume:Number(e.target.value)}))}/></label></div></div><div className="guidance"><h2>2.1 陪玩提示</h2><div><p><b>3 歲</b><br/>看大圖、聽角色說話、完成三步驟即可；排序時由家長讀出卡片。</p><p><b>5 歲</b><br/>鼓勵孩子說明選擇原因，並獨立完成四步驟排序。</p><p><b>雙人合作</b><br/>合作任務會提示兩位孩子輪流操作；只有一位孩子也能完成兩回合。</p></div></div></section>}
    <footer><span>✦ 星光救援指揮中心 2.1</span><p>所有進度只保存在這台裝置</p></footer>
  </main>;
}

function Scene({who,title,children}:{who:CharName;title:string;children:React.ReactNode}){return <div className="sceneLayout"><Character name={who}/><div className="sceneContent"><p className="eyebrow">{title}</p>{children}</div></div>}
function ChallengeHead({m,index,children}:any){const c=m.visualChallenges[index];return <div className="challengeWrap"><div className="challengeIntro"><Character name={m.characters[index%2] as CharName} state="think" small/><div><p className="eyebrow">新增闖關 {index+1}/3</p><h2>{c.title}</h2><p>{c.prompt}</p></div></div>{children}</div>}
function Picture({day,ok,label,onClick}:{day:number;ok:boolean;label:string;onClick:()=>void}){return <button className="pictureCard behaviorCard" onClick={onClick}><BehaviorPicture day={day} ok={ok}/><b>{label}</b><small>點一下選擇</small></button>}
function BehaviorPicture({day,ok}:{day:number;ok:boolean}){
  const art=behaviorArt[day-1],cues=ok?art.good:art.bad;
  if(day===2)return <svg className="behaviorPicture" viewBox="0 0 320 170" role="img" aria-label={ok?"牙刷清潔外側、內側與咬合面":"牙刷只清潔前排門牙"}>
    <rect width="320" height="170" rx="22" fill={ok?"#e5f5f1":"#fff0df"}/>
    {[55,125,195].map((x,i)=><path key={x} d={`M${x} 45 C${x-18} 45 ${x-20} 68 ${x-12} 88 L${x-5} 116 C${x} 132 ${x+9} 132 ${x+14} 116 L${x+25} 88 C${x+33} 65 ${x+18} 45 ${x} 45Z`} fill="#fff" stroke="#173b54" strokeWidth="5"/>)}
    <g transform={ok?"translate(38 70) rotate(-13)":"translate(38 70) rotate(-13)"}><rect width={ok?"230":"78"} height="16" rx="8" fill="#2b718b"/><rect x={ok?"205":"53"} y="-8" width="35" height="32" rx="7" fill="#f6a623"/><path d={ok?"M208 -4v25M219 -4v25M230 -4v25":"M56 -4v25M67 -4v25M78 -4v25"} stroke="#fff" strokeWidth="3"/></g>
    <circle cx="285" cy="30" r="21" fill={ok?"#68a84f":"#df8b35"}/><path d={ok?"M275 30l7 7 13-16":"M276 21l18 18M294 21l-18 18"} fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
  </svg>;
  return <svg className="behaviorPicture" viewBox="0 0 320 170" role="img" aria-label={`${art.theme}：${cues.join("、")}`}>
    <rect width="320" height="170" rx="22" fill={ok?"#e5f5f1":"#fff0df"}/>
    <circle cx="72" cy="82" r="48" fill={ok?"#2b718b":"#c96b43"}/><text x="72" y="99" textAnchor="middle" fontSize="48" fontWeight="900" fill="#fff">{art.theme}</text>
    {cues.map((cue,i)=><g key={cue} transform={`translate(135 ${35+i*58})`}><rect width="150" height="44" rx="14" fill="#fff" stroke={ok?"#79aa9c":"#dea17e"} strokeWidth="3"/><text x="75" y="29" textAnchor="middle" fontSize="19" fontWeight="800" fill="#173b54">{cue}</text></g>)}
    <circle cx="294" cy="24" r="18" fill={ok?"#68a84f":"#df8b35"}/><path d={ok?"M286 24l6 6 10-14":"M287 17l14 14M301 17l-14 14"} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
  </svg>
}
function MonsterPicture({name,power}:{name:string;power:number}){
  const mark:Record<string,string>={"搶話泡泡":"話","牙菌小怪":"菌","灰塵雲":"塵","混亂團":"亂","時間迷霧":"時","拖延雲":"拖","皺衣球":"衣","髒污泡泡":"髒","偏食雲":"食","冒失球":"衝","急躁螺絲":"急","生氣火球":"氣","家事亂流":"家","忘記怪":"忘"};
  if(power===0)return <svg className="monsterPicture" viewBox="0 0 150 120" role="img" aria-label="合作星星"><path d="M75 10l16 34 38 5-28 26 8 37-34-19-34 19 8-37-28-26 38-5z" fill="#ffd15c" stroke="#9f6710" strokeWidth="6"/><circle cx="62" cy="64" r="4" fill="#173b54"/><circle cx="88" cy="64" r="4" fill="#173b54"/><path d="M62 76q13 12 26 0" fill="none" stroke="#173b54" strokeWidth="4" strokeLinecap="round"/></svg>;
  return <svg className="monsterPicture" viewBox="0 0 150 120" role="img" aria-label={`${name}圖案`}><path d="M38 92C12 86 15 56 35 51C27 24 58 10 76 29C96 8 126 26 119 52C143 61 135 94 111 94Z" fill={power===2?"#d7e8ed":"#edf3dd"} stroke="#2b718b" strokeWidth="6"/><path d="M31 43h43l12 12-12 12H31c-12 0-12-24 0-24Z" fill="#fff" stroke="#f0a52f" strokeWidth="4"/><path d="M76 24h39c12 0 12 24 0 24H88L76 58Z" fill="#fff" stroke="#f0a52f" strokeWidth="4"/><text x="76" y="91" textAnchor="middle" fontSize="31" fontWeight="900" fill="#173b54">{mark[name]||"困"}</text></svg>
}
function Feedback({text}:{text:string}){return text?<p className="feedback">{text}</p>:null}
function Next({onClick,label}:{onClick:()=>void;label:string}){return <button className="primary nextBtn" onClick={onClick}>{label} →</button>}
function VoiceButton({onClick,label}:{onClick:()=>void;label:string}){return <button className="listen" onClick={onClick}>🔊 {label}</button>}
function TutorialButton({onClick}:{onClick:()=>void}){return <button className="tutorialBtn" onClick={onClick}>👆 再看一次玩法示範</button>}
function ActionGuide({items}:{items:string[]}){return <div className="actionGuide">{items.map((x,i)=><span key={x}><i>{i+1}</i>{x}{i<items.length-1&&<b>→</b>}</span>)}</div>}
function Tutorial({kind,onClose}:{kind:string;onClose:()=>void}){
  const info:Record<string,{title:string;steps:string[];demo:string}>={
    排序:{title:"步驟排序這樣玩",steps:["點下面一張卡片","點上面發光空格","放滿後按檢查"],demo:"🧩　☝️　➡️　1️⃣"},
    情境:{title:"情境操作這樣玩",steps:["先從工具盤選工具","再點場景發光處","看問題被修好"],demo:"🧰　☝️　➡️　✨"},
    合作:{title:"合作任務這樣玩",steps:["看現在輪到誰","選一個合作技能","兩回合都完成"],demo:"🚒　🤝　🚁"}
  };const d=info[kind];
  return <div className="tutorialOverlay"><div className="tutorialCard"><p className="eyebrow">角色示範</p><h2>{d.title}</h2><div className="handDemo"><span>{d.demo}</span><i>👆</i></div><ol>{d.steps.map(x=><li key={x}>{x}</li>)}</ol><button className="primary" onClick={onClose}>我會了，換我玩！</button></div></div>
}
function Celebration({data,onClose}:{data:{who:CharName;title:string};onClose:()=>void}){
  return <div className="celebrationOverlay" role="dialog" aria-live="assertive"><div className="celebrationBurst">{Array.from({length:9},(_,i)=><i key={i}>★</i>)}</div><div className="celebrationCard"><Character name={data.who} state="success"/><h1>{data.title}</h1><p>太棒了！你得到一顆任務星</p><div className="flyingStar">★</div><button className="primary celebrationContinue" autoFocus onClick={onClose}>繼續闖關 →</button></div></div>
}
