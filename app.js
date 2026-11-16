const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const branches = [
  ["Sayalgudi", "9942230385"],
  ["Kadaladi", "9363730585"],
  ["Kannirajapuram", "9363730685"],
  ["Narippayur", "9363030485"],
];
const goldRates = [0.55, 0.97, 1.47, 1.97, 2.47];
const silverRates = [2.5];
const bands = [95, 90, 80, 70, 60];
const OUNCE_GRAMS = 31.1035;
const state = {
  metal: "gold",
  band: 95,
  months: 1,
  language: "ta",
  selectedRate: null,
  liveRates: { gold: null, silver: null },
  manualRates: { gold: null, silver: null },
  liveUpdatedAt: null,
  rateStatus: { ta: "விலையைப் பெறுகிறது…", en: "Loading rates…", error: false },
  recognition: null,
};

const englishCopy = {
  "தங்கம் & வெள்ளி நகை அடமானக் கடன்": "Gold & silver jewellery pledge loans",
  "தங்கம் & வெள்ளி நகைகளுக்கு நம்பிக்கையான அடமானக் கடன்": "Trusted pledge loans on gold and silver jewellery",
  "முக்கிய கிளை · Sayalgudi": "Main branch · Sayalgudi",
  "முகப்பு": "Home",
  "லோகோ": "logo",
  "மெனுவைத் திற": "Open menu",
  "முதன்மை மெனு": "Main menu",
  "கடன் கணிப்பான்": "Loan calculator",
  "வட்டி & திட்டங்கள்": "Rates & plans",
  "கிளைகள்": "Branches",
  "தமிழ் உதவியாளர்": "Customer assistant",
  "அழைக்கவும்": "Call",
  "உங்கள் நகைக்கு": "Loans on your",
  "உடனடி மதிப்பு.": "jewellery, clearly valued.",
  "தங்கம் மற்றும் வெள்ளி நகைகளை அடமானம் வைத்து, தெளிவான மதிப்பீட்டுடன் கடன் பெறுங்கள். நான்கு கிளைகளிலும் நேரில் உதவத் தயாராக இருக்கிறோம்.": "Pledge gold or silver jewellery and get a clear estimate. Our team is ready to help you in person at any of our four branches.",
  "கடன் மதிப்பை கணக்கிடுங்கள்": "Estimate your loan",
  "கிளைக்கு அழைக்கவும்": "Call the Sayalgudi branch",
  "Sayalgudi கிளைக்கு அழைக்கவும்": "Call the Sayalgudi branch",
  "கடன் மதிப்பீடு நகை சோதனை மற்றும் கிளை விகிதத்தின் அடிப்படையில் உறுதி செய்யப்படும்.": "The final loan amount is confirmed after jewellery inspection and branch appraisal.",
  "உங்கள் தொடர்பு": "YOUR CONTACT",
  "நம்பிக்கை": "TRUST",
  "மதிப்பு": "VALUE",
  "சேவை": "SERVICE",
  "நேரடி விலை": "Live rate",
  "தெளிவான கணிப்பு": "Clear estimate",
  "நேரடி தங்கம் மற்றும் வெள்ளி spot விலை": "Live gold and silver spot rates",
  "நேரடி spot விலை": "LIVE SPOT RATE",
  "சந்தை குறிப்பு · INR / கிராம்": "Market reference · INR / gram",
  "தங்கம் · 24K": "Gold · 24K",
  "தங்கம் · 916": "Gold · 916",
  "தங்கம்": "Gold",
  "வெள்ளி": "Silver",
  "கிராம்": "gram",
  "விலையைப் பெறுகிறது…": "Loading rates…",
  "விலைகளைப் புதுப்பிக்க": "Refresh rates",
  "இந்த spot விலைகள் சந்தை குறிப்பு மட்டுமே; அடமானத் தொகை purity, கல்/இதர எடை, நகை ஆய்வு மற்றும் அன்றைய கிளை விகிதத்தைப் பொறுத்து மாறும்.": "Spot prices are indicative only. The loan amount depends on purity, stone and deduction weight, inspection and the branch rate of the day.",
  "உங்கள் நகையின் மதிப்பு": "Jewellery valuation",
  "கடன் மதிப்பீட்டு": "Loan estimate",
  "கணிப்பான்": "calculator",
  "எடை, purity மற்றும் விலை உள்ளிட்ட விவரங்களை உள்ளிடுங்கள். இது முன்கணிப்பு மட்டுமே; இறுதி மதிப்பீடு கிளையில் உறுதி செய்யப்படும்.": "Enter the weight, purity and rate. This is an estimate only; the branch confirms the final appraisal.",
  "நகை விவரங்கள்": "Jewellery details",
  "நகை வகையைத் தேர்ந்தெடுக்க": "Choose jewellery type",
  "மொத்த எடை": "Gross weight",
  "கல் / மணிகள் எடை": "Stone / bead weight",
  "இதர கழிவு": "Other deductions",
  "சோதனை purity": "Tested purity",
  "கணக்கில் வரும் நிகர எடை": "Net weight used in estimate",
  "நேரடி விலை / கிராம்": "Live rate / gram",
  "விலையை ஏற்றுகிறது…": "Loading rate…",
  "நேரடி spot விலையைப் பயன்படுத்து": "Use live spot rate",
  "கல் எடை மற்றும் இதர கழிவுகள் நிகர எடையிலிருந்து கழிக்கப்படும். purity-ஐ கிளைச் சோதனைக்குப் பிறகு திருத்தலாம்.": "Stone and other deductions are subtracted from gross weight. Adjust purity after the branch test.",
  "மதிப்பீட்டு விருப்பம்": "Estimate options",
  "கணக்கிடப்பட்ட நிகர மதிப்பு": "Calculated metal value",
  "நிகர எடை × விலை × purity": "Net weight × rate × purity",
  "முன்கணிப்பு வரம்பைத் தேர்வு செய்யுங்கள்": "Choose an estimate band",
  "மதிப்பின் சதவீதம்": "% of value",
  "கடன் மதிப்பீட்டு சதவீதம்": "Loan estimate percentage",
  "உயர் மதிப்பீடு": "Upper estimate",
  "மதிப்பீடு": "Estimate",
  "தேர்ந்தெடுத்த கடன் முன்கணிப்பு": "Selected loan estimate",
  "வட்டி முன்கணிப்பு": "Interest estimate",
  "காலத் திட்டத்தைத் தேர்ந்தெடுக்க": "Choose a loan term",
  "மாதம்": "Month",
  "3 மாதம்": "3 months",
  "6 மாதம்": "6 months",
  "மாத வட்டி விகிதத்தைத் தேர்ந்தெடுக்க": "Choose a monthly interest rate",
  "மதிப்பிடப்பட்ட வட்டி": "Estimated interest",
  "வட்டி tier-ஐத் தேர்வு செய்யுங்கள்": "Choose an interest tier",
  "மொத்தம்": "Estimated total",
  "முன்கணிப்பு": "Estimate",
  "வட்டி: முதன்மைத் தொகை × மாத விகிதம் × மாதங்கள். இது எளிய வட்டி முன்கணிப்பு; இறுதி வட்டி/கட்டணங்களை கிளையில் உறுதி செய்யவும்.": "Interest estimate: principal × monthly rate × months. Simple interest only; confirm final interest and any charges with the branch.",
  "இறுதி மதிப்பீட்டிற்கு கிளையை அழைக்கவும்": "Call a branch to confirm",
  "எளிய வட்டி விவரம்": "Simple interest details",
  "திட்டத்தைத் தேர்வு செய்யுங்கள்.": "Choose a plan.",
  "விகிதத்தை உறுதி செய்யுங்கள்.": "Confirm the applicable rate.",
  "கீழே உள்ளவை மாதாந்திர வட்டி விகிதங்கள். பொருந்தும் tier மற்றும் விதிமுறைகளை அடமானம் வைக்கும் முன் கிளையில் உறுதி செய்யவும்.": "The rates below are monthly interest tiers. Confirm the applicable tier and terms with a branch before pledging.",
  "மாதாந்திர திட்டம்": "Monthly plan",
  "3 மாத திட்டம்": "3-month plan",
  "6 மாத திட்டம்": "6-month plan",
  "மாத வட்டி விகிதங்கள்": "Monthly interest rates",
  "முதன்மைத் தொகைக்கு, மாதத்திற்கு": "Per month on the loan principal",
  "தங்க நகை": "Gold jewellery",
  "வெள்ளி நகை": "Silver jewellery",
  "எந்த gold rate tier எந்தத் திட்டத்திற்குப் பொருந்தும் என்பதை கிளையில் உறுதி செய்யவும். இந்த வட்டி பட்டியல், calculator-இல் உள்ள 60%–95% மதிப்பீட்டு வரம்புகளிலிருந்து தனியாகும்.": "Confirm at the branch which gold rate tier applies to each plan. These interest tiers are separate from the calculator’s 60%–95% estimate bands.",
  "வெளிப்படையான விகிதம் · உங்கள் கேள்விகளுக்கு கிளையில் நேரடி விளக்கம்": "Clear rates · In-person answers at every branch",
  "உங்களுக்கு அருகில்": "NEAR YOU",
  "நான்கு கிளைகள்.": "Four branches.",
  "ஒரே அக்கறை.": "One commitment to care.",
  "நகை மதிப்பீடு, வட்டி விவரம் மற்றும் அடமான செயல்முறைக்கு எந்தக் கிளையையும் தொடர்பு கொள்ளுங்கள்.": "Contact any branch for appraisal, interest details and pledge support.",
  "முக்கிய கிளை · 10/72, ECR Road,": "Main branch · 10/72, ECR Road,",
  "அடமான சேவை மற்றும்": "Pledge loans and",
  "நகை மதிப்பீடு": "jewellery appraisal",
  "வணக்கம் · வணிகத் தகவல் உதவி": "HELLO · BUSINESS INFORMATION",
  "தமிழில் கேளுங்கள்.": "Ask in Tamil or English.",
  "உடனே தெரிந்துகொள்ளுங்கள்.": "Get a quick answer.",
  "கிளை எண்கள், வட்டி விகிதங்கள், காலத் திட்டங்கள் மற்றும் பணம் செலுத்தும் வழிகள் பற்றி கேளுங்கள். மைக்ரோஃபோன் இருந்தால் குரலிலும் பேசலாம்.": "Ask about branch numbers, interest rates, loan terms or payment methods. Use your microphone if your browser supports speech input.",
  "Vapi இல்லை · Tamil voice API இல்லை": "No Vapi · No external voice API",
  "உலாவியின் voice வசதி கிடைத்தால் பயன்படுத்தப்படும்": "Uses browser speech when available",
  "அய்யனார் உதவியாளர்": "Ayyanar assistant",
  "தமிழ் · வணிகத் தகவல்": "Tamil / English · Business information",
  "உதவியாளர் உரையாடல்": "Assistant conversation",
  "AGB உதவி": "AGB Help",
  "வணக்கம்! தங்கம் / வெள்ளி வட்டி, கிளை எண்கள், UPI அல்லது கடன் கணிப்பான் பற்றி கேளுங்கள்.": "Hello! Ask about gold or silver interest, branch numbers, UPI or the loan calculator.",
  "எல்லா கிளைகளின் தொலைபேசி எண்களையும் சொல்லுங்கள்": "Show all branch phone numbers",
  "கிளை எண்கள்": "Branch numbers",
  "தங்கம் மற்றும் வெள்ளி வட்டி விகிதம் என்ன?": "What are the gold and silver interest rates?",
  "வட்டி விகிதம்": "Interest rates",
  "UPI மூலம் எப்படி செலுத்துவது?": "How can I pay by UPI?",
  "மூலம் எப்படி செலுத்துவது?": "How can I pay?",
  "தமிழில் குரல் மூலம் கேட்க": "Ask by voice",
  "குரல் மூலம் கேட்க": "Voice input",
  "உங்கள் கேள்வி": "Your question",
  "உங்கள் கேள்வியைத் தட்டச்சு செய்யுங்கள்…": "Type your question…",
  "அனுப்பு": "Send",
  "உதவி பதில்கள் தளத்திலேயே உருவாகும்; உரையாடல் சேமிக்கப்படாது.": "Replies are generated on this page; chat is not stored.",
  "அடமான உறுதிமொழி": "PLEDGE PROMISE",
  "தெளிவான விதிமுறை.": "Clear terms.",
  "கிளையில் கையொப்பம்.": "Signed at the branch.",
  "அடமானம் வைத்த பின், பெற்ற பணத்திற்கான தொகையையும் மாத வட்டியையும் ஒப்புக்கொண்ட நிபந்தனைகளின்படி செலுத்துவதாக வாடிக்கையாளர் உறுதி அளித்து கையொப்பமிடுவார்.": "After pledging jewellery, the customer signs to repay the cash received together with the agreed monthly interest and terms.",
  "நாங்கள் உதவத் தயாராக இருக்கிறோம்": "WE’RE READY TO HELP",
  "அடுத்த படியை": "Let’s take",
  "ஒன்றாகப் பார்ப்போம்.": "the next step together.",
  "மேலாண்மை இயக்குநர் · MD": "MANAGING DIRECTOR · MD",
  "மின்னஞ்சல் · EMAIL": "EMAIL",
  "UPI கட்டண எண்": "UPI PAYMENT NUMBER",
  "அனைத்தும் உரிமை பெற்றவை.": "All rights reserved.",
  "மேலே திரும்பு ↑": "Back to top ↑",
};

