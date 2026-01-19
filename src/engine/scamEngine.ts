import { ScamResult, ScamFlag } from "../types";
import { normalizeText, contains, calculateRisk } from "../lib/utils";

export function analyzeScam(inputRaw: string): ScamResult {
  if (!inputRaw || inputRaw.trim().length < 5) {
    return {
      score: 0,
      redFlags: [],
      greenFlags: ["Message too short to indicate scam"],
      category: null,
      suggestions: ["Provide more details for better analysis"]
    };
  }

  const input = normalizeText(inputRaw);

  const redFlags: ScamFlag[] = [];
  const greenFlags: string[] = [];

  function addRedFlag(id: string, message: string, severity: "low" | "medium" | "high") {
    redFlags.push({ id, message, severity });
  }

  function addGreen(message: string) {
    greenFlags.push(message);
  }

  // ------------------------------
  // CATEGORY DETECTION
  // ------------------------------

  let category: string | null = null;

  const categoryRules = [
    {
      name: "investment",
      patterns: ["crypto", "bitcoin", "forex", "return on investment", "roi", "double your money"]
    },
    {
      name: "job",
      patterns: ["job offer", "hiring", "remote work", "visa sponsorship", "training fee", "processing fee"]
    },
    {
      name: "romance",
      patterns: ["my love", "honey", "dear", "soulmate", "lonely", "i need you", "urgent help"]
    },
    {
      name: "email",
      patterns: ["dear customer", "your account", "verify your account", "bank update", "password reset"]
    },
    {
      name: "link",
      patterns: ["http:", "https:", ".xyz", ".info", "bit.ly", "tinyurl"]
    },
    {
      name: "tech-support",
      patterns: ["support team", "windows alert", "security warning", "your device is infected"]
    }
  ];

  for (const rule of categoryRules) {
    if (contains(input, rule.patterns)) {
      category = rule.name;
      break;
    }
  }

  // ------------------------------
  // 20+ SCAM DETECTION RULES
  // ------------------------------

  // 1. Urgency
  if (contains(input, ["urgent", "immediately", "act now", "asap", "right away"])) {
    addRedFlag("urgency", "Message contains urgency indicators", "medium");
  }

  // 2. Pressure tactics
  if (contains(input, ["last chance", "final warning", "your account will close"])) {
    addRedFlag("pressure", "Pressure tactic detected", "medium");
  }

  // 3. Request for money
  if (contains(input, ["send money", "transfer fee", "processing fee"])) {
    addRedFlag("money-request", "Request for money", "high");
  }

  // 4. Request for gift cards
  if (contains(input, ["gift card", "itunes card", "google play card"])) {
    addRedFlag("giftcards", "Gift card request (common scam pattern)", "high");
  }

  // 5. Threats
  if (contains(input, ["legal action", "police", "court", "arrest"])) {
    addRedFlag("threats", "Threats are highly suspicious", "high");
  }

  // 6. Poor grammar
  if (/[a-z]{3,} [a-z]{1} [a-z]{3,}/i.test(inputRaw) || inputRaw.includes("  ")) {
    addRedFlag("grammar", "Poor grammar or unusual formatting", "low");
  }

  // 7. Fake authority
  if (contains(input, ["bank", "irs", "paypal", "security team"]) && contains(input, ["verify", "update"])) {
    addRedFlag("authority", "Fake authority impersonation", "high");
  }

  // 8. Unsolicited job offers
  if (category === "job" && contains(input, ["work from home", "no interview", "instant hire"])) {
    addRedFlag("job-scam", "Suspicious job offer patterns detected", "medium");
  }

  // 9. Investment promises
  if (category === "investment" && contains(input, ["guaranteed profit", "double your money"])) {
    addRedFlag("investment", "Unrealistic investment promises", "high");
  }

  // 10. Cryptocurrency wallet request
  if (contains(input, ["wallet", "seed phrase"])) {
    addRedFlag("crypto-wallet", "Never share wallet or seed phrase", "high");
  }

  // 11. Suspicious links
  if (/(bit\.ly|tinyurl|\.xyz|\.info|redirect)/.test(input)) {
    addRedFlag("link", "Suspicious shortened or unsafe link", "high");
  }

  // 12. Romance scam keywords
  if (category === "romance" && contains(input, ["i need money", "i will visit you", "lonely"])) {
    addRedFlag("romance", "Common romance scam behavior", "high");
  }

  // 13. Remote access tools
  if (contains(input, ["teamviewer", "anydesk", "remote access"])) {
    addRedFlag("remote-access", "Remote access request is dangerous", "high");
  }

  // 14. Fake shipping or customs
  if (contains(input, ["customs fee", "package held", "delivery release"])) {
    addRedFlag("shipping", "Suspicious package/delivery claim", "medium");
  }

  // 15. Lottery or prize
  if (contains(input, ["you won", "congratulations", "claim your prize"])) {
    addRedFlag("lottery", "Fake prize notification", "high");
  }

  // 16. Email spoofing signs
  if (contains(input, ["from:", "noreply@"]) && contains(input, ["verify", "click link"])) {
    addRedFlag("spoofing", "Potential email spoofing", "high");
  }

  // 17. Document or ID requests
  if (contains(input, ["passport", "id card", "drivers license"])) {
    addRedFlag("identity", "Identity document request", "high");
  }

  // 18. Over-friendly tone (romance)
  if (contains(input, ["my love", "honey", "dear"])) {
    addRedFlag("tone", "Overly affectionate tone is unusual", "low");
  }

  // 19. Unrealistic promises
  if (contains(input, ["100% guarantee", "no risk", "instant"])) {
    addRedFlag("promises", "Unrealistic guarantees detected", "medium");
  }

  // 20. Bank transfer requests
  if (contains(input, ["wire transfer", "western union", "moneygram"])) {
    addRedFlag("transfer", "Wire transfer requests are red flags", "high");
  }

  // ------------------------------
  // GREEN FLAGS
  // ------------------------------

  if (!contains(input, ["fee", "transfer", "urgent", "verify"])) {
    addGreen("Message lacks common scam keywords");
  }

  if (!/(http|www)/.test(input)) {
    addGreen("No links detected");
  }

  // ------------------------------
  // RISK SCORE
  // ------------------------------

  const score = calculateRisk(
    redFlags.filter((r) => r.severity === "high").length * 3 +
      redFlags.filter((r) => r.severity === "medium").length * 2 +
      redFlags.filter((r) => r.severity === "low").length,
    greenFlags.length
  );

  // ------------------------------
  // SUGGESTIONS
  // ------------------------------
  const suggestions = [];

  if (score < 20) {
    suggestions.push("Low risk detected. Still verify the sender if unsure.");
  } else if (score < 50) {
    suggestions.push("Message may be suspicious. Avoid clicking any links.");
  } else if (score < 80) {
    suggestions.push("High scam indicators found. Do not respond.");
  } else {
    suggestions.push("Severe risk. Block the sender and report the scam.");
  }

  return {
    score,
    redFlags,
    greenFlags,
    category,
    suggestions
  };
}
