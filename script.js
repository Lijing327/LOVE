const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

// 设置画布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 爱心跳动动画
let scale = 1;
let growing = true;

// 雪花效果
const snowflakes = [];
for (let i = 0; i < 100; i++) {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedY: Math.random() * 2 + 1
    });
}

// 绘制爱心
function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 1.5, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 1.5, x, y);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.shadowColor = "pink";
    ctx.shadowBlur = 20;
    ctx.fill();
}

// 绘制雪花
function drawSnowflakes() {
    ctx.fillStyle = "white";
    snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();

        // 雪花下落
        flake.y += flake.speedY;
        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }
    });
}

// 动画循环
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制雪花
    drawSnowflakes();

    // 绘制跳动的爱心
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    drawHeart(centerX, centerY, 80 * scale);

    // 调整爱心缩放比例
    if (growing) {
        scale += 0.005;
        if (scale >= 1.2) growing = false;
    } else {
        scale -= 0.005;
        if (scale <= 1) growing = true;
    }

    requestAnimationFrame(animate);
}

// 开始动画
animate();
