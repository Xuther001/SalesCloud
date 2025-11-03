import { LightningElement, track } from 'lwc';
import CAMPFIRE from '@salesforce/resourceUrl/Campfire';
import PILGRIMS from '@salesforce/resourceUrl/Pilgrims';
import PUMPKINS from '@salesforce/resourceUrl/Pumpkins';
import WAGON_FOOD from '@salesforce/resourceUrl/WagonWithFood';
import THANKSGIVING_BG from '@salesforce/resourceUrl/ThanksgivingBackground';
import SQUIRRELS from '@salesforce/resourceUrl/ThanksgivingSquirrels';

export default class ThanksgivingScene extends LightningElement {
    campfireImg = CAMPFIRE;
    pilgrimsImg = PILGRIMS;
    pumpkinsImg = PUMPKINS;
    wagonFoodImg = WAGON_FOOD;
    thanksgivingBg = THANKSGIVING_BG;
    squirrelsImg = SQUIRRELS;

    greetings = [
        "Happy Thanksgiving! Grateful for your support in making a difference in our community.",
        "Wishing you a joyful Thanksgiving filled with love, kindness, and hope.",
        "May this season of gratitude inspire us all to give and serve others.",
        "Thank you for being part of our journey — your generosity changes lives.",
        "Sending warm wishes for a peaceful and meaningful Thanksgiving.",
        "Together, we celebrate the power of community, compassion, and giving.",
        "May your Thanksgiving be full of blessings, friendship, and joy.",
        "With gratitude for all you do, we wish you a season of happiness and warmth.",
        "Thankful for supporters like you who make positive impact possible.",
        "This Thanksgiving, we honor the spirit of giving and the hearts that make it happen."
    ];

    @track currentGreeting = '';
    greetingIndex = 0;
    greetingInterval;
    greetingStartTimeout;

    connectedCallback() {
        this.startGreetingsLoop();
    }

    disconnectedCallback() {
        clearTimeout(this.greetingStartTimeout);
        clearInterval(this.greetingInterval);
    }

    startGreetingsLoop() {
        this.greetingStartTimeout = setTimeout(() => {
            this.showNextGreeting();
            this.greetingInterval = setInterval(() => {
                this.showNextGreeting();
            }, 30000);
        }, 5000);
    }

    showNextGreeting() {
        this.currentGreeting = this.greetings[this.greetingIndex];
        this.greetingIndex = (this.greetingIndex + 1) % this.greetings.length;
    }

    get backgroundStyle() {
        return `
            background-image: url(${this.thanksgivingBg});
            background-size: 100% 150%;
            background-position: center 100%;
            background-repeat: no-repeat;
        `;
    }
}