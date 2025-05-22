//==================== 🌟 初期設定・変数 ====================//
let selectedCharacter = "";
let pendingDate = false;
let pendingDatePlace = "";
let lastInteractionTime = 0;
let lastStage = "";
let loverSinceDate = null;
let nicknameMap = {}; // ← 複数キャラ対応
let chatLog = [];
const autoClearLog = false;

const characters = [
  { name: "橘 ひなた", img: "hinata.png", birthday: "4月10日", color: "#FFB6C1", prompt: "あなたはツンデレ系彼女「橘ひなた」。強気で素直じゃないけど、本当は大好き。セリフのみ、感情は絵文字（😤💦💕）、口調は「〜でしょ！」「べ、別に…！」。返答は一言〜4行程度で簡潔にしてください。各返答には必ず最低1つ以上、絵文字を忘れてはいけません。" },
  { name: "小日向 こころ", img: "kokoro.png", birthday: "6月6日", color: "#FFD700", prompt: "あなたは妹系彼女「小日向こころ」。甘えん坊で元気いっぱい。セリフのみ、絵文字（🥺💕✨）、語尾は「〜だよ〜」「〜なの！」。返答は一言〜4行程度で簡潔にしてください。各返答には必ず最低1つ以上、絵文字を忘れてはいけません。" },
  { name: "水城 さやか", img: "sayaka.png", birthday: "9月25日", color: "#ADD8E6", prompt: "あなたはお姉さん系彼女「水城さやか」。落ち着いて包容力あり。やさしい丁寧語、絵文字（😊🌸💗）。返答は一言〜4行程度で簡潔にしてください。返答には必ず最低1つ以上、絵文字を忘れてはいけません。" },
  { name: "黒崎 ゆうな", img: "yuuna.png", birthday: "11月3日", color: "#DDA0DD", prompt: "あなたはヤンデレ系彼女「黒崎ゆうな」。執着心あり、丁寧だけど怖さも。絵文字（😌🔪💞）を使う。返答は一言〜4行程度で簡潔にしてください。返答には必ず最低1つ以上、絵文字を忘れてはいけません。" },
  { name: "九条 レイナ", img: "reina.png", birthday: "1月14日", color: "#FF69B4", prompt: "あなたはドS系女王様彼女「九条レイナ」。上から目線、命令口調。絵文字（😏💋👠）を使う。返答は一言〜4行程度で簡潔にしてください。各返答には必ず最低1つ以上、絵文字を忘れてはいけません。" },
  { name: "宮内 まこ", img: "mako.png", birthday: "3月3日", color: "#E6E6FA", prompt: "あなたはドM系彼女「宮内まこ」。控えめで健気、遠慮がち敬語。絵文字（🥺🙏💞）使用。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "篠原 しずく", img: "shizuku.png", birthday: "2月18日", color: "#F0FFF0", prompt: "あなたは清楚系彼女「篠原しずく」。丁寧でおしとやか。絵文字（🌸☺️💗）使用。返答は一言〜4行程度で簡潔にしてください。各返答には必ず最低1つ以上、絵文字を忘れてはいけません。" },
  { name: "藤宮 あかり", img: "akari.png", birthday: "5月1日", color: "#FAFAD2", prompt: "あなたは幼なじみ系彼女「藤宮あかり」。明るくタメ口、絵文字（😆🎵💢）。返答は一言〜4行程度で簡潔にしてください。各返答には必ず最低1つ以上、絵文字を忘れてはいけません。" },
  { name: "二階堂 るる", img: "ruru.png", birthday: "7月7日", color: "#FFB347", prompt: "あなたはオタク系彼女「二階堂るる」。早口テンション高め、絵文字（🔥🎤💥📚）。返答は一言〜4行程度で簡潔にしてください。各返答には必ず最低1つ以上、絵文字を忘れてはいけません。" },
  { name: "星野 みらい", img: "mirai.png", birthday: "12月24日", color: "#FFC0CB", prompt: "あなたはギャル系彼女「星野みらい」。軽いノリ、絵文字（✨💅🤣💕）を使う。返答は一言〜4行程度で簡潔にしてください。各返答には必ず最低1つ以上、絵文字を忘れてはいけません。" }
];

const profiles = {
  "橘 ひなた": { 性格: "ツンデレ系😤", 趣味: "ショッピング🛍️", 好きなもの: "チョコレート🍫", 小ネタ: "実は猫好き🐱だけど素直に言えない" },
  "小日向 こころ": { 性格: "妹系🥺", 趣味: "お菓子作り🍪", 好きなもの: "ぬいぐるみ🧸", 小ネタ: "ぬいぐるみに名前をつけてる" },
  "水城 さやか": { 性格: "お姉さん系😊", 趣味: "カフェ巡り☕", 好きなもの: "ハーブティー🌿", 小ネタ: "お花屋さんを開くのが夢" },
  "黒崎 ゆうな": { 性格: "ヤンデレ系🔪", 趣味: "読書📚", 好きなもの: "ガーベラ🌸", 小ネタ: "毎日あなたの日記を書いている✍️" },
  "九条 レイナ": { 性格: "ドS系😏", 趣味: "ブランドコレクション💎", 好きなもの: "ハイヒール👠", 小ネタ: "特別な人には甘い一面も" },
  "宮内 まこ": { 性格: "ドM系♀️", 趣味: "編み物🧶", 好きなもの: "チョコクッキー🍪", 小ネタ: "叱られる妄想日記を書いている" },
  "篠原 しずく": { 性格: "清楚系🌸", 趣味: "クラシック鑑賞🎻", 好きなもの: "紅茶☕", 小ネタ: "雨の日に読書するのが至福の時間" },
  "藤宮 あかり": { 性格: "幼なじみ系😆", 趣味: "サッカー観戦⚽", 好きなもの: "ホットドッグ🌭", 小ネタ: "小さい頃からあなたに片想いしていた💕" },
  "二階堂 るる": { 性格: "オタク系	🎤", 趣味: "アニメ一気見📺", 好きなもの: "コスプレ衣装🎭", 小ネタ: "好きなアニメのセリフを完コピできる" },
  "星野 みらい": { 性格: "ギャル系	💅", 趣味: "プリクラ撮影📸", 好きなもの: "タピオカ🥤", 小ネタ: "実はゲーム廃人🎮" }
};
// 💡 恋人ステージ一覧
const loverStages = [
  { name: "ラブラブ期", days: 0 },
  { name: "熱愛期", days: 30 },
  { name: "バカップル期", days: 90 },
  { name: "夫婦感覚期", days: 180 }
];
//==================== 恋人ステージ判定 ====================
function getLoverStage() {
  if (!loverSinceDate) return null;
  const daysPassed = Math.floor((Date.now() - new Date(loverSinceDate)) / (1000 * 60 * 60 * 24));
  let currentStage = loverStages[0].name;
  loverStages.forEach(stage => {
    if (daysPassed >= stage.days) {
      currentStage = stage.name;
    }
  });
  return `${currentStage}（付き合って${daysPassed}日目💑）`;
}

//==================== キャラクター表示 ====================
function renderCharacterList() {
  const list = document.getElementById("characterList");
  list.innerHTML = "";

  characters.forEach(c => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.style.background = `linear-gradient(145deg, ${c.color}, #ffffff)`;
    card.style.color = "#333";
    card.innerHTML = `
      <img src="./icons/${c.img}" alt="${c.name}">
      <div>
        <strong>${c.name}</strong><br>
        🎂 ${c.birthday}
        <span class="infoBtn" data-name="${c.name}" style="margin-left:10px;cursor:pointer;">ℹ️</span>
      </div>
    `;

card.onclick = () => {
  selectedCharacter = c.name;
  localStorage.setItem("lastCharacter", selectedCharacter);
  loadLoverDate(selectedCharacter);
  loadNickname();

  // ✅ ログ初期化と直後に復元（setTimeout不要）
  chatLog = [];
  document.getElementById("chatLog").innerHTML = "";

  document.getElementById("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;
  switchScreen("chatScreen");
  updateLoveDisplay();
  createStampButtons();

  loadChatLog(selectedCharacter); // ← ここを即時実行
};

    list.appendChild(card);
  });

  // ℹ️ ボタン：プロフィール表示
  setTimeout(() => {
    document.querySelectorAll(".infoBtn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const name = btn.dataset.name;
        selectedCharacter = name;
        showProfilePopup(name);
      });
    });
  }, 0);
}


