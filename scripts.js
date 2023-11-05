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

var user = {
    hits: 0,
    performance: [],
    attempts: 0,
    beforeDate: getDate(),
    date: getDate(),
    today: shuffle(images),
};
document.getElementById("date").innerHTML = `${user.date}`;

console.log(shuffle(images));

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
            performance: [],
            attempts: 0,
            beforeDate: getDate(),
            date: getDate(),
            today: shuffle(images),
        };
        updateData();
    }
    else {
        document.getElementById("attempt").innerHTML = `Tentativas: ${user.attempts}`;
    }
}
else {
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(user));
}
document.querySelectorAll(".item .flipper .back").forEach((item, number) => {
    //console.log(`url(${user.today[number]}.webp)`);
    let value = user.today[number]

    item.style.backgroundImage = "url(" + value + ".webp)";
    console.log(item.style.backgroundImage);
    item.id = value;
});

let par = [];
document.querySelectorAll(".flipper").forEach((item, number) => {

    item.addEventListener("click", () => {
        item.classList.toggle("select");

        if (item.classList.contains("select") == true) {
            par.push(number);
        }
        else if (item.classList.contains("select") == false) {
            par.pop(number);
        }
        if (par.length == 2) {
            let i = 0;
            user.attempts = user.attempts + 1;
            updateData();
            document.querySelectorAll(".flipper").forEach((item, number) => {

                if (par.includes(number)) {
                    i++;
                    item.classList.add("flip");

                    setTimeout(() => {
                        item.classList.remove("flip");

                    }, 500);
                    item.classList.remove("select");
                }
                if (i == 2) {
                    par = [];
                }
            })
        }
        console.log(par.length);
    })
})

