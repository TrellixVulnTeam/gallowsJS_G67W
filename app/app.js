// Игра Виселица
// __________________________________________________

let sentence = "Кант Хроника Зал Галера Балл Вес Кафель  Знак Фильтр Башня Кондитер Омар Чан Пламя  Банк Тетерев Муж Камбала Груз Кино Лаваш Калач Геолог Бальзам Бревно Жердь Борец Самовар Карабин Подлокотник Барак Мотор Шарж Сустав Амфитеатр Скворечник Подлодка Затычка Ресница Спичка Кабан Муфта Синоптик Характер Мафиози Фундамент Бумажник Библиофил Дрожжи Казино Конечность Пробор Дуст Комбинация Мешковина Процессор Крышка Сфинкс Пассатижи Фунт Кружево Агитатор Формуляр  Прокол Абзац Караван Леденец Кашпо Баркас Кардан Вращение Заливное Метрдотель Клавиатура Радиатор Сегмент Обещание Магнитофон Кордебалет Заварушка " 
let words = sentence
            .split(' ')
            .filter(word => word.length > 3)
            .map(word => word.toLowerCase())
            .map(word => {
              if (word.includes(',') || word.includes('.')) {
                // 
                return word = word.split('').splice(0,word.length - 1).join('')               
              } else {
                return word
              }
            })
let word = words[Math.floor(Math.random() * words.length)]
let answerArr = []
for (let i = 0; i < word.length; i++) {
  answerArr.push('_')
}
let answer = answerArr.join(' ')
let remainingLength = word.length
let input =  document.getElementById('inputSymbol')
let button = $('#button-addon2')
let isHit = false
let motion = 9
let pastLetters = []
let canvas = $('#canvas')[0]
let ctx = canvas.getContext('2d')
ctx.strokeStyle = 'rgb('+(150 - Math.random() * 80)+','+(150 - Math.random() * 50)+','+(150 - Math.random() * 50)+')'
ctx.lineWidth = 6

$('.answerArea')[0].innerText = answer
// $('.resultText')[2].innerText = word


function clear() {
  setTimeout(() => {
    input.value = ''
  }, 900);
}

function answerStyles(bgColor) {
  $('.answerArea')[0].style.padding = "0 10px"
  $('.answerArea')[0].style.backgroundColor = bgColor
  $('.answerArea')[0].style.color = "#FFFFFF"
}

function winning() {
  setTimeout(() => {
    if (remainingLength === 0) { 
      $('.resultText')[0].innerText = 'Вы победили!';
      pastLetters = []
      aliveMan()
      answerStyles('#63A80A')
    }
    
  }, 900); 
}

function losing() {
  if (!isHit) {
    motion--
    if(motion == 8) {
      ctx.beginPath()
      ctx.moveTo(100,370)
      ctx.lineTo(100,20)
      ctx.stroke()
    }
    if(motion == 7) {
      ctx.beginPath()
      ctx.moveTo(100,20)
      ctx.lineTo(300,20)
      ctx.stroke()
    }
    if(motion === 6) {
      ctx.beginPath()
      ctx.moveTo(250,20)
      ctx.lineTo(250,70)
      ctx.stroke()
    }
    if(motion === 5) {
      ctx.beginPath()
      ctx.arc(251,90,20,Math.PI * 1.5,Math.PI * 3.5,false)
      ctx.stroke()
    }
    if(motion === 4) {
      ctx.beginPath()
      ctx.moveTo(251,110)
      ctx.lineTo(251,200)
      ctx.stroke()
    }
    if(motion === 3) {
      ctx.beginPath()
      ctx.moveTo(251,110)
      ctx.lineTo(231,150)
      ctx.stroke()
    }
    if(motion === 2) {
      ctx.beginPath()
      ctx.moveTo(251,110)
      ctx.lineTo(270,150)
      ctx.stroke()
    }
    if(motion === 1) {
      ctx.beginPath()
      ctx.moveTo(251,200)
      ctx.lineTo(231,240)
      ctx.stroke()  
    }
    if(motion === 0) {
      ctx.beginPath()
      ctx.moveTo(251,200)
      ctx.lineTo(271,240)
      ctx.stroke()
      ctx.beginPath()
      ctx.fillStyle = '#DC3545'
      moveTo(250,70)
      ctx.arc(251,90,20,Math.PI * 1.5,Math.PI * 3.5,false)
      ctx.fill()
      $('.resultText')[0].innerText = `Вы проиграли`
      $('.answerArea')[0].innerText = word.split('').join(' ')
      pastLetters = []
      answerStyles('#DC3545')
    }
    $('.resultText')[0].innerText = `Ошибка! Осталось ${motion} попыток`
  }
}