const englishFragments = Object.entries(englishCopy).sort((a, b) => b[0].length - a[0].length);
const staticTextNodes = [];

function captureStaticText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!node.nodeValue.trim() || node.parentElement?.closest(".language-switch,script,style")) continue;
    if (/[\u0B80-\u0BFF]/.test(node.nodeValue)) staticTextNodes.push({ node, original: node.nodeValue });
  }
}

function translatedText(original) {
  const trimmed = original.trim();
  let translated = englishCopy[trimmed];
  if (!translated) {
    translated = trimmed;
    for (const [tamil, english] of englishFragments) translated = translated.replaceAll(tamil, english);
  }
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function applyLanguage(language) {
  state.language = language;
  document.documentElement.lang = language === "en" ? "en" : "ta";
  for (const entry of staticTextNodes) entry.node.nodeValue = language === "en" ? translatedText(entry.original) : entry.original;
  const english = language === "en";
  $("#langTamil").classList.toggle("active", !english);
  $("#langEnglish").classList.toggle("active", english);
  $("#langTamil").setAttribute("aria-pressed", String(!english));
  $("#langEnglish").setAttribute("aria-pressed", String(english));
  $("#menuToggle").setAttribute("aria-label", english ? "Open menu" : "மெனுவைத் திற");
  $("#siteNav").setAttribute("aria-label", english ? "Main menu" : "முதன்மை மெனு");
  $("#chatInput").placeholder = english ? "Type your question…" : "உங்கள் கேள்வியைத் தட்டச்சு செய்யுங்கள்…";
  $("#micButton").title = english ? "Ask by voice" : "குரல் மூலம் கேட்க";
  $("#micButton").setAttribute("aria-label", english ? "Ask by voice" : "தமிழில் குரல் மூலம் கேட்க");
  $("#sendButton").setAttribute("aria-label", english ? "Send" : "அனுப்பு");
  $("#refreshRates").setAttribute("aria-label", english ? "Refresh rates" : "விலைகளைப் புதுப்பிக்க");
  $(".metal-switch").setAttribute("aria-label", english ? "Choose jewellery type" : "நகை வகையைத் தேர்ந்தெடுக்க");
  $(".band-list").setAttribute("aria-label", english ? "Loan estimate percentage" : "கடன் மதிப்பீட்டு சதவீதம்");
  $(".term-switch").setAttribute("aria-label", english ? "Choose a loan term" : "காலத் திட்டத்தைத் தேர்ந்தெடுக்க");
  $("#rateChoices").setAttribute("aria-label", english ? "Choose a monthly interest rate" : "மாத வட்டி விகிதத்தைத் தேர்ந்தெடுக்க");
  $("#chatMessages").setAttribute("aria-label", english ? "Assistant conversation" : "உதவியாளர் உரையாடல்");
  $(".brand").setAttribute("aria-label", english ? "Ayyanar Gold Bank home" : "Ayyanar Gold Bank முகப்பு");
  $(".brand img").alt = english ? "Ayyanar Gold Bank logo" : "Ayyanar Gold Bank லோகோ";
  $(".hero-photo-frame img").alt = english ? "Ayyanar Gold Bank Managing Director Yukesh Varma" : "Ayyanar Gold Bank மேலாண்மை இயக்குநர் Yukesh Varma";
  $(".rate-strip").setAttribute("aria-label", english ? "Live gold and silver spot rates" : "நேரடி தங்கம் மற்றும் வெள்ளி spot விலை");
  $("#useLiveRate").title = english ? "Use live spot rate" : "நேரடி spot விலையைப் பயன்படுத்து";
  document.title = english ? "Ayyanar Gold Bank | Gold & Silver Pledge Loans" : "Ayyanar Gold Bank | தங்கம் & வெள்ளி நகைக் கடன்";
  const description = $("meta[name='description']");
  if (description) description.content = english
    ? "Ayyanar Gold Bank offers gold and silver jewellery pledge loans from four branches in Sayalgudi, Kadaladi, Kannirajapuram and Narippayur."
    : "Ayyanar Gold Bank — Sayalgudi, Kadaladi, Kannirajapuram மற்றும் Narippayur கிளைகளில் தங்கம் மற்றும் வெள்ளி நகை அடமானக் கடன்.";
  $("#voiceStatus").textContent = english ? "Replies are generated on this page; chat is not stored." : "உதவி பதில்கள் தளத்திலேயே உருவாகும்; உரையாடல் சேமிக்கப்படாது.";
  if (state.recognition) state.recognition.lang = english ? "en-IN" : "ta-IN";
  renderRateChoices();
  updatePriceField();
  setSpotStatus(state.rateStatus.ta, state.rateStatus.en, state.rateStatus.error);
}

const money = (value) => Number.isFinite(value)
  ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value)
  : "₹ —";
