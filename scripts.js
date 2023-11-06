let images = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day <= 9 && day >= 1) {
        day = `0${day}`;
    }

    return `${day}/${month}/${year}`;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
function sleep(ms) {
    const start = new Date().getTime();
    while (new Date().getTime() - start < ms);
}
var user = {
    hits: 0,
    hit: [],
    performance: [],
    progress: [],
    attempts: 0,
    start: false,
    beforeDate: getDate(),
    date: getDate(),
    today: shuffle(images),
};
document.getElementById("date").innerHTML = `${user.date}`;

function updateData() {
    localStorage.setItem("user", JSON.stringify(user));
    document.getElementById("attempt").innerHTML = `Tentativas: ${user.attempts}`;
    document.getElementById("date").innerHTML = `${user.date}`;

}

if (localStorage.getItem("user") != null) {
    user = JSON.parse(localStorage.getItem("user"));
    if ((user.beforeDate != null || user.beforeDate == undefined) && user.beforeDate != getDate()) {
        localStorage.clear();
        var user = {
            hits: 0,
            hit: [],
            performance: [],
            progress: [],
            attempts: 0,
            start: false,
            beforeDate: getDate(),
            date: getDate(),
            today: shuffle(images),
        };
        updateData();
    }
    else {

        if (user.start) {
            document.getElementById("start").style.color = "gray";
            document.getElementById("start").style.cursor = "default";

            if (user.hits == 8) {
                setTimeout(() => {
                    document.getElementById("share-container").style.display = "flex";
                }, 2000);
                document.getElementById("share").innerHTML = `${user.progress.join("")}`;
            }
        }

        document.getElementById("attempt").innerHTML = `Tentativas: ${user.attempts}`;
    }
}
else {
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(user));
}
document.querySelectorAll(".item .flipper .back").forEach((item, number) => {
    let value = user.today[number];
    item.style.backgroundImage = "url(" + value + ".webp)";
    item.id = number;

    if (user.hit.includes(parseInt(item.id))) {
        item.parentNode.classList.add("hits");
    }
});

let par = [];

document.querySelectorAll(".flipper").forEach((item, number) => {
    let pass = false;

    if (user.hits != 0) {
        user.performance.forEach((itm, number) => {
            if (user.today[user.performance[number][0]] == user.today[user.performance[number][1]]) {
                document.getElementById(itm[0]).style.transform = "none";
                document.getElementById(itm[1]).style.transform = "none";
            }
        })
    }


    item.addEventListener("click", () => {

        if (!item.classList.contains("hits")) {

            item.classList.toggle("select");

            if (item.classList.contains("select") == true) {
                par.push(number);
            }
            else if (item.classList.contains("select") == false) {
                par.pop(number);
            }
            if (par.length == 2) {

                user.performance.push([par[0], par[1]]);
                user.attempts = user.attempts + 1;
                updateData();
                document.querySelectorAll(".flipper").forEach((item, number) => {
                    if (par.includes(number)) {
                        document.getElementById(par[0]).parentNode.classList.add('flip');
                        document.getElementById(par[1]).parentNode.classList.add('flip');

                        if (user.today[par[0]] == user.today[par[1]]) {

                            if (!pass) {
                                user.hits++;
                                user.progress.push('🟢');
                                    (async function (par) {
                                        await new Promise(resolve => setTimeout(resolve, 500));

                                        document.getElementById(par[0]).classList.remove("flip");
                                        document.getElementById(par[1]).classList.remove("flip");

                                        document.getElementById(par[0]).parentNode.classList.add("hits");
                                        document.getElementById(par[1]).parentNode.classList.add("hits");
                                    })(par);

                               
                                user.hit.push(par[0], par[1]);
                                updateData();

                                pass = true;
                            }
                        }
                        else {
                            user.progress.push('❌');
                                (async function () {
                                    await new Promise(resolve => setTimeout(resolve, 500));

                                    item.classList.remove("flip");
                                })();
                        }
                        item.classList.remove("select");
                    }
                })
                par = [];
            }
        }

        if (user.hits == 8) {
            setTimeout(() => {
                document.getElementById("share-container").style.display = "flex";
            }, 2000);
            document.getElementById("share").innerHTML = `${user.progress.join("")}`;
        }
    })
})

document.getElementById("start").addEventListener("click", () => {
    if (!user.start) {
        (async function () {
            // Adiciona a classe "flip" a todos os elementos
            document.querySelectorAll(".item .flipper").forEach((item) => {
                item.classList.add("flip");
            });

            await new Promise(resolve => setTimeout(resolve, 1000));

            document.querySelectorAll(".item .flipper").forEach((item) => {
                item.classList.remove("flip");
            });
        })();
        user.start = true;
        updateData();
        document.querySelectorAll(".item .flipper .back").forEach((item, number) => {
            item.parentNode.classList.remove("hits");

        });

        document.getElementById("start").style.color = "gray";
        document.getElementById("start").style.cursor = "default";
    }
})

document.getElementById('button').addEventListener('click', clipboardCopy);
async function clipboardCopy() {
    let text = "Joguei Conexão Paranormal(Memórias) e consegui em " + user.attempts + " tentativas:\n" + user.progress.join("") + "\nPara jogar acesse:\nconexaoopmemorias.vercel.app";
    await navigator.clipboard.writeText(text);

    document.getElementById("copy").style.display = "unset";

    setTimeout(() => {
        document.getElementById("copy").style.display = "none";
    }, 1000);
}

let back = document.getElementById("back");
let modal = document.getElementById("modal-screen");

back.addEventListener('click', () => {
    modal.style.display = "none";
})

document.getElementById("about").addEventListener('click', () => {
    modal.style.display = "flex";
})

