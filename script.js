const apiKey = "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";

let selectedCharacter = "";

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

const dayMessages = {
  0: "明日から学校だね☀️",
  1: "今日から学校だね💼",
  2: "火曜日だね、がんばろ〜📚",
  3: "水曜日、折り返しだよ〜⏳",
  4: "木曜日、あと少しで休みだね！✨",
  5: "今日終わったら休みだね🎉",
  6: "今日は休みだね🎈"
};

function getLoveLevel(character) {
  return parseInt(localStorage.getItem(`love_${character}`)) || 0;
}

function setLoveLevel(character, level) {
  localStorage.setItem(`love_${character}`, level);
}

function getLoveEmoji(level) {
  if (level >= 100) return "💍";
  if (level >= 90) return "💖";
  if (level >= 60) return "💕";
  if (level >= 30) return "😊";
  return "😶";
}

function updateLoveDisplay() {
  const level = getLoveLevel(selectedCharacter);
  const emoji = getLoveEmoji(level);
  document.getElementById("loveLevelDisplay").innerText = `💗 親密度：${level}`;
  document.getElementById("chatTitle").innerText = `${selectedCharacter}${emoji}とチャット中💕`;
}

function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function getPrompt() {
  const char = characters.find(c => c.name === selectedCharacter);
  const love = getLoveLevel(selectedCharacter);
  if (!char) return "あなたは優しいAI彼女です。";
  let stage = "【距離感あり】";
  if (love >= 90) stage = "【デレMAX】";
  else if (love >= 60) stage = "【デレ強め】";
  else if (love >= 30) stage = "【友達以上恋人未満】";
  return `${stage}${char.name}として話してください。${char.prompt}`;
}

function addMessage(text, sender) {
  const chatLog = document.getElementById("chatLog");
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-start";
  wrapper.style.margin = "5px 0";

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
  msg.classList.add("message", sender);
  msg.textContent = text;
  wrapper.appendChild(msg);
  chatLog.appendChild(wrapper);
  chatLog.scrollTop = chatLog.scrollHeight;
  saveLog(selectedCharacter, { role: sender, content: text, time: new Date().toLocaleString() });
}

function saveLog(character, entry) {
  const key = `log_${character}`;
  const log = JSON.parse(localStorage.getItem(key)) || [];
  log.push(entry);
  localStorage.setItem(key, JSON.stringify(log));
}

function loadChatLog() {
  const chatLog = document.getElementById("chatLog");
  chatLog.innerHTML = "";
  const key = `log_${selectedCharacter}`;
  const log = JSON.parse(localStorage.getItem(key)) || [];
  log.forEach(entry => addMessage(entry.content, entry.role));
}

function downloadLog() {
  const log = JSON.parse(localStorage.getItem(`log_${selectedCharacter}`)) || [];
  const content = log.map(e => `[${e.time}] ${e.role}：${e.content}`).join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${selectedCharacter}_log.txt`;
  a.click();
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;
  input.value = "";
  addMessage(`${selectedCharacter}：${userMessage}`, "user");

  let love = getLoveLevel(selectedCharacter);
  let messageCount = parseInt(localStorage.getItem(`count_${selectedCharacter}`)) || 0;
  let lastTalkDate = localStorage.getItem(`lastDate_${selectedCharacter}`) || "";

  const today = new Date().toLocaleDateString();

  if (lastTalkDate && lastTalkDate !== today) {
    love -= 5;
  }
  localStorage.setItem(`lastDate_${selectedCharacter}`, today);

  const positiveWords = ["好き", "楽しい", "かわいい", "大好き", "会いたい", "嬉しい"];
  const negativeWords = ["嫌い", "疲れた", "ムカつく", "イライラ", "めんどくさい", "嫌だ"];
  const badWords = ["エロ", "セックス", "裸", "胸", "下着", "キス", "フェラ", "自慰", "濡れた", "AV", "ヤる", "レイプ"];

  if (badWords.some(word => userMessage.includes(word))) {
    love -= 50;
  } else if (positiveWords.some(word => userMessage.includes(word))) {
    love += 2;
  } else if (negativeWords.some(word => userMessage.includes(word))) {
    love -= 5;
  }

  messageCount += 1;
  if (messageCount % 10 === 0) {
    love += 1;
  }

  setLoveLevel(selectedCharacter, love);
  updateLoveDisplay();
  localStorage.setItem(`count_${selectedCharacter}`, messageCount);

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
          { role: "system", content: getPrompt() },
          { role: "user", content: userMessage }
        ],
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 150
      })
    });

    if (!res.ok) {
      addMessage(`${selectedCharacter}：うまくお返事できなかったみたい…（${res.status}）`, "ai");
      return;
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "……。";
    addMessage(`${selectedCharacter}：${reply}`, "ai");
  } catch (err) {
    addMessage(`${selectedCharacter}：エラーが発生しちゃったよ… ${err.message}`, "ai");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", () => {
    switchScreen("homeScreen");
  });

  const list = document.getElementById("characterList");
  characters.forEach(c => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `<img src="./icons/${c.img}" alt="${c.name}"><div><strong>${c.name}</strong><br>🎂 ${c.birthday}</div>`;
    card.onclick = () => {
      selectedCharacter = c.name;
      const emoji = getLoveEmoji(getLoveLevel(selectedCharacter));
      document.getElementById("chatTitle").innerText = `${selectedCharacter}${emoji}とチャット中💕`;
      switchScreen("chatScreen");
      loadChatLog();
      updateLoveDisplay();

      const today = new Date();
      const msg = dayMessages[today.getDay()];
      if (msg) {
        addMessage(msg, "ai");
      }
    };
    list.appendChild(card);
  });

  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem(`log_${selectedCharacter}`);
    localStorage.removeItem(`love_${selectedCharacter}`);
    localStorage.removeItem(`count_${selectedCharacter}`);
    localStorage.removeItem(`lastDate_${selectedCharacter}`);
    document.getElementById("chatLog").innerHTML = "";
    updateLoveDisplay();
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    switchScreen("homeScreen");
  });
});
