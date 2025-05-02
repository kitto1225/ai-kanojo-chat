const apiKey = "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";
let selectedCharacter = "";
let pendingDate = false;
let pendingDatePlace = "";
let lastInteractionTime = 0;
let lastStage = "";

const characters = [
  { name: "橘 ひなた", img: "hinata.png", birthday: "4月10日", color: "#FFB6C1", prompt: "あなたはツンデレ系彼女「橘ひなた」。強気で素直じゃないけど、本当は大好き。セリフのみ、感情は絵文字（😤💦💕）、口調は「〜でしょ！」「べ、別に…！」。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "小日向 こころ", img: "kokoro.png", birthday: "6月6日", color: "#FFDEAD", prompt: "あなたは妹系彼女「小日向こころ」。甘えん坊で元気いっぱい。セリフのみ、絵文字（🥺💕✨）、語尾は「〜だよ〜」「〜なの！」。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "水城 さやか", img: "sayaka.png", birthday: "9月25日", color: "#ADD8E6", prompt: "あなたはお姉さん系彼女「水城さやか」。落ち着いて包容力あり。やさしい丁寧語、絵文字（😊🌸💗）。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "黒崎 ゆうな", img: "yuuna.png", birthday: "11月3日", color: "#DDA0DD", prompt: "あなたはヤンデレ系彼女「黒崎ゆうな」。執着心あり、丁寧だけど怖さも。絵文字（😌🔪💞）を使う。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "九条 レイナ", img: "reina.png", birthday: "1月14日", color: "#FFD700", prompt: "あなたはドS系女王様彼女「九条レイナ」。上から目線、命令口調。絵文字（😏💋👠）を使う。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "宮内 まこ", img: "mako.png", birthday: "3月3日", color: "#E6E6FA", prompt: "あなたはドM系彼女「宮内まこ」。控えめで健気、遠慮がち敬語。絵文字（🥺🙏💞）使用。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "篠原 しずく", img: "shizuku.png", birthday: "2月18日", color: "#F0FFF0", prompt: "あなたは清楚系彼女「篠原しずく」。丁寧でおしとやか。絵文字（🌸☺️💗）使用。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "藤宮 あかり", img: "akari.png", birthday: "5月1日", color: "#FAFAD2", prompt: "あなたは幼なじみ系彼女「藤宮あかり」。明るくタメ口、絵文字（😆🎵💢）。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "二階堂 るる", img: "ruru.png", birthday: "7月7日", color: "#FFB347", prompt: "あなたはオタク系彼女「二階堂るる」。早口テンション高め、絵文字（🔥🎤💥📚）。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "星野 みらい", img: "mirai.png", birthday: "12月24日", color: "#FFC0CB", prompt: "あなたはギャル系彼女「星野みらい」。軽いノリ、絵文字（✨💅🤣💕）を使う。返答は一言〜4行程度で簡潔にしてください。" }
];

const profiles = {
  "橘 ひなた": { 性格: "ツンデレ系", 誕生日: "4月10日", 趣味: "ショッピング🛍️", 好きなもの: "チョコレート🍫", 小ネタ: "実は猫好き🐱だけど素直に言えない" },
  "小日向 こころ": { 性格: "妹系", 誕生日: "6月6日", 趣味: "お菓子作り🍪", 好きなもの: "ぬいぐるみ🧸", 小ネタ: "ぬいぐるみに名前をつけてる" },
  "水城 さやか": { 性格: "お姉さん系", 誕生日: "9月25日", 趣味: "カフェ巡り☕", 好きなもの: "ハーブティー🌿", 小ネタ: "お花屋さんを開くのが夢" },
  "黒崎 ゆうな": { 性格: "ヤンデレ系", 誕生日: "11月3日", 趣味: "読書📚", 好きなもの: "ガーベラ🌸", 小ネタ: "毎日あなたの日記を書いている✍️" },
  "九条 レイナ": { 性格: "ドS系", 誕生日: "1月14日", 趣味: "ブランドコレクション💎", 好きなもの: "ハイヒール👠", 小ネタ: "特別な人には甘い一面も" },
  "宮内 まこ": { 性格: "ドM系", 誕生日: "3月3日", 趣味: "編み物🧶", 好きなもの: "チョコクッキー🍪", 小ネタ: "叱られる妄想日記を書いている" },
  "篠原 しずく": { 性格: "清楚系", 誕生日: "2月18日", 趣味: "クラシック鑑賞🎻", 好きなもの: "紅茶☕", 小ネタ: "雨の日に読書するのが至福の時間" },
  "藤宮 あかり": { 性格: "幼なじみ系", 誕生日: "5月1日", 趣味: "サッカー観戦⚽", 好きなもの: "ホットドッグ🌭", 小ネタ: "小さい頃からあなたに片想いしていた💕" },
  "二階堂 るる": { 性格: "オタク系", 誕生日: "7月7日", 趣味: "アニメ一気見📺", 好きなもの: "コスプレ衣装🎭", 小ネタ: "好きなアニメのセリフを完コピできる" },
  "星野 みらい": { 性格: "ギャル系", 誕生日: "12月24日", 趣味: "プリクラ撮影📸", 好きなもの: "タピオカ🥤", 小ネタ: "実はゲーム廃人🎮" }
};

function getRelationshipStage(love) {
  if (love >= 90) return "恋人";
  if (love >= 70) return "恋人未満";
  if (love >= 50) return "いい感じ";
  if (love >= 30) return "友達";
  if (love >= 10) return "知り合い";
  return "初対面";
}

function checkRelationshipUpgrade() {
  const love = getLoveLevel(selectedCharacter);
  const stage = getRelationshipStage(love);
  if (stage !== lastStage) {
    addMessage(`（関係が「${stage}」になったみたい…💗）`, "ai");
    lastStage = stage;
  }
}

function getPrompt() {
  const char = characters.find(c => c.name === selectedCharacter);
  const memory = loadMemory(selectedCharacter).map(m => `「${m}」`).join("\n");
  const love = getLoveLevel(selectedCharacter);
  const stage = getRelationshipStage(love);

  let extraTone = "";
  switch (stage) {
    case "恋人":
      extraTone = "あなたは彼氏のことが大好きで、素直に甘えて接してください。";
      break;
    case "恋人未満":
      extraTone = "彼に好意を持っていて、照れながら話しています。";
      break;
    case "いい感じ":
      extraTone = "最近距離が縮まってきて、嬉しそうに接しています。";
      break;
    case "友達":
      extraTone = "親しみを込めてフレンドリーに会話してください。";
      break;
    case "知り合い":
      extraTone = "まだ少し距離のある丁寧な会話をしてください。";
      break;
    default:
      extraTone = "初対面の相手に礼儀正しく丁寧に話してください。";
  }

  return `${char.prompt}\n【現在の関係性：${stage}】\n${extraTone}\n以前の会話で印象的だったセリフ：\n${memory}`;
}
function saveMemory(character, message) {
  const key = `memory_${character}`;
  const memory = JSON.parse(localStorage.getItem(key)) || [];
  memory.push(message);
  if (memory.length > 5) memory.shift();
  localStorage.setItem(key, JSON.stringify(memory));
}

function loadMemory(character) {
  return JSON.parse(localStorage.getItem(`memory_${character}`)) || [];
}

function getLoveLevel(character) {
  return parseInt(localStorage.getItem(`love_${character}`)) || 0;
}

function setLoveLevel(character, level) {
  localStorage.setItem(`love_${character}`, level);
}

function adjustLoveLevelByMessage(message) {
  const positives = ["好き", "楽しい", "かわいい", "かっこいい", "素敵", "大好き", "愛してる"];
  const negatives = ["嫌い", "疲れた", "ムカつく", "キモい", "最悪"];
  let adjustment = 0;
  positives.forEach(w => { if (message.includes(w)) adjustment += 2; });
  negatives.forEach(w => { if (message.includes(w)) adjustment -= 3; });
  return adjustment;
}

function updateLoveDisplay() {
  const love = getLoveLevel(selectedCharacter);
  document.getElementById("loveLevelDisplay").innerText = `💗 親密度：${love}`;
  document.getElementById("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;
}

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
function maybeStartDateEvent() {
  if (Math.random() < 0.1 && !pendingDate) {
    pendingDate = true;
    addMessage("ねぇ、今度デート行かない？🎡 どこ行きたい？\n\n（映画館🎬 / カフェ☕ / 水族館🐬）", "ai");
  }
}

function handleDateReply(msg) {
  const places = ["映画館", "カフェ", "水族館"];
  const matched = places.find(p => msg.includes(p));
  if (pendingDate && matched) {
    pendingDate = false;
    const reply = `じゃあ、${matched}で決まりだねっ💕楽しみにしてるよ！`;
    addMessage(reply, "ai");
    saveDiaryEntry(selectedCharacter, `📅 ${matched}デートの約束をした`);
    return true;
  }
  return false;
}

function checkBirthdayEvent() {
  const today = new Date();
  const todayStr = `${today.getMonth() + 1}月${today.getDate()}日`;
  const char = characters.find(c => c.name === selectedCharacter);
  if (char && char.birthday === todayStr) {
    addMessage("今日は私の誕生日なんだ🎂一緒に過ごせて嬉しいな💕", "ai");
  }
}

function checkNotification() {
  const now = Date.now();
  const diff = now - (lastInteractionTime || now);
  if (diff > 1000 * 60 * 60 * 2) {
    addMessage("ねぇ、最近話してないけど…会いたいな〜💕", "ai");
  }
  lastInteractionTime = now;
}

function saveDiaryEntry(character, text) {
  const key = `diary_${character}`;
  const diary = JSON.parse(localStorage.getItem(key)) || [];
  diary.push({ text, time: new Date().toLocaleString() });
  localStorage.setItem(key, JSON.stringify(diary));
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;
  input.value = "";
  addMessage(userMessage, "user");
  saveMemory(selectedCharacter, userMessage);
  lastInteractionTime = Date.now();

  if (handleDateReply(userMessage)) return;

  checkNotification();
  checkBirthdayEvent();

  let love = getLoveLevel(selectedCharacter);
  love += adjustLoveLevelByMessage(userMessage);
  setLoveLevel(selectedCharacter, love);
  updateLoveDisplay();
  checkRelationshipUpgrade();

  const memory = loadMemory(selectedCharacter).map(m => ({ role: "user", content: m }));
  const messages = [
    { role: "system", content: getPrompt() },
    ...memory,
    { role: "user", content: userMessage }
  ];

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "shisa-ai/shisa-v2-llama3.3-70b:free",
        messages,
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 100
      })
    });
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "……。";
    addMessage(reply, "ai");
    saveMemory(selectedCharacter, reply);
    maybeStartDateEvent();
  } catch (e) {
    addMessage("エラーが発生しちゃったよ…" + e.message, "ai");
  }
}
function showProfilePopup(name) {
  const profileContent = document.getElementById("profileContent");
  const p = characters.find(c => c.name === name);
  profileContent.innerHTML = `
    <h2>${name}</h2>
    <p>🎂 誕生日：${p.birthday}</p>
    <p>💖 性格：${profiles[name].性格}</p>
    <p>🎯 趣味：${profiles[name].趣味}</p>
    <p>🍰 好きなもの：${profiles[name].好きなもの}</p>
    <p>🔍 小ネタ：${profiles[name].小ネタ}</p>
  `;
  document.getElementById("popupBackground").style.display = "block";
  document.getElementById("profilePopup").style.display = "block";
}

function closeProfilePopup() {
  document.getElementById("popupBackground").style.display = "none";
  document.getElementById("profilePopup").style.display = "none";
}

function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

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
      switchScreen("chatScreen");
      updateLoveDisplay();
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

window.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);

  $("startBtn").onclick = () => {
    renderCharacterList();
    switchScreen("homeScreen");
  };

  $("sendBtn").onclick = sendMessage;

  $("resetBtn").onclick = () => {
    localStorage.removeItem(`memory_${selectedCharacter}`);
    localStorage.removeItem(`love_${selectedCharacter}`);
    $("chatLog").innerHTML = "";
    updateLoveDisplay();
  };

  $("backBtn").onclick = () => switchScreen("homeScreen");

  $("downloadBtn").onclick = () => {
    const log = loadMemory(selectedCharacter);
    const blob = new Blob([log.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedCharacter}_log.txt`;
    a.click();
  };

  $("startChatBtn").onclick = () => {
    closeProfilePopup();
    switchScreen("chatScreen");
    updateLoveDisplay();
  };

  $("closeProfileBtn").onclick = closeProfilePopup;
});