const number = (value) => Number.isFinite(value) ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 3 }).format(value) : "0.000";
const currentPrice = () => state.manualRates[state.metal] ?? state.liveRates[state.metal];
const currentRates = () => state.metal === "gold" ? goldRates : silverRates;

function renderRateChoices() {
  const container = $("#rateChoices");
  const rates = currentRates();
  if (!rates.includes(state.selectedRate)) state.selectedRate = null;
  container.replaceChildren(...rates.map((rate) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `rate-chip${state.selectedRate === rate ? " active" : ""}`;
    button.textContent = `${rate.toFixed(2)}%`;
    button.setAttribute("aria-pressed", String(state.selectedRate === rate));
    button.title = state.language === "en" ? `${rate.toFixed(2)}% per month` : `மாதத்திற்கு ${rate.toFixed(2)}%`;
    button.addEventListener("click", () => {
      state.selectedRate = rate;
      renderRateChoices();
      calculate();
    });
    return button;
  }));
  if (state.metal === "silver" && state.selectedRate === null) {
    state.selectedRate = silverRates[0];
    renderRateChoices();
  }
}

function readInputs() {
  const gross = Math.max(0, Number($("#grossWeight").value) || 0);
  const stones = Math.max(0, Number($("#stoneWeight").value) || 0);
  const other = Math.max(0, Number($("#otherDeduction").value) || 0);
  const quality = Math.min(100, Math.max(0, Number($("#purity").value) || 0));
  const rate = Math.max(0, Number($("#rateInput").value) || 0);
  const net = Math.max(0, gross - stones - other);
  return { gross, stones, other, quality, rate, net };
}

