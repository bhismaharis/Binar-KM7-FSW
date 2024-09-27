const carContent = document.getElementById("car-content");
const search = document.getElementById("search");
const searchForm = document.getElementById("form");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const driver = document.getElementById("tipe-driver").value;
  const date = document.getElementById("tanggal").value;
  const time = document.getElementById("waktu-jemput").value;
  const passangers = document.getElementById("jumlah-penumpang").value;
  await searchCarsContent(passangers, date);
});

const getCarsData = async () => {
  const response = await fetch("../data/cars.json");
  const body = await response.json();

  const filteredData = body.filter((car) => {
    const isAvailable = date >= car.availableAt;
    return parseInt(passangers) <= car.capacity || isAvailable;
  });

  filteredData.sort((a, b) => a.capacity - b.capacity);
  return filteredData;
};

async function searchCarsContent() {
  const cars = await getCarsData(passangers, date);

  let cardCarsContentHTML = "";
  filteredCars.map((car) => {
    // variable that will be show in student-content id
    const studentContent = `
            <div class="col">
                <div class="card h-100 p-4">
                    <img src="${car.image}" class="card-img-top w-100 img-fluid" alt="${car.manufacture} ${car.model}">
                    <div class="card-body">
                        <h6 class="card-title">${car.manufacture} ${car.model} / ${car.type}</h6>
                        <h5 class="card-title">${car.rentPerDay} / hari</h5>
                        <p class="card-text">${car.description}</p>
                        <ul>
                        <li class="capasity">${car.capacity} orang</li>
                        <li class="system-mobil">${car.transmission}</li>
                        <li class="tahun">Tahun ${car.year}</li>
                        </ul>
                    </div>
                    <div class="d-flex justify-content-center row py-2 px-4">
                        <button class="btn btn-success"><a href="">Pilih Mobil</a></button>
                    </div>
                </div>
            </div>
        `;
    studentContentHTML += studentContent;
  });
  studentContent.innerHTML = studentContentHTML;
}
