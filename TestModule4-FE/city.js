function ShowAllCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city",
        success: function (cities) {
            let cityList = "";
            for (let i = 0; i < cities.length; i++) {
                cityList += `
                <tr>
                <td href="#showInfo" class="btn btn-success my-button" data-toggle="modal"  onclick="showInformation(${cities[i].id})">${cities[i].name}</td>
                <td>${cities[i].country}</td>
                <td>${cities[i].area}</td>
                <td>${cities[i].population}</td>
                <td>${cities[i].gdp}</td>
                <td>${cities[i].description}</td>
                <td><a href="#editCity" onclick="formEdit(${cities[i].id})" class="edit" data-toggle="modal">
                <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a  onclick="deleteCity(${cities[i].id})" class="delete" data-toggle="modal">
                <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>
                </tr>`;
            }
            document.getElementById("city-list").innerHTML = cityList;
        },
        error: function () {
            alert("Không thể hiển thị danh sách thành phố!");
        }
    });
}
ShowAllCity();

//create
function save() {
    event.preventDefault();
    let name = $("#name").val();
    let country = $("#country").val();
    let area = $("#area").val();
    let population = $("#population").val();
    let gdp = $("#gdp").val();
    let description = $("#description").val();
    let newCity = {
        name: name,
        country: country,
        area: area,
        population: population,
        gdp: gdp,
        description: description,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/city/create",
        data: JSON.stringify(newCity),
        success: ShowAllCity,
        error: function () {
            alert("Không thể thêm thành phố mới!");
        }
    })
}

// delete by id
function deleteCity(id) {
    event.preventDefault();
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/city/" + id,
        dataType: "json",
        success: function () {
            deleteConfirmation()
        },
        error: function () {
            alert("Không xóa được")
        }
    });
}

function deleteConfirmation() {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        window.ShowAllCity();
    }
}

// update by id
function formEdit(id) {
    let url = "http://localhost:8080/city/" + id;
    $.get(url, function (data) {
        $('#id').val(data.id);
        $("#name1").val(data.name);
        $("#country1").val(data.country);
        $("#area1").val(data.area);
        $("#population1").val(data.population);
        $("#gdp1").val(data.gdp);
        $("#description1").val(data.description);
    });
}

function updateCity() {
    event.preventDefault();
    let id = $("#id").val();
    let name = $("#name1").val();
    let country = $("#country1").val();
    let area = $("#area1").val();
    let population = $("#population1").val();
    let gdp = $("#gdp1").val();
    let description = $("#description1").val();
    let newCity = {
        name: name,
        country: country,
        area: area,
        population: population,
        gdp: gdp,
        description: description,
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/city/" + id,
        dataType: "json",
        data: JSON.stringify(newCity),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            // Hide edit form
            $('#editCity').modal('hide');
            ShowAllCity()
        },
        error: function () {
            alert('Lỗi khi sửa.');
        }
    });
}

function showInformation(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/" + id,
        success: function (city) {
            let cityInfo = "";
            cityInfo += `                
                <td style='text-align: left'>Name:</td><td>${city.name}</td></tr>
                <td style='text-align: left'>Country:</td><td>${city.country}</td></tr>
                <td style='text-align: left'>Area:</td><td>${city.area}</td></tr>
                <td style='text-align: left'>Population:</td><td>${city.population}</td></tr>
                <td style='text-align: left'>GDP:</td><td>${city.gdp}</td></tr>
                <td style='text-align: left'>Description:</td><td>${city.description}</td></tr>`
            document.getElementById("CityInfo").innerHTML = cityInfo;
        },
        error: function () {
            alert("Không thể hiển thị thông tin thành phố!");
        }
    })
}