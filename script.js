document.addEventListener("DOMContentLoaded", () => {
    const nebula = document.getElementById('nebula');
    const starField = document.getElementById('star-field');
    const typedText = document.getElementById('typed-text');
    const mainCard = document.getElementById('main-card');

    // 1. Static Twinkling Stars (The missing part)
    function createBackgroundStars() {
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'static-star';
            const size = Math.random() * 2 + 1 + 'px';
            star.style.width = size;
            star.style.height = size;
            star.style.top = Math.random() * 100 + 'vh';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.setProperty('--twinkle-duration', (Math.random() * 3 + 2) + 's');
            starField.appendChild(star);
        }
    }
    createBackgroundStars();

    // 2. Mouse Effect: Stardust Trail
    window.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.3) {
            const p = document.createElement('div');
            p.className = 'cursor-particle';
            p.style.left = e.clientX + 'px';
            p.style.top = e.clientY + 'px';
            const driftX = (Math.random() - 0.5) * 100 + 'px';
            const driftY = (Math.random() - 0.5) * 100 + 'px';
            p.style.setProperty('--dx', driftX);
            p.style.setProperty('--dy', driftY);
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 1200);
        }
    });

    // 3. Shooting Star Engine
    function launchStar(isShower = false) {
        const sStar = document.createElement('div');
        const colors = ['#fff', '#00fbff', '#ffae00', '#ff00ff', '#ffd700'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        sStar.className = 'shooting-star';
        sStar.style.left = Math.random() * window.innerWidth + 'px';
        sStar.style.top = Math.random() * window.innerHeight * 0.4 + 'px';
        sStar.style.width = (isShower ? 300 : 150) + 'px';
        sStar.style.height = '2px';
        sStar.style.background = `linear-gradient(90deg, ${color}, transparent)`;
        sStar.style.boxShadow = `0 0 20px ${color}`;
        starField.appendChild(sStar);

        const anim = sStar.animate([
            { transform: 'translate(0,0) rotate(-45deg)', opacity: 0 },
            { transform: 'translate(-100px, 100px) rotate(-45deg)', opacity: 1, offset: 0.1 },
            { transform: 'translate(-1200px, 1200px) rotate(-45deg)', opacity: 0 }
        ], { duration: isShower ? 3000 : 2000 });
        anim.onfinish = () => sStar.remove();
    }
    setInterval(() => launchStar(false), 2000);

    // 4. Opening Sequence
    document.getElementById('envelope-overlay').addEventListener('click', function() {
        document.getElementById('bg-music').play().catch(() => {});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        this.classList.add('hidden');
        setTimeout(() => {
            mainCard.classList.remove('hidden');
            startTyping();
        }, 1500);
    });

   // 5. Typing Logic
    const fullText = `I don’t even know where to start...\n\nWe met as school friends, but sometimes a thought passes through my mind: I wish we weren’t. I wish we’d met somewhere else, or maybe not at all, because I would’ve traded being "school friends" just for a chance to actually tell you I liked you.\n\nI never could express it back then—it felt like every other classmate was into you, so I just kept it all inside. I still remember the smallest things. The insults we traded, meeting your brother, even watching you on the sports field... I still wonder, were you actually trying to play, or just looking for a way to cut class?\n\nThen time faded. School ended. I remember you in that blue saree at the farewell. I wanted so badly to stay in touch, hoping I’d finally say something, but you just disappeared. I’ll be honest—I even tried to find where you stayed, just to know you were still there, but I failed. I spent years curious about the path you chose, catching bits of your life from strangers.\n\nWhen I finally called you, it was supposed to be a "prank," but that was just my way in. We planned Surabhi’s send-off, but if I’m being completely honest? That wasn't for her. It was my own selfishness. I just wanted to see you again. I wanted to see who you’d become.\n\nThen we met again, but not how I expected. Uncle Raj and I go a long way back... and when I saw you then, you looked so tired. Your eyes were dried up, wearing that yellow dress. I know what it means to lose someone close. We shared the history of the people we loved, and after that, you started coming to me in my dreams.\n\nI dream about work, life, and spiritual things. I’ve even tried to find solutions to problems in my sleep, but I fail every time; none of them ever work. That’s why I don’t completely trust them. And yet, you keep coming back, again and again.\n\nBut dreams fade. People fade. Feelings fade... just like these words on the screen are fading right now. It feels like a curse, this heart of mine that won't give up.\n\nYou want to know how I felt when I saw you that last time?\n\nIt felt like this...`;

    let charIndex = 0;
    let currentYOffset = 0;

    function startTyping() {
        if (charIndex < fullText.length) {
            const char = fullText.charAt(charIndex);
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char;
            
            if (char === '\n') {
                typedText.appendChild(document.createElement('br'));
                currentYOffset -= 32; 
                typedText.style.transform = `translateY(${currentYOffset}px)`;
            } else {
                typedText.appendChild(span);
            }
            
            // Words stay visible for 7 seconds before fading
            setTimeout(() => span.classList.add('fade-out'), 7000);
            
            charIndex++;

            // Natural typing rhythm: longer pauses for commas, periods, and questions
            let delay = 60;
            if (char === '.') delay = 800;
            if (char === ',') delay = 400;
            if (char === '?') delay = 1000;

            setTimeout(startTyping, delay);
        } else {
            // Wait 5 seconds after "It felt like this..." before the explosion
            setTimeout(triggerBigBangSequence, 5000);
        }
    }
    // 6. Big Bang Sequence
    function triggerBigBangSequence() {
        const bang = document.createElement('div');
        bang.id = 'big-bang-element';
        document.body.appendChild(bang);
        const m1 = document.createElement('div'); m1.className = 'heavy-meteor';
        m1.style.left = '-200px'; m1.style.top = '-200px';
        const m2 = document.createElement('div'); m2.className = 'heavy-meteor';
        m2.style.right = '-200px'; m2.style.bottom = '-200px';
        document.body.appendChild(m1); document.body.appendChild(m2);
        const collTime = 3000;
        m1.animate([{left:'-200px', top:'-200px'}, {left:'50%', top:'50%', transform:'translate(-50%,-50%)'}], {duration: collTime, easing:'ease-in'});
        m2.animate([{right:'-200px', bottom:'-200px'}, {right:'50%', bottom:'50%', transform:'translate(50%,50%)'}], {duration: collTime, easing:'ease-in'});
        setTimeout(() => {
            m1.remove(); m2.remove();
            bang.classList.add('bang-active');
            nebula.classList.add('intense');
            let showerInterval = setInterval(() => launchStar(true), 50);
            setTimeout(() => {
                clearInterval(showerInterval);
                mainCard.style.opacity = '0';
            }, 3000);
        }, collTime);
    }
});
