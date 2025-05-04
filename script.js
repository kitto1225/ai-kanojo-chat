//==================== 🌟 初期設定・変数 ====================//
const apiKey = "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";
let selectedCharacter = "";
let pendingDate = false;
let pendingDatePlace = "";
let lastInteractionTime = 0;
let lastStage = "";

const characters = [
  { name: "橘 ひなた", img: "hinata.png", birthday: "4月10日", prompt: "あなたはツンデレ系彼女「橘ひなた」。強気で素直じゃないけど、本当は大好き。セリフのみ、感情は絵文字（😤💦💕）、口調は「〜でしょ！」「べ、別に…！」。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "小日向 こころ", img: "kokoro.png", birthday: "6月6日", prompt: "あなたは妹系彼女「小日向こころ」。甘えん坊で元気いっぱい。セリフのみ、絵文字（🥺💕✨）、語尾は「〜だよ〜」「〜なの！」。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "水城 さやか", img: "sayaka.png", birthday: "9月25日", prompt: "あなたはお姉さん系彼女「水城さやか」。落ち着いて包容力あり。やさしい丁寧語、絵文字（😊🌸💗）。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "黒崎 ゆうな", img: "yuuna.png", birthday: "11月3日", prompt: "あなたはヤンデレ系彼女「黒崎ゆうな」。執着心あり、丁寧だけど怖さも。絵文字（😌🔪💞）を使う。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "九条 レイナ", img: "reina.png", birthday: "1月14日", prompt: "あなたはドS系女王様彼女「九条レイナ」。上から目線、命令口調。絵文字（😏💋👠）を使う。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "宮内 まこ", img: "mako.png", birthday: "3月3日", prompt: "あなたはドM系彼女「宮内まこ」。控えめで健気、遠慮がち敬語。絵文字（🥺🙏💞）使用。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "篠原 しずく", img: "shizuku.png", birthday: "2月18日", prompt: "あなたは清楚系彼女「篠原しずく」。丁寧でおしとやか。絵文字（🌸☺️💗）使用。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "藤宮 あかり", img: "akari.png", birthday: "5月1日", prompt: "あなたは幼なじみ系彼女「藤宮あかり」。明るくタメ口、絵文字（😆🎵💢）。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "二階堂 るる", img: "ruru.png", birthday: "7月7日", prompt: "あなたはオタク系彼女「二階堂るる」。早口テンション高め、絵文字（🔥🎤💥📚）。返答は一言〜4行程度で簡潔にしてください。" },
  { name: "星野 みらい", img: "mirai.png", birthday: "12月24日", prompt: "あなたはギャル系彼女「星野みらい」。軽いノリ、絵文字（✨💅🤣💕）を使う。返答は一言〜4行程度で簡潔にしてください。" }
];

const profiles = {
  "橘 ひなた": {
    性格: "ツンデレ系",
    趣味: "ショッピング🛍️",
    好きなもの: "チョコレート🍫",
    小ネタ: "実は猫好き🐱だけど素直に言えない"
  },
  "小日向 こころ": {
    性格: "妹系",
    趣味: "お菓子作り🍪",
    好きなもの: "ぬいぐるみ🧸",
    小ネタ: "ぬいぐるみに名前をつけてる"
  },
  "水城 さやか": {
    性格: "お姉さん系",
    趣味: "カフェ巡り☕",
    好きなもの: "ハーブティー🌿",
    小ネタ: "お花屋さんを開くのが夢"
  },
  "黒崎 ゆうな": {
    性格: "ヤンデレ系",
    趣味: "読書📚",
    好きなもの: "ガーベラ🌸",
    小ネタ: "毎日あなたの日記を書いている✍️"
  },
  "九条 レイナ": {
    性格: "ドS系",
    趣味: "ブランドコレクション💎",
    好きなもの: "ハイヒール👠",
    小ネタ: "特別な人には甘い一面も"
  },
  "宮内 まこ": {
    性格: "ドM系",
    趣味: "編み物🧶",
    好きなもの: "チョコクッキー🍪",
    小ネタ: "叱られる妄想日記を書いている"
  },
  "篠原 しずく": {
    性格: "清楚系",
    趣味: "クラシック鑑賞🎻",
    好きなもの: "紅茶☕",
    小ネタ: "雨の日に読書するのが至福の時間"
  },
  "藤宮 あかり": {
    性格: "幼なじみ系",
    趣味: "サッカー観戦⚽",
    好きなもの: "ホットドッグ🌭",
    小ネタ: "小さい頃からあなたに片想いしていた💕"
  },
  "二階堂 るる": {
    性格: "オタク系",
    趣味: "アニメ一気見📺",
    好きなもの: "コスプレ衣装🎭",
    小ネタ: "好きなアニメのセリフを完コピできる"
  },
  "星野 みらい": {
    性格: "ギャル系",
    趣味: "プリクラ撮影📸",
    好きなもの: "タピオカ🥤",
    小ネタ: "実はゲーム廃人🎮"
  }
};

