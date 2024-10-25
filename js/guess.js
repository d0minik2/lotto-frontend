const lotteries = {
    "Lotto": {
        name: "Lotto",
        guess_table: [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]]]
    },
    "EuroJackpot": {
        name: "EuroJackpot",
        guess_table: [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]], [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]]
    },
    "CUSTOM": {
        name: "CUSTOM",
        guess_table: []
    }

}
let guess_fields = []
let checked_numbers = []

// TODO wywalaj z opcji wybrane juz liczby dla kazdej sekcji

function load_guess(lottery_name) {
    const guess_table = lotteries[lottery_name].guess_table
    guess_div = $(".guess")
    guess_div.empty()
    checked_numbers = []
    guess_fields = []

    guess_table.forEach(section => {
        const section_div = $("<section>").addClass("guess-section")
        let section_fields = []

        section.forEach(field => {
            // const input_field = $(`<input type="number" min="${field[0]}" max="${field[field.length - 1]}">`).addClass("guess-input")
            const select_field = $(`<select tabindex="5">`).addClass("guess-input")

            field.forEach(number => {
                select_field.append($(`<option value="${number}">${number}</option>`))
            })

            section_div.append(select_field)
            section_fields.push(select_field)
        })

        checked_numbers.push([])
        guess_div.append(section_div)
        guess_fields.push(section_fields)

    })
    random_guess_change()
}


function get_guess() {
    if (!$("#random-guess").is(":checked")) {
        let guess = []
        let correct = true

        guess_fields.forEach(section => {
            let section_guess = []
            section.forEach(field => {
                let n = parseInt(field.find(":selected").val())
                if (!section_guess.includes(n)) {
                    section_guess.push(n)
                    guess.push(n)
                } else {
                    correct = false
                    return false
                }

            })
        })
        if (correct) {
            return guess
        }
        alert("Liczby nie mogą się powtarzać w tej samej sekcji.")
        return false
    }
    return true

}

function disable_guess() {
    guess_fields.forEach(section => {
        section.forEach(field => {
            field.prop('disabled', true)
        })
    })
}

function enable_guess() {
    guess_fields.forEach(section => {
        section.forEach(field => {
            field.prop('disabled', false)
        })
    })
}

function set_guess(guess) {
    for (let sect_i = 0; sect_i < guess_fields.length; sect_i++) {
        for (let field_i = 0; field_i < guess_fields[sect_i].length; field_i++) {
            guess_fields[sect_i][field_i].val(`${guess[sect_i][field_i]}`).change()
        }
    }
}

function random_guess_change() {
    let checked = $("#random-guess").is(":checked")

    if (checked) {
        set_simulation_guess()
        disable_guess()
    } else {
        enable_guess()
    }
}


$(document).ready(function () {
    load_guess($("#lottery-type").val())
    random_guess_change()

    $("#lottery-type").on("change", function () {
        if ($(this).val() == "CUSTOM") {
            show_custom_settings()
        } else {
            VAL_CHANGE = false
            hide_custom_settings()
            load_guess($(this).val())
        }

        random_guess_change()

    })

    $("#random-guess").on("change", function () {
        random_guess_change()
    })

})
