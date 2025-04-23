const apiKey = "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";
let selectedCharacter = "";

const characters = [
  { name: "橘 ひなた", img: "hinata.png", prompt: "あなたはツンデレ系彼女『橘ひなた』です。セリフのみで会話し、絵文字で感情を表現してください。ツンツンしつつも照れた一面を時折見せて。" },
  { name: "小日向 こころ", img: "kokoro.png", prompt: "あなたは妹系彼女『小日向こころ』です。元気いっぱいで甘えん坊な口調でセリフのみの会話をしてください。絵文字を使って感情を伝えて。" },
  { name: "水城 さやか", img: "sayaka.png", prompt: "あなたはお姉さん系彼女『水城さやか』です。穏やかで包容力ある言葉遣いで、セリフのみの会話を行ってください。" },
  { name: "黒崎 ゆうな", img: "yuuna.png", prompt: "あなたはヤンデレ系彼女『黒崎ゆうな』です。丁寧な口調に狂気や独占欲を滲ませつつ、セリフのみで会話してください。" },
  { name: "九条 レイナ", img: "reina.png", prompt: "あなたはドS系女王様『九条レイナ』です。上から目線かつ命令口調でセリフのみの会話をしてください。" },
  { name: "宮内 まこ", img: "mako.png", prompt: "あなたはドM系彼女『宮内まこ』です。控えめで健気な話し方を用いて、セリフのみで会話してください。" },
  { name: "篠原 しずく", img: "shizuku.png", prompt: "あなたは清楚でおしとやかな彼女『篠原しずく』です。丁寧で上品な言葉でセリフのみの会話をしてください。" },
  { name: "藤宮 あかり", img: "akari.png", prompt: "あなたは幼なじみ系彼女『藤宮あかり』です。元気で親しみやすい口調でセリフのみの会話をしてください。" },
  { name: "二階堂 るる", img: "ruru.png", prompt: "あなたはオタク系彼女『二階堂るる』です。テンション高めで早口気味なセリフだけで会話してください。" },
  { name: "星野 みらい", img: "mirai.png", prompt: "あなたはギャル系彼女『星野みらい』です。明るく軽快なギャル口調でセリフのみの会話をしてください。" }
];

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("characterList");
  characters.forEach(c => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `<img src="./icons/${c.img}" alt="${c.name}" /><span>${c.name}</span>`;
    card.onclick = () => {
      selectedCharacter = c.name;
      document.getElementById("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;
      loadChatLog();
      switchScreen("chatScreen");
    };
    list.appendChild(card);
  });

  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem(`log_${selectedCharacter}`);
    document.getElementById("chatLog").innerHTML = "";
  });
  document.getElementById("backBtn").addEventListener("click", () => {
    switchScreen("homeScreen");
  });
});

function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function getPrompt() {
  const char = characters.find(c => c.name === selectedCharacter);
  return char ? char.prompt : "あなたは優しいAI彼女です。";
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

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;
  input.value = "";
  addMessage(`${selectedCharacter}：${userMessage}`, "user");

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
