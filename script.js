/* The words in this object are the only content you may want to personalise. */
const birthdayContent = {
  appreciations: [
    { section: "Things I genuinely appreciate about you.", heading: "The way you listen", message: "I genuinely appreciate the way you listen. Not just hearing what I have to say, but actually making room for it. Whether I need to vent, talk about random things or simply get something off my chest, you always seem willing to listen. And that means more than you probably realise." },
    { section: "Things I genuinely appreciate about you.", heading: "Your presence", message: "I appreciate how you're always there. Whether it's being available when I need someone to talk to or being up for one of those random walks, your presence is something I never take for granted. Sometimes, simply knowing there's someone I can count on makes all the difference." },
    { section: "Things I genuinely appreciate about you.", heading: "The little things", message: "It's the little things too. The conversations, the willingness to make time, the ease of talking to you and the way even ordinary moments can become something worth remembering." },
    { section: "Things you probably don't realise.", heading: "How much you mean", message: "You probably don't realise just how much you mean to me. Your presence has become something I genuinely value, and I'm not sure I tell you that enough. I'm grateful that I get to know you beyond the usual conversations and small talk." },
    { section: "Things you probably don't realise.", heading: "The difference you make", message: "You might think you're just being yourself, but sometimes that's more than enough to make someone's day a little lighter. Your willingness to listen, show up and simply be present doesn't go unnoticed." },
    { section: "Things you probably don't realise.", heading: "You are appreciated", message: "I hope you never have to question whether you're appreciated. You are. More than I probably manage to put into words." },
    { section: "A few things that make you, you.", heading: "Your calmness", message: "There's something admirable about how calm you are. You have this composed way of carrying yourself that makes even ordinary conversations feel easy. It's a quality I genuinely admire." },
    { section: "A few things that make you, you.", heading: "Your intellect", message: "You're intelligent, curious and someone I genuinely enjoy having conversations with. I appreciate the way you think, the things you know and the perspectives you bring into conversations." },
    { section: "A few things that make you, you.", heading: "The whole package", message: "Honestly, you're a combination of so many qualities that make you a wonderful person to have around. Calm, composed, intelligent, thoughtful and a genuinely good friend. It's difficult to put everything into one description, but I hope you never lose those qualities." }
  ],
  words: [
    { heading: "A thought worth keeping.", message: "Some connections develop so naturally that you only notice their importance when you stop to look around." },
    { heading: "A little reminder.", message: "You don't have to be doing something extraordinary to be making a difference. Being yourself has always been enough." },
    { heading: "Something I hope you remember.", message: "You are appreciated in the quiet ways too — in the conversations, the time, the ease and the small moments that stay with me." },
    { heading: "For the days ahead.", message: "I hope the year ahead gives you room to grow, reasons to laugh and plenty of unexpected good things to look forward to." }
  ],
  letter: {
    greeting: "Dear Tedd,",
    paragraphs: [
      "Happy birthday!",
      "I don't think I say this enough, but I'm genuinely glad our paths crossed.",
      "It's funny how some connections develop so naturally. One moment you're just getting to know someone, and before you realise it, you're sharing thoughts, conversations and little pieces of your everyday life.",
      "I hope you never underestimate how much of a difference you can make simply by being yourself.",
      "As you step into another year, I hope you experience growth, genuine happiness, beautiful opportunities and the courage to pursue everything you've been working towards.",
      "May life surprise you in the best ways. May you always have reasons to laugh, things to look forward to and people who remind you that you're appreciated.",
      "I'm really glad I get to know you.",
      "Have the loveliest birthday, Tedd."
    ],
    signoff: "With appreciation,<br>Someone who thinks you're worth celebrating."
  },
  surpriseMessages: [
    "You are, in fact, worth making an entire little website for.",
    "Consider this your official reminder: you are appreciated.",
    "The universe has excellent taste in people. Exhibit A: you.",
    "I hope something unexpectedly wonderful finds you this year.",
    "No grand speech. Just: I'm really glad you're here."
  ],
  music: {
    title: "Hopeless Romantic",
    artist: "KWN",
    source: "public/audio/hopeless-romantic.mp3",
    bonusTitle: "Blessed",
    bonusArtist: "Daniel Caesar",
    bonusUrl: "https://open.spotify.com/search/Blessed%20Daniel%20Caesar"
  }
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function renderAppreciations() {
  const groups = [...new Set(birthdayContent.appreciations.map(card => card.section))];
  let cardIndex = 0;
  $("#appreciation-grid").innerHTML = groups.map(section => `
    <div class="appreciation-group">
      <h3 class="group-title">${section}</h3>
      <div class="appreciation-group-grid">${birthdayContent.appreciations.filter(card => card.section === section).map(card => {
        cardIndex += 1;
        return `
          <article class="appreciation-card journal-card reveal" tabindex="0" role="button" aria-expanded="false">
            <div class="card-front"><span class="card-index">0${cardIndex}</span><h3>${card.heading}</h3><span class="card-arrow">↗</span></div>
            <div class="card-back"><span class="card-index">0${cardIndex} · a note</span><p>${card.message}</p></div>
          </article>
        `;
      }).join("")}
      </div>
    </div>
  `).join("");
}

function renderWords() {
  $("#words-grid").innerHTML = birthdayContent.words.map((word, index) => `
    <article class="word-card journal-card reveal">
      <span class="word-index">0${index + 1}</span>
      <h3>${word.heading}</h3>
      <p>${word.message}</p>
      <span class="word-mark">✦</span>
    </article>
  `).join("");
}

function renderLetter() {
  const letter = birthdayContent.letter;
  $("#letter-content").innerHTML = `<h3>${letter.greeting}</h3>${letter.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}<p>${letter.signoff}</p>`;
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

renderAppreciations();
renderLetter();
renderWords();

$(".enter-button").addEventListener("click", async () => {
  await startSoundtrack();
  scrollToSection("intro");
});
$(".continue-button").addEventListener("click", () => scrollToSection("memories"));
$(".replay-button").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.classList.remove("entered");
});

