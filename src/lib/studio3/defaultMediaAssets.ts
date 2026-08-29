export interface Studio3MediaAsset {
  id: string;
  type: string;
  title: string;
  url?: string | null;
  htmlCode?: string | null;
  aspectRatio?: string;
  caption?: string | null;
  category?: string | null;
  createdAt?: string | Date;
}

export const DEFAULT_CURATED_MEDIA_ASSETS: Studio3MediaAsset[] = [
  {
    "id": "9beb52b8-4928-432c-85a2-e8016658b1e2",
    "type": "audio",
    "title": "The AI Architecture Dispatch Podcast",
    "url": null,
    "htmlCode": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAG vs Long Context Windows Podcast</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #050811;
            --text-color: #F1F5F9;
            --accent-purple: #8B5CF6;
            --accent-blue: #38BDF8;
            --accent-green: #10B981;
            --accent-pink: #EC4899;
            --card-bg: #0F172A;
            --border-color: #334155;
            --control-bg: #1E293B;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px;
            overflow: hidden;
        }

        .podcast-container {
            background-color: var(--card-bg);
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
            width: 100%;
            max-width: 860px;
            max-height: calc(100vh - 32px);
            padding: 20px 24px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            border: 1px solid var(--border-color);
            overflow: hidden;
        }

        .header {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .header h1 {
            font-size: 1.4rem;
            color: #C4B5FD;
            font-weight: 800;
            letter-spacing: -0.02em;
        }

        .header p {
            font-size: 0.8rem;
            color: #94A3B8;
            font-weight: 500;
        }

        .hosts-section {
            display: flex;
            justify-content: center;
            gap: 36px;
            padding: 4px 0;
        }

        .host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }

        .host-avatar {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0284C7, #38BDF8);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.4rem;
            font-weight: 800;
            color: #050811;
            border: 2px solid #38BDF8;
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
            transition: transform 0.2s ease;
        }

        .host-avatar.host-2 {
            background: linear-gradient(135deg, #BE185D, #EC4899);
            border-color: #EC4899;
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
        }

        .host-name {
            font-size: 0.8rem;
            font-weight: 700;
            color: #CBD5E1;
        }

        .audio-player {
            background-color: var(--control-bg);
            border-radius: 12px;
            padding: 12px 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            border: 1px solid var(--border-color);
        }

        .waveform-visualizer {
            width: 100%;
            height: 54px;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 8px;
            overflow: hidden;
        }

        canvas {
            display: block;
            width: 100%;
            height: 100%;
        }

        .controls {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
        }

        .play-pause-btn {
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            font-size: 1.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            flex-shrink: 0;
        }

        .play-pause-btn:hover {
            transform: scale(1.06);
        }

        .progress-bar-container {
            flex-grow: 1;
            height: 6px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            position: relative;
            cursor: pointer;
        }

        .progress-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #38BDF8, #8B5CF6);
            border-radius: 3px;
        }

        .time-display {
            font-size: 0.75rem;
            font-family: monospace;
            color: #94A3B8;
            font-weight: 700;
            min-width: 42px;
            text-align: center;
        }

        .transcript-section {
            background-color: rgba(15, 23, 42, 0.6);
            border-radius: 10px;
            padding: 12px 16px;
            flex: 1;
            min-height: 120px;
            max-height: 180px;
            overflow-y: auto;
            border: 1px solid rgba(51, 65, 85, 0.6);
            font-size: 0.8rem;
            line-height: 1.5;
        }

        .transcript-line {
            margin-bottom: 8px;
            padding: 6px 10px;
            border-radius: 6px;
            transition: background-color 0.2s ease;
            color: #94A3B8;
        }

        .transcript-line.active {
            background-color: rgba(139, 92, 246, 0.15);
            border-left: 3px solid var(--accent-purple);
            color: #F8FAFC;
        }

        .transcript-line strong {
            color: var(--accent-blue);
            margin-right: 6px;
        }
        .transcript-line.host-2 strong {
            color: var(--accent-pink);
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
    </style>
</head>
<body>
    <div class="podcast-container">
        <header class="header">
            <h1>Tech Deep Dive: RAG vs. Long Context Windows</h1>
            <p>Episode 01 • Master Architecture Dispatch</p>
        </header>

        <section class="hosts-section">
            <div class="host">
                <div class="host-avatar host-1">A</div>
                <span class="host-name">Alex (Host)</span>
            </div>
            <div class="host">
                <div class="host-avatar host-2">B</div>
                <span class="host-name">Ben (Architect)</span>
            </div>
        </section>

        <section class="audio-player">
            <div class="waveform-visualizer">
                <canvas id="audioVisualizer"></canvas>
            </div>
            <div class="controls">
                <button id="playPauseBtn" class="play-pause-btn">▶</button>
                <div class="time-display" id="currentTime">00:00</div>
                <div class="progress-bar-container" id="progressBarContainer">
                    <div class="progress-bar" id="progressBar"></div>
                </div>
                <div class="time-display" id="duration">05:00</div>
            </div>
        </section>

        <section class="transcript-section">
            <div id="transcriptContent"></div>
        </section>
    </div>

    <script>
        const playPauseBtn = document.getElementById('playPauseBtn');
        const audioVisualizerCanvas = document.getElementById('audioVisualizer');
        const currentTimeDisplay = document.getElementById('currentTime');
        const durationDisplay = document.getElementById('duration');
        const progressBar = document.getElementById('progressBar');
        const progressBarContainer = document.getElementById('progressBarContainer');
        const transcriptContent = document.getElementById('transcriptContent');
        const canvasCtx = audioVisualizerCanvas.getContext('2d');

        let isPlaying = false;
        let animationFrameId;
        const podcastDuration = 300;
        let currentPlaybackTime = 0;
        let lastTime = performance.now();

        const transcript = [
            { time: 0, host: 'Alex', text: "Welcome to Tech Deep Dive! Today we examine RAG vs. 1M+ Long Context Windows for enterprise AI." },
            { time: 5, host: 'Ben', text: "It's a foundational trade-off. RAG provides deterministic indexing and freshness; long context delivers holistic document reasoning." },
            { time: 12, host: 'Alex', text: "RAG shines when you have dynamic data sets that change continuously or require strict RBAC security." },
            { time: 20, host: 'Ben', text: "And modern systems use hybrid approaches: hierarchical chunk retrieval fed into extended context windows for deep synthesis!" }
        ];

        function initializeTranscript() {
            transcript.forEach((line) => {
                const div = document.createElement('div');
                div.className = 'transcript-line ' + (line.host === 'Alex' ? 'host-1' : 'host-2');
                div.dataset.time = line.time;
                div.innerHTML = '<strong>' + line.host + ':</strong> ' + line.text;
                transcriptContent.appendChild(div);
            });
        }

        function formatTime(s) {
            const m = Math.floor(s / 60);
            const sec = Math.floor(s % 60);
            return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
        }

        function updateDisplays() {
            currentTimeDisplay.textContent = formatTime(currentPlaybackTime);
            progressBar.style.width = ((currentPlaybackTime / podcastDuration) * 100) + '%';
            
            const lines = transcriptContent.children;
            for (let i = 0; i < lines.length; i++) {
                const lineTime = parseFloat(lines[i].dataset.time);
                const nextTime = i + 1 < lines.length ? parseFloat(lines[i+1].dataset.time) : podcastDuration;
                if (currentPlaybackTime >= lineTime && currentPlaybackTime < nextTime) {
                    lines[i].classList.add('active');
                } else {
                    lines[i].classList.remove('active');
                }
            }
        }

        function drawWaveform() {
            canvasCtx.clearRect(0, 0, audioVisualizerCanvas.width, audioVisualizerCanvas.height);
            const bars = 48;
            const barWidth = audioVisualizerCanvas.width / bars;
            const now = Date.now() * 0.005;

            for (let i = 0; i < bars; i++) {
                let h = isPlaying ? Math.abs(Math.sin(now + i * 0.35) * Math.cos(now * 0.5 + i * 0.2)) * (audioVisualizerCanvas.height * 0.75) + 6 : 4;
                const gradient = canvasCtx.createLinearGradient(0, audioVisualizerCanvas.height, 0, 0);
                gradient.addColorStop(0, '#38BDF8');
                gradient.addColorStop(0.5, '#8B5CF6');
                gradient.addColorStop(1, '#EC4899');
                canvasCtx.fillStyle = gradient;
                canvasCtx.fillRect(i * barWidth + 2, (audioVisualizerCanvas.height - h) / 2, barWidth - 3, h);
            }

            if (isPlaying) {
                const currentNow = performance.now();
                currentPlaybackTime += (currentNow - lastTime) / 1000;
                lastTime = currentNow;
                if (currentPlaybackTime >= podcastDuration) currentPlaybackTime = 0;
                updateDisplays();
            }
            animationFrameId = requestAnimationFrame(drawWaveform);
        }

        playPauseBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
            lastTime = performance.now();
        });

        progressBarContainer.addEventListener('click', (e) => {
            const rect = progressBarContainer.getBoundingClientRect();
            currentPlaybackTime = podcastDuration * ((e.clientX - rect.left) / rect.width);
            updateDisplays();
        });

        function resizeCanvas() {
            audioVisualizerCanvas.width = audioVisualizerCanvas.offsetWidth;
            audioVisualizerCanvas.height = audioVisualizerCanvas.offsetHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        
        initializeTranscript();
        resizeCanvas();
        updateDisplays();
        drawWaveform();
    </script>
</body>
</html>`,
    "aspectRatio": "16:9",
    "caption": "Interactive audio podcast with dynamic waveform synthesizer and real-time transcript tracking",
    "category": "audio",
    "createdAt": "2026-08-29T05:35:23.325Z"
  },
  {
    "id": "416dc78f-c978-4da4-9ada-bb2de5873e50",
    "type": "canvas_sandbox",
    "title": "Interactive 60fps Neural Particle Sandbox",
    "url": null,
    "htmlCode": `<!DOCTYPE html>
<html>
<head>
    <title>Neural Synapse Simulation</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #050811;
            --primary-color: #8B5CF6;
            --secondary-color: #38BDF8;
            --accent-green: #10B981;
            --accent-pink: #EC4899;
            --text-color: #F8FAFC;
            --control-bg: rgba(15, 23, 42, 0.85);
            --border-color: rgba(139, 92, 246, 0.4);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            margin: 0;
            overflow: hidden;
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            height: 100vh;
            width: 100vw;
            position: relative;
        }

        canvas {
            display: block;
            width: 100vw;
            height: 100vh;
            background-color: var(--bg-color);
        }

        .controls-container {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: var(--control-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 18px 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(14px);
            z-index: 100;
            width: 260px;
        }

        .title {
            font-size: 1.1rem;
            font-weight: 800;
            color: #C4B5FD;
            text-align: center;
            letter-spacing: -0.01em;
        }

        .control-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        label {
            font-size: 0.75rem;
            color: #94A3B8;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
        }

        label span {
            color: #38BDF8;
            font-family: monospace;
        }

        input[type="range"] {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 4px;
            outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--primary-color);
            cursor: pointer;
            box-shadow: 0 0 8px rgba(139, 92, 246, 0.8);
        }

        .button-group {
            display: flex;
            gap: 8px;
            margin-top: 4px;
        }

        button {
            flex: 1;
            padding: 8px 12px;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #7C3AED, #6D28D9);
            color: white;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.1s ease;
        }

        button:hover { transform: translateY(-1px); }
        button.pause-btn { background: linear-gradient(135deg, #DB2777, #BE185D); }
    </style>
</head>
<body>
    <canvas id="synapseCanvas"></canvas>

    <div class="controls-container">
        <div class="title">🧠 Neural Synapse 60fps</div>

        <div class="control-group">
            <label>Density: <span id="particleCountValue">75</span></label>
            <input type="range" id="particleCount" min="20" max="150" value="75">
        </div>

        <div class="control-group">
            <label>Gravity: <span id="gravityStrengthValue">0.60</span></label>
            <input type="range" id="gravityStrength" min="0" max="2" step="0.05" value="0.6">
        </div>

        <div class="control-group">
            <label>Velocity: <span id="initialVelocityValue">1.20</span></label>
            <input type="range" id="initialVelocity" min="0.2" max="3" step="0.1" value="1.2">
        </div>

        <div class="button-group">
            <button id="resetButton">Reset</button>
            <button id="pauseButton" class="pause-btn">Pause</button>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('synapseCanvas');
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let isPaused = false;
        let maxParticles = 75;
        let gravityStrength = 0.6;
        let initialVelocityMultiplier = 1.2;

        const particleColors = ['#8B5CF6', '#38BDF8', '#10B981', '#EC4899', '#F59E0B'];
        let particles = [];
        let mouseX = -1000, mouseY = -1000;

        class Particle {
            constructor(x, y) {
                this.x = x !== undefined ? x : Math.random() * canvas.width;
                this.y = y !== undefined ? y : Math.random() * canvas.height;
                this.radius = Math.random() * 2.5 + 1.5;
                this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
                this.maxLife = Math.random() * 120 + 80;
                this.life = this.maxLife;
                const angle = Math.random() * Math.PI * 2;
                const speed = (Math.random() * 1.5 + 0.8) * initialVelocityMultiplier;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
            }

            update() {
                if (mouseX !== -1000 && mouseY !== -1000) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > 15 && dist < 300) {
                        const force = (gravityStrength * 40) / dist;
                        this.vx += (dx / dist) * force;
                        this.vy += (dy / dist) * force;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.985;
                this.vy *= 0.985;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                this.life -= 0.5;
                if (this.life <= 0) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.life = this.maxLife;
                }
            }

            draw() {
                const alpha = Math.min(1, this.life / 30);
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.restore();
            }
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Spawn initial particles
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.getElementById('particleCount').addEventListener('input', (e) => {
            maxParticles = parseInt(e.target.value);
            document.getElementById('particleCountValue').textContent = maxParticles;
            while (particles.length < maxParticles) particles.push(new Particle());
            if (particles.length > maxParticles) particles.length = maxParticles;
        });

        document.getElementById('gravityStrength').addEventListener('input', (e) => {
            gravityStrength = parseFloat(e.target.value);
            document.getElementById('gravityStrengthValue').textContent = gravityStrength.toFixed(2);
        });

        document.getElementById('initialVelocity').addEventListener('input', (e) => {
            initialVelocityMultiplier = parseFloat(e.target.value);
            document.getElementById('initialVelocityValue').textContent = initialVelocityMultiplier.toFixed(2);
        });

        document.getElementById('resetButton').addEventListener('click', () => {
            particles = [];
            for (let i = 0; i < maxParticles; i++) particles.push(new Particle());
        });

        const pauseBtn = document.getElementById('pauseButton');
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            pauseBtn.textContent = isPaused ? 'Play' : 'Pause';
        });

        function animate() {
            if (!isPaused) {
                ctx.fillStyle = 'rgba(5, 8, 17, 0.2)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw synapse connection lines
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 110) {
                            ctx.save();
                            ctx.strokeStyle = '#8B5CF6';
                            ctx.globalAlpha = (1 - dist / 110) * 0.4;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                            ctx.restore();
                        }
                    }
                }

                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        animate();
    </script>
