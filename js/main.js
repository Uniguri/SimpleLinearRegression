const margin = 50;
const offset = 30;
let DataSet = new Array();

function init() {
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

function mainDraw() {
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(margin, 0);
    ctx.lineTo(margin, height - margin);
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width, height - margin);
    ctx.stroke();

    for (let x = margin + offset; x < width; x += offset) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height - margin);
        ctx.stroke();
    }

    for (let y = height - margin; y > 0; y -= offset) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.moveTo(margin, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    DataSet.forEach(e => {
        DataDraw(e);
    });

    if( DataSet.length >= 2)
        DrawHypothesis(hypothesis);
}

function DataAdd(x, y) {
    data = new Data(x, y);
    DataSet.push(data);

    return data;
}

function DataDraw(data) {
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.fillStyle = 'RED';
    ctx.arc(data.x*offset*offset + margin, window.innerHeight - data.y*offset*offset - margin, 3, 0, 2 * Math.PI);
    ctx.fill();
}

function DrawHypothesis(hypothesis){
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(margin, height -margin - hypothesis.H( 0 ) * offset*offset );
    ctx.lineTo(width, height -margin - hypothesis.H( (window.innerWidth-margin) / (offset*offset)) * offset*offset );
    ctx.stroke();

    ctx.clearRect(margin+1, height-margin+1, width, height);
}

window.addEventListener("click", (event) => {
    if (event.x >= margin && event.y <= window.innerHeight - margin) {
        tempx = (event.x - margin)/(offset*offset);
        tempy = (window.innerHeight - event.y - margin)/(offset*offset);
        temp = DataAdd(tempx, tempy);
        DataDraw(temp);

        if(DataSet.length >= 2){
            Regression(DataSet, DataSet.length);

            document.getElementById('canvas').remove();
            init()
        }

    }
});

window.onresize = function () {
    document.getElementById('canvas').remove();
    init();
};