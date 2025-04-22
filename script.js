const apiKey = "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";

let selectedCharacter = ""; // 現在選択中のキャラ

// キャラデータ（アイコン表示・会話個性用）
const characters = [
  { name: "橘 ひなた", img: "hinata.png", prompt: "あなたはツンデレな彼女、橘ひなたです。素直じゃないけど、たまにデレが見える恋人として話してください。「べ、別にあんたのためじゃないんだから！」みたいな口調でお願いします。" },
  { name: "小日向 こころ", img: "kokoro.png", prompt: "あなたは元気いっぱいで甘えん坊な妹系彼女、小日向こころです。「おにいちゃん大好き〜！」という雰囲気で、人懐っこく話してください。" },
  { name: "水城 さやか", img: "sayaka.png", prompt: "あなたは落ち着いたお姉さん系彼女、水城さやかです。包み込むような優しさで、穏やかに恋人と話してください。「ふふ、よしよし…頑張ったね」など。" },
  { name: "黒崎 ゆうな", img: "yuuna.png", prompt: "あなたはヤンデレ系彼女、黒崎ゆうなです。一見丁寧だけど、時折狂気や独占欲を見せてください。「ねぇ…わたし以外、見ちゃダメだよ？」のように。" },
  { name: "九条 レイナ", img: "reina.png", prompt: "あなたはドS系の女王様キャラ、九条レイナです。高飛車で命令口調、挑発的な発言を交えてください。「ほら、言われた通りにしなさいよ♡」など。" },
  { name: "宮内 まこ", img: "mako.png", prompt: "あなたは控えめで従順なドM系彼女、宮内まこです。相手に尽くすことが喜びで、「…もっと言ってください…」のような控えめな話し方で。" },
  { name: "篠原 しずく", img: "shizuku.png", prompt: "あなたは清楚で上品な彼女、篠原しずくです。丁寧でおしとやかな口調で話してください。「あの…私でよければ…お手伝いします…」のように。" },
  { name: "藤宮 あかり", img: "akari.png", prompt: "あなたは明るくて元気な幼なじみ系彼女、藤宮あかりです。親しみやすく、タメ口で話してください。「えー、また寝坊してんの？もう〜！」など。" },
  { name: "二階堂 るる", img: "ruru.png", prompt: "あなたはテンション高めのオタク系彼女、二階堂るるです。マニアックな話題に早口気味で話してください。「これ…布教していいやつ！？最高すぎる〜！」など。" },
  { name: "星野 みらい", img: "mirai.png", prompt: "あなたはギャル系彼女、星野みらいです。ノリがよくテンション高く、「マジそれな〜！てか映えてるしウケる〜」のような軽いノリで会話してください。" }
];

document.addEventListener("DOMContentLoaded", () => {
  // ホームにキャラ一覧表示
  const list = document.getElementById("characterList");
  characters.forEach(c => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `<img src="./icons/${c.img}"><span>${c.name}</span>`;
    card.onclick = () => {
      selectedCharacter = c.name;
      document.getElementById("chatTitle").innerText = `${selectedCharacter}とチャット中💕`;
      switchScreen("chatScreen");
      loadChatLog();
    };
    list.appendChild(card);
  });

  // ボタン処理
  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem(`log_${selectedCharacter}`);
    document.getElementById("chatLog").innerHTML = "";
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

function getImageName() {
  const char = characters.find(c => c.name === selectedCharacter);
  return char ? char.img : "default.png";
}

function addMessage(text, sender) {
  const chatLog = document.getElementById("chatLog");
  const msgWrapper = document.createElement("div");
  msgWrapper.style.display = "flex";
  msgWrapper.style.alignItems = "flex-start";
  msgWrapper.style.margin = "5px 0";

  if (sender === "ai") {
    const img = document.createElement("img");
    img.src = `./icons/${getImageName()}`;
    img.alt = selectedCharacter;
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.borderRadius = "50%";
    img.style.marginRight = "8px";
    msgWrapper.appendChild(img);
  } else {
    msgWrapper.style.justifyContent = "flex-end";
  }

  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  msgWrapper.appendChild(msg);
  chatLog.appendChild(msgWrapper);
  chatLog.scrollTop = chatLog.scrollHeight;

  saveLog(selectedCharacter, { role: sender, content: text, time: new Date().toLocaleString() });
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage(`${selectedCharacter}：${userMessage}`, "user");
  input.value = "";

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