//==================== キャラクター表示関数 ====================
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
//==================== 画面切り替え ====================
function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

//==================== 親密度表示更新 ====================
function updateLoveDisplay() {
  const love = getLoveLevel(selectedCharacter);
  document.getElementById("loveLevelDisplay").innerText = `💗 親密度：${love}`;
  document.getElementById("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;
}
//==================== プロフィールポップアップ ====================
function showProfilePopup(name) {
  const profileContent = document.getElementById("profileContent");
  const char = characters.find(c => c.name === name);
  const profile = profiles[name];

  profileContent.innerHTML = `
    <h2 style="color: ${char.color};">${name}</h2>
    <p>🎂 <strong>誕生日：</strong>${char.birthday}</p>
    <p>💖 <strong>性格：</strong>${profile.性格}</p>
    <p>🎯 <strong>趣味：</strong>${profile.趣味}</p>
    <p>🍰 <strong>好きなもの：</strong>${profile.好きなもの}</p>
    <p>🔍 <strong>小ネタ：</strong>${profile.小ネタ}</p>
  `;
  document.getElementById("popupBackground").style.display = "block";
  document.getElementById("profilePopup").style.display = "block";
}

//==================== イベント登録 ====================
window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoadedが発火しました");
  const $ = id => document.getElementById(id);
  console.log("✅ startBtn取得確認:", $("startBtn"));

  if ($("startBtn")) {
    $("startBtn").onclick = () => {
      console.log("✅ startBtnクリックされました");
      renderCharacterList();
      switchScreen("homeScreen");
    };
  }

  $("sendBtn").onclick = sendMessage;
  $("resetBtn").onclick = () => {
    localStorage.removeItem(`memory_${selectedCharacter}`);
    localStorage.removeItem(`love_${selectedCharacter}`);
    $("chatLog").innerHTML = "";
    updateLoveDisplay();
  };

  $("backBtn").onclick = () => switchScreen("homeScreen");

  $("closeProfileBtn").onclick = closeProfilePopup;
  $("startChatBtn").onclick = () => {
    closeProfilePopup();
    switchScreen("chatScreen");
    updateLoveDisplay();
  };
});
//==================== プロフィール閉じる ====================
function closeProfilePopup() {
  document.getElementById("popupBackground").style.display = "none";
  document.getElementById("profilePopup").style.display = "none";
}

//==================== その他の必要関数（getLoveLevelなど） ====================
function getLoveLevel(character) {
  return parseInt(localStorage.getItem(`love_${character}`)) || 0;
}

function setLoveLevel(character, level) {
  localStorage.setItem(`love_${character}`, level);
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
//==================== メッセージ送信処理 ====================
async function sendMessage() {
  console.log("✅ sendMessage発火確認");
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  console.log("【DEBUG】入力:", userMessage);
  console.log("【DEBUG】選択キャラ:", selectedCharacter);

  if (!userMessage) return;
  input.value = "";
  addMessage(userMessage, "user");

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
          { role: "user", content: userMessage }
        ],
        temperature: 0.9,
        max_tokens: 100
      })
    });
    const data = await res.json();
    console.log("【DEBUG】API応答:", data);
    const reply = data.choices?.[0]?.message?.content?.trim() || "……。";
    addMessage(reply, "ai");
  } catch (e) {
    console.error("エラー:", e);
    addMessage("エラーが発生しちゃった💦", "ai");
  }
}
