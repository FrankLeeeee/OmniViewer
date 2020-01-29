/* define format function */
String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}

/* implementation of basename function */
function basename(str) {
    var base = new String(str).substring(str.lastIndexOf('/') + 1);
    if (base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
    return base;
}

/* random ID generator */
function generate_id() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};


/* page initialization */
$(document).ready(function() {
    load_current_search()
    init_token()
    init_server(current_search, sessionStorage.getItem("token"), load_page)
});


/* initialization */
function init_token() {
    if (localStorage.getItem("token") === null) {
        var tk = generate_id()
        sessionStorage.setItem("token", tk);
    }
}

function init_server(path, tk, callback_fn = null) {
    var data = { current_search: path, token: tk }
    var csrftoken = $("[name=csrfmiddlewaretoken]").val()

    $.ajax({
        url: '/api/init/',
        data: JSON.stringify(data),
        type: 'POST',
        headers: {
            "X-CSRFToken": csrftoken
        },
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
            current_page = 1
            total_page = response['data']['total_page']

            if (callback_fn != null) {
                callback_fn()
            }
        },
        error: function(xhr, status, error) {
            notify(`AJAX Error ${xhr.status}:`, `${error} - ${current_search}`, "danger")
        }
    });
}

function load_page() {
    load_grid_items(current_page)
    render_pagination()
}

/* ================ File grid ========================== */
/* load the file grid */
function render_file_grid(path_list) {
    var length = path_list.length

    for (i = 0; i < length; i++) {
        var extension = path_list[i]['path'].split('.').pop().toLowerCase()

        switch (path_list[i]['type']) {
            case "dir":
                var img_src = "../static/images/folder.png"
                break
            case "other":
                var img_src = "../static/images/file.png"
                break
            case "image":
                if (path_list[i]['image']['status'] == 200) {
                    var img_src = String.format("data:img/{0};base64, {1}", extension, path_list[i]['image']['encodedImage'])
                } else {
                    var img_src = "../static/images/picture.png"
                    notify(`AJAX Error ${path_list[i]['image']['status']}`, `: ${path_list[i]['image']['message']} - ${path_list[i]['path']}`, "danger")
                }
                break
        }

        $('#image-row').append(`
            <div class='col-lg-2 col-md-3 col-sm-4 mb-2 text-center'>
                <div class="p-2 border text-center">
                    <div>
                        <img src='${img_src}' class='object-grid-image image-fluid object-container' alt='${path_list[i].path}' id='cell-${i}'>
                    </div>
                    <div class="object-name">
                        <span>${path_list[i].basename}</span>
                    </div>
                </div>
            </div>
            `)

        current_obj = document.getElementById(String.format(`cell-${i}`))

        if (path_list[i].type == "image") {
            current_obj.addEventListener("click", function(evt) {
                view_large_image(this)
            })
        } else if (path_list[i].type == "dir") {
            current_obj.addEventListener('dblclick', function(e) {
                enter_folder(this)
            });
        } else if (path_list[i].type == "other" && (extension == "list" || extension == "tsv")) {
            current_obj.addEventListener('dblclick', function(e) {
                enter_folder(this)
            });
        }
    }
}


/* Load path list */
function load_grid_items(page_number) {
    $('#image-row').empty()
    $('#grid-spinner').show()
    var data = { page_number: page_number, current_search: current_search, filtered: filtered, token: sessionStorage.getItem("token") }

    $.ajax({
        url: '/api/getPage/',
        data: JSON.stringify(data),
        type: 'POST',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
            $('#grid-spinner').hide()
            render_file_grid(response['data'])
        },
        error: function(xhr, status, error) {
            notify(`AJAX Error ${xhr.status}:`, `${error} - ${current_search}`, "danger")
        }
    });
}

