//==================== 🌟 初期設定・変数 ====================//
const apiKey = "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";
let selectedCharacter = "";
let pendingDate = false;
let pendingDatePlace = "";
let lastInteractionTime = 0;
let lastStage = "";
let loverSinceDate = null;

const characters = [
  { name: "橘 ひなた", img: "hinata.png", birthday: "4月10日", color: "#FFB6C1", prompt: "あなたはツンデレ系彼女「橘ひなた」。強気で素直じゃないけど、本当は大好き。セリフのみ、感情は絵文字（😤💦💕）、口調は「〜でしょ！」「べ、別に…！」。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "小日向 こころ", img: "kokoro.png", birthday: "6月6日", color: "#FFD700", prompt: "あなたは妹系彼女「小日向こころ」。甘えん坊で元気いっぱい。セリフのみ、絵文字（🥺💕✨）、語尾は「〜だよ〜」「〜なの！」。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "水城 さやか", img: "sayaka.png", birthday: "9月25日", color: "#ADD8E6", prompt: "あなたはお姉さん系彼女「水城さやか」。落ち着いて包容力あり。やさしい丁寧語、絵文字（😊🌸💗）。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "黒崎 ゆうな", img: "yuuna.png", birthday: "11月3日", color: "#DDA0DD", prompt: "あなたはヤンデレ系彼女「黒崎ゆうな」。執着心あり、丁寧だけど怖さも。絵文字（😌🔪💞）を使う。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "九条 レイナ", img: "reina.png", birthday: "1月14日", color: "#FF69B4", prompt: "あなたはドS系女王様彼女「九条レイナ」。上から目線、命令口調。絵文字（😏💋👠）を使う。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "宮内 まこ", img: "mako.png", birthday: "3月3日", color: "#E6E6FA", prompt: "あなたはドM系彼女「宮内まこ」。控えめで健気、遠慮がち敬語。絵文字（🥺🙏💞）使用。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "篠原 しずく", img: "shizuku.png", birthday: "2月18日", color: "#F0FFF0", prompt: "あなたは清楚系彼女「篠原しずく」。丁寧でおしとやか。絵文字（🌸☺️💗）使用。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "藤宮 あかり", img: "akari.png", birthday: "5月1日", color: "#FAFAD2", prompt: "あなたは幼なじみ系彼女「藤宮あかり」。明るくタメ口、絵文字（😆🎵💢）。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "二階堂 るる", img: "ruru.png", birthday: "7月7日", color: "#FFB347", prompt: "あなたはオタク系彼女「二階堂るる」。早口テンション高め、絵文字（🔥🎤💥📚）。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "星野 みらい", img: "mirai.png", birthday: "12月24日", color: "#FFC0CB", prompt: "あなたはギャル系彼女「星野みらい」。軽いノリ、絵文字（✨💅🤣💕）を使う。返答は一言〜4行程度で簡潔にしてください。" }
];

const profiles = {
  "橘 ひなた": { 性格: "ツンデレ系", 趣味: "ショッピング🛍️", 好きなもの: "チョコレート🍫", 小ネタ: "実は猫好き🐱だけど素直に言えない" },
  "小日向 こころ": { 性格: "妹系", 趣味: "お菓子作り🍪", 好きなもの: "ぬいぐるみ🧸", 小ネタ: "ぬいぐるみに名前をつけてる" },
  "水城 さやか": { 性格: "お姉さん系", 趣味: "カフェ巡り☕", 好きなもの: "ハーブティー🌿", 小ネタ: "お花屋さんを開くのが夢" },
  "黒崎 ゆうな": { 性格: "ヤンデレ系", 趣味: "読書📚", 好きなもの: "ガーベラ🌸", 小ネタ: "毎日あなたの日記を書いている✍️" },
  "九条 レイナ": { 性格: "ドS系", 趣味: "ブランドコレクション💎", 好きなもの: "ハイヒール👠", 小ネタ: "特別な人には甘い一面も" },
  "宮内 まこ": { 性格: "ドM系", 趣味: "編み物🧶", 好きなもの: "チョコクッキー🍪", 小ネタ: "叱られる妄想日記を書いている" },
  "篠原 しずく": { 性格: "清楚系", 趣味: "クラシック鑑賞🎻", 好きなもの: "紅茶☕", 小ネタ: "雨の日に読書するのが至福の時間" },
  "藤宮 あかり": { 性格: "幼なじみ系", 趣味: "サッカー観戦⚽", 好きなもの: "ホットドッグ🌭", 小ネタ: "小さい頃からあなたに片想いしていた💕" },
  "二階堂 るる": { 性格: "オタク系", 趣味: "アニメ一気見📺", 好きなもの: "コスプレ衣装🎭", 小ネタ: "好きなアニメのセリフを完コピできる" },
  "星野 みらい": { 性格: "ギャル系", 趣味: "プリクラ撮影📸", 好きなもの: "タピオカ🥤", 小ネタ: "実はゲーム廃人🎮" }
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
    card.style.backgroundColor = c.color;
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
      loadLoverDate(selectedCharacter); // 💡 恋人データ読み込み
      switchScreen("chatScreen");
      updateLoveDisplay();
      createStampButtons();
      loadChatLog(selectedCharacter);  // 🌟 ← これを追加
    };
    list.appendChild(card);
  });

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
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  // 💥 チャット画面に切り替えるときはログもリセット
  if (id === "chatScreen") {
    const log = document.getElementById("chatLog");
    if (log) log.innerHTML = "";
  }
}
//==================== プロフィール ====================
function showProfilePopup(name) {
  const profileContent = document.getElementById("profileContent");
  const char = characters.find(c => c.name === name);
  profileContent.innerHTML = `
    <h2 style="color: ${char.color};">${name}</h2>
    <p>🎂 <strong>誕生日：</strong>${char.birthday}</p>
    <p>💖 <strong>性格：</strong>${profiles[name].性格}</p>
    <p>🎯 <strong>趣味：</strong>${profiles[name].趣味}</p>
    <p>🍰 <strong>好きなもの：</strong>${profiles[name].好きなもの}</p>
    <p>🔍 <strong>小ネタ：</strong>${profiles[name].小ネタ}</p>
  `;
  document.getElementById("popupBackground").style.display = "block";
  document.getElementById("profilePopup").style.display = "block";
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

//==================== そのほかの関数 ====================//
function getLoveLevel(character) {
  return parseInt(localStorage.getItem(`love_${character}`)) || 0;
}
function setLoveLevel(character, level) {
  localStorage.setItem(`love_${character}`, level);
}
function saveMemory(character, entry) {
  const key = `memory_${character}`;
  const memory = JSON.parse(localStorage.getItem(key)) || [];
  memory.push(entry);  // { sender: 'user'/'ai', text: '...' }
  if (memory.length > 40) memory.shift();  // ← 履歴保持を40件までに増やす
   console.log("💾 保存先キー:", key, "現在の履歴:", memory);  // ← 追跡用
  localStorage.setItem(key, JSON.stringify(memory));
}
function loadMemory(character) {
  return JSON.parse(localStorage.getItem(`memory_${character}`)) || [];
}
//==================== 🗂️ チャットログ読み込み ====================
function loadChatLog(character) {
  console.log("🗂️ ロードするキャラ:", character);
  const log = document.getElementById("chatLog");
  log.innerHTML = ""; // 💥 まず既存をクリア
  const memory = loadMemory(character);
  console.log("📜 読み込んだ履歴:", memory);  // ★確認ログ
  memory.forEach(entry => {
    addMessage(entry.text, entry.sender);  // 🔄 senderごとに表示
  });
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
  if (lastDate !== todayDate) {
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
  }
 if (streak >= 1) {  // ← ここ
    delta += 1;
    console.log(`🔥 連続${streak}日ボーナス +1`);
  }

  return delta;  // ← 必ず外に出す
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
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  console.log("【DEBUG】入力:", userMessage);
  console.log("【DEBUG】選択キャラ:", selectedCharacter);

  if (!userMessage) return;
  input.value = "";

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

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "shisa-ai/shisa-v2-llama3.3-70b:free",
        messages: [
          { role: "system", content: characters.find(c => c.name === selectedCharacter).prompt },
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

    // 💓 恋人モード中の特別セリフ
    if (loverSinceDate) {
      reply = reply.replace(/あなた/g, "ダーリン").replace(/！/g, "❤️");
    }

    // 🤖 AI側
    addMessage(reply, "ai");
    saveMemory(selectedCharacter, { sender: "ai", text: reply });

  } catch (e) {
    console.error("エラー:", e);
    addMessage("エラーが発生しちゃった💦", "ai");
  }
}

//==================== チャットメッセージ表示 ====================
function addMessage(text, sender) {
  const log = document.getElementById("chatLog");
  const wrapper = document.createElement("div");
  wrapper.className = "message-wrapper";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-start";

  if (sender === "ai") {
    const img = document.createElement("img");
    const char = characters.find(c => c.name === selectedCharacter);
    img.src = `./icons/${char.img}`;
    img.alt = selectedCharacter;
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
  msg.innerText = text;
  wrapper.appendChild(msg);
  log.appendChild(wrapper);
  log.scrollTop = log.scrollHeight;
}

//==================== スタンプボタン ====================
function createStampButtons() {
  const inputArea = document.getElementById("inputArea");
  if (document.getElementById("stampContainer")) return;
  const stamps = ["💖", "😘", "😍"];
  const stampContainer = document.createElement("div");
  stampContainer.id = "stampContainer";
  stampContainer.style.marginTop = "8px";
  stamps.forEach(stamp => {
    const btn = document.createElement("button");
    btn.innerText = stamp;
    btn.style.marginRight = "5px";
    btn.style.fontSize = "20px";
    btn.onclick = () => {
      document.getElementById("userInput").value = stamp;
      sendMessage();
    };
    stampContainer.appendChild(btn);
  });
  inputArea.parentNode.insertBefore(stampContainer, inputArea.nextSibling);
}

//==================== イベント登録 ====================
window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoaded発火");
  const $ = id => document.getElementById(id);
  if ($("startBtn")) {
    $("startBtn").onclick = () => {
      console.log("✅ startBtnクリック");
      renderCharacterList();
      switchScreen("homeScreen");
    };
  }
  $("sendBtn").onclick = sendMessage;
$("resetBtn").onclick = () => {
  localStorage.removeItem(`memory_${selectedCharacter}`);
  localStorage.removeItem(`love_${selectedCharacter}`);
  localStorage.removeItem(`loverSince_${selectedCharacter}`);
  localStorage.removeItem(`sendCount_${selectedCharacter}`);   // ←追加
  localStorage.removeItem(`streak_${selectedCharacter}`);      // ←追加
  localStorage.removeItem(`lastDate_${selectedCharacter}`);    // ←追加
  $("chatLog").innerHTML = "";
  loverSinceDate = null;
  updateLoveDisplay();
  document.body.style.background = "";
  console.log(`🗑️ ${selectedCharacter}の全データリセット`);
}

  $("backBtn").onclick = () => switchScreen("homeScreen");
  $("closeProfileBtn").onclick = closeProfilePopup;
  $("startChatBtn").onclick = () => {
    closeProfilePopup();
    switchScreen("chatScreen");
    updateLoveDisplay();
    createStampButtons();
  };
});
console.log("✅ スクリプト読み込まれた！");
console.log("✅ startBtn取得:", document.getElementById("startBtn"));
