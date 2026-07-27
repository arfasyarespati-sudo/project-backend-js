// script.js

const API_URL = "https://api.github.com/users/";

// Tangkap elemen DOM
const main = document.getElementById("main");
const inputForm = document.getElementById("userInput");
const inputBox = document.getElementById("inputBox");

// 1. Fungsi Utama: Ambil Data User dari GitHub
const userGetFunction = async (username) => {
    try {
        const response = await fetch(API_URL + username);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("No profile with this username");
            }
            throw new Error("Problem fetching user data");
        }

        const data = await response.json();
        userCard(data);
        repoGetFunction(username);

    } catch (err) {
        errorFunction(err.message);
    }
};

// 2. Ambil Data Repositori Terbaru
const repoGetFunction = async (username) => {
    try {
        const response = await fetch(`${API_URL}${username}/repos?sort=created&per_page=5`);
        
        if (!response.ok) {
            throw new Error("Problem fetching repos");
        }

        const repos = await response.json();
        repoCardFunction(repos);

    } catch (err) {
        errorFunction("Problem fetching repos");
    }
};

// 3. Render Kartu Profil User
const userCard = (user) => {
    const id = user.name || user.login;
    const info = user.bio ? `<p>${escapeHTML(user.bio)}</p>` : "";
    
    const cardElement = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${escapeHTML(id)}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${escapeHTML(id)}</h2>
                ${info}
                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = cardElement;
};

// 4. Render Daftar Link Repositori (Maksimal 5)
const repoCardFunction = (repos) => {
    const reposElement = document.getElementById("repos");
    reposElement.innerHTML = ""; // Bersihkan kontainer sebelum menambah link

    repos.forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.rel = "noopener noreferrer"; // Keamanan tambahan untuk tab baru
        repoEl.innerText = repo.name;
        
        reposElement.appendChild(repoEl);
    });
};

// 5. Tampilan jika Terjadi Eror
const errorFunction = (message) => {
    const cardHTML = `
        <div class="card">
            <h1>${escapeHTML(message)}</h1>
        </div>
    `;
    main.innerHTML = cardHTML;
};

// Helper kecil untuk mencegah XSS (keamanan input/output)
const escapeHTML = (str) => {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
};

// Event Listener pada Form Submit
inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = inputBox.value.trim();

    if (username) {
        userGetFunction(username);
        inputBox.value = "";
    }
});
