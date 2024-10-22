function generate_uid() {
    ThumbmarkJS.getFingerprint().then(
        function (fp) {
            return fp
        }
    );
}

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

    const lottery_name = $("#lottery-type").val();
    const body = {
        "lottery_name": lottery_name,
        "rounds_per_week": parseInt($("#rounds-per-week").val())
    }


    const guess = get_guess()
    if (!(guess === undefined)) {
        body["guess"] = guess
    } else if (guess === false) {
        STARTED = false
        return false
    } else {
        if (lottery_name == "CUSTOM") {
            body["custom"] = true
            body["custom_guess_table"] = get_guess_table()
            body["custom_reward_table"] = get_price_table()
            body["custom_guess_price"] = get_guess_price()
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
                STARTED = true
                return response.json();
            })
            .then(data => {
                true_guess = data["guess"]
                if (guess === undefined) {
                    set_guess(true_guess)
                }
                STARTED = true
                return true
            })
            .catch(error => {
                console.error('Error:', error)
                STARTED = false
                return false
            })
    }


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
            on_update()
        })
        .catch(error => {
            console.error('Error:', error)
        })
}


async function start_simulation() {
    // INIT
    if (!paused) {
        // TODO liczenie czasu
        await init_simulation()

    } else {
        paused = false
    }

    if (STARTED) {
        WON = false
        time_start()
        on_start()

        while (!WON && !paused) {
            await call_simulation()
        }
    }



}

function pause_simulation() {
    paused = true
}



const apiURL = "http://dominik.chiptric.com/api/"
let WON = false
let STARTED = false
let paused = false
let time_started
const UID = generate_uid()

