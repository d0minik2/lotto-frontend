function show_result() {
    // $(".result").css("display", "block")
}

function disable_inputs() {
    disable_guess()
    $(".random-guess-checkbox").prop('disabled', true)
    $(".rounds-per-week-input").prop('disabled', true)
    $(".lottery-type").prop('disabled', true)

}

function balance_update() {
    balance_p = $(".total-balance")
    balance = parseFloat(balance_p.text())

    if (balance >= 0) {
        balance_p.removeClass("negative")
        balance_p.addClass("positive")
    } else {
        balance_p.removeClass("positive")
        balance_p.addClass("negative")

    }
}

function on_start() {
    $("main").addClass("started")

    disable_inputs()
    show_result()


}

function on_update() {
    balance_update()
}

$(document).ready(function () {
    $(".earth-anim").html(EARTH_ANIM_SVG)
})






