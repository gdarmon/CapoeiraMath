const SESSION_LENGTH = 12;
const REWARD_SECONDS = 30;
const STORAGE_KEY = "darmonCapoeira:v1";
const STREAK_MILESTONES = new Set([3, 5, 8, 10, 12]);
const PRAISE_REPEAT_WINDOW = 10;
const BERIMBAU_REWARD_INTERVAL = 3;
const ABADA_REWARD_LIBRARY_PATH = "assets/abada-reward-videos.json";

const HEB_NUM = new Map([
  [1, "אחד"],
  [2, "שתיים"],
  [3, "שלוש"],
  [4, "ארבע"],
  [5, "חמש"],
  [6, "שש"],
  [7, "שבע"],
  [8, "שמונה"],
  [9, "תשע"],
  [10, "עשר"],
  [14, "ארבע עשרה"],
  [16, "שש עשרה"],
  [18, "שמונה עשרה"],
  [21, "עשרים ואחת"],
  [24, "עשרים וארבע"],
  [27, "עשרים ושבע"],
  [28, "עשרים ושמונה"],
  [32, "שלושים ושתיים"],
  [35, "שלושים וחמש"],
  [36, "שלושים ושש"],
  [40, "ארבעים"],
  [42, "ארבעים ושתיים"],
  [45, "ארבעים וחמש"],
  [48, "ארבעים ושמונה"],
  [49, "ארבעים ותשע"],
  [54, "חמישים וארבע"],
  [56, "חמישים ושש"],
  [63, "שישים ושלוש"],
  [64, "שישים וארבע"],
  [70, "שבעים"],
  [72, "שבעים ושתיים"],
  [80, "שמונים"],
  [81, "שמונים ואחת"],
  [90, "תשעים"],
]);

const MOVES = ["ginga-pop", "meia", "au", "esquiva", "armada"];

const CLEAN_PRAISE = [
  "בום",
  "אלוף",
  "תותח",
  "איזה דיוק",
  "קומבו נקי",
  "מהלך נקי",
  "חזק",
  "חזק ביותר",
  "יש",
  "יששש",
  "נכנס חלק",
  "יפה עליך",
  "קליל לך",
  "זה שלך",
  "סגור על זה",
  "רודה יפה",
  "שאפו",
  "טיל",
  "אבא גאה בך",
  "אמא אומרת שאתה אלוף",
  "מי זה זה??",
  "יאללה דרמון",
  "level up",
  "nice one",
  "clean hit",
  "you got it",
  "lets go",
  "boom",
  ptPraise("Boa", "בואה", "יפה / טוב"),
  ptPraise("Mandou bem", "מנדו בן", "עשית את זה טוב"),
  ptPraise("Massa", "מסה", "מגניב"),
  ptPraise("Bora", "בורה", "יאללה / בוא נמשיך"),
  ptPraise("Show", "שו", "מעולה"),
  ptPraise("Axé", "אשה", "אנרגיה טובה / ברכה"),
  ptPraise("Joga bonito", "ז'וגה בוניטו", "תשחק יפה"),
];

const ASSISTED_PRAISE = [
  "יפה, בנית את זה",
  "מעולה, מצאת את הדרך",
  "תיקון יפה",
  "לא ויתרת",
  "וואו איזה טיל",
  "הרמז עבד",
  "זה בדיוק אימון",
  "יפה, צעד צעד",
  "מצוין, המשכת לחשוב",
  "הופה, זה הסתדר",
  "good save",
  "nice comeback",
  "you fixed it",
  ptPraise("Boa", "בואה, חזרת לזה", "יפה / טוב"),
  ptPraise("Show", "שו, תיקנת יפה", "מעולה"),
  ptPraise("Bora", "בורה, ממשיכים", "יאללה / בוא נמשיך"),
];

function ptPraise(word, spokenWord, meaning) {
  return {
    key: `pt:${word}:${spokenWord}`,
    text: word,
    meaning: `פורטוגזית: ${meaning}`,
    speak: `${spokenWord}. בפורטוגזית: ${meaning}`,
  };
}

const CORD_PALETTE = {
  white: "#fff9ee",
  yellow: "#f5c24b",
  orange: "#f18345",
  blue: "#48c7d8",
  green: "#47b56c",
  purple: "#9b79ff",
  brown: "#8a5a35",
  red: "#e65f55",
};

const CORDS = [
  { name: "קצוות צהובים", xp: 0, colors: [CORD_PALETTE.white, CORD_PALETTE.yellow] },
  { name: "קצה צהוב/כתום", xp: 90, colors: [CORD_PALETTE.yellow, CORD_PALETTE.orange] },
  { name: "קצוות כתומים", xp: 190, colors: [CORD_PALETTE.white, CORD_PALETTE.orange] },
  { name: "קצה כתום/כחול", xp: 310, colors: [CORD_PALETTE.orange, CORD_PALETTE.blue] },
  { name: "קצוות כחולים", xp: 450, colors: [CORD_PALETTE.white, CORD_PALETTE.blue] },
  { name: "לבן/צהוב", xp: 610, colors: [CORD_PALETTE.white, CORD_PALETTE.yellow] },
  { name: "צהוב מלא", xp: 790, colors: [CORD_PALETTE.yellow] },
  { name: "כתום/צהוב", xp: 990, colors: [CORD_PALETTE.orange, CORD_PALETTE.yellow] },
  { name: "כתום מלא", xp: 1210, colors: [CORD_PALETTE.orange] },
  { name: "כתום/כחול", xp: 1450, colors: [CORD_PALETTE.orange, CORD_PALETTE.blue] },
  { name: "כחול מלא", xp: 1710, colors: [CORD_PALETTE.blue] },
  { name: "כחול/ירוק", xp: 1990, colors: [CORD_PALETTE.blue, CORD_PALETTE.green] },
  { name: "ירוק מלא", xp: 2290, colors: [CORD_PALETTE.green] },
  { name: "ירוק/סגול", xp: 2610, colors: [CORD_PALETTE.green, CORD_PALETTE.purple] },
  { name: "סגול מלא", xp: 2950, colors: [CORD_PALETTE.purple] },
  { name: "חום/סגול", xp: 3310, colors: [CORD_PALETTE.brown, CORD_PALETTE.purple] },
  { name: "חום מלא", xp: 3690, colors: [CORD_PALETTE.brown] },
  { name: "אדום/חום", xp: 4090, colors: [CORD_PALETTE.red, CORD_PALETTE.brown] },
  { name: "אדום מלא", xp: 4510, colors: [CORD_PALETTE.red] },
  { name: "אדום/לבן", xp: 4950, colors: [CORD_PALETTE.red, CORD_PALETTE.white] },
];

const DEFAULT_SKIN_ID = "classic";
const TEACHER_SKIN_UNLOCK_XP = CORDS.find((cord) => cord.name === "כחול מלא").xp;

const TEACHER_SKINS = [
  {
    id: DEFAULT_SKIN_ID,
    name: "לוחם דרמון",
    role: "רגיל",
    unlockXp: 0,
    skinTone: "#f0b07e",
    skinShadow: "#c9784f",
    hair: "#37251e",
    hairStyle: "short",
    shirt: ["#fff3b6", "#f5c24b", "#d88c2d"],
    pants: "#fff9ee",
    pantsAlt: "#f4eedf",
  },
  {
    id: "bananera",
    name: "בננרה",
    role: "בחורה",
    unlockXp: TEACHER_SKIN_UNLOCK_XP,
    skinTone: "#c9875c",
    skinShadow: "#925235",
    hair: "#24130f",
    hairAccent: "#f5c24b",
    hairStyle: "braid",
    shirt: ["#fff9ee", "#47b56c", "#f5c24b"],
    pants: "#fffaf0",
    pantsAlt: "#f2eadb",
  },
  {
    id: "bateba",
    name: "בטהבה",
    role: "בחורה",
    unlockXp: TEACHER_SKIN_UNLOCK_XP,
    skinTone: "#b66d4d",
    skinShadow: "#7d3f2e",
    hair: "#ff6a1f",
    hairAccent: "#ffd04d",
    hairStyle: "curls",
    shirt: ["#48c7d8", "#fff9ee", "#f18345"],
    pants: "#f8f4e7",
    pantsAlt: "#e8dcc8",
  },
  {
    id: "vesoura",
    name: "וסורה",
    role: "בחור",
    unlockXp: TEACHER_SKIN_UNLOCK_XP,
    skinTone: "#d49467",
    skinShadow: "#9d5c3f",
    hair: "#2b1a12",
    hairAccent: "#6b3b22",
    hairStyle: "dreads",
    shirt: ["#e65f55", "#f5c24b", "#fff9ee"],
    pants: "#fff9ee",
    pantsAlt: "#efe7d8",
  },
];

const MODE_LABELS = {
  7: "כפולות 7",
  8: "כפולות 8",
  9: "כפולות 9",
  boss: "בוס 7-8-9",
};

const VIDEO_LINKS = {
  ginga: "https://www.youtube.com/results?search_query=capoeira+ginga+tutorial+shorts",
  "ginga-pop": "https://www.youtube.com/results?search_query=capoeira+ginga+tutorial+shorts",
  meia: "https://www.youtube.com/results?search_query=capoeira+meia+lua+de+compasso+shorts",
  au: "https://www.youtube.com/results?search_query=capoeira+au+cartwheel+tutorial+shorts",
  esquiva: "https://www.youtube.com/results?search_query=capoeira+esquiva+tutorial+shorts",
  armada: "https://www.youtube.com/results?search_query=capoeira+armada+kick+tutorial+shorts",
  moves: "https://www.youtube.com/results?search_query=capoeira+shorts+ginga+au+armada+meia+lua",
  capoeira: "https://www.youtube.com/results?search_query=ABADA+Capoeira",
  music: "https://www.youtube.com/results?search_query=capoeira+berimbau+music+roda",
  berimbau: "https://www.youtube.com/results?search_query=capoeira+berimbau+toque",
};

