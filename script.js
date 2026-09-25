const monkeys = [
  {
    name: "George",
    age: 24,
    distance: "3 km",
    bio: "Bananas, sunshine & climbing trees 🌴🍌",
    image:
      "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Charlie",
    age: 22,
    distance: "5 km",
    bio: "Professional tree climber 🌴 | Snack enthusiast 🍌",
    image:
      "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Milo",
    age: 26,
    distance: "7 km",
    bio: "Looking for someone to share my bananas with ❤️",
    image:
      "https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rocky",
    age: 25,
    distance: "2 km",
    bio: "Beach walks, coconuts and good vibes 🥥",
    image:
      "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=800&q=80",
  },
];

let currentIndex = 0;
let matches = [];

const cardContainer = document.getElementById("cardContainer");
const likeBtn = document.getElementById("likeBtn");
const nopeBtn = document.getElementById("nopeBtn");
const superBtn = document.getElementById("superBtn");

const matchPopup = document.getElementById("matchPopup");
const matchedMonkey = document.getElementById("matchedMonkey");

const matchesPanel = document.getElementById("matchesPanel");
const matchList = document.getElementById("matchList");

function showMonkey() {
  if (currentIndex >= monkeys.length) {
    cardContainer.innerHTML = `
            <div class="monkey-card">
                <div style="padding:40px;text-align:center;">
                    <div style="font-size:60px;">🐒</div>
                    <h2>You've seen everyone!</h2>
                    <p style="margin-top:10px;color:#888;">
                        Check back later for more monkeys.
                    </p>
                </div>
            </div>
        `;

    return;
  }

  const monkey = monkeys[currentIndex];

  cardContainer.innerHTML = `
        <div class="monkey-card">
            <img src="${monkey.image}" alt="${monkey.name}">

            <div class="card-info">
                <h2>${monkey.name} <span>🟢</span></h2>
                <p>🐒 ${monkey.age} years old · ${monkey.distance} away</p>
                <p class="bio">${monkey.bio}</p>
            </div>
        </div>
    `;
}

function swipe(type) {
  if (currentIndex >= monkeys.length) return;

  const monkey = monkeys[currentIndex];

  if (type === "like" || type === "super") {
    // Random chance of a match
    if (Math.random() > 0.4) {
      matches.push(monkey);

      matchedMonkey.textContent = monkey.name;
      matchPopup.style.display = "flex";

      updateMatches();
    }
  }

  currentIndex++;

  setTimeout(showMonkey, 200);
}

function updateMatches() {
  if (matches.length === 0) {
    matchList.innerHTML = `
            <p class="empty">No matches yet... keep swiping! 🐒</p>
        `;
    return;
  }

  matchList.innerHTML = matches
    .map(
      (monkey) => `
        <div class="match-item">
            <img src="${monkey.image}">
            <div>
                <h3>${monkey.name} 💚</h3>
                <p>It's a match!</p>
            </div>
        </div>
    `,
    )
    .join("");
}

likeBtn.addEventListener("click", () => swipe("like"));
superBtn.addEventListener("click", () => swipe("super"));
nopeBtn.addEventListener("click", () => swipe("nope"));

document.getElementById("keepSwiping").addEventListener("click", () => {
  matchPopup.style.display = "none";
});

document.getElementById("matchesBtn").addEventListener("click", () => {
  updateMatches();
  matchesPanel.style.display = "block";
});

document.getElementById("closeMatches").addEventListener("click", () => {
  matchesPanel.style.display = "none";
});

matchPopup.addEventListener("click", (e) => {
  if (e.target === matchPopup) {
    matchPopup.style.display = "none";
  }
});

matchesPanel.addEventListener("click", (e) => {
  if (e.target === matchesPanel) {
    matchesPanel.style.display = "none";
  }
});

showMonkey();