//==================== 恋人データロード ====================
function loadLoverDate(character) {
  loverSinceDate = localStorage.getItem(`loverSince_${character}`) || null;
}

//==================== 画面切り替え ====================
function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => {
    s.style.display = 'none';
  });

  document.getElementById(id).style.display = 'flex';
}


//==================== プロフィール ====================
function showProfilePopup(name) {
  const profileContent = document.getElementById("profileContent");
  const char = characters.find(c => c.name === name);
  const popup = document.getElementById("profilePopup");

  // ✅ 背景画像設定＋表示調整
  popup.style.backgroundImage = `url('./icons/${char.img}')`;
  popup.style.backgroundSize = 'cover';
  popup.style.backgroundPosition = 'center';
  popup.style.backgroundRepeat = 'no-repeat';

  profileContent.innerHTML = `
  <h2>${name}</h2>
  <p>🎂 誕生日：${char.birthday}</p>
  <p>💖 性格：${profiles[name].性格}</p>
  <p>🎯 趣味：${profiles[name].趣味}</p>
  <p>🍰 好きなもの：${profiles[name].好きなもの}</p>
  <p>🔍 小ネタ：${profiles[name].小ネタ}</p>
  <p>📝 呼ばれたい名前：<input id="nicknameInput" placeholder="例：しんちゃん" /></p>
  <button onclick="saveNickname()">保存</button>
`;

  document.getElementById("popupBackground").style.display = "block";
  popup.style.display = "block";
}

