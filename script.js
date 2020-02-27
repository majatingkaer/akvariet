const link = "https://spreadsheets.google.com/feeds/list/1RvB2f2NnVM1-vxvO-tpdybufvkeX4DuF4jCgHjtVTJE/od6/public/values?alt=json";
let filter = "alle";
const container = document.querySelector("#data-container");
const fiskTemplate = document.querySelector("template");

document.addEventListener("DOMContentLoaded", start);

function start() {
    loadData();
    klikBar();
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);

}

// Venter til dataen fra Json filen er loadet før den går videre til visFisker.
async function loadData() {
    const response = await fetch(link);
    fisker = await response.json();
    console.log(fisker);
    visFisker();
}

// Burgermenu:
function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#menu").classList.toggle("hidden");
    document.querySelector("#menu").classList.toggle("overlay_menu");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
    } else {
        document.querySelector("#menuknap").textContent = "X";
    }

    //    document.querySelector(".filter").addEventListener("click", hideMenu);
}

// Henter data (billede og anden information) fra Json filen. Sætter ind indholdet i HTML elementene img og article.
function visFisker() {
    container.innerHTML = "";

    fisker.feed.entry.forEach(fisk => {
        if (filter == "alle" || filter == fisk.gsx$kategori.$t) {
            let klon = fiskTemplate.cloneNode(true).content;
            klon.querySelector("img").src = `foto/fiskebilleder/${fisk.gsx$billede.$t}.jpg`;
            klon.querySelector("article").addEventListener("click", () => {
                visDetalje(fisk)

            });
            container.appendChild(klon);
        }
    })
}

// Tilføjer eventlisteners til alle filter knappene så det er mulig at trykke på de.
function klikBar() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })
}

// Viser fiskene i et popup vindu
function visDetalje(fisk) {
    detalje.classList.remove("skjul");
    detalje.querySelector("button").addEventListener("click", () => detalje.classList.add("skjul"));
    console.log("FISK", fisk.gsx$id.$t);
    detalje.querySelector("h2").textContent = fisk.gsx$navn.$t;
    detalje.querySelector("p").textContent = `Fotograf: ${fisk.gsx$fotograf.$t}`;
    detalje.querySelector("img").src = `foto/fiskebilleder/${fisk.gsx$billede.$t}.jpg`;
    detalje.querySelector(".videre").addEventListener("click", () => {
        location.href = "nytvindu.html?id=" + fisk.gsx$id.$t;

    });
    //  container.appendChild(klon);
}

// Filtrerer fiskene i kategorier
function filtrering() {
    document.querySelector("#menu").classList.add("hidden");
    document.querySelector("#menu").classList.remove("overlay_menu");
    document.querySelector("#menuknap").textContent = "☰";
    console.log("FILTER");
    filter = this.dataset.kategori;
    document.querySelectorAll(".filter").forEach(elementer => {
        elementer.classList.remove("valgt");
    })
    console.log(this)
    this.classList.add("valgt");
    //    document.querySelector("#menu").classList.add("hidden");
    visFisker();
}
