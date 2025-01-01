var canvas = document.createElement("canvas")
document.body.insertBefore(canvas, document.body.firstChild)
var c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight
const width = innerWidth
const height = innerHeight

const gravitatie = 2;
const frecare = 0.9
const JUMP_VELOCITY = 80
const speed_on_user_input = 4

function Lavinia()
{
    this.image = new Image()
    this.image.src = "Zana Original.jpg";
    this.x = 70
    this.y = 300
    this.width = 384
    this.height = 512

    this.viteza_x = 0;
    this.viteza_y = 0
    this.draw = function()
    {
        c.drawImage(this.image, this.x, this.y)
    }

    this.update = function()
    {
        if(this.x + this.width > width && this.viteza_x > 0
        || this.x < 0 && this.viteza_x < 0)
            this.viteza_x = -this.viteza_x
        this.x += this.viteza_x
        
        if(this.y + this.height > innerHeight && this.viteza_y > 0)
            this.viteza_y = -this.viteza_y * frecare
        else
            this.viteza_y += gravitatie
        this.y += this.viteza_y
        this.draw();
    }

    this.jump = function()
    {
        this.viteza_y = JUMP_VELOCITY
    }
}

var lav = new Lavinia()


function animate()
{
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    lav.update()
    c.fillText("Zana Panseluta <3", 200, 30)
}
animate()

window.addEventListener("keydown", function(event)
{
    if(event.key == "a")
        lav.viteza_x -= speed_on_user_input
    if(event.key == "d")
        lav.viteza_x += speed_on_user_input
    if(event.key == "w" || event.keyCode == 32)
        lav.jump()
})

window.addEventListener("keyup", function(event)
{
    if(event.key == "a")
        lav.viteza_x += speed_on_user_input
    if(event.key == "d")
        lav.viteza_y -= speed_on_user_input
})

