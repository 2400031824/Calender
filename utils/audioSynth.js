'use client';

export function playPaperFlipSound() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();

  const duration = 0.38;
  const sampleRate = ctx.sampleRate;
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(2, bufferSize, sampleRate);

  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < bufferSize; i += 1) {
      const progress = i / bufferSize;
      const envelope = Math.pow(Math.sin(progress * Math.PI), 0.6) * 0.35;
      const noise = Math.random() * 2 - 1;
      const tone = Math.sin(progress * 180) * 0.08;
      data[i] = (noise * 0.92 + tone) * envelope;
    }
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const highShelf = ctx.createBiquadFilter();
  highShelf.type = 'highshelf';
  highShelf.frequency.value = 3500;
  highShelf.gain.value = 6;

  const lowCut = ctx.createBiquadFilter();
  lowCut.type = 'highpass';
  lowCut.frequency.value = 800;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.28, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  source.connect(lowCut);
  lowCut.connect(highShelf);
  highShelf.connect(gain);
  gain.connect(ctx.destination);

  source.start();
  source.stop(ctx.currentTime + duration);
}
