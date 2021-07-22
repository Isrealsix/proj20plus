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
	width: 800,
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

// console.log(bricks);

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

// move paddle on canvas
function movePaddle() {
	paddle.x += paddle.dx;

	// Wall detection

	if (paddle.x + paddle.width > canvas.width) {
		paddle.x = canvas.width - paddle.width;
	}

	if (paddle.x < 0) {
		paddle.x = 0;
	}
}

// Move ball on canvas
function moveBall() {
	ball.x += ball.dx;
	ball.y += ball.dy;

	// Wall collision (x-axis)
	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
		ball.dx *= -1;
	}

	// Wall collision (y-axis)
	if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
		ball.dy *= -1;
	}

	// Paddle collision
	if (
		ball.x - ball.size > paddle.x &&
		ball.x + ball.size < paddle.x + paddle.width &&
		ball.y + ball.size > paddle.y
	) {
		// console.log('innit');
		ball.dy = -ball.speed;
	}

	// Bricks collision
	bricks.forEach(column => {
		column.forEach(brick => {
			if (brick.visibility) {
				if (
					ball.x - ball.size > brick.x &&
					ball.x + ball.size < brick.x + brick.w &&
					ball.y + ball.size > brick.y &&
					ball.y - ball.size < brick.y + brick.h
				) {
					ball.dy *= -1;
					brick.visibility = false;

					increaseScore();
				}
			}
		});
	});

	// If ball hit base - lose
	if (ball.y + ball.size > canvas.height) {
		showAllBricks();
		score = 0;
	}
}

// Increase Score
function increaseScore() {
	score++;

	if (score % (brickColumnCount * brickRowCount) === 0) {
		showAllBricks();
		console.log(score);
	}
}

// Make all bricks appear
function showAllBricks() {
	bricks.forEach(column => {
		column.forEach(brick => {
			brick.visibility = true;
		});
	});
}

// Draw Objects
function draw() {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawPaddle();
	drawBall();
	drawScore();
	drawBricks();
}

function update() {
	moveBall();
	// Draw Objects
	draw();
	movePaddle();

	requestAnimationFrame(update);
}

update();

function keyDown(ev) {
	if (ev.key === 'Right' || ev.key === 'ArrowRight') {
		paddle.dx = paddle.speed;
	} else if (ev.key === 'Left' || ev.key === 'ArrowLeft') {
		paddle.dx = -paddle.speed;
	}
}

function keyUp(ev) {
	if (
		ev.key === 'Right' ||
		ev.key === 'ArrowRight' ||
		ev.key === 'Left' ||
		ev.key === 'ArrowLeft'
	) {
		paddle.dx = 0;
	}
}

// Event handlers

// Keyboard events
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
// Rules
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
// Close
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
