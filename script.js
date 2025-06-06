// 游戏配置
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// 游戏变量
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gamePaused = false;

// 初始化游戏
function initGame() {
    // 显示最高分
    highScoreElement.textContent = highScore;
    
    // 生成食物
    generateFood();
    
    // 开始游戏循环
    gameRunning = true;
    gameLoop();
}

// 生成食物
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // 确保食物不会生成在蛇身上
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// 游戏主循环
function gameLoop() {
    if (!gameRunning || gamePaused) {
        setTimeout(gameLoop, 100);
        return;
    }
    
    update();
    draw();
    
    setTimeout(gameLoop, 150);
}

// 更新游戏状态
function update() {
    // 移动蛇头
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // 穿墙逻辑 - 当蛇碰到边界时从另一边出现
    if (head.x < 0) {
        head.x = tileCount - 1;
    } else if (head.x >= tileCount) {
        head.x = 0;
    }
    
    if (head.y < 0) {
        head.y = tileCount - 1;
    } else if (head.y >= tileCount) {
        head.y = 0;
    }
    
    snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
        
        // 更新最高分
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
    } else {
        // 如果没吃到食物，移除尾巴
        snake.pop();
    }
    
    // 检查是否撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
}

// 绘制游戏
function draw() {
    // 清除画布
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格线（可选）
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 1;
    for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
    
    // 绘制蛇
    ctx.fillStyle = '#48bb78';
    snake.forEach((segment, index) => {
        if (index === 0) {
            // 蛇头用不同颜色
            ctx.fillStyle = '#38a169';
        } else {
            ctx.fillStyle = '#48bb78';
        }
        
        ctx.fillRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );
        
        // 添加一些圆角效果
        ctx.beginPath();
        ctx.arc(
            segment.x * gridSize + gridSize/2,
            segment.y * gridSize + gridSize/2,
            gridSize/2 - 1,
            0,
            2 * Math.PI
        );
        ctx.fill();
    });
    
    // 绘制食物
    ctx.fillStyle = '#e53e3e';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize/2,
        food.y * gridSize + gridSize/2,
        gridSize/2 - 1,
        0,
        2 * Math.PI
    );
    ctx.fill();
    
    // 添加食物的光晕效果
    ctx.shadowColor = '#e53e3e';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
}

// 游戏结束
function gameOver() {
    gameRunning = false;
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}

// 重新开始游戏
function restartGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    gameOverElement.classList.add('hidden');
    generateFood();
    gameRunning = true;
    gamePaused = false;
    gameLoop();
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (!gameRunning && e.code !== 'Space') return;
    
    switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
            if (dy !== 1) { // 防止反向移动
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
        case 'KeyS':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
        case 'KeyA':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
        case 'KeyD':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
        case 'Space':
            e.preventDefault();
            if (gameRunning) {
                gamePaused = !gamePaused;
            }
            break;
    }
});

// 移动端控制按钮
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!gameRunning) return;
        
        const direction = btn.dataset.direction;
        switch (direction) {
            case 'up':
                if (dy !== 1) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case 'down':
                if (dy !== -1) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case 'left':
                if (dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'right':
                if (dx !== -1) {
                    dx = 1;
                    dy = 0;
                }
                break;
        }
    });
});

// 重新开始按钮
restartBtn.addEventListener('click', restartGame);

// 防止方向键滚动页面
document.addEventListener('keydown', (e) => {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
    }
});

// 初始化游戏
initGame(); 