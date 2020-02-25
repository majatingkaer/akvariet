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

async function loadData() {
    const response = await fetch(link);
    fisker = await response.json();
    console.log(fisker);
    visFisker();
}

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

//function hideMenu() {
//    console.log("hideMenu");
//    document.querySelector("#menu").classList.toggle("hidden");
//}

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
    detalje.querySelector("img").src = `foto/fiskebilleder/${fisk.gsx$billede.$t}.jpg`;
    detalje.querySelector(".videre").addEventListener("click", () => {
        location.href = "nytvindu.html?id=" + fisk.gsx$id.$t;

    });
    //  container.appendChild(klon);
}

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
//const endpoint = "";
//
//let oversigt = [];
