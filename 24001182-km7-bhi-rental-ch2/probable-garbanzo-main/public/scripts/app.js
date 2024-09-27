class App {
  constructor() {
    this.loadButton = document.getElementById("load-button");
    this.carContainerElement = document.getElementById("car-content");
    this.driver = document.getElementById("driver");
    this.date = document.getElementById("date");
    this.time = document.getElementById("time");
    this.passenger = document.getElementById("passenger");    
    //toggle disable button
    this.driver.addEventListener("change", this.toggleButton);
    this.date.addEventListener("change", this.toggleButton);
    this.time.addEventListener("change", this.toggleButton);
  }

  async init() {
    await this.load();
    this.loadButton.onclick = (e) => {
      e.preventDefault();
      this.run();
    };
  }

  toggleButton = () => {
    const isDriverSelected = this.driver.value !== "";
    const isDateFilled = this.date.value !== "";
    const isTimeFilled = this.time.value !== "";

    this.loadButton.disabled = !(isDriverSelected && isDateFilled && isTimeFilled);
  };

  run = () => {
    this.clear();
    const driver = this.driver.value;
    const date = this.date.value;
    const time = this.time.value;
    const passenger = this.passenger.value;
    const currentDateTime = new Date();

    //  loading
    const loadingNode = document.createElement("div");
    loadingNode.innerHTML =
      '<h3 class="text-center my-5">Mencari kendaraan...</h3>';
    this.carContainerElement.appendChild(loadingNode);

    setTimeout(() => {
      const filteredCars = Car.list.filter((car) => {
        // Filter berdasarkan tipe driver
        if (driver !== "default") {
          if (driver === "true" && !car.available) return false;
          if (driver === "false" && car.available) return false;
        }

        // Filter berdasarkan tanggal
        if (date) {
          const selectedDateTime = new Date(date + "T" + time);
          if (selectedDateTime < currentDateTime) return false;
          if (new Date(car.availableAt) > selectedDateTime) return false;
        }

        // Filter berdasarkan jumlah penumpang
        if (passenger && car.capacity < parseInt(passenger))
          return false;

        return true;
      },2000);

      this.clear();

      if (filteredCars.length > 0) {
        filteredCars.forEach((car) => {
          this.carContainerElement.innerHTML += car.render();
        });
      } else {
        const noResultNode = document.createElement("div");
        noResultNode.innerHTML =
          '<h3 class="text-center my-5">Kendaraan tidak tersedia</h3>';
        this.carContainerElement.appendChild(noResultNode);
      }
    }, 1000);
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
