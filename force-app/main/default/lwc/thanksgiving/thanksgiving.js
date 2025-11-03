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

    allLines = [
        'Under a starlit sky, a small pilgrim family gathers around a glowing campfire, their faces bathed in warmth and joy.',
        'Beside them, a wagon overflows with freshly gathered harvest — pumpkins, fruits, and golden grains — a tribute to their hard work and gratitude.',
        'They chat quietly around the campfire, preparing for the evening and the supper they will soon cook.',
        'Laughter and soft conversation drift through the crisp night air as squirrels scamper nearby, curiously watching the activity.',
        'It’s a peaceful night of appreciation and celebration of nature’s abundance.'
    ];

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
        this.startCrawlLoop();
        this.startGreetingsLoop();
    }

    disconnectedCallback() {
        clearTimeout(this.greetingStartTimeout);
        clearInterval(this.greetingInterval);
    }

    startCrawlLoop() {
        const crawl = this.template.querySelector('.story-text');
        if (!crawl) return;

        const animationDuration = 120000;
        const delayBetweenCrawls = 60000;

        const runCrawl = () => {
            if (!crawl) return;
            crawl.style.animation = 'none';
            void crawl.offsetWidth;
            crawl.style.animation = `crawlMove 120s linear forwards`;
            setTimeout(runCrawl, animationDuration + delayBetweenCrawls);
        };

        runCrawl();
    }

    startGreetingsLoop() {
        this.greetingStartTimeout = setTimeout(() => {
            this.showNextGreeting();
            this.greetingInterval = setInterval(() => {
                this.showNextGreeting();
            }, 30000);
        }, 60000);
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