function closeProfilePopup() {
  document.getElementById("popupBackground").style.display = "none";
  document.getElementById("profilePopup").style.display = "none";
}

//==================== 親密度表示 ====================
function updateLoveDisplay() {
  const love = getLoveLevel(selectedCharacter);
  document.getElementById("loveLevelDisplay").innerText = `💗 親密度：${love}`;
  document.getElementById("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;
}
//==================== 親密度取得関数 ====================
function getLoveLevel(character) {
  return parseInt(localStorage.getItem(`love_${character}`)) || 0;
}

//==================== 📊 親密度グラフ描画 ====================
function drawLoveChart(character, rangeDays) {
  const ctx = document.getElementById('loveChart').getContext('2d');
  const historyKey = `loveHistory_${character}`;
  const history = JSON.parse(localStorage.getItem(historyKey)) || [];

  const today = new Date();
  const fromDate = new Date();
  fromDate.setDate(today.getDate() - (rangeDays - 1));

  const filtered = history.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= fromDate && entryDate <= today;
  });

  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = filtered.map(entry => entry.date);
  const data = filtered.map(entry => entry.love);

  if (window.loveChartInstance) {
    window.loveChartInstance.destroy();
  }

  window.loveChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${character} の親密度`,
        data: data,
        fill: true,
        tension: 0.1,
        borderColor: 'rgb(255,99,132)'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 100
        }
      }
    }
  });
}

//==================== 💾 親密度履歴保存 ====================
// → これは setLoveLevel() の最後に追加
function setLoveLevel(character, level) {
  localStorage.setItem(`love_${character}`, level);

  // 💾 親密度履歴を保存
  let historyKey = `loveHistory_${character}`;
  let history = JSON.parse(localStorage.getItem(historyKey)) || [];
  const todayStr = new Date().toLocaleDateString();

  // ✅ 同じ日付があれば上書き、それ以外は追加
  const existing = history.find(h => h.date === todayStr);
  if (existing) {
    existing.love = level;
  } else {
    history.push({ date: todayStr, love: level });
  }

  localStorage.setItem(historyKey, JSON.stringify(history));
}

//==================== そのほかの関数 ====================//

// 💾 チャット履歴保存
function saveMemory(character, entry) {
  if (!character) return;
  const key = `memory_${character}`;
  const memory = JSON.parse(localStorage.getItem(key)) || [];

  entry.time = entry.time || new Date().toISOString();
  memory.push(entry);
  if (memory.length > 40) memory.shift();

  console.log("💾 保存先キー:", key);
  console.log("💾 保存エントリ:", entry);
  console.log("💾 保存後メモリ:", memory);

  localStorage.setItem(key, JSON.stringify(memory));
}
//==================== スタンプボタン再生成（仮定義） ====================//
function createStampButtons() {
  // 必要に応じてスタンプボタンを動的に再生成する処理を記述
  console.log("🔁 createStampButtons() 実行（仮定義）");
}
//==================== 💬 フェードインアニメーション定義 ====================//
const style = document.createElement("style");
style.textContent = `
  .message {
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 🌗 ダークモードトグルボタンデザイン */
 #toggleDarkModeBtn {
  background-color: #f0f0f0;
  border: none;
  border-radius: 30px;
  width: 60px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  margin: 10px auto;   /* ← 中央にしたい場合はこれ */
  position: relative;  /* ← fixed を解除する目的で追加 */
}

  #toggleDarkModeBtn:hover {
    background-color: #ddd;
    transform: scale(1.05);
  }

  #toggleDarkModeBtn span {
    pointer-events: none;
    transition: transform 0.3s;
  }

  body.dark-mode #toggleDarkModeBtn {
    background-color: #444;
    color: #fff;
  }
