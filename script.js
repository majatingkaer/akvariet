const link = "https://spreadsheets.google.com/feeds/list/1RvB2f2NnVM1-vxvO-tpdybufvkeX4DuF4jCgHjtVTJE/od6/public/values?alt=json"; //Dette er et link til vores spreadsheet med al information, vi har brug for at vise på sitet.
let filter = "alle"; //Her har vi lavet en constant ved navn filter, som har valgt "alle" fra html-dokumentet.
const container = document.querySelector("#data-container"); //Konstant som gør, at vi ikke hver gang vi skal have fat i #data-container, behøver at skrive en lang sætning, men kan nøjes med at skrive "container".
const fiskTemplate = document.querySelector("template"); //Samme princip som "container" konstanten oppe over.

document.addEventListener("DOMContentLoaded", start);

function start() {
    loadData();
    klikBar(); //Disse to funktioner aktiveres, hvis de skal være tilgængelige.
    document.querySelector("#menuknap").addEventListener("click", toggleMenu); //Når vi klikker på noget i vores id menuknap, skal vi gå videre til funktionen "toggleMenu", som er vores burgermenu.

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

// Viser fiskene i et popup vindue
function visDetalje(fisk) {
    detalje.classList.remove("skjul");//Her fjerner vi klassen "skjul" fra detalje-id i html
    detalje.querySelector(".luk").addEventListener("click", () => detalje.classList.add("skjul")); //Hvis man klikker på den knap, som har classen "luk", tilføjes classen "skjul" igen - altså, at pop-up vinduet skjules.
    console.log("FISK", fisk.gsx$id.$t); // For at tjekke, om det virker, har vi console-log'et efter fiskens id.
    detalje.querySelector("h2").textContent = fisk.gsx$navn.$t; //I html har vi et tomt h2-tag, som nu udfyldes automatisk fra json med navn.
    detalje.querySelector("p").textContent = `Fotograf: ${fisk.gsx$fotograf.$t}`; //Vi har et tomt p-tag i html, som nu udfyldes automatisk med fotografens navn, som indhentes fra json.
    detalje.querySelector("img").src = `foto/fiskebilleder/${fisk.gsx$billede.$t}.jpg`; //Igen, har vi et tomt img-tag i html, som udfyldes automatisk fra billedemappen foto og fiskebilleder alt efter, hvad navnet fortæller fra json.
    detalje.querySelector(".videre").addEventListener("click", () => {
        location.href = "nytvindu.html?id=" + fisk.gsx$id.$t; //Når man klikker på knappen, som har classen "videre", kommer vi videre til en ny html-side, som hedder "nytvindu" (på norsk).
    });
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