$$(".appreciation-card").forEach(card => {
  const toggle = () => {
    const open = card.classList.toggle("is-open");
    card.setAttribute("aria-expanded", String(open));
  };
  card.addEventListener("click", toggle);
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggle(); }
  });
});

const envelope = $(".envelope");
envelope.addEventListener("click", () => {
  const open = envelope.classList.toggle("is-open");
  envelope.setAttribute("aria-expanded", String(open));
  $(".letter-paper").classList.toggle("is-visible", open);
  $(".letter-paper").setAttribute("aria-hidden", String(!open));
  $(".envelope-prompt").textContent = open ? "your letter, opened" : "click to open your letter";
});

$(".surprise-button").addEventListener("click", event => {
  const messages = birthdayContent.surpriseMessages;
  const message = messages[Math.floor(Math.random() * messages.length)];
  $(".surprise-message").textContent = message;
  event.currentTarget.innerHTML = "Another one? <span>✦</span>";
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, { threshold: .12 });
$$(".reveal").forEach(element => revealObserver.observe(element));

const progressBar = $(".progress-bar");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

$$(".desktop-nav a").forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  scrollToSection(link.getAttribute("href").slice(1));
}));

const backgroundAudio = $("#background-audio");
const playControl = $(".play-control");
const muteControl = $(".mute-control");
let soundtrackUnavailableLogged = false;

function setPlaybackState(isPlaying) {
  playControl.textContent = isPlaying ? "❚❚" : "▶";
  playControl.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
  playControl.setAttribute("aria-pressed", String(isPlaying));
}

async function startSoundtrack() {
  try {
    await backgroundAudio.play();
    setPlaybackState(true);
  } catch {
    setPlaybackState(false);
    if (!soundtrackUnavailableLogged) {
      console.warn(`Background soundtrack unavailable: ${birthdayContent.music.source}`);
      soundtrackUnavailableLogged = true;
    }
  }
}

playControl.addEventListener("click", () => {
  if (backgroundAudio.paused) startSoundtrack();
  else {
    backgroundAudio.pause();
    setPlaybackState(false);
  }
});

muteControl.addEventListener("click", () => {
  backgroundAudio.muted = !backgroundAudio.muted;
  muteControl.textContent = backgroundAudio.muted ? "muted" : "sound";
  muteControl.setAttribute("aria-label", backgroundAudio.muted ? "Unmute background music" : "Mute background music");
  muteControl.setAttribute("aria-pressed", String(backgroundAudio.muted));
});

backgroundAudio.addEventListener("play", () => setPlaybackState(true));
backgroundAudio.addEventListener("pause", () => setPlaybackState(false));
backgroundAudio.addEventListener("error", () => {
  if (!soundtrackUnavailableLogged) {
    console.warn(`Background soundtrack unavailable: ${birthdayContent.music.source}`);
    soundtrackUnavailableLogged = true;
  }
});
