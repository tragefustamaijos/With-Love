var canvas = document.createElement("canvas")
document.body.insertBefore(canvas, document.body.firstChild)
var c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight
const width = innerWidth
const height = innerHeight

const gravitatie = 2;
const frecare = 0.9
const JUMP_VELOCITY = 45
const speed_on_user_input = 2

function Lavinia()
{
    this.image = new Image()
    this.image.src = "Zana Original.jpg";
    this.x = 70
    this.y = 300
    this.width = 150
    this.height = 200

    this.viteza_x = 0;
    this.viteza_y = 1
    this.draw = function()
    {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
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
            if(this.y < innerHeight - this.height + 20)
                this.viteza_y += gravitatie
            else
            this.viteza_y = 0
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
    
    c.fillStyle = "Crimson"
    c.font = "italic 30px TimesNewRoman"
    c.fillText("Te vad, Alexia <3",width/2 - c.measureText("Te vad, Alexia <3").width/2, 30)

    lav.update()
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
},)

window.addEventListener("keyup", function(event)
{
    if(event.key == "a")
        lav.viteza_x += speed_on_user_input
    if(event.key == "d")
        lav.viteza_y -= speed_on_user_input
})


/// This part of code is for the phone users. Hope this shit works or i'm gonna pull my eyeballs out

const treshold = 50
var dist_x, dist_y
var start_x, start_y

const maxMovement_tap = 10,
maxDuration_tap = 200; // in miliseconds
var tap_startTime;

window.addEventListener("touchstart", function(event)
{
    const touch = event.touches[0];
    start_x = touch.clientX;
    start_y = touch.clientY;

    tap_startTime = Date.now();
})

window.addEventListener("touchend", function(event){
    dist_x = event.changedTouches[0].clientX - start_x;
    dist_y = event.changedTouches[0].clientY - start_y;
    const duration_tap = tap_startTime - Date.now();

    /// first, check if it's just a tap
    if(Math.abs(dist_x) < maxMovement_tap && Math.abs(dist_y) < maxMovement_tap
    && duration_tap < maxDuration_tap)
    {
        lav.jump();
    } 
    else
    {
        if(Math.abs(dist_x) > Math.abs(dist_y))
        {
            /// slide on the Ox axis
            if(dist_x > treshold)
            {
                // slide right
                lav.viteza_x += speed_on_user_input;
            }
            else
            if(dist_x < -treshold)
            {
                // slide left
                lav.viteza_x -= speed_on_user_input;
            }
        }
        else
        {
            /// slide on the Oy axis
            if(dist_y < -treshold)
                lav.jump();
        }
    } 
})
