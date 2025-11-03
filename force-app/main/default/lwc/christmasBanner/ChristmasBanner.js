import { LightningElement, track } from 'lwc';
import SANTA from '@salesforce/resourceUrl/SantaGif';

export default class ChristmasScene extends LightningElement {
    @track snowflakes = [];
    @track santa = null;
    flakeId = 0;
    santaImg = SANTA;

    connectedCallback() {
        this.spawnSnowflakes();
        setInterval(() => this.spawnSnowflakes(), 300);

        this.spawnSanta();
        setInterval(() => this.spawnSanta(), Math.random() * 10000 + 15000);
    }

    spawnSnowflakes() {
        const newFlakes = Array.from({ length: 5 }, () => {
            const left = Math.random() * 100;
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 4 + 4;
            const opacity = Math.random() * 0.5 + 0.5;
            return {
                id: this.flakeId++,
                style: `
                    left: ${left}%;
                    width: ${size}px;
                    height: ${size}px;
                    opacity: ${opacity};
                    animation-duration: ${duration}s;
                `
            };
        });

        this.snowflakes = [...this.snowflakes, ...newFlakes];
        setTimeout(() => {
            this.snowflakes = this.snowflakes.slice(newFlakes.length);
        }, 6000);
    }

    spawnSanta() {
        if (this.santa) return;

        const top = Math.random() * 25 + 5;
        const duration = Math.random() * 8 + 8;

        this.santa = {
            style: `top: ${top}%; left: -15%; animation-duration: ${duration}s;`
        };

        setTimeout(() => {
            this.santa = null;
        }, duration * 1000);
    }
}
