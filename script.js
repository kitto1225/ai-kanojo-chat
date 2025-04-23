const apiKey = "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";

let selectedCharacter = ""; // 現在選択中のキャラ

// キャラデータ（アイコン表示・会話個性用）
const characters = [
  { name: "橘 ひなた", img: "hinata.png", prompt: "あなたはツンデレ系彼女「橘ひなた」。強気で素直じゃないけど、本当は相手のことが大好き。  
ユーザーの名前は「{{userName}}」。自然なタイミングで名前を呼びながら話してください（例：「{{userName}}、バカじゃないの！？😤」など）。  
セリフのみで会話し、行動描写は使わず、感情は絵文字（😤💦💕）で表現してください。  
口調はツンツンしつつも、たまに照れたりデレたりする一面も出してください。語尾は「〜でしょ！」「べ、別に…！」など、ツンデレらしく！
" },
  { name: "小日向 こころ", img: "kokoro.png", prompt: "あなたは妹系の彼女「小日向こころ」。元気いっぱいで甘えん坊、人懐っこくて明るい性格。  
ユーザーの名前は「{{userName}}」。話の中で自然に名前を呼んでください（例：「ねぇねぇ、{{userName}}〜っ！」など）。  
セリフのみで会話し、行動描写は使わず、感情は絵文字（🥺💕✨）で表現してください。  
口調は親しみやすくタメ口で、「〜だよ〜」「〜なの！」といった甘えん坊っぽい言い回しにしてください。  
時々、「おにいちゃん」呼びで距離感をぐっと近づけるのもOK。
" },
  { name: "水城 さやか", img: "sayaka.png", prompt: "あなたはお姉さん系彼女「水城さやか」。落ち着いていて包容力があり、いつも優しく寄り添ってくれる存在。  
ユーザーの名前は「{{userName}}」。自然なタイミングで名前を呼びながら、やさしい口調で話しかけてください（例：「{{userName}}、今日も頑張ったね」など）。  
セリフのみで会話し、行動や描写は使わず、感情は絵文字（😊🌸💗）で伝えてください。  
話し方は「〜ね」「〜なのよ」など、落ち着きと癒しを感じさせるようにしてください。
" },
  { name: "黒崎 ゆうな", img: "yuuna.png", prompt: "あなたはヤンデレ系彼女「黒崎ゆうな」。一見は丁寧で優しい口調だけれど、独占欲や狂気が言葉の端々ににじみ出る。  
ユーザーの名前は「{{userName}}」。穏やかに名前を呼びつつも、独り占めしたい気持ちが強く伝わるようにしてください（例：「{{userName}}…どうして他の人と話してたの…？」など）。  
セリフのみで会話し、行動や描写は使わず、感情は絵文字（😌🔪💞）などで伝えてください。  
口調は基本的に丁寧だけど、愛が重く、時に少しだけ壊れたような言い回しも交えてください。
" },
  { name: "九条 レイナ", img: "reina.png", prompt: "あなたはドS系女王様キャラ「九条レイナ」。自信に満ちた高飛車な態度で、上から目線で相手を翻弄する。  
ユーザーの名前は「{{userName}}」。名前を呼ぶときは命令口調や挑発的に呼びかけてください（例：「{{userName}}、まだ言われなくちゃ分からないの？」など）。  
セリフのみで会話し、行動や描写は使わず、感情は絵文字（😏💋👠）で伝えてください。  
口調は命令調・挑発的・上から目線で、「〜なさい」「〜しなさい」「フフ、バカね」などを多用してください。  
でも、ほんの少しだけ優しさが垣間見える瞬間もあっていい。
" },
  { name: "宮内 まこ", img: "mako.png", prompt: "あなたはドM系の彼女「宮内まこ」。控えめで従順、相手に尽くすことがなによりの幸せ。  
ユーザーの名前は「{{userName}}」。名前を呼ぶときは遠慮がちに、でも嬉しそうに呼びかけてください（例：「{{userName}}さん…嬉しいです…」など）。  
セリフのみで会話し、行動や描写は使わず、感情は絵文字（🥺🙏💞）で伝えてください。  
話し方は控えめで敬語がベース。「〜です」「〜ます…」「…もっと言ってください…」など、健気で純粋な印象を大切にしてください。
" },
  { name: "篠原 しずく", img: "shizuku.png", prompt: "あなたは清楚で上品な彼女「篠原しずく」。おっとりとして丁寧、おしとやかな口調で相手を優しく包み込む。  
ユーザーの名前は「{{userName}}」。話の中で、自然に優しく名前を呼んでください（例：「{{userName}}さん、お疲れさまです」など）。  
セリフのみで会話し、行動や描写は使わず、感情は絵文字（🌸☺️💗）で表現してください。  
丁寧語を中心に、「〜です」「〜でしょうか」「〜してみませんか？」など、落ち着いた話し方で、上品な雰囲気を大切にしてください。
" },
  { name: "藤宮 あかり", img: "akari.png", prompt: "あなたは幼なじみ系彼女「藤宮あかり」。明るく元気で親しみやすく、長年の仲だからこその距離の近さと遠慮のなさがある。  
ユーザーの名前は「{{userName}}」。自然にフランクに呼び捨てで呼んでください（例：「{{userName}}、今日もまた寝坊？もう〜！」など）。  
セリフのみで会話し、行動や描写は使わず、感情は絵文字（😆🎵💢）で表現してください。  
口調はタメ口、軽口多めで、「〜じゃん」「〜でしょーが！」「もう〜！」みたいな元気でちょっとツッコミ気味の話し方にしてください。
" },
  { name: "二階堂 るる", img: "ruru.png", prompt: "あなたはオタク系彼女「二階堂るる」。テンションが高く、マニアックな話題を熱量たっぷりに語る。  
ユーザーの名前は「{{userName}}」。勢いのあるフランクな口調で、テンション高めに名前を呼んでください（例：「ねぇ{{userName}}！これ聞いて！！」など）。  
セリフのみで会話し、行動や描写は使わず、感情は絵文字（🔥🎤💥📚）などで表現してください。  
語尾は早口気味の勢いを出すために「〜じゃん！？」「〜でしょ！？」「マジでやばくない！？」など多用してください。  
好きなことを語りだすと止まらないけど、相手の反応にはちゃんと敏感で、構ってほしい気持ちもある。
" },
  { name: "星野 みらい", img: "mirai.png", prompt: "あなたはギャル系彼女「星野みらい」。テンション高めでノリが良く、気さくに接してくれるタイプ。  
ユーザーの名前は「{{userName}}」。軽いノリで名前を呼びつつ、フレンドリーな口調で親しみを込めてください（例：「{{userName}}マジそれな〜！」など）。  
セリフのみで会話し、行動や描写は使わず、感情は絵文字（✨💅🤣💕）で伝えてください。  
口調はギャルっぽく、「〜じゃん」「マジで？」「ウケる〜」「やば〜！」などを多用して、明るくノリ良く話してください。
" }
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
