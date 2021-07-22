const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Score
let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// Create ball props
const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 10,
	speed: 4,
	dx: 4,
	dy: -4,
	fillStyle: '#0095dd',
};

// Create paddle props
const paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	width: 80,
	height: 10,
	speed: 8,
	dx: 0,
	fillStyle: '#0095dd',
};

// Create brick props
const brickInfo = {
	w: 70,
	h: 20,
	padding: 10,
	offsetX: 45,
	offsetY: 60,
	visibility: true,
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
	bricks[i] = [];
	for (let j = 0; j < brickColumnCount; j++) {
		const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
		const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
		bricks[i][j] = { x, y, ...brickInfo };
	}
}

console.log(bricks);

// Draw ball on canvas
function drawBall() {
	const { x, y, size, fillStyle } = ball;
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2);
	ctx.fillStyle = fillStyle;
	ctx.fill();
	ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
	const { x, y, width, height, fillStyle } = paddle;
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fillStyle = fillStyle;
	ctx.fill();
	ctx.closePath();
}

// Draw score on canvas
function drawScore() {
	ctx.font = '20px Arial';
	ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks on canvas
function drawBricks() {
	bricks.forEach(column => {
		column.forEach(brick => {
			ctx.beginPath();
			ctx.rect(brick.x, brick.y, brick.w, brick.h);
			ctx.fillStyle = brick.visibility ? '#0095dd' : 'transparent';
			ctx.fill();
			ctx.closePath();
		});
	});
}

// Draw Objects
function draw() {
	drawPaddle();
	drawBall();
	drawScore();
	drawBricks();
}

draw();

// Event handlers
// Rules
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
// Close
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
