/* =====================================================
   BUS DATA
===================================================== */

const buses = [

    {
        name: "GreenLine Express",
        type: "AC Sleeper",
        from: "Bengaluru",
        to: "Chennai",
        departure: "06:30 AM",
        arrival: "01:00 PM",
        duration: "6h 30m",
        price: 799,
        location: "Electronic City",
        eta: "2h 15m",
        progress: 38
    },

    {
        name: "SouthStar Travels",
        type: "AC Seater",
        from: "Bengaluru",
        to: "Chennai",
        departure: "09:15 AM",
        arrival: "04:00 PM",
        duration: "6h 45m",
        price: 649,
        location: "Hosur",
        eta: "3h 40m",
        progress: 27
    },

    {
        name: "Royal Roadways",
        type: "Volvo Multi-Axle",
        from: "Bengaluru",
        to: "Hyderabad",
        departure: "08:00 PM",
        arrival: "07:00 AM",
        duration: "11h",
        price: 1199,
        location: "Anantapur",
        eta: "5h 20m",
        progress: 51
    },

    {
        name: "CityConnect",
        type: "AC Sleeper",
        from: "Chennai",
        to: "Tirupati",
        departure: "07:30 AM",
        arrival: "12:00 PM",
        duration: "4h 30m",
        price: 499,
        location: "Puttur",
        eta: "1h 05m",
        progress: 68
    },

    {
        name: "MetroRide",
        type: "AC Seater",
        from: "Tirupati",
        to: "Bengaluru",
        departure: "02:30 PM",
        arrival: "08:00 PM",
        duration: "5h 30m",
        price: 599,
        location: "Chittoor",
        eta: "2h 20m",
        progress: 46
    },

    {
        name: "ExpressWay",
        type: "AC Sleeper",
        from: "Vijayawada",
        to: "Hyderabad",
        departure: "09:00 PM",
        arrival: "05:30 AM",
        duration: "8h 30m",
        price: 899,
        location: "Suryapet",
        eta: "3h 05m",
        progress: 62
    },

    {
        name: "Night Rider",
        type: "Luxury Sleeper",
        from: "Pune",
        to: "Bengaluru",
        departure: "08:45 PM",
        arrival: "08:00 AM",
        duration: "11h 15m",
        price: 1299,
        location: "Hubballi",
        eta: "4h 10m",
        progress: 57
    }

];


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let selectedBus = null;

let selectedSeat = null;

let selectedFare = 0;

let trackingBus = buses[0];

let trackingTimer = null;


/* =====================================================
   SET MINIMUM DATE
===================================================== */

const today = new Date();

const year = today.getFullYear();

const month =
    String(today.getMonth() + 1).padStart(2, "0");

const day =
    String(today.getDate()).padStart(2, "0");

document.getElementById("travelDate").min =
    `${year}-${month}-${day}`;


/* =====================================================
   INITIAL TRACKING
===================================================== */

updateTrackingUI();


/* =====================================================
   SWAP CITIES
===================================================== */

function swapCities() {

    const from =
        document.getElementById("fromCity");

    const to =
        document.getElementById("toCity");


    const temporary =
        from.value;


    from.value =
        to.value;


    to.value =
        temporary;
}


/* =====================================================
   SEARCH BUSES
===================================================== */

