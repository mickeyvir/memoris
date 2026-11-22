/* =========================================================
   1. APPLICATION STATE & GENERATED ARTISTIC DEFAULT PHOTOS
========================================================= */
const state = {
    recipient: 'Pamoli',
    sender: 'Supriyo',
    pin: '1505', // এখানে '0102' এর বদলে আপনার পছন্দের ৪-সংখ্যার পাসকোড দিন
    quote: '"Even my last seven minutes will be spent where my eyes never left."',
    note: 'Hy! Every little moment with you feels like my favorite memory.',
    promise1: 'Always hold your hand in every crowd',
    soundEnabled: false,
    currentScreen: 'screen-pin',
    history: [],
    photos: [],
    galleryIndex: 0,
    knockCount: 0,
    puzzleOrder: [],
    selectedTile: null,
    puzzleMoves: 0,
    puzzleSeconds: 0,
    puzzleTimerId: null,
    puzzleSolved: false,
    treeAnimId: null
};

// Generate 8 romantic illustrated memory cards as default Data URLs
function generateDefaultMemories() {
    const configs = [
        { bg1: '#2C1E38', bg2: '#D96B8A', title: 'Late Night Walks', sub: 'Under the city lights ✨', emoji: '🌙' },
        { bg1: '#1E3A3A', bg2: '#E8A87C', title: 'Coffee & Laughs', sub: 'My favorite place is next to you', emoji: '☕' },
        { bg1: '#4A192C', bg2: '#F39C9C', title: 'Us Against The World', sub: 'Every ordinary day is magic', emoji: '🌸' },
        { bg1: '#1E293B', bg2: '#F472B6', title: 'Sunset Promises', sub: 'Golden skies & your smile', emoji: '🌅' },
        { bg1: '#3B1D38', bg2: '#F59E0B', title: 'First Eye Contact', sub: 'The moment everything changed', emoji: '💫' },
        { bg1: '#16302B', bg2: '#FB7185', title: 'Rainy Day Talks', sub: 'Hours felt like seconds', emoji: '☔' },
        { bg1: '#4C1D3D', bg2: '#FDA4AF', title: 'Your Cute Laugh', sub: 'My favorite sound in the world', emoji: '🥰' },
        { bg1: '#2D1B36', bg2: '#FBBF24', title: 'Forever & Always', sub: 'Just the beginning of us', emoji: '💍' }
    ];
    return configs.map((c) => {
        const cv = document.createElement('canvas');
        cv.width = 500;
        cv.height = 500;
        const ctx = cv.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 500, 500);
        grad.addColorStop(0, c.bg1);
        grad.addColorStop(1, c.bg2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 500, 500);

        for (let i = 0; i < 18; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * 500, Math.random() * 500, 12 + Math.random() * 35, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            ctx.fill();
        }

        ctx.font = '84px serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.emoji, 250, 225);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 34px Georgia, serif';
        ctx.fillText(c.title, 250, 310);

        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = '20px sans-serif';
        ctx.fillText(c.sub, 250, 352);

        return cv.toDataURL('image/png');
    });
}

/* =========================================================
   2. SOUND PLACEHOLDER FUNCTIONS (MUTED BY DEFAULT)
========================================================= */
function playTone() {}
function playChimeChord() {}
function playKnockSound() {}

/* =========================================================
   3. NAVIGATION, ROOM THEMES, AMBIENT HEARTS & SPARKLES
========================================================= */
const SCREEN_ORDER = [
    'screen-pin', 'screen-postcard', 'screen-couple', 'screen-scrapbook',
    'screen-bow', 'screen-always', 'screen-tree', 'screen-door',
    'screen-room-1', 'screen-room-2', 'screen-room-3', 'screen-room-4', 'screen-final'
];

