class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="col-md-4">
            <div class="card h-100 p-4">
                <img src="${this.image}" class="card-img-top object-fit-cover img-fluid" alt="${this.manufacture} ${this.model}">
                <div class="card-body">
                    <h6 class="card-title">${this.manufacture} ${this.model} / ${this.type}</h6>
                    <h5 class="card-title">${this.rentPerDay} / hari</h5>
                    <p class="card-text">${this.description}</p>
                    <ul>
                    <li class="capasity">${this.capacity} orang</li>
                    <li class="system-mobil">${this.transmission}</li>
                    <li class="tahun">Tahun ${this.year}</li>
                    </ul>
                </div>
                <div class="d-flex justify-content-center row py-2 px-4">
                    <button class="btn btn-success"><a href="">Pilih Mobil</a></button>
                </div>
                </div>
            </div>
    `;
  }
}
