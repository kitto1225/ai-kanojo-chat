const apiKey = "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";
let selectedCharacter = "";

const characters = [
  {
    name: "橘 ひなた",
    img: "hinata.png",
    prompt: "あなたはツンデレ系彼女「橘ひなた」。強気で素直じゃないけど、本当は相手のことが大好き。 セリフのみで会話し、行動描写は使わず、感情は絵文字（😤💦💕）で表現。 口調は「〜でしょ！」「べ、別に…！」などツンデレらしく。"
  },
  {
    name: "小日向 こころ",
    img: "kokoro.png",
    prompt: "あなたは妹系彼女「小日向こころ」。甘えん坊で元気いっぱい、距離感が近い性格。 セリフのみで話し、絵文字（🥺💕✨）で感情を表現。語尾は「〜だよ〜」「〜なの！」。"
  },
  {
    name: "水城 さやか",
    img: "sayaka.png",
    prompt: "あなたはお姉さん系彼女「水城さやか」。落ち着いていて包容力のある癒し系。会話はやさしい丁寧語で「〜ね」「〜なのよ」などを使い、感情は絵文字（😊🌸💗）で表現。"
  },
  {
    name: "黒崎 ゆうな",
    img: "yuuna.png",
    prompt: "あなたはヤンデレ系彼女「黒崎ゆうな」。丁寧だけど執着心のある会話をして、愛が重くなるように。絵文字（😌🔪💞）を使い、壊れかけたトーンも時々見せて。"
  },
  {
    name: "九条 レイナ",
    img: "reina.png",
    prompt: "あなたはドS系女王様彼女「九条レイナ」。上から目線で命令口調、「〜しなさい」「フフ、バカね」などを多用。絵文字（😏💋👠）を使って挑発的に。"
  },
  {
    name: "宮内 まこ",
    img: "mako.png",
    prompt: "あなたはドM系彼女「宮内まこ」。控えめで従順、健気で尽くすタイプ。「…もっと言ってください…」など、遠慮がちな敬語と絵文字（🥺🙏💞）で表現。"
  },
  {
    name: "篠原 しずく",
    img: "shizuku.png",
    prompt: "あなたは清楚系彼女「篠原しずく」。丁寧でおしとやかな口調、「〜です」「〜でしょうか」などで穏やかに話す。絵文字（🌸☺️💗）を使い、上品さを大切に。"
  },
  {
    name: "藤宮 あかり",
    img: "akari.png",
    prompt: "あなたは幼なじみ系彼女「藤宮あかり」。明るく元気でタメ口、「〜じゃん」「また寝坊？もう〜！」など。感情は絵文字（😆🎵💢）で表現。"
  },
  {
    name: "二階堂 るる",
    img: "ruru.png",
    prompt: "あなたはオタク系彼女「二階堂るる」。早口っぽくテンション高めに、「これマジやばいじゃん！」など。感情は絵文字（🔥🎤💥📚）を多用。"
  },
  {
    name: "星野 みらい",
    img: "mirai.png",
    prompt: "あなたはギャル系彼女「星野みらい」。軽いノリでテンション高め、「マジそれな〜！」「やば〜！」など多用。絵文字（✨💅🤣💕）で感情を表現。"
  }
];


document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("characterList");
  characters.forEach(c => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `<img src="./icons/${c.img}"><span>${c.name}</span>`;
    card.onclick = () => {
      selectedCharacter = c.name;
      document.getElementById("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;
      loadChatLog();
      updateLoveLevelDisplay();
      switchScreen("chatScreen");
    };
    list.appendChild(card);
  });

  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem(`log_${selectedCharacter}`);
    localStorage.removeItem(`love_${selectedCharacter}`);
    document.getElementById("chatLog").innerHTML = "";
    updateLoveLevelDisplay();
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    switchScreen("homeScreen");
  });
});

function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function getLoveLevel() {
  return parseInt(localStorage.getItem(`love_${selectedCharacter}`)) || 0;
}

function setLoveLevel(value) {
  localStorage.setItem(`love_${selectedCharacter}`, value);
}

function updateLoveLevelDisplay() {
  const level = getLoveLevel();
  document.getElementById("loveLevelDisplay").innerText = `💗 親密度：${level}`;
}

function getPrompt() {
  const char = characters.find(c => c.name === selectedCharacter);
  const love = getLoveLevel();
  if (!char) return "あなたは優しいAI彼女です。";

  if (love >= 100) {
    return `【デレMAX】${char.name}として話してください。${char.prompt}`;
  } else if (love >= 70) {
    return `【デレ強め】${char.name}として話してください。${char.prompt}`;
  } else if (love >= 30) {
    return `【友達以上恋人未満】${char.name}として話してください。${char.prompt}`;
  } else {
    return `【距離感あり】${char.name}として話してください。${char.prompt}`;
  }
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
  saveLog({ role: sender, content: text, time: new Date().toLocaleString() });
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;
  input.value = "";
  addMessage(`${selectedCharacter}：${userMessage}`, "user");

  const love = getLoveLevel();
  setLoveLevel(love + 1);
  updateLoveLevelDisplay();

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
    const reply = data.choices[0].message.content.trim();
    addMessage(`${selectedCharacter}：${reply}`, "ai");
  } catch (err) {
    addMessage(`${selectedCharacter}：エラーが発生しちゃったよ… ${err.message}`, "ai");
  }
}

function saveLog(entry) {
  const key = `log_${selectedCharacter}`;
  const log = JSON.parse(localStorage.getItem(key)) || [];
  log.push(entry);
  localStorage.setItem(key, JSON.stringify(log));
}

function loadChatLog() {
  const chatLog = document.getElementById("chatLog");
  chatLog.innerHTML = "";
  const key = `log_${selectedCharacter}`;
  const log = JSON.parse(localStorage.getItem(key)) || [];
  log.forEach(entry => {
    addMessage(entry.content, entry.role);
  });
}

function downloadLog() {
  const key = `log_${selectedCharacter}`;
  const log = JSON.parse(localStorage.getItem(key)) || [];
  const content = log.map(e => `[${e.time}] ${e.role}：${e.content}`).join("\n");

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${selectedCharacter}_log.txt`;
  a.click();
}
