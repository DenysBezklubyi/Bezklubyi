var surname = prompt ( ' Фамилия ')
console.log(surname);

var yuorname = prompt ( ' Имя ')
console.log(yuorname);

var year = prompt ( ' Год рождения ')
console.log(year);

var age = ( 2021 - year )
console.log(age);


document.getElementById('surname').innerText =surname;
document.getElementById('yuorname').innerText = yuorname;
document.getElementById('age').innerText = age;
