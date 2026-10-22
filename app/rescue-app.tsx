"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { avatars, characters, enhancedMissions, lifeChapters } from "./course-data";
import {
  literacyLessons,
  mathActivities,
  mathDomains,
  recommendedMath,
  type MathDomainId,
  type MathActivity,
} from "./learning-data";
import {
  abilityLabels,
  growthStages,
  stageIndex,
  upgradeTrials,
  type AbilityKey,
  type GrowthStageId,
} from "./growth-data";
import {
  growthMissions,
  growthWorlds,
  type GrowthMission,
} from "./growth-curriculum";
import ArtCenter from "./art-center";
import MusicCenter from "./music-center";

type CharName = keyof typeof characters;
type BranchResume = {
  kind?: "math" | "phonics";
  literacyStage?: number;
  bookPage?: number;
  mathActivity?: string;
  mathRound?: number;
};
type AbilityProfile = Record<AbilityKey, 1 | 2 | 3>;
type TrialResult = {
  score: number;
  total: number;
  passed: boolean;
  completedAt: string;
};
type Profile = {
  name: string;
  age: 3 | 5;
  avatar: string;
  themeColor: string;
  main: number[];
  math: number[];
  phonics: number[];
  visual: number[];
  battle: number[];
  literacyCompleted: number[];
  mathChallengeCompleted: number[];
  mathConceptProgress: string[];
  branchResumeState: Record<string, BranchResume>;
  stars: number;
  lastSteps: Record<string, number>;
  seenTutorials: string[];
  missionStartStars: Record<string, number>;
  orderState: Record<string, (string | null)[]>;
  birthDate: string;
  growthStage: GrowthStageId;
  difficultyMode: "auto" | "gentle" | "challenge";
  stageLocked: boolean;
  abilities: AbilityProfile;
  trialHistory: Partial<Record<GrowthStageId, TrialResult>>;
  growthCompleted: string[];
  growthStars: number;
  artCompleted: string[];
  artBadges: string[];
  artLastTask: string;
  musicCompleted: string[];
  musicBadges: string[];
  musicLastTask: string;
  musicSongProgress: Record<string, number>;
  musicInstrumentHistory: string[];
  musicResumeState: Record<string, unknown>;
};
type Store = {
  version: 13;
  profiles: Profile[];
  active: number;
  rate: number;
  volume: number;
};
const profileColors = [
  { name: "星光橙", value: "#f5a623" },
  { name: "天空藍", value: "#2d83c5" },
  { name: "森林綠", value: "#3a9b72" },
  { name: "精靈紫", value: "#8a63c7" },
  { name: "莓果紅", value: "#d85f79" },
  { name: "海洋青", value: "#238f9f" },
];
const baseProfile = (
  name: string,
  age: 3 | 5,
  avatar: string,
  themeColor = "#f5a623",
): Profile => ({
  name,
  age,
  avatar,
  themeColor,
  main: [],
  math: [],
  phonics: [],
  visual: [],
  battle: [],
  literacyCompleted: [],
  mathChallengeCompleted: [],
  mathConceptProgress: [],
  branchResumeState: {},
  stars: 0,
  lastSteps: {},
  seenTutorials: [],
  missionStartStars: {},
  orderState: {},
  birthDate: "",
  growthStage: age === 5 ? "prep" : "life",
  difficultyMode: "auto",
  stageLocked: false,
  abilities: { reading: 1, literacy: 1, math: 1, life: 1 },
  trialHistory: {},
  growthCompleted: [],
  growthStars: 0,
  artCompleted: [],
  artBadges: [],
  artLastTask: "",
  musicCompleted: [],
  musicBadges: [],
  musicLastTask: "",
  musicSongProgress: {},
  musicInstrumentHistory: [],
  musicResumeState: {},
});
const initial: Store = {
  version: 13,
  profiles: [
    baseProfile("小隊長 A", 3, avatars[4], "#f5a623"),
    baseProfile("小隊長 B", 5, avatars[7], "#2d83c5"),
  ],
  active: 0,
  rate: 0.85,
  volume: 0.9,
};
const steps = [
  "接收任務",
  "有聲故事",
  "生活判斷",
  "步驟排序",
  "基地晚安",
];
const characterProfiles: Record<
  CharName,
  { role: string; personality: string; skill: string }
> = {
  星隊長: {
    role: "救援隊總指揮",
    personality: "冷靜、溫暖，會先聽大家說完。",
    skill: "安排任務、鼓勵合作",
  },
  大力: {
    role: "黃色工程車",
    personality: "可靠又有耐心，喜歡把東西整理好。",
    skill: "建造、分類、收納",
  },
  挖挖: {
    role: "橘色怪手",
    personality: "好奇又細心，會一步一步找線索。",
    skill: "清潔、挖掘、步驟排序",
  },
  高高: {
    role: "紅色雲梯車",
    personality: "勇敢但不冒失，遇到困難懂得求助。",
    skill: "安全觀念、登高救援",
  },
  小焰: {
    role: "紅色消防車",
    personality: "活潑又貼心，最會照顧大家的身體。",
    skill: "刷牙、洗手、情緒冷靜",
  },
  旋風: {
    role: "藍白直升機",
    personality: "觀察力很好，會從空中看清楚全局。",
    skill: "時間、方向、注音偵察",
  },
};
const characterFiles: Record<CharName, string> = {
  星隊長: "commander",
  大力: "dali",
  挖挖: "wawa",
  高高: "gaogao",
  小焰: "xiaoyan",
  旋風: "xuanfeng",
};
const publicAsset = (path: string) =>
  `${(import.meta as any).env?.BASE_URL || "/"}${path.replace(/^\/+/, "")}`;

const avatarAssets: Record<string, string> = {
  "🧑‍🚀": "avatars/astronaut.png",
  "🧑‍🔧": "avatars/engineer.png",
};

function AvatarMark({ avatar, label }: { avatar: string; label?: string }) {
  const src = avatarAssets[avatar];
  return src ? (
    <img className="avatarAsset" src={publicAsset(src)} alt={label || "小隊長頭像"} />
  ) : (
    <span className="avatarEmoji" aria-hidden="true">{avatar}</span>
  );
}

function ProfileColorPicker({
  profile,
  onUpdate,
}: {
  profile: Profile;
  onUpdate: (patch: Partial<Profile>) => void;
}) {
  return (
    <div className="inlineColorSetup">
      <div>
        <p className="eyebrow">小隊長識別色</p>
        <h3>選擇 {profile.name} 的專屬顏色</h3>
        <p>切換小隊長後，標題、按鈕與選取外框會使用這個顏色。</p>
      </div>
      <div className="colorChoices">
        {profileColors.map((color) => (
          <button
            key={color.value}
            className={profile.themeColor === color.value ? "selected" : ""}
            style={{ "--swatch": color.value } as any}
            onClick={() => onUpdate({ themeColor: color.value })}
            aria-label={`選擇${color.name}`}
          >
            <i />
            <span>{color.name}</span>
            {profile.themeColor === color.value && <b>✓</b>}
          </button>
        ))}
      </div>
    </div>
  );
}
const behaviorAlt = [
  ["先問好並等老師說完", "打斷老師並伸手搶工具"],
  ["把牙齒每一面刷乾淨", "只刷前面的牙齒"],
  ["試水溫並站在防滑墊上", "在濕滑浴室裡奔跑"],
  ["把玩具分類收進盒子", "讓玩具散落在走道"],
  ["照著早晚作息準備睡覺", "到了深夜還在玩遊戲"],
  ["提早把背包和鞋子準備好", "出門時間到了還在睡覺"],
  ["看清衣服前後再慢慢穿", "沒有看前後就把衣服穿反"],
  ["回家後先用肥皂洗手", "沒洗手就直接拿食物"],
  ["吃均衡餐點並喝白開水", "只挑甜食、不吃蔬菜"],
  ["牽著大人停看聽再過馬路", "沒有觀察就跑進馬路"],
  ["聽完老師示範再使用工具", "沒聽說明就搶著敲工具"],
  ["說出感受並慢慢深呼吸", "生氣時把玩具丟向別人"],
  ["主動幫家人整理衣物", "躺著不幫忙、物品散滿地"],
  ["回想學過的方法再行動", "忽略提醒並把用品丟得到處都是"],
];

function ageLabel(date: string, fallback: number) {
  if (!date) return `${fallback} 歲模式`;
  const born = new Date(`${date}T00:00:00`),
    now = new Date();
  let years = now.getFullYear() - born.getFullYear(),
    months = now.getMonth() - born.getMonth();
  if (now.getDate() < born.getDate()) months--;
  if (months < 0) {
    years--;
    months += 12;
  }
  return `${Math.max(0, years)} 歲 ${Math.max(0, months)} 個月`;
}
function ageModeFromBirthDate(date: string, current: 3 | 5): 3 | 5 {
  if (!date) return current;
  const born = new Date(`${date}T00:00:00`),
    now = new Date();
  let years = now.getFullYear() - born.getFullYear();
  if (
    now.getMonth() < born.getMonth() ||
    (now.getMonth() === born.getMonth() && now.getDate() < born.getDate())
  )
    years--;
  return years < 5 ? 3 : 5;
}

function migrate(raw: any): Store {
  const src = raw || initial;
  const remapSteps = (last: Record<string, number> = {}) =>
    Object.fromEntries(
      Object.entries(last).map(([d, value]) => {
        let n = Number(value) || 0;
        if (src.version < 4 && n >= 4) n = Math.max(3, n - 1);
        if (src.version < 6) n = n >= 6 ? n - 2 : n >= 4 ? 4 : n;
        return [d, n];
      }),
    );
  return {
    version: 13,
    active: src.active ?? 0,
    rate: src.rate ?? 0.85,
    volume: src.volume ?? 0.9,
    profiles: (src.profiles || initial.profiles).map((p: any, i: number) => ({
      ...baseProfile(
        p.name || `小隊長 ${i ? "B" : "A"}`,
        p.age === 5 ? 5 : 3,
        p.avatar || avatars[i ? 7 : 4],
      ),
      ...p,
      visual: Array.isArray(p.visual) ? p.visual : [],
      battle: Array.isArray(p.battle) ? p.battle : [],
      lastSteps: remapSteps(p.lastSteps),
      literacyCompleted: Array.isArray(p.literacyCompleted)
        ? p.literacyCompleted
        : [],
      mathChallengeCompleted: Array.isArray(p.mathChallengeCompleted)
        ? p.mathChallengeCompleted
        : [],
      mathConceptProgress: Array.isArray(p.mathConceptProgress)
        ? p.mathConceptProgress
        : [],
      branchResumeState: p.branchResumeState || {},
      seenTutorials: Array.isArray(p.seenTutorials) ? p.seenTutorials : [],
      missionStartStars: p.missionStartStars || {},
      orderState: p.orderState || {},
      themeColor: profileColors.some((c) => c.value === p.themeColor)
        ? p.themeColor
        : i
          ? "#2d83c5"
          : "#f5a623",
      birthDate:
        typeof p.birthDate === "string"
          ? p.birthDate
          : typeof p.birthMonth === "string" && p.birthMonth
            ? `${p.birthMonth}-01`
            : "",
      growthStage: growthStages.some((x) => x[0] === p.growthStage)
        ? p.growthStage
        : p.age === 5
          ? "prep"
          : "life",
      artCompleted: Array.isArray(p.artCompleted) ? p.artCompleted : [],
      artBadges: Array.isArray(p.artBadges) ? p.artBadges : [],
      artLastTask: typeof p.artLastTask === "string" ? p.artLastTask : "",
      musicCompleted: Array.isArray(p.musicCompleted) ? p.musicCompleted : [],
      musicBadges: Array.isArray(p.musicBadges) ? p.musicBadges : [],
      musicLastTask: typeof p.musicLastTask === "string" ? p.musicLastTask : "",
      musicSongProgress: p.musicSongProgress || {},
      musicInstrumentHistory: Array.isArray(p.musicInstrumentHistory) ? p.musicInstrumentHistory : [],
      musicResumeState: p.musicResumeState || {},
      difficultyMode: ["auto", "gentle", "challenge"].includes(p.difficultyMode)
        ? p.difficultyMode
        : "auto",
      stageLocked: Boolean(p.stageLocked),
      abilities: {
        reading: p.abilities?.reading || 1,
        literacy: p.abilities?.literacy || 1,
        math: p.abilities?.math || 1,
        life: p.abilities?.life || 1,
      },
      trialHistory: p.trialHistory || {},
      growthCompleted: Array.isArray(p.growthCompleted)
        ? p.growthCompleted
        : [],
      growthStars: Number(p.growthStars) || 0,
    })),
  };
}

function Character({
  name,
  state = "idle",
  small = false,
}: {
  name: CharName;
  state?: "idle" | "talk" | "think" | "success";
  small?: boolean;
}) {
  return (
    <div
      className={`character ${state} ${small ? "small" : ""}`}
      aria-label={name}
    >
      <div className="characterFrame">
        <img
          src={publicAsset(`characters/${characterFiles[name]}.webp`)}
          alt={name}
        />
        <span className="imageFallback">{characters[name].icon}</span>
      </div>
      <span>{name}</span>
    </div>
  );
}

function StepCardVisual({
  day,
  index,
}: {
  day: number;
  index: number;
  icon: string;
}) {
  return <span className="illustratedStepCard">
    <img src={publicAsset(`steps/day-${String(day).padStart(2, "0")}-step-${index + 1}.webp`)} alt={`第${day}天第${index + 1}個生活步驟`} />
  </span>;
}

function useVoice(rate: number, volume: number) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState<SpeechSynthesisVoice[]>([]);
  const [recorded, setRecorded] = useState<Record<string, string>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const doneRef = useRef<(() => void) | undefined>(undefined);
  const voiceKey = (text: string, who: CharName) =>
    `${who}::${text.trim().replace(/\s+/g, " ")}`;
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => setAvailable(speechSynthesis.getVoices());
    load();
    speechSynthesis.addEventListener("voiceschanged", load);
    return () => speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);
  useEffect(() => {
    let active = true;
    fetch(publicAsset("audio/voice/manifest.json"), { cache: "no-cache" })
      .then((response) => response.ok ? response.json() : {})
      .then((data) => { if (active) setRecorded(data); })
      .catch(() => {});
    return () => {
      active = false;
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);
  const speak = (text: string, who: CharName = "星隊長", done?: () => void) => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const recordedFile = recorded[voiceKey(text, who)];
    if (recordedFile) {
      const audio = new Audio(publicAsset(recordedFile));
      audioRef.current = audio;
      doneRef.current = done;
      audio.volume = volume;
      audio.playbackRate = Math.max(0.8, Math.min(1.2, rate / 0.85));
      audio.onplay = () => {
        setSpeaking(true);
        setPaused(false);
      };
      audio.onended = () => {
        setSpeaking(false);
        setPaused(false);
        audioRef.current = null;
        doneRef.current?.();
        doneRef.current = undefined;
      };
      audio.onerror = () => {
        audioRef.current = null;
        setSpeaking(false);
        speakWithBrowser();
      };
      void audio.play().catch(() => speakWithBrowser());
      return;
    }
    speakWithBrowser();

    function speakWithBrowser() {
      if (!("speechSynthesis" in window)) return;
    const cfg = characters[who],
      u = new SpeechSynthesisUtterance(text);
    const all = available.length ? available : speechSynthesis.getVoices();
    const isEnglish = /^[A-Za-z\s!,.?'-]+$/.test(text.trim());
    const tw = all.filter((v) => /^zh[-_]tw$/i.test(v.lang));
    const zh = all.filter((v) => v.lang.toLowerCase().startsWith("zh"));
    const en = all.filter((v) => /^en[-_]/i.test(v.lang));
    const preferred = (isEnglish
      ? en
      : [...tw, ...zh.filter((v) => !tw.includes(v))]
    ).sort(
      (a, b) => {
        const score = (v: SpeechSynthesisVoice) =>
          (/natural|online|hsiao|yating|hanhan|meijia|國語/i.test(v.name)
            ? 2
            : 0) + (v.localService ? 1 : 0);
        return score(b) - score(a);
      },
    );
    u.text = text
      .replace(/。/g, "。 ")
      .replace(/，/g, "， ")
      .replace(/：/g, "： ");
    u.lang = isEnglish ? "en-US" : "zh-TW";
    u.rate = Math.max(0.72, Math.min(1, rate * (cfg.rate / 0.82)));
    u.pitch = Math.max(0.92, Math.min(1.06, cfg.pitch));
    u.volume = volume;
    u.voice =
      preferred[cfg.slot % Math.max(preferred.length, 1)] ||
      preferred[0] ||
      null;
    u.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };
    u.onend = () => {
      setSpeaking(false);
      setPaused(false);
      done?.();
    };
    u.onerror = () => setSpeaking(false);
    speechSynthesis.speak(u);
    }
  };
  return {
    speak,
    speaking,
    paused,
    pause: () => {
      if (audioRef.current) audioRef.current.pause();
      else speechSynthesis.pause();
      setPaused(true);
    },
    resume: () => {
      if (audioRef.current) void audioRef.current.play();
      else speechSynthesis.resume();
      setPaused(false);
    },
    stop: () => {
      audioRef.current?.pause();
      audioRef.current = null;
      doneRef.current = undefined;
      speechSynthesis.cancel();
      setSpeaking(false);
    },
  };
}