const ROOM_THEMES = {
    'screen-pin':       { bg: 'linear-gradient(155deg, #ffe4ec 0%, #ffd1e0 100%)', hearts: ['#e11d48', '#fb7185', '#f43f5e'] },
    'screen-postcard':  { bg: 'linear-gradient(155deg, #fff3e6 0%, #ffe0d6 100%)', hearts: ['#ea580c', '#f97316', '#fb7185'] },
    'screen-couple':    { bg: 'linear-gradient(155deg, #f5e6ff 0%, #ffe4f2 100%)', hearts: ['#c026d3', '#e879f9', '#f43f5e'] },
    'screen-scrapbook': { bg: 'linear-gradient(155deg, #fff7e0 0%, #ffebd2 100%)', hearts: ['#d97706', '#f59e0b', '#fb7185'] },
    'screen-bow':       { bg: 'linear-gradient(155deg, #ffe8f0 0%, #ffd6e7 100%)', hearts: ['#ec4899', '#f43f5e', '#fbbf24'] },
    'screen-always':    { bg: 'linear-gradient(155deg, #d82368 0%, #9b1738 100%)', hearts: ['#ffffff', '#fde047', '#fbcfe8'] },
    'screen-tree':      { bg: 'linear-gradient(155deg, #fce4ec 0%, #f3e5f5 100%)', hearts: ['#ff1744', '#ff4081', '#ffd54f'] },
    'screen-door':      { bg: 'linear-gradient(155deg, #f9ebe8 0%, #f2d7d5 100%)', hearts: ['#881337', '#b91c1c', '#d97706'] },
    'screen-room-1':    { bg: 'linear-gradient(155deg, #e8f4f8 0%, #fce4ec 100%)', hearts: ['#0284c7', '#f43f5e', '#fb7185'] },
    'screen-room-2':    { bg: 'linear-gradient(155deg, #eafaf1 0%, #fdebd0 100%)', hearts: ['#059669', '#f97316', '#e11d48'] },
    'screen-room-3':    { bg: 'linear-gradient(155deg, #f4ecf7 0%, #fadbd8 100%)', hearts: ['#7e22ce', '#db2777', '#f43f5e'] },
    'screen-room-4':    { bg: 'linear-gradient(155deg, #fff1f2 0%, #ffe4e6 100%)', hearts: ['#e11d48', '#be123c', '#f59e0b'] },
    'screen-final':     { bg: 'linear-gradient(155deg, #fff0f5 0%, #ffe4e1 100%)', hearts: ['#d97706', '#e11d48', '#ec4899'] }
};

let activeHeartPalette = ROOM_THEMES['screen-pin'].hearts;
let ambientParticles = [];