</body>
</html>`,
    "aspectRatio": "16:9",
    "caption": "Interactive 60fps HTML5 Canvas simulation of neural synapse particle firing with glowing connection mesh",
    "category": "motion",
    "createdAt": "2026-08-29T05:35:23.326Z"
  },
  {
    "id": "0f81be41-0b62-4fd6-a4c4-bd2843797777",
    "type": "deck",
    "title": "Enterprise Multi-Agent Architecture Deck",
    "url": null,
    "htmlCode": `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Agentic Workflows Presentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #050811;
            --text-light: #F8FAFC;
            --accent-indigo: #8B5CF6;
            --accent-sky: #38BDF8;
            --accent-emerald: #10B981;
            --accent-pink: #EC4899;
            --glass-bg: rgba(15, 23, 42, 0.8);
            --glass-border: rgba(139, 92, 246, 0.35);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-light);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
            position: relative;
        }

        .presentation-container {
            position: relative;
            width: 92vw;
            max-width: 1040px;
            aspect-ratio: 16 / 9;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.85));
            border-radius: 20px;
            border: 1px solid var(--glass-border);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.2);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 36px 44px;
            overflow: hidden;
        }

        .slide {
            display: none;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            animation: fadeIn 0.4s ease-in-out;
        }

        .slide.active { display: flex; }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        h1 {
            font-size: 2.4rem;
            font-weight: 900;
            background: linear-gradient(135deg, #C4B5FD, #38BDF8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
        }

        h2 {
            font-size: 1.8rem;
            font-weight: 800;
            color: #38BDF8;
            margin-bottom: 16px;
        }

        p.subtitle {
            font-size: 1.1rem;
            color: #94A3B8;
            font-weight: 500;
            margin-bottom: 20px;
        }

        ul.feature-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        ul.feature-list li {
            font-size: 0.95rem;
            color: #E2E8F0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        ul.feature-list li span.badge {
            background: rgba(139, 92, 246, 0.25);
            border: 1px solid rgba(139, 92, 246, 0.5);
            color: #C4B5FD;
            font-size: 0.75rem;
            font-weight: 800;
            padding: 2px 8px;
            border-radius: 6px;
            flex-shrink: 0;
        }

        .footer-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 16px;
            margin-top: 10px;
        }

        .pagination {
            font-size: 0.8rem;
            font-weight: 700;
            color: #94A3B8;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .dots {
            display: flex;
            gap: 6px;
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #334155;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .dot.active {
            background: #8B5CF6;
            width: 20px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.8);
        }

        .nav-buttons {
            display: flex;
            gap: 10px;
        }

        .nav-btn {
            background: rgba(139, 92, 246, 0.2);
            border: 1px solid rgba(139, 92, 246, 0.6);
            color: white;
            width: 38px;
            height: 38px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.15s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .nav-btn:hover:not(:disabled) {
            background: #8B5CF6;
            transform: scale(1.08);
        }

        .nav-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
            border-color: #334155;
        }
    </style>