/* load single image */
function load_original_image(img_path, callback) {
    var data = { path: img_path }
    $("#large-image-modal").css("display", "block")

    return $.ajax({
        url: '/api/getOriginalImage/',
        data: JSON.stringify(data),
        type: 'POST',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
            callback(img_path, response)
        },
        error: function(xhr, status, error) {
            notify(`AJAX Error ${xhr.status}:`, `${error} - ${img_path}`, "danger")
        }
    });
}

function load_original_image_callback(img_path, img_response) {
    var extension = img_path.split('.').pop().toLowerCase()
    $("#large-image-view").attr("src", String.format("data:img/{0};base64, {1}", extension, img_response['data']['encodedImage']))
    $("#large-image-name").text(`${img_path}`)
    $("#large-image-size").text(`${img_response['data']['size'][0]} x ${img_response['data']['size'][1]}`)
}

/* onclick function for image */
function view_large_image(element) {
    // document.getElementById("large-image-view").src = element.src
    var img_path = element.alt
    document.getElementById("large-image-view").alt = img_path
    load_original_image(img_path, load_original_image_callback)
}

/* ================ Pagination ========================== */
/* render pagination */
function render_pagination() {
    $('#page-counter').empty()
    $('#page-jump').empty()

    $('#page-counter').append(`<li class="page-item">
                                    <a class="page-link text-primary btn" id="prevBtn" onclick="page_back_to_start()">...</a>
                                </li>`)

    if (current_page != 1) {
        for (var i = Math.min(2, current_page - 1); i >= 1; i--) {
            $('#page-counter').append(`
                                <li class="page-item text-primary"><a class="page-link btn" onclick="page_on_change(this)" value="${current_page - i}">${current_page - i}</a></li>
                                `)
        }
    }

    $('#page-counter').append(`
                            <li class="page-item active">
                                <span class="page-link">
                            ${current_page}
                            <span class="sr-only">(current)</span>
                                </span>
                            </li>
                            `)

    if (current_page != total_page) {
        for (var i = 1; i <= Math.min(2, total_page - current_page); i++) {
            $('#page-counter').append(`
                                <li class="page-item text-primary"><a class="page-link btn" onclick="page_on_change(this)" value="${current_page + i}">${current_page + i}</a></li>
                                `)
        }
    }

    $('#page-counter').append(`<li class="page-item">
                                    <a class="page-link text-primary btn" id="prevBtn" onclick="page_go_to_end()">...</a>
                                </li>`)

    $('#page-jump').append(`<form class="form-inline text-center" onsubmit="return go_to_page()">
                                <div class="input-group w-100">
                                <input type="number" class="form-control" aria-label="go-to-page" aria-describedby="basic-addon2" id="go-to-page-input" placeholder=Enter a page number (total: ${total_page})>
                                <button class="btn btn-outline-primary ml-2" type="submit">Go</button>
                                </div>
                            </form>`)
}

/* onclick function for pagination */
function page_back_to_start() {
    if (current_page != 1) {
        current_page = 1
        load_grid_items(current_page)
        render_pagination()
    }
}

/* onclick function for pagination */
function page_go_to_end() {
    if (current_page != total_page) {
        current_page = total_page
        load_grid_items(current_page)
        render_pagination()
    }
}

/* onclick function for pagination */
function page_on_change(element) {
    current_page = parseInt(element.innerHTML)
    load_grid_items(current_page)
    render_pagination()
}

/* onclick function for pagination */
function go_to_page() {
    var page = document.getElementById("go-to-page-input").value

    if (page >= 1 && page <= total_page) {
        current_page = parseInt(page)
        load_grid_items(current_page)
        render_pagination()
    }

    return false
}



/* ================ Directory Control ========================== */
/* simulate search and go to a directory */
function go_to_dir(path) {
    $('#searchContent').val(path);
    $("#searchBtn").click();
}

/* onclick function for folder */
function enter_folder(element) {
    // document.getElementById("large-image-view").src = element.src
    var folder_path = element.alt
    go_to_dir(folder_path)
}