function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const num = parseInt(clean, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function initAmbientBackground() {
    const canvas = document.getElementById('ambient-bg-canvas');
    const ctx = canvas.getContext('2d');
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    ambientParticles = Array.from({ length: 28 }, (_, idx) => {
        const startHex = activeHeartPalette[idx % activeHeartPalette.length];
        const rgb = hexToRgb(startHex);
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 4 + Math.random() * 8.5,
            vy: -0.3 - Math.random() * 0.55,
            vx: (Math.random() - 0.5) * 0.35,
            alpha: 0.18 + Math.random() * 0.28,
            isHeart: idx % 3 !== 0,
            curR: rgb.r, curG: rgb.g, curB: rgb.b,
            targetR: rgb.r, targetG: rgb.g, targetB: rgb.b
        };
    });

    function drawHeartShape(x, y, s) {
        ctx.beginPath();
        ctx.moveTo(x, y + s * 0.35);
        ctx.bezierCurveTo(x - s, y - s * 0.3, x - s * 0.5, y - s, x, y - s * 0.35);
        ctx.bezierCurveTo(x + s * 0.5, y - s, x + s, y - s * 0.3, x, y + s * 0.35);
        ctx.fill();
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ambientParticles.forEach(p => {
            p.curR += (p.targetR - p.curR) * 0.05;
            p.curG += (p.targetG - p.curG) * 0.05;
            p.curB += (p.targetB - p.curB) * 0.05;

            p.y += p.vy;
            p.x += p.vx + Math.sin(p.y * 0.015) * 0.3;
            if (p.y < -20) {
                p.y = canvas.height + 20;
                p.x = Math.random() * canvas.width;
            }
            ctx.fillStyle = `rgba(${Math.round(p.curR)}, ${Math.round(p.curG)}, ${Math.round(p.curB)}, ${p.alpha})`;
            if (p.isHeart) {
                drawHeartShape(p.x, p.y, p.r * 1.15);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        requestAnimationFrame(loop);
    }
    loop();
}

function applyRoomTheme(screenId) {
    const theme = ROOM_THEMES[screenId] || ROOM_THEMES['screen-pin'];
    document.body.style.background = theme.bg;
    activeHeartPalette = theme.hearts;

    ambientParticles.forEach((p, idx) => {
        const rgb = hexToRgb(activeHeartPalette[idx % activeHeartPalette.length]);
        p.targetR = rgb.r;
        p.targetG = rgb.g;
        p.targetB = rgb.b;
    });

    const flash = document.getElementById('room-flash-overlay');
    if (flash) {
        flash.style.opacity = '0.75';
        setTimeout(() => { flash.style.opacity = '0'; }, 260);
    }

    const stepIdx = SCREEN_ORDER.indexOf(screenId);
    if (stepIdx !== -1) {
        document.getElementById('room-step-label').textContent = `${stepIdx + 1}/${SCREEN_ORDER.length}`;
        const dotsWrap = document.getElementById('progress-dots-wrap');
        if (dotsWrap) {
            dotsWrap.innerHTML = SCREEN_ORDER.map((_, i) => {
                const cls = i === stepIdx ? 'progress-dot active' : (i < stepIdx ? 'progress-dot done' : 'progress-dot');
                return `<span class="${cls}"></span>`;
            }).join('');
        }
    }
}

document.addEventListener('pointerdown', (e) => {
    const icons = ['💖', '✨', '🌸', '💕'];
    const el = document.createElement('span');
    el.className = 'tap-sparkle';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
});

let isTransitioning = false;
function goToScreen(screenId, recordHistory = true) {
    if (isTransitioning || state.currentScreen === screenId) return;
    isTransitioning = true;

    if (state.treeAnimId && screenId !== 'screen-tree') {
        cancelAnimationFrame(state.treeAnimId);
        state.treeAnimId = null;
    }
    if (recordHistory && state.currentScreen !== screenId) {
        state.history.push(state.currentScreen);
    }

    const prevEl = document.getElementById(state.currentScreen);
    const nextEl = document.getElementById(screenId);

    applyRoomTheme(screenId);

    if (prevEl) {
        prevEl.classList.remove('active');
        prevEl.classList.add('exiting');
        setTimeout(() => {
            prevEl.classList.remove('exiting');
        }, 520);
    }

    if (nextEl) {
        nextEl.classList.add('active');
    }

    state.currentScreen = screenId;

    const backBtn = document.getElementById('btn-back');
    if (screenId === 'screen-pin') {
        backBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
    }

    if (screenId === 'screen-bow') initCupidBow();
    if (screenId === 'screen-tree') startBloomingTree();
    if (screenId === 'screen-room-1') initScratchGallery();
    if (screenId === 'screen-room-2') initPuzzleGame();

    setTimeout(() => {
        isTransitioning = false;
    }, 420);
}

function goBack() {
    if (state.history.length > 0) {
        const prev = state.history.pop();
        goToScreen(prev, false);
    }
}

function applyTextBindings() {
    document.querySelectorAll('.recipient-name').forEach(el => el.textContent = state.recipient);
    document.querySelectorAll('.sender-name').forEach(el => el.textContent = state.sender);
    const hintEl = document.getElementById('pin-hint-display');
    if (hintEl) hintEl.textContent = '••••';
    document.getElementById('custom-quote-text').textContent = state.quote;
    document.getElementById('custom-note-display').textContent = `“${state.note}”`;
    document.getElementById('final-note-quote').textContent = `“${state.note}”`;
    document.getElementById('custom-promise-1').textContent = `1. ${state.promise1}`;

    for (let i = 1; i <= 8; i++) {
        const imgEl = document.getElementById(`scrap-img-${i}`);
        if (imgEl && state.photos[i - 1]) {
            imgEl.src = state.photos[i - 1];
        }
    }
}

/* =========================================================
   4. SCREEN 1: PIN LOCK LOGIC
========================================================= */
const pinBoxes = Array.from(document.querySelectorAll('.pin-box'));
pinBoxes.forEach((box, idx) => {
    box.addEventListener('input', (e) => {
        const val = e.target.value.replace(/\D/g, '');
        e.target.value = val;
        if (val) {
            box.classList.add('filled');
            if (idx < 3) pinBoxes[idx + 1].focus();
            if (pinBoxes.every(b => b.value.length === 1)) {
                verifyPin();
            }
        } else {
            box.classList.remove('filled');
        }
    });

    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && idx > 0) {
            pinBoxes[idx - 1].focus();
            pinBoxes[idx - 1].value = '';
            pinBoxes[idx - 1].classList.remove('filled');
        }
    });
});

function verifyPin() {
    const entered = pinBoxes.map(b => b.value).join('');
    const statusEl = document.getElementById('pin-status-text');
    if (entered === state.pin) {
        statusEl.innerHTML = `<span class="text-emerald-600 font-semibold">Opening your gift...</span>`;
        setTimeout(() => {
            goToScreen('screen-postcard');
        }, 550);
    } else {
        pinBoxes.forEach(b => {
            b.classList.remove('filled');
            b.classList.add('error');
            setTimeout(() => b.classList.remove('error'), 400);
        });
        statusEl.innerHTML = `<span class="text-rose-600 font-semibold">Wrong PIN! Please try again.</span>`;
    }
}

/* =========================================================
   5. SCREEN 2 & 3: ROSE PETAL CASCADE & SCRAPBOOK UNLOCK
========================================================= */
function openPostcardWithPetals() {
    launchRosePetals(55, 2200);
    setTimeout(() => {
        goToScreen('screen-couple');
    }, 950);
}

function launchRosePetals(count = 50, duration = 2400) {
    const canvas = document.getElementById('petal-overlay');
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const colors = ['#F4A4B8', '#E5738A', '#D98A7C', '#FFF5F7', '#F8C8D4'];
    const petals = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: -30 - Math.random() * canvas.height * 0.6,
        size: 10 + Math.random() * 14,
        speedY: 3.2 + Math.random() * 4.5,
        speedX: (Math.random() - 0.5) * 2.5,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const start = performance.now();
    function frame(now) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(p.y * 0.02) * 0.8;
            p.rot += p.rotSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.bezierCurveTo(p.size, -p.size, p.size, p.size, 0, p.size);
            ctx.bezierCurveTo(-p.size, p.size, -p.size, -p.size, 0, -p.size);
            ctx.fill();
            ctx.restore();
        });

        if (now - start < duration) {
            requestAnimationFrame(frame);
        } else {
            canvas.style.display = 'none';
        }
    }
    requestAnimationFrame(frame);
}