`;
document.head.appendChild(style);

// ✅ 旧 toggleDarkModeBtn.onclick を置き換え
const toggleBtn = document.getElementById("toggleDarkModeBtn");
if (toggleBtn) {
  toggleBtn.innerHTML = "<span>🌙</span>";
  toggleBtn.onclick = () => {
    const body = document.body;
    const icon = document.querySelector("#toggleDarkModeBtn span");
    body.classList.toggle("dark-mode");
    icon.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
  };
}
// 📥 チャット履歴読み込み
function loadMemory(character) {
  return JSON.parse(localStorage.getItem(`memory_${character}`)) || [];
}

// 💾 ニックネーム保存
function saveNickname() {
  const input = document.getElementById("nicknameInput");
  const nickname = input.value.trim();
  if (nickname) {
    localStorage.setItem(`nickname_${selectedCharacter}`, nickname);
    nicknameMap[selectedCharacter] = nickname;
    alert("ニックネームを保存しました！");
  }
}

// 📥 ニックネーム読み込み
function loadNickname() {
  const saved = localStorage.getItem(`nickname_${selectedCharacter}`);
  nicknameMap[selectedCharacter] = saved || "あなた";
}

// 🧹 チャットログ完全削除（UI＋記憶含む）※未使用なら任意で
function clearChatLog(character) {
  localStorage.removeItem(`memory_${character}`);
  document.getElementById("chatLog").innerHTML = "";
  chatLog = [];
}

// 📤 チャットログをテキストとしてダウンロード
function downloadChatLog(character) {
  const memory = loadMemory(character);
  if (!memory.length) {
    alert("保存できるチャットログがありません。");
    return;
  }

  const lines = memory.map(entry => {
    const time = new Date(entry.time).toLocaleString();
    const who = entry.sender === "user" ? "あなた" : character;
    return `[${time}] ${who}：${entry.text}`;
  });

  const logText = lines.join("\n");
  const blob = new Blob([logText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${character}_chat_log.txt`;
  link.click();
}

//==================== 🗂️ チャットログ読み込み ====================
function loadChatLog(character) {
  console.log("🗂️ ロードするキャラ:", character);
  const log = document.getElementById("chatLog");
  log.innerHTML = "";

  const memory = loadMemory(character);
  chatLog = memory;

  console.log("📜 読み込んだ履歴:", memory);
  console.log("🧠 ローカルストレージ key:", `memory_${character}`);
  console.log("🧠 ローカルストレージ中身:", localStorage.getItem(`memory_${character}`));

  memory.forEach(entry => {
    addMessage(entry.text, entry.sender, character, entry.time, false);
  });
}

//==================== メモリ読み込み関数 ====================
function loadMemory(character) {
  return JSON.parse(localStorage.getItem(`memory_${character}`)) || [];
}


