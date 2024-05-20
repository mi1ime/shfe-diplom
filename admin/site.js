fetch('https://shfe-diplom.neto-server.ru/alldata')
    .then(response => response.json())
    .then(data => data.result)
    .then(result => result.halls)
    .then(halls => {
        halls.forEach((hall) => {
            renderHalls(hall);

            let hallsLi = document.querySelectorAll('.li-hall');
            hallsLi.forEach((hallLi, index) => {
                let trashcan = hallLi.querySelector('.hall-trashcan');
                trashcan.onclick = function () {
                    console.log(trashcan.id + '  ' + trashcan.name);
                    deleteHall(trashcan.id)
                }
            })

        })

    })


function renderHalls(hall) {
    hallList.innerHTML += `<li id="${hall.id}" class="li-hall">
        ${hall.hall_name}
        <button id="${hall.id}" name="${hall.hall_name}" class="trashcan hall-trashcan"></button>
        </li>`;

    hallSelectors.forEach((hallSelector) => {
        hallSelector.innerHTML += `<li id="${hall.id}" class="selector">${hall.hall_name}</li>`
    });

    seansesTimeline.innerHTML += `<div id="${hall.id}" class="timeline__wrapper">
            <h3 class="seances-timeline-hall">${hall.hall_name}</h3>
            <div id="target" class="seances-timeline">
            </div>
        </div>`;
}

let hallList = document.querySelector('.ul-hall');
let hallSelectors = document.querySelectorAll('.selectors');
let seansesTimeline = document.querySelector('.seances-timeline__wrapper');
let seansesTimelines = document.querySelectorAll('.timeline__wrapper');
let hallsLi = document.querySelectorAll('.li-hall');

function deleteHall(trashcan_id) {

    hallsLi = document.querySelectorAll('.li-hall');
    hallsLi.forEach((hall) => {
        if (trashcan_id === hall.id) {
            hall.remove();
        }
    });

    hallSelectors.forEach((hallSelector) => {
        let hallSelectorEls = hallSelector.querySelectorAll('.selector');
        hallSelectorEls.forEach((el) => {
            if (trashcan_id === el.id) {
                el.remove();
            }
        })
    });

    seansesTimelines = document.querySelectorAll('.timeline__wrapper');
    seansesTimelines.forEach((timeline) => {
        if (trashcan_id === timeline.id) {
            timeline.remove();
        }
    });

    fetch(`https://shfe-diplom.neto-server.ru/hall/${trashcan_id}`, {
        method: 'DELETE',
    })
}

function Cinema() {
    this.halls = [];
    this.addHall = function (Hall) {
        this.halls.push(Hall);
    };
    this.deleteHall = function (Hall) {
        let idDelHall = this.halls.indexOf(Hall);
        this.halls.splice(idDelHall, 1);
    };
}
function Hall(id, hall_name) {
    this.id = id;
    this.hall_name = hall_name;
}
// function Hall(id, hall_name, hall_rows, hall_places, hall_config, hall_price_standart, hall_price_vip, hall_open) {
//     this.id = id;// ID кинозала (записи в БД)
//     this.hall_name = hall_name; // Название кинозала
//     this.hall_rows = 0; // Кол-во рядов с зрительными местами в кинозале 
//     this.hall_places = 0; // Кол-во зрительных мест в одном ряду
//     this.hall_config = [], // Конфигурация посадочных мест в кинозале (об этом чуть позже)
//     this.hall_price_standart = 0; // Цена обычного билета
//     this.hall_price_vip = 0; // Цена ВИП билета
//     this.hall_open = 0; // Открыт ли кинозал для продажи билетов  0 - закрыт; 1 - открыт (можно купить билеты на сенасы идущиее в этом кинозале)
// }  



let seatsEl = document.getElementById('seats');

function renderSeats(seats) {
    const fields = [];
    for (let [i, row] of seats.entries()) {
        for (let [j, value] of row.entries()) {
            fields.push(`
            <div class="field" 
                data-row="${i}" 
                data-col="${j}"
                style="grid-row:${i + 1};grid-column:${j + 1};"
            >
            ${value || ''}
            </div>
        `);
        }
    }
    seatsEl.innerHTML = fields.join('');
}

let seats = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
];

let hight = seats.length;
let width = seats[0].length;

function start() {
    seats = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
    ];

    renderSeats(seats);
};

start();


let popupXAddMovie = document.querySelector('.popup-x__add-movie');
let cancelPopupAddMovie = document.querySelector('.cancel-popup__add-movie');
let hidePopupAddMovie = [popupXAddMovie, cancelPopupAddMovie]
let btnAddMovie = document.querySelector('.btn-add-movie');
let popupAddMovie = document.querySelector('.popup__add-movie');
btnAddMovie.onclick = function (event) {
    popupAddMovie.classList.remove('visually-hidden');
};
hidePopupAddMovie.forEach((elem) => {
    elem.onclick = function (event) {
        popupAddMovie.classList.add('visually-hidden');
    };
});