function unlockScrapbook() {
    document.getElementById('pixel-lock-icon').classList.add('hidden');
    document.getElementById('tap-open-label').classList.add('hidden');
    const loader = document.getElementById('rose-wreath-loader');
    loader.classList.remove('hidden');
    loader.classList.add('flex');

    setTimeout(() => {
        goToScreen('screen-scrapbook');
        document.getElementById('pixel-lock-icon').classList.remove('hidden');
        document.getElementById('tap-open-label').classList.remove('hidden');
        loader.classList.add('hidden');
        loader.classList.remove('flex');
    }, 1100);
}

/* =========================================================
   6. SCREEN 5: INTERACTIVE CUPID'S BOW & HEART
========================================================= */
let bowShot = false;
function initCupidBow() {
    bowShot = false;
    document.getElementById('cupid-target-heart').classList.remove('opacity-15', 'scale-75');
    document.getElementById('cupid-quote-box').classList.add('hidden');
    document.getElementById('cupid-quote-box').classList.remove('flex');
    document.getElementById('bow-next-btn').classList.add('hidden');
    document.getElementById('bow-instruction').classList.remove('hidden');

    const canvas = document.getElementById('bow-canvas');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h * 0.52;
    let pull = 0;
    let arrowY = cy;
    let dragging = false;

    function drawBow() {
        ctx.clearRect(0, 0, w, h);

        ctx.save();
        ctx.strokeStyle = '#6B3E26';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(cx, cy + 28, 54, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();

        const leftX = cx - 48;
        const rightX = cx + 48;
        const tipY = cy + 3;
        const pullY = tipY + pull;

        ctx.strokeStyle = '#9E7B66';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(leftX, tipY);
        ctx.lineTo(cx, pullY);
        ctx.lineTo(rightX, tipY);
        ctx.stroke();

        if (!bowShot || arrowY > -40) {
            const ay = bowShot ? arrowY : pullY;
            ctx.strokeStyle = '#B87D4B';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(cx, ay);
            ctx.lineTo(cx, ay - 56);
            ctx.stroke();

            ctx.fillStyle = '#E11D48';
            ctx.beginPath();
            ctx.moveTo(cx, ay - 66);
            ctx.lineTo(cx - 7, ay - 52);
            ctx.lineTo(cx + 7, ay - 52);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#F472B6';
            ctx.fillRect(cx - 5, ay - 8, 10, 8);
        }
        ctx.restore();
    }

    function releaseArrow() {
        if (bowShot) return;
        bowShot = true;
        arrowY = cy + pull;
        pull = 0;

        const flyInterval = setInterval(() => {
            arrowY -= 14;
            drawBow();
            if (arrowY <= -35) {
                clearInterval(flyInterval);
                onHeartHit();
            }
        }, 16);
    }

    function onHeartHit() {
        launchRosePetals(42, 2000);
        document.getElementById('heart-pulse-rings').classList.add('hidden');
        document.getElementById('cupid-target-heart').classList.add('opacity-15', 'scale-75');
        const qBox = document.getElementById('cupid-quote-box');
        qBox.classList.remove('hidden');
        qBox.classList.add('flex');
        document.getElementById('bow-instruction').classList.add('hidden');
        document.getElementById('bow-next-btn').classList.remove('hidden');
    }

    canvas.onpointerdown = () => {
        if (bowShot) return;
        dragging = true;
        pull = 28;
        drawBow();
    };
    canvas.onpointermove = () => {
        if (!dragging || bowShot) return;
        pull = Math.min(48, Math.max(15, pull + 2));
        drawBow();
    };
    canvas.onpointerup = () => {
        if (!dragging) return;
        dragging = false;
        releaseArrow();
    };

    drawBow();
}

/* =========================================================
   7. SCREEN 7: CANVAS BLOOMING LOVE TREE
========================================================= */
function startBloomingTree() {
    if (state.treeAnimId) cancelAnimationFrame(state.treeAnimId);

    const canvas = document.getElementById('tree-canvas');
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 2, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const groundY = h - 26;

    const branches = [];
    function buildBranch(x1, y1, angle, len, width, depth) {
        const ctrlX = x1 + Math.cos(angle + (depth % 2 === 0 ? 0.15 : -0.15)) * (len * 0.55);
        const ctrlY = y1 + Math.sin(angle) * (len * 0.55);
        const x2 = x1 + Math.cos(angle) * len;
        const y2 = y1 + Math.sin(angle) * len;

        branches.push({ x1, y1, ctrlX, ctrlY, x2, y2, width, depth });

        if (depth < 5) {
            const spread = 0.35 + Math.random() * 0.1;
            buildBranch(x2, y2, angle - spread, len * 0.74, width * 0.66, depth + 1);
            buildBranch(x2, y2, angle + spread, len * 0.74, width * 0.66, depth + 1);
            if (depth === 1 || depth === 2) {
                buildBranch(x2, y2, angle + (Math.random() - 0.5) * 0.18, len * 0.68, width * 0.58, depth + 1);
            }
        }
    }
    buildBranch(cx, groundY, -Math.PI / 2, Math.min(80, h * 0.205), 11.5, 0);

    const leafPalette = [
        '#ff1744', '#ff4081', '#f50057', '#ff80ab',
        '#ff5252', '#ffd54f', '#fb7185', '#fda4af'
    ];
    const leaves = [];
    const scaleX = Math.min(7.5, w * 0.0195);
    const scaleY = Math.min(6.9, h * 0.018);
    const crownCenterY = groundY - Math.min(194, h * 0.50);

    for (let i = 0; i < 300; i++) {
        const t = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.48);
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        leaves.push({
            baseX: cx + hx * scaleX * r,
            baseY: crownCenterY + hy * scaleY * r,
            size: 5.2 + Math.random() * 7.8,
            color: leafPalette[Math.floor(Math.random() * leafPalette.length)],
            rot: (Math.random() - 0.5) * 0.9,
            phase: Math.random() * Math.PI * 2,
            scale: 0,
            delay: 48 + i * 0.28
        });
    }

    const fallingPetals = Array.from({ length: 18 }, () => ({
        x: cx + (Math.random() - 0.5) * 185,
        y: crownCenterY + (Math.random() - 0.3) * 90,
        vx: (Math.random() - 0.5) * 0.7,
        vy: 0.55 + Math.random() * 0.8,
        size: 5 + Math.random() * 4.2,
        rot: Math.random() * Math.PI * 2,
        rotSpd: (Math.random() - 0.5) * 0.05,
        color: leafPalette[Math.floor(Math.random() * 6)]
    }));

    const fireflies = Array.from({ length: 20 }, () => ({
        x: cx + (Math.random() - 0.5) * (w * 0.84),
        y: crownCenterY + (Math.random() - 0.45) * 195,
        r: 1.6 + Math.random() * 2.3,
        phase: Math.random() * Math.PI * 2
    }));

    const flowers = Array.from({ length: 16 }, (_, i) => ({
        x: cx - 130 + i * 17 + (Math.random() - 0.5) * 7,
        y: groundY + 4 + Math.random() * 9,
        color: i % 3 === 0 ? '#ff4081' : (i % 3 === 1 ? '#ffd54f' : '#fb7185')
    }));

    function drawHeart(x, y, s, rot, color, alpha = 1) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.55);
        ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s, 0, -s * 0.35);
        ctx.bezierCurveTo(s * 0.5, -s, s, -s * 0.3, 0, s * 0.55);
        ctx.fill();
        ctx.restore();
    }

    let frameCount = 0;

    function renderTreeFrame() {
        frameCount++;
        const time = frameCount * 0.03;
        const sway = Math.sin(time * 0.85) * 3.8;

        ctx.clearRect(0, 0, w, h);

        const halo = ctx.createRadialGradient(cx, crownCenterY, 12, cx, crownCenterY, w * 0.56);
        halo.addColorStop(0, 'rgba(255, 241, 214, 0.92)');
        halo.addColorStop(0.55, 'rgba(255, 218, 232, 0.45)');
        halo.addColorStop(1, 'rgba(255, 248, 245, 0)');
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, w, h);

        const hillGrad = ctx.createLinearGradient(0, groundY - 8, 0, h);
        hillGrad.addColorStop(0, '#DFECE0');
        hillGrad.addColorStop(1, 'rgba(255, 248, 245, 0)');
        ctx.fillStyle = hillGrad;
        ctx.beginPath();
        ctx.ellipse(cx, groundY + 14, w * 0.48, 23, 0, 0, Math.PI * 2);
        ctx.fill();

        flowers.forEach(fl => {
            ctx.fillStyle = fl.color;
            ctx.beginPath();
            ctx.arc(fl.x, fl.y, 2.6, 0, Math.PI * 2);
            ctx.fill();
        });

        if (frameCount < 14) {
            const sproutS = Math.min(1, frameCount / 10);
            drawHeart(cx, groundY - 4, 7 * sproutS, 0, '#ff4081');
        }

        ctx.strokeStyle = '#4E2E26';
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx - 2, groundY - 4);
        ctx.quadraticCurveTo(cx - 14, groundY + 2, cx - 25, groundY + 4);
        ctx.moveTo(cx + 2, groundY - 4);
        ctx.quadraticCurveTo(cx + 14, groundY + 2, cx + 25, groundY + 4);
        ctx.stroke();

        const branchProgress = Math.min(1, Math.max(0, (frameCount - 6) / 46));
        const visibleBranches = Math.floor(branches.length * branchProgress);
        for (let i = 0; i < visibleBranches; i++) {
            const b = branches[i];
            const bSway = sway * (b.depth * 0.22);
            ctx.strokeStyle = b.depth < 2 ? '#4E2E26' : '#6D4339';
            ctx.lineWidth = b.width;
            ctx.beginPath();
            ctx.moveTo(b.x1 + sway * Math.max(0, b.depth - 1) * 0.18, b.y1);
            ctx.quadraticCurveTo(b.ctrlX + bSway * 0.6, b.ctrlY, b.x2 + bSway, b.y2);
            ctx.stroke();
        }

        leaves.forEach(lf => {
            if (frameCount > lf.delay && lf.scale < 1) {
                lf.scale = Math.min(1, lf.scale + 0.085);
            }
            if (lf.scale > 0) {
                const leafSwayX = sway * 1.15 + Math.sin(time + lf.phase) * 1.7;
                const leafSwayY = Math.cos(time * 0.9 + lf.phase) * 1.1;
                const popScale = lf.scale < 1 ? Math.sin((lf.scale * Math.PI) / 2) * 1.15 : 1;
                drawHeart(
                    lf.baseX + leafSwayX,
                    lf.baseY + leafSwayY,
                    lf.size * popScale,
                    lf.rot + Math.sin(time + lf.phase) * 0.08,
                    lf.color
                );
            }
        });

        if (frameCount > 24) {
            const sitAlpha = Math.min(1, (frameCount - 24) / 25);
            ctx.save();
            ctx.globalAlpha = sitAlpha;

            ctx.strokeStyle = '#6D4339';
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(cx + 18, groundY - 4);
            ctx.lineTo(cx + 50, groundY - 4);
            ctx.moveTo(cx + 21, groundY - 4);
            ctx.lineTo(cx + 21, groundY + 3);
            ctx.moveTo(cx + 47, groundY - 4);
            ctx.lineTo(cx + 47, groundY + 3);
            ctx.stroke();

            ctx.fillStyle = '#4A2C25';
            ctx.beginPath();
            ctx.arc(cx + 29, groundY - 14, 4.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.roundRect(cx + 24, groundY - 9, 9.5, 6, 3);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx + 38, groundY - 13, 3.9, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.roundRect(cx + 33, groundY - 8.5, 9, 5.5, 3);
            ctx.fill();

            drawHeart(cx + 34, groundY - 23 + Math.sin(time * 2) * 2.2, 4.6, 0, '#ff1744', sitAlpha);
            ctx.restore();
        }

        if (frameCount > 70) {
            fallingPetals.forEach(fp => {
                fp.y += fp.vy;
                fp.x += fp.vx + Math.sin(time + fp.y * 0.03) * 0.65;
                fp.rot += fp.rotSpd;
                if (fp.y > groundY + 5) {
                    fp.y = crownCenterY + (Math.random() - 0.3) * 60;
                    fp.x = cx + (Math.random() - 0.5) * 165;
                }
                drawHeart(fp.x, fp.y, fp.size, fp.rot, fp.color, 0.88);
            });
        }

        fireflies.forEach(ff => {
            const glow = 0.25 + 0.75 * Math.abs(Math.sin(time * 1.4 + ff.phase));
            const fx = ff.x + Math.sin(time + ff.phase) * 6.5;
            const fy = ff.y + Math.cos(time * 0.8 + ff.phase) * 5.5;
            ctx.fillStyle = `rgba(255, 213, 79, ${glow})`;
            ctx.beginPath();
            ctx.arc(fx, fy, ff.r, 0, Math.PI * 2);
            ctx.fill();
        });

        state.treeAnimId = requestAnimationFrame(renderTreeFrame);
    }

    renderTreeFrame();
}