</head>
<body>
    <div class="presentation-container">
        <!-- Slide 1 -->
        <div class="slide active">
            <h1>Autonomous Multi-Agent Systems</h1>
            <p class="subtitle">Next-Generation Orchestration Architecture</p>
            <ul class="feature-list">
                <li><span class="badge">DISPATCH</span> Dynamic LangGraph & Vertex AI Agent Supervisors</li>
                <li><span class="badge">RUNTIME</span> Sub-second tool calling with sandboxed execution environments</li>
                <li><span class="badge">MEMORY</span> Shared vector state, conversational context, and semantic recall</li>
            </ul>
        </div>

        <!-- Slide 2 -->
        <div class="slide">
            <h2>Agent Supervisor & Dispatch Tier</h2>
            <p class="subtitle">Decomposing complex natural language goals into targeted sub-tasks</p>
            <ul class="feature-list">
                <li><span class="badge">PLANNER</span> Recursive Goal Decomposition Engine</li>
                <li><span class="badge">ROUTER</span> Intent Classification & Domain-Specific Agent Assignment</li>
                <li><span class="badge">VALIDATOR</span> AST schema verification and pre-execution quality gates</li>
            </ul>
        </div>

        <!-- Slide 3 -->
        <div class="slide">
            <h2>Tool Execution & External Integrations</h2>
            <p class="subtitle">Secure, authenticated bridge to enterprise data lakes and APIs</p>
            <ul class="feature-list">
                <li><span class="badge">CONNECT</span> GCP BigQuery, Cloud Spanner, and Google Drive APIs</li>
                <li><span class="badge">GUARD</span> VPC Service Controls and Zero-Trust IAM Policy Enforcement</li>
                <li><span class="badge">FEEDBACK</span> Self-correcting closed-loop telemetry and execution repair</li>
            </ul>
        </div>

        <!-- Slide 4 -->
        <div class="slide">
            <h2>Evaluation, Latency & Cost HUD</h2>
            <p class="subtitle">Real-time observability and token budget governance</p>
            <ul class="feature-list">
                <li><span class="badge">METRICS</span> TTFT (Time to First Token), p99 latency, and token throughput</li>
                <li><span class="badge">AUDIT</span> Immutable event logs and step-by-step reasoning traces</li>
                <li><span class="badge">CERTIFY</span> 4-Phase Quality Gate Certification for enterprise production</li>
            </ul>
        </div>

        <!-- Footer Navigation -->
        <div class="footer-bar">
            <div class="pagination">
                <span id="slideCounter">SLIDE 1 OF 4</span>
                <div class="dots" id="dotsContainer"></div>
            </div>
            <div class="nav-buttons">
                <button id="prevBtn" class="nav-btn" disabled>❮</button>
                <button id="nextBtn" class="nav-btn">❯</button>
            </div>
        </div>
    </div>

    <script>
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const slideCounter = document.getElementById('slideCounter');
        const dotsContainer = document.getElementById('dotsContainer');
        let currentIdx = 0;

        // Build pagination dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = 'dot ' + (idx === 0 ? 'active' : '');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });

        function updateSlide() {
            slides.forEach((s, i) => s.classList.toggle('active', i === currentIdx));
            document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIdx));
            slideCounter.textContent = 'SLIDE ' + (currentIdx + 1) + ' OF ' + slides.length;
            prevBtn.disabled = currentIdx === 0;
            nextBtn.disabled = currentIdx === slides.length - 1;
        }

        function goToSlide(idx) {
            currentIdx = idx;
            updateSlide();
        }

        prevBtn.addEventListener('click', () => { if (currentIdx > 0) goToSlide(currentIdx - 1); });
        nextBtn.addEventListener('click', () => { if (currentIdx < slides.length - 1) goToSlide(currentIdx + 1); });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && currentIdx < slides.length - 1) goToSlide(currentIdx + 1);
            if (e.key === 'ArrowLeft' && currentIdx > 0) goToSlide(currentIdx - 1);
        });

        updateSlide();
    </script>