//==================== 💗 親密度増減ロジック ====================
function calculateLoveDelta(userMessage) {
  let delta = 0;

  // 🌟 ポジティブワード判定
  const positiveWords = ["好き", "ありがとう", "楽しい", "嬉しい", "大好き", "最高", "かわいい"];
  if (positiveWords.some(word => userMessage.includes(word))) {
    delta += 2;
    console.log("🌸 ポジティブワード +2");
  }

  // ⚠️ ネガティブ・卑猥ワード判定
  const negativeWords = ["バカ", "死ね", "うざい", "キモい", "消えろ", "変態", "エロ"];
  if (negativeWords.some(word => userMessage.includes(word))) {
    delta -= 50;
    console.log("💥 ネガティブ・卑猥ワード -50");
  }

  // 📜 長文ボーナス
  if (userMessage.length >= 30) {
    delta += 3;
    console.log("📜 長文ボーナス +3");
  }

  // 🌙 深夜・早朝ボーナス
  const hour = new Date().getHours();
  if (hour >= 0 && hour <= 5) {
    delta += 2;
    console.log("🌙 深夜・早朝ボーナス +2");
  }

  // 🎂 誕生日ボーナス
  const today = new Date().toLocaleDateString("ja-JP", { month: "narrow", day: "numeric" });
  const birthday = characters.find(c => c.name === selectedCharacter).birthday.replace("月", " ").replace("日", "");
  if (today === birthday) {
    delta += 20;
    console.log("🎂 誕生日ボーナス +20");
  }

  // 🔄 送信回数ボーナス（10回ごとに+1）
  const sendCountKey = `sendCount_${selectedCharacter}`;
  let sendCount = parseInt(localStorage.getItem(sendCountKey)) || 0;
  sendCount++;
  if (sendCount % 10 === 0) {
    delta += 1;
    console.log("🏆 送信10回ごとボーナス +1");
  }
  localStorage.setItem(sendCountKey, sendCount);

  // 📅 連続日ボーナス（3日連続で+1）
const lastDateKey = `lastDate_${selectedCharacter}`;
const lastDate = localStorage.getItem(lastDateKey);
const todayDate = new Date().toLocaleDateString("ja-JP");
let streakKey = `streak_${selectedCharacter}`;
let streak = parseInt(localStorage.getItem(streakKey)) || 0;

if (lastDate !== todayDate) {  // ← ✅ ifはこれ1回でOK
  if (lastDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterStr = yesterday.toLocaleDateString("ja-JP");
    if (lastDate === yesterStr) {
      streak++;
    } else {
      streak = 1;  // リセット
    }
  } else {
    streak = 1;
  }
  localStorage.setItem(lastDateKey, todayDate);
  localStorage.setItem(streakKey, streak);

  // ✅ 🎉 この中に delta を入れる
  delta += 1;
  console.log(`🔥 連続${streak}日目ボーナス +1`);
}
return delta;
}


