export function playPageTurnSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const duration = 0.45;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        // Pink noise is softer than white noise for swishing sounds
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < data.length; i++) {
            const white = Math.random() * 2 - 1;
            // Paul Kellet's pink noise approximation
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            let pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            b6 = white * 0.115926;

            const t = i / data.length;
            // Super smooth bell curve envelope
            const envelope = Math.sin(Math.pow(t, 0.7) * Math.PI);
            data[i] = pink * envelope * 0.08;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        // Lowpass filter to sweep down frequencies over the duration
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.Q.value = 1.0;
        filter.frequency.setValueAtTime(3000, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + duration);

        source.connect(filter);
        filter.connect(ctx.destination);
        source.start();
    } catch (e) {
        console.error("Audio synth failed", e);
    }
}