const REWARD_VIDEOS = {
  ginga: [
    { id: "XzXGg8H4MOE", title: "Ginga" },
    { id: "iu9duybOELo", title: "Ginga" },
  ],
  "ginga-pop": [
    { id: "XzXGg8H4MOE", title: "Ginga" },
    { id: "U4wOdg47fPc", title: "Capoeira rhythm" },
  ],
  au: [
    { id: "3QGzHk5haKI", title: "Au / cartwheel" },
    { id: "5_YJ_7JCMn4", title: "Cartwheel variation" },
  ],
  armada: [
    { id: "40M2sHtHR4g", title: "Armada" },
    { id: "bLcN1mgLIIo", title: "Armada tips" },
    { id: "O7PrNVFGX2I", title: "Armada" },
  ],
  meia: [
    { id: "lzf8y6eiSwI", title: "Meia lua de compasso" },
    { id: "iVi_kN6aOmU", title: "Meia lua tutorial" },
    { id: "ORMerQc7aiM", title: "Meia lua" },
  ],
  esquiva: [
    { id: "dCrkx2NM7BM", title: "Esquiva" },
    { id: "RwMBH_KDjl8", title: "Esquiva baixa" },
    { id: "PnR8sj6Br3k", title: "Esquiva move" },
  ],
  berimbau: [
    { id: "M7lBDtAZCzU", title: "Introduction to the Berimbau" },
    { id: "_B5LeelJTtY", title: "Sao Bento Grande de Angola" },
    { id: "sIfmuUwsmWU", title: "Angola" },
    { id: "6FWrZ-V3GKg", title: "Benguela" },
    { id: "OepJlqkJ2WM", title: "Regional de Mestre Bimba" },
    { id: "zRHZkriG2Qk", title: "Iuna" },
    { id: "3PCUrxKCU3U", title: "Santa Maria" },
    { id: "94fX9QlPlAU", title: "Cavalaria" },
    { id: "Hvq6S6DS25I", title: "Sao Bento Pequeno de Angola" },
    { id: "Guj5hAGAJxE", title: "Samba de Roda" },
    { id: "9RlrbiMYs84", title: "Idalina" },
    { id: "KhsW6mY7sIk", title: "Amazonas" },
  ],
  music: [
    { id: "-SufUq4M0EY", title: "Zum Zum Zum" },
    { id: "Qy9gkL1OMMs", title: "Oi sim sim sim" },
    { id: "U4wOdg47fPc", title: "Capoeira rhythm" },
    { id: "zxeOF192VE4", title: "Toque luna" },
    { id: "e_Zhc6AJEgk", title: "Berimbau" },
  ],
};

const FACTS = buildFacts();

const state = {
  selectedMode: "boss",
  currentScreen: "home",
  session: [],
  retryQueue: [],
  questionIndex: 0,
  locked: false,
  currentTries: 0,
  usedHint: false,
  streak: 0,
  bestSessionStreak: 0,
  correct: 0,
  attempts: 0,
  answers: [],
  musicRewards: new Set(),
  praiseHistory: {
    clean: [],
    assisted: [],
  },
  lastRewardVideoId: {},
  deferredInstallPrompt: null,
  audio: null,
  particles: [],
  ambientParticles: [],
  animationStarted: false,
  visual: {
    activeMove: null,
    moveStarted: 0,
    moveDuration: 1000,
  },
  reward: {
    video: null,
    onDone: null,
    timer: null,
    tick: null,
    secondsLeft: REWARD_SECONDS,
    praise: null,
    library: REWARD_VIDEOS,
  },
  fact: {
    onDone: null,
  },
  streakFx: {
    particles: [],
    timer: null,
  },
  storage: loadStorage(),
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  applyLaunchMode();
  hydrateHome();
  bindEvents();
  setupCanvases();
  registerServiceWorker();
  loadRewardLibrary();
  renderModeSelection();
  showScreen("home");
});

function bindElements() {
  Object.assign(els, {
    homeScreen: document.getElementById("homeScreen"),
    gameScreen: document.getElementById("gameScreen"),
    finishScreen: document.getElementById("finishScreen"),
    backButton: document.getElementById("backButton"),
    installButton: document.getElementById("installButton"),
    voiceButton: document.getElementById("voiceButton"),
    soundButton: document.getElementById("soundButton"),
    startButton: document.getElementById("startButton"),
    againButton: document.getElementById("againButton"),
    modeCards: Array.from(document.querySelectorAll(".mode-card")),
    cordLabel: document.getElementById("cordLabel"),
    xpLabel: document.getElementById("xpLabel"),
    bestStreakLabel: document.getElementById("bestStreakLabel"),
    skinPanel: document.getElementById("skinPanel"),
    skinLabel: document.getElementById("skinLabel"),
    skinButton: document.getElementById("skinButton"),
    skinButtonLabel: document.getElementById("skinButtonLabel"),
    modeLabel: document.getElementById("modeLabel"),
    questionCounter: document.getElementById("questionCounter"),
    streakLabel: document.getElementById("streakLabel"),
    progressBeads: document.getElementById("progressBeads"),
    fighter: document.getElementById("fighter"),
    questionText: document.getElementById("questionText"),
    coachHint: document.getElementById("coachHint"),
    answerGrid: document.getElementById("answerGrid"),
    homeCapoeiraCanvas: document.getElementById("homeCapoeiraCanvas"),
    gameCapoeiraCanvas: document.getElementById("gameCapoeiraCanvas"),
    hintButton: document.getElementById("hintButton"),
    readButton: document.getElementById("readButton"),
    factDialog: document.getElementById("factDialog"),
    closeFactButton: document.getElementById("closeFactButton"),
    gotItButton: document.getElementById("gotItButton"),
    factBig: document.getElementById("factBig"),
    factChant: document.getElementById("factChant"),
    factVisual: document.getElementById("factVisual"),
    rewardDialog: document.getElementById("rewardDialog"),
    rewardFrame: document.getElementById("rewardFrame"),
    rewardTitle: document.getElementById("rewardTitle"),
    rewardPraise: document.getElementById("rewardPraise"),
    rewardPraiseWord: document.getElementById("rewardPraiseWord"),
    rewardPraiseMeaning: document.getElementById("rewardPraiseMeaning"),
    rewardTimer: document.getElementById("rewardTimer"),
    skipRewardButton: document.getElementById("skipRewardButton"),
    continueRewardButton: document.getElementById("continueRewardButton"),
    openRewardButton: document.getElementById("openRewardButton"),
    streakDialog: document.getElementById("streakDialog"),
    streakCanvas: document.getElementById("streakCanvas"),
    streakBadge: document.getElementById("streakBadge"),
    streakTitle: document.getElementById("streakTitle"),
    streakSubtitle: document.getElementById("streakSubtitle"),
    skinDialog: document.getElementById("skinDialog"),
    skinDialogTitle: document.getElementById("skinDialogTitle"),
    skinGrid: document.getElementById("skinGrid"),
    closeSkinButton: document.getElementById("closeSkinButton"),
    finishCord: document.getElementById("finishCord"),
    accuracyLabel: document.getElementById("accuracyLabel"),
    finishStreakLabel: document.getElementById("finishStreakLabel"),
    finishXpLabel: document.getElementById("finishXpLabel"),
    nextList: document.getElementById("nextList"),
    burstCanvas: document.getElementById("burstCanvas"),
    ambientCanvas: document.getElementById("ambientCanvas"),
  });
}

function bindEvents() {
  els.modeCards.forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedMode = button.dataset.mode;
      renderModeSelection();
      tap();
      playTap();
    });
  });

  els.startButton.addEventListener("click", () => {
    unlockAudio();
    startSession(state.selectedMode);
  });

  els.againButton.addEventListener("click", () => {
    unlockAudio();
    startSession(state.selectedMode);
  });

  els.backButton.addEventListener("click", () => {
    stopSpeech();
    showScreen("home");
    hydrateHome();
  });

  els.soundButton.addEventListener("click", () => {
    state.storage.sound = !state.storage.sound;
    saveStorage();
    renderToggles();
    tap();
    if (state.storage.sound) playSuccess();
  });

  els.voiceButton.addEventListener("click", () => {
    state.storage.voice = !state.storage.voice;
    saveStorage();
    renderToggles();
    tap();
    if (state.storage.voice) speak("הקראה פועלת", 0, true);
  });

  els.hintButton.addEventListener("click", () => {
    const item = currentItem();
    if (!item || state.locked) return;
    state.usedHint = true;
    breakCleanStreak(item.fact);
    revealCoachHint(item.fact, true);
    state.storage.facts[item.fact.key].hints += 1;
    saveStorage();
  });

  els.readButton.addEventListener("click", () => {
    const item = currentItem();
    if (!item) return;
    tap(18);
    playTap();
    speakQuestion(item, 0, true);
  });

  els.closeFactButton.addEventListener("click", closeFact);
  els.gotItButton.addEventListener("click", closeFact);
  els.skipRewardButton.addEventListener("click", finishReward);
  els.continueRewardButton.addEventListener("click", finishReward);
  els.skinButton.addEventListener("click", () => showSkinDialog("manual"));
  els.closeSkinButton.addEventListener("click", closeSkinDialog);
  els.openRewardButton.addEventListener("click", () => {
    if (!state.reward.video) return;
    openExternal(`https://www.youtube.com/watch?v=${state.reward.video.id}`);
  });

  els.installButton.addEventListener("click", async () => {
    if (!state.deferredInstallPrompt) return;
    state.deferredInstallPrompt.prompt();
    await state.deferredInstallPrompt.userChoice;
    state.deferredInstallPrompt = null;
    els.installButton.hidden = true;
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
    els.installButton.hidden = false;
  });

  window.addEventListener("resize", setupCanvases);
}

