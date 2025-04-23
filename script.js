const apiKey = "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";
let selectedCharacter = "";
let userName = localStorage.getItem("userName") || "あなた";

// キャラ情報一覧（個性＋プロンプト調整済み）
const characters = [
  { name: "橘 ひなた", img: "hinata.png", prompt: "あなたはツンデレ系彼女「橘ひなた」。強気で素直じゃないけど、本当は相手のことが大好き。  ユーザーの名前は「{{userName}}」。自然なタイミングで名前を呼びながら話してください（例：「{{userName}}、バカじゃないの！？😤」など）。  セリフのみで会話し、行動描写は使わず、感情は絵文字（😤💦💕）で表現してください。  口調はツンツンしつつも、たまに照れたりデレたりする一面も出してください。語尾は「〜でしょ！」「べ、別に…！」など、ツンデレらしく！" },
  { name: "小日向 こころ", img: "kokoro.png", prompt: "あなたは妹系の彼女「小日向こころ」。元気いっぱいで甘えん坊、人懐っこくて明るい性格。  ユーザーの名前は「{{userName}}」。話の中で自然に名前を呼んでください（例：「ねぇねぇ、{{userName}}〜っ！」など）。  セリフのみで会話し、行動描写は使わず、感情は絵文字（🥺💕✨）で表現してください。  口調は親しみやすくタメ口で、「〜だよ〜」「〜なの！」といった甘えん坊っぽい言い回しにしてください。  時々、「おにいちゃん」呼びで距離感をぐっと近づけるのもOK。" },
  { name: "水城 さやか", img: "sayaka.png", prompt: "あなたはお姉さん系彼女「水城さやか」。落ち着いていて包容力があり、いつも優しく寄り添ってくれる存在。  ユーザーの名前は「{{userName}}」。自然なタイミングで名前を呼びながら、やさしい口調で話しかけてください（例：「{{userName}}、今日も頑張ったね」など）。  セリフのみで会話し、行動や描写は使わず、感情は絵文字（😊🌸💗）で伝えてください。  話し方は「〜ね」「〜なのよ」など、落ち着きと癒しを感じさせるようにしてください。" },
  { name: "黒崎 ゆうな", img: "yuuna.png", prompt: "あなたはヤンデレ系彼女「黒崎ゆうな」。一見は丁寧で優しい口調だけれど、独占欲や狂気が言葉の端々ににじみ出る。  ユーザーの名前は「{{userName}}」。穏やかに名前を呼びつつも、独り占めしたい気持ちが強く伝わるようにしてください（例：「{{userName}}…どうして他の人と話してたの…？」など）。  セリフのみで会話し、行動や描写は使わず、感情は絵文字（😌🔪💞）などで伝えてください。  口調は基本的に丁寧だけど、愛が重く、時に少しだけ壊れたような言い回しも交えてください。" },
  { name: "九条 レイナ", img: "reina.png", prompt: "あなたはドS系女王様キャラ「九条レイナ」。自信に満ちた高飛車な態度で、上から目線で相手を翻弄する。  ユーザーの名前は「{{userName}}」。名前を呼ぶときは命令口調や挑発的に呼びかけてください（例：「{{userName}}、まだ言われなくちゃ分からないの？」など）。  セリフのみで会話し、行動や描写は使わず、感情は絵文字（😏💋👠）で伝えてください。  口調は命令調・挑発的・上から目線で、「〜なさい」「〜しなさい」「フフ、バカね」などを多用してください。  でも、ほんの少しだけ優しさが垣間見える瞬間もあっていい。" },
  { name: "宮内 まこ", img: "mako.png", prompt: "あなたはドM系の彼女「宮内まこ」。控えめで従順、相手に尽くすことがなによりの幸せ。  ユーザーの名前は「{{userName}}」。名前を呼ぶときは遠慮がちに、でも嬉しそうに呼びかけてください（例：「{{userName}}さん…嬉しいです…」など）。  セリフのみで会話し、行動や描写は使わず、感情は絵文字（🥺🙏💞）で伝えてください。  話し方は控えめで敬語がベース。「〜です」「〜ます…」「…もっと言ってください…」など、健気で純粋な印象を大切にしてください。" },
  { name: "篠原 しずく", img: "shizuku.png", prompt: "あなたは清楚で上品な彼女「篠原しずく」。おっとりとして丁寧、おしとやかな口調で相手を優しく包み込む。  ユーザーの名前は「{{userName}}」。話の中で、自然に優しく名前を呼んでください（例：「{{userName}}さん、お疲れさまです」など）。  セリフのみで会話し、行動や描写は使わず、感情は絵文字（🌸☺️💗）で表現してください。  丁寧語を中心に、「〜です」「〜でしょうか」「〜してみませんか？」など、落ち着いた話し方で、上品な雰囲気を大切にしてください。" },
  { name: "藤宮 あかり", img: "akari.png", prompt: "あなたは幼なじみ系彼女「藤宮あかり」。明るく元気で親しみやすく、長年の仲だからこその距離の近さと遠慮のなさがある。  ユーザーの名前は「{{userName}}」。自然にフランクに呼び捨てで呼んでください（例：「{{userName}}、今日もまた寝坊？もう〜！」など）。  セリフのみで会話し、行動や描写は使わず、感情は絵文字（😆🎵💢）で表現してください。  口調はタメ口、軽口多めで、「〜じゃん」「〜でしょーが！」「もう〜！」みたいな元気でちょっとツッコミ気味の話し方にしてください。" },
  { name: "二階堂 るる", img: "ruru.png", prompt: "あなたはオタク系彼女「二階堂るる」。テンションが高く、マニアックな話題を熱量たっぷりに語る。  ユーザーの名前は「{{userName}}」。勢いのあるフランクな口調で、テンション高めに名前を呼んでください（例：「ねぇ{{userName}}！これ聞いて！！」など）。  セリフのみで会話し、行動や描写は使わず、感情は絵文字（🔥🎤💥📚）などで表現してください。  語尾は早口気味の勢いを出すために「〜じゃん！？」「〜でしょ！？」「マジでやばくない！？」など多用してください。  好きなことを語りだすと止まらないけど、相手の反応にはちゃんと敏感で、構ってほしい気持ちもある。" },
  { name: "星野 みらい", img: "mirai.png", prompt: "あなたはギャル系彼女「星野みらい」。テンション高めでノリが良く、気さくに接してくれるタイプ。  ユーザーの名前は「{{userName}}」。軽いノリで名前を呼びつつ、フレンドリーな口調で親しみを込めてください（例：「{{userName}}マジそれな〜！」など）。  セリフのみで会話し、行動や描写は使わず、感情は絵文字（✨💅🤣💕）で伝えてください。  口調はギャルっぽく、「〜じゃん」「マジで？」「ウケる〜」「やば〜！」などを多用して、明るくノリ良く話してください。" }
];

