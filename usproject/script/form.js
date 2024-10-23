
const canvas = document.getElementById('signature');
const ctx = canvas.getContext('2d');
const signature = document.getElementsByName('signature')[0];
let drawing = false, prevX = 0, prevY = 0;

function resizeCanvas() {
    const { width } = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = 200 * ratio;
    ctx.scale(ratio, ratio);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); 

function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
}

function startDrawing(e) {
    drawing = true;
    const pos = getPosition(e);
    prevX = pos.x;
    prevY = pos.y;
    e.preventDefault();
}

function stopDrawing() {
    drawing = false;
    signature.value = canvas.toDataURL();
}

function draw(e) {
    if (!drawing) return;
    const pos = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#1E459C';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    prevX = pos.x;
    prevY = pos.y;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', startDrawing, { passive: false });
canvas.addEventListener('touchmove', draw, { passive: false });
canvas.addEventListener('touchend', stopDrawing);