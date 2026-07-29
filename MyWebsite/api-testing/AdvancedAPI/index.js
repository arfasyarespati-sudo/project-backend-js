// script.js

const API_URL = "https://api.github.com/users/";

// DOM
const main = document.getElementById("main");
const inputForm = document.getElementById("userInput");
const inputBox = document.getElementById("inputBox");

// fetch profile
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

// fetch repo
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

// render profile card
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

// render 5 repo
const repoCardFunction = (repos) => {
    const reposElement = document.getElementById("repos");
    reposElement.innerHTML = ""; // clear container

    repos.forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.rel = "noopener noreferrer"; // security new tab
        repoEl.innerText = repo.name;
        
        reposElement.appendChild(repoEl);
    });
};

// if error
const errorFunction = (message) => {
    const cardHTML = `
        <div class="card">
            <h1>${escapeHTML(message)}</h1>
        </div>
    `;
    main.innerHTML = cardHTML;
};

// xss helper
const escapeHTML = (str) => {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
};

// event listener
inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = inputBox.value.trim();

    if (username) {
        userGetFunction(username);
        inputBox.value = "";
    }
});
