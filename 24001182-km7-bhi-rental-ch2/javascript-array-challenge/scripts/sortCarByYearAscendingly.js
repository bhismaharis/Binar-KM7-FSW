function sortCarByYearAscendingly(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  console.log(cars);

  // Clone array untuk menghindari side-effect
  // Apa itu side effect?
  const result = [...cars];
  let car = cars.slice();

  // Tulis code-mu disini
  
  // menggunakan for loop
  let n = car.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (car[j].year > car[j + 1].year) {
        let temp = car[j];
        car[j] = car[j + 1];
        car[j + 1] = temp;
      }
    }
  }

  // menggunakan sort
  // car.sort((a, b) => a.year - b.year);

  // Rubah code ini dengan array hasil sorting secara descending
  return car;
}