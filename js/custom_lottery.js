function add_custom_option() {
    const cstm_option = $(`<option value="CUSTOM" id="custom-option-btn">`).text("CUSTOM")

    $("#lottery-type").append(cstm_option)

}

function show_custom_settings() {
    $(".custom-settings-popup").css("display", "block")
}

function hide_custom_settings() {
    $(".custom-settings-popup").css("display", "none")
}


function add_field(section) {
    const fields = section.children(".section-fields")
    const field = $("<div>").addClass("guess-field")
    fields.append(field)

    field.on("click", function () {
        field.remove()

        if (fields.children().length < 1) {
            section.remove()
        }
        update_rewards_table()
    })
    update_rewards_table()
}


function add_section(fields = 1, range_min = 1, range_max = 10) {
    const section = $("<div>").addClass("guess-section")

    const number_range = $("<div>").addClass("section-number-range")

    const section_fields = $("<div>").addClass("section-fields")

    const add_field_btn = $("<div>").addClass("add-field-btn").text("")

    section.append(number_range).append(section_fields).append(add_field_btn)
    $(".guess-sections").append(section)


    number_range.append($(`<input type="number" name="min_guess_number" class="min_range_guess" min="0" max="1000" value="${range_min}">`))
    number_range.append("-")
    number_range.append($(`<input type="number" name="max_guess_number" class="max_range_guess" min="0" max="1000" value="${range_max}">`))

    // FIELD ACTIONS
    for (let i = 0; i < fields; i++) {
        add_field(section)
    }
    add_field_btn.on("click", function () {
        add_field(section)
        update_rewards_table()
    })

    update_rewards_table()
}


function generate_table_level(level, sections, sect, sect_name) {
    let name = sect_name.split("_")
    name = name[name.length - 1]

    if (level == sections.length - 1) {
        const td_rw = $("<td>").addClass(`td_${sect_name}`).text(name)
        const td = $("<td>").addClass(`inp_${sect_name}`)
        const input = $("<input value='0'>").addClass(`reward-input-${sect_name}`)

        td.append(input)
        const tr = $("<tr>").append(td_rw).append(td)

        return tr
    }


    const tr = $("<tr>")
    const td = $("<td>").addClass(`td_${sect_name}`).text(name)
    const td_rw = $("<td>")
    const td_table = $("<table>")

    sections[level + 1].forEach(i => {
        td_table.append(generate_table_level(level + 1, sections, i, sect_name + `_${i}`))
    })


    td_rw.append(td_table)
    tr.append(td).append(td_rw)

    return tr
}


function update_rewards_table() {
    const table = $(".rewards-table")
    table.empty()

    const sections = []

    $(".guess-sections > .guess-section").each(function () {
        const nof_fields = $(this).children(".section-fields").children().length
        const section = []

        for (let i = nof_fields; i >= 0; i--) {
            section.push(i)
        }
        sections.push(section)
    })

    sections[0].forEach(i => {
        table.append(generate_table_level(0, sections, i, `${i}`))
    });

}


function get_guess_table() {
    const guess_table = []

    // for each section
    $(".guess-sections > .guess-section").each(function () {
        const section = []

        const nof_fields = $(this).children(".section-fields").children().length
        const range_min = parseInt($(this).children(".section-number-range").children(".min_range_guess").val())
        const range_max = parseInt($(this).children(".section-number-range").children(".max_range_guess").val())

        // if (range_max - range_min - 1 < nof_fields) {
        //     alert("Number of fields cannot be larger than number of guesses to choose")
        //     return
        // }


        for (let i = 0; i < nof_fields; i++) {
            const field = []
            for (let n = range_min; n < range_max + 1; n++) {
                field.push(n)
            }
            section.push(field)
        }

        guess_table.push(section)
    })

    lotteries["CUSTOM"].guess_table = guess_table
    return guess_table
}


function get_guess_price() {
    const price = parseFloat($("#input-guess-price").val())
    lotteries["CUSTOM"].guess_price = price
    return price
}


function get_price_table() {
    const price_table = {}

    $("input[class^='reward-input']").each(function () {
        let sect = $(this).attr("class").split("-")
        sect = sect[sect.length - 1].split("_")
        const value = parseFloat($(this).val())

        let c = price_table
        for (let i = 0; i < sect.length; i++) {
            c[sect[i]] ??= {}

            if (i == sect.length - 1) {
                c[sect[i]] = value
            } else {
                c = c[sect[i]]
            }
        }

    })

    lotteries["CUSTOM"].price_table = price_table
    return price_table
}



$(document).ready(function () {
    add_custom_option()
    add_section()

    let VAL_CHANGE = false

    $(".add-section-btn").on("click", function () {
        add_section()
    })

    $(".exit-btn").on("click", function () {
        get_guess_table()
        load_guess("CUSTOM")
        hide_custom_settings()
    })

    $(".lottery-type").on("click", function () {
        if (VAL_CHANGE) {
            if ($(".lottery-type").val() == "CUSTOM") {
                show_custom_settings()
            }
        }
        VAL_CHANGE = !VAL_CHANGE

    })
})



// lotteries["CUSTOM"] = guess_table