let popupXAddHall = document.querySelector('.popup-x__add-hall');
let cancelPopupAddHall = document.querySelector('.cancel-popup__add-hall');
let hidePopupAddHall = [popupXAddHall, cancelPopupAddHall]
let popupAddHall = document.querySelector('.popup__add-hall');
let btnCreateHall = document.querySelector('.create-hall');
btnCreateHall.onclick = function (event) {
    popupAddHall.classList.remove('visually-hidden');
};
hidePopupAddHall.forEach((elem) => {
    elem.onclick = function (event) {
        popupAddHall.classList.add('visually-hidden');
    };
});



// const films = [];
// function Film(id, film_name, film_duration, film_origin, film_poster) {
//     this.id = 0; // ID фильма (записи в БД)
//     this.film_name = film_name; // Название фильма
//     this.film_duration = 0; // Длительность фильма в минутах
//     this.film_origin = film_origin; // Страна
//     this.film_poster = film_poster; // URL адрес к постеру (картинке) фильма
// }

// const seances = [];
// function Seance(id, seance_filmid, seance_hallid, seance_time) {
//     this.id = 0; // ID сеанса (записи в БД)
//     this.seance_filmid = 0; // ID фильма который показыывают на сеансе
//     this.seance_hallid = 0; // ID зала в которомо проходит сеанс
//     this.seance_time = seance_time; // Время начала сеанса в строковом формате
// }

// const tickets = [];
// function Ticket(id, ticket_date, ticket_time, ticket_filmname, ticket_hallname, row, place, coast) {
//     this.id = 0 // Номер билета
//     this.ticket_date = ticket_date, // Дата
//     this.ticket_time = ticket_time, // Время
//     this.ticket_filmname = ticket_filmname, // Название фильма
//     this.ticket_hallname = ticket_hallname, // Зал
//     this.row = 0; // Ряд
//     this.place = 0; // Место
//     this.coast = 0; // Стоимость  билета
// }


let btnAddHall = document.querySelector('.add-hall');
btnAddHall.onclick = function () {
    hallNameValue = document.querySelector('#hall-name').value;

    const params = new FormData()
    params.set('hallName', hallNameValue)
    fetch('https://shfe-diplom.neto-server.ru/hall', {
        method: 'POST',
        body: params
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                hallList.innerHTML += `<li class="li-hall">
                        ${hallNameValue}
                        <button class="trashcan"></button>
                    </li>`;

                hallSelectors.forEach((hallSelector) => {
                    hallSelector.innerHTML += `<li class="selector">${hallNameValue}</li>`
                });

                seansesTimeline.innerHTML += `<div>
                        <h3 class="seances-timeline-hall">${hallNameValue}</h3>
                        <div id="target" class="seances-timeline">
                        </div>
                    </div>`;
            } else {
                console.log(data);
            }
        });


}


popupXAddSeance = document.querySelector('.popup-x__add-seance');
cancelPopupAddSeance = document.querySelector('.cancel-popup__add-seance');
hidePopupAddSeance = [popupXAddSeance, cancelPopupAddSeance]
btnAddSeance = document.querySelector('.add-movie__add-seance');
popupAddSeance = document.querySelector('.popup__add-seance');
hidePopupAddSeance.forEach((elem) => {
    elem.onclick = function (event) {
        popupAddSeance.classList.add('visually-hidden');
    };
});

sections = document.querySelectorAll('.conf-step');
sections[0].classList.add('first-section');
sections[sections.length - 1].classList.add('last-section');
sections.forEach((section) => {
    if (!section.classList.contains('section') && !section.classList.contains('first-section') && !section.classList.contains('last-section')) {
        section.classList.add('section');
    }
});


popupAddSeance = document.querySelector('.popup__add-seance');


filmList = document.querySelectorAll('.movie-item');
let movieItemCount = 0;
const colors = ['#CAFF85', '#85FF89', '#85FFD3', '#85E2FF', '#8599FF'];
filmList.forEach((movieItem) => {
    movieItem.style.backgroundColor = colors[movieItemCount % 5];
    movieItemCount++;
});



// drag and drop

let movieIt;

const sources = document.querySelectorAll(".movie-item");
sources.forEach((source) => {
    source.addEventListener("dragstart", dragstartHandler);

    let img = source.querySelector("img");

    function dragstartHandler(ev) {
        ev.dataTransfer.setDragImage(img, 38, 52);
    }

});

const targets = document.querySelectorAll("#target");
targets.forEach((target) => {
    target.addEventListener("drop", dropHandler);

    target.addEventListener("dragover", dragoverHandler);
    function dragoverHandler(ev) {
        ev.preventDefault();
    }

    function dropHandler(ev) {
        ev.preventDefault();
        let popup = document.querySelector('.popup__add-seance');
        popup.classList.remove('visually-hidden');
    }

});