function openExternal(url) {
  tap(18);
  playTap();
  if (window.AndroidLinks && typeof window.AndroidLinks.open === "function") {
    window.AndroidLinks.open(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

function applyLaunchMode() {
  const mode = new URLSearchParams(window.location.search).get("mode");
  if (["7", "8", "9", "boss"].includes(mode)) {
    state.selectedMode = mode;
  }
}

function buildFacts() {
  const facts = [];
  for (const a of [7, 8, 9]) {
    for (let b = 1; b <= 10; b += 1) {
      const low = Math.min(a, b);
      const high = Math.max(a, b);
      const key = `${low}x${high}`;
      if (facts.some((fact) => fact.key === key)) continue;
      facts.push({
        a: low,
        b: high,
        key,
        answer: low * high,
        move: moveFor(low, high),
        chant: `${word(low)} · ${word(high)} · ${word(low * high)}`,
        speak: `${word(low)} כפול ${word(high)}, ${word(low * high)}`,
        memory: memoryTipFor(low, high),
        trick: trickFor(low, high),
      });
    }
  }
  return facts;
}

function moveFor(a, b) {
  if (a === 8 && b === 8) return "au";
  if (a === 9 || b === 9) return "armada";
  if (a === 7 && b === 8) return "meia";
  if (a === b) return "ginga-pop";
  return MOVES[(a + b) % MOVES.length];
}

function trickFor(a, b) {
  if (a === 1 || b === 1) {
    const other = a === 1 ? b : a;
    return {
      type: "stack",
      text: `כפול 1 נשאר אותו מספר: ${other}`,
    };
  }
  if (a === 10 || b === 10) {
    const other = a === 10 ? b : a;
    return {
      type: "stack",
      text: `כפול 10 מוסיף 0: ${other} → ${other * 10}`,
    };
  }
  if (a === 9 || b === 9) {
    const other = a === 9 ? b : a;
    return {
      type: "nine",
      text: `9 כפול ${other}: עשרות ${other - 1}, משלימים ל-9`,
    };
  }
  if (a === 8 || b === 8) {
    const other = a === 8 ? b : a;
    return {
      type: "double",
      text: `${other} → ${other * 2} → ${other * 4} → ${other * 8}`,
    };
  }
  return {
    type: "stack",
    text: `${word(a)} קבוצות של ${word(b)}`,
  };
}

function memoryTipFor(a, b) {
  const key = `${a}x${b}`;
  const tips = {
    "1x7": "כפול 1 נשאר אותו מספר: 1×7 = 7.",
    "1x8": "כפול 1 נשאר אותו מספר: 1×8 = 8.",
    "1x9": "כפול 1 נשאר אותו מספר: 1×9 = 9.",
    "7x7": "7 שבועות הם 49 ימים. לכן 7×7 = 49.",
    "7x8": "טריק הרצף: 5-6-7-8. כלומר 56 = 7×8.",
    "7x9": "7×9 זה 7×10 פחות 7: 70 פחות 7 = 63.",
    "7x10": "כפול 10 מוסיף 0: 7×10 = 70.",
    "8x8": "לוח שחמט הוא 8 על 8 משבצות: 64.",
    "8x9": "8×9 זה 8×10 פחות 8: 80 פחות 8 = 72.",
    "8x10": "כפול 10 מוסיף 0: 8×10 = 80.",
    "9x9": "בכפולות 9 הספרות משלימות ל-9: 8 ועוד 1 = 9, לכן 81.",
    "9x10": "כפול 10 מוסיף 0: 9×10 = 90.",
  };

  if (tips[key]) return tips[key];

  if (a === 9 || b === 9) {
    const other = a === 9 ? b : a;
    return `טריק 9: העשרות הן ${other - 1}, והאחדות משלימות ל-9.`;
  }

  if (a === 8 || b === 8) {
    const other = a === 8 ? b : a;
    return `טריק 8: כפול-כפול-כפול. ${other} → ${other * 2} → ${other * 4} → ${other * 8}.`;
  }

  if (a === 7 || b === 7) {
    const other = a === 7 ? b : a;
    return `טריק 7: 5×${other} ועוד 2×${other}.`;
  }

  return "נסה לפרק לעוגן קל: 5 פעמים ועוד השאר.";
}

function word(number) {
  return HEB_NUM.get(number) || String(number);
}

function loadStorage() {
  const defaults = {
    xp: 0,
    bestStreak: 0,
    sessions: 0,
    sound: true,
    voice: true,
    selectedSkin: DEFAULT_SKIN_ID,
    lastSkinPromptXp: 0,
    facts: {},
  };

  for (const fact of FACTS) {
    defaults.facts[fact.key] = {
      attempts: 0,
      correct: 0,
      streak: 0,
      misses: 0,
      hints: 0,
      lastSeen: 0,
    };
  }

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!parsed) return defaults;
    const merged = { ...defaults, ...parsed, facts: { ...defaults.facts, ...parsed.facts } };
    if (merged.selectedSkin === "sora") merged.selectedSkin = "vesoura";
    const storedSkin = skinById(merged.selectedSkin);
    merged.selectedSkin = storedSkin.unlockXp <= merged.xp ? storedSkin.id : DEFAULT_SKIN_ID;
    merged.lastSkinPromptXp = Number(merged.lastSkinPromptXp) || 0;
    return merged;
  } catch {
    return defaults;
  }
}

function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.storage));
}

function hydrateHome() {
  const cord = getCord();
  els.cordLabel.textContent = cord.name;
  styleCordLabel(els.cordLabel, cord);
  els.xpLabel.textContent = String(state.storage.xp);
  els.bestStreakLabel.textContent = String(state.storage.bestStreak);
  renderToggles();
  renderSkinPanel();
}

function getCord() {
  return CORDS.reduce((best, cord) => (state.storage.xp >= cord.xp ? cord : best), CORDS[0]);
}

function cordColor(cord) {
  return cord.colors?.[0] || CORD_PALETTE.white;
}

