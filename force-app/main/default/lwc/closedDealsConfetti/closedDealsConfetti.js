import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import getMonthlyAwardedGrantTotal from '@salesforce/apex/OpportunityController.getMonthlyAwardedTotal';
import CONFETTI_JS from '@salesforce/resourceUrl/confettiJs';

export default class MonthlyGrantConfetti extends LightningElement {
    @track showMessage = false;
    confettiInitialized = false;

    renderedCallback() {
        if (this.confettiInitialized) return;
        this.confettiInitialized = true;

        loadScript(this, CONFETTI_JS)
            .then(() => {
                return getMonthlyAwardedGrantTotal();
            })
            .then(total => {
                if (total > 1000000) {
                    this.showMessage = true;
                    setTimeout(() => this.launchConfetti(), 200);
                }
            })
            .catch(error => {
                console.error('Error initializing confetti or fetching total:', error);
            });
    }

    launchConfetti() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            const particleCount = 50 * (timeLeft / duration);
            window.confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            window.confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);
    }
}