const link = "https://spreadsheets.google.com/feeds/list/1RvB2f2NnVM1-vxvO-tpdybufvkeX4DuF4jCgHjtVTJE/od6/public/values?alt=json";
let filter = "alle";
const container = document.querySelector("#data-container");
const fiskTemplate = document.querySelector("template");

document.addEventListener("DOMContentLoaded", start);

function start() {
    loadData();
    klikBar();

}

async function loadData() {
    const response = await fetch(link);
    fisker = await response.json();
    console.log(fisker);
    visFisker();
}

function visFisker() {
    container.innerHTML = "";

    fisker.feed.entry.forEach(fisk => {
        if (filter == "alle" || filter == fisk.gsx$kategori.$t) {
            let klon = fiskTemplate.cloneNode(true).content;
            klon.querySelector("img").src = `small/${fisk.gsx$billede.$t}.jpg`;
            klon.querySelector("article").addEventListener("click", () => {
                visDetalje(fisk)

            });
            container.appendChild(klon);
        }
    })
}

function klikBar() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })
}

function visDetalje(fisk) {
    detalje.classList.remove("skjul");
    detalje.querySelector("button").addEventListener("click", () => detalje.classList.add("skjul"));
    console.log("FISK", fisk.gsx$id.$t);
    detalje.querySelector("h2").textContent = fisk.gsx$navn.$t;
    detalje.querySelector("p").textContent = fisk.gsx$fotograf.$t;
    detalje.querySelector("img").src = `small/${fisk.gsx$billede.$t}.jpg`;
    detalje.querySelector(".videre").addEventListener("click", () => {
        location.href = "nytvindu.html?id=" + fisk.gsx$id.$t;

    });
    //  container.appendChild(klon);
}

function filtrering() {
    console.log("FILTER");
    filter = this.dataset.kategori;
    document.querySelectorAll(".filter").forEach(elementer => {
        elementer.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visFisker();
}
//const endpoint = "";
//
//let oversigt = [];