function searchBuses() {

    const from =
        document.getElementById("fromCity").value;


    const to =
        document.getElementById("toCity").value;


    const date =
        document.getElementById("travelDate").value;


    if (!from || !to) {

        alert(
            "Please select both departure and destination cities."
        );

        return;
    }


    if (from === to) {

        alert(
            "Departure and destination cannot be the same."
        );

        return;
    }


    if (!date) {

        alert(
            "Please select your travel date."
        );

        return;
    }


    const availableBuses =
        buses.filter(bus => {

            return (
                bus.from === from &&
                bus.to === to
            );

        });


    displayBuses(
        availableBuses,
        from,
        to
    );


    document
        .querySelector(".results-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =====================================================
   DISPLAY BUS RESULTS
===================================================== */

function displayBuses(
    availableBuses,
    from,
    to
) {

    const busList =
        document.getElementById("busList");


    const routeTitle =
        document.getElementById("routeTitle");


    const resultCount =
        document.getElementById("resultCount");


    routeTitle.innerText =
        `${from} → ${to}`;


    resultCount.innerText =
        `${availableBuses.length} buses available`;


    if (availableBuses.length === 0) {

        busList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🚌
                </div>

                <h3>
                    No buses found
                </h3>

                <p>
                    Try another route to find available buses.
                </p>

            </div>

        `;

        return;
    }


    busList.innerHTML = "";


    availableBuses.forEach(bus => {

        const card =
            document.createElement("div");


        card.className =
            "bus-card";


        card.innerHTML = `

            <div>

                <div class="bus-company">
                    ${bus.name}
                </div>

                <div class="bus-type">
                    ${bus.type}
                </div>

            </div>


            <div>

                <div class="bus-time">
                    ${bus.departure}
                </div>

                <div class="route-mini">
                    ${bus.from} ─── ${bus.to}
                </div>

                <div class="duration">
                    ${bus.duration}
                </div>

            </div>


            <div>

                <div class="bus-time">
                    ${bus.arrival}
                </div>

                <div class="duration">
                    Arrival
                </div>

            </div>


            <div>

                <div class="price">
                    ₹${bus.price}

                    <small>
                        per seat
                    </small>
                </div>

                <button
                    class="select-seat-btn"
                    onclick="openSeatModal(${buses.indexOf(bus)})"
                >
                    Select Seat
                </button>

            </div>

        `;


        busList.appendChild(card);

    });
}


/* =====================================================
   OPEN SEAT MODAL
===================================================== */

function openSeatModal(busIndex) {

    selectedBus =
        buses[busIndex];


    selectedFare =
        selectedBus.price;


    selectedSeat =
        null;


    document.getElementById(
        "selectedBusName"
    ).innerText =
        selectedBus.name;


    document.getElementById(
        "selectedRoute"
    ).innerText =
        `${selectedBus.from} → ${selectedBus.to}`;


    document.getElementById(
        "summaryBus"
    ).innerText =
        selectedBus.name;


    document.getElementById(
        "summaryRoute"
    ).innerText =
        `${selectedBus.from} → ${selectedBus.to}`;


    document.getElementById(
        "summarySeat"
    ).innerText =
        "Not selected";


    document.getElementById(
        "summaryFare"
    ).innerText =
        "₹0";


    document.getElementById(
        "seatModal"
    ).style.display =
        "flex";


    generateSeats();
}


/* =====================================================
   GENERATE SEATS
===================================================== */

function generateSeats() {

    const seatMap =
        document.getElementById("seatMap");


    seatMap.innerHTML = "";


    const bookedSeats = [
        3,
        7,
        10,
        14,
        18,
        21
    ];


    for (
        let i = 1;
        i <= 24;
        i++
    ) {

        const seat =
            document.createElement("button");


        seat.className =
            "seat";


        seat.innerText =
            i;


        if (
            bookedSeats.includes(i)
        ) {

            seat.classList.add(
                "booked"
            );

            seat.disabled =
                true;

        }


        seat.addEventListener(
            "click",
            function () {

                selectSeat(
                    seat,
                    i
                );

            }
        );


        seatMap.appendChild(
            seat
        );
    }
}


/* =====================================================
   SELECT SEAT
===================================================== */

function selectSeat(
    seatElement,
    seatNumber
) {

    document
        .querySelectorAll(".seat.selected")
        .forEach(seat => {

            seat.classList.remove(
                "selected"
            );

        });


    seatElement.classList.add(
        "selected"
    );


    selectedSeat =
        seatNumber;


    document.getElementById(
        "summarySeat"
    ).innerText =
        `Seat ${seatNumber}`;


    document.getElementById(
        "summaryFare"
    ).innerText =
        `₹${selectedFare}`;
}


/* =====================================================
   CONFIRM BOOKING
===================================================== */

function confirmBooking() {

    const name =
        document.getElementById(
            "passengerName"
        ).value.trim();


    const phone =
        document.getElementById(
            "passengerPhone"
        ).value.trim();


    if (!selectedSeat) {

        alert(
            "Please select a seat."
        );

        return;
    }


    if (!name) {

        alert(
            "Please enter passenger name."
        );

        return;
    }


    if (
        !/^[0-9]{10}$/.test(phone)
    ) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }


    document.getElementById(
        "ticketName"
    ).innerText =
        name;


    document.getElementById(
        "ticketBus"
    ).innerText =
        selectedBus.name;


    document.getElementById(
        "ticketRoute"
    ).innerText =
        `${selectedBus.from} → ${selectedBus.to}`;


    document.getElementById(
        "ticketSeat"
    ).innerText =
        `Seat ${selectedSeat}`;


    document.getElementById(
        "ticketAmount"
    ).innerText =
        `₹${selectedFare}`;


    document.getElementById(
        "seatModal"
    ).style.display =
        "none";


    document.getElementById(
        "successModal"
    ).style.display =
        "flex";


    /* Automatically track booked bus */

    trackingBus =
        selectedBus;


    updateTrackingUI();
}


/* =====================================================
   CLOSE BOOKING MODAL
===================================================== */

function closeModal() {

    document.getElementById(
        "seatModal"
    ).style.display =
        "none";
}


/* =====================================================
   CLOSE SUCCESS
===================================================== */

function closeSuccess() {

    document.getElementById(
        "successModal"
    ).style.display =
        "none";


    document.getElementById(
        "passengerName"
    ).value = "";


    document.getElementById(
        "passengerPhone"
    ).value = "";


    selectedSeat =
        null;


    document
        .getElementById("tracking")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =====================================================
   TRACKING UI
===================================================== */

function updateTrackingUI() {

    if (!trackingBus) {
        return;
    }


    document.getElementById(
        "trackingBusName"
    ).innerText =
        trackingBus.name;


    document.getElementById(
        "trackingRoute"
    ).innerText =
        `${trackingBus.from} → ${trackingBus.to}`;


    document.getElementById(
        "currentLocation"
    ).innerText =
        trackingBus.location;


    document.getElementById(
        "locationDetail"
    ).innerText =
        trackingBus.location;


    document.getElementById(
        "mapCurrentLabel"
    ).innerText =
        trackingBus.location;


    document.getElementById(
        "stopCurrent"
    ).innerText =
        trackingBus.location;


    document.getElementById(
        "eta"
    ).innerText =
        trackingBus.eta;


    document.getElementById(
        "progressPercent"
    ).innerText =
        trackingBus.progress;


    document.getElementById(
        "progressBar"
    ).style.width =
        `${trackingBus.progress}%`;


    document.getElementById(
        "routeProgress"
    ).style.width =
        `${trackingBus.progress}%`;


    document.getElementById(
        "busMarker"
    ).style.left =
        `${trackingBus.progress}%`;
}


/* =====================================================
   CHANGE TRACKED BUS
===================================================== */

function changeTrackedBus() {

    const names =
        buses.map(
            bus =>
                `${bus.name} — ${bus.from} to ${bus.to}`
        );


    const choice =
        prompt(
            "Enter bus number:\n\n" +
            names
                .map(
                    (name, index) =>
                        `${index + 1}. ${name}`
                )
                .join("\n")
        );


    const index =
        Number(choice) - 1;


    if (
        Number.isInteger(index) &&
        index >= 0 &&
        index < buses.length
    ) {

        trackingBus =
            buses[index];


        updateTrackingUI();

    }
}


/* =====================================================
   REFRESH TRACKING
===================================================== */

function refreshTracking() {

    const button =
        document.querySelector(
            ".refresh-btn"
        );


    button.style.transform =
        "rotate(360deg)";


    setTimeout(() => {

        button.style.transform =
            "rotate(0deg)";

    }, 500);


    updateTrackingUI();
}


/* =====================================================
   START SIMULATED LIVE TRACKING
===================================================== */

function startTracking() {

    if (trackingTimer) {

        clearInterval(
            trackingTimer
        );

        trackingTimer =
            null;

        document.querySelector(
            ".full-track-btn"
        ).innerText =
            "▶ Start Live Tracking";

        return;
    }


    document.querySelector(
        ".full-track-btn"
    ).innerText =
        "■ Stop Live Tracking";


    trackingTimer =
        setInterval(
            simulateBusMovement,
            3000
        );
}


/* =====================================================
   SIMULATE BUS MOVEMENT
===================================================== */

function simulateBusMovement() {

    if (
        trackingBus.progress >= 95
    ) {

        clearInterval(
            trackingTimer
        );

        trackingTimer =
            null;


        document.querySelector(
            ".full-track-btn"
        ).innerText =
            "✓ Journey Almost Complete";


        return;
    }


    trackingBus.progress +=
        Math.floor(
            Math.random() * 4
        ) + 1;


    const locations = [

        "Electronic City",

        "Hosur Road",

        "Attibele",

        "Krishnagiri",

        "Vaniyambadi",

        "Vellore",

        "Sriperumbudur",

        "Chennai"

    ];


    const position =
        Math.floor(
            trackingBus.progress /
            14
        );


    trackingBus.location =
        locations[
            Math.min(
                position,
                locations.length - 1
            )
        ];


    const etaMinutes =
        Math.max(
            20,
            Math.floor(
                (100 -
                    trackingBus.progress) *
                4
            )
        );


    const hours =
        Math.floor(
            etaMinutes / 60
        );


    const minutes =
        etaMinutes % 60;


    trackingBus.eta =
        hours > 0
            ? `${hours}h ${minutes}m`
            : `${minutes}m`;


    updateTrackingUI();
}


/* =====================================================
   MODAL OUTSIDE CLICK
===================================================== */

document
    .getElementById("seatModal")
    .addEventListener(
        "click",
        function (event) {

            if (
                event.target === this
            ) {

                closeModal();

            }

        }
    );


document
    .getElementById("successModal")
    .addEventListener(
        "click",
        function (event) {

            if (
                event.target === this
            ) {

                closeSuccess();

            }

        }
    );