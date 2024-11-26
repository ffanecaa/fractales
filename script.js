
window.addEventListener('load', function(){
  const canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')

  cw = canvas.width = (innerWidth-150)
  ch = canvas.height = (innerHeight-150)

  ctx.fillStyle ='green'
 
//   ctx.lineWidth = Math.floor(Math.random()*20+10)
  ctx.lineCap = "round"
  ctx.shadowColor = "rgba(0,0,10,0.7)"
  ctx.shadowOffsetX = 10
  ctx.shadowOffsetY = 5
  ctx.shadowBlur = 10

  const maxLevel = 4
  const branches = 2
     
 

  //let size = 200 lo automatizamos
  let size = cw < ch ? cw*0.232 : ch*0.232

  //let maxLevel = 4 lo paso a const mas eficiente
   // let branches = 4  idem

  let sides = 5
  let scala =0.5
  let spread = 0.5//rotacion valor en radianes
  let color = 'hsl('+ Math.random()*40+',20%,90%)'
  let lineWidth =Math.floor(Math.random()*20 +10)
  
/*controlador */
let btnC = document.getElementById("btnC")
let btnReset = document.getElementById('btcReset')
/* input*/

const slider = document.getElementById("spread")
const label =document.querySelector("[for ='spread']")
const sSides = document.getElementById("sides")
const labelsides =document.querySelector("[for ='sides']")

slider.addEventListener('change', function(e){
    spread = e.target.value;
    updateSlider()
    drawFractal()
})
sSides.addEventListener('change',function(e){
    sides = e.target.value
    updateSlider()
   
    drawFractal()
})
    
function drawBranch ( level){
    if(level > maxLevel) return;
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(size,0)
    ctx.stroke()
     for ( let i =0; i<branches; i++){
      ctx.save()
      ctx.translate(size-(size/branches)* i,0)
      ctx.scale(scala,scala)

      ctx.save()
      ctx.rotate(spread)
      drawBranch(level+1)
      ctx.restore()

    ctx.save()
    ctx.rotate(-spread)

    drawBranch(level+1)
    ctx.restore()
    ctx.restore()
}}
 
 


 function drawFractal(){
    ctx.clearRect(0,0,cw,ch)
    ctx.save()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.translate(cw/2,ch/2)
    for(let i= 0; i< sides;i++){
        ctx.rotate((Math.PI * 2)/sides)
        drawBranch(0)
    }
    ctx.restore()
    btnC.style.backgroundColor = color
 }
 drawFractal()


function controlFractal(){
     sides = Math.floor(Math.random() * 7 +4)
     scala = Math.random() * 0.2 + 0.4
     spread = Math.random() * 1.8 +0.1
     color = 'hsl('+ Math.random()*50+',80%,50%)'
     lineWidth = Math.floor(Math.random()*20 +10)
    

}
btnC.addEventListener('click', function(){
    controlFractal()
    updateSlider()
   
    drawFractal()

})

function resetFractal(){
    sides = 5
     scala = 0.5
     spread =0.7
     color = 'hsl(90,100%,50%)'
     lineWidth = 20
}

btnReset.addEventListener('click', function(){
    resetFractal()
    updateSlider()
    drawFractal()
})


function updateSlider(){
    slider.value = spread
    label.innerText ='Spread: ' +Number(spread).toFixed(1)

    sSides.value = sides
    labelsides.innerText ='Sides: ' + sides
}


})