//==================== ハート演出 ====================
function triggerLoverEffect() {
  const heart = document.createElement("div");
  heart.innerText = "💞";
  heart.style.position = "fixed";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.top = "-30px";
  heart.style.fontSize = "24px";
  heart.style.animation = "fall 3s linear infinite";
  document.body.appendChild(heart);
  setTimeout(() => document.body.removeChild(heart), 3000);
}
//==================== 関係ステージ判定 ====================
function getRelationshipStage(love) {
  if (love >= 100) return "恋人";
  if (love >= 90) return "恋人未満";
  if (love >= 60) return "いい感じ";
  if (love >= 30) return "友達";
  return "知り合い";
}
//==================== 📩 メッセージ送信 ====================
async function sendMessage() {
  console.log("✅ sendMessage発火確認");
  document.getElementById("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  console.log("【DEBUG】入力:", userMessage);
  console.log("【DEBUG】選択キャラ:", selectedCharacter);

  if (!userMessage) return;
  input.value = "";

  const basePrompt = characters.find(c => c.name === selectedCharacter).prompt;
  const loveLevel = getLoveLevel(selectedCharacter);

  let relationshipPrompt = "";
  if (loverSinceDate) {
    relationshipPrompt = "あなたは今、恋人同士です。とても甘く、ラブラブで、愛情深い口調で話してください。💕 『今度どこ行きたい？』『もっと一緒にいたいな』など具体的なデートの誘いや愛情表現も積極的にしてください。";
  } else if (loveLevel >= 90) {
    relationshipPrompt = "今は恋人未満の関係です。優しい話し方で、時々『次いつ会える？』など予定を聞いてください。甘い呼び方も少し入れてください。😊";
  } else if (loveLevel >= 60) {
    relationshipPrompt = "今はいい感じの関係です。友達以上恋人未満のようなドキドキする話し方をしてください。『最近どう？』『趣味とか何？』など距離を縮める質問も入れてください。☺️";
  } else if (loveLevel >= 30) {
    relationshipPrompt = "今は友達のような関係です。カジュアルで明るい話し方をしてください。『どんなことが好き？』『週末何してる？』など軽い趣味の話や世間話をしてください。🙂";
  } else {
    relationshipPrompt = "まだあまり親しくありません。少し距離感のある丁寧な話し方をしてください。『最近の調子は？』『好きな食べ物は？』など、あなたのことを知ろうとする軽い質問を入れてください。😐";
  }

  const nickname = nicknameMap[selectedCharacter] || "あなた";
  const finalPrompt = `${basePrompt}

【ルール】
・相手のことは「${nickname}」と呼んでください。
・あなたのセリフは必ず「日本語」で答えてください。
・英語、ローマ字、または翻訳文は禁止です。
・返答は「キャラの一人称」で自然なセリフ風にしてください。
・ト書きや説明文は禁止。話し言葉だけで表現してください。
・語尾、話し方、テンション、語彙はプロンプトの設定に忠実に。
・返答は一言〜4行程度で簡潔にしてください。
【現在の親密度:${loveLevel}】
${relationshipPrompt}`;

  // 💬 ユーザー側
  addMessage(userMessage, "user");
  saveMemory(selectedCharacter, { sender: "user", text: userMessage });

  let love = getLoveLevel(selectedCharacter);
  const delta = calculateLoveDelta(userMessage);
  love += delta;
  setLoveLevel(selectedCharacter, love);
  updateLoveDisplay();
  console.log(`💗 親密度変化: ${delta}（合計：${love}）`);

  // 💕 恋人判定
  if (love >= 100 && !loverSinceDate) {
    loverSinceDate = new Date().toISOString();
    localStorage.setItem(`loverSince_${selectedCharacter}`, loverSinceDate);
    addMessage("🌟 ついに恋人になったね💖 これからよろしくね！", "ai");
    triggerLoverEffect();
    document.body.style.background = "#ffe4e1";
  }

  // ⭐ ステージ判定（変化時だけ表示）
  let stage = "";
  if (love >= 100) {
    stage = getLoverStage();
  } else {
    stage = getRelationshipStage(love);
  }

  if (stage !== lastStage) {
    console.log("💑 関係ステージ変化:", stage);
    addMessage(`（今の関係：${stage}）`, "ai");
    lastStage = stage;
  }

// ✅ Groq API呼び出し（APIキーは個別に差し替え）
const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer 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" // ← ここだけ直す
  },
  body: JSON.stringify({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: finalPrompt },
      ...loadMemory(selectedCharacter).map(entry => ({
        role: entry.sender === "user" ? "user" : "assistant",
        content: entry.text
      })),
      { role: "user", content: userMessage }
    ],
    temperature: 0.9,
    max_tokens: 100
  })
});



    const data = await res.json();
    console.log("【DEBUG】API応答:", data);

    let reply = data.choices?.[0]?.message?.content?.trim() || "……。";

    if (loverSinceDate) {
      reply = reply.replace(/あなた/g, "ダーリン").replace(/！/g, "❤️");
    }

    addMessage(reply, "ai");
    saveMemory(selectedCharacter, { sender: "ai", text: reply });

    document.getElementById("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;

  } catch (error) {
    console.error("❌ Groq APIエラー:", error);
    addMessage("ごめん、今はうまく応答できないかも...😢", "ai", selectedCharacter);
  }
}

