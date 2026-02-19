const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const TOTAL_FRAMES = 180;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'La_Ferrari_Frames-sequence');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const width = 1920;
const height = 1080;

console.log(`Generating ${TOTAL_FRAMES} placeholder frames in ${OUTPUT_DIR}...`);

for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    // Text
    ctx.fillStyle = '#C00000';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Frame ${i}`, width / 2, height / 2);

    // Progress bar to visualize rotation
    const progress = i / TOTAL_FRAMES;
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(width * 0.1, height * 0.8, width * 0.8, 20);
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(width * 0.1, height * 0.8, width * 0.8 * progress, 20);

    const buffer = canvas.toBuffer('image/jpeg');
    const filename = `frame-${String(i).padStart(3, '0')}.jpg`;
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
}

console.log('Done.');