function aliveMan() {
  ctx.fillStyle = '#d1d0d0'
  ctx.fillRect(200,65,100,200)
  ctx.beginPath()
  // ctx.cleatRect(250,70,100,200)
  ctx.strokeStyle = '#63A80A'
  ctx.moveTo(280,370)
  ctx.lineTo(300,330)
  ctx.lineTo(320,370)
  ctx.moveTo(300,330)
  ctx.lineTo(300,240)
  ctx.moveTo(300,240)
  ctx.lineTo(280,300)
  ctx.moveTo(300,245)
  ctx.lineTo(330,240)
  ctx.lineTo(340,200)
  ctx.moveTo(320,220)
  ctx.arc(300,220,20,0,Math.PI * 2, false)
  ctx.stroke()
}


function noDigits(event) {
  if ("1234567890`~!@#$%^&*()_+=-\\/., ".indexOf(event.key) != -1)
    event.preventDefault();
}
$('.resultText')[0].innerText = `Осталось ${motion} попыток`
function game() {
  if(motion > 0) {
    if(input.value.split('').length > 1 || input.value.split('').length === 0 || typeof(input.value) != 'string') {
      $('.resultText')[0].innerText = `введите 1 букву!`
    } 
    isHit = false
    if(input.value.split('').length == 1 && typeof(input.value) === 'string') {
      if (pastLetters.includes(input.value)) {
        $('.resultText')[0].innerText = 'такую букву уже вводили!'
      } else {
        $('.resultText')[0].innerText = 'проверяем..'
        setTimeout(() => {
          pastLetters.push(input.value)
          for (let i = 0; i < word.length; i++) {
            if ( word[i] === input.value.toLowerCase()) {
              $('.resultText')[0].innerText = 'есть такая буква!'
              answer = answer.split(' ')
              answer[i] = input.value.toLowerCase()
              answer = answer.join(' ')
              $('.answerArea')[0].innerText = answer
              remainingLength--
              isHit = true
            } 
          }
        }, 500); 
        setTimeout(() => {
          losing()
        }, 900);
      }
    }
  } else {
    $('.resultText')[0].innerText = 'не осталось попыток!'
  }
  
}

button.click(() => {
  game()
  clear() 
  winning()
})

$(document).ready( () => {
  $('#inputSymbol').keydown((e) => {
    if (e.keyCode === 13) {
      game()
      clear() 
      winning()
    }
  })
})




// Игра Найди клад
// __________________________________________________


let mapRezult = $('.map-rezult')[0]
let map =$('.map')
let mapWidth = Math.floor(map.width())
let mapHeight = Math.floor(map.height())

let trove = {
  x: Math.floor(Math.random() * mapWidth * 0.98) + 10,
  y: Math.floor(Math.random() * mapHeight * 0.98) + 10
}

let rezulColors = (node, bgColor, textColor)  => {
  node.style.backgroundColor = bgColor
  node.style.color = textColor
}

let rezult = (distance) => {
  if (distance < 30) { 
    rezulColors(mapRezult,'#4A653E','#fff')
    return 'Вы победили!' 
  }
  if (distance > 30 && distance <= 50) {
    rezulColors(mapRezult,'#871E1E','#fff')
    return 'Горячее!!!'
  }
  if (distance > 50 && distance <= 125) {
    rezulColors(mapRezult,'#D0A342','#fff')
    return 'Горячо!'
  }
  if (distance > 125 && distance <= 200) {
    rezulColors(mapRezult,'#DCDCAA','#000')
    return 'Тепло'
  }
  if (distance > 200 && distance <= 250) {
    rezulColors(mapRezult,'#009687','#fff')
    return 'Прохладно :('
  }
  if (distance > 250 && distance <= 350) {
    rezulColors(mapRezult,'#007ACC','#fff')
    return 'Холодно!'
  }
  if (distance > 350) {
    rezulColors(mapRezult,'#294A6E','#fff')
    return 'Дубэо!!!'
  }
}
let drawCircle = (event) => {
    $('<div class="cursor">')
      .css({
        top: event.pageY- 55,
        left: event.pageX - 15
      })
      .appendTo($('.map-img'))
      .on('animationend webkitAnimationEnd', function (event) {
        $(this).remove();
      });
}
 
let getDistance = (e, target) => {
  let distanceX = e.offsetX - target.x
  let distanceY = e.offsetY - target.y
  return Math.round(Math.sqrt(distanceX ** 2 + distanceY ** 2))
}
map.click((e) => {
  $('.map-text').fadeIn(200).fadeOut(500)
  drawCircle(e)
  let distance = getDistance(e, trove)
  let rezultText = rezult(distance)
  mapRezult.innerText = rezultText
})


// Конструкторы
// __________________________________________________

let Car = function(x,y)  {
  this.x = x;
  this.y = y
}



Car.prototype.draw = function() {
  let carHtml = `<img src="https://ih1.redbubble.net/image.738209654.7447/st,small,507x507-pad,600x600,f8f8f8.u5.jpg">`

  this.carElement = $(carHtml)

  this.carElement.css({
    position: "relative",
    left: this.x,
    top: this.y,
    width: "100px"
  })

  $(".drawCar").append(this.carElement)
}

let tesla = new Car(150,10)
tesla.draw()