/* =========================================================
   8. SCREEN 8: MUSEUM DOOR (KNOCK 3 TIMES)
========================================================= */
function knockDoor() {
    if (state.knockCount >= 3) return;
    state.knockCount++;

    const doorLeaf = document.getElementById('museum-door-leaf');
    doorLeaf.classList.remove('door-thud');
    void doorLeaf.offsetWidth;
    doorLeaf.classList.add('door-thud');

    const knocker = document.getElementById('brass-knocker');
    knocker.classList.remove('knocker-animate');
    void knocker.offsetWidth;
    knocker.classList.add('knocker-animate');

    document.getElementById(`knock-dot-${state.knockCount}`).classList.replace('bg-rose-200', 'bg-[#C8234C]');
    document.getElementById('knock-feedback').textContent = `Knock (${state.knockCount}/3)`;

    if (state.knockCount === 3) {
        setTimeout(() => {
            launchRosePetals(30, 1600);
            document.getElementById('museum-door-leaf').classList.add('open');
            document.getElementById('knock-feedback').textContent = 'Welcome inside!';
        }, 320);
    }
}

function enterMuseum() {
    goToScreen('screen-room-1');
}

/* =========================================================
   9. SCREEN 9: ROOM 1 — SCRATCH-TO-REVEAL GALLERY (6 PHOTOS)
========================================================= */
const galleryTitles = [
    'Sweetest Memory #1',
    'Golden Hour Together #2',
    'Forever Favorite #3',
    'Sunset Promises #4',
    'First Eye Contact #5',
    'Rainy Day Talks #6'
];

