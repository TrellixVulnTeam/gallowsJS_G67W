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
$('.resultText')[2].innerText = word

function clear() {
  setTimeout(() => {
    input.value = ''
  }, 900);
}

function winning() {
  setTimeout(() => {
    if (remainingLength === 0) { 
      $('.resultText')[0].innerText = 'Вы победили!';
      pastLetters = []
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
        ctx.fillStyle = 'red'
        moveTo(250,70)
        ctx.arc(251,90,20,Math.PI * 1.5,Math.PI * 3.5,false)
        ctx.fill()
        $('.resultText')[0].innerText = `Вы проиграли`
        pastLetters = []
      }
    $('.resultText')[0].innerText = `Ошибка! Осталось ${motion} попыток`

  }
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

        pastLetters.push(input.value)
      $('.resultText')[0].innerText = 'проверяем..'
      setTimeout(() => {
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














