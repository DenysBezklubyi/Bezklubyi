// масив

let yuorName = [ 'Олександр', 'Іван', 'Андрій', 'Віктор', 'Федя', 'Едуард', 'Петро', 'Василь',]
console.log(yuorName);



 for (let i = 0; i < yuorName.length; i += 1) 
 
   console.log(yuorName[i]);


 for ( let subname of yuorName) {
  subname += ' Петров ';
   console.log(subname);
 }



//Вивести всі элементи масиву за індексом масиву, наприклад:
 
console.log(yuorName[0]);
console.log(yuorName[1]);
console.log(yuorName[2]);
console.log(yuorName[3]);
console.log(yuorName[4]);
console.log(yuorName[5]);
console.log(yuorName[6]);
console.log(yuorName[7]);

//Додати в рядок (в циклі), де выводятся імена з масиву ще 
//порядковий номер (індекс) кожного елементу масиву.



yuorName.forEach(function(item, index,) {
  console.log(item, index);
});