</body>
</html>`,
    "aspectRatio": "16:9",
    "caption": "Executive 16:9 presentation slide deck with glowing glassmorphic cards and interactive pagination",
    "category": "decks",
    "createdAt": "2026-08-29T05:35:23.326Z"
  },
  {
    "id": "5035f603-282d-4c9b-9019-53de82680603",
    "type": "mindmap",
    "title": "Modern AI & LLM Systems Mind Map",
    "url": null,
    "htmlCode": `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive AI Knowledge Map</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #050811;
            --text-color: #F8FAFC;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            overflow: hidden;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #mindmap-container {
            position: relative;
            width: 95vw;
            height: 92vh;
            max-width: 1100px;
            max-height: 700px;
        }

        svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .node {
            position: absolute;
            transform: translate(-50%, -50%);
            padding: 10px 18px;
            border-radius: 12px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
            z-index: 10;
        }

        .node:hover {
            transform: translate(-50%, -50%) scale(1.08);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8);
        }

        .node.root {
            background: linear-gradient(135deg, #7C3AED, #6D28D9);
            font-size: 1.1rem;
            padding: 14px 28px;
            border-radius: 50px;
            border: 2px solid #C4B5FD;
            box-shadow: 0 0 25px rgba(139, 92, 246, 0.6);
        }

        .badge-icon {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.7rem;
        }
    </style>
</head>
<body>
    <div id="mindmap-container">
        <svg id="svgLines"></svg>
    </div>

    <script>
        const container = document.getElementById('mindmap-container');
        const svg = document.getElementById('svgLines');

        const data = {
            id: 'root',
            text: '🧠 AI Architecture Stack',
            color: '#8B5CF6',
            expanded: true,
            children: [
                {
                    id: 'llms',
                    text: 'LLM Foundations',
                    color: '#0284C7',
                    expanded: false,
                    children: [
                        { id: 'causal', text: 'Decoder Transformers', color: '#38BDF8' },
                        { id: 'rlhf', text: 'RLHF & Alignment', color: '#38BDF8' }
                    ]
                },
                {
                    id: 'rag',
                    text: 'Vector & RAG Hub',
                    color: '#059669',
                    expanded: false,
                    children: [
                        { id: 'scann', text: 'ScaNN Vector Search', color: '#10B981' },
                        { id: 'hybrid', text: 'Dense-Sparse Hybrid', color: '#10B981' }
                    ]
                },
                {
                    id: 'agents',
                    text: 'Multi-Agent Swarms',
                    color: '#DB2777',
                    expanded: false,
                    children: [
                        { id: 'langgraph', text: 'LangGraph Supervisors', color: '#EC4899' },
                        { id: 'hitl', text: 'Human-in-the-Loop', color: '#EC4899' }
                    ]
                },
                {
                    id: 'guard',
                    text: 'Security & Guardrails',
                    color: '#D97706',
                    expanded: false,
                    children: [
                        { id: 'dlp', text: 'Cloud DLP & PII Masking', color: '#F59E0B' },
                        { id: 'vpc', text: 'VPC Service Controls', color: '#F59E0B' }
                    ]
                }
            ]
        };

        function render() {
            container.querySelectorAll('.node').forEach(n => n.remove());
            svg.innerHTML = '';

            const rect = container.getBoundingClientRect();
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            const nodes = [];

            // Root
            nodes.push({ id: data.id, text: data.text, color: data.color, x: cx, y: cy, isRoot: true });

            // Depth 1 with generous elliptical margin
            const count = data.children.length;
            data.children.forEach((c, i) => {
                const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
                const rx = Math.min(cx * 0.75, 300);
                const ry = Math.min(cy * 0.65, 175);
                const x = cx + Math.cos(angle) * rx;
                const y = cy + Math.sin(angle) * ry;
                nodes.push({ id: c.id, text: c.text, color: c.color, x, y, parent: { x: cx, y: cy }, expanded: c.expanded, hasKids: c.children && c.children.length > 0 });

                if (c.expanded && c.children) {
                    c.children.forEach((sub, j) => {
                        const subAngle = angle + (j === 0 ? -0.32 : 0.32);
                        const subX = cx + Math.cos(subAngle) * (rx + 90);
                        const subY = cy + Math.sin(subAngle) * (ry + 75);
                        nodes.push({ id: sub.id, text: sub.text, color: sub.color, x: subX, y: subY, parent: { x, y } });
                    });
                }
            });

            // Draw lines
            nodes.forEach(n => {
                if (n.parent) {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', n.parent.x);
                    line.setAttribute('y1', n.parent.y);
                    line.setAttribute('x2', n.x);
                    line.setAttribute('y2', n.y);
                    line.setAttribute('stroke', '#8B5CF6');
                    line.setAttribute('stroke-width', '2.5');
                    line.setAttribute('stroke-opacity', '0.5');
                    svg.appendChild(line);
                }
            });

            // Draw nodes
            nodes.forEach(n => {
                const el = document.createElement('div');
                el.className = 'node ' + (n.isRoot ? 'root' : '');
                el.style.left = n.x + 'px';
                el.style.top = n.y + 'px';
                el.style.backgroundColor = n.color;
                el.innerHTML = n.text + (n.hasKids ? '<span class="badge-icon">' + (n.expanded ? '−' : '+') + '</span>' : '');

                el.addEventListener('click', () => {
                    const target = data.children.find(c => c.id === n.id);
                    if (target) {
                        target.expanded = !target.expanded;
                        render();
                    }
                });

                container.appendChild(el);
            });
        }

        window.addEventListener('resize', render);
        render();
    </script>
</body>
</html>`,
    "aspectRatio": "16:9",
    "caption": "Interactive expandable AI architecture mind map with click-to-expand branch exploration",
    "category": "knowledge",
    "createdAt": "2026-08-29T05:35:23.326Z"
  },
  {
    "id": "4a76c3a8-7148-465c-a51e-4bdf1ac1e320",
    "type": "quiz",
    "title": "CAP Theorem & Distributed Consensus Master Quiz",
    "url": null,
    "htmlCode": `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Distributed Systems Quiz</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #050811;
            --text-color: #F8FAFC;
            --primary-color: #8B5CF6;
            --secondary-color: #38BDF8;
            --success-color: #10B981;
            --danger-color: #EC4899;
            --card-bg: #0F172A;
            --border-color: #334155;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 16px;
            overflow: hidden;
        }

        .quiz-container {
            background-color: var(--card-bg);
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
            padding: 28px 32px;
            max-width: 680px;
            width: 100%;
            text-align: center;
            border: 1px solid var(--border-color);
        }

        h1 {
            color: #C4B5FD;
            font-size: 1.6rem;
            font-weight: 800;
            margin-bottom: 8px;
        }

        p.desc {
            color: #94A3B8;
            font-size: 0.85rem;
            margin-bottom: 20px;
        }

        .header-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 10px;
            border-bottom: 1px solid #1E293B;
            font-size: 0.85rem;
            font-weight: 700;
            color: #38BDF8;
        }

        .question-text {
            font-size: 1.05rem;
            font-weight: 700;
            color: #F1F5F9;
            margin-bottom: 18px;
            text-align: left;
            line-height: 1.4;
        }

        .options-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
        }

        .option-btn {
            background-color: #1E293B;
            color: #E2E8F0;
            border: 1px solid #334155;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            text-align: left;
            transition: all 0.15s ease;
        }

        .option-btn:hover:not(:disabled) {
            background-color: #334155;
            border-color: #8B5CF6;
        }

        .option-btn.correct {
            background-color: rgba(16, 185, 129, 0.25);
            border-color: #10B981;
            color: #6EE7B7;
            font-weight: 800;
        }

        .option-btn.incorrect {
            background-color: rgba(236, 72, 153, 0.25);
            border-color: #EC4899;
            color: #F472B6;
        }

        .explanation {
            background-color: #1E293B;
            border-left: 4px solid #38BDF8;
            padding: 10px 14px;
            border-radius: 8px;
            text-align: left;
            font-size: 0.8rem;
            color: #CBD5E1;
            margin-bottom: 16px;
            display: none;
        }

        .action-btn {
            background: linear-gradient(135deg, #7C3AED, #6D28D9);
            color: white;
            border: none;
            padding: 12px 28px;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 800;
            cursor: pointer;
            transition: transform 0.1s ease;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
        }

        .action-btn:hover { transform: translateY(-1px); }
    </style>
</head>
<body>
    <div class="quiz-container" id="quizRoot">
        <h1>⚡ CAP Theorem Master Quiz</h1>
        <p class="desc">5-question distributed systems knowledge check</p>
        <button class="action-btn" id="startBtn">Start Challenge</button>
    </div>

    <script>
        const questions = [
            {
                q: "According to the CAP Theorem, which two properties can a distributed database guarantee during a network partition?",
                opts: ["Consistency & Availability", "Consistency & Partition Tolerance (CP) or Availability & Partition Tolerance (AP)", "Concurrency & Atomicity", "Durability & Latency"],
                ans: 1,
                exp: "During a network partition (P), a distributed system MUST choose between Consistency (CP) or Availability (AP)."
            },
            {
                q: "What consensus algorithm does Cloud Spanner utilize for distributed transaction ordering?",
                opts: ["Paxos + TrueTime synchronized atomic clocks", "Raft leader elections", "Two-Phase Commit without timestamps", "Gossip protocol"],
                ans: 0,
                exp: "Cloud Spanner achieves external consistency globally by combining Paxos groups with TrueTime hardware atomic clocks."
            }
        ];

        let current = 0;
        let score = 0;
        const root = document.getElementById('quizRoot');

        document.getElementById('startBtn').addEventListener('click', loadQuestion);

        function loadQuestion() {
            const q = questions[current];
            root.innerHTML = \`
                <div class="header-meta">
                    <span>Question \${current + 1} of \${questions.length}</span>
                    <span>Score: \${score}</span>
                </div>
                <div class="question-text">\${q.q}</div>
                <div class="options-list">
                    \${q.opts.map((opt, i) => \`<button class="option-btn" onclick="selectAnswer(\${i})">\${opt}</button>\`).join('')}
                </div>
                <div class="explanation" id="expBox">\${q.exp}</div>
                <button class="action-btn" id="nextBtn" style="display:none" onclick="nextQuestion()">Next Question ❯</button>
            \`;
        }

        window.selectAnswer = function(idx) {
            const q = questions[current];
            const btns = root.querySelectorAll('.option-btn');
            btns.forEach((b, i) => {
                b.disabled = true;
                if (i === q.ans) b.classList.add('correct');
                if (i === idx && i !== q.ans) b.classList.add('incorrect');
            });
            if (idx === q.ans) score++;
            document.getElementById('expBox').style.display = 'block';
            document.getElementById('nextBtn').style.display = 'inline-block';
        };

        window.nextQuestion = function() {
            current++;
            if (current < questions.length) {
                loadQuestion();
            } else {
                root.innerHTML = \`
                    <h1>🏆 Quiz Complete!</h1>
                    <p class="desc" style="font-size:1.1rem; color:#38BDF8; font-weight:800; margin: 20px 0;">Final Score: \${score} / \${questions.length}</p>
                    <button class="action-btn" onclick="location.reload()">Play Again</button>
                \`;
            }
        };
    </script>
</body>
</html>`,
    "aspectRatio": "16:9",
    "caption": "Interactive 5-question gamified quiz on CAP theorem, Paxos consensus, and distributed systems",
    "category": "games",
    "createdAt": "2026-08-29T05:35:23.326Z"
  },
  {
    "id": "asset_gladiator_default",
    "type": "image",
    "title": "Colosseum Gladiator Duel",
    "url": "/gladiators_rome_arena.jpg",
    "htmlCode": null,
    "aspectRatio": "16:9",
    "caption": "Photorealistic Roman Colosseum arena duel with Secutor vs Retiarius in dramatic sunlight and dust.",
    "category": "visuals",
    "createdAt": "2026-08-29T05:35:23.326Z"
  }
];