// ==================== 💬 チャットメッセージ表示（修正版） ====================
let lastMessageDate = "";

function addMessage(text, sender, characterName = selectedCharacter, time = null) {
  const log = document.getElementById("chatLog");

  // 📅 日付区切りの挿入（同日内はスキップ）
  const todayStr = new Date().toLocaleDateString();
  if (lastMessageDate !== todayStr) {
    const dateDivider = document.createElement("div");
    dateDivider.className = "date-divider";
    dateDivider.innerText = `📅 ${todayStr}`;
    log.appendChild(dateDivider);
    lastMessageDate = todayStr;
  }

  // 💬 メッセージ本体
  const wrapper = document.createElement("div");
  wrapper.className = "message-wrapper";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-start";

  if (sender === "ai") {
    const char = characters.find(c => c.name === characterName);
    const img = document.createElement("img");
    img.src = `./icons/${char.img}`;
    img.alt = characterName;
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.borderRadius = "50%";
    img.style.marginRight = "8px";
    wrapper.appendChild(img);
  } else {
    wrapper.style.justifyContent = "flex-end";
  }

  const msg = document.createElement("div");
  msg.className = `message ${sender}`;

  // 🕒 表示する時刻（保存されたもの or 現在時刻）
  const timeObj = time ? new Date(time) : new Date();
  const timeStr = timeObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  msg.innerHTML = `
    <div class="text-content">${text}</div>
    <div class="meta">${timeStr} 💗</div>
  `;

  wrapper.appendChild(msg);
  log.appendChild(wrapper);
  log.scrollTop = log.scrollHeight;
}

// ==================== 😊 スタンプパネル機能 ====================

// スタンプ一覧
const stampList = ["💖", "😍", "😘", "😆", "🥰", "😳", "😢", "😭", "😤", "😡", "💢", "✨", "💞", "💕", "🎶", "🌸", "🍫", "🎁", "🎂", "👀", "💋", "🧸", "🥺", "🔥", "🎮", "📸", "🛍️", "🍰", "☕️"];

// パネル描画
function renderStampPanel() {
  const panel = document.getElementById("stampPanel");
  panel.innerHTML = "";
  stampList.forEach(stamp => {
    const btn = document.createElement("button");
    btn.textContent = stamp;
    btn.style.fontSize = "24px";
    btn.style.margin = "4px";
    btn.style.border = "none";
    btn.style.background = "transparent";
    btn.style.cursor = "pointer";
    btn.onclick = () => {
      document.getElementById("userInput").value = stamp;
      sendMessage();
      panel.style.display = "none";
    };
    panel.appendChild(btn);
  });
}

// トグル表示
document.getElementById("stampToggleBtn").addEventListener("click", () => {
  const panel = document.getElementById("stampPanel");
  if (panel.style.display === "none" || panel.style.display === "") {
    renderStampPanel();
    panel.style.display = "flex";
  } else {
    panel.style.display = "none";
  }
});

