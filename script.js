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
      sendWeekdayMessage();  // 曜日メッセージも即送信
      checkBirthdayEvent();  // 誕生日演出も即確認
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

//==================== プロフィール閉じる ====================
function closeProfilePopup() {
  document.getElementById("popupBackground").style.display = "none";
  document.getElementById("profilePopup").style.display = "none";
}
//==================== スタンプボタン生成 ====================
function createStampButtons() {
  const inputArea = document.getElementById("inputArea");
  const stamps = ["💖", "😘", "😍"];
  const stampContainer = document.createElement("div");
  stampContainer.style.marginTop = "8px";
  stamps.forEach(stamp => {
    const btn = document.createElement("button");
    btn.innerText = stamp;
    btn.style.marginRight = "5px";
    btn.style.fontSize = "20px";
    btn.style.padding = "6px 10px";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.onclick = () => {
      document.getElementById("userInput").value = stamp;
      sendMessage();
    };
    stampContainer.appendChild(btn);
  });
  inputArea.parentNode.insertBefore(stampContainer, inputArea.nextSibling);
}

//==================== 曜日ごとの応援メッセージ ====================
function sendWeekdayMessage() {
  const days = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
  const today = new Date();
  const weekday = days[today.getDay()];
  const messages = {
    "月曜日": "今週もがんばろうね💪💕",
    "火曜日": "ちょっと疲れてない？😌ゆっくりしてね！",
    "水曜日": "週の真ん中！一緒に乗り越えよ～✨",
    "木曜日": "あと少しで週末だよ☺️🎶",
    "金曜日": "花金だ～！テンションあがるね😍",
    "土曜日": "休日だね💕たくさん甘えさせて？",
    "日曜日": "明日からまたがんばろう💖ゆっくり休んでね！"
  };
  const msg = messages[weekday] || "今日も元気にいこう～！";
  addMessage(`（${weekday}メッセージ）${msg}`, "ai");
}

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

//==================== 恋人突入演出 ====================
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

// 💕 ハートふわふわCSSアニメを追加（HTML/CSS側で @keyframes 作成必要）
//==================== メッセージ送信処理（恋人・進化対応） ====================
async function sendMessage() {
  console.log("✅ sendMessage発火確認");
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  console.log("【DEBUG】入力:", userMessage);
  console.log("【DEBUG】選択キャラ:", selectedCharacter);

  if (!userMessage) return;
  input.value = "";
  addMessage(userMessage, "user");
  saveMemory(selectedCharacter, userMessage);

  let love = getLoveLevel(selectedCharacter);
  love += 5;  // 💡 適当に増加、ここは好きに調整OK
  setLoveLevel(selectedCharacter, love);
  updateLoveDisplay();

  // 💕 恋人進化判定
  if (love >= 90 && !loverSinceDate) {
    loverSinceDate = new Date().toISOString();
    localStorage.setItem(`loverSince_${selectedCharacter}`, loverSinceDate);
    addMessage("🌟 これからは恋人同士だね💖 末永くよろしくね！", "ai");
    triggerLoverEffect();
    document.body.style.background = "#ffe4e1";  // ピンク背景に変更
  }

  const stage = getLoverStage();
  if (stage) {
    console.log("💑 恋人ステージ:", stage);
    addMessage(`（今の関係：${stage}）`, "ai");
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
          ...loadMemory(selectedCharacter).map(m => ({ role: "user", content: m })),
          { role: "user", content: userMessage }
        ],
        temperature: 0.9,
        max_tokens: 100
      })
    });
    const data = await res.json();
    console.log("【DEBUG】API応答:", data);
    let reply = data.choices?.[0]?.message?.content?.trim() || "……。";

    // 💓 恋人モード特別セリフ
    if (loverSinceDate) {
      reply = reply.replace(/あなた/g, "ダーリン").replace(/！/g, "❤️");
    }

    addMessage(reply, "ai");
    saveMemory(selectedCharacter, reply);
  } catch (e) {
    console.error("エラー:", e);
    addMessage("エラーが発生しちゃった💦", "ai");
  }
}

//==================== 誕生日イベント補完 ====================
function checkBirthdayEvent() {
  const today = new Date();
  const todayStr = `${today.getMonth() + 1}月${today.getDate()}日`;
  const char = characters.find(c => c.name === selectedCharacter);
  if (char && char.birthday === todayStr) {
    addMessage("🎂 今日は私の誕生日なの🎉 一緒に過ごせてうれしいな💖", "ai");
    // 🎉 ここでさらに演出も追加できる（例：背景一時変更）
    document.body.style.background = "#fff0f5";  // 誕生日カラー
    setTimeout(() => {
      document.body.style.background = "";  // 元に戻す
    }, 5000);
  }
}

//==================== イベント登録（スタンプ生成も） ====================
window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoadedが発火しました");
  const $ = id => document.getElementById(id);
  console.log("✅ startBtn取得確認:", $("startBtn"));

  if ($("startBtn")) {
    $("startBtn").onclick = () => {
      console.log("✅ startBtnクリックされました");
      renderCharacterList();
      switchScreen("homeScreen");
      createStampButtons();  // 💖 スタンプもここで生成
    };
  }

  $("sendBtn").onclick = sendMessage;
  $("resetBtn").onclick = () => {
    localStorage.removeItem(`memory_${selectedCharacter}`);
    localStorage.removeItem(`love_${selectedCharacter}`);
    localStorage.removeItem(`loverSince_${selectedCharacter}`);
    $("chatLog").innerHTML = "";
    loverSinceDate = null;
    updateLoveDisplay();
    document.body.style.background = "";  // 恋人モード解除
  };

  $("backBtn").onclick = () => switchScreen("homeScreen");

  $("closeProfileBtn").onclick = closeProfilePopup;
  $("startChatBtn").onclick = () => {
    closeProfilePopup();
    switchScreen("chatScreen");
    updateLoveDisplay();
    createStampButtons();  // 再生成（戻ったとき用）
  };
});