function initScratchGallery() {
    const img = document.getElementById('gallery-photo');
    img.src = state.photos[state.galleryIndex];
    document.getElementById('gallery-caption').textContent = galleryTitles[state.galleryIndex];
    document.getElementById('gallery-idx-label').textContent = state.galleryIndex + 1;
    document.getElementById('gallery-counter').textContent = state.galleryIndex + 1;

    const canvas = document.getElementById('scratch-canvas');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);

    const w = rect.width;
    const h = rect.height;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#E8D3A7';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 6;
    for (let i = -h; i < w + h; i += 24) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
    }

    ctx.fillStyle = '#7A5B2E';
    ctx.font = 'bold 16px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('👆 Scratch to see it', w / 2, h / 2 - 4);
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('DRAG YOUR FINGER ACROSS', w / 2, h / 2 + 16);

    let scratching = false;
    function scratchAt(clientX, clientY) {
        const r = canvas.getBoundingClientRect();
        const x = clientX - r.left;
        const y = clientY - r.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 26, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.onpointerdown = (e) => {
        scratching = true;
        scratchAt(e.clientX, e.clientY);
    };
    canvas.onpointermove = (e) => {
        if (scratching) scratchAt(e.clientX, e.clientY);
    };
    canvas.onpointerup = () => { scratching = false; };
}