function cordGradient(cord) {
  const colors = cord.colors || [cordColor(cord)];
  if (colors.length < 2) return "";
  const step = 100 / colors.length;
  const stops = colors.map((color, index) => `${color} ${index * step}% ${(index + 1) * step}%`);
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

function styleCordLabel(element, cord) {
  const gradient = cordGradient(cord);
  element.style.backgroundImage = gradient;
  element.style.backgroundClip = gradient ? "text" : "";
  element.style.webkitBackgroundClip = gradient ? "text" : "";
  element.style.webkitTextFillColor = gradient ? "transparent" : "";
  element.style.color = gradient ? "" : cordColor(cord);
}

function skinById(id) {
  return TEACHER_SKINS.find((skin) => skin.id === id) || TEACHER_SKINS[0];
}

function teacherSkinsUnlocked(xp = state.storage.xp) {
  return xp >= TEACHER_SKIN_UNLOCK_XP;
}

function activeSkin() {
  const skin = skinById(state.storage.selectedSkin);
  return skin.unlockXp <= state.storage.xp ? skin : skinById(DEFAULT_SKIN_ID);
}

function renderSkinPanel() {
  const unlocked = teacherSkinsUnlocked();
  const skin = activeSkin();
  els.skinPanel.classList.toggle("locked", !unlocked);
  els.skinLabel.textContent = unlocked ? skin.name : "נפתח בכחול מלא";
  els.skinButton.disabled = !unlocked;
  els.skinButtonLabel.textContent = unlocked ? "בחר" : "נעול";
}

function showSkinDialog(reason) {
  if (!teacherSkinsUnlocked()) return;
  els.skinDialogTitle.textContent = reason === "rank" ? "דרגה חדשה" : "בחר מורה";
  renderSkinChoices();
  if (!els.skinDialog.open) {
    els.skinDialog.showModal();
  }
}

function closeSkinDialog() {
  if (els.skinDialog.open) {
    els.skinDialog.close();
  }
}

function renderSkinChoices() {
  els.skinGrid.innerHTML = "";
  const available = TEACHER_SKINS.filter(
    (skin) => skin.id !== DEFAULT_SKIN_ID && skin.unlockXp <= state.storage.xp,
  );

  for (const skin of available) {
    const button = document.createElement("button");
    button.className = "skin-choice";
    button.type = "button";
    button.classList.toggle("selected", activeSkin().id === skin.id);
    button.setAttribute("aria-label", `${skin.name} ${skin.role}`);

    const canvas = document.createElement("canvas");
    canvas.className = "skin-preview";
    canvas.width = 180;
    canvas.height = 160;

    const name = document.createElement("strong");
    name.textContent = skin.name;
    const role = document.createElement("span");
    role.textContent = skin.role;

    button.append(canvas, name, role);
    button.addEventListener("click", () => {
      state.storage.selectedSkin = skin.id;
      saveStorage();
      renderSkinPanel();
      renderSkinChoices();
      closeSkinDialog();
      tap([18, 26, 18]);
      speak(`${skin.name} נכנס לרודה`, 0, true);
    });
    els.skinGrid.append(button);
    drawSkinPreview(canvas, skin);
  }
}

function drawSkinPreview(canvas, skin) {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  const glow = ctx.createRadialGradient(width / 2, height * 0.56, 8, width / 2, height * 0.56, 84);
  glow.addColorStop(0, "rgba(245, 194, 75, 0.26)");
  glow.addColorStop(1, "rgba(21, 19, 19, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  drawFighter(ctx, width, height, "ginga", 0.5, performance.now(), skin);
}

function renderToggles() {
  els.soundButton.style.opacity = state.storage.sound ? "1" : "0.48";
  els.voiceButton.style.opacity = state.storage.voice ? "1" : "0.48";
}

function renderModeSelection() {
  els.modeCards.forEach((button) => {
    button.classList.toggle("selected", button.dataset.mode === state.selectedMode);
  });
}

function showScreen(name) {
  state.currentScreen = name;
  els.homeScreen.classList.toggle("active", name === "home");
  els.gameScreen.classList.toggle("active", name === "game");
  els.finishScreen.classList.toggle("active", name === "finish");
  els.backButton.hidden = name === "home";
  requestAnimationFrame(() => {
    resizeCanvas(els.homeCapoeiraCanvas);
    resizeCanvas(els.gameCapoeiraCanvas);
    resizeCanvas(els.burstCanvas);
  });
}

function startSession(mode) {
  state.selectedMode = mode;
  state.session = buildSession(mode);
  state.retryQueue = [];
  state.questionIndex = 0;
  state.locked = false;
  state.currentTries = 0;
  state.usedHint = false;
  state.streak = 0;
  state.bestSessionStreak = 0;
  state.correct = 0;
  state.attempts = 0;
  state.answers = [];
  state.musicRewards = new Set();
  renderProgress();
  showScreen("game");
  tap(18);
  playStart();
  nextQuestion();
}

function buildSession(mode) {
  const deck = deckForMode(mode);
  const maxPerFact = Math.ceil(SESSION_LENGTH / deck.length) + 1;
  const sessionCounts = new Map(deck.map((f) => [f.key, 0]));
  const picked = deck.length <= SESSION_LENGTH ? shuffle(deck).map((fact) => ({ fact, flipped: Math.random() > 0.5 })) : [];
  picked.forEach((item) => {
    sessionCounts.set(item.fact.key, (sessionCounts.get(item.fact.key) || 0) + 1);
  });
  let lastKey = "";

  if (picked.length > 0) {
    lastKey = picked[picked.length - 1].fact.key;
  }

  for (let i = picked.length; i < SESSION_LENGTH; i += 1) {
    const fact = weightedPick(deck, lastKey, sessionCounts, maxPerFact);
    picked.push({ fact, flipped: Math.random() > 0.5 });
    sessionCounts.set(fact.key, (sessionCounts.get(fact.key) || 0) + 1);
    lastKey = fact.key;
  }

  return picked;
}

function deckForMode(mode) {
  if (mode === "boss") {
    return FACTS;
  }
  return FACTS.filter((fact) => fact.a === Number(mode) || fact.b === Number(mode));
}

function weightedPick(deck, lastKey, sessionCounts, maxPerFact) {
  const weighted = deck.map((fact) => {
    const memory = state.storage.facts[fact.key];
    const accuracyGap = memory.attempts === 0 ? 1.4 : 1 + (1 - memory.correct / memory.attempts) * 2;
    const missWeight = memory.misses * 0.35;
    const hintWeight = memory.hints * 0.18;
    const streakRelief = Math.min(memory.streak * 0.16, 0.9);
    const repeatBrake = fact.key === lastKey ? 0.2 : 1;
    const used = sessionCounts ? (sessionCounts.get(fact.key) || 0) : 0;
    const countPenalty = maxPerFact ? Math.max(0.05, 1 - used / maxPerFact) : 1;
    return {
      fact,
      weight: Math.max(0.05, (accuracyGap + missWeight + hintWeight - streakRelief) * repeatBrake * countPenalty),
    };
  });

  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let cursor = Math.random() * total;
  for (const item of weighted) {
    cursor -= item.weight;
    if (cursor <= 0) return item.fact;
  }
  return weighted[weighted.length - 1].fact;
}

function nextQuestion() {
  state.locked = false;

  if (state.questionIndex >= state.session.length) {
    finishSession();
    return;
  }

  state.currentTries = 0;
  state.usedHint = false;
  const item = currentItem();
  els.modeLabel.textContent = MODE_LABELS[state.selectedMode];
  els.questionCounter.textContent = `${Math.min(state.questionIndex + 1, SESSION_LENGTH)}/${SESSION_LENGTH}`;
  els.streakLabel.textContent = String(state.streak);
  els.questionText.textContent = formatQuestion(item);
  hideCoachHint();
  renderAnswers(item);
  renderProgress();
  speakQuestion(item, 180);
}

function currentItem() {
  return state.session[state.questionIndex];
}

function formatQuestion(item) {
  const first = item.flipped ? item.fact.b : item.fact.a;
  const second = item.flipped ? item.fact.a : item.fact.b;
  return `${first} × ${second}`;
}

function renderAnswers(item) {
  const options = buildOptions(item.fact);
  els.answerGrid.innerHTML = "";
  for (const option of options) {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(button, option));
    els.answerGrid.append(button);
  }
}

function buildOptions(fact) {
  const set = new Set([fact.answer]);
  const variants = [
    fact.answer + fact.a,
    fact.answer - fact.a,
    fact.answer + fact.b,
    fact.answer - fact.b,
    fact.answer + 9,
    fact.answer - 9,
    fact.answer + 10,
    fact.answer - 10,
  ].filter((value) => value > 3 && value < 100);

  while (set.size < 4 && variants.length) {
    const index = Math.floor(Math.random() * variants.length);
    set.add(variants.splice(index, 1)[0]);
  }

  while (set.size < 4) {
    set.add(Math.floor(Math.random() * 78) + 12);
  }

  return shuffle(Array.from(set));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function chooseAnswer(button, answer) {
  if (state.locked) return;
  const item = currentItem();
  const fact = item.fact;
  const correct = answer === fact.answer;
  const memory = state.storage.facts[fact.key];
  const assisted = state.currentTries > 0 || state.usedHint;

  memory.lastSeen = Date.now();

  if (correct) {
    state.locked = true;
    markAnswerButtons(fact.answer);
    button.classList.add("correct");
    state.correct += 1;
    state.attempts += 1;
    memory.attempts += 1;
    if (assisted) {
      state.streak = 0;
    } else {
      state.streak += 1;
    }
    state.bestSessionStreak = Math.max(state.bestSessionStreak, state.streak);
    memory.correct += 1;
    memory.streak = assisted ? 0 : memory.streak + 1;
    state.storage.xp += assisted ? 5 : 8 + Math.min(state.streak, 5);
    state.storage.bestStreak = Math.max(state.storage.bestStreak, state.streak);
    state.answers.push({ key: fact.key, result: assisted ? "help" : "good" });
    saveStorage();
    renderProgress();
    hideCoachHint();
    celebrate(fact.move);
    const praise = randomPraise(assisted ? "assisted" : "clean");
    state.reward.praise = praise.meaning ? praise : null;
    speak(praise.speak);
    showStreakMoment(fact, () => {
      state.questionIndex += 1;
      nextQuestion();
    });
  } else if (state.currentTries === 0) {
    state.currentTries = 1;
    breakCleanStreak(fact);
    button.classList.add("soft-wrong");
    button.disabled = true;
    revealCoachHint(fact, false);
    simplifyChoices(fact.answer);
    tap([18, 24]);
    playTap();
    speak("עוד רגע. קח רמז ונסה שוב");
  } else {
    state.locked = true;
    markAnswerButtons(fact.answer);
    button.classList.add("wrong");
    state.streak = 0;
    memory.streak = 0;
    state.attempts += 1;
    memory.attempts += 1;
    memory.misses += 1;
    state.answers.push({ key: fact.key, result: "try" });
    const retryAt = Math.min(state.questionIndex + 3, state.session.length - 1);
    if (retryAt > state.questionIndex) {
      state.session[retryAt] = { fact, flipped: !item.flipped };
    }
    saveStorage();
    renderProgress();
    tap([25, 35, 25]);
    playMiss();
    setTimeout(() => {
      showFact(fact, false, () => {
        state.questionIndex += 1;
        nextQuestion();
      });
    }, 450);
  }
}

function breakCleanStreak(fact = null) {
  state.streak = 0;
  if (fact && state.storage.facts[fact.key]) {
    state.storage.facts[fact.key].streak = 0;
  }
  renderProgress();
}

function markAnswerButtons(correctAnswer) {
  els.answerGrid.querySelectorAll(".answer-button").forEach((answerButton) => {
    answerButton.disabled = true;
    if (Number(answerButton.textContent) === correctAnswer) {
      answerButton.classList.add("correct");
    }
  });
}

function simplifyChoices(correctAnswer) {
  const wrongButtons = Array.from(els.answerGrid.querySelectorAll(".answer-button")).filter(
    (answerButton) => !answerButton.disabled && Number(answerButton.textContent) !== correctAnswer,
  );
  shuffle(wrongButtons)
    .slice(0, Math.max(0, wrongButtons.length - 1))
    .forEach((answerButton) => {
      answerButton.disabled = true;
      answerButton.classList.add("faded");
    });
}

function revealCoachHint(fact, manual) {
  const prefix = manual ? "רמז:" : "כמעט. נבנה את זה:";
  els.coachHint.textContent = `${prefix} ${coachHintText(fact)} ${fact.memory}`;
  els.coachHint.hidden = false;
}

function hideCoachHint() {
  els.coachHint.hidden = true;
  els.coachHint.textContent = "";
}

function coachHintText(fact) {
  if (fact.a === 1 || fact.b === 1) {
    return "כפול 1 הוא עוגן קל.";
  }
  if (fact.a === 10 || fact.b === 10) {
    return "כפול 10 הוא עוגן קל.";
  }
  if (fact.a === 9 || fact.b === 9) {
    const other = fact.a === 9 ? fact.b : fact.a;
    return `בכפל 9 יש דפוס קבוע.`;
  }
  if (fact.a === 8 || fact.b === 8) {
    const other = fact.a === 8 ? fact.b : fact.a;
    return `כפל 8 זה כפול-כפול-כפול: ${other} → ${other * 2} → ${other * 4} → ?`;
  }
  if (fact.a === 7 || fact.b === 7) {
    const other = fact.a === 7 ? fact.b : fact.a;
    return `כפל 7 אפשר לפרק: 5×${other} ועוד 2×${other}.`;
  }
  return "תסתכל על האפשרויות ותוריד את מה שבטוח לא מתאים.";
}

function renderProgress() {
  els.progressBeads.innerHTML = "";
  for (let i = 0; i < SESSION_LENGTH; i += 1) {
    const bead = document.createElement("div");
    bead.className = "bead";
    if (state.answers[i]) bead.classList.add(state.answers[i].result);
    els.progressBeads.append(bead);
  }
  els.streakLabel.textContent = String(state.streak);
}

function showStreakMoment(fact, onDone) {
  const milestone = STREAK_MILESTONES.has(state.streak);
  const musicReward = shouldPlayMusicReward();
  const afterCelebration = () => {
    if (musicReward) {
      showMusicReward(onDone);
      return;
    }
    showReward(fact, onDone);
  };

  if (!milestone) {
    afterCelebration();
    return;
  }

  showStreakCelebration(afterCelebration);
}

function shouldPlayMusicReward() {
  if (state.correct === 0 || state.correct % 5 !== 0) return false;
  if (state.musicRewards.has(state.correct)) return false;
  state.musicRewards.add(state.correct);
  return true;
}

function showStreakCelebration(onDone) {
  const copy = streakCopy(state.streak);
  els.streakBadge.textContent = String(state.streak);
  els.streakTitle.textContent = copy.title;
  els.streakSubtitle.textContent = copy.subtitle;
  seedStreakParticles();
  resizeCanvas(els.streakCanvas);
  if (!els.streakDialog.open) {
    els.streakDialog.showModal();
  }
  playStreakSound();
  tap([24, 32, 24]);
  speak(copy.speak);
  window.clearTimeout(state.streakFx.timer);
  state.streakFx.timer = window.setTimeout(() => {
    if (els.streakDialog.open) {
      els.streakDialog.close();
    }
    if (typeof onDone === "function") {
      onDone();
    }
  }, 1500);
}

function streakCopy(streak) {
  if (streak >= 12) {
    return { title: "רודה מושלמת!", subtitle: "12 ברצף. מטורף.", speak: "רודה מושלמת" };
  }
  if (streak >= 10) {
    return { title: "אין דברים כאלה!", subtitle: "10 ברצף", speak: "אין דברים כאלה" };
  }
  if (streak >= 8) {
    return { title: "אש ברודה!", subtitle: "8 תשובות נקיות", speak: "אש ברודה" };
  }
  if (streak >= 5) {
    return { title: "תותח!", subtitle: "5 ברצף", speak: "תותח" };
  }
  return { title: "יא אלוף!", subtitle: "3 ברצף", speak: "יא אלוף" };
}

function showMusicReward(onDone) {
  const video = pickRewardVideo("music");
  tap([18, 28, 18, 28]);
  speak("שיר רודה");
  showVideoReward(video, `שיר רודה · ${video.title}`, onDone);
}

function seedStreakParticles() {
  const width = els.streakCanvas.clientWidth || 340;
  const height = els.streakCanvas.clientHeight || 270;
  state.streakFx.particles = Array.from({ length: 58 }, (_, index) => ({
    x: width / 2,
    y: height / 2,
    vx: Math.cos(index * 2.4) * (Math.random() * 4.2 + 2.2),
    vy: Math.sin(index * 2.4) * (Math.random() * 4.2 + 2.2) - 1.5,
    life: 52 + Math.random() * 26,
    size: 5 + Math.random() * 8,
    color: ["#f5c24b", "#47b56c", "#48c7d8", "#e65f55", "#fff9ee"][index % 5],
    spin: Math.random() * Math.PI,
  }));
}

function showReward(fact, onDone) {
  if (shouldPlayBerimbauReward()) {
    const video = pickRewardVideo("berimbau");
    showVideoReward(video, `בירימבאו · ${video.title}`, onDone);
    return;
  }

  if (state.reward.library.capoeira?.length) {
    const video = pickRewardVideo("capoeira");
    showVideoReward(video, `קפוארה · ${video.title}`, onDone);
    return;
  }

  const video = pickRewardVideo(fact.move);
  showVideoReward(video, video.title, onDone);
}

function shouldPlayBerimbauReward() {
  return state.correct > 0 && state.correct % BERIMBAU_REWARD_INTERVAL === 0;
}

function showVideoReward(video, title, onDone) {
  clearRewardTimers();
  state.reward.video = video;
  state.reward.onDone = onDone;
  state.reward.secondsLeft = REWARD_SECONDS;
  els.rewardTitle.textContent = title;
  els.rewardTimer.textContent = `${REWARD_SECONDS}`;
  renderRewardPraise(state.reward.praise);
  els.rewardFrame.src = buildRewardEmbedUrl(video.id);

  if (!els.rewardDialog.open) {
    els.rewardDialog.showModal();
  }

  state.reward.tick = window.setInterval(() => {
    state.reward.secondsLeft -= 1;
    els.rewardTimer.textContent =
      state.reward.secondsLeft > 0 ? `${state.reward.secondsLeft}` : "המשך";
    if (state.reward.secondsLeft <= 0) {
      finishReward();
    }
  }, 1000);

  state.reward.timer = window.setTimeout(finishReward, REWARD_SECONDS * 1000);
}

function pickRewardVideo(move) {
  const library = state.reward.library || REWARD_VIDEOS;
  const pool = library[move] || REWARD_VIDEOS[move] || REWARD_VIDEOS.ginga;
  if (pool.length === 1) return pool[0];
  const lastId = state.lastRewardVideoId[move];
  const available = pool.filter((v) => v.id !== lastId);
  const chosen = available[Math.floor(Math.random() * available.length)];
  state.lastRewardVideoId[move] = chosen.id;
  return chosen;
}

function buildRewardEmbedUrl(id) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    playsinline: "1",
    controls: "1",
    rel: "0",
    modestbranding: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function finishReward() {
  const onDone = state.reward.onDone;
  clearRewardTimers();
  state.reward.onDone = null;
  state.reward.video = null;
  state.reward.praise = null;
  renderRewardPraise(null);
  els.rewardFrame.src = "about:blank";
  if (els.rewardDialog.open) {
    els.rewardDialog.close();
  }
  if (typeof onDone === "function") {
    onDone();
  }
}

function renderRewardPraise(praise) {
  if (!praise || !praise.meaning) {
    els.rewardPraise.hidden = true;
    els.rewardPraiseWord.textContent = "";
    els.rewardPraiseMeaning.textContent = "";
    return;
  }

  els.rewardPraiseWord.textContent = praise.text;
  els.rewardPraiseMeaning.textContent = praise.meaning;
  els.rewardPraise.hidden = false;
}

function clearRewardTimers() {
  if (state.reward.timer) {
    window.clearTimeout(state.reward.timer);
    state.reward.timer = null;
  }
  if (state.reward.tick) {
    window.clearInterval(state.reward.tick);
    state.reward.tick = null;
  }
}

function celebrate(move) {
  tap(24);
  playSuccess();
  runMove(move);
  burst();
}

function runMove(move) {
  state.visual.activeMove = move;
  state.visual.moveStarted = performance.now();
  state.visual.moveDuration = move === "au" || move === "armada" ? 1180 : 980;
}

function showFact(fact, isHint, onDone = null) {
  state.fact.onDone = typeof onDone === "function" ? onDone : null;
  els.factBig.textContent = `${fact.a} × ${fact.b} = ${fact.answer}`;
  els.factChant.textContent = isHint ? fact.memory : `${fact.chant} · ${fact.memory}`;
  renderFactVisual(fact);
  if (!els.factDialog.open) els.factDialog.showModal();
  speak(isHint ? fact.trick.text : `${fact.speak}. טיפ לזכור: ${fact.memory}`);
}

function closeFact() {
  const onDone = state.fact.onDone;
  state.fact.onDone = null;
  if (els.factDialog.open) els.factDialog.close();
  if (typeof onDone === "function") {
    onDone();
  }
}

function renderFactVisual(fact) {
  els.factVisual.innerHTML = "";
  if (fact.trick.type === "nine") {
    const other = fact.a === 9 ? fact.b : fact.a;
    const tens = document.createElement("div");
    tens.className = "visual-nine";
    tens.textContent = other - 1;
    const ones = document.createElement("div");
    ones.className = "visual-nine";
    ones.textContent = 9 - (other - 1);
    els.factVisual.append(tens, ones);
    return;
  }

  if (fact.trick.type === "double") {
    const other = fact.a === 8 ? fact.b : fact.a;
    [other, other * 2, other * 4, other * 8].forEach((value) => {
      const stack = document.createElement("div");
      stack.className = "visual-stack";
      stack.textContent = value;
      els.factVisual.append(stack);
    });
    return;
  }

  const count = Math.min(fact.answer / fact.a, 9);
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("div");
    dot.className = "visual-dot";
    dot.textContent = fact.a;
    els.factVisual.append(dot);
  }
}

function finishSession() {
  const oldCord = getCord();
  state.storage.sessions += 1;
  state.storage.xp += Math.max(10, state.correct * 3);
  const cord = getCord();
  const shouldOfferSkin =
    cord.xp > oldCord.xp &&
    cord.xp >= TEACHER_SKIN_UNLOCK_XP &&
    state.storage.lastSkinPromptXp < cord.xp;
  if (shouldOfferSkin) {
    state.storage.lastSkinPromptXp = cord.xp;
  }
  saveStorage();
  hydrateHome();
  const accuracy = state.attempts === 0 ? 0 : Math.round((state.correct / state.attempts) * 100);
  els.finishCord.textContent = "✦";
  els.finishCord.style.color = cordColor(cord);
  els.accuracyLabel.textContent = `${accuracy}%`;
  els.finishStreakLabel.textContent = String(state.bestSessionStreak);
  els.finishXpLabel.textContent = String(state.storage.xp);
  renderNextList();
  showScreen("finish");
  burst(42);
  playFinish();
  speak(`סיימת רודה. דיוק ${accuracy} אחוז`);
  if (shouldOfferSkin) {
    window.setTimeout(() => showSkinDialog("rank"), 700);
  }
}

function renderNextList() {
  const weakest = FACTS.map((fact) => {
    const memory = state.storage.facts[fact.key];
    const score = memory.attempts === 0 ? -1 : memory.correct / memory.attempts - memory.misses * 0.05;
    return { fact, score };
  })
    .sort((left, right) => left.score - right.score)
    .slice(0, 3);

  els.nextList.innerHTML = "";
  weakest.forEach(({ fact }) => {
    const chip = document.createElement("div");
    chip.className = "next-chip";
    const label = document.createElement("span");
    label.textContent = fact.chant;
    const formula = document.createElement("strong");
    formula.textContent = `${fact.a}×${fact.b}`;
    chip.append(label, formula);
    els.nextList.append(chip);
  });
}

function randomPraise(kind = "clean") {
  const pool = (kind === "assisted" ? ASSISTED_PRAISE : CLEAN_PRAISE).map(normalizePraise);
  const history = state.praiseHistory[kind] || [];
  const fresh = pool.filter((phrase) => !history.includes(phrase.key));
  const lastPhrase = history[history.length - 1];
  const candidates = fresh.length ? fresh : pool.filter((phrase) => phrase.key !== lastPhrase);
  const chosen = candidates[Math.floor(Math.random() * candidates.length)] || pool[0];
  const maxHistory = Math.min(PRAISE_REPEAT_WINDOW, Math.max(1, pool.length - 1));

  history.push(chosen.key);
  while (history.length > maxHistory) history.shift();
  state.praiseHistory[kind] = history;

  return chosen;
}

function normalizePraise(entry) {
  if (typeof entry === "string") {
    return {
      key: entry,
      text: entry,
      meaning: "",
      speak: entry,
    };
  }

  return {
    key: entry.key || entry.text,
    text: entry.text,
    meaning: entry.meaning || "",
    speak: entry.speak || entry.text,
  };
}

function speakQuestion(item, delay = 0, force = false) {
  const first = item.flipped ? item.fact.b : item.fact.a;
  const second = item.flipped ? item.fact.a : item.fact.b;
  const phrase = `${word(first)} כפול ${word(second)}`;
  speak(phrase, delay, force);
}

function speak(text, delay = 0, force = false) {
  if (!force && !state.storage.voice) return;
  window.clearTimeout(speak.timer);
  speak.timer = window.setTimeout(() => {
    if (window.AndroidTts && typeof window.AndroidTts.speak === "function") {
      window.AndroidTts.speak(text);
      return;
    }

    if (!("speechSynthesis" in window)) {
      playTap();
      return;
    }

    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "he-IL";
    utterance.rate = 0.9;
    utterance.pitch = 1.04;
    speechSynthesis.speak(utterance);
  }, delay);
}

function stopSpeech() {
  if (window.AndroidTts && typeof window.AndroidTts.stop === "function") {
    window.AndroidTts.stop();
  }
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

function unlockAudio() {
  if (state.audio) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  state.audio = new AudioContext();
}

function playTap() {
  tone(320, 0.04, "triangle", 0.035);
}

function playStart() {
  rhythm([220, 294, 330], 0.08);
}

function playSuccess() {
  rhythm([330, 440, 660], 0.07);
  noiseHit(0.035);
}

function playMiss() {
  rhythm([210, 165], 0.09);
}

function playFinish() {
  rhythm([294, 370, 440, 587], 0.11);
}

function playStreakSound() {
  rhythm([392, 494, 587, 784], 0.065);
  setTimeout(() => noiseHit(0.03), 140);
}

function rhythm(notes, duration) {
  notes.forEach((note, index) => {
    setTimeout(() => tone(note, duration, "sine", 0.055), index * 88);
  });
}

function tone(freq, duration, type, volume) {
  if (!state.storage.sound || !state.audio) return;
  const now = state.audio.currentTime;
  const osc = state.audio.createOscillator();
  const gain = state.audio.createGain();
  const filter = state.audio.createBiquadFilter();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  filter.type = "bandpass";
  filter.frequency.value = 780;
  filter.Q.value = 8;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(filter).connect(gain).connect(state.audio.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function noiseHit(volume) {
  if (!state.storage.sound || !state.audio) return;
  const length = state.audio.sampleRate * 0.08;
  const buffer = state.audio.createBuffer(1, length, state.audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }
  const source = state.audio.createBufferSource();
  const gain = state.audio.createGain();
  gain.gain.value = volume;
  source.buffer = buffer;
  source.connect(gain).connect(state.audio.destination);
  source.start();
}

function tap(pattern = 12) {
  if ("vibrate" in navigator) navigator.vibrate(pattern);
}

function setupCanvases() {
  resizeCanvas(els.burstCanvas);
  resizeCanvas(els.ambientCanvas);
  resizeCanvas(els.homeCapoeiraCanvas);
  resizeCanvas(els.gameCapoeiraCanvas);
  resizeCanvas(els.streakCanvas);
  seedAmbient();
  if (!state.animationStarted) {
    state.animationStarted = true;
    requestAnimationFrame(drawParticles);
  }
}

function resizeCanvas(canvas) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function seedAmbient() {
  state.ambientParticles = Array.from({ length: 26 }, () => ({
    x: Math.random() * (els.ambientCanvas.clientWidth || 360),
    y: Math.random() * (els.ambientCanvas.clientHeight || 340),
    r: Math.random() * 2.8 + 1,
    speed: Math.random() * 0.35 + 0.14,
    color: shuffle(["#f5c24b", "#47b56c", "#48c7d8", "#e65f55"])[0],
  }));
}

function burst(count = 30) {
  const width = els.burstCanvas.clientWidth;
  const height = els.burstCanvas.clientHeight;
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    state.particles.push({
      x: width / 2,
      y: height / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      life: 52,
      size: Math.random() * 6 + 4,
      color: shuffle(["#f5c24b", "#47b56c", "#48c7d8", "#e65f55", "#fff9ee"])[0],
    });
  }
}

function drawParticles() {
  drawAmbient();
  drawCapoeiraStage(els.homeCapoeiraCanvas, "home", performance.now());
  drawCapoeiraStage(els.gameCapoeiraCanvas, "game", performance.now());
  drawStreakParticles();
  drawBurst();
  requestAnimationFrame(drawParticles);
}

function drawAmbient() {
  const canvas = els.ambientCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);
  for (const dot of state.ambientParticles) {
    dot.y -= dot.speed;
    dot.x += Math.sin(dot.y * 0.025) * 0.22;
    if (dot.y < -10) {
      dot.y = height + 10;
      dot.x = Math.random() * width;
    }
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawStreakParticles() {
  const canvas = els.streakCanvas;
  if (!canvas || !canvas.clientWidth || !els.streakDialog.open) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);
  state.streakFx.particles = state.streakFx.particles.filter((particle) => particle.life > 0);

  for (const particle of state.streakFx.particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.11;
    particle.spin += 0.16;
    particle.life -= 1;
    ctx.save();
    ctx.globalAlpha = Math.max(0, particle.life / 70);
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.spin);
    ctx.fillStyle = particle.color;
    ctx.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
    ctx.restore();
  }
}

function drawCapoeiraStage(canvas, kind, now) {
  if (!canvas || !canvas.clientWidth || !canvas.clientHeight) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);
  drawRodaBackdrop(ctx, width, height, kind, now);

  const move = stageMove(kind, now);
  drawMoveTrail(ctx, width, height, move.name, move.t, now);
  drawFighter(ctx, width, height, move.name, move.t, now, activeSkin());
}

function stageMove(kind, now) {
  if (kind === "game" && state.visual.activeMove) {
    const raw = (now - state.visual.moveStarted) / state.visual.moveDuration;
    if (raw < 1) {
      return { name: state.visual.activeMove, t: clamp(raw, 0, 1) };
    }
    state.visual.activeMove = null;
  }

  if (kind === "home") {
    const moves = ["ginga", "meia", "au", "esquiva", "armada"];
    const cycle = 2900;
    const index = Math.floor(now / cycle) % moves.length;
    const local = (now % cycle) / cycle;
    if (moves[index] !== "ginga" && local > 0.18 && local < 0.9) {
      return { name: moves[index], t: clamp((local - 0.18) / 0.72, 0, 1) };
    }
  }

  return { name: "ginga", t: (Math.sin(now / 260) + 1) / 2 };
}

function drawRodaBackdrop(ctx, width, height, kind, now) {
  const cx = width / 2;
  const cy = height * 0.57;
  const radius = Math.min(width, height) * 0.43;
  const glow = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.24);
  glow.addColorStop(0, "#40312a");
  glow.addColorStop(0.55, "#191614");
  glow.addColorStop(1, "#0e120f");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
  ctx.clip();
  ctx.translate(cx, cy);
  ctx.rotate(-0.42);
  for (let x = -width; x < width; x += 22) {
    const warm = (x / 22) % 2 === 0;
    ctx.fillStyle = warm ? "rgba(245, 194, 75, 0.055)" : "rgba(255, 249, 238, 0.035)";
    ctx.fillRect(x, -height, 12, height * 2);
  }
  ctx.restore();

  drawSpectators(ctx, cx, cy, radius, now);
  drawInstruments(ctx, cx, cy, radius, now);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, 0.82);
  const ringGradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
  ringGradient.addColorStop(0, "#47b56c");
  ringGradient.addColorStop(0.45, "#f5c24b");
  ringGradient.addColorStop(1, "#e65f55");
  ctx.strokeStyle = ringGradient;
  ctx.lineWidth = kind === "home" ? 9 : 8;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.setLineDash([14, 16]);
  ctx.strokeStyle = "rgba(255, 249, 238, 0.22)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.78, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#fff9ee";
  ctx.font = `900 ${Math.floor(radius * 0.28)}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("7", cx - radius * 0.68, cy - radius * 0.42);
  ctx.fillText("8", cx, cy + radius * 0.78);
  ctx.fillText("9", cx + radius * 0.68, cy - radius * 0.42);
  ctx.restore();

  for (let i = 0; i < 16; i += 1) {
    const a = now / 1600 + i * 2.399;
    const r = radius * (0.2 + (i % 5) * 0.18);
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a * 0.9) * r * 0.72;
    ctx.fillStyle = ["#f5c24b", "#47b56c", "#48c7d8", "#e65f55"][i % 4];
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.arc(x, y, 2 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawSpectators(ctx, cx, cy, radius, now) {
  for (let i = 0; i < 11; i += 1) {
    const angle = -Math.PI * 0.88 + (i / 10) * Math.PI * 1.76;
    const x = cx + Math.cos(angle) * radius * 1.08;
    const y = cy + Math.sin(angle) * radius * 0.88;
    const clap = Math.sin(now / 180 + i) > 0.15;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(0.72 + (i % 3) * 0.08, 0.72 + (i % 3) * 0.08);
    ctx.globalAlpha = 0.62;
    ctx.fillStyle = i % 2 ? "#2d271f" : "#263327";
    ctx.beginPath();
    ctx.roundRect(-9, 6, 18, 22, 8);
    ctx.fill();
    ctx.fillStyle = "#73513a";
    ctx.beginPath();
    ctx.arc(0, -2, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,249,238,0.42)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-7, 13);
    ctx.lineTo(clap ? -2 : -15, clap ? 4 : 11);
    ctx.moveTo(7, 13);
    ctx.lineTo(clap ? 2 : 15, clap ? 4 : 11);
    ctx.stroke();
    ctx.restore();
  }
}

function drawInstruments(ctx, cx, cy, radius, now) {
  ctx.save();
  ctx.translate(cx - radius * 1.08, cy + radius * 0.22);
  ctx.rotate(-0.32);
  ctx.strokeStyle = "rgba(245, 194, 75, 0.75)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 42);
  ctx.quadraticCurveTo(-22, -25, 15, -78);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 249, 238, 0.5)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(0, 42);
  ctx.lineTo(15, -78);
  ctx.stroke();
  ctx.fillStyle = "#7a4b2c";
  ctx.beginPath();
  ctx.ellipse(-6, 22, 14, 19, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(cx + radius * 1.02, cy + radius * 0.36);
  ctx.rotate(0.12);
  ctx.fillStyle = "rgba(99, 58, 32, 0.78)";
  ctx.beginPath();
  ctx.roundRect(-17, -30, 34, 62, 9);
  ctx.fill();
  ctx.fillStyle = "rgba(245, 194, 75, 0.78)";
  ctx.beginPath();
  ctx.ellipse(0, -30, 18, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = Math.sin(now / 150) > 0 ? "#fff9ee" : "#f5c24b";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function drawMoveTrail(ctx, width, height, name, rawT, now) {
  const t = easeInOut(clamp(rawT, 0, 1));
  const cx = width / 2;
  const cy = height * 0.57;
  const r = Math.min(width, height) * 0.26;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (name === "meia") {
    const start = -Math.PI * 0.92;
    const end = start + Math.PI * 1.55 * t;
    ctx.strokeStyle = "rgba(245, 194, 75, 0.88)";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.3, r * 1.1, start, end);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 249, 238, 0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.3, r * 0.88, start + 0.12, end);
    ctx.stroke();
  } else if (name === "armada") {
    for (let i = 0; i < 3; i += 1) {
      ctx.strokeStyle = `rgba(${i ? "245, 194, 75" : "72, 199, 216"}, ${0.62 - i * 0.14})`;
      ctx.lineWidth = 10 - i * 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy - r * 0.15, r * (1.1 + i * 0.12), r * (0.38 + i * 0.05), -0.22, -Math.PI * 0.95, -Math.PI * 0.95 + Math.PI * 1.7 * t);
      ctx.stroke();
    }
  } else if (name === "au") {
    const dustX = lerp(cx - r * 0.9, cx + r * 0.9, t);
    for (let i = 0; i < 8; i += 1) {
      ctx.fillStyle = i % 2 ? "rgba(245, 194, 75, 0.45)" : "rgba(255, 249, 238, 0.38)";
      ctx.beginPath();
      ctx.arc(dustX + Math.sin(now / 100 + i) * 28, cy + r * 0.92 + (i % 3) * 4, 2 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (name === "esquiva") {
    ctx.strokeStyle = "rgba(72, 199, 216, 0.72)";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.7, cy - r * 0.52);
    ctx.quadraticCurveTo(cx - r * 0.05, cy - r * 0.82, cx - r * 0.72 * t, cy + r * 0.35 * t);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFighter(ctx, width, height, name, rawT, now, skin = activeSkin()) {
  const cx = width / 2;
  const cy = height * 0.57;
  const scale = Math.min(width, height) / 250;
  const pose = poseForMove(name, rawT, now);

  ctx.save();
  ctx.translate(cx + pose.offset.x * scale, cy + pose.offset.y * scale);
  ctx.scale(scale, scale);
  if (pose.rotation) ctx.rotate(pose.rotation);

  ctx.save();
  ctx.globalAlpha = 0.38;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(0, 82, 70, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  drawLimb(ctx, [pose.lHip, pose.lKnee, pose.lFoot], skin.pants, 18);
  drawLimb(ctx, [pose.rHip, pose.rKnee, pose.rFoot], skin.pantsAlt || skin.pants, 18);
  drawFoot(ctx, pose.lFoot, pose.lKnee, skin.pants);
  drawFoot(ctx, pose.rFoot, pose.rKnee, skin.pantsAlt || skin.pants);

  drawTorso(ctx, pose, skin);
  drawLimb(ctx, [pose.lShoulder, pose.lElbow, pose.lHand], skin.skinTone, 13);
  drawLimb(ctx, [pose.rShoulder, pose.rElbow, pose.rHand], skin.skinTone, 13);
  drawHand(ctx, pose.lHand, skin);
  drawHand(ctx, pose.rHand, skin);
  drawCord(ctx, pose);
  drawHead(ctx, pose.head, skin);

  ctx.restore();
}

function poseForMove(name, rawT, now) {
  const t = easeInOut(clamp(rawT, 0, 1));
  if (name === "meia") return poseMeiaLua(t);
  if (name === "au") return poseAu(t);
  if (name === "esquiva") return poseEsquiva(t);
  if (name === "armada") return poseArmada(t);
  if (name === "ginga-pop") return poseJump(t);
  return poseGinga(now);
}

function basePose() {
  return {
    offset: p(0, 0),
    rotation: 0,
    head: p(0, -78),
    chest: p(0, -42),
    hip: p(0, 8),
    lShoulder: p(-19, -39),
    lElbow: p(-43, -16),
    lHand: p(-50, 14),
    rShoulder: p(19, -39),
    rElbow: p(43, -16),
    rHand: p(50, 14),
    lHip: p(-13, 8),
    lKnee: p(-38, 48),
    lFoot: p(-58, 78),
    rHip: p(13, 8),
    rKnee: p(36, 48),
    rFoot: p(58, 78),
  };
}

function poseGinga(now) {
  const left = basePose();
  left.offset = p(-8, 0);
  left.head = p(-6, -80);
  left.chest = p(-5, -42);
  left.hip = p(8, 8);
  left.lShoulder = p(-23, -40);
  left.lElbow = p(-48, -22);
  left.lHand = p(-55, 2);
  left.rShoulder = p(12, -40);
  left.rElbow = p(34, -58);
  left.rHand = p(54, -43);
  left.lHip = p(-4, 8);
  left.lKnee = p(-42, 46);
  left.lFoot = p(-66, 75);
  left.rHip = p(20, 8);
  left.rKnee = p(45, 26);
  left.rFoot = p(74, 55);

  const right = mirrorPose(left);
  right.offset = p(8, 0);
  const phase = (Math.sin(now / 190) + 1) / 2;
  return mixPose(left, right, easeInOut(phase));
}

function poseMeiaLua(t) {
  const pose = basePose();
  const sweep = lerp(-1, 1, t);
  const lift = Math.sin(Math.PI * t);
  pose.offset = p(lerp(-8, 8, t), -6 * lift);
  pose.head = p(-10 * sweep, -82 - 5 * lift);
  pose.chest = p(-8 * sweep, -43 - 3 * lift);
  pose.hip = p(5 * sweep, 6);
  pose.lShoulder = p(-21 - 6 * sweep, -41);
  pose.lElbow = p(-48, -55 + 18 * t);
  pose.lHand = p(-60, -30 + 26 * t);
  pose.rShoulder = p(20 - 8 * sweep, -40);
  pose.rElbow = p(45, -50 + 22 * (1 - t));
  pose.rHand = p(60, -28 + 20 * (1 - t));
  pose.rHip = p(14, 7);
  pose.rKnee = p(26, 48);
  pose.rFoot = p(42, 82);
  pose.lHip = p(-12, 6);
  pose.lKnee = p(lerp(-56, 42, t), -6 - 18 * lift);
  pose.lFoot = p(lerp(-105, 108, t), -22 - 28 * lift);
  return pose;
}

function poseArmada(t) {
  const pose = basePose();
  const spin = t * Math.PI * 2;
  const side = Math.cos(spin);
  const lift = Math.sin(Math.PI * t);
  pose.offset = p(Math.sin(spin) * 10, -8 * lift);
  pose.rotation = Math.sin(spin) * 0.18;
  pose.head = p(side * 10, -80 - 4 * lift);
  pose.chest = p(side * 8, -42);
  pose.hip = p(-side * 5, 8);
  pose.lShoulder = p(-18 + side * 10, -39);
  pose.rShoulder = p(18 + side * 10, -39);
  pose.lElbow = p(-44 + side * 24, -54);
  pose.lHand = p(-64 + side * 28, -38);
  pose.rElbow = p(46 + side * 24, -56);
  pose.rHand = p(66 + side * 28, -38);
  pose.lHip = p(-12, 8);
  pose.lKnee = p(-24, 48);
  pose.lFoot = p(-44, 82);
  pose.rHip = p(14, 8);
  pose.rKnee = p(52 * side, -8 - 20 * lift);
  pose.rFoot = p(112 * side, -17 - 23 * lift);
  return pose;
}

function poseAu(t) {
  const pose = basePose();
  pose.offset = p(lerp(-62, 62, t), -34 * Math.sin(Math.PI * t));
  pose.rotation = lerp(-0.25, Math.PI * 2 - 0.25, t);
  pose.head = p(0, -68);
  pose.chest = p(0, -36);
  pose.hip = p(0, 10);
  pose.lShoulder = p(-18, -38);
  pose.rShoulder = p(18, -38);
  pose.lElbow = p(-36, -10);
  pose.lHand = p(-38, 34);
  pose.rElbow = p(36, -10);
  pose.rHand = p(38, 34);
  pose.lHip = p(-12, 8);
  pose.lKnee = p(-52, -18);
  pose.lFoot = p(-90, -48);
  pose.rHip = p(12, 8);
  pose.rKnee = p(52, -18);
  pose.rFoot = p(90, -48);
  return pose;
}

function poseEsquiva(t) {
  const low = basePose();
  low.offset = p(-10 * t, 16 * t);
  low.head = p(-26, -34);
  low.chest = p(-16, -12);
  low.hip = p(8, 30);
  low.lShoulder = p(-34, -12);
  low.lElbow = p(-54, 24);
  low.lHand = p(-64, 68);
  low.rShoulder = p(2, -18);
  low.rElbow = p(32, -48);
  low.rHand = p(58, -36);
  low.lHip = p(-3, 29);
  low.lKnee = p(-46, 48);
  low.lFoot = p(-78, 74);
  low.rHip = p(18, 29);
  low.rKnee = p(52, 40);
  low.rFoot = p(86, 64);
  return mixPose(basePose(), low, Math.sin(Math.PI * t));
}

function poseJump(t) {
  const pose = poseGinga(performance.now());
  const hop = Math.sin(Math.PI * t);
  pose.offset.y -= 25 * hop;
  pose.lElbow.y -= 24 * hop;
  pose.rElbow.y -= 24 * hop;
  pose.lHand.y -= 32 * hop;
  pose.rHand.y -= 32 * hop;
  pose.lFoot.x -= 8 * hop;
  pose.rFoot.x += 8 * hop;
  return pose;
}

function drawLimb(ctx, points, color, width) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.34)";
  ctx.lineWidth = width + 6;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
  ctx.stroke();

  const gradient = ctx.createLinearGradient(points[0].x, points[0].y, points[2].x, points[2].y);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, shade(color, -16));
  ctx.strokeStyle = gradient;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
  ctx.stroke();
  ctx.restore();
}

function drawTorso(ctx, pose, skin) {
  const angle = Math.atan2(pose.hip.y - pose.chest.y, pose.hip.x - pose.chest.x);
  const length = distance(pose.chest, pose.hip) + 16;
  const mid = p((pose.chest.x + pose.hip.x) / 2, (pose.chest.y + pose.hip.y) / 2);
  const shirtColors = skin.shirt || ["#fff3b6", "#f5c24b", "#d88c2d"];
  ctx.save();
  ctx.translate(mid.x, mid.y);
  ctx.rotate(angle - Math.PI / 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
  ctx.beginPath();
  ctx.roundRect(-24, -length / 2 + 2, 48, length, 17);
  ctx.fill();
  const shirt = ctx.createLinearGradient(-20, -length / 2, 20, length / 2);
  shirt.addColorStop(0, shirtColors[0]);
  shirt.addColorStop(0.52, shirtColors[1] || shirtColors[0]);
  shirt.addColorStop(1, shirtColors[2] || shirtColors[1] || shirtColors[0]);
  ctx.fillStyle = shirt;
  ctx.beginPath();
  ctx.roundRect(-20, -length / 2, 40, length, 16);
  ctx.fill();
  ctx.restore();
}

function drawCord(ctx, pose) {
  const angle = Math.atan2(pose.rHip.y - pose.lHip.y, pose.rHip.x - pose.lHip.x);
  const mid = p((pose.lHip.x + pose.rHip.x) / 2, (pose.lHip.y + pose.rHip.y) / 2 - 2);
  const colors = getCord().colors || [CORD_PALETTE.white];
  ctx.save();
  ctx.translate(mid.x, mid.y);
  ctx.rotate(angle);
  ctx.lineCap = "round";
  ctx.lineWidth = 6;
  ctx.strokeStyle = colors[0];
  ctx.beginPath();
  ctx.moveTo(-24, 0);
  ctx.lineTo(24, 0);
  ctx.stroke();
  ctx.strokeStyle = colors[1] || shade(colors[0], -24);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(colors[1] ? 0 : 3, 0);
  ctx.lineTo(28, 2);
  ctx.stroke();
  ctx.restore();
}

function drawHead(ctx, head, skin) {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.arc(head.x + 3, head.y + 4, 18, 0, Math.PI * 2);
  ctx.fill();

  drawHairBack(ctx, head, skin);

  const face = ctx.createRadialGradient(head.x - 5, head.y - 7, 3, head.x, head.y, 18);
  face.addColorStop(0, shade(skin.skinTone, 28));
  face.addColorStop(1, skin.skinShadow || shade(skin.skinTone, -38));
  ctx.fillStyle = face;
  ctx.beginPath();
  ctx.arc(head.x, head.y, 17, 0, Math.PI * 2);
  ctx.fill();

  drawHairFront(ctx, head, skin);
  ctx.restore();
}

function drawHairBack(ctx, head, skin) {
  ctx.fillStyle = skin.hair;
  if (skin.hairStyle === "braid") {
    ctx.beginPath();
    ctx.ellipse(head.x + 13, head.y - 2, 7, 23, -0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = skin.hairAccent;
    ctx.beginPath();
    ctx.arc(head.x + 15, head.y + 22, 4, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (skin.hairStyle === "curls") {
    for (let i = 0; i < 10; i += 1) {
      const angle = -Math.PI * 0.45 + i * 0.36;
      ctx.beginPath();
      ctx.arc(head.x + Math.cos(angle) * 17, head.y - 4 + Math.sin(angle) * 13, 8.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = skin.hairAccent;
    for (let i = 0; i < 5; i += 1) {
      const angle = -Math.PI * 0.32 + i * 0.46;
      ctx.beginPath();
      ctx.arc(head.x + Math.cos(angle) * 14, head.y - 9 + Math.sin(angle) * 9, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }

  if (skin.hairStyle === "dreads") {
    ctx.lineCap = "round";
    ctx.strokeStyle = skin.hair;
    ctx.lineWidth = 6;
    for (let i = 0; i < 7; i += 1) {
      const x = head.x - 16 + i * 5.2;
      const sway = Math.sin(i * 1.7) * 4;
      ctx.beginPath();
      ctx.moveTo(x, head.y - 9);
      ctx.quadraticCurveTo(x + sway, head.y + 5, x + sway * 0.6, head.y + 24 + (i % 3) * 4);
      ctx.stroke();
    }
    ctx.strokeStyle = skin.hairAccent;
    ctx.lineWidth = 2.5;
    for (let i = 1; i < 7; i += 2) {
      const x = head.x - 16 + i * 5.2;
      ctx.beginPath();
      ctx.moveTo(x + 1, head.y + 2);
      ctx.lineTo(x + 3, head.y + 18);
      ctx.stroke();
    }
  }
}

function drawHairFront(ctx, head, skin) {
  ctx.fillStyle = skin.hair;
  ctx.beginPath();
  ctx.arc(head.x - 3, head.y - 12, 14, Math.PI * 0.95, Math.PI * 2.08);
  ctx.fill();

  if (skin.hairStyle === "headband") {
    ctx.strokeStyle = skin.hairAccent;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(head.x - 15, head.y - 10);
    ctx.lineTo(head.x + 14, head.y - 9);
    ctx.stroke();
  } else if (skin.hairStyle === "braid") {
    ctx.fillStyle = skin.hairAccent;
    ctx.beginPath();
    ctx.roundRect(head.x - 12, head.y - 18, 18, 5, 4);
    ctx.fill();
  } else if (skin.hairStyle === "curls") {
    ctx.fillStyle = skin.hair;
    ctx.beginPath();
    ctx.arc(head.x - 11, head.y - 12, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(head.x + 10, head.y - 14, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = skin.hairAccent;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(head.x + 10, head.y - 15, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(head.x - 10, head.y - 12, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  } else if (skin.hairStyle === "dreads") {
    ctx.strokeStyle = "#f5c24b";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(head.x - 15, head.y - 11);
    ctx.lineTo(head.x + 14, head.y - 10);
    ctx.stroke();

    ctx.strokeStyle = skin.hair;
    ctx.lineWidth = 4.5;
    const frontLocks = [
      [head.x - 14, head.y - 8, head.x - 23, head.y + 20],
      [head.x - 7, head.y - 13, head.x - 12, head.y + 24],
      [head.x + 8, head.y - 13, head.x + 12, head.y + 24],
      [head.x + 15, head.y - 8, head.x + 24, head.y + 20],
    ];
    for (const [x1, y1, x2, y2] of frontLocks) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 + 12, x2, y2);
      ctx.stroke();
    }

    ctx.strokeStyle = skin.hairAccent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(head.x - 20, head.y + 8);
    ctx.lineTo(head.x - 22, head.y + 17);
    ctx.moveTo(head.x + 18, head.y + 8);
    ctx.lineTo(head.x + 21, head.y + 17);
    ctx.stroke();
  }
}

function drawHand(ctx, hand, skin) {
  ctx.save();
  ctx.fillStyle = skin.skinTone;
  ctx.strokeStyle = "rgba(0,0,0,0.22)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(hand.x, hand.y, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawFoot(ctx, foot, knee, color) {
  const angle = Math.atan2(foot.y - knee.y, foot.x - knee.x);
  ctx.save();
  ctx.translate(foot.x, foot.y);
  ctx.rotate(angle);
  ctx.fillStyle = shade(color, -8);
  ctx.strokeStyle = "rgba(0,0,0,0.24)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(-12, -6, 28, 12, 7);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function mirrorPose(source) {
  const pose = {};
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && "x" in value) {
      pose[key] = p(-value.x, value.y);
    } else {
      pose[key] = value;
    }
  }
  return pose;
}

function mixPose(a, b, t) {
  const pose = {};
  for (const key of Object.keys(a)) {
    const av = a[key];
    const bv = b[key];
    if (av && typeof av === "object" && "x" in av) {
      pose[key] = p(lerp(av.x, bv.x, t), lerp(av.y, bv.y, t));
    } else if (typeof av === "number") {
      pose[key] = lerp(av, bv, t);
    } else {
      pose[key] = av;
    }
  }
  return pose;
}

function p(x, y) {
  return { x, y };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeInOut(t) {
  return t * t * (3 - 2 * t);
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function shade(hex, amount) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  const r = clamp(((value >> 16) & 255) + amount, 0, 255);
  const g = clamp(((value >> 8) & 255) + amount, 0, 255);
  const b = clamp((value & 255) + amount, 0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function drawBurst() {
  const canvas = els.burstCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);

  state.particles = state.particles.filter((particle) => particle.life > 0);
  for (const particle of state.particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.08;
    particle.life -= 1;
    ctx.globalAlpha = Math.max(0, particle.life / 52);
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size * 0.55);
  }
  ctx.globalAlpha = 1;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

async function loadRewardLibrary() {
  try {
    const response = await fetch(ABADA_REWARD_LIBRARY_PATH, { cache: "no-cache" });
    if (!response.ok) return;
    const videos = await response.json();
    const capoeira = Array.isArray(videos) ? videos.filter(isValidRewardVideo).slice(0, 150) : [];
    if (!capoeira.length) return;
    state.reward.library = {
      ...REWARD_VIDEOS,
      capoeira,
    };
  } catch {
    state.reward.library = REWARD_VIDEOS;
  }
}

function isValidRewardVideo(video) {
  return (
    video &&
    typeof video.id === "string" &&
    /^[A-Za-z0-9_-]{11}$/.test(video.id) &&
    typeof video.title === "string" &&
    video.title.trim().length > 0
  );
}
