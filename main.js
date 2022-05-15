addJSONtoLocalStorage();
addEventToButton();
setTimeout(() => {
    questionShowcase();
}, 1000);

function questionShowcase() {
    $(".carousel-inner").empty();
    const tanggapan = getTanggapanFromLocalStorage();
    $.each(tanggapan, function (index, item) { 
         $(".carousel-inner").append(`
            <div class="carousel-item" data-bs-interval="5000">
                <div class="row justify-content-center caption-question">
                <div class="col-lg-8">
                    <h5>
                        ${item.pertanyaan}
                    </h5>
                </div>
                </div>
                <div class="row justify-content-center name-question">
                <div class="col-6 d-flex justify-content-center">
                    <h5>
                        ${item.nama}
                    </h5>
                </div>
                </div>
            </div>
         `);
    });

    $(".carousel-item:first").addClass("active");
}

function addJSONtoLocalStorage() {
    const isDataAvailable = localStorage.getItem("data");

    if (isDataAvailable) {
        return;
    }

    $.getJSON("/azizdental/settings.json",
        function (data) {
            console.info(data);
            localStorage.setItem("data", JSON.stringify(data));
        }
    );
}

function addEventToButton() {
    $("#kirim").click(function (e) { 
        e.preventDefault();
        addDatatoLocalStorage();
    });
}

function addDatatoLocalStorage() {
    const nama = $("#nama").val();
    const pertanyaan = $("#pertanyaan").val();

    const isValid = nama && pertanyaan;
    if (isValid) {
        const tanggapan = getTanggapanFromLocalStorage();
        tanggapan.push({
            nama: nama,
            pertanyaan: pertanyaan,
        })

        setDataToLocalStorage(tanggapan);
        questionShowcase();
        resetForm();
        alert("Tanggapan berhasil dikirim");
        return;
    }

    alert("Nama dan pertanyaan tidak boleh kosong");
}

function getTanggapanFromLocalStorage() {
    return JSON.parse(localStorage.data)[1].tanggapan;
}

function getServerFromLocalStorage() {
    return JSON.parse(localStorage.data)[0];
}

function setDataToLocalStorage(item) {
    localStorage.setItem("data", JSON.stringify([getServerFromLocalStorage(), {tanggapan: item}]));
}

function resetForm() {
    $("#nama").val("");
    $("#pertanyaan").val("");
}





