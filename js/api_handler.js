function time_start() {
    const date = new Date();
    time_started = date.getTime()
}

function calculate_avg_time(years_passed) {
    const date = new Date();
    now = date.getTime()

    time = now - time_started

    // in milliseconds 
    avg_time_per_year = time / years_passed
    console.log(avg_time_per_year, time, time_started, now)
    return Math.round(avg_time_per_year * 100) / 100
}

function update_time_html(avg) {
    $(".time > i").text(avg)
}


$(window).bind('beforeunload', function () {
    const postURL = apiURL + UID
    fetch(postURL, { method: "DELETE" })
    //  removing data from db when unloading
});


function update_html(data) {
    $(".games-played").text(data.games_played)
    $(".years-passed").text(data.years_passed)
    $(".money-earned").text(data.money_earned)
    $(".money-spent").text(data.money_spent)
    $(".total-balance").text(data.total_balance)
    $(".top-price-wins").text(data.top_price_wins)

    if (data.top_price_wins > 0) {
        WON = true
    }

    update_time_html(calculate_avg_time(data.years_passed))
}


async function init_simulation() {
    // POST on api
    const postURL = apiURL + UID

    // remove previous session if exists
    await fetch(postURL, { method: "DELETE" })

    const simulationType = $("#lottery-type").val()

    const body = {
        "lottery_name": simulationType
    }

    const guess = get_guess()
    if (!(guess === undefined)) {
        body["guess"] = guess
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    }

    await fetch(postURL, options)
        .then(response => {

            return response.json();
        })
        .then(data => {
            true_guess = data["guess"]
            if (guess === undefined) {
                set_guess(true_guess)
            }

            disable_guess()
            // console.log(true_guess)
        })
        .catch(error => {
            console.error('Error:', error)
        })
}


async function call_simulation() {
    // GET on api
    const postURL = apiURL + UID

    // TODO add speed param

    const options = {
        method: "GET",
    }

    await fetch(postURL, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            update_html(data)
        })
        .catch(error => {
            console.error('Error:', error)
        })
}


async function start_simulation() {
    time_start()

    // INIT
    if (!paused) {
        // TODO liczenie czasu
        await init_simulation()
        WON = false
    } else {
        paused = false
    }

    while (!WON && !paused) {
        await call_simulation()
    }
}

function pause_simulation() {
    paused = true
}



const apiURL = "http://dominik.chiptric.com/lottery/"
let WON = false
let paused = false
let time_started

function generate_uid() {
    return self.crypto.randomUUID()
}
const UID = generate_uid()
console.log(UID)