/* load current search link */
function load_current_search() {
    for (var i = 0; i < current_search_comps.length; i++) {
        if (current_search_comps[i] != "") {
            $("#currentSearch").append(`
                <span>/</span>
                <a type="btn" href="#" id="path_comp_${i}" onclick="change_dir(this)">${current_search_comps[i]}</a>
            `)
        }
    }
}

/* go to directory based on the link of the current search */
function change_dir(element) {
    var seq = parseInt((element.id).split("_")[2])
    var path_to_go = current_search_comps.slice(0, seq + 1).join("/")
    console.log(path_to_go)
    go_to_dir(path_to_go)
}


/* ================ Image statistics ========================== */
/* load image stats */
function load_stats() {
    data = { token: sessionStorage.getItem("token"), filtered: filtered }
    $.ajax({
        url: '/api/getStats/',
        data: JSON.stringify(data),
        type: 'POST',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
            var stats = response["data"]
            document.getElementById("image-count").textContent = stats['count']
            plot_pie_chart(stats['formats'], "format-pie-chart", "Image Format Distribution")
            plot_pie_chart(stats['labels'], "label-pie-chart", "Image Label Distribution")
        },
        error: function(xhr, status, error) {
            notify(`AJAX Error ${xhr.status}:`, `${error} - ${current_search}`, "danger")
        }
    });
}

/* util function to generate random color */
function generate_dynamic_color() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};

/* util function to plot pie chart */
function plot_pie_chart(raw_list, canvas_id, chart_title) {
    var counts = {};

    for (var i = 0; i < raw_list.length; i++) {
        var data = raw_list[i];
        counts[data] = counts[data] ? counts[data] + 1 : 1;
    }

    var dataset = []
    var labels = []
    var colors = []

    $.each(counts, function(key, value) {
        labels.push(key)
        dataset.push(value)
        colors.push(generate_dynamic_color())
    });

    var ctx = document.getElementById(canvas_id).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: dataset,
                backgroundColor: colors
            }],
        },
        options: {
            title: {
                display: true,
                text: chart_title
            }
        }
    });
}


/* ================ Bootstrap notify ========================== */
/* Send alert to the page */
function notify(title, message, type) {
    $.notify({
        // options
        title: `<strong>${title}</strong>`,
        message: message,

    }, {
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        delay: 2000,
        z_index: 99999,
        placement: {
            from: "top",
            align: "center"
        }
    });
}


/* ================ Internal search ========================== */
/* Send alert to the page */
function internal_search() {
    var value = document.getElementById("internal-search-value").value

    $.ajax({
        url: '/api/filterByKeyword/',
        data: JSON.stringify({ current_search: current_search, keyword: value, token: sessionStorage.getItem("token") }),
        type: 'POST',
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
            if (value == "") {
                filtered = false
            } else {
                filtered = true
            }

            current_page = 1
            total_page = response['data']['total_page']
            load_grid_items(current_page)
            render_pagination()
        },
        error: function(xhr, status, error) {
            notify(`AJAX Error ${xhr.status}:`, `${error} - ${current_search}`, "danger")
        }
    });

    return false
}


/* ================ Large Image Modal ========================== */
/* zoom in the image */
function zoom_out_large_image_modal() {
    var img_width = $("#large-image-view").width()
    $("#large-image-view").width(Math.ceil(img_width / 1.5))
}

/* zoom in the image */
function zoom_in_large_image_modal() {
    var img_width = $("#large-image-view").width()
    $("#large-image-view").width(Math.ceil(img_width * 1.5))
}

function download_file_onclick() {
    var img_path = document.getElementById("large-image-view").alt

    $.ajax({
        url: '/api/getDownloadId/',
        data: JSON.stringify({ file_path: img_path }),
        type: 'POST',
        success: function(response) {
            var download_id = response['data'];
            location.href = "/api/download/" + download_id
        },
        error: function(xhr, status, error) {
            notify(`AJAX Error ${xhr.status}:`, `${error} - ${img_path}`, "danger")
        }
    });
}