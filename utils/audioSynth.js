export function playPageTurnSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const duration = 0.25;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / data.length;
            // Soft swish envelope
            const envelope = Math.pow(t, 0.2) * Math.pow(1 - t, 3);
            data[i] = (Math.random() * 2 - 1) * envelope * 0.5;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(6000, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + duration);
        source.connect(filter);
        filter.connect(ctx.destination);
        source.start();
    } catch (e) {
        console.error("Audio synth failed", e);
    }
}
