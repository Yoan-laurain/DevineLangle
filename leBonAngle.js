var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d'); 
var X = canvas.width / 2;
var Y = canvas.height / 2 ;


var R = 120;
var angleToGuess = GenerateRandom();;
var choosenAngle;
var totalScore = 0;
var hasGuessed;
var nbAngles = 0;

function init() 
{
    hasGuessed = false;

    // clean the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (canvas.getContext)
    {
        // hide différence element
        document.getElementById("DifferenceContainer").style.visibility = "hidden";


    
        ctx.beginPath();
        
        /**
         * Params : x, y, radius, startAngle, endAngle, anticlockwise
         */
        ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';

        ctx.stroke();

        // draw a cross at the center
        ctx.beginPath();
        ctx.moveTo(X - 10, Y);
        ctx.lineTo(X + 10, Y);
        ctx.moveTo(X, Y - 10);
        ctx.lineTo(X, Y + 10);
        ctx.stroke();
    }
}

function GenerateRandom()
{
    var random = Math.floor(Math.random() * 360);
    document.getElementById("AngleToGuess").innerHTML = random + " °";
    return random;
}

function Reset()
{
    if(!hasGuessed)
    {
        init();
    }
}

function NewGame()
{
    angleToGuess = GenerateRandom();
    hasGuessed = false;
    Reset();
}


function FillPartOfTheCircle(event)
{
    if (hasGuessed) return;

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();


    // fill the circle from startAngle to endAngle in light blue and draw a border
    // start angle is 0° and end angle is calculated with the mouse position

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var angle = Math.atan2(y - Y, x - X) * 180 / Math.PI;

    if (angle < 0)
    {
        angle = 360 + angle;
    }

    choosenAngle = angle;

    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.arc(X, Y, R, 0, angle * Math.PI / 180, true);

    ctx.fillStyle = '#ff99cc';

    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();


}

function Guessing()
{
    if (hasGuessed) return;
    hasGuessed = true;

    // draw a line from the center of the circle to the angle to guess
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(X + R * Math.cos((360 - angleToGuess) * Math.PI / 180), Y + R * Math.sin((360 - angleToGuess) * Math.PI / 180));

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();


    // fill element difference with the difference between the choosen angle and the angle to guess

    document.getElementById("Difference").innerHTML = Math.abs(360 - choosenAngle - angleToGuess);

    totalScore += Math.round( Math.abs(360 - choosenAngle - angleToGuess) ) ;

    // hide différence element
    document.getElementById("DifferenceContainer").style.visibility = "visible";

    // Update score
    document.getElementById("score").innerHTML = totalScore;

    // Update nbAngles
    nbAngles++;
    document.getElementById("nbAngles").innerHTML = nbAngles;
}