function calculate() {
  const { quality, rate, net } = readInputs();
  $("#netWeight").innerHTML = `${number(net)} <small>g</small>`;
  const gramValue = net * rate * quality / 100;
  $("#gramValue").textContent = money(gramValue);
  for (const band of bands) {
    const estimate = gramValue * band / 100;
    const valueNode = $(`[data-value-for="${band}"]`);
    if (valueNode) valueNode.textContent = net > 0 && rate > 0 ? money(estimate) : "₹ —";
  }
  const principal = gramValue * state.band / 100;
  const loanText = net > 0 && rate > 0 ? money(principal) : "₹ —";
  $("#loanValue").textContent = loanText;
  $("#selectedBandLabel").textContent = state.language === "en" ? `${state.band}% estimate` : `${state.band}% மதிப்பீடு`;
  const selectedRate = state.selectedRate;
  const interest = selectedRate === null ? NaN : principal * selectedRate * state.months / 100;
  $("#interestValue").textContent = net > 0 && rate > 0 && Number.isFinite(interest) ? money(interest) : "₹ —";
  $("#payableValue").textContent = net > 0 && rate > 0 && Number.isFinite(interest) ? money(principal + interest) : "₹ —";
  $("#interestBreakdown").textContent = selectedRate === null
    ? (state.language === "en" ? "Choose an interest tier" : "வட்டி tier-ஐத் தேர்வு செய்யுங்கள்")
    : state.language === "en"
      ? `${selectedRate.toFixed(2)}% × ${state.months} month${state.months === 1 ? "" : "s"} · simple interest`
      : `${selectedRate.toFixed(2)}% × ${state.months} மாதம் · எளிய வட்டி`;
}

function updatePriceField() {
  const input = $("#rateInput");
  const price = currentPrice();
  input.value = Number.isFinite(price) ? price.toFixed(2) : "";
  input.placeholder = Number.isFinite(state.liveRates[state.metal])
    ? (state.language === "en" ? "Rate / gram" : "விலை / கிராம்")
    : (state.language === "en" ? "Live rate unavailable — enter a rate" : "நேரடி விலை கிடைக்கவில்லை — உள்ளிடவும்");
  $("#useLiveRate").disabled = !Number.isFinite(state.liveRates[state.metal]);
  calculate();
}

function setSpotStatus(messageTa, messageEn = messageTa, isError = false) {
  state.rateStatus = { ta: messageTa, en: messageEn, error: isError };
  const status = $("#spotStatus");
  status.textContent = state.language === "en" ? messageEn : messageTa;
  status.classList.toggle("error", isError);
}

function formattedRate(rate) {
  return Number.isFinite(rate) ? money(rate) : "—";
}