function switchGalleryPhoto(dir) {
    state.galleryIndex = (state.galleryIndex + dir + 6) % 6;
    initScratchGallery();
}

/* =========================================================
   10. SCREEN 10: ROOM 2 — 9-PIECE RESTORATION PUZZLE
========================================================= */
function initPuzzleGame() {
    clearInterval(state.puzzleTimerId);
    state.puzzleMoves = 0;
    state.puzzleSeconds = 0;
    state.selectedTile = null;
    state.puzzleSolved = false;

    document.getElementById('puzzle-moves').textContent = '0';
    document.getElementById('puzzle-timer').textContent = '0:00';
    document.getElementById('puzzle-status').textContent = '';
    document.getElementById('puzzle-peek-img').src = state.photos[0];

    state.puzzleOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const swaps = [[0, 4], [2, 7], [5, 8], [1, 3]];
    swaps.forEach(([a, b]) => {
        [state.puzzleOrder[a], state.puzzleOrder[b]] = [state.puzzleOrder[b], state.puzzleOrder[a]];
    });

    renderPuzzleGrid();

    state.puzzleTimerId = setInterval(() => {
        if (state.puzzleSolved || state.currentScreen !== 'screen-room-2') return;
        state.puzzleSeconds++;
        const mins = Math.floor(state.puzzleSeconds / 60);
        const secs = String(state.puzzleSeconds % 60).padStart(2, '0');
        document.getElementById('puzzle-timer').textContent = `${mins}:${secs}`;
    }, 1000);
}

function renderPuzzleGrid() {
    const grid = document.getElementById('puzzle-grid');
    grid.innerHTML = '';
    const imgUrl = state.photos[0];

    state.puzzleOrder.forEach((pieceIdx, posIdx) => {
        const tile = document.createElement('div');
        const row = Math.floor(pieceIdx / 3);
        const col = pieceIdx % 3;

        tile.className = 'w-full h-full bg-no-repeat cursor-pointer transition-transform duration-150 rounded-md ' +
            (state.selectedTile === posIdx ? 'ring-4 ring-[#C8234C] scale-95 z-10' : '');
        tile.style.backgroundImage = `url(${imgUrl})`;
        tile.style.backgroundSize = '300% 300%';
        tile.style.backgroundPosition = `${col * 50}% ${row * 50}%`;

        tile.onclick = () => onTileTap(posIdx);
        grid.appendChild(tile);
    });
}

