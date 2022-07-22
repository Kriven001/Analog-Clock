let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let radius = canvas.height/2;
ctx.translate(radius,radius);
radius = radius*0.90;

function Clock(){
    designClock(ctx,radius);
    clockHours();
    setTime(ctx,radius);
    showHourMark();
    showSecMark();
}

function designClock(){
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0,0,radius*0.70,0,2*Math.PI);
    ctx.fillStyle = 'rgba(58,68,68,0.4)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0,0,radius*0.10,0,2*Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function clockHours() {
    let ang;
    let num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num=1;num<13;num++) {
        ang = num*Math.PI/6
    ctx.rotate(ang);
    ctx.translate(0,-radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(),0,0)    
    ctx.rotate(ang);
    ctx.translate(0,radius*0.85);
    ctx.rotate(-ang);    
    }
}

function setTime(ctx,radius) {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour%12;
    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(360*60));
    clockHands(ctx,hour,radius*0.5,radius*0.07);

    minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
    clockHands(ctx,minute,radius*0.65,radius*0.05);

    second = (second*Math.PI/30);
    clockHands(ctx,second,radius*0.9,radius*0.02);
}

function clockHands(ctx,pos,length,width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.strokeStyle = "yellow";
    ctx.rotate(-pos);
}

let cord = 223;
let angle;
function showHourMark() {
    for(let i=0; i<12; i++) {
        angle = (i-3)*(Math.PI*2)/12;
        ctx.lineWidth = 5;
        ctx.beginPath();
        let x1 = Math.cos(angle) * (cord);
        let y1 = Math.sin(angle) * (cord);
        let x2 = Math.cos(angle) * (cord-(cord/20));
        let y2 = Math.sin(angle) * (cord-(cord/20));

        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);

        ctx.strokeStyle = 'yellow';
        ctx.stroke();
    } 
}

function showSecMark() {
    for(let i=0; i<60; i++) {
        angle = (i-3)*(Math.PI*2)/60;
        ctx.lineWidth = 1;
        ctx.beginPath();
        let x1 = Math.cos(angle) * (cord);
        let y1 = Math.sin(angle) * (cord);
        let x2 = Math.cos(angle) * (cord-(cord/25));
        let y2 = Math.sin(angle) * (cord-(cord/25));

        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);

        ctx.strokeStyle = 'yellow';
        ctx.stroke();
    } 
}
setInterval(Clock,1000);