async function fetchMetal(symbol) {
  const response = await fetch(`https://api.gold-api.com/price/${symbol}/INR`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Rate request failed: ${response.status}`);
  const data = await response.json();
  const perOunce = Number(data.price);
  if (!Number.isFinite(perOunce) || perOunce <= 0) throw new Error("The price response was invalid.");
  return { perGram: perOunce / OUNCE_GRAMS, updatedAt: data.updatedAt ?? data.timestamp ?? null };
}

async function refreshRates() {
  setSpotStatus("விலையைப் புதுப்பிக்கிறது…", "Refreshing rates…");
  $("#refreshRates").classList.add("refreshing");
  const [gold, silver] = await Promise.allSettled([fetchMetal("XAU"), fetchMetal("XAG")]);
  let received = 0;
  if (gold.status === "fulfilled") {
    state.liveRates.gold = gold.value.perGram;
    $("#goldSpot").textContent = formattedRate(gold.value.perGram);
    $("#gold916Spot").textContent = formattedRate(gold.value.perGram * 0.916);
    state.liveUpdatedAt = gold.value.updatedAt;
    received++;
  } else {
    $("#goldSpot").textContent = "—";
    $("#gold916Spot").textContent = "—";
  }
  if (silver.status === "fulfilled") {
    state.liveRates.silver = silver.value.perGram;
    $("#silverSpot").textContent = formattedRate(silver.value.perGram);
    if (!state.liveUpdatedAt) state.liveUpdatedAt = silver.value.updatedAt;
    received++;
  } else {
    $("#silverSpot").textContent = "—";
  }
  if (received) {
    const time = state.liveUpdatedAt ? new Date(state.liveUpdatedAt) : null;
    const clock = time && !Number.isNaN(time.valueOf())
      ? new Intl.DateTimeFormat(state.language === "en" ? "en-IN" : "ta-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(time)
      : null;
    setSpotStatus(
      received === 2 ? `spot benchmark · ${clock ?? "indicative"} IST` : "ஒரு விலை மட்டும் கிடைத்தது · indicative",
      received === 2 ? `Spot benchmark · ${clock ?? "indicative"} IST` : "One rate unavailable · indicative",
    );
    if (state.manualRates[state.metal] === null) updatePriceField();
  } else {
    setSpotStatus("நேரடி விலை கிடைக்கவில்லை · கிளை விலையை உள்ளிடவும்", "Live rate unavailable · enter the branch quote", true);
    updatePriceField();
  }
  $("#refreshRates").classList.remove("refreshing");
}

function setMetal(metal) {
  state.metal = metal;
  $$(".metal-choice").forEach((button) => {
    const active = button.dataset.metal === metal;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  $("#purity").value = metal === "gold" ? "88" : "92.5";
  renderRateChoices();
  updatePriceField();
}

function appendMessage(text, from = "bot") {
  const message = document.createElement("div");
  message.className = `chat-message ${from === "user" ? "user-message" : "bot-message"}`;
  if (from !== "user") {
    const label = document.createElement("span");
    label.className = "bot-label";
    label.textContent = state.language === "en" ? "AGB Help" : "AGB உதவி";
    message.append(label);
  }
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.append(paragraph);
  $("#chatMessages").append(message);
  $("#chatMessages").scrollTop = $("#chatMessages").scrollHeight;
}

function answerQuestion(question) {
  const q = question.toLocaleLowerCase("ta-IN");
  const en = state.language === "en";
  const gold = /தங்க|gold|22k|24k|916|xau/.test(q);
  const silver = /வெள்ளி|silver|xag/.test(q);
  const asksInterest = /வட்டி|interest|monthly rate|scheme|திட்டம்/.test(q);
  const asksPrice = /விலை|price|spot|22k|24k|916|gold rate|silver rate/.test(q);
  const gramQuery = q.match(/(\d+(?:\.\d+)?)\s*(?:g(?:ram)?s?|கிராம்|கிராமம்)/i);
  const gold24 = state.manualRates.gold ?? state.liveRates.gold;
  const silverPrice = state.manualRates.silver ?? state.liveRates.silver;
  const gold916 = Number.isFinite(gold24) ? gold24 * 0.916 : null;

  if (asksInterest) {
    if (silver && !gold) return en
      ? "Silver jewellery: 2.50% monthly interest. Monthly, 3-month and 6-month terms are available. Confirm the applicable terms with the branch."
      : "வெள்ளி நகைக்கு மாத வட்டி 2.50%. மாதாந்திரம், 3 மாதம் மற்றும் 6 மாதத் திட்டங்கள் உள்ளன. பொருந்தும் நிபந்தனைகளை கிளையில் உறுதி செய்யுங்கள்.";
    if (gold && !silver) return en
      ? "Gold jewellery monthly interest tiers: 0.55%, 0.97%, 1.47%, 1.97% and 2.47%. Monthly, 3-month and 6-month plans are available. Confirm which tier applies at the branch."
      : "தங்க நகைக்கான மாத வட்டி tiers: 0.55%, 0.97%, 1.47%, 1.97% மற்றும் 2.47%. மாதாந்திரம், 3 மாதம் மற்றும் 6 மாதத் திட்டங்கள் உள்ளன. பொருந்தும் tier-ஐ கிளையில் உறுதி செய்யுங்கள்.";
    return en
      ? "Gold monthly tiers: 0.55%, 0.97%, 1.47%, 1.97% and 2.47%. Silver: 2.50% per month. Monthly, 3-month and 6-month terms are available. Confirm the applicable tier and terms at the branch."
      : "தங்கத்திற்கு மாத வட்டி 0.55%, 0.97%, 1.47%, 1.97%, 2.47%; வெள்ளிக்கு 2.50%. மாதாந்திரம், 3 மாதம் மற்றும் 6 மாதத் திட்டங்கள் உள்ளன. பொருந்தும் tier மற்றும் நிபந்தனைகளை கிளையில் உறுதி செய்யுங்கள்.";
  }

  if (/\brates?\b/.test(q) && (gold || silver) && !/\b(price|spot|today|per gram|22k|24k|916)\b|விலை/.test(q)) return en
    ? `Monthly interest: gold ${goldRates.map((rate) => `${rate.toFixed(2)}%`).join(", ")}; silver 2.50%. Live spot references: 24K gold ${formattedRate(gold24)}/g, derived 916 gold ${formattedRate(gold916)}/g, silver ${formattedRate(silverPrice)}/g. Confirm the applicable loan rate at the branch.`
    : `மாத வட்டி: தங்கம் ${goldRates.map((rate) => `${rate.toFixed(2)}%`).join(", ")}; வெள்ளி 2.50%. நேரடி spot குறிப்பு: 24K தங்கம் ${formattedRate(gold24)}/கிராம், கணக்கிட்ட 916 தங்கம் ${formattedRate(gold916)}/கிராம், வெள்ளி ${formattedRate(silverPrice)}/கிராம். பொருந்தும் கடன் விகிதத்தை கிளையில் உறுதி செய்யுங்கள்.`;

  if (asksPrice && (gold || silver) && !gramQuery) {
    if (silver && !gold) return Number.isFinite(silverPrice)
      ? (en ? `Live silver spot reference: ${money(silverPrice)} per gram. This is indicative; the branch appraisal may differ.` : `நேரடி வெள்ளி spot குறிப்பு: கிராமுக்கு ${money(silverPrice)}. இது முன்கணிப்பு மட்டுமே; கிளை மதிப்பீடு மாறலாம்.`)
      : (en ? "The live silver rate is unavailable right now. Refresh the rates or call a branch for today's quote." : "நேரடி வெள்ளி விலை இப்போது கிடைக்கவில்லை. விலையைப் புதுப்பிக்கவும் அல்லது இன்றைய விலைக்கு கிளையை அழைக்கவும்.");
    if (silver && gold) return en
      ? `Live spot references per gram: 24K gold ${formattedRate(gold24)}, derived 916 gold ${formattedRate(gold916)}, and silver ${formattedRate(silverPrice)}. These are indicative market benchmarks; the branch confirms the pledge appraisal.`
      : `கிராமுக்கு நேரடி spot குறிப்பு: 24K தங்கம் ${formattedRate(gold24)}, கணக்கிட்ட 916 தங்கம் ${formattedRate(gold916)}, வெள்ளி ${formattedRate(silverPrice)}. இவை முன்கணிப்புகள்; அடமான மதிப்பீட்டை கிளையில் உறுதி செய்யுங்கள்.`;
    return Number.isFinite(gold24)
      ? (en ? `Live gold spot reference: 24K ${money(gold24)}/g; derived 916 (22K) reference ${money(gold916)}/g. These are indicative market benchmarks, not a binding branch quote.` : `நேரடி தங்க spot குறிப்பு: 24K ${money(gold24)}/கிராம்; கணக்கிட்ட 916 (22K) குறிப்பு ${money(gold916)}/கிராம். இவை சந்தை முன்கணிப்புகள் மட்டுமே; கிளையின் இறுதி விலை அல்ல.`)
      : (en ? "The live gold rate is unavailable right now. Refresh the rates or call a branch for today's quote." : "நேரடி தங்க விலை இப்போது கிடைக்கவில்லை. விலையைப் புதுப்பிக்கவும் அல்லது இன்றைய விலைக்கு கிளையை அழைக்கவும்.");
  }

  if (/கிளை|branch|தொலைபேசி|phone|எண்|number|அழைக்க/.test(q)) return en
    ? "Branches: Sayalgudi main branch 9942230385; Kadaladi 9363730585; Kannirajapuram 9363730685; Narippayur 9363030485. MD Yukesh Varma: 9443178862."
    : "எங்கள் கிளைகள்: முக்கிய கிளை Sayalgudi 9942230385; Kadaladi 9363730585; Kannirajapuram 9363730685; Narippayur 9363030485. MD Yukesh Varma: 9443178862.";
  if (/upi|gpay|phonepe|paytm|பணம் செலுத்த/.test(q)) return en
    ? "Pay by GPay, PhonePe or Paytm using 9363738862. Please verify the recipient name before sending money."
    : "GPay, PhonePe மற்றும் Paytm மூலம் 9363738862 என்ற எண்ணுக்கு செலுத்தலாம். பணம் அனுப்பும் முன் பெறுநர் பெயரைச் சரிபார்க்கவும்.";
  if (/மின்னஞ்சல்|email|mail/.test(q)) return en
    ? "Email: agbsayalkudi@gmail.com. For a quick response, call the relevant branch."
    : "மின்னஞ்சல்: agbsayalkudi@gmail.com. விரைவான பதிலுக்கு சம்பந்தப்பட்ட கிளையை அழைக்கவும்.";
  if (/முகவரி|address|எங்கே|where/.test(q)) return en
    ? "Main branch: 10/72, ECR Road, Sayalgudi. Other branches are in Kadaladi, Kannirajapuram and Narippayur. Call before visiting to confirm."
    : "முக்கிய கிளை: 10/72, ECR Road, Sayalgudi. மற்ற கிளைகள் Kadaladi, Kannirajapuram மற்றும் Narippayur-ல் உள்ளன. செல்லும் முன் அழைத்து உறுதி செய்யுங்கள்.";
  if (/கையொப்ப|உறுதிமொழி|promise|sign|நிபந்தனை|pledge/.test(q)) return en
    ? "After pledging, customers sign the promise to repay the cash received with the agreed monthly interest and terms. Check the amount, rate and term on the pledge receipt before signing."
    : "அடமானம் வைத்த பின், பெற்ற தொகையையும் ஒப்புக்கொண்ட மாத வட்டி/விதிமுறைகளையும் செலுத்துவதாக உறுதிமொழியில் கையொப்பமிட வேண்டும். கையொப்பமிடும் முன் ரசீதில் தொகை, விகிதம் மற்றும் காலத்தைச் சரிபார்க்கவும்.";

  const grams = gramQuery;
  if (grams) {
    const selectedMetal = silver && !gold ? "silver" : "gold";
    if (state.metal !== selectedMetal) setMetal(selectedMetal);
    $("#grossWeight").value = grams[1];
    calculate();
    const { quality, rate, net } = readInputs();
    const value = net * rate * quality / 100;
    const principal = value * state.band / 100;
    if (!(rate > 0) || !(net > 0)) return en
      ? `${grams[1]} g has been entered in the calculator. A live or branch rate is needed to estimate the loan. Enter the tested purity and deductions, then confirm the offer with a branch.`
      : `${grams[1]} கிராம் எடையை calculator-ல் சேர்த்துள்ளேன். கடன் முன்கணிப்பிற்கு நேரடி அல்லது கிளை விலை தேவை. சோதனை purity மற்றும் கழிவுகளைச் சேர்த்து, இறுதி தொகையை கிளையில் உறுதி செய்யுங்கள்.`;
    const tiers = selectedMetal === "gold" ? goldRates : silverRates;
    const durationMatch = q.match(/(?:3\s*மாத|3[- ]month|three\s*month)/i) ? 3 : q.match(/(?:6\s*மாத|6[- ]month|six\s*month)/i) ? 6 : 1;
    const interestLine = en
      ? `Interest options for ${durationMatch} month${durationMatch === 1 ? "" : "s"} (simple estimate): ${tiers.map((tier) => `${tier.toFixed(2)}% = ${money(principal * tier * durationMatch / 100)}`).join(" · ")}`
      : `${durationMatch} மாதத்திற்கான எளிய வட்டி முன்கணிப்பு: ${tiers.map((tier) => `${tier.toFixed(2)}% = ${money(principal * tier * durationMatch / 100)}`).join(" · ")}`;
    const rateLabel = selectedMetal === "gold" ? (en ? "Gold 24K spot" : "தங்கம் 24K spot") : (en ? "Silver spot" : "வெள்ளி spot");
    const name = selectedMetal === "gold" ? (en ? "GOLD JEWELLERY LOAN ESTIMATE" : "தங்க நகை கடன் முன்கணிப்பு") : (en ? "SILVER JEWELLERY LOAN ESTIMATE" : "வெள்ளி நகை கடன் முன்கணிப்பு");
    return `${name}\n${en ? "Gross weight" : "மொத்த எடை"}: ${number(Number(grams[1]))} g\n${en ? "Net weight" : "நிகர எடை"}: ${number(net)} g · ${en ? "Purity entered" : "உள்ளிட்ட purity"}: ${quality}%\n${rateLabel}: ${money(rate)}/g\n${en ? "Purity-adjusted value" : "purity அடிப்படையிலான மதிப்பு"}: ${money(value)}\n${en ? "Estimate band" : "முன்கணிப்பு வரம்பு"}: ${state.band}%\n${en ? "Estimated loan" : "மதிப்பிடப்பட்ட கடன்"}: ${money(principal)}\n${interestLine}\n${en ? "Confirm the applicable interest tier and final appraisal at the branch." : "பொருந்தும் வட்டி tier மற்றும் இறுதி மதிப்பீட்டை கிளையில் உறுதி செய்யுங்கள்."}`;
  }

  if (/திட்டம்|scheme|மாதம்|மூன்று|3 மாத|ஆறு|6 மாத/.test(q)) return en
    ? "Available terms: monthly, 3 months and 6 months. Gold monthly tiers are 0.55%, 0.97%, 1.47%, 1.97% and 2.47%; silver is 2.50% monthly. The applicable tier is confirmed at the branch."
    : "காலத் திட்டங்கள்: மாதாந்திரம், 3 மாதம், 6 மாதம். தங்க மாத வட்டி tiers 0.55%, 0.97%, 1.47%, 1.97%, 2.47%; வெள்ளி 2.50%. பொருந்தும் tier-ஐ கிளையில் உறுதி செய்யுங்கள்.";
  if (/விலை|தங்கம்|gold|வெள்ளி|silver|கணக்க|gram|loan|கடன்/.test(q)) return en
    ? "For a loan estimate, enter jewellery type, grams and tested purity in the calculator. It uses the live spot benchmark when available and lets you enter a branch quote manually. Final appraisal is confirmed at the branch."
    : "கடன் முன்கணிப்பிற்கு calculator-ல் நகை வகை, கிராம் எடை மற்றும் சோதனை purity-ஐ உள்ளிடுங்கள். நேரடி spot விலை கிடைத்தால் அதைப் பயன்படுத்தும்; branch quote-ஐ கைமுறையாகவும் உள்ளிடலாம். இறுதி மதிப்பீடு கிளையில் உறுதி செய்யப்படும்.";
  if (/வணக்கம்|hello|hi|நன்றி|thanks/.test(q)) return en
    ? "Hello! Ask about loan estimates, gold or silver interest, branch contacts, payment methods or today's spot reference."
    : "வணக்கம்! கடன் முன்கணிப்பு, தங்கம் / வெள்ளி வட்டி, கிளை எண்கள், கட்டண வழிகள் அல்லது இன்றைய spot விலை பற்றி கேளுங்கள்.";
  return en
    ? "I can help with loan estimates, gold and silver interest rates, branch contacts, UPI payments and pledge terms. For anything else, call Sayalgudi main branch: 9942230385."
    : "கடன் முன்கணிப்பு, தங்கம் / வெள்ளி வட்டி, கிளை எண்கள், UPI மற்றும் அடமான விதிமுறைகளில் உதவ முடியும். வேறு விவரத்திற்கு Sayalgudi முக்கிய கிளை: 9942230385.";
}

function speakReply(text) {
  if (!("speechSynthesis" in window)) {
    $("#voiceStatus").textContent = state.language === "en" ? "Speech output is unavailable in this browser; the reply is shown as text." : "இந்த உலாவியில் குரல் வெளியீடு இல்லை; பதில் உரையாகக் காட்டப்பட்டுள்ளது.";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const prefix = state.language === "en" ? "en" : "ta";
  utterance.lang = state.language === "en" ? "en-IN" : "ta-IN";
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith(prefix));
  if (voice) utterance.voice = voice;
  utterance.onerror = () => { $("#voiceStatus").textContent = state.language === "en" ? "Speech voice unavailable on this device; the reply is shown as text." : "தமிழ் குரல் இந்த சாதனத்தில் கிடைக்கவில்லை; பதிலை உரையாகப் பார்க்கவும்."; };
  window.speechSynthesis.speak(utterance);
}

function submitQuestion(question = $("#chatInput").value, speak = false) {
  const text = question.trim();
  if (!text) return;
  appendMessage(text, "user");
  $("#chatInput").value = "";
  const answer = answerQuestion(text);
  window.setTimeout(() => {
    appendMessage(answer, "bot");
    if (speak) speakReply(answer);
  }, 220);
}

function initVoice() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = $("#micButton");
  if (!Recognition) {
    mic.disabled = true;
    mic.title = state.language === "en" ? "Voice input unavailable; type instead" : "இந்த உலாவியில் குரல் உள்ளீடு இல்லை; தட்டச்சு செய்யலாம்";
    $("#voiceStatus").textContent = state.language === "en" ? "Voice input is unavailable in this browser; you can type your question." : "குரல் உள்ளீடு இந்த உலாவியில் இல்லை; தட்டச்சு உதவி பயன்படுத்தலாம்.";
    return;
  }
  const recognition = new Recognition();
  state.recognition = recognition;
  recognition.lang = state.language === "en" ? "en-IN" : "ta-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onstart = () => {
    mic.classList.add("listening");
    $("#voiceStatus").textContent = state.language === "en" ? "Listening… ask your question in English." : "கேட்கிறேன்… தமிழில் கேள்வியைக் கூறுங்கள்.";
  };
  recognition.onend = () => {
    mic.classList.remove("listening");
    if (!$("#voiceStatus").textContent.startsWith("கேள்வியைப் புரிந்து") && !$("#voiceStatus").textContent.startsWith("Processing")) {
      $("#voiceStatus").textContent = state.language === "en" ? "Replies are generated on this page; chat is not stored." : "உதவி பதில்கள் தளத்திலேயே உருவாகும்; உரையாடல் சேமிக்கப்படாது.";
    }
  };
  recognition.onerror = (event) => {
    mic.classList.remove("listening");
    $("#voiceStatus").textContent = state.language === "en"
      ? (event.error === "not-allowed" ? "Microphone permission was denied; you can type instead." : "Voice input failed; try again or type your question.")
      : (event.error === "not-allowed" ? "மைக்ரோஃபோன் அனுமதி இல்லை; தட்டச்சு செய்யலாம்." : "குரல் உள்ளீடு கிடைக்கவில்லை; மீண்டும் முயற்சிக்கவும் அல்லது தட்டச்சு செய்யவும்.");
  };
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    $("#chatInput").value = transcript;
    $("#voiceStatus").textContent = state.language === "en" ? "Processing your question…" : "கேள்வியைப் புரிந்து பதில் அளிக்கிறேன்…";
    submitQuestion(transcript, true);
  };
  mic.addEventListener("click", () => {
    try { recognition.start(); } catch { $("#voiceStatus").textContent = state.language === "en" ? "The microphone is already active." : "மைக்ரோஃபோன் ஏற்கனவே இயங்குகிறது."; }
  });
}

function init() {
  captureStaticText();
  applyLanguage("ta");
  $("#year").textContent = new Date().getFullYear();
  renderRateChoices();
  calculate();
  $("#langTamil").addEventListener("click", () => applyLanguage("ta"));
  $("#langEnglish").addEventListener("click", () => applyLanguage("en"));
  $$(".metal-choice").forEach((button) => button.addEventListener("click", () => setMetal(button.dataset.metal)));
  $$(".band-option").forEach((button) => button.addEventListener("click", () => {
    state.band = Number(button.dataset.band);
    $$(".band-option").forEach((option) => {
      const active = option === button;
      option.classList.toggle("active", active);
      option.setAttribute("aria-pressed", String(active));
    });
    calculate();
  }));
  $$(".term-choice").forEach((button) => button.addEventListener("click", () => {
    state.months = Number(button.dataset.months);
    $$(".term-choice").forEach((option) => {
      const active = option === button;
      option.classList.toggle("active", active);
      option.setAttribute("aria-pressed", String(active));
    });
    calculate();
  }));
  ["#grossWeight", "#stoneWeight", "#otherDeduction", "#purity"].forEach((selector) => $(selector).addEventListener("input", calculate));
  $("#rateInput").addEventListener("input", () => {
    const value = Number($("#rateInput").value);
    state.manualRates[state.metal] = Number.isFinite(value) && value > 0 ? value : null;
    calculate();
  });
  $("#useLiveRate").addEventListener("click", () => {
    state.manualRates[state.metal] = null;
    updatePriceField();
  });
  $("#refreshRates").addEventListener("click", refreshRates);
  $("#sendButton").addEventListener("click", () => submitQuestion());
  $("#chatInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitQuestion();
  });
  $$("[data-prompt]").forEach((button) => button.addEventListener("click", () => submitQuestion(button.dataset.prompt)));
  $("#menuToggle").addEventListener("click", () => {
    const open = $("#siteNav").classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded", String(open));
    $("#menuToggle").setAttribute("aria-label", open ? "மெனுவை மூட" : "மெனுவைத் திற");
  });
  $$("#siteNav a").forEach((link) => link.addEventListener("click", () => {
    $("#siteNav").classList.remove("open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
  }));
  initVoice();
  refreshRates();
  window.setInterval(refreshRates, 60000);
}

init();
