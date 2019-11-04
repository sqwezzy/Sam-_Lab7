const btnRepos = document.getElementById("btnRepos");
const divResult = document.getElementById("divResult");
btnRepos.addEventListener("click", getRepos);
const btnReposXML = document.getElementById("btnReposXML");
const resultXML = document.getElementById("resultXML");
btnReposXML.addEventListener("click", getReposXML);
const btnRecurc = document.getElementById("btnRecurs");
btnRecurc.addEventListener("click", recurs);
const getinfo = document.getElementById("getInfo");
const divInfo = document.getElementById("info");
getinfo.addEventListener("click", getInfo);
function clear(){
    while(divResult.firstChild)
        divResult.removeChild(divResult.firstChild)
}

async function getRepos() {
    clear();
    const url = "https://api.github.com/users/sqwezzy/repos";
    const response = await fetch(url);
    const result = await response.json();
    divResult.appendChild(document.createElement("select"));
    result.sort((a,b) => new Date(a.created_at) < new Date(b.created_at));
    result.forEach(repos => {
        const option = document.createElement("option");
        option.appendChild(document.createTextNode( `Name: ${repos.name}  Created date:${repos.created_at}`)
        );
        document.querySelector("select").appendChild(option);
    });
}
async function getReposXML() {
    clear();
    let xhr = new XMLHttpRequest();
    xhr.open('GET',' https://api.github.com/users/sqwezzy/repos' );
    xhr.onload = () => {
        const repositor = JSON.parse(xhr.response);
        resultXML.appendChild(document.createElement("select"));
        repositor.sort((a,b) => a.watchers_count < b.watchers_count);
        repositor.forEach(repos => {
            const option = document.createElement("option");
            option.appendChild(document.createTextNode( `Name: ${repos.name}  Watcher count:${repos.watchers_count}`));
            document.querySelector("select").appendChild(option);
        });
    };
    xhr.send();
}

async function getInfo() {
    clear();
        const response = await fetch('https://api.github.com/users/sqwezzy/repos');
        const result = await response.json();
        const info = document.createElement("p");
    result.forEach(repos => {
        for (let key in repos) {
            info.appendChild(document.createTextNode(`${key}: ${repos[key]}`));
            info.appendChild(document.createElement("br"));
        }
    });
    divInfo.appendChild(info);
}

function recurs() {
    getRepos();
    getReposXML();
    setTimeout( recurs , 3000);
}


