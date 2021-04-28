const leftmargin = 50;
const bottommargin = 50;
const offsetX = 30;
const offsetY = 30;
let DataSet = new Array();

function init(){
    const canvas = document.createElement('canvas');
    canvas.id = "canvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    document.body.appendChild(canvas);

    mainDraw()
}

function mainDraw(){
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.beginPath();
    ctx.moveTo(leftmargin, 0);
    ctx.lineTo(leftmargin, height - bottommargin);
    ctx.moveTo(leftmargin, height- bottommargin);
    ctx.lineTo(width, height - bottommargin);
    ctx.stroke();

    for(let x = leftmargin + offsetX; x < width; x+=offsetX){
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height - bottommargin);
        ctx.stroke();
    }

    for(let y = height - bottommargin; y > 0; y-=offsetY){
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.moveTo(leftmargin, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    DataSet.forEach(e => {
        DataDraw(e);
    });
}

function DataAdd(x, y){
    data = new Data(x, y);
    DataSet.push(data);

    return data;
}

function DataDraw(data){
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.fillStyle = 'RED';
    ctx.arc(data.x+leftmargin, window.innerHeight-data.y-bottommargin, 3, 0, 2*Math.PI);
    ctx.fill();
}

window.addEventListener("click", (event) => {
    if(event.x >= leftmargin && event.y <= window.innerHeight-bottommargin){
        tempx = event.x-leftmargin;
        tempy = window.innerHeight-event.y-bottommargin;
        console.log(tempx,tempy);
        temp = DataAdd(tempx, tempy);
        DataDraw(temp);
    }
});

window.onresize = function(){
    document.getElementById('canvas').remove();
    init();
};