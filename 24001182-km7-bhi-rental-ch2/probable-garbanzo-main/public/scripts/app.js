class App {
  constructor() {
    this.loadButton = document.getElementById("load-button");
    this.carContainerElement = document.getElementById("car-content");
    this.driver = document.getElementById("driver");
    this.date = document.getElementById("date");
    this.time = document.getElementById("time");
    this.passenger = document.getElementById("passenger");

    // Toggle disable button saat input berubah
    [this.driver, this.date, this.time, this.passenger].forEach((input) => {
      input.addEventListener("change", this.toggleButton);
    });
  }

  async init() {
    await this.load(); // Memuat data mobil dari Binar.listCars()
    this.loadButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.run(); // Jalankan pencarian ketika tombol ditekan
    });
  }

  // Fungsi untuk mengaktifkan/menonaktifkan tombol load berdasarkan input
  toggleButton = () => {
    const isDriverSelected = this.driver.value !== "default";
    const isDateFilled = this.date.value !== "";
    const isTimeFilled = this.time.value !== "";
    const isPassengerFilled = this.passenger.value !== "";

    this.loadButton.disabled = !(
      isDriverSelected &&
      isDateFilled &&
      isTimeFilled &&
      isPassengerFilled
    );
  };

  run = () => {
    this.clear(); // Bersihkan hasil sebelumnya
    const driver = this.driver.value;
    const date = this.date.value;
    const time = this.time.value;
    const passenger = this.passenger.value;
    const selectedDateTime = new Date(`${date}T${time}`); // Gabung tanggal dan waktu pengguna
    const currentDateTime = new Date(); // Waktu sekarang

    // Tampilkan loading
    this.showLoadingMessage();

    setTimeout(() => {
      const filteredCars = Car.list.filter((car) => {
        // Filter berdasarkan driver availability
        if (driver !== "default") {
          if (driver === "true" && !car.available) return false;
          if (driver === "false" && car.available) return false;
        }

        // Filter berdasarkan waktu dan tanggal
        const carAvailableAt = new Date(car.availableAt);
        if (selectedDateTime < currentDateTime) return false; // Tidak bisa memesan waktu yang sudah lewat
        if (carAvailableAt > selectedDateTime) return false; // Mobil tidak tersedia setelah waktu yang dipilih

        // Filter berdasarkan kapasitas penumpang
        if (passenger && car.capacity < parseInt(passenger)) return false;

        return true;
      });

      this.displayResults(filteredCars);
    }, 1000);
  };

  // Memuat data mobil dari Binar.listCars() dan menginisialisasi Car
  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  // Bersihkan container hasil pencarian
  clear = () => {
    this.carContainerElement.innerHTML = "";
  };

  // Tampilkan pesan loading
  showLoadingMessage() {
    const loadingMessage = document.createElement("div");
    loadingMessage.innerHTML =
      '<h3 class="text-center my-5">Mencari kendaraan...</h3>';
    this.carContainerElement.appendChild(loadingMessage);
  }

  // Tampilkan hasil filter atau pesan jika tidak ada hasil
  displayResults(filteredCars) {
    this.clear();

    if (filteredCars.length > 0) {
      filteredCars.forEach((car) => {
        this.carContainerElement.innerHTML += car.render();
      });
    } else {
      const noCarsMessage = document.createElement("div");
      noCarsMessage.innerHTML =
        '<h3 class="text-center my-5">Kendaraan tidak tersedia</h3>';
      this.carContainerElement.appendChild(noCarsMessage);
    }
  }
}