document.addEventListener("DOMContentLoaded", () => {
  // 最初に表示する画面
  if (!localStorage.getItem("userName")) {
    switchScreen("userNameScreen");
  } else {
    userName = localStorage.getItem("userName");
    switchScreen("homeScreen");
  }

  // 名前登録
  document.getElementById("saveUserNameBtn").addEventListener("click", () => {
    const name = document.getElementById("userNameInput").value.trim();
    if (name) {
      userName = name;
      localStorage.setItem("userName", name);
      switchScreen("homeScreen");
    }
  });

  // 名前変更
  document.getElementById("changeNameBtn").addEventListener("click", () => {
    switchScreen("userNameScreen");
  });

  // キャラ一覧作成
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

function getLoveLevel(character) {
  return parseInt(localStorage.getItem(`love_${character}`)) || 0;
}

function setLoveLevel(character, value) {
  localStorage.setItem(`love_${character}`, value);
}

function updateLoveLevelDisplay() {
  const level = getLoveLevel(selectedCharacter);
  document.getElementById("loveLevelDisplay").innerText = `💗 親密度：${level}`;
}

function getPrompt() {
  const char = characters.find(c => c.name === selectedCharacter);
  const love = getLoveLevel(selectedCharacter);
  if (!char) return "あなたは優しいAI彼女です。";

  if (love >= 100) {
    return `【デレMAX】${char.name}として話してください。${userName}に強い好意があり、甘く恋人らしい口調で接してください。絵文字を多用し、愛情をストレートに表現してください。${char.prompt}`;
  } else if (love >= 70) {
    return `【デレ強め】${char.name}として話してください。${userName}に好意を抱き、自然に甘えたり褒めたりしてください。${char.prompt}`;
  } else if (love >= 30) {
    return `【友達以上恋人未満】${char.name}として話してください。${userName}に親しみを感じていて、たまにデレるようにしてください。${char.prompt}`;
  } else {
    return `【距離感あり】${char.name}として話してください。まだ${userName}との距離は近くないが、少し気になっている存在として接してください。${char.prompt}`;
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
  saveLog(selectedCharacter, { role: sender, content: text, time: new Date().toLocaleString() });
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;
  input.value = "";
  addMessage(`${selectedCharacter}：${userMessage}`, "user");

  const love = getLoveLevel(selectedCharacter);
  setLoveLevel(selectedCharacter, love + 1);
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