function onTileTap(posIdx) {
    if (state.puzzleSolved) return;

    if (state.selectedTile === null) {
        state.selectedTile = posIdx;
        renderPuzzleGrid();
    } else if (state.selectedTile === posIdx) {
        state.selectedTile = null;
        renderPuzzleGrid();
    } else {
        const a = state.selectedTile;
        const b = posIdx;
        [state.puzzleOrder[a], state.puzzleOrder[b]] = [state.puzzleOrder[b], state.puzzleOrder[a]];
        state.selectedTile = null;
        state.puzzleMoves++;
        document.getElementById('puzzle-moves').textContent = state.puzzleMoves;
        renderPuzzleGrid();
        checkPuzzleWin();
    }
}

function checkPuzzleWin() {
    const isWin = state.puzzleOrder.every((val, idx) => val === idx);
    if (isWin) {
        state.puzzleSolved = true;
        clearInterval(state.puzzleTimerId);
        launchRosePetals(35, 1600);
        document.getElementById('puzzle-status').textContent =
            `Fixed it in ${state.puzzleMoves} moves! ${state.sender} knew you could do it.`;
    }
}

function togglePeek(show) {
    const peek = document.getElementById('puzzle-peek-img');
    if (show) peek.classList.remove('hidden');
    else peek.classList.add('hidden');
}

/* =========================================================
   11. SCREEN 11 & 12: NOTE WALL & PROMISES
========================================================= */
function openNoteCard() {
    const card = document.getElementById('note-card');
    card.classList.replace('bg-[#F6E9C8]', 'bg-white');
    card.classList.add('border-rose-200');
    document.getElementById('note-closed-view').classList.add('hidden');
    document.getElementById('note-open-view').classList.remove('hidden');
    document.getElementById('note-open-view').classList.add('flex');
    document.getElementById('note-counter-text').textContent = '1 of 1 opened';

    const btn = document.getElementById('btn-note-next');
    btn.disabled = false;
    btn.className = 'w-full max-w-[280px] py-3.5 rounded-2xl bg-[#C8234C] text-white font-semibold text-sm shadow-lg active:scale-95 transition';
    btn.textContent = 'Next room →';
}

function updatePromiseState() {
    const checks = Array.from(document.querySelectorAll('.promise-check'));
    const checkedCount = checks.filter(c => c.checked).length;
    const btn = document.getElementById('btn-seal-promises');

    btn.disabled = false;
    btn.className = 'btn-shimmer w-full max-w-[280px] py-3.5 rounded-2xl bg-[#C8234C] text-white font-semibold text-sm shadow-lg active:scale-95 transition';
    btn.textContent = checkedCount > 0
        ? `Make it official (${checkedCount}/${checks.length}) 💕`
        : 'Make it official 💕';
}

function sealPromises() {
    launchRosePetals(45, 2000);
    document.getElementById('sealed-stamp').classList.add('stamped');
    const btn = document.getElementById('btn-seal-promises');
    btn.textContent = 'Sealed 🎉';
    setTimeout(() => {
        goToScreen('screen-final');
    }, 1350);
}

/* =========================================================
   12. RESTART EXPERIENCE
========================================================= */
function restartExperience() {
    state.history = [];
    state.knockCount = 0;
    document.getElementById('museum-door-leaf').classList.remove('open');
    [1, 2, 3].forEach(i => {
        document.getElementById(`knock-dot-${i}`).classList.replace('bg-[#C8234C]', 'bg-rose-200');
    });
    document.getElementById('knock-feedback').textContent = 'Tap the door to knock (0/3)';
    pinBoxes.forEach(b => { b.value = ''; b.classList.remove('filled'); });
    document.getElementById('sealed-stamp').classList.remove('stamped');
    document.querySelectorAll('.promise-check').forEach(c => c.checked = false);
    updatePromiseState();
    goToScreen('screen-pin', false);
}

window.onload = function () {
    // এখানে আপনার ফোল্ডারে রাখা ৮টি ছবির নাম বসান (যেমন: 'photo1.jpg', 'photo2.jpg'...)
    state.photos = [
        'photo1.jpg',
        'photo2.jpg',
        'photo3.jpg',
        'photo4.jpg',
        'photo5.jpg',
        'photo6.jpg',
        'photo7.jpg',
        'photo8.jpg'
    ];

    applyTextBindings();
    initAmbientBackground();
    applyRoomTheme('screen-pin');
};
const bgMusic = document.getElementById("bgMusic");
let isMusicPlaying = false;

function playBgMusic() {
  if (!bgMusic) return;
  bgMusic.play().then(() => {
    isMusicPlaying = true;
  }).catch((err) => {
    console.log("Audio play blocked until user interaction:", err);
  });
}

function toggleMusic() {
  if (!bgMusic) return;
  if (bgMusic.paused) {
    bgMusic.play();
    isMusicPlaying = true;
  } else {
    bgMusic.pause();
    isMusicPlaying = false;
  }
}

// ইউজার প্রথমবার পেজে টাচ/ক্লিক করলেই গান শুরু হবে
document.addEventListener("click", () => {
  if (!isMusicPlaying) {
    playBgMusic();
  }
}, { once: true });