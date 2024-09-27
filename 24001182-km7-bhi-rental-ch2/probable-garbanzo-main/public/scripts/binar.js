function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Binar {
  // Fungsi untuk mengenerate waktu ketersediaan mobil secara acak
  static populateCars = (cars) => {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1; // Acak apakah waktu positif atau negatif
      const currentTime = new Date(); // Deklarasikan currentTime dengan benar
      const mutator = getRandomInt(1000000, 100000000); // Acak tambahan atau pengurangan waktu

      // Atur waktu 'availableAt' secara acak berdasarkan mutator
      const availableAt = new Date(
        currentTime.getTime() + (isPositive ? mutator : -mutator)
      );

      return {
        ...car,
        availableAt, // Tambahkan waktu ketersediaan acak ke mobil
      };
    });
  };

  static async listCars(filterer) {
    let cars;
    let cachedCarsString = localStorage.getItem("CARS");

    if (!!cachedCarsString) {
      const cachedCars = JSON.parse(cachedCarsString);
      cars = this.populateCars(cachedCars);
    } else {
      const response = await fetch(
        "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
      );
      const body = await response.json();
      cars = this.populateCars(body);

      localStorage.setItem("CARS", JSON.stringify(cars));
    }

    if (filterer instanceof Function) return cars.filter(filterer);

    return cars;
  }
}