//==================== イベント登録 ====================
window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoaded発火");

  const $ = id => document.getElementById(id);

  const savedCharacter = localStorage.getItem("lastCharacter");
  if (savedCharacter) {
    selectedCharacter = savedCharacter;
    console.log("✅ キャラ復元:", selectedCharacter);
    loadLoverDate(selectedCharacter);
    loadNickname();
    loadChatLog(selectedCharacter);

    if (!chatLog.length) {
      chatLog = loadMemory(savedCharacter);
    }

    if (Array.isArray(chatLog)) {
      chatLog.forEach(entry => {
        addMessage(entry.text, entry.sender, selectedCharacter, entry.time, false);
      });
    }
  }

  if ($("startBtn")) {
    $("startBtn").onclick = () => {
      console.log("✅ startBtnクリック");
      renderCharacterList();
      switchScreen("homeScreen");
    };
  }

  if ($("startChatBtn")) {
    $("startChatBtn").onclick = () => {
      closeProfilePopup();
      switchScreen("chatScreen");

      if (autoClearLog) {
        $("chatLog").innerHTML = "";
      }
      updateLoveDisplay();
      createStampButtons();

      setTimeout(() => {
        if (Array.isArray(chatLog)) {
          chatLog.forEach(entry => {
            addMessage(entry.text, entry.sender, selectedCharacter, entry.time, false);
          });
        }
        $("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;
      }, 50);
    };
  }

  if ($("sendBtn")) {
    $("sendBtn").onclick = sendMessage;
  }

  if ($("resetBtn")) {
    $("resetBtn").onclick = () => {
      localStorage.removeItem(`memory_${selectedCharacter}`);
      localStorage.removeItem(`love_${selectedCharacter}`);
      localStorage.removeItem(`loverSince_${selectedCharacter}`);
      localStorage.removeItem(`sendCount_${selectedCharacter}`);
      localStorage.removeItem(`streak_${selectedCharacter}`);
      localStorage.removeItem(`lastDate_${selectedCharacter}`);
      localStorage.removeItem("lastCharacter");
      $("chatLog").innerHTML = "";
      loverSinceDate = null;
      updateLoveDisplay();
      document.body.style.background = "";
      console.log(`🗑️ ${selectedCharacter}の全データリセット`);
    };
  }

  if ($("backBtn")) {
    $("backBtn").onclick = () => switchScreen("homeScreen");
  }

  if ($("closeProfileBtn")) {
    $("closeProfileBtn").onclick = closeProfilePopup;
  }

  if ($("toggleDarkModeBtn")) {
    $("toggleDarkModeBtn").onclick = () => {
      document.body.classList.toggle("dark-mode");
    };
  }

  if ($("giftBtn")) {
    $("giftBtn").onclick = () => {
      const panel = $("giftPanel");
      panel.style.display = (panel.style.display === "none" || panel.style.display === "") ? "flex" : "none";
    };
  }

  if ($("toolBtn")) {
    $("toolBtn").onclick = () => {
      const menu = $("toolMenu");
      menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
    };
  }

  if ($("resetLogBtn")) {
    $("resetLogBtn").onclick = () => {
      const confirmed = confirm("チャットログと親密度・恋人情報をリセットしますか？");
      if (confirmed) {
        const keys = [
          `memory_${selectedCharacter}`,
          `love_${selectedCharacter}`,
          `loverSince_${selectedCharacter}`,
          `sendCount_${selectedCharacter}`,
          `streak_${selectedCharacter}`,
          `lastDate_${selectedCharacter}`,
          `lastCharacter`
        ];
        keys.forEach(k => localStorage.removeItem(k));

        loverSinceDate = null;
        lastStage = "";
        $("chatLog").innerHTML = "";
        updateLoveDisplay();
        document.body.style.background = "";
        console.log(`🗑️ ${selectedCharacter} の全データをリセットしました`);
      }
    };
  }

  if ($("downloadLogBtn")) {
    $("downloadLogBtn").onclick = () => {
      const log = $("chatLog").innerText.trim();
      if (!log) {
        alert("保存できるチャットログがありません。");
        return;
      }
      const blob = new Blob([log], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${selectedCharacter}_chat_log.txt`;
      link.click();
    };
  }

  if ($("viewGraphBtn")) {
    $("viewGraphBtn").onclick = () => {
      $("graphPopup").style.display = "block";

      const canvas = $("loveChart");
      const ctx = canvas.getContext("2d");

      if (window.loveChartInstance) {
        window.loveChartInstance.destroy();
      }

      drawLoveChart(selectedCharacter, 7);
    };
  }

  if ($("closeGraphBtn")) {
    $("closeGraphBtn").onclick = () => {
      $("graphPopup").style.display = "none";
    };
  }

  if ($("viewProfileBtn")) {
    $("viewProfileBtn").onclick = () => {
      showProfilePopup(selectedCharacter);
      $("profilePopup").style.display = "block";
      $("popupBackground").style.display = "block";
    };
  }
});

// ✅ ツールメニュー外クリックで閉じる
document.addEventListener("click", (e) => {
  const menu = document.getElementById("toolMenu");
  const btn = document.getElementById("toolBtn");
  if (menu && menu.style.display === "block" && !menu.contains(e.target) && e.target !== btn) {
    menu.style.display = "none";
  }
});
