// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// 移动端菜单
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// 作品集筛选
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 移除所有按钮的active类
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // 添加当前按钮的active类
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// AI对话界面
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.querySelector('.chat-container');
const closeChat = document.querySelector('.close-chat');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input textarea');
const sendMessage = document.querySelector('.send-message');

// 切换聊天界面
chatToggle.addEventListener('click', () => {
    chatContainer.classList.add('active');
});

closeChat.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// 发送消息
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'ai');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 处理消息发送
function handleSendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // 模拟AI回复
        setTimeout(() => {
            addMessage('这是一个模拟的AI回复消息。在实际应用中，这里应该调用AI API来获取响应。');
        }, 1000);
    }
}

sendMessage.addEventListener('click', handleSendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 作品项目悬停效果
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.item-overlay');
        overlay.style.bottom = '0';
    });

    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.item-overlay');
        overlay.style.bottom = '-100%';
    });
});

// 为视频设置缩略图
function setVideoThumbnail(videoElement) {
    // 监听视频加载完成事件
    videoElement.addEventListener('loadeddata', function() {
        // 设置视频时间到第一帧
        this.currentTime = 0;
    });

    // 当视频时间更新时（到达第一帧）
    videoElement.addEventListener('timeupdate', function() {
        // 只在第一次更新时执行
        if (this.currentTime === 0) {
            // 创建canvas元素
            const canvas = document.createElement('canvas');
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
            
            // 在canvas上绘制视频当前帧
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
            
            // 将canvas内容转换为图片URL
            const thumbnailUrl = canvas.toDataURL('image/jpeg');
            
            // 设置为视频的封面图
            this.setAttribute('poster', thumbnailUrl);
            
            // 暂停视频播放
            this.pause();
            
            // 移除timeupdate监听器，避免重复执行
            this.removeEventListener('timeupdate', arguments.callee);
        }
    });

    // 加载视频但不播放
    videoElement.load();
}

// 获取所有视频元素并设置缩略图
document.querySelectorAll('.portfolio-item.video video').forEach(video => {
    // 移除之前设置的poster属性
    video.removeAttribute('poster');
    // 设置新的缩略图
    setVideoThumbnail(video);
});

// 视频播放功能
const portfolioVideos = document.querySelectorAll('.portfolio-item.video');

// 创建视频模态框
const videoModal = document.createElement('div');
videoModal.className = 'video-modal';
videoModal.innerHTML = `
    <button class="close-modal">
        <i class="fas fa-times"></i>
    </button>
    <video controls>
        <source src="" type="video/mp4">
        您的浏览器不支持视频播放。
    </video>
`;
document.body.appendChild(videoModal);

const modalVideo = videoModal.querySelector('video');
const closeModal = videoModal.querySelector('.close-modal');

portfolioVideos.forEach(item => {
    const playButton = item.querySelector('.play-video');
    const video = item.querySelector('video');

    playButton.addEventListener('click', () => {
        modalVideo.src = video.src;
        videoModal.classList.add('active');
        modalVideo.play();
    });
});

closeModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.currentTime = 0;
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
}); 