export default function RescueApp() {
  const [store, setStore] = useState<Store>(initial),
    [ready, setReady] = useState(false);
  const [view, setView] = useState<
      "home" | "map" | "mission" | "parent" | "characters" | "growth"
    >("home"),
    [day, setDay] = useState(1),
    [step, setStepState] = useState(0);
  const [selectedMapDay, setSelectedMapDay] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState("chapter-1");
  const [branch, setBranch] = useState<"math" | "phonics" | null>(null),
    [feedback, setFeedback] = useState("");
  const [dialogueIndex, setDialogueIndex] = useState(0),
    [selectedCard, setSelectedCard] = useState<string | null>(null),
    [placed, setPlaced] = useState<(string | null)[]>([]);
  const [tutorial, setTutorial] = useState<string | null>(null);
  const [celebration, setCelebration] = useState<{
    who: CharName;
    title: string;
    nextStep?: number;
  } | null>(null);
  const [literacyStage, setLiteracyStage] = useState(0),
    [bookPage, setBookPage] = useState(0);
  const [mathDomain, setMathDomain] = useState<MathDomainId | null>(null),
    [mathActivity, setMathActivity] = useState<MathActivity | null>(null),
    [mathRound, setMathRound] = useState(0),
    [mathAnswered, setMathAnswered] = useState(false);
  const profile = store.profiles[store.active],
    m = enhancedMissions[day - 1],
    voice = useVoice(store.rate, store.volume),
    storyText = m.dialogue[dialogueIndex];
  const autoRef = useRef(false);
  useEffect(() => {
    try {
      const old =
        localStorage.getItem("starlight-rescue-v2") ||
        localStorage.getItem("starlight-rescue-v1");
      if (old) setStore(migrate(JSON.parse(old)));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      localStorage.setItem("starlight-rescue-v2", JSON.stringify(store));
  }, [store, ready]);
  useEffect(() => () => voice.stop(), []);
  const update = (patch: Partial<Profile>) =>
    setStore((s) => ({
      ...s,
      profiles: s.profiles.map((p, i) =>
        i === s.active ? { ...p, ...patch } : p,
      ),
    }));
  const clearCurrentProgress = () => {
    const confirmed = window.confirm(
      `確定要清除 ${profile.name} 的所有星星與任務紀錄嗎？\n\n姓名、出生日期、頭像、識別色與家長設定會保留。這個動作無法復原。`,
    );
    if (!confirmed) return;
    const cleared = baseProfile(
      profile.name,
      profile.age,
      profile.avatar,
      profile.themeColor,
    );
    update({
      ...cleared,
      birthDate: profile.birthDate,
      growthStage: profile.growthStage,
      difficultyMode: profile.difficultyMode,
      stageLocked: profile.stageLocked,
    });
  };
  const addUnique = (
    field:
      | "main"
      | "math"
      | "phonics"
      | "visual"
      | "battle"
      | "literacyCompleted"
      | "mathChallengeCompleted",
    value: number,
    star = true,
  ) => {
    const list = profile[field];
    if (list.includes(value)) return;
    update({
      [field]: [...list, value],
      stars: profile.stars + (star ? 1 : 0),
    } as Partial<Profile>);
  };
  const chime = () => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext,
        ctx = new AC();
      [523, 659, 784].forEach((f, i) => {
        const o = ctx.createOscillator(),
          g = ctx.createGain();
        o.frequency.value = f;
        g.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.12);
        g.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + i * 0.12 + 0.32,
        );
        o.connect(g);
        g.connect(ctx.destination);
        o.start(ctx.currentTime + i * 0.12);
        o.stop(ctx.currentTime + i * 0.12 + 0.34);
      });
    } catch {}
  };
  const celebrate = (who: CharName, title: string, done?: () => void) => {
    chime();
    const nextStep = step === 2 ? 3 : step === 3 ? 4 : step === 4 ? 5 : undefined;
    setCelebration({ who, title, nextStep });
    done?.();
  };
  const showTutorial = (kind: string) => {
    setTutorial(kind);
    if (!profile.seenTutorials.includes(kind))
      update({ seenTutorials: [...profile.seenTutorials, kind] });
  };
  const setStep = (n: number) => {
    voice.stop();
    setFeedback("");
    setStepState(n);
    update({ lastSteps: { ...profile.lastSteps, [day]: n } });
  };
  const saveBranchResume = (patch: BranchResume) =>
    update({
      branchResumeState: {
        ...profile.branchResumeState,
        [day]: { ...(profile.branchResumeState[day] || {}), ...patch },
      },
    });
  const openMission = (d: number) => {
    const dm = enhancedMissions[d - 1],
      saved = profile.orderState[d];
    setDay(d);
    setSelectedMapDay(null);
    setBranch(null);
    setLiteracyStage(profile.branchResumeState[d]?.literacyStage || 0);
    setBookPage(profile.branchResumeState[d]?.bookPage || 0);
    setMathDomain(null);
    setMathActivity(null);
    setMathRound(0);
    setMathAnswered(false);
    setFeedback("");
    setDialogueIndex(0);
    setSelectedCard(null);
    setPlaced(
      saved?.length
        ? saved
        : Array(dm.visualChallenges[0].steps.length).fill(null),
    );
    setView("mission");
    setStepState(profile.lastSteps[d] || 0);
    if (profile.missionStartStars[d] === undefined)
      update({
        missionStartStars: { ...profile.missionStartStars, [d]: profile.stars },
      });
  };
  const replayMission = () => {
    voice.stop();
    setBranch(null);
    setFeedback("");
    setDialogueIndex(0);
    setSelectedCard(null);
    setPlaced(Array(m.visualChallenges[0].steps.length).fill(null));
    setLiteracyStage(0);
    setBookPage(0);
    setMathDomain(null);
    setMathActivity(null);
    setMathRound(0);
    setMathAnswered(false);
    setStepState(0);
    update({
      lastSteps: { ...profile.lastSteps, [day]: 0 },
      orderState: {
        ...profile.orderState,
        [day]: Array(m.visualChallenges[0].steps.length).fill(null),
      },
      branchResumeState: { ...profile.branchResumeState, [day]: {} },
      missionStartStars: { ...profile.missionStartStars, [day]: profile.stars },
    });
  };
  const pool = m.visualChallenges[0].steps.filter(
    (x: string) => !placed.includes(x),
  );
  const placeCard = (slot: number) => {
    if (!selectedCard) return;
    const next = [...placed];
    next[slot] = selectedCard;
    setPlaced(next);
    setSelectedCard(null);
    voice.speak(selectedCard, m.characters[0] as CharName);
    update({ orderState: { ...profile.orderState, [day]: next } });
  };
  const removePlaced = (slot: number) => {
    const next = [...placed];
    next[slot] = null;
    setPlaced(next);
    update({ orderState: { ...profile.orderState, [day]: next } });
  };
  const checkOrder = () => {
    const ok = placed.every((x, i) => x === m.visualChallenges[0].steps[i]);
    if (ok) {
      setFeedback("");
      celebrate(m.characters[1] as CharName, "順序完全正確！", () =>
        addUnique("visual", day * 10 + 2),
      );
    } else setFeedback("第一步還不太對。想想哪件事一定要最先做。");
  };
  const playDialogue = (idx = dialogueIndex) => {
    const line = m.dialogue[idx];
    voice.speak(line.text, line.speaker as CharName, () => {
      if (autoRef.current && idx < m.dialogue.length - 1) {
        setDialogueIndex(idx + 1);
        playDialogue(idx + 1);
      }
    });
  };
  const validVisual = profile.visual.filter((v) => v % 10 === 2);
  const completedLifeDays = profile.main.filter((value) => value >= 1 && value <= enhancedMissions.length);
  const nextMission = enhancedMissions.find((mission) => !completedLifeDays.includes(mission.day));
  const progress = Math.round((completedLifeDays.length / enhancedMissions.length) * 100),
    enhancedDone = validVisual.filter((v) => Math.floor(v / 10) === day).length;
  const dayStars = Math.max(
    0,
    profile.stars - (profile.missionStartStars[day] ?? profile.stars),
  );
  const nextDay = nextMission?.day ?? enhancedMissions.length;
  const currentChapter = lifeChapters.find((chapter) => chapter.id === selectedChapter) ?? lifeChapters[0];
  const chapterMissions = enhancedMissions.filter((mission) => mission.day >= currentChapter.days[0] && mission.day <= currentChapter.days[1]);
  useEffect(() => {
    if (view !== "map") return;
    const chapter = lifeChapters.find((item) => nextDay >= item.days[0] && nextDay <= item.days[1]);
    if (chapter) setSelectedChapter(chapter.id);
  }, [view, nextDay]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({ type: "PRELOAD_LIFE_CHAPTER", chapterId: selectedChapter });
    }).catch(() => undefined);
  }, [selectedChapter]);
  const completePhonics = useMemo(
    () => profile.phonics.length,
    [profile.phonics],
  );
  const currentGrowth = growthStages.find((s) => s[0] === profile.growthStage)!,
    childAge = ageLabel(profile.birthDate, profile.age);
  if (!ready) return <main className="loading">正在開啟星光基地…</main>;

  return (
    <main style={{ "--child-accent": profile.themeColor } as any}>
      <header className="topbar">
        <button className="brand" onClick={() => setView("home")}>
          <span>✦</span> 星光救援指揮中心 <b className="v2">3.1</b>
        </button>
        <nav>
          <button onClick={() => setView("growth")}>課程總覽</button>
          <button onClick={() => setView("characters")}>角色圖鑑</button>
          <button onClick={() => setView("parent")}>小隊長資料設定</button>
          <a className="habitBadgeLink" href="https://starlight-habit-badges.jarvislin.chatgpt.site/">🏅 好習慣勳章館</a>
        </nav>
      </header>
      {view === "home" && (
        <section className="home">
          <div className="hero">
            <div className="heroCopy">
              <p className="eyebrow">陪孩子一起長大的親子教材</p>
              <h1>
                每一段成長，
                <br />
                <em>都有新的星光任務</em>
              </h1>
              <p>生活啟蒙 × 入學準備 × 小一 × 小二</p>
            </div>
          </div>
          <div className="homeChildArea">
            <div className="profileSelector">
              <p className="eyebrow">今天是哪位小隊長學習？</p>
              <div className="profileTabs">
                {store.profiles.map((p, i) => (
                  <button
                    key={i}
                    className={i === store.active ? "selected" : ""}
                    onClick={() => setStore((s) => ({ ...s, active: i }))}
                  >
                    <span><AvatarMark avatar={p.avatar} label={`${p.name}的頭像`} /></span>
                    <b>{p.name}</b>
                    <small>{ageLabel(p.birthDate, p.age)}</small>
                  </button>
                ))}
              </div>
            </div>
            <div className="childDashboard">
              <div className="childIdentity">
                <span><AvatarMark avatar={profile.avatar} label={`${profile.name}的頭像`} /></span>
                <div>
                  <small>已選擇的小隊長</small>
                  <h2>{profile.name}</h2>
                  <p>
                    {profile.birthDate
                      ? `出生日期 ${profile.birthDate}`
                      : "尚未設定出生日期"}{" "}
                    · {childAge}
                  </p>
                  <b>{currentGrowth[1]}</b>
                </div>
              </div>
              <div className="childStats">
                <span>
                  <b>{profile.stars}</b>任務星
                </span>
                <span>
                  <b>{profile.growthStars}</b>成長星
                </span>
                <span>
                  <b>{profile.growthCompleted.length}/60</b>進階任務
                </span>
              </div>
              <div className="childActions">
                <button
                  className="primary"
                  onClick={() =>
                    profile.growthStage === "life"
                      ? openMission(nextDay)
                      : setView("growth")
                  }
                >
                  繼續目前課程 →
                </button>
                <button
                  className="dashboardCourseOverview"
                  onClick={() => setView("growth")}
                >
                  查看課程總覽 →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      {view === "map" && (
        <section className="content roadPage">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">從救援基地一路前往星光總部</p>
              <h1>
                <span className="inlineAvatar"><AvatarMark avatar={profile.avatar} /></span>
                {profile.name} 的救援道路
              </h1>
            </div>
            <div className="starPill">★ {profile.stars} 顆星</div>
          </div>
          <div className="mapLegend">
            <span>救援基地出發</span>
            <b>已前進 {completedLifeDays.length}／{enhancedMissions.length} 站</b>
            <span>終點：星光總部</span>
          </div>
          <div className="chapterTabs" role="tablist" aria-label="生活啟蒙章節">
            {lifeChapters.map((chapter) => {
              const completed = enhancedMissions.filter((mission) => mission.day >= chapter.days[0] && mission.day <= chapter.days[1] && completedLifeDays.includes(mission.day)).length;
              return <button key={chapter.id} className={selectedChapter === chapter.id ? "selected" : ""} onClick={() => { setSelectedChapter(chapter.id); setSelectedMapDay(null); }}>
                <b>{chapter.title}</b><small>{completed}/{chapter.days[1] - chapter.days[0] + 1}</small>
              </button>;
            })}
          </div>
          <div className="roadMap storybookMap chapterRoadMap">
            {chapterMissions.map((x) => {
              const current = x.day === nextDay,
                done = completedLifeDays.includes(x.day);
              return (
                <button
                  key={x.day}
                  className={`roadStop ${done ? "done" : ""} ${current ? "current" : ""}`}
                  onClick={() => setSelectedMapDay(x.day)}
                  aria-label={`第 ${x.day} 天 ${x.title}`}
                >
                  <span className="stopDay">{x.day}</span>
                  <i>
                    <img
                      src={publicAsset(
                        x.day >= 15
                          ? `life-icons/day-${String(x.day).padStart(2, "0")}.webp`
                          : `scenes/day-${String(x.day).padStart(2, "0")}-good.webp`,
                      )}
                      alt=""
                    />
                  </i>
                  <b>{x.title}</b>
                  {current && <small>從這裡繼續</small>}
                </button>
              );
            })}
            {selectedMapDay &&
              (() => {
                const x = enhancedMissions[selectedMapDay - 1];
                const done = completedLifeDays.includes(selectedMapDay);
                return (
                  <div
                    className="mapMissionCard"
                    role="dialog"
                    aria-modal="false"
                  >
                    <button
                      className="mapClose"
                      onClick={() => setSelectedMapDay(null)}
                      aria-label="關閉"
                    >
                      ×
                    </button>
                    <img
                      src={publicAsset(
                        selectedMapDay >= 15
                          ? `life-icons/day-${String(selectedMapDay).padStart(2, "0")}.webp`
                          : `scenes/day-${String(selectedMapDay).padStart(2, "0")}-good.webp`,
                      )}
                      alt={`第 ${selectedMapDay} 天情境`}
                    />
                    <div>
                      <p className="eyebrow">
                        DAY {selectedMapDay} · {x.characters.join("＋")}
                      </p>
                      <h2>{x.title}</h2>
                      <p>{x.goal}</p>
                      <div className="mapProgress">
                        <span>{done ? "主線完成" : "主線待完成"}</span>
                        <span>
                          排序闖關{" "}
                          {
                            validVisual.filter(
                              (v) => Math.floor(v / 10) === selectedMapDay,
                            ).length
                          }
                          /1
                        </span>
                      </div>
                      <button
                        className="primary"
                        onClick={() => openMission(selectedMapDay)}
                      >
                        {profile.lastSteps[selectedMapDay] > 0
                          ? "繼續任務"
                          : done
                            ? "重玩任務"
                            : "開始任務"}{" "}
                        →
                      </button>
                    </div>
                  </div>
                );
              })()}
          </div>
        </section>
      )}
      {view === "mission" && (
        <section className="missionView">
          <div className="missionActions">
            <button
              className="back"
              onClick={() => {
                voice.stop();
                setView("map");
              }}
            >
              ← 返回任務地圖
            </button>
            <button className="replayMission" onClick={replayMission}>
              ↻ 重新玩本日任務
            </button>
          </div>
          <div className="missionTitleV2">
            <Character
              name={m.characters[0] as CharName}
              state={voice.speaking ? "talk" : "idle"}
            />
            <div>
              <p className="eyebrow">
                DAY {day} · {m.hero} 出動 · 已完成排序闖關 {enhancedDone}/1
              </p>
              <h1>{m.title}</h1>
              <p>{m.goal}</p>
            </div>
          </div>
          <div className="stepper v2steps">
            {steps.map((s, i) => (
              <button
                key={s}
                className={step === i ? "active" : step > i ? "past" : ""}
                onClick={() => setStep(i)}
              >
                <i>{step > i ? "✓" : i + 1}</i>
                {s}
              </button>
            ))}
          </div>
          <div className="stage visualStage">
            {step === 0 && (
              <Scene who="星隊長" title="星隊長的任務簡報">
                <h2>今晚要學會：{m.goal}</h2>
                <p className="bigTip">「{m.tip}」</p>
                <VoiceButton
                  onClick={() =>
                    voice.speak(
                      `${m.title}。今晚要學會${m.goal}。${m.tip}`,
                      "星隊長",
                    )
                  }
                  label="聽星隊長說"
                />
                <Next onClick={() => setStep(1)} label="收到，開始任務" />
              </Scene>
            )}
            {step === 1 && (
              <div className="dialogueStage">
                <div className="tonightCast">
                  <p className="eyebrow">今晚登場角色</p>
                  <div>
                    {m.characters.map((who: string) => (
                      <div key={who}>
                        <Character name={who as CharName} small />
                        <p>
                          <b>{who}</b>
                          <span>{characterProfiles[who as CharName].role}</span>
                          <small>
                            {characterProfiles[who as CharName].personality}
                          </small>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="storyScene storySceneIllustrated" aria-label={`第 ${dialogueIndex + 1} 段情境圖：${storyText.text}`}>
                  <img src={publicAsset(m.storyImages?.[dialogueIndex] ?? `scenes/day-${String(day).padStart(2, "0")}-good.webp`)} alt={`${m.title}第 ${dialogueIndex + 1} 段故事情境`} />
                  <div className="storySceneCaption"><b>{storyText.speaker}</b><span>{storyText.text}</span></div>
                </div>
                <div className="speakerPanel">
                  <div className="speechBubble storySpeechBubble">
                    <div className="storySpeakerPortrait">
                      <Character
                        name={storyText.speaker as CharName}
                        state={voice.speaking ? "talk" : "idle"}
                        small
                      />
                      <span>正在說話</span>
                    </div>
                    <div className="storySpeechText">
                    <p className="eyebrow">
                      有聲故事 · 第 {dialogueIndex + 1}/{m.dialogue.length} 段
                    </p>
                    <h2>{storyText.speaker}</h2>
                    <p>{storyText.text}</p>
                    </div>
                  </div>
                </div>
                <div className="audioConsole">
                  <button
                    disabled={dialogueIndex === 0}
                    onClick={() => {
                      setDialogueIndex((i) => i - 1);
                      voice.stop();
                    }}
                  >
                    上一段
                  </button>
                  <button
                    className="play"
                    onClick={() =>
                      voice.speaking
                        ? voice.paused
                          ? voice.resume()
                          : voice.pause()
                        : playDialogue()
                    }
                  >
                    {voice.speaking
                      ? voice.paused
                        ? "▶ 繼續"
                        : "Ⅱ 暫停"
                      : "▶ 播放"}
                  </button>
                  <button
                    disabled={dialogueIndex === m.dialogue.length - 1}
                    onClick={() => {
                      setDialogueIndex((i) => i + 1);
                      voice.stop();
                    }}
                  >
                    下一段
                  </button>
                  <button onClick={() => playDialogue()}>↻ 重播</button>
                  <label>
                    <input
                      type="checkbox"
                      checked={autoRef.current}
                      onChange={(e) => {
                        autoRef.current = e.target.checked;
                      }}
                    />{" "}
                    自動播放
                  </label>
                </div>
                <Next onClick={() => setStep(2)} label="故事聽完了" />
              </div>
            )}
            {step === 2 && (
              <Scene who={m.characters[0] as CharName} title="生活判斷任務">
                <h2>看一看，哪個孩子做得更正確？</h2>
                <ActionGuide
                  items={["看人物正在做什麼", "選出好方法", "獲得星星"]}
                />
                <div className="pictureChoices">
                  <Picture
                    day={day}
                    ok
                    label={m.correct}
                    onClick={() =>
                      celebrate(m.characters[0] as CharName, "答對了！", () =>
                        addUnique("main", day),
                      )
                    }
                  />
                  <Picture
                    day={day}
                    ok={false}
                    label={m.wrong}
                    onClick={() =>
                      setFeedback(
                        `再看一次：注意人物的手、正在使用的物品和周圍環境。`,
                      )
                    }
                  />
                </div>
                <Feedback text={feedback} />
                <Next onClick={() => setStep(3)} label="前往步驟排序" />
              </Scene>
            )}
            {step === 3 && (
              <ChallengeHead m={m} index={0}>
                <ActionGuide
                  items={["選下面圖卡", "放進發光空格", "全部放滿再檢查"]}
                />
                <div className="orderSlots">
                  {placed.map((x, i) => (
                    <button
                      key={i}
                      className={`${x ? "filled" : ""} ${selectedCard && !x ? "ready" : ""}`}
                      onClick={() => (x ? removePlaced(i) : placeCard(i))}
                    >
                      <span>{i + 1}</span>
                      {x ? (
                        <>
                          <strong className="stepPicture">
                            <StepCardVisual
                              day={day}
                              index={m.visualChallenges[0].steps.indexOf(x)}
                              icon={m.visualChallenges[0].icons[m.visualChallenges[0].steps.indexOf(x)]}
                            />
                          </strong>
                          <b>{x}</b>
                        </>
                      ) : (
                        <em>放第 {i + 1} 步</em>
                      )}
                    </button>
                  ))}
                </div>
                <p className="trayLabel">先選一張步驟卡</p>
                <div className="cardTray">
                  {pool.map((x: string) => (
                    <button
                      key={x}
                      className={selectedCard === x ? "selected" : ""}
                      onClick={() => {
                        voice.speak(x, m.characters[0] as CharName);
                        setSelectedCard(x);
                      }}
                    >
                      <StepCardVisual
                        day={day}
                        index={m.visualChallenges[0].steps.indexOf(x)}
                        icon={m.visualChallenges[0].icons[m.visualChallenges[0].steps.indexOf(x)]}
                      />
                      {x}
                      <small>🔊 點一下聽</small>
                    </button>
                  ))}
                </div>
                {placed.every(Boolean) && (
                  <button className="checkBtn bigCheck" onClick={checkOrder}>
                    全部放好了，檢查順序
                  </button>
                )}
                <Feedback text={feedback} />
                <Next onClick={() => setStep(4)} label="前往基地晚安" />
              </ChallengeHead>
            )}
            {false && step === 4 && (
              <div className="branchStage">
                {!branch ? (
                  <>
                    <p className="eyebrow">自由選擇 · 另一關可隨時補玩</p>
                    <h2>要去哪一座支援站？</h2>
                    <div className="branchChoice">
                      <button
                        onClick={() => {
                          setBranch("math");
                          saveBranchResume({ kind: "math" });
                        }}
                      >
                        <span>∑</span>
                        <b>數學補給站</b>
                        <small>數、量、圖形與空間、邏輯</small>
                      </button>
                      <button
                        onClick={() => {
                          setBranch("phonics");
                          saveBranchResume({ kind: "phonics" });
                        }}
                      >
                        <span>ㄅ</span>
                        <b>注音識字通訊站</b>
                        <small>注音、五頁繪本、詞語與寫字</small>
                      </button>
                    </div>
                  </>
                ) : branch === "math" ? (
                  <MathStation
                    day={day}
                    age={profile.age}
                    profile={profile}
                    activity={mathActivity}
                    domain={mathDomain}
                    round={mathRound}
                    answered={mathAnswered}
                    feedback={feedback}
                    onBack={() => {
                      setBranch(null);
                      setMathActivity(null);
                      setMathDomain(null);
                      setFeedback("");
                    }}
                    onDomain={(d: MathDomainId | null) => {
                      setMathDomain(d);
                      setMathActivity(null);
                      setFeedback("");
                    }}
                    onActivity={(a: MathActivity | null) => {
                      setMathActivity(a);
                      setMathAnswered(false);
                      setFeedback("");
                      if (a) {
                        setMathRound(profile.math.includes(day) ? 1 : 0);
                        saveBranchResume({ mathActivity: a.id, mathRound: 0 });
                      }
                    }}
                    onPick={(answer: string) => {
                      if (!mathActivity) return;
                      const question = (
                        profile.age === 3
                          ? mathActivity.three
                          : mathActivity.five
                      )[mathRound];
                      if (answer !== question.answer) {
                        setFeedback("再看一次圖像線索，慢慢想一想。");
                        return;
                      }
                      setMathAnswered(true);
                      setFeedback(
                        mathRound === 0
                          ? "第一回合完成，獲得數學星！"
                          : "生活應用挑戰完成！",
                      );
                      if (mathRound === 0) {
                        addUnique("math", day);
                        if (
                          !profile.mathConceptProgress.includes(mathActivity.id)
                        )
                          update({
                            mathConceptProgress: [
                              ...profile.mathConceptProgress,
                              mathActivity.id,
                            ],
                          });
                      } else addUnique("mathChallengeCompleted", day);
                    }}
                    onNextRound={() => {
                      setMathRound(1);
                      setMathAnswered(false);
                      setFeedback("");
                      saveBranchResume({
                        mathActivity: mathActivity?.id,
                        mathRound: 1,
                      });
                    }}
                    onFinish={() => setStep(5)}
                    onTutorial={() => showTutorial("數學")}
                    onSpeak={(text: string) => voice.speak(text, "旋風")}
                  />
                ) : (
                  <LiteracyStation
                    day={day}
                    age={profile.age}
                    phonics={m.phonics}
                    lesson={literacyLessons[day - 1]}
                    stage={literacyStage}
                    page={bookPage}
                    profile={profile}
                    voice={voice}
                    onBack={() => {
                      setBranch(null);
                      setFeedback("");
                    }}
                    onStage={(s: number) => {
                      setLiteracyStage(s);
                      setFeedback("");
                      saveBranchResume({ literacyStage: s, bookPage });
                    }}
                    onPage={(p: number) => {
                      setBookPage(p);
                      saveBranchResume({ literacyStage, bookPage: p });
                    }}
                    onPhonics={() => {
                      addUnique("phonics", day);
                      setLiteracyStage(1);
                      saveBranchResume({ literacyStage: 1, bookPage: 0 });
                    }}
                    onComplete={() =>
                      celebrate("旋風", "識字任務完成！", () =>
                        addUnique("literacyCompleted", day),
                      )
                    }
                    onFinish={() => setStep(5)}
                  />
                )}
              </div>
            )}
            {step === 4 && (
              <div className="goodnight">
                <Character name={m.characters[1] as CharName} state="success" />
                <p className="eyebrow">基地燈光已調暗</p>
                <h2>{day === enhancedMissions.length ? "44天生活任務完成！" : `晚安，${profile.name}`}</h2>
                <p>
                  今天完成了「{m.title}」。
                  <br />
                  生活實作：{m.practice}
                </p>
                {day === enhancedMissions.length && <p className="courseSummary">你已走過四個章節。照顧身體、友善相處、負責任地生活，這些能力都可以繼續重玩與練習；是否升級仍由家長決定。</p>}
                <div className="dayReward">
                  <b>今天獲得 {dayStars} 顆星</b>
                  <div className="starCollection">
                    {dayStars > 0 ? (
                      Array.from({ length: dayStars }, (_, i) => (
                        <span
                          key={i}
                          style={{ animationDelay: `${i * 0.12}s` }}
                        >
                          ★
                        </span>
                      ))
                    ) : (
                      <em>☆ 完成一個未完成任務就能獲得星星</em>
                    )}
                  </div>
                  <small>累積共 {profile.stars} 顆任務星</small>
                </div>
                <VoiceButton
                  onClick={() =>
                    voice.speak(
                      `晚安，${profile.name}。今天獲得${dayStars}顆星，累積共有${profile.stars}顆。`,
                      "星隊長",
                    )
                  }
                  label="聽晚安祝福"
                />
                <Next
                  onClick={() => setView("map")}
                  label="收下星星，查看地圖"
                />
              </div>
            )}
          </div>
        </section>
      )}
      {view === "growth" && (
        <GrowthCenter
          profile={profile}
          onUpdate={update}
          onOpenCourse={() => setView("map")}
          onSpeak={(text, who = "旋風") => voice.speak(text, who)}
        />
      )}
      {celebration && (
        <Celebration
          data={celebration}
          onClose={() => {
            const next = celebration.nextStep;
            setCelebration(null);
            if (next !== undefined) setStep(next);
          }}
        />
      )}
      {view === "characters" && (
        <section className="content characterDex">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">先認識夥伴，再開始故事</p>
              <h1>星光救援隊角色圖鑑</h1>
              <p>點擊「聽我介紹」就能聽角色自己說話。</p>
            </div>
            <button className="download" onClick={() => setView("map")}>
              前往任務地圖 →
            </button>
          </div>
          <div className="dexGrid">
            {(Object.keys(characterProfiles) as CharName[]).map((name) => (
              <article key={name}>
                <Character name={name} />
                <div>
                  <p className="eyebrow">{characterProfiles[name].role}</p>
                  <h2>{name}</h2>
                  <p>{characterProfiles[name].personality}</p>
                  <p className="skillTag">
                    擅長：{characterProfiles[name].skill}
                  </p>
                  <VoiceButton
                    label="聽我介紹"
                    onClick={() =>
                      voice.speak(
                        `你好，我是${name}，我是${characterProfiles[name].role}。${characterProfiles[name].personality}我最擅長${characterProfiles[name].skill}。`,
                        name,
                      )
                    }
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {view === "parent" && (
        <section className="content parent">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">家長專區 · 3.1</p>
              <h1>陪伴成長，不比較快慢</h1>
            </div>
            <button
              className="download"
              onClick={() => window.open("/parent-guide.pdf", "_blank")}
            >
              ↓ 下載新版 A4 手冊
            </button>
          </div>
          <div className="parentGrid">
            <div className="profileEditor">
              <h2>孩子檔案</h2>
              <label>
                暱稱
                <input
                  value={profile.name}
                  maxLength={8}
                  onChange={(e) => update({ name: e.target.value })}
                />
              </label>
              <label>
                出生年月日（選填）
                <input
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) =>
                    update({
                      birthDate: e.target.value,
                      age: ageModeFromBirthDate(e.target.value, profile.age),
                    })
                  }
                />
                <small>
                  目前實際年齡：{ageLabel(profile.birthDate, profile.age)}
                </small>
              </label>
              <div className="growthProfileFields">
                <label>
                  目前學習階段
                  <select
                    value={profile.growthStage}
                    onChange={(e) =>
                      update({ growthStage: e.target.value as GrowthStageId })
                    }
                  >
                    {growthStages.map((s) => (
                      <option key={s[0]} value={s[0]}>
                        {s[1]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  題目難度
                  <select
                    value={profile.difficultyMode}
                    onChange={(e) =>
                      update({
                        difficultyMode: e.target
                          .value as Profile["difficultyMode"],
                      })
                    }
                  >
                    <option value="auto">依表現自動推薦</option>
                    <option value="gentle">溫和複習</option>
                    <option value="challenge">增加挑戰</option>
                  </select>
                </label>
                <label className="lockToggle">
                  <input
                    type="checkbox"
                    checked={profile.stageLocked}
                    onChange={(e) => update({ stageLocked: e.target.checked })}
                  />
                  <span>鎖定目前階段，不接受自動調整</span>
                </label>
              </div>
              <label>選擇頭像（15 款）</label>
              <div className="avatarGrid">
                {avatars.map((a) => (
                  <button
                    key={a}
                    className={profile.avatar === a ? "active" : ""}
                    onClick={() => update({ avatar: a })}
                    aria-label={`選擇頭像 ${a}`}
                  >
                    <AvatarMark avatar={a} />
                  </button>
                ))}
              </div>
              <ProfileColorPicker profile={profile} onUpdate={update} />
              <div className="clearProgressPanel">
                <div>
                  <b>重新開始學習紀錄</b>
                  <p>只清除目前這位小隊長的星星、任務、能力與試玩紀錄。</p>
                </div>
                <button className="danger" onClick={clearCurrentProgress}>
                  清除星星與任務紀錄
                </button>
              </div>
            </div>
            <div className="report">
              <h2>{profile.name} 的成長紀錄</h2>
              <div className="reportRows">
                <div>
                  <span>生活主線</span>
                  <b>{completedLifeDays.length}/{enhancedMissions.length}</b>
                </div>
                <div>
                  <span>步驟排序</span>
                  <b>{validVisual.length}/{enhancedMissions.length}</b>
                </div>
                <div>
                  <span>數學補給</span>
                  <b>{profile.math.length}/14</b>
                </div>
                <div>
                  <span>數學挑戰</span>
                  <b>{profile.mathChallengeCompleted.length}/14</b>
                </div>
                <div>
                  <span>注音通訊</span>
                  <b>{completePhonics}/14</b>
                </div>
                <div>
                  <span>生活識字</span>
                  <b>{profile.literacyCompleted.length}/14</b>
                </div>
                <div>
                  <span>藝術創作</span>
                  <b>{profile.artCompleted.length}/20</b>
                </div>
                <div>
                  <span>藝術徽章</span>
                  <b>{profile.artBadges.length}/6</b>
                </div>
                <div>
                  <span>音樂探索</span>
                  <b>{profile.musicCompleted.length}/20</b>
                </div>
                <div>
                  <span>音樂徽章</span>
                  <b>{profile.musicBadges.length}/8</b>
                </div>
              </div>
              <div className="domainSummary">
                {mathDomains.map((d) => (
                  <span key={d.id}>
                    <b>{d.title}</b>
                    {
                      mathActivities.filter(
                        (x) =>
                          x.domain === d.id &&
                          profile.mathConceptProgress.includes(x.id),
                      ).length
                    }
                    /{mathActivities.filter((x) => x.domain === d.id).length}
                  </span>
                ))}
              </div>
              <label>
                角色語速 <b>{store.rate.toFixed(2)}×</b>
                <input
                  type="range"
                  min=".65"
                  max="1.05"
                  step=".05"
                  value={store.rate}
                  onChange={(e) =>
                    setStore((s) => ({ ...s, rate: Number(e.target.value) }))
                  }
                />
              </label>
              <label>
                語音音量 <b>{Math.round(store.volume * 100)}%</b>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step=".1"
                  value={store.volume}
                  onChange={(e) =>
                    setStore((s) => ({ ...s, volume: Number(e.target.value) }))
                  }
                />
              </label>
            </div>
          </div>
          <div className="growthProgressSummary parentGrowthSummary">
            <div>
              <small>成長型課程</small>
              <b>{profile.growthCompleted.length}/60</b>
              <span>已完成任務</span>
            </div>
            <div>
              <small>成長獎勵</small>
              <b>★ {profile.growthStars}</b>
              <span>成長星</span>
            </div>
            <div>
              <small>目前階段</small>
              <b>
                {
                  growthStages
                    .find((s) => s[0] === profile.growthStage)?.[1]
                    .split("｜")[0]
                }
              </b>
              <span>{profile.stageLocked ? "家長已鎖定" : "可依試玩推薦"}</span>
            </div>
          </div>
        </section>
      )}
      <footer>
        <span>✦ 星光救援指揮中心 3.1</span>
        <p>所有進度只保存在這台裝置</p>
      </footer>
    </main>
  );
}

function GrowthCenter({
  profile,
  onUpdate,
  onOpenCourse,
  onSpeak,
}: {
  profile: Profile;
  onUpdate: (patch: Partial<Profile>) => void;
  onOpenCourse: () => void;
  onSpeak: (text: string, who?: CharName) => void;
}) {
  const [trialStage, setTrialStage] = useState<GrowthStageId | null>(null),
    [trialIndex, setTrialIndex] = useState(0),
    [trialScore, setTrialScore] = useState(0),
    [trialDone, setTrialDone] = useState(false),
    [trialTip, setTrialTip] = useState("");
  const [courseStage, setCourseStage] = useState<GrowthStageId | null>(null);
  const [studyOpen, setStudyOpen] = useState(false);
  const currentIndex = stageIndex(profile.growthStage),
    next = growthStages[currentIndex + 1],
    current = growthStages[currentIndex];
  const questions = trialStage ? upgradeTrials[trialStage] : [];
  const startTrial = (id: GrowthStageId) => {
    setTrialStage(id);
    setTrialIndex(0);
    setTrialScore(0);
    setTrialDone(false);
    setTrialTip("");
  };
  const pickTrial = (answer: string) => {
    if (!trialStage || trialDone) return;
    const q = questions[trialIndex],
      correct = answer === q.answer,
      nextScore = trialScore + (correct ? 1 : 0);
    setTrialScore(nextScore);
    setTrialTip(
      correct ? "答對了！我們繼續下一題。" : "沒關係，這題先記在練習清單裡。",
    );
    if (trialIndex < questions.length - 1) {
      setTimeout(() => {
        setTrialIndex((i) => i + 1);
        setTrialTip("");
      }, 500);
      return;
    }
    const passed = nextScore >= Math.ceil(questions.length * 0.8);
    setTrialDone(true);
    onUpdate({
      trialHistory: {
        ...profile.trialHistory,
        [trialStage]: {
          score: nextScore,
          total: questions.length,
          passed,
          completedAt: new Date().toISOString(),
        },
      },
      abilities: {
        ...profile.abilities,
        [q.ability]: Math.min(
          3,
          profile.abilities[q.ability] + (correct ? 1 : 0),
        ) as 1 | 2 | 3,
      },
    });
  };
  const result = trialStage ? profile.trialHistory[trialStage] : undefined;
  if (studyOpen)
    return (
      <StudyCenter
        stage={profile.growthStage}
        age={profile.age}
        profile={profile}
        onUpdate={onUpdate}
        onSpeak={onSpeak}
        onBack={() => setStudyOpen(false)}
      />
    );
  if (courseStage)
    return (
      <GrowthCourse
        stage={courseStage}
        profile={profile}
        onSpeak={onSpeak}
        onBack={() => setCourseStage(null)}
        onComplete={(mission) => {
          if (profile.growthCompleted.includes(mission.id)) return;
          const ability: AbilityKey =
            mission.subject === "數學"
              ? "math"
              : mission.subject === "國語"
                ? "literacy"
                : mission.subject === "生活"
                  ? "life"
                  : "reading";
          onUpdate({
            growthCompleted: [...profile.growthCompleted, mission.id],
            growthStars: profile.growthStars + 1,
            abilities: {
              ...profile.abilities,
              [ability]: Math.min(3, profile.abilities[ability] + 1) as
                | 1
                | 2
                | 3,
            },
          });
        }}
      />
    );
  return (
    <section className="content growthCenter">
      <div className="sectionHead">
        <div>
          <p className="eyebrow">{profile.name} 的專屬學習紀錄</p>
          <h1><span className="inlineAvatar"><AvatarMark avatar={profile.avatar} /></span>成長旅程總地圖</h1>
          <p>
            {ageLabel(profile.birthDate, profile.age)} · 目前推薦：
            <b>{current[1]}</b>。升級試玩只提供建議，不會強迫改變難度。
          </p>
        </div>
      </div>
      <section className="independentStudyEntry">
        <div>
          <p className="eyebrow">不限任務進度 · 隨時自由練習</p>
          <h2>星光自主學習中心</h2>
          <p>注音、數學、英文、時間、藝術與音樂六大學習館，可依興趣隨時自由探索。</p>
        </div>
        <div className="independentStudySubjects" aria-hidden="true">
          <span>ㄅ<small>注音</small></span>
          <span>＋<small>數學</small></span>
          <span>A<small>英文</small></span>
          <span>🕒<small>時間</small></span>
          <span>🎨<small>藝術</small></span>
          <span>♪<small>音樂</small></span>
        </div>
        <button className="primary" onClick={() => setStudyOpen(true)}>
          進入自主學習中心 →
        </button>
      </section>
      <div className="growthRoad">
        {growthStages.map((s, i) => {
          const done = i < currentIndex,
            active = i === currentIndex,
            ready = profile.trialHistory[s[0]]?.passed,
            hasCourse = ["prep", "g1", "g2"].includes(s[0]);
          return (
            <article
              key={s[0]}
              className={`${done ? "done" : ""} ${active ? "active" : ""} ${ready ? "ready" : ""}`}
            >
              <span>{done ? "✓" : i + 1}</span>
              <div>
                <small>
                  {done
                    ? "已走過"
                    : active
                      ? "目前階段"
                      : ready
                        ? "準備挑戰"
                        : "未來階段"}
                </small>
                <h2>{s[1]}</h2>
                <p>{s[2]}</p>
                <em>{s[3]}</em>
                {hasCourse && (
                  <small className="courseCount">20 項完整任務</small>
                )}
              </div>
              {active &&
                (s[0] === "life" ? (
                  <button onClick={onOpenCourse}>繼續44天課程</button>
                ) : hasCourse ? (
                  <button onClick={() => setCourseStage(s[0])}>
                    進入本階段課程
                  </button>
                ) : null)}
              {done && s[0] === "life" && (
                <button onClick={onOpenCourse}>回到第一章複習</button>
              )}
              {done && hasCourse && (
                <button onClick={() => setCourseStage(s[0])}>自由複習</button>
              )}
              {!active &&
                upgradeTrials[s[0]].length > 0 &&
                i === currentIndex + 1 && (
                  <button onClick={() => startTrial(s[0])}>升級試玩</button>
                )}
            </article>
          );
        })}
      </div>
      {next && !trialStage && (
        <div className="growthSuggestion">
          <Character name="星隊長" small />
          <div>
            <p className="eyebrow">下一個成長目標</p>
            <h2>{next[1]}</h2>
            {upgradeTrials[next[0]].length > 0 ? (
              <>
                <p>
                  先完成 {upgradeTrials[next[0]].length}{" "}
                  題溫和試玩，再決定是否調整階段。隨時可以回到原課程複習。
                </p>
                <button className="primary" onClick={() => startTrial(next[0])}>
                  開始升級試玩 →
                </button>
              </>
            ) : (
              <p>這個階段已列入未來課程地圖，正式內容完成後即可繼續前進。</p>
            )}
          </div>
        </div>
      )}
      {trialStage && (
        <div className="trialPanel">
          <button className="textBack" onClick={() => setTrialStage(null)}>
            ← 返回成長地圖
          </button>
          {!trialDone ? (
            <>
              <p className="eyebrow">
                升級試玩 · 第 {trialIndex + 1}/{questions.length} 題
              </p>
              <h2>{questions[trialIndex].question}</h2>
              <div className="trialOptions">
                {questions[trialIndex].options.map((o) => (
                  <button key={o} onClick={() => pickTrial(o)}>
                    {o}
                  </button>
                ))}
              </div>
              {trialTip && <p className="trialTip">{trialTip}</p>}
            </>
          ) : (
            <div className="trialResult">
              <Character name="星隊長" state="success" />
              <h2>
                {trialScore >= Math.ceil(questions.length * 0.8)
                  ? "準備好挑戰下一階段！"
                  : "先留在目前階段多練習幾次"}
              </h2>
              <p>
                這次完成 {trialScore}/{questions.length}{" "}
                題。結果只用來推薦，不會比較孩子快慢。
              </p>
              {result?.passed && !profile.stageLocked && (
                <button
                  className="primary"
                  onClick={() => {
                    onUpdate({ growthStage: trialStage });
                    setTrialStage(null);
                  }}
                >
                  採用新階段
                </button>
              )}
              <button
                className="secondaryGrowth"
                onClick={() => startTrial(trialStage)}
              >
                再試一次
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

const phonicsLibrary = [
  ["ㄅ", "爸", "ㄅㄚˋ", "爸爸"], ["ㄆ", "坡", "ㄆㄛ", "山坡"],
  ["ㄇ", "媽", "ㄇㄚ", "媽媽"], ["ㄈ", "風", "ㄈㄥ", "風車"],
  ["ㄉ", "大", "ㄉㄚˋ", "大車"], ["ㄊ", "天", "ㄊㄧㄢ", "天空"],
  ["ㄋ", "鳥", "ㄋㄧㄠˇ", "小鳥"], ["ㄌ", "鹿", "ㄌㄨˋ", "小鹿"],
  ["ㄍ", "狗", "ㄍㄡˇ", "小狗"], ["ㄎ", "口", "ㄎㄡˇ", "開口"],
  ["ㄏ", "花", "ㄏㄨㄚ", "花朵"], ["ㄐ", "家", "ㄐㄧㄚ", "家人"],
  ["ㄑ", "球", "ㄑㄧㄡˊ", "皮球"], ["ㄒ", "星", "ㄒㄧㄥ", "星星"],
  ["ㄓ", "紙", "ㄓˇ", "白紙"], ["ㄔ", "車", "ㄔㄜ", "汽車"],
  ["ㄕ", "手", "ㄕㄡˇ", "小手"], ["ㄖ", "日", "ㄖˋ", "日光"],
  ["ㄗ", "字", "ㄗˋ", "國字"], ["ㄘ", "草", "ㄘㄠˇ", "小草"],
  ["ㄙ", "傘", "ㄙㄢˇ", "雨傘"], ["ㄧ", "衣", "ㄧ", "衣服"],
  ["ㄨ", "屋", "ㄨ", "房屋"], ["ㄩ", "魚", "ㄩˊ", "小魚"],
  ["ㄚ", "阿", "ㄚ", "阿姨"], ["ㄛ", "喔", "ㄛ", "喔喔"],
  ["ㄜ", "鵝", "ㄜˊ", "白鵝"], ["ㄝ", "耶", "ㄧㄝˊ", "爺爺"],
  ["ㄞ", "愛", "ㄞˋ", "愛心"], ["ㄟ", "杯", "ㄅㄟ", "杯子"],
  ["ㄠ", "帽", "ㄇㄠˋ", "帽子"], ["ㄡ", "狗", "ㄍㄡˇ", "小狗"],
  ["ㄢ", "安", "ㄢ", "安全"], ["ㄣ", "門", "ㄇㄣˊ", "大門"],
  ["ㄤ", "糖", "ㄊㄤˊ", "糖果"], ["ㄥ", "燈", "ㄉㄥ", "車燈"],
  ["ㄦ", "兒", "ㄦˊ", "兒童"],
] as const;

const phonicsWordIcons: Record<string, string> = {
  爸爸: "👨", 坡: "⛰️", 媽媽: "👩", 風: "🌬️", 大: "🐘", 天: "☀️", 鳥: "🐦", 鹿: "🦌",
  狗: "🐶", 口: "👄", 花: "🌸", 家: "🏠", 球: "⚽", 星: "⭐", 紙: "📄", 車: "🚗", 手: "✋",
  日: "☀️", 字: "字", 草: "🌱", 傘: "☂️", 衣: "👕", 屋: "🏡", 魚: "🐟", 阿: "👧", 喔: "💬",
  鵝: "🪿", 愛: "❤️", 杯: "🥤", 歐: "🌍", 安: "🛟", 門: "🚪", 燈: "💡", 兒童: "🧒",
};

const englishLibrary = [
  ["A", "apple", "蘋果"], ["B", "ball", "球"], ["C", "cat", "貓"],
  ["D", "dog", "狗"], ["E", "egg", "蛋"], ["F", "fish", "魚"],
  ["G", "go", "走"], ["H", "hat", "帽子"], ["I", "ice", "冰"],
  ["J", "jump", "跳"], ["K", "kite", "風箏"], ["L", "lion", "獅子"],
  ["M", "moon", "月亮"], ["N", "nose", "鼻子"], ["O", "orange", "柳橙"],
  ["P", "pig", "豬"], ["Q", "queen", "皇后"], ["R", "run", "跑"],
  ["S", "sun", "太陽"], ["T", "tree", "樹"], ["U", "up", "向上"],
  ["V", "van", "廂型車"], ["W", "water", "水"], ["X", "box", "盒子"],
  ["Y", "yellow", "黃色"], ["Z", "zebra", "斑馬"],
] as const;

const englishWordIcons: Record<string, string> = {
  apple: "🍎", ball: "⚽", cat: "🐱", dog: "🐶", egg: "🥚", fish: "🐟",
  go: "🚶", hat: "🎩", ice: "🧊", jump: "🤸", kite: "🪁", lion: "🦁",
  moon: "🌙", nose: "👃", orange: "🍊", pig: "🐷", queen: "👑", run: "🏃",
  sun: "☀️", tree: "🌳", up: "⬆️", van: "🚐", water: "💧", box: "📦",
  yellow: "🟡", zebra: "🦓",
};

const subjectStages = {
  phonics: [
    ["3–5歲", "聲音與符號初體驗", "兒歌押韻、聽覺辨音、共讀連結"],
    ["5–6歲", "37符號與二拼萌芽", "認讀、相似音形、口頭聲韻結合"],
    ["大班暑假", "正音與拼讀衝刺", "八週聲調律動、二三拼與22個結合韻"],
    ["小一前10週", "密集系統教學", "規範書寫、聲調、拼讀、聽寫與首冊複習"],
    ["小一後～小二", "閱讀與寫作工具", "橋樑書、注音輸入與注音日記"],
  ],
  math: [
    ["2–6歲", "感官數學", "10以內數量、形狀、方位、分類與序列"],
    ["小一～小二", "具體數量", "100以內加減、九九乘法、實測與形體"],
    ["小三～小四", "分數與小數", "乘除直式、角度、周長面積與統計"],
    ["小五～小六", "抽象整合", "四則、因倍數、體積、速率與比例"],
  ],
  english: [
    ["3–6歲", "語感啟蒙", "TPR動作、歌曲、生活用語與繪本"],
    ["幼小銜接", "自然發音起步", "26字母大小寫、常見發音與圖像字彙"],
    ["小一～小二", "聽說與短句", "生活對話、短音節拼讀與臨摹"],
    ["小三～小四", "讀寫解碼", "長元音、核心句型與短文問答"],
    ["小五～小六", "閱讀與表達", "時態、比較級、專題分享與段落寫作"],
  ],
} as const;

const studyStageDetails = {
  phonics: [
    { goal: "先愛上聲音，不要求硬記與書寫。", activities: ["兒歌找押韻", "童謠語調模仿", "符號尋寶", "親子共讀指字"], writing: "完全不要求書寫，以大格子塗鴉與手指描形為主。" },
    { goal: "看見37個符號能嘗試讀音，開始口頭二拼。", activities: ["ㄅ／ㄉ形近辨析", "ㄣ／ㄥ聽音辨析", "聲母＋韻母口頭合音", "注音賓果與連連看"], writing: "運筆練習與大格子描寫，不以速度和分數比較。" },
    { goal: "八週完成正音與流暢拼讀，準備銜接小一。", activities: ["前4週：37符號看形即讀", "前4週：五聲身體律動", "後4週：二拼與三拼", "後4週：22個結合韻快讀"], writing: "每天短時間練習，保持字形清楚，不做大量抄寫。" },
    { goal: "依首冊節奏建立系統化拼讀、聽寫與規範書寫。", activities: ["第1–4週：符號、筆順、聲調", "第5–7週：二拼、三拼、結合韻", "第8–9週：國字與短文閱讀", "第10週：總複習與正音"], writing: "學習四字格位置、筆順及聲調標註位置。" },
    { goal: "從逐字拼讀過渡到看音懂意，讓注音成為閱讀與寫作工具。", activities: ["全注音橋樑書", "童詩流暢閱讀", "注音鍵盤輸入", "注音日記與小故事"], writing: "國字與注音並重，用注音補足尚未學會的國字。" },
  ],
  math: [
    { goal: "用感官和遊戲建立數感。", activities: ["唱數與點數實物", "形狀尋寶", "上下前後動作", "依顏色大小分類"], writing: "不要求算式，以操作、口說與圖像作答。" },
    { goal: "掌握100以內數量、加減與九九乘法。", activities: ["100以內加減", "九九乘法分組", "直尺與容量實測", "平面立體形體"], writing: "從圖像算式逐步進入橫式與直式。" },
    { goal: "擴展到分數、小數、幾何與統計。", activities: ["分數小數比較", "整數乘除直式", "角度周長面積", "長條圖與折線圖"], writing: "寫出計算過程與生活情境中的數量關係。" },
    { goal: "整合四則、幾何、比例與代數思維。", activities: ["分數小數混合計算", "因數與倍數", "面積與體積", "速率比例與未知數"], writing: "重視列式、推理步驟與答案合理性。" },
  ],
  english: [
    { goal: "建立聽力語感，敢用動作和聲音回應。", activities: ["TPR全身反應", "英文兒歌律動", "招呼飲水如廁用語", "動物水果繪本"], writing: "不要求抄寫，以聽、動、說與圖像理解為主。" },
    { goal: "連結字母、聲音與圖像，開始自然發音。", activities: ["26字母大小寫", "字母常見發音", "看圖猜意", "常見字Sight Words"], writing: "大型字母描線與自己的名字練習。" },
    { goal: "延續聽說興趣，嘗試短句閱讀。", activities: ["家庭學校天氣對話", "課堂常用指令", "短音節單字拼讀", "簡單單字臨摹"], writing: "抄寫字母、單字與一行短句。" },
    { goal: "具備獨立拼讀能力並建立核心句型。", activities: ["長元音規律", "單複數與進行式", "Where／What問句", "短文閱讀問答"], writing: "依句型寫出完整句子並回答問題。" },
    { goal: "銜接國中，發展篇章閱讀與多元表達。", activities: ["過去未來時態", "比較級與連接詞", "主題專題分享", "段落摘要與寫作"], writing: "從看圖故事進階到有開頭、發展、結尾的短文。" },
  ],
} as const;

function StudyCenter({
  stage,
  age,
  profile,
  onUpdate,
  onSpeak,
  onBack,
}: {
  stage: GrowthStageId;
  age: 3 | 5;
  profile: Profile;
  onUpdate: (patch: Partial<Profile>) => void;
  onSpeak: (text: string, who?: CharName) => void;
  onBack: () => void;
}) {
  const [subject, setSubject] = useState<"phonics" | "math" | "english" | "time" | "art" | "music" | null>(null);
  const [selectedStudyStage, setSelectedStudyStage] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [phonicsIndex, setPhonicsIndex] = useState(0);
  const [englishIndex, setEnglishIndex] = useState(0);
  const [customChar, setCustomChar] = useState("日");
  const [writingChar, setWritingChar] = useState("ㄅ");
  const [showWriting, setShowWriting] = useState(false);
  const [showMathPad, setShowMathPad] = useState(false);
  const [mathPractice, setMathPractice] = useState<"operation" | "write" | "count">("operation");
  const [writingNumber, setWritingNumber] = useState(0);
  const [countQuestion, setCountQuestion] = useState({ count: 4, icon: "⭐" });
  const [countFeedback, setCountFeedback] = useState("");
  const [mathLevel, setMathLevel] = useState<GrowthStageId>("g2");
  const [mathTopic, setMathTopic] = useState<"number" | "space" | "logic">("number");
  const [mathQuestion, setMathQuestion] = useState({ text: "3 ＋ 2 ＝？", answer: "5" });
  const [mathFeedback, setMathFeedback] = useState("");
  const makeMath = (op: "+" | "−" | "×" | "÷", levelOverride = mathLevel) => {
    const limits: Record<GrowthStageId, number> = { life: 5, prep: 10, g1: 20, g2: 100, g34: 500, g56: 1000 };
    const max = limits[levelOverride];
    let a = Math.max(2, Math.floor(Math.random() * Math.min(max, 12)) + 1),
      b = Math.max(1, Math.floor(Math.random() * Math.min(max, 9)) + 1),
      answer = 0;
    if (op === "+") { a = Math.floor(Math.random() * 5) + 1; b = Math.floor(Math.random() * 5) + 1; answer = a + b; }
    else if (op === "−") { if (b > a) [a, b] = [b, a]; answer = a - b; }
    else if (op === "×") answer = a * b;
    else { a *= b; answer = a / b; }
    setMathQuestion({ text: `${a} ${op} ${b} ＝？`, answer: String(answer) });
    setMathFeedback("");
    setMathPractice("operation");
  };
  const chooseMathTopic = (topic: "number" | "space" | "logic") => {
    setMathTopic(topic);
    setMathFeedback("");
    if (topic === "number") makeMath("+", mathLevel);
    else if (topic === "space") setMathQuestion(mathLevel === "life" || mathLevel === "prep" ? { text: "三角形有幾條邊？", answer: "3" } : { text: "正方形有幾個直角？", answer: "4" });
    else setMathQuestion(mathLevel === "life" || mathLevel === "prep" ? { text: "1、2、3，下一個數是？", answer: "4" } : { text: "2、4、6，下一個數是？", answer: "8" });
  };
  if (!subject)
    return (
      <section className="content studyCenter">
        <button className="textBack" onClick={onBack}>← 返回成長旅程</button>
        <p className="eyebrow">獨立單元 · 不計入任務星星</p>
        <h1>星光自主學習中心</h1>
        <p>依孩子目前階段自由練習，也可以回到較簡單內容複習。</p>
        <div className="studySubjectGrid">
          <button onClick={() => { setSubject("phonics"); setSelectedStudyStage(0); setSelectedActivity(null); }}><i>ㄅ</i><b>注音學習館</b><span>37符號、拼音、點讀與寫字</span></button>
          <button onClick={() => { setSubject("math"); setSelectedStudyStage(0); setSelectedActivity(null); }}><i>＋</i><b>數學探索館</b><span>數量、空間、邏輯與四則運算</span></button>
          <button onClick={() => { setSubject("english"); setSelectedStudyStage(0); setSelectedActivity(null); }}><i>A</i><b>英文冒險館</b><span>字母、自然發音、TPR與閱讀</span></button>
          <button onClick={() => setSubject("time")}><i>🕒</i><b>時間探索館</b><span>作息、時鐘、日曆與時間規劃</span></button>
          <button onClick={() => setSubject("art")}><i>🎨</i><b>睡前小小藝術室</b><span>四週20題、自由畫布與本機作品集</span></button>
          <button onClick={() => setSubject("music")}><i>♪</i><b>音樂探索館</b><span>36種樂器、兩個八度鋼琴、30首練習曲與四週任務</span></button>
        </div>
      </section>
    );
  if (subject === "time") return <TimeStudyCenter onBack={() => setSubject(null)} onSpeak={onSpeak} />;
  if (subject === "art") return <ArtCenter profile={profile} onUpdate={onUpdate} onBack={() => setSubject(null)} />;
  if (subject === "music") return <MusicCenter profile={profile} onUpdate={onUpdate} onBack={() => setSubject(null)} />;
  const p = phonicsLibrary[phonicsIndex], e = englishLibrary[englishIndex];
  const visualEquation = mathQuestion.text.match(/(\d+)\s*\+\s*(\d+)/);
  const speakEnglishWord = () => onSpeak(e[1], "旋風");
  return (
    <section className="content studyCenter">
      <button className="textBack" onClick={() => { setSubject(null); setShowWriting(false); setSelectedActivity(null); }}>← 返回六大學習館</button>
      {subject === "phonics" && (
        <>
          <p className="eyebrow">注音學習館 · 37個符號完整收錄</p><h1>聽聲音、看符號、練拼音</h1>
          {selectedStudyStage === 2 && (
            <div className="toneActionPanel">
              <h2>五個聲調身體律動</h2>
              <button onClick={() => onSpeak("一聲，點點頭")}>ˉ<small>點頭一聲</small></button>
              <button onClick={() => onSpeak("二聲，頭往上揚")}>ˊ<small>揚頭二聲</small></button>
              <button onClick={() => onSpeak("三聲，頭先低再抬")}>ˇ<small>勾頭三聲</small></button>
              <button onClick={() => onSpeak("四聲，輕輕跺腳")}>ˋ<small>跺腳四聲</small></button>
              <button onClick={() => onSpeak("輕聲，拍拍手")}>˙<small>拍手輕聲</small></button>
              <p>結合韻快讀：ㄧㄚ、ㄧㄝ、ㄧㄠ、ㄧㄡ、ㄧㄢ、ㄧㄣ、ㄧㄤ、ㄧㄥ、ㄨㄚ、ㄨㄛ、ㄨㄞ、ㄨㄟ、ㄨㄢ、ㄨㄣ、ㄨㄤ、ㄨㄥ、ㄩㄝ、ㄩㄢ、ㄩㄣ、ㄩㄥ等。</p>
            </div>
          )}
          <div className="phonicsLibraryGrid">{phonicsLibrary.map((x, i) => <button key={x[0]} className={i === phonicsIndex ? "selected" : ""} aria-label={`選擇並聆聽注音符號 ${x[0]}`} onClick={() => { setPhonicsIndex(i); onSpeak(x[0], "旋風"); }}><b>{x[0]}</b><span>{x[1]}</span></button>)}</div>
          <section className="phonicsPracticeBoard">
            <div className="phonicsExamplePane">
              <button className="phonicsRoundSymbol" aria-label={`聽注音 ${p[0]}`} onClick={() => onSpeak(p[0], "旋風")}>{p[0]}<small>點一下聽聲音</small></button>
              <div className="phonicsExampleVisual" aria-label={`${p[3]}示意圖`}><span>{phonicsWordIcons[p[3]] || "圖"}</span></div>
              <div className="phonicsExampleCopy"><p className="eyebrow">今天練習</p><h2>{p[1]}</h2><strong>{p[2]}</strong><p>{p[3]}</p></div>
              <button className="phonicsListen" onClick={() => onSpeak(`${p[0]}。${p[1]}，注音是${p[2]}。${p[3]}。`, "旋風")}>🔊 聽完整示範</button>
              <div className="phonicsTraceRow" aria-label={`${p[0]}描寫示範`}>
                <b>{p[0]}</b>{Array.from({ length: 4 }, (_, index) => <span key={index}>{p[0]}</span>)}
              </div>
              <p className="phonicsFindPrompt">找一找：哪一個是「{p[0]}」？再用手指圈起來。</p>
            </div>
            <div className="phonicsWritingPane">
              <div className="phonicsWritingHead"><div><p className="eyebrow">手指描寫區</p><h2>照著虛線寫「{p[0]}」</h2></div><span>直接在右側畫面書寫</span></div>
              <div className="strokeHints"><i>1</i><span>從上方開始</span><i>2</i><span>沿著淡色範字慢慢描</span><i>3</i><span>完成後可清除再練一次</span></div>
              <WritingPad key={p[0]} char={p[0]} trace={true} onComplete={() => onSpeak("寫得很好，可以清除後再練一次。", "星隊長")} completeLabel="完成這次練習" />
            </div>
          </section>
          <div className="customWritingPrompt"><label>家長自己出題：<input value={customChar} maxLength={4} onChange={(ev) => setCustomChar(ev.target.value)} placeholder="輸入國字" /></label><button onClick={() => { setWritingChar((customChar || p[0]).slice(0, 1)); setShowWriting(true); }}>開始描寫</button></div>
          {showWriting && <WritingPad char={writingChar} trace={age === 3} onComplete={() => setShowWriting(false)} completeLabel="寫好了，回到注音館" />}
          <aside className="phonicsResourceLinks" aria-labelledby="phonics-resource-title">
            <div><p className="eyebrow">家長延伸資源</p><h2 id="phonics-resource-title">實用注音教學連結</h2><p>離開星光基地後，也可以使用這些資源繼續練習。</p></div>
            <a href="https://bopomofokids.com/" target="_blank" rel="noopener noreferrer"><small>互動教學網站</small><b>ㄅㄆㄇ注音學習網</b><span>開啟網站 ↗</span></a>
            <a href="https://apps.apple.com/tw/app/%E6%B3%A8%E9%9F%B3%E5%B0%8F%E5%AD%B8%E5%A0%82/id6774536502" target="_blank" rel="noopener noreferrer"><small>iPhone／iPad App</small><b>注音小學堂</b><span>前往 App Store ↗</span></a>
          </aside>
        </>
      )}
      {subject === "math" && (
        <>
          <p className="eyebrow">數學探索館 · 從實物到抽象</p><h1>數與量、形狀空間、邏輯關係</h1>
          <div className="mathConceptBands"><button className={mathTopic === "number" ? "selected" : ""} onClick={() => chooseMathTopic("number")}><b>數與量</b><span>寫數字、數數字、加減乘除</span></button><button className={mathTopic === "space" ? "selected" : ""} onClick={() => chooseMathTopic("space")}><b>形狀與空間</b><span>形狀、方位、角度、面積與體積</span></button><button className={mathTopic === "logic" ? "selected" : ""} onClick={() => chooseMathTopic("logic")}><b>邏輯與關係</b><span>分類、排序、規律、統計與應用題</span></button></div>
          {mathTopic === "number" && <div className="operationPicker mathPracticePicker"><button onClick={() => { setMathPractice("write"); setShowMathPad(false); }}>✍️ 寫數字</button><button onClick={() => { const icons = ["⭐","🍎","🚗","🟠"]; setCountQuestion({ count: Math.floor(Math.random() * 9) + 1, icon: icons[Math.floor(Math.random() * icons.length)] }); setCountFeedback(""); setMathPractice("count"); }}>🔢 數數字</button><button onClick={() => makeMath("+")}>＋ 加法</button><button onClick={() => makeMath("−")}>− 減法</button><button onClick={() => makeMath("×")}>× 乘法</button><button onClick={() => makeMath("÷")}>÷ 除法</button></div>}
          {mathPractice === "write" && mathTopic === "number" ? <section className="numberWritingLesson"><h2>寫數字 0～9</h2><p>先選一個數字，再照著大字練習寫。</p><div className="numberPicker">{Array.from({length: 10}, (_, number) => <button key={number} className={writingNumber === number ? "selected" : ""} onClick={() => { setWritingNumber(number); setShowMathPad(true); onSpeak(String(number), "大力"); }}>{number}</button>)}</div>{showMathPad ? <WritingPad char={String(writingNumber)} trace={true} onComplete={() => setShowMathPad(false)} completeLabel="寫好了" /> : <button className="openNumberPad" onClick={() => setShowMathPad(true)}>✍️ 開始練寫數字 {writingNumber}</button>}</section>
          : mathPractice === "count" && mathTopic === "number" ? <section className="countingLesson"><h2>數一數，圖中有幾個？</h2><div className="countingPictures" aria-label={`${countQuestion.count}個圖案`}>{Array.from({length: countQuestion.count}, (_, i) => <span key={i}>{countQuestion.icon}</span>)}</div><label>把答案填進來<input inputMode="numeric" onChange={(ev) => setCountFeedback(ev.target.value === String(countQuestion.count) ? `答對了！一共有 ${countQuestion.count} 個。` : "再指著圖片，一個一個數。")}/></label>{countFeedback && <p>{countFeedback}</p>}<button onClick={() => { const icons = ["⭐","🍎","🚗","🟠"]; setCountQuestion({ count: Math.floor(Math.random() * 9) + 1, icon: icons[Math.floor(Math.random() * icons.length)] }); setCountFeedback(""); }}>換一題</button></section>
          : <><div className="generatedMath">{visualEquation && mathTopic === "number" && <div className="mathVisualEquation"><div><span>{Array.from({length: Number(visualEquation[1])}, (_, i) => <i key={i}>🍎</i>)}</span><b>{visualEquation[1]}</b></div><strong>＋</strong><div><span>{Array.from({length: Number(visualEquation[2])}, (_, i) => <i key={i}>🍎</i>)}</span><b>{visualEquation[2]}</b></div><strong>＝</strong><em>？</em></div>}<button onClick={() => onSpeak(mathQuestion.text, "大力")}><small>🔊 點題目聽</small><b>{mathQuestion.text}</b></button><label>我的答案<input inputMode="numeric" onChange={(ev) => setMathFeedback(ev.target.value === mathQuestion.answer ? `答對了！答案是 ${mathQuestion.answer}` : "再想一想，可以用實物數一數。")}/></label>{mathFeedback && <p>{mathFeedback}</p>}<button className="mathSketchToggle" onClick={() => setShowMathPad((x) => !x)}>✏️ {showMathPad ? "收起手繪教學板" : "開啟手繪教學板"}</button></div>{mathQuestion.text.includes("×") && <section className="timesTableSection"><p className="eyebrow">九九乘法表</p><h2>2～9 的乘法</h2><p>點一格，可以聽完整算式。</p><div className="timesTableScroll"><div className="timesTableGrid">{Array.from({length: 8}, (_, row) => row + 2).flatMap((left) => Array.from({length: 9}, (_, column) => column + 1).map((right) => <button key={`${left}-${right}`} onClick={() => onSpeak(`${left}乘以${right}等於${left * right}`, "大力")}><span>{left} × {right}</span><b>{left * right}</b><small>🔊</small></button>))}</div></div></section>}{showMathPad && <WritingPad char="" trace={false} onComplete={() => setShowMathPad(false)} completeLabel="關閉手繪教學板" />}</>}
        </>
      )}
      {subject === "english" && (
        <>
          <p className="eyebrow">英文冒險館 · 聽說先行</p><h1>Listen, move, speak and read!</h1>
          <div className="englishLetterGrid">{englishLibrary.map((x, i) => <button key={x[0]} className={i === englishIndex ? "selected" : ""} aria-label={`聽字母 ${x[0]}`} onClick={() => { setEnglishIndex(i); onSpeak(x[0], "旋風"); }}><b>{x[0]}</b><span>{x[1]}</span></button>)}</div>
          <div className="symbolLessonCard english"><button className="englishLetterHero" aria-label={`聽字母 ${e[0]}`} onClick={() => onSpeak(e[0], "旋風")}>{e[0]}<small>🔊 點字母聽</small></button><div className="englishWordLesson"><button className="englishWordPicture" aria-label={`聽英文單字 ${e[1]}`} onClick={speakEnglishWord}>{englishWordIcons[e[1]]}<small>🔊 點圖片聽英文</small></button><h2>{e[1]}｜{e[2]}</h2><button className="listen" onClick={speakEnglishWord}>🔊 聽英文單字</button><button onClick={() => setShowWriting(true)}>✍️ Trace the letter</button></div></div>
          <div className="tprCards"><button onClick={() => onSpeak("Jump!", "旋風")}><i aria-hidden="true">🤸</i><b>Jump!</b><small>跳一跳</small></button><button onClick={() => onSpeak("Clap your hands!", "旋風")}><i aria-hidden="true">👏</i><b>Clap!</b><small>拍拍手</small></button><button onClick={() => onSpeak("Turn around!", "旋風")}><i aria-hidden="true">🧍‍♀️↩️</i><b>Turn!</b><small>轉一圈</small></button><button onClick={() => onSpeak("Sit down!", "旋風")}><i aria-hidden="true">🪑</i><b>Sit!</b><small>坐下來</small></button></div>
          {showWriting && <WritingPad char={e[0]} trace={age === 3} onComplete={() => setShowWriting(false)} completeLabel="Done! 回到英文館" />}
        </>
      )}
    </section>
  );
}

function TimeStudyCenter({ onBack, onSpeak }: { onBack: () => void; onSpeak: (text: string, who?: CharName) => void }) {
  const stages = [
    { title: "一天的順序", goal: "從生活作息認識早上、中午、晚上。", activities: ["起床到睡覺排排隊", "昨天今天明天", "白天與夜晚"] },
    { title: "認識大時鐘", goal: "自由調整三根指針，認識五分鐘，並練習使用倒數計時器。", activities: ["自由調整指針", "認識5分鐘", "分針轉一圈", "秒針轉一圈", "整點半點配對", "倒數計時器"] },
    { title: "星期與日曆", goal: "認識星期、日期、昨天今天明天。", activities: ["一週七天", "月曆找日期", "昨天今天明天", "特別日子倒數"] },
    { title: "經過多久", goal: "比較開始與結束時間，理解經過時間。", activities: ["五分鐘小沙漏", "經過幾分鐘", "跨小時時間差", "時間軸"] },
    { title: "生活規劃", goal: "估算時間、安排順序並檢查自己的計畫。", activities: ["我的一天行程", "任務時間預估", "倒推完成時間", "一週計畫"] },
  ];
  const [stageIndex, setStageIndex] = useState(0);
  const [activity, setActivity] = useState(0);
  const [clockHour, setClockHour] = useState(3);
  const [clockMinute, setClockMinute] = useState(0);
  const [clockSecond, setClockSecond] = useState(0);
  const [minuteTurns, setMinuteTurns] = useState(0);
  const [secondTurns, setSecondTurns] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRemaining, setTimerRemaining] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const timerAudioContext = useRef<AudioContext | null>(null);
  const current = stages[stageIndex];
  const setTimerFromChoice = (minutes: number, seconds: number) => {
    setTimerMinutes(minutes);
    setTimerSeconds(seconds);
    setTimerRemaining(minutes * 60 + seconds);
    setTimerRunning(false);
    setTimerFinished(false);
  };
  const prepareTimerBell = () => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    if (!timerAudioContext.current) timerAudioContext.current = new AudioContextClass();
    void timerAudioContext.current.resume();
  };
  const playTimerBell = () => {
    const context = timerAudioContext.current;
    if (!context) return;
    [0, .38, .76].forEach((delay, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = index === 2 ? 880 : 660;
      gain.gain.setValueAtTime(.0001, context.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(.18, context.currentTime + delay + .025);
      gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + delay + .32);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(context.currentTime + delay);
      oscillator.stop(context.currentTime + delay + .34);
    });
  };
  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setTimerRemaining((remaining) => {
        if (remaining > 1) return remaining - 1;
        window.clearInterval(id);
        setTimerRunning(false);
        setTimerFinished(true);
        playTimerBell();
        onSpeak("時間到了。做得很好，現在可以進行下一個活動。", "旋風");
        return 0;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);
  const advanceClockMinutes = (amount: 15 | 30) => {
    setClockMinute((previousMinute) => {
      const nextTotal = previousMinute + amount;
      if (nextTotal >= 60) {
        setMinuteTurns((turns) => turns + 1);
        setClockHour((hour) => hour === 12 ? 1 : hour + 1);
      }
      return nextTotal % 60;
    });
    onSpeak(`時間往前走 ${amount} 分鐘。`, "旋風");
  };
  return <section className="content studyCenter timeStudyCenter">
    <button className="textBack" onClick={onBack}>← 返回六大學習館</button>
    <p className="eyebrow">時間探索館 · 從生活作息到自主規劃</p><h1>看得懂時間，也能安排自己的生活</h1>
    <div className="studyStageStrip">{stages.map((x, i) => <button key={x.title} className={stageIndex === i ? "selected" : ""} onClick={() => { setStageIndex(i); setActivity(0); onSpeak(x.title, "旋風"); }}><b>{x.title}</b><span>{x.goal}</span><small>點擊切換課程</small></button>)}</div>
    <section className="selectedStagePlan"><div><p className="eyebrow">目前選擇</p><h2>{current.title}</h2><p>{current.goal}</p></div>
      {current.title !== "認識大時鐘" && <div className="stageActivityList">{current.activities.map((x, i) => <button key={x} className={activity === i ? "selected" : ""} onClick={() => { setActivity(i); onSpeak(x, "旋風"); }}><i>{i + 1}</i><span>{x}</span><small>點擊開啟活動 ↓</small></button>)}</div>}
      {stageIndex === 0 ? <DayOrderLearning activity={activity} onSpeak={onSpeak} /> : stageIndex === 1 ? <div className="timeActivityPanel">
        <div className="clockFace interactiveClock" aria-label={`${clockHour}點${clockMinute}分${clockSecond}秒的時鐘`}>
          {Array.from({ length: 12 }, (_, i) => <b key={i} className={`clockNumber n${i + 1}`}>{i + 1}</b>)}
          {Array.from({ length: 60 }, (_, i) => <u key={i} className={`minuteTick ${i % 5 === 0 ? "hourTick" : ""}`} style={{ transform: `translateX(-50%) rotate(${i * 6}deg)` }} aria-hidden="true" />)}
          <i className="hourHand" style={{ transform: `translateX(-50%) rotate(${clockHour * 30 + clockMinute * .5}deg)` }}/>
          <i className="minuteHand" style={{ transform: `translateX(-50%) rotate(${clockMinute * 6 + minuteTurns * 360}deg)` }}/>
          <i className="secondHand" style={{ transform: `translateX(-50%) rotate(${clockSecond * 6 + secondTurns * 360}deg)` }}/><strong />
        </div>
        <div className="clockLearningControls"><p className="eyebrow">可以自己轉動的大時鐘</p><h3>{clockHour} 點 {String(clockMinute).padStart(2, "0")} 分 {String(clockSecond).padStart(2, "0")} 秒</h3>
          <div className="clockHandLegend" aria-label="時鐘指針顏色說明"><span><i className="hour" />橙色短針：時針</span><span><i className="minute" />深藍長針：分針</span><span><i className="second" />紅色細針：秒針</span></div>
          <div className="clockNumberSelectors" aria-label="選擇時鐘數字">
            <label>時針（小時）<select value={clockHour} onChange={(e) => setClockHour(Number(e.target.value))}>{Array.from({ length: 12 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>{number} 點</option>)}</select></label>
            <label>分針（分鐘）<select value={clockMinute} onChange={(e) => setClockMinute(Number(e.target.value))}>{Array.from({ length: 60 }, (_, number) => <option key={number} value={number}>{number} 分</option>)}</select></label>
            <label>秒針（秒鐘）<select value={clockSecond} onChange={(e) => setClockSecond(Number(e.target.value))}>{Array.from({ length: 60 }, (_, number) => <option key={number} value={number}>{number} 秒</option>)}</select></label>
          </div>
          <div className={`fiveMinuteLesson ${activity === 1 ? "active" : ""}`}><b>認識 5 分鐘</b><p>每一小格是 1 分鐘；從一個大數字走到下一個大數字，就是 5 分鐘。</p><div>{[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minute) => <button key={minute} onClick={() => { setClockMinute(minute); onSpeak(`${minute}分鐘`, "旋風"); }}>{minute}</button>)}</div></div>
          <div className="clockDemoButtons"><button onClick={() => { setMinuteTurns((x) => x + 1); setClockHour((x) => x === 12 ? 1 : x + 1); onSpeak("分針轉一圈，經過一小時。", "旋風"); }}>↻ 分針轉一圈＝1小時</button><button onClick={() => { setSecondTurns((x) => x + 1); setClockMinute((x) => (x + 1) % 60); onSpeak("秒針轉一圈，經過一分鐘。", "旋風"); }}>↻ 秒針轉一圈＝1分鐘</button></div>
          <button className="listen" onClick={() => onSpeak(`現在是${clockHour}點${clockMinute}分${clockSecond}秒。`, "旋風")}>🔊 聽現在時間</button>
          <section className={`countdownTimer ${activity === 5 ? "active" : ""}`}><p className="eyebrow">倒數計時器</p><h3 aria-live="polite">{String(Math.floor(timerRemaining / 60)).padStart(2, "0")}：{String(timerRemaining % 60).padStart(2, "0")}</h3><div className="timerSelectors"><label>分鐘<select disabled={timerRunning} value={timerMinutes} onChange={(event) => setTimerFromChoice(Number(event.target.value), timerSeconds)}>{Array.from({ length: 61 }, (_, number) => <option key={number} value={number}>{number} 分</option>)}</select></label><label>秒鐘<select disabled={timerRunning} value={timerSeconds} onChange={(event) => setTimerFromChoice(timerMinutes, Number(event.target.value))}>{Array.from({ length: 60 }, (_, number) => <option key={number} value={number}>{number} 秒</option>)}</select></label></div><div className="timerButtons"><button disabled={timerRunning || timerRemaining === 0} onClick={() => { prepareTimerBell(); setTimerFinished(false); setTimerRunning(true); }}>▶ 開始</button><button disabled={!timerRunning} onClick={() => setTimerRunning(false)}>Ⅱ 暫停</button><button onClick={() => setTimerFromChoice(timerMinutes, timerSeconds)}>↻ 重新設定</button></div>{timerFinished && <div className="timerFinished" role="alert"><b>🔔 時間到了！</b><span>完成這段時間任務了。</span></div>}</section>
        </div>
      </div> : stageIndex === 2 ? <CalendarLearning activity={activity} onSpeak={onSpeak} /> : stageIndex === 3 ? <DurationLearning activity={activity} onSpeak={onSpeak} /> : <PlanningLearning activity={activity} onSpeak={onSpeak} />}
    </section>
  </section>;
}

function TimeChoiceLesson({ title, intro, visual, question, options, answer, onSpeak }: { title: string; intro: string; visual: ReactNode; question: string; options: string[]; answer: string; onSpeak: (text: string, who?: CharName) => void }) {
  const [picked, setPicked] = useState("");
  const [checked, setChecked] = useState(false);
  const correct = checked && picked === answer;
  return <section className="timeChoiceLesson"><div className="timeLessonHead"><div><p className="eyebrow">互動時間任務</p><h2>{title}</h2><p>{intro}</p></div><button className="listen" onClick={() => onSpeak(`${title}。${intro}。${question}`, "旋風")}>🔊 聽教學</button></div>
    <div className="timeLessonVisual">{visual}</div><h3>{question}</h3><div className="timeAnswerChoices">{options.map((option) => <button key={option} className={picked === option ? "selected" : ""} onClick={() => { setPicked(option); setChecked(false); onSpeak(option, "旋風"); }}>{option}</button>)}</div>
    <button className="timeCheck" disabled={!picked} onClick={() => { setChecked(true); onSpeak(picked === answer ? `答對了，答案是${answer}` : "再想想，看看畫面中的時間線索。", "旋風"); }}>✓ 檢查答案</button>{checked && <p className={correct ? "timeResult correct" : "timeResult"}>{correct ? `答對了！答案是「${answer}」。` : `這題再想想：你選了「${picked}」。`}</p>}
  </section>;
}

function DayOrderLearning({ activity, onSpeak }: { activity: number; onSpeak: (text: string, who?: CharName) => void }) {
  if (activity === 0) return <RoutineTimeGame onSpeak={onSpeak} />;
  if (activity === 1) return <TimeChoiceLesson title="昨天、今天、明天" intro="今天在中間；昨天已經過去，明天還沒到。" visual={<div className="relativeTimeVisual"><span>← 昨天<br/><small>已經過去</small></span><b>今天<br/><small>正在發生</small></b><span>明天 →<br/><small>接下來到</small></span></div>} question="今天是星期三，明天是星期幾？" options={["星期二", "星期四", "星期五"]} answer="星期四" onSpeak={onSpeak} />;
  return <TimeChoiceLesson title="白天與夜晚" intro="看天空與生活線索：太陽出現多半是白天，月亮出現多半是夜晚。" visual={<div className="dayNightVisual"><span><i>☀</i><b>白天</b><small>太陽、上學、戶外活動</small></span><span><i>☾</i><b>夜晚</b><small>月亮、洗澡、準備睡覺</small></span></div>} question="月亮升起、準備上床睡覺，是白天還是夜晚？" options={["白天", "夜晚"]} answer="夜晚" onSpeak={onSpeak} />;
}

function DurationLearning({ activity, onSpeak }: { activity: number; onSpeak: (text: string, who?: CharName) => void }) {
  const lessons = [
    { title: "五分鐘小沙漏", intro: "沙漏從開始流到結束，代表經過五分鐘。", visual: <div className="sandTimerVisual"><i>5</i><b>開始</b><span>⌛</span><b>結束</b></div>, question: "沙漏全部流完，經過多久？", options: ["1分鐘", "5分鐘", "10分鐘"], answer: "5分鐘" },
    { title: "經過幾分鐘", intro: "比較開始與結束的分鐘數。", visual: <div className="elapsedVisual"><b>3:10</b><span>→ 10、15、20、25 →</span><b>3:25</b></div>, question: "從3點10分到3點25分，經過幾分鐘？", options: ["10分鐘", "15分鐘", "25分鐘"], answer: "15分鐘" },
    { title: "跨小時時間差", intro: "先走到整點，再從整點往後算。", visual: <div className="elapsedVisual"><b>9:30</b><span>→ 10:00 →</span><b>10:15</b></div>, question: "從9點30分到10點15分，經過多久？", options: ["30分鐘", "45分鐘", "1小時15分"], answer: "45分鐘" },
    { title: "時間軸", intro: "時間從左往右前進，每一格代表十分鐘。", visual: <div className="timelineVisual">{["2:00", "2:10", "2:20", "2:30"].map((x) => <span key={x}>{x}</span>)}</div>, question: "從2點到2點30分，走過幾個十分鐘？", options: ["2個", "3個", "4個"], answer: "3個" },
  ];
  return <TimeChoiceLesson {...lessons[activity]} onSpeak={onSpeak} />;
}

function PlanningLearning({ activity, onSpeak }: { activity: number; onSpeak: (text: string, who?: CharName) => void }) {
  const lessons = [
    { title: "我的一天行程", intro: "先做固定時間的事，再安排可以彈性調整的活動。", visual: <div className="planVisual"><span>7:00<br/><b>起床</b></span><span>8:00<br/><b>上學</b></span><span>17:00<br/><b>回家</b></span><span>21:00<br/><b>睡覺</b></span></div>, question: "上學前應該先完成哪件事？", options: ["起床穿衣", "上床睡覺", "晚餐"], answer: "起床穿衣" },
    { title: "任務時間預估", intro: "估計一件事需要多久，再留一點準備時間。", visual: <div className="estimateVisual"><i>🪥</i><b>刷牙</b><span>短短幾分鐘</span></div>, question: "刷牙比較可能需要多久？", options: ["2分鐘", "2小時", "一整天"], answer: "2分鐘" },
    { title: "倒推完成時間", intro: "從必須完成的時間往前減，找出開始時間。", visual: <div className="elapsedVisual"><b>開始？</b><span>＋ 30分鐘 →</span><b>8:00完成</b></div>, question: "任務要30分鐘，8點前完成，應該幾點開始？", options: ["7點30分", "8點30分", "9點"], answer: "7點30分" },
    { title: "一週計畫", intro: "把固定活動放進星期表，避免同一時間安排兩件事。", visual: <div className="weekPlanVisual">{["一 閱讀", "二 運動", "三 閱讀", "四 畫畫", "五 整理"].map((x) => <span key={x}>{x}</span>)}</div>, question: "星期四安排了什麼？", options: ["閱讀", "畫畫", "整理"], answer: "畫畫" },
  ];
  return <TimeChoiceLesson {...lessons[activity]} onSpeak={onSpeak} />;
}

function CalendarLearning({ activity, onSpeak }: { activity: number; onSpeak: (text: string, who?: CharName) => void }) {
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const [countdown, setCountdown] = useState(7);
  const today = new Date();
  const year = today.getFullYear(), month = today.getMonth(), date = today.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dateText = (offset: number) => {
    const day = new Date(year, month, date + offset);
    return `${day.getMonth() + 1}月${day.getDate()}日，${weekdays[day.getDay()]}`;
  };
  if (activity === 0) return <section className="calendarLesson weekLesson"><p className="eyebrow">一週七天</p><h2>從星期日走到星期六</h2><p>點每一天，可以聽到星期名稱。</p><div className="weekDayCards">{weekdays.map((day, index) => <button key={day} onClick={() => onSpeak(day, "旋風")}><i>{index + 1}</i><b>{day}</b><small>{index === 0 ? "一週開始" : index === 6 ? "週末" : "上學日"}</small></button>)}</div><div className="weekArrow">星期日 → 星期一 → 星期二 → 星期三 → 星期四 → 星期五 → 星期六</div></section>;
  if (activity === 1) return <section className="calendarLesson monthLesson"><p className="eyebrow">月曆找日期</p><h2>{year} 年 {month + 1} 月</h2><p>先找星期，再往下找到日期。今天用金色標示。</p><div className="monthCalendar">{weekdays.map((day) => <b key={day}>{day.replace("星期", "")}</b>)}{Array.from({length: firstDay}, (_, i) => <span key={`blank-${i}`} />)}{Array.from({length: daysInMonth}, (_, i) => <button key={i + 1} className={date === i + 1 ? "today" : ""} onClick={() => onSpeak(`${month + 1}月${i + 1}日`, "旋風")}>{i + 1}</button>)}</div></section>;
  if (activity === 2) return <section className="calendarLesson relativeDayLesson"><p className="eyebrow">昨天、今天、明天</p><h2>三天排排站</h2><p>今天在中間；前一天是昨天，後一天是明天。</p><div className="relativeDayCards"><button onClick={() => onSpeak(`昨天是${dateText(-1)}`, "旋風")}><i>←</i><b>昨天</b><span>{dateText(-1)}</span><small>已經過去了</small></button><button className="today" onClick={() => onSpeak(`今天是${dateText(0)}`, "旋風")}><i>●</i><b>今天</b><span>{dateText(0)}</span><small>正在發生</small></button><button onClick={() => onSpeak(`明天是${dateText(1)}`, "旋風")}><i>→</i><b>明天</b><span>{dateText(1)}</span><small>接下來會到</small></button></div></section>;
  return <section className="calendarLesson countdownLesson"><p className="eyebrow">特別日子倒數</p><h2>還要等幾天？</h2><p>選擇距離特別日子的天數，每過一天就少一天。</p><label>距離特別日還有 <strong>{countdown}</strong> 天<input type="range" min="0" max="14" value={countdown} onChange={(e) => setCountdown(Number(e.target.value))}/></label><div className="countdownDots">{countdown === 0 ? <b>🎉 今天到了！</b> : Array.from({length: countdown}, (_, i) => <span key={i}>{i + 1}</span>)}</div><button className="listen" onClick={() => onSpeak(countdown === 0 ? "今天就是特別日！" : `距離特別日還有${countdown}天。`, "旋風")}>🔊 聽倒數</button></section>;
}

function RoutineTimeGame({ onSpeak }: { onSpeak: (text: string, who?: CharName) => void }) {
  const cards = [
    { id: "wake", label: "起床穿衣", image: "time/routine-wake-dress.png", answer: "早上" },
    { id: "breakfast", label: "吃早餐", image: "time/routine-breakfast.png", answer: "早上" },
    { id: "school", label: "到學校學習", image: "time/routine-school.png", answer: "下午" },
    { id: "tidy", label: "收好玩具", image: "time/routine-tidy-toys.png", answer: "下午" },
    { id: "bath", label: "洗澡洗乾淨", image: "time/routine-bath.png", answer: "晚上" },
    { id: "sleep", label: "上床睡覺", image: "time/routine-sleep.png", answer: "晚上" },
  ];
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const check = () => {
    if (cards.some((x) => !placed[x.id])) {
      const unanswered = cards.filter((x) => !placed[x.id]);
      setWrongIds(unanswered.map((x) => x.id));
      setResult(`尚未作答：${unanswered.map((x) => x.label).join("、")}。`);
      onSpeak("還有圖片尚未選擇時段喔。", "旋風");
      return;
    }
    const wrong = cards.filter((x) => placed[x.id] !== x.answer);
    setWrongIds(wrong.map((x) => x.id));
    setResult(wrong.length === 0 ? "全部答對了！你已經會分辨早上、下午和晚上。" : `需要再想想：${wrong.map((x) => `${x.label}（目前選${placed[x.id]}）`).join("、")}。`);
    onSpeak(wrong.length === 0 ? "全部答對了！" : `需要再想想的是，${wrong.map((x) => x.label).join("、")}。`, "旋風");
  };
  return <div className="routineTimeGame"><div className="routineGuide"><b>① 看生活圖片</b><b>② 選早上、下午或晚上</b><b>③ 全部選完後檢查</b></div>
    <div className="routineSelectList">{cards.map((card) => <article key={card.id} className={wrongIds.includes(card.id) ? "needsReview" : ""}>
      <button className="routinePictureButton" onClick={() => onSpeak(card.label, "旋風")} aria-label={`聽${card.label}`}><img src={publicAsset(card.image)} alt={card.label}/></button>
      <div><b>{card.label}</b><label htmlFor={`routine-${card.id}`}>這是什麼時候？</label><select id={`routine-${card.id}`} value={placed[card.id] || ""} onChange={(e) => { const period = e.target.value; setPlaced((x) => ({ ...x, [card.id]: period })); setWrongIds((ids) => ids.filter((id) => id !== card.id)); setResult(""); if (period) onSpeak(`${card.label}，選擇${period}。`, "旋風"); }}><option value="">請選擇</option><option value="早上">早上</option><option value="下午">下午</option><option value="晚上">晚上</option></select>{wrongIds.includes(card.id) && <small>這一題再想想</small>}</div>
    </article>)}</div>
    <div className="routineActions"><button onClick={check}>✓ 檢查答案</button><button onClick={() => { setPlaced({}); setWrongIds([]); setResult(""); }}>↻ 重新選擇</button></div>{result && <p className="routineResult">{result}</p>}
  </div>;
}

function ActivityDetail({
  item,
  subject,
  onSpeak,
  hidePlayGuide = false,
}: {
  item: string;
  subject: "phonics" | "math" | "english";
  onSpeak: (text: string, who?: CharName) => void;
  hidePlayGuide?: boolean;
}) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const speaker: CharName = subject === "english" ? "旋風" : "星隊長";
  const guides: Record<string, { goal: string; steps: string[]; prompt: string; options: string[]; correct: string; success: string }> = {
    兒歌找押韻: {
      goal: "聽出句尾相似的聲音，建立押韻語感。",
      steps: ["先聽兒歌短句", "找出尾音相似的詞", "和角色一起念一次"],
      prompt: "小貓戴草帽。『貓』和『帽』的尾音像不像？",
      options: ["像", "不像"],
      correct: "像",
      success: "答對了！『貓』和『帽』都有相似的ㄠ聲音。",
    },
    童謠語調模仿: {
      goal: "感受聲音的高低與節奏，練習跟著說。",
      steps: ["按播放仔細聽", "用手比出聲音高低", "照著節奏念一次"],
      prompt: "小星星，亮晶晶。先聽，再用一樣的高低念一次。",
      options: ["我跟著念了", "請再播放一次"],
      correct: "我跟著念了",
      success: "完成了！你有用耳朵聽，也用聲音模仿。",
    },
    符號尋寶: {
      goal: "從相似圖形中找到指定的注音符號。",
      steps: ["聽角色說符號", "仔細看兩張符號卡", "點出指定符號"],
      prompt: "符號寶藏是ㄅ，請找到ㄅ。",
      options: ["ㄅ", "ㄉ"],
      correct: "ㄅ",
      success: "找到了！這個符號是ㄅ。",
    },
    親子共讀指字: {
      goal: "把聽到的語詞和書上的圖片、文字連在一起。",
      steps: ["先聽家長念完整句子", "找到句子裡的目標詞", "用手指出圖片或文字"],
      prompt: "家長念到『月亮』時，應該怎麼做？",
      options: ["聽完再指出月亮", "隨便指一個地方"],
      correct: "聽完再指出月亮",
      success: "做得好！先聽完整，再把聲音和圖片、文字連起來。",
    },
    "ㄅ／ㄉ形近辨析": {
      goal: "比較容易看錯的注音符號，練習看完整字形並聽讀音。",
      steps: ["先看四個完整字形", "分別點一下聽讀音", "聽題目後選出指定符號"],
      prompt: "請在四個形近符號中找出ㄅ。",
      options: ["ㄅ", "ㄉ", "ㄇ", "ㄈ"],
      correct: "ㄅ",
      success: "答對了！這個符號是ㄅ；還要留意ㄇ／ㄈ、ㄣ／ㄥ、ㄓ／ㄗ。",
    },
    形狀尋寶: {
      goal: "在生活物品中辨認圓形、三角形與正方形。",
      steps: ["先看任務形狀", "觀察每個物品的外框", "點出相同形狀"],
      prompt: "屋頂像哪一種形狀？",
      options: ["三角形", "圓形", "正方形"],
      correct: "三角形",
      success: "找到了！屋頂有三條邊，像三角形。",
    },
    依顏色大小分類: {
      goal: "同時觀察顏色與大小，把物品放進正確的分類盒。",
      steps: ["先看物品的顏色", "再比較物品的大小", "選出它應該放入的盒子"],
      prompt: "這顆大大的藍色球，要放進哪個盒子？",
      options: ["大藍色盒", "小藍色盒", "大黃色盒"],
      correct: "大藍色盒",
      success: "分類成功！它是藍色，而且比旁邊的球大。",
    },
    唱數與點數實物: {
      goal: "一邊指物品、一邊念數字，建立數量對應。",
      steps: ["從左邊第一個開始", "每點一個只念一個數字", "最後一個數字就是總數"],
      prompt: "圖中有幾顆星星？",
      options: ["3顆", "4顆", "5顆"],
      correct: "4顆",
      success: "數對了！一、二、三、四，共有4顆星星。",
    },
    上下前後動作: {
      goal: "看懂上、下、前、後的位置關係。",
      steps: ["先找到小車", "再找到橋的位置", "說出小車和橋的關係"],
      prompt: "小車在橋的哪裡？",
      options: ["橋上面", "橋下面", "橋後面"],
      correct: "橋下面",
      success: "答對了！小車在橋的下面。",
    },
  };
  const guide = guides[item] || {
    goal: `透過「${item}」練習今天的核心能力。`,
    steps: ["先聽角色示範", "照著畫面完成動作", "完成後說說你發現了什麼"],
    prompt: `準備好進行「${item}」了嗎？`,
    options: ["我完成了", "請再說一次"],
    correct: "我完成了",
    success: "完成了！你已經親自練習這項能力。",
  };
  const questions = activityQuestionSet(item, subject, guide);
  const question = questions[questionIndex % questions.length];
  const visual = activityVisual(item, subject);

  useEffect(() => { setAnswer(null); setQuestionIndex(0); }, [item]);

  const choose = (option: string) => {
    onSpeak(option, speaker);
    if (option === question.correct) {
      setAnswer("correct");
      window.setTimeout(() => onSpeak(question.success, speaker), 180);
    } else {
      setAnswer("retry");
      window.setTimeout(() => onSpeak("再聽一次提示，然後重新試試看。", speaker), 180);
    }
  };

  return (
    <section className="activityDetailPanel" aria-live="polite">
      {subject !== "math" && <>
        <div className="activityDetailHead">
          <div><p className="eyebrow">已開啟的練習</p><h3>活動：{item}</h3><p>{guide.goal}</p></div>
          {!hidePlayGuide && <button className="listen" onClick={() => onSpeak(`${item}。${guide.goal}。${guide.steps.join("。")}`, speaker)}>🔊 聽玩法</button>}
        </div>
        <ol className="activitySteps">{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <figure className="activityVisualScene">
          <figcaption>{visual.caption}</figcaption>
          <div>{visual.cards.map((card) => <button type="button" key={`${card.icon}-${card.label}`} onClick={() => onSpeak((card.icon.match(/[ㄅ-ㄩ]/)?.[0] || card.label), speaker)} aria-label={`聽 ${card.label}`}><i aria-hidden="true">{card.icon}</i><b>{card.label}</b><small>🔊 點一下聽</small></button>)}</div>
        </figure>
      </>}
      {item === "ㄅ／ㄉ形近辨析" && <p className="similarPhonicsNote"><b>還要練習的形近符號：</b>ㄅ／ㄉ、ㄇ／ㄈ、ㄣ／ㄥ、ㄓ／ㄗ、ㄔ／ㄘ、ㄕ／ㄙ</p>}
      <div className="activityChallenge">
        <p className="activityQuestionCount">第 {questionIndex + 1}／{questions.length} 題</p>
        <button className="activityPrompt" onClick={() => onSpeak(question.prompt, speaker)}><b>{question.prompt}</b><small>🔊 點題目可以聽</small></button>
        <ActivityPromptVisual item={item} prompt={question.prompt} />
        <div className="activityOptions">{question.options.map((option) => <button key={option} onClick={() => choose(option)}>{option}<small>🔊 點我聽並選擇</small></button>)}</div>
        {answer === "correct" && <div className="activityFeedback success"><p>⭐ {question.success}</p>{questionIndex < questions.length - 1 ? <button onClick={() => { setQuestionIndex((x) => x + 1); setAnswer(null); }}>下一題 →</button> : <b>這組練習完成了！</b>}</div>}
        {answer === "retry" && <p className="activityFeedback hint">再聽一次題目，看看哪個選項最符合。</p>}
      </div>
    </section>
  );
}

type ActivityQuestion = { prompt: string; options: string[]; correct: string; success: string };

function ActivityPromptVisual({ item, prompt }: { item: string; prompt: string }) {
  let icons: string[] = [];
  let label = "";
  if (/幾顆星星/.test(prompt)) { icons = ["★", "★", "★", "★"]; label = "四顆星星"; }
  else if (/英文兒歌律動/.test(item)) { icons = ["🎵", "👏", "🤸", "🎵"]; label = "聽音樂、拍手、跟著動"; }
  else if (/動物水果繪本/.test(item)) { icons = ["🐱", "🍎", "🐶", "🍌"]; label = "貓、蘋果、狗和香蕉"; }
  else if (/形狀/.test(item + prompt)) { icons = ["●", "▲", "■"]; label = "圓形、三角形、正方形"; }
  else if (/點數|實物/.test(item + prompt)) { icons = ["🚗", "🚗", "🚗", "🚗"]; label = "請一個一個點數"; }
  if (!icons.length) return null;
  return <figure className="activityPromptVisual" aria-label={label}><div>{icons.map((icon, i) => <span key={`${icon}-${i}`}>{icon}</span>)}</div><figcaption>{label}</figcaption></figure>;
}

function activityQuestionSet(item: string, subject: "phonics" | "math" | "english", fallback: ActivityQuestion): ActivityQuestion[] {
  const sets: Record<string, ActivityQuestion[]> = {
    "ㄅ／ㄉ形近辨析": [
      { prompt: "請找出注音符號ㄅ。", options: ["ㄅ", "ㄉ", "ㄇ", "ㄈ"], correct: "ㄅ", success: "找到了！這個符號是ㄅ，請跟著再讀一次。" },
      { prompt: "『媽媽』開頭是哪個符號？", options: ["ㄇ", "ㄈ", "ㄅ"], correct: "ㄇ", success: "媽媽的開頭是ㄇ。" },
      { prompt: "『大象』開頭是哪個符號？", options: ["ㄉ", "ㄅ", "ㄇ"], correct: "ㄉ", success: "大象的開頭是ㄉ。" },
    ],
    "ㄣ／ㄥ聽音辨析": [
      { prompt: "『門』的尾音是哪一個？", options: ["ㄣ", "ㄥ"], correct: "ㄣ", success: "門讀ㄇㄣˊ，尾音是ㄣ。" },
      { prompt: "『風』的尾音是哪一個？", options: ["ㄣ", "ㄥ"], correct: "ㄥ", success: "風讀ㄈㄥ，尾音是ㄥ。" },
      { prompt: "『燈』和哪一個字尾音相同？", options: ["門", "風", "安"], correct: "風", success: "燈和風的尾音都是ㄥ。" },
    ],
    "聲母＋韻母口頭合音": [
      { prompt: "ㄅ和ㄚ合起來，讀什麼？", options: ["ㄅㄚ", "ㄆㄚ", "ㄇㄚ"], correct: "ㄅㄚ", success: "ㄅ—ㄚ，合起來讀ㄅㄚ。" },
      { prompt: "ㄇ和ㄚ合起來，讀什麼？", options: ["ㄇㄚ", "ㄋㄚ", "ㄈㄚ"], correct: "ㄇㄚ", success: "ㄇ—ㄚ，合起來讀ㄇㄚ。" },
      { prompt: "『坡』的開頭和韻母是哪一組？", options: ["ㄆ＋ㄛ", "ㄅ＋ㄛ", "ㄆ＋ㄚ"], correct: "ㄆ＋ㄛ", success: "坡是ㄆ—ㄛ，合起來讀ㄆㄛ。" },
    ],
    "注音賓果與連連看": [
      { prompt: "把『爸爸』和哪個注音開頭連起來？", options: ["ㄅ", "ㄆ", "ㄇ"], correct: "ㄅ", success: "爸爸的開頭是ㄅ。" },
      { prompt: "把『媽媽』和哪個注音開頭連起來？", options: ["ㄇ", "ㄋ", "ㄌ"], correct: "ㄇ", success: "媽媽的開頭是ㄇ。" },
      { prompt: "把『風』和哪個注音開頭連起來？", options: ["ㄈ", "ㄏ", "ㄉ"], correct: "ㄈ", success: "風的開頭是ㄈ。" },
    ],
    形狀尋寶: [
      { prompt: "屋頂像哪一種形狀？", options: ["三角形", "圓形", "正方形"], correct: "三角形", success: "屋頂有三條邊，像三角形。" },
      { prompt: "時鐘像哪一種形狀？", options: ["圓形", "三角形", "長方形"], correct: "圓形", success: "時鐘外框圓圓的，是圓形。" },
      { prompt: "積木的正面像哪一種形狀？", options: ["正方形", "圓形", "三角形"], correct: "正方形", success: "四邊一樣長，像正方形。" },
    ],
    唱數與點數實物: [
      { prompt: "圖中有幾顆星星？", options: ["3顆", "4顆", "5顆"], correct: "4顆", success: "一、二、三、四，共4顆。" },
      { prompt: "三顆蘋果再放一顆，共有幾顆？", options: ["3顆", "4顆", "5顆"], correct: "4顆", success: "3再往後數1個，是4。" },
      { prompt: "從1唱數到5，4的下一個是？", options: ["3", "5", "6"], correct: "5", success: "一、二、三、四、五。" },
    ],
    上下前後動作: [
      { prompt: "小車在橋的哪裡？", options: ["橋上面", "橋下面", "橋後面"], correct: "橋下面", success: "小車在橋下面。" },
      { prompt: "球放在盒子的上方，球在哪裡？", options: ["盒子上面", "盒子裡面", "盒子後面"], correct: "盒子上面", success: "球在盒子上面。" },
      { prompt: "小兔排在小熊前面，誰在前面？", options: ["小兔", "小熊"], correct: "小兔", success: "題目說小兔排在前面。" },
    ],
    依顏色大小分類: [
      { prompt: "大大的藍色球要放進哪個盒子？", options: ["大藍色盒", "小藍色盒", "大黃色盒"], correct: "大藍色盒", success: "它是藍色，而且是大球。" },
      { prompt: "小小的黃色積木要放進哪個盒子？", options: ["小黃色盒", "大黃色盒", "小藍色盒"], correct: "小黃色盒", success: "先看黃色，再看小尺寸。" },
      { prompt: "紅色小車和哪一台應放同一色盒？", options: ["紅色大車", "藍色小車", "黃色大車"], correct: "紅色大車", success: "分類條件是顏色，所以都放紅色盒。" },
    ],
  };
  if (sets[item]) return sets[item];
  if (/聲調|五聲/.test(item)) return [
    { prompt: "『媽』是哪一聲？", options: ["一聲", "二聲", "四聲"], correct: "一聲", success: "媽是平平的一聲。" },
    { prompt: "『麻』是哪一聲？", options: ["二聲", "三聲", "四聲"], correct: "二聲", success: "麻是往上揚的二聲。" },
    { prompt: "『罵』是哪一聲？", options: ["一聲", "三聲", "四聲"], correct: "四聲", success: "罵是往下落的四聲。" },
  ];
  if (/二拼|三拼|結合韻|拼讀/.test(item)) return [
    { prompt: "ㄅ＋ㄚ要讀成？", options: ["ㄅㄚ", "ㄆㄚ", "ㄇㄚ"], correct: "ㄅㄚ", success: "先讀聲母ㄅ，再接韻母ㄚ。" },
    { prompt: "ㄐ＋ㄧ＋ㄚ要讀成？", options: ["ㄐㄧㄚ", "ㄑㄧㄚ", "ㄐㄨㄚ"], correct: "ㄐㄧㄚ", success: "這是聲母、介音、韻母的三拼。" },
    { prompt: "哪一個是結合韻？", options: ["ㄧㄚ", "ㄅ", "ㄓ"], correct: "ㄧㄚ", success: "ㄧ和ㄚ結合成ㄧㄚ。" },
  ];
  if (/37符號|符號、筆順|看形即讀/.test(item)) return [
    { prompt: "『爸爸』開頭是哪個符號？", options: ["ㄅ", "ㄆ", "ㄉ"], correct: "ㄅ", success: "爸爸的開頭是ㄅ。" },
    { prompt: "『媽媽』開頭是哪個符號？", options: ["ㄇ", "ㄈ", "ㄋ"], correct: "ㄇ", success: "媽媽的開頭是ㄇ。" },
    { prompt: "『小魚』的『魚』是哪個符號？", options: ["ㄩ", "ㄨ", "ㄧ"], correct: "ㄩ", success: "魚讀ㄩˊ。" },
  ];
  if (/國字|短文|橋樑書|童詩|閱讀/.test(item)) return [
    { prompt: "『小狗在門口。』這句話裡，誰在門口？", options: ["小狗", "小貓", "小鳥"], correct: "小狗", success: "句子說小狗在門口。" },
    { prompt: "『月亮出來了。』什麼出來了？", options: ["月亮", "太陽", "星隊長"], correct: "月亮", success: "從句子中找到月亮。" },
    { prompt: "『我愛我的家。』這句話表達什麼？", options: ["喜歡家人", "想吃東西", "準備睡覺"], correct: "喜歡家人", success: "『愛我的家』是在表達對家人的喜愛。" },
  ];
  if (/鍵盤|輸入/.test(item)) return [
    { prompt: "要打出『爸』，先找哪個聲母鍵？", options: ["ㄅ", "ㄆ", "ㄇ"], correct: "ㄅ", success: "爸的聲母是ㄅ。" },
    { prompt: "要打出『媽』，需要ㄇ和哪個韻母？", options: ["ㄚ", "ㄛ", "ㄜ"], correct: "ㄚ", success: "媽的拼音是ㄇㄚ。" },
    { prompt: "打完注音後，下一步通常要做什麼？", options: ["選正確國字", "關掉鍵盤", "隨便按數字"], correct: "選正確國字", success: "從候選字中選出正確國字。" },
  ];
  if (/日記|小故事|總複習|正音/.test(item)) return [
    { prompt: "寫日記的第一句，可以先寫什麼？", options: ["今天的日期或天氣", "一長串數字", "別人的名字"], correct: "今天的日期或天氣", success: "日期或天氣能幫助開始記錄。" },
    { prompt: "『今天我很開心。』哪個詞是心情？", options: ["開心", "今天", "我"], correct: "開心", success: "開心是在說感受。" },
    { prompt: "讀完自己寫的句子後，要做什麼？", options: ["再讀一次檢查", "立刻擦掉", "不看內容"], correct: "再讀一次檢查", success: "重讀可以檢查漏字和讀音。" },
  ];
  if (subject === "math") return mathActivityQuestions(item);
  if (subject === "english") return englishActivityQuestions(item);
  return [fallback, { ...fallback, prompt: `${item}第二題：請依照示範完成一次。`, success: `完成${item}第二題。` }, { ...fallback, prompt: `${item}第三題：請說出你觀察到的重點。`, success: `完成${item}第三題。` }];
}

function activityVisual(item: string, subject: "phonics" | "math" | "english") {
  const exact: Record<string, { caption: string; cards: { icon: string; label: string }[] }> = {
    兒歌找押韻: { caption: "看圖片，聽聽『貓』和『帽』", cards: [{ icon: "🐱", label: "小貓" }, { icon: "🎩", label: "草帽" }] },
    童謠語調模仿: { caption: "跟著星星的高低念童謠", cards: [{ icon: "⭐", label: "高音" }, { icon: "✨", label: "輕聲" }, { icon: "🌙", label: "低音" }] },
    符號尋寶: { caption: "從符號卡中找到寶藏ㄅ", cards: [{ icon: "ㄅ", label: "目標" }, { icon: "ㄉ", label: "仔細分辨" }, { icon: "🔍", label: "尋寶放大鏡" }] },
    親子共讀指字: { caption: "家長念到月亮時，指出圖片和『月』字", cards: [{ icon: "📖", label: "先聽完整句" }, { icon: "🌙", label: "月亮圖片" }, { icon: "月", label: "月字" }] },
    "ㄅ／ㄉ形近辨析": { caption: "先看完整字形，再逐一點讀音分辨", cards: [{ icon: "ㄅ", label: "讀ㄅ" }, { icon: "ㄉ", label: "讀ㄉ" }, { icon: "ㄇ", label: "讀ㄇ" }, { icon: "ㄈ", label: "讀ㄈ" }] },
    "ㄣ／ㄥ聽音辨析": { caption: "看口形、聽尾音", cards: [{ icon: "👄", label: "ㄣ：舌尖收音" }, { icon: "👅", label: "ㄥ：舌根收音" }] },
    唱數與點數實物: { caption: "用手依序點，每顆只數一次", cards: [{ icon: "⭐", label: "1" }, { icon: "⭐", label: "2" }, { icon: "⭐", label: "3" }, { icon: "⭐", label: "4" }] },
    形狀尋寶: { caption: "找出屋頂的形狀", cards: [{ icon: "🏠", label: "觀察屋頂" }, { icon: "🔺", label: "三角形" }, { icon: "🔵", label: "圓形" }, { icon: "🟦", label: "正方形" }] },
    上下前後動作: { caption: "觀察小車和橋的位置", cards: [{ icon: "🌉", label: "橋在上面" }, { icon: "🚗", label: "小車在下面" }] },
    依顏色大小分類: { caption: "先看顏色，再看大小", cards: [{ icon: "🔵", label: "大藍球" }, { icon: "🔹", label: "小藍球" }, { icon: "🟡", label: "大黃球" }, { icon: "🧺", label: "分類盒" }] },
  };
  if (exact[item]) return exact[item];
  if (/形|角度|面積|體積|位置|上下|前後/.test(item)) return { caption: "看圖觀察形狀與位置", cards: [{ icon: "🔺", label: "三角形" }, { icon: "🟦", label: "正方形" }, { icon: "⚪", label: "圓形" }] };
  if (/數|加減|乘|除|分數|小數|比例|因數|倍數/.test(item)) return { caption: "用圖像把數量看清楚", cards: [{ icon: "🍎", label: "一個" }, { icon: "🍎🍎", label: "兩個" }, { icon: "🔢", label: "再算一算" }] };
  if (/分類|規律|統計|圖/.test(item)) return { caption: "先觀察共同特徵，再分類或比較", cards: [{ icon: "🔵", label: "藍色一組" }, { icon: "🟨", label: "黃色一組" }, { icon: "🧺", label: "放入分類盒" }] };
  if (subject === "english") return { caption: "看圖片、聽英文，再做動作", cards: [{ icon: "👂", label: "Listen" }, { icon: "🖼️", label: "Look" }, { icon: "🗣️", label: "Say" }, { icon: "🤸", label: "Move" }] };
  if (subject === "phonics") return { caption: "看符號、聽讀音，再拼一拼", cards: [{ icon: "👀", label: "看符號" }, { icon: "👂", label: "聽聲音" }, { icon: "🗣️", label: "開口讀" }] };
  return { caption: "看圖操作示範", cards: [{ icon: "👀", label: "先觀察" }, { icon: "👆", label: "再操作" }, { icon: "💡", label: "說出發現" }] };
}

function mathActivityQuestions(item: string): ActivityQuestion[] {
  if (/加減|混合計算/.test(item)) return [
    { prompt: "8＋5等於多少？", options: ["12", "13", "14"], correct: "13", success: "8加5等於13。" },
    { prompt: "15－7等於多少？", options: ["7", "8", "9"], correct: "8", success: "15減7等於8。" },
    { prompt: "商店有20顆糖，賣掉6顆，還有幾顆？", options: ["14顆", "15顆", "16顆"], correct: "14顆", success: "20減6等於14。" },
  ];
  if (/乘|九九/.test(item)) return [
    { prompt: "3組蘋果，每組2顆，共幾顆？", options: ["5顆", "6顆", "8顆"], correct: "6顆", success: "3個2相加是6，也就是3乘2。" },
    { prompt: "4×5等於多少？", options: ["18", "20", "24"], correct: "20", success: "四五二十。" },
    { prompt: "2、4、6、8，下一個數是？", options: ["9", "10", "12"], correct: "10", success: "每次增加2，所以下一個是10。" },
  ];
  if (/除|分數|小數/.test(item)) return [
    { prompt: "12顆糖平均分給3人，每人幾顆？", options: ["3顆", "4顆", "6顆"], correct: "4顆", success: "12除以3等於4。" },
    { prompt: "一個披薩切成4等份，拿1份是？", options: ["二分之一", "四分之一", "四分之三"], correct: "四分之一", success: "全部4份中的1份是四分之一。" },
    { prompt: "0.5和0.8哪個比較大？", options: ["0.5", "0.8", "一樣大"], correct: "0.8", success: "十分位的8比5大。" },
  ];
  if (/形|角|周長|面積|體積/.test(item)) return [
    { prompt: "有三條邊的圖形是？", options: ["三角形", "正方形", "圓形"], correct: "三角形", success: "三角形有三條邊。" },
    { prompt: "正方形有幾個直角？", options: ["2個", "3個", "4個"], correct: "4個", success: "正方形有4個直角。" },
    { prompt: "長4公分、寬3公分的長方形，面積是？", options: ["7平方公分", "12平方公分", "14平方公分"], correct: "12平方公分", success: "4乘3等於12平方公分。" },
  ];
  if (/測|容量|直尺/.test(item)) return [
    { prompt: "量鉛筆長度要使用哪個工具？", options: ["直尺", "量杯", "體重計"], correct: "直尺", success: "長度可以用直尺測量。" },
    { prompt: "比較水的容量要使用？", options: ["量杯", "時鐘", "溫度計"], correct: "量杯", success: "量杯可以比較容量。" },
    { prompt: "從直尺0到8，長度是多少？", options: ["7公分", "8公分", "9公分"], correct: "8公分", success: "從0開始量到8，是8公分。" },
  ];
  if (/分類|排序|規律|統計|圖/.test(item)) return [
    { prompt: "紅、藍、紅、藍，下一個顏色是？", options: ["紅", "藍", "黃"], correct: "紅", success: "規律是紅藍重複。" },
    { prompt: "蘋果、香蕉和小車，哪個不屬於水果？", options: ["蘋果", "香蕉", "小車"], correct: "小車", success: "小車不是水果。" },
    { prompt: "2、5、8依照由小到大排序，最前面是？", options: ["2", "5", "8"], correct: "2", success: "2是三個數中最小的。" },
  ];
  return [
    { prompt: `${item}：先完成第一個示範，準備好了嗎？`, options: ["準備好了", "再看一次"], correct: "準備好了", success: "第一題完成。" },
    { prompt: `${item}：把相同特徵的物品放在一起。`, options: ["完成了", "還沒完成"], correct: "完成了", success: "第二題完成。" },
    { prompt: `${item}：說出剛才使用的數學方法。`, options: ["我說完了", "請再提示"], correct: "我說完了", success: "第三題完成。" },
  ];
}

function englishActivityQuestions(item: string): ActivityQuestion[] {
  if (/字母|發音|拼讀|長元音/.test(item)) return [
    { prompt: "cat的開頭字母是？", options: ["C", "B", "D"], correct: "C", success: "Cat starts with C. C says /k/." },
    { prompt: "apple的開頭字母是？", options: ["A", "E", "O"], correct: "A", success: "Apple starts with A." },
    { prompt: "dog的結尾字母是？", options: ["D", "O", "G"], correct: "G", success: "Dog ends with G." },
  ];
  if (/TPR|指令|動作/.test(item)) return [
    { prompt: "聽到Jump要做什麼？", options: ["跳一跳", "坐下", "拍手"], correct: "跳一跳", success: "Jump就是跳。" },
    { prompt: "聽到Clap your hands要做什麼？", options: ["拍手", "轉圈", "喝水"], correct: "拍手", success: "Clap your hands就是拍拍手。" },
    { prompt: "聽到Sit down要做什麼？", options: ["坐下", "站高高", "跑步"], correct: "坐下", success: "Sit down就是坐下。" },
  ];
  if (/招呼|對話|問句/.test(item)) return [
    { prompt: "早上見到老師可以說？", options: ["Good morning!", "Good night!", "Goodbye!"], correct: "Good morning!", success: "早上問好說Good morning。" },
    { prompt: "想知道名字可以問？", options: ["What's your name?", "How old is it?", "Where is it?"], correct: "What's your name?", success: "What's your name是詢問名字。" },
    { prompt: "離開時可以說？", options: ["Goodbye!", "Thank you!", "Sit down!"], correct: "Goodbye!", success: "離開時可以說Goodbye。" },
  ];
  return [
    { prompt: `${item}第一題：看圖片並跟讀一次。`, options: ["I did it!", "Play again"], correct: "I did it!", success: "Great listening!" },
    { prompt: `${item}第二題：選一個你聽到的單字。`, options: ["I found it!", "Help me"], correct: "I found it!", success: "Great job!" },
    { prompt: `${item}第三題：用完整聲音說一次。`, options: ["I said it!", "One more time"], correct: "I said it!", success: "Wonderful speaking!" },
  ];
}

function missionIcon(subject: GrowthMission["subject"], index: number) {
  const sets: Record<GrowthMission["subject"], string[]> = {
    國語: ["🔎", "👂", "🧩", "🖼️", "💬"],
    數學: ["🔢", "🧮", "🧩", "📏", "🔁"],
    生活: ["🎒", "🙋", "🕒", "🤝", "✅"],
    探索: ["🔎", "🧭", "🧪", "🛠️", "⭐"],
  };
  return sets[subject][index % sets[subject].length];
}

function answerExplanation(mission: GrowthMission, prompt: string, answer: string) {
  if (prompt.includes("爸爸") && answer === "ㄅ")
    return "答對了！『爸』的注音是ㄅㄚˋ，開頭的符號是ㄅ。";
  if (prompt.includes("『媽』") && answer === "ㄚ")
    return "答對了！『媽』的注音是ㄇㄚ，最後聽到的音是ㄚ。";
  if (prompt.includes("『魚』"))
    return `答對了！『魚』的注音是ㄩˊ，正確答案是「${answer}」。`;
  return `答對了！正確答案是「${answer}」。${mission.story}`;
}

function GrowthCourse({
  stage,
  profile,
  onSpeak,
  onBack,
  onComplete,
}: {
  stage: GrowthStageId;
  profile: Profile;
  onSpeak: (text: string, who?: CharName) => void;
  onBack: () => void;
  onComplete: (mission: GrowthMission) => void;
}) {
  const worlds = growthWorlds(stage),
    missions = growthMissions.filter((m) => m.stage === stage),
    info = growthStages.find((s) => s[0] === stage)!;
  const [world, setWorld] = useState<string | null>(null),
    [mission, setMission] = useState<GrowthMission | null>(null),
    [round, setRound] = useState(0),
    [answered, setAnswered] = useState(false),
    [selectedAnswer, setSelectedAnswer] = useState<string | null>(null),
    [tip, setTip] = useState("");
  const openMission = (m: GrowthMission) => {
    setMission(m);
    setRound(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setTip("");
  };
  const replay = () => {
    setRound(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setTip("");
  };
  const pick = (answer: string) => {
    if (!mission) return;
    const q = mission.questions[round];
    if (answer !== q.answer) {
      setTip(q.hint);
      return;
    }
    setAnswered(true);
    setTip(answerExplanation(mission, q.prompt, q.answer));
  };
  const finishRound = () => {
    if (!mission) return;
    if (round === 0) {
      setRound(1);
      setAnswered(false);
      setSelectedAnswer(null);
      setTip("");
    } else {
      onComplete(mission);
      setTip("兩回合都完成了，獲得一顆成長星！");
    }
  };
  if (mission) {
    const q = mission.questions[round],
      done = profile.growthCompleted.includes(mission.id),
      speaker: CharName =
        mission.subject === "國語"
          ? "旋風"
          : mission.subject === "數學"
            ? "大力"
            : mission.subject === "生活"
              ? "星隊長"
              : "挖挖";
    return (
      <section className="content courseMission">
        <div className="courseTop">
          <button className="textBack" onClick={() => setMission(null)}>
            ← 返回{world}
          </button>
          <button className="replayMission" onClick={replay}>
            ↻ 重新玩這一課
          </button>
        </div>
        <div className="courseStory">
          <div className="courseStorySpeaker">
            <Character name={speaker} />
            <button
              className="courseSoundSymbol"
              onClick={() => onSpeak(mission.worldIcon, speaker)}
              aria-label={`播放${mission.worldIcon}的讀音`}
            >
              {mission.worldIcon}
              <small>🔊 點我聽</small>
            </button>
          </div>
          <div>
            <p className="eyebrow">
              {mission.subject} · {mission.world}
            </p>
            <h1>{mission.title}</h1>
            <button
              className="courseStoryText"
              onClick={() => onSpeak(mission.story, speaker)}
              aria-label={`播放${speaker}的故事`}
            >
              <b>{speaker}：</b>{mission.story}
              <small>🔊 點故事可以聽</small>
            </button>
          </div>
        </div>
        <div className="courseQuestion">
          <p className="eyebrow">
            第 {round + 1}/2 回合 · {round === 0 ? "理解概念" : "生活應用"}
          </p>
          <button
            className="coursePromptSpeak"
            onClick={() => onSpeak(q.prompt, speaker)}
            aria-label="播放題目"
          >
            <span>🔊</span>
            <h2>{q.prompt}</h2>
            <small>點題目可以聽</small>
          </button>
          <div className="courseAnswers">
            {q.options.map((o) => (
              <button
                key={o}
                disabled={answered}
                className={selectedAnswer === o ? "selected" : ""}
                onClick={() => {
                  setSelectedAnswer(o);
                  onSpeak(o, speaker);
                }}
                aria-pressed={selectedAnswer === o}
              >
                {o}
                <small>🔊 點我聽</small>
              </button>
            ))}
          </div>
          {!answered && selectedAnswer && (
            <button className="primary" onClick={() => pick(selectedAnswer)}>
              選這個答案 →
            </button>
          )}
          {tip && <p className="trialTip">{tip}</p>}
          {answered && round === 0 && (
            <button className="primary" onClick={finishRound}>
              前往生活應用 →
            </button>
          )}
          {answered && round === 1 && !done && (
            <button className="primary" onClick={finishRound}>
              完成課程，領取成長星
            </button>
          )}
          {(done || tip.includes("成長星")) && (
            <div className="courseComplete">
              <b>★ 已完成</b>
              <button onClick={() => setMission(null)}>選下一項任務</button>
            </div>
          )}
        </div>
      </section>
    );
  }
  if (world)
    return (
      <section className="content courseWorld">
        <button className="textBack" onClick={() => setWorld(null)}>
          ← 返回主題世界
        </button>
        <p className="eyebrow">
          {info[1]} · {world}
        </p>
        <h1>選一項任務開始</h1>
        <div className="courseMissionGrid">
          {missions
            .filter((m) => m.world === world)
            .map((m, i) => (
              <button
                key={m.id}
                className={profile.growthCompleted.includes(m.id) ? "done" : ""}
                onClick={() => openMission(m)}
              >
                <span>
                  {profile.growthCompleted.includes(m.id) ? "✓" : i + 1}
                </span>
                <i className="courseChallengeIcon" aria-hidden="true">
                  {missionIcon(m.subject, i)}
                </i>
                <small>{m.subject}</small>
                <b>{m.title}</b>
                <em>
                  {profile.growthCompleted.includes(m.id)
                    ? "可以重玩"
                    : "約 3–5 分鐘"}
                </em>
              </button>
            ))}
        </div>
      </section>
    );
  return (
    <section className="content courseLobby">
      <div className="sectionHead">
        <div>
          <p className="eyebrow">成長型教材完整課程</p>
          <h1>{info[1]}</h1>
          <p>{info[2]} · 每個世界包含國語、數學、生活或探索任務。</p>
        </div>
        <div className="growthStarPill">★ {profile.growthStars} 顆成長星</div>
      </div>
      <button className="textBack" onClick={onBack}>
        ← 返回成長地圖
      </button>
      <div className="courseWorldGrid">
        {worlds.map((w, i) => {
          const items = missions.filter((m) => m.world === w.name),
            done = items.filter((m) =>
              profile.growthCompleted.includes(m.id),
            ).length;
          return (
            <button key={w.name} onClick={() => setWorld(w.name)}>
              <i>{w.icon}</i>
              <small>主題世界 {i + 1}</small>
              <b>{w.name}</b>
              <span>{done}/5 已完成</span>
              <em style={{ "--progress": `${(done / 5) * 100}%` } as any} />
            </button>
          );
        })}
      </div>
      <div className="courseSummary">
        <b>本階段共 {missions.length} 項任務</b>
        <span>
          已完成{" "}
          {
            missions.filter((m) => profile.growthCompleted.includes(m.id))
              .length
          }{" "}
          項
        </span>
        <span>所有任務都能不限次數重玩</span>
      </div>
    </section>
  );
}

function Scene({
  who,
  title,
  children,
}: {
  who: CharName;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sceneLayout">
      <Character name={who} />
      <div className="sceneContent">
        <p className="eyebrow">{title}</p>
        {children}
      </div>
    </div>
  );
}
function ChallengeHead({ m, index, children }: any) {
  const c = m.visualChallenges[index];
  return (
    <div className="challengeWrap">
      <div className="challengeIntro">
        <Character
          name={m.characters[index % 2] as CharName}
          state="think"
          small
        />
        <div>
          <p className="eyebrow">互動闖關 {index + 1}/2</p>
          <h2>{c.title}</h2>
          <p>{c.prompt}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
function Picture({
  day,
  ok,
  label,
  onClick,
}: {
  day: number;
  ok: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button className="pictureCard behaviorCard" onClick={onClick}>
      <BehaviorPicture day={day} ok={ok} />
      <b>{label}</b>
      <small>點一下選擇</small>
    </button>
  );
}
function BehaviorPicture({ day, ok }: { day: number; ok: boolean }) {
  const mission = enhancedMissions[day - 1];
  const alt = ok ? mission.correct : mission.wrong;
  return (
    <img
      className="behaviorPicture"
      src={publicAsset(
        `scenes/day-${String(day).padStart(2, "0")}-${ok ? "good" : "bad"}.webp`,
      )}
      alt={alt}
    />
  );
}
function MonsterPicture({ name, power }: { name: string; power: number }) {
  const mark: Record<string, string> = {
    搶話泡泡: "話",
    牙菌小怪: "菌",
    灰塵雲: "塵",
    混亂團: "亂",
    時間迷霧: "時",
    拖延雲: "拖",
    皺衣球: "衣",
    髒污泡泡: "髒",
    偏食雲: "食",
    冒失球: "衝",
    急躁螺絲: "急",
    生氣火球: "氣",
    家事亂流: "家",
    忘記怪: "忘",
  };
  if (power === 0)
    return (
      <svg
        className="monsterPicture"
        viewBox="0 0 150 120"
        role="img"
        aria-label="合作星星"
      >
        <path
          d="M75 10l16 34 38 5-28 26 8 37-34-19-34 19 8-37-28-26 38-5z"
          fill="#ffd15c"
          stroke="#9f6710"
          strokeWidth="6"
        />
        <circle cx="62" cy="64" r="4" fill="#173b54" />
        <circle cx="88" cy="64" r="4" fill="#173b54" />
        <path
          d="M62 76q13 12 26 0"
          fill="none"
          stroke="#173b54"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  return (
    <svg
      className="monsterPicture"
      viewBox="0 0 150 120"
      role="img"
      aria-label={`${name}圖案`}
    >
      <path
        d="M38 92C12 86 15 56 35 51C27 24 58 10 76 29C96 8 126 26 119 52C143 61 135 94 111 94Z"
        fill={power === 2 ? "#d7e8ed" : "#edf3dd"}
        stroke="#2b718b"
        strokeWidth="6"
      />
      <path
        d="M31 43h43l12 12-12 12H31c-12 0-12-24 0-24Z"
        fill="#fff"
        stroke="#f0a52f"
        strokeWidth="4"
      />
      <path
        d="M76 24h39c12 0 12 24 0 24H88L76 58Z"
        fill="#fff"
        stroke="#f0a52f"
        strokeWidth="4"
      />
      <text
        x="76"
        y="91"
        textAnchor="middle"
        fontSize="31"
        fontWeight="900"
        fill="#173b54"
      >
        {mark[name] || "困"}
      </text>
    </svg>
  );
}
function MathStation({
  day,
  age,
  profile,
  activity,
  domain,
  round,
  answered,
  feedback,
  onBack,
  onDomain,
  onActivity,
  onPick,
  onNextRound,
  onFinish,
  onTutorial,
  onSpeak,
}: any) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  useEffect(() => setSelectedOption(null), [activity?.id, round]);
  const selectActivity = onActivity;
  onActivity = (item: MathActivity | null) =>
    item ? selectActivity(item) : onDomain(activity?.domain || domain);
  const recommended = recommendedMath[day - 1],
    recommendedItem = mathActivities.find((x) => x.id === recommended)!;
  if (activity) {
    const question = (age === 3 ? activity.three : activity.five)[round];
    return (
      <div className="learningStation mathGame">
        <button className="textBack" onClick={() => onActivity(null)}>
          ← 換一個數學主題
        </button>
        <p className="eyebrow">
          {activity.title} · 第 {round + 1}/2 回合
        </p>
        <h2>{question.prompt}</h2>
        <button className="tutorialBtn" onClick={onTutorial}>
          👆 再看一次玩法示範
        </button>
        <button
          type="button"
          className="mathScene mathPromptAudio"
          onClick={() => onSpeak(`題目：${question.prompt}。${question.visual}`)}
          aria-label={`播放題目：${question.prompt}`}
        >
          <b>{question.visual}</b>
          {activity.id === "money" && (
            <div className="coinSet">
              <i>1</i>
              <i>5</i>
              <i>10</i>
            </div>
          )}
          <span className="tapToHear">🔊 點題目聽一次</span>
        </button>
        <div className="mathAnswerGrid">
          {question.options.map((o: string) => (
            <button
              key={o}
              disabled={answered}
              className={selectedOption === o ? "selected" : ""}
              onClick={() => {
                setSelectedOption(o);
                onSpeak(`選項：${o}`);
              }}
            >
              <b>{o}</b>
              <small>🔊 點一下聽</small>
            </button>
          ))}
        </div>
        {!answered && selectedOption && (
          <button
            className="primary mathConfirmAnswer"
            onClick={() => onPick(selectedOption)}
          >
            選這個答案：{selectedOption}
          </button>
        )}
        <Feedback text={feedback} />
        {answered &&
          (round === 0 ? (
            <Next onClick={onNextRound} label="前往生活應用挑戰" />
          ) : (
            <Next onClick={onFinish} label="兩回合完成，回基地" />
          ))}
      </div>
    );
  }
  if (domain) {
    const info = mathDomains.find((x) => x.id === domain)!;
    return (
      <div className="learningStation">
        <button className="textBack" onClick={() => onDomain(null)}>
          ← 返回四大領域
        </button>
        <p className="eyebrow" style={{ color: info.color }}>
          {info.title}領域
        </p>
        <h2>想玩哪一個主題？</h2>
        <div className="conceptGrid">
          {mathActivities
            .filter((x) => x.domain === domain)
            .map((x) => (
              <button
                key={x.id}
                className={x.id === recommended ? "recommended" : ""}
                onClick={() => onActivity(x)}
              >
                <i style={{ background: info.color }}>{info.mark}</i>
                <b>{x.title}</b>
                <small>{x.subtitle}</small>
                {profile.mathConceptProgress.includes(x.id) && <em>已接觸</em>}
              </button>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="learningStation mathLobby">
      <button className="textBack" onClick={onBack}>
        ← 換一座支援站
      </button>
      <p className="eyebrow">數學補給站 · 每日最多兩顆星</p>
      <h2>四大數學領域，自由選一區</h2>
      <button
        className="recommendedMission"
        onClick={() => {
          onDomain(recommendedItem.domain);
          onActivity(recommendedItem);
        }}
      >
        <span>今日推薦</span>
        <b>
          第 {day} 天 · {recommendedItem.title}
        </b>
        <small>{recommendedItem.subtitle}</small>
      </button>
      <div className="mathDomainGrid">
        {mathDomains.map((d) => (
          <button
            key={d.id}
            style={{ "--domain": d.color } as any}
            onClick={() => onDomain(d.id)}
          >
            <i>{d.mark}</i>
            <b>{d.title}</b>
            <small>{d.skills}</small>
            <em>
              {
                mathActivities.filter(
                  (x) =>
                    x.domain === d.id &&
                    profile.mathConceptProgress.includes(x.id),
                ).length
              }
              /{mathActivities.filter((x) => x.domain === d.id).length} 已接觸
            </em>
          </button>
        ))}
      </div>
    </div>
  );
}
function LiteracyStation({
  day,
  age,
  phonics,
  lesson,
  stage,
  page,
  profile,
  voice,
  onBack,
  onStage,
  onPage,
  onPhonics,
  onComplete,
  onFinish,
}: any) {
  const nextLesson = literacyLessons[day % literacyLessons.length],
    correctFirst = day % 2 === 1;
  if (stage === 0)
    return (
      <div className="learningStation literacy">
        <button className="textBack" onClick={onBack}>
          ← 換一座支援站
        </button>
        <LiteracyProgress stage={0} />
        <p className="eyebrow">第一站 · 注音聽音與認形</p>
        <h2>
          {day === 14 ? "37 個注音總複習" : `今天認識 ${phonics.join("、")}`}
        </h2>
        <div className={`phonicsSet ${day === 14 ? "all" : ""}`}>
          {phonics.map((p: string) => (
            <button key={p} onClick={() => voice.speak(p, "旋風")}>
              {p}
              <small>點我聽音</small>
            </button>
          ))}
        </div>
        <button className="checkBtn" onClick={onPhonics}>
          {profile.phonics.includes(day)
            ? "再次進入識字繪本"
            : "完成注音，前往識字繪本"}
        </button>
      </div>
    );
  if (stage === 1) {
    const p = lesson.pages[page];
    return (
      <div className="learningStation literacy">
        <LiteracyProgress stage={1} />
        <p className="eyebrow">五頁互動識字繪本 · {page + 1}/5</p>
        <h2>今天的生字是「{lesson.char}」</h2>
        <div className="storybook">
          <img src={publicAsset(p.image)} alt={p.text} />
          <div>
            <b>{lesson.char}</b>
            <p>{p.text}</p>
            <VoiceButton
              onClick={() => voice.speak(p.text, "旋風")}
              label="聽這一頁"
            />
          </div>
        </div>
        <div className="pageDots">
          {lesson.pages.map((_: any, i: number) => (
            <button
              key={i}
              className={i === page ? "active" : ""}
              onClick={() => onPage(i)}
              aria-label={`第${i + 1}頁`}
            />
          ))}
        </div>
        <div className="bookControls">
          <button disabled={page === 0} onClick={() => onPage(page - 1)}>
            上一頁
          </button>
          {page < 4 ? (
            <button className="primary" onClick={() => onPage(page + 1)}>
              下一頁
            </button>
          ) : (
            <button className="primary" onClick={() => onStage(2)}>
              繪本看完，找生字
            </button>
          )}
        </div>
      </div>
    );
  }
  if (stage === 2) {
    const cards = correctFirst ? [lesson, nextLesson] : [nextLesson, lesson];
    return (
      <div className="learningStation literacy">
        <LiteracyProgress stage={2} />
        <p className="eyebrow">看圖認字</p>
        <h2>哪一張圖最適合「{lesson.char}」？</h2>
        <div className="wordPictureChoices">
          {cards.map((x: any, i: number) => (
            <button
              key={x.char}
              onClick={() =>
                x.char === lesson.char
                  ? onStage(3)
                  : voice.speak(
                      `再看看，${lesson.char}和${lesson.meaning}有關。`,
                      "旋風",
                    )
              }
            >
              <img src={publicAsset(x.pages[0].image)} alt={`圖卡${i + 1}`} />
              <span>圖卡 {i + 1}</span>
            </button>
          ))}
        </div>
        <p className="wordMeaning">
          <strong>{lesson.char}</strong>
          <span>{lesson.meaning}</span>
        </p>
      </div>
    );
  }
  if (stage === 3)
    return (
      <div className="learningStation literacy">
        <LiteracyProgress stage={3} />
        <p className="eyebrow">讀詞說一句</p>
        <h2>先點讀詞語，再選一個說一句</h2>
        <div className="wordCards">
          {lesson.words.map((w: string) => (
            <button key={w} onClick={() => voice.speak(w, "旋風")}>
              <b>{w}</b>
              <small>點一下聽詞語</small>
            </button>
          ))}
        </div>
        <div className="sentencePrompt">
          <span>角色示範</span>
          <b>「{lesson.sample}」</b>
          <VoiceButton
            onClick={() => voice.speak(lesson.sample, "旋風")}
            label="聽示範句"
          />
        </div>
        <button className="primary" onClick={() => onStage(4)}>
          我說完了，去寫字
        </button>
      </div>
    );
  if (stage === 4)
    return (
      <div className="learningStation literacy">
        <LiteracyProgress stage={4} />
        <p className="eyebrow">遊戲寫字 · {age}歲模式</p>
        <h2>
          {age === 3 ? "沿著淡淡的字描一描" : "先看筆順，再在田字格寫一次"}
        </h2>
        <WritingPad
          char={lesson.char}
          trace={age === 3}
          onComplete={() => {
            onComplete();
            onStage(5);
          }}
        />
      </div>
    );
  return (
    <div className="learningStation literacyComplete">
      <LiteracyProgress stage={5} />
      <div className="bigCharacter">{lesson.char}</div>
      <h2>今天學會「{lesson.char}」！</h2>
      <p>
        {lesson.meaning} · {lesson.words.join("、")}
      </p>
      <p className="feedback">注音星和識字星都保存好了。</p>
      <button className="textBack" onClick={() => onStage(1)}>
        再看一次繪本
      </button>
      <Next onClick={onFinish} label="完成，回基地" />
    </div>
  );
}
function LiteracyProgress({ stage }: { stage: number }) {
  return (
    <div className="literacyProgress">
      {["注音", "繪本", "認字", "詞語", "寫字"].map((x, i) => (
        <span key={x} className={stage >= i ? "on" : ""}>
          <i>{stage > i ? "✓" : i + 1}</i>
          {x}
        </span>
      ))}
    </div>
  );
}
function WritingPad({
  char,
  trace,
  onComplete,
  completeLabel = "寫好了，完成識字",
}: {
  char: string;
  trace: boolean;
  onComplete: () => void;
  completeLabel?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null),
    drawing = useRef(false),
    strokes = useRef<ImageData[]>([]),
    [marks, setMarks] = useState(0),
    [showGuide, setShowGuide] = useState(true);
  const point = (e: any) => {
    const c = canvasRef.current!,
      r = c.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) * c.width) / r.width,
      y: ((e.clientY - r.top) * c.height) / r.height,
    };
  };
  const start = (e: any) => {
    e.preventDefault();
    const c = canvasRef.current!,
      ctx = c.getContext("2d")!;
    strokes.current.push(ctx.getImageData(0, 0, c.width, c.height));
    drawing.current = true;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    c.setPointerCapture?.(e.pointerId);
  };
  const move = (e: any) => {
    if (!drawing.current) return;
    e.preventDefault();
    const c = canvasRef.current!,
      ctx = c.getContext("2d")!,
      p = point(e);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = "#174d66";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };
  const end = () => {
    if (drawing.current) {
      drawing.current = false;
      setMarks((x) => x + 1);
    }
  };
  const clear = () => {
    const c = canvasRef.current!,
      ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    strokes.current = [];
    setMarks(0);
  };
  const undo = () => {
    const c = canvasRef.current!,
      ctx = c.getContext("2d")!,
      last = strokes.current.pop();
    if (last) {
      ctx.putImageData(last, 0, 0);
      setMarks((x) => Math.max(0, x - 1));
    }
  };
  return (
    <div className="writingGame">
      <div className="tianGrid">
        <span className={`${showGuide ? "show" : ""} ${trace ? "trace" : ""}`}>
          {char}
        </span>
        <canvas
          ref={canvasRef}
          width="520"
          height="520"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          onPointerLeave={end}
        />
      </div>
      <div className="writingTools">
        <button onClick={() => setShowGuide((x) => !x)}>
          {showGuide ? "隱藏範字" : "看筆順範字"}
        </button>
        <button onClick={undo} disabled={!marks}>
          復原一筆
        </button>
        <button onClick={clear} disabled={!marks}>
          全部清除
        </button>
      </div>
      <p>
        {trace
          ? "用手指沿著淡淡的字慢慢描。"
          : "看完範字後，也可以隱藏範字自己寫。"}
      </p>
      <button className="primary" disabled={marks < 1} onClick={onComplete}>
        {completeLabel}
      </button>
    </div>
  );
}
function Feedback({ text }: { text: string }) {
  return text ? <p className="feedback">{text}</p> : null;
}
function Next({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button className="primary nextBtn" onClick={onClick}>
      {label} →
    </button>
  );
}
function VoiceButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button className="listen" onClick={onClick}>
      🔊 {label}
    </button>
  );
}
function TutorialButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="tutorialBtn" onClick={onClick}>
      👆 再看一次玩法示範
    </button>
  );
}
function ActionGuide({ items }: { items: string[] }) {
  return (
    <div className="actionGuide">
      {items.map((x, i) => (
        <span key={x}>
          <i>{i + 1}</i>
          {x}
          {i < items.length - 1 && <b>→</b>}
        </span>
      ))}
    </div>
  );
}
function Tutorial({ kind, onClose }: { kind: string; onClose: () => void }) {
  const info: Record<string, { title: string; steps: string[]; demo: string }> =
    {
      排序: {
        title: "步驟排序這樣玩",
        steps: ["點下面一張卡片", "點上面發光空格", "放滿後按檢查"],
        demo: "🧩　☝️　➡️　1️⃣",
      },
      數學: {
        title: "數學兩回合這樣玩",
        steps: ["看圖和聽題目", "點一個答案", "再完成生活應用挑戰"],
        demo: "看圖　☝️　★",
      },
    };
  const d = info[kind];
  return (
    <div className="tutorialOverlay">
      <div className="tutorialCard">
        <p className="eyebrow">角色示範</p>
        <h2>{d.title}</h2>
        <div className="handDemo">
          <span>{d.demo}</span>
          <i>👆</i>
        </div>
        <ol>
          {d.steps.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
        <button className="primary" onClick={onClose}>
          我會了，換我玩！
        </button>
      </div>
    </div>
  );
}
function Celebration({
  data,
  onClose,
}: {
  data: { who: CharName; title: string; nextStep?: number };
  onClose: () => void;
}) {
  return (
    <div className="celebrationOverlay" role="dialog" aria-live="assertive">
      <div className="celebrationBurst">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i}>★</i>
        ))}
      </div>
      <div className="celebrationCard">
        <Character name={data.who} state="success" />
        <h1>{data.title}</h1>
        <p>太棒了！你得到一顆任務星</p>
        <div className="flyingStar">★</div>
        <button
          className="primary celebrationContinue"
          autoFocus
          onClick={onClose}
        >
          繼續闖關 →
        </button>
      </div>
    </div>
  );
}
