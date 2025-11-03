import { LightningElement, track } from 'lwc';
import BAT_GIF from '@salesforce/resourceUrl/BatGif';
import WITCH from '@salesforce/resourceUrl/WitchGif';

export default class HalloweenBats extends LightningElement {
    @track bats = [];
    @track witch = null;
    @track currentJoke = '';

    batIdCounter = 0;
    batGif = BAT_GIF;
    witchImg = WITCH;

    jokes = [
        "Why don’t skeletons fight each other? They don’t have the guts!",
        "What’s a ghost’s favorite dessert? I scream!",
        "Why did the vampire get a job at the newspaper? He wanted to work on the night shift!",
        "What do witches put on their bagels? Scream cheese!",
        "Why did the zombie go to school? He wanted to improve his deaducation!",
        "What’s a mummy’s favorite type of music? Wrap!",
        "Why did the skeleton go to the party alone? He had no body to go with him!",
        "What’s a ghost’s favorite room in the house? The living room!",
        "Why don’t mummies take vacations? They’re afraid they’ll unwind!",
        "What do you get when you cross a vampire and a snowman? Frostbite!",
        "What kind of pants do ghosts wear? Boo-jeans!",
        "Why are graveyards so noisy? Because of all the coffin!",
        "Why didn’t the skeleton go skydiving? He didn’t have the guts!",
        "How do you fix a broken jack-o’-lantern? With a pumpkin patch!",
        "What do you call a fat pumpkin? A plumpkin!",
        "What’s a ghost’s favorite fruit? Boo-berries!",
        "Why do vampires always seem sick? They’re always coffin!",
        "What do birds give out on Halloween night? Tweets!",
        "What’s a vampire’s favorite dog? A bloodhound!",
        "Why do ghosts love elevators? It lifts their spirits!",
        "How do monsters tell their future? They read their horror-scope!",
        "Why was the witch’s broom late? It swept in!",
        "Why do demons and ghouls hang out together? Because demons are a ghoul’s best friend!",
        "What kind of makeup do ghosts wear? Mas-scare-a!",
        "Why was the zombie so good at math? He could count on his fingers!",
        "Why do vampires need mouthwash? Because they have bat breath!",
        "What’s a witch’s favorite school subject? Spelling!",
        "What did one ghost say to the other? ‘Do you believe in people?’",
        "Why are ghosts bad liars? Because they are too transparent!",
        "What kind of dog does Dracula have? A bloodhound!",
        "Why did Dracula become a vegetarian? Because necks gave him heartburn!",
        "What do you call a witch who lives at the beach? A sand-witch!",
        "What’s it like to be kissed by a vampire? It’s a pain in the neck!",
        "Why don’t skeletons ever use cell phones? They don’t have the backbone for it!",
        "Why did the scarecrow get promoted? He was outstanding in his field!",
        "What kind of key opens a haunted house? A spoo-key!",
        "What’s a ghost’s favorite game? Hide and shriek!",
        "Why do mummies make great secret agents? They’re good at keeping things under wraps!",
        "What’s a pumpkin’s favorite sport? Squash!",
        "What do you get when you drop a pumpkin? Squash!",
        "Why was the vampire bad at art? He could only draw blood!",
        "What does a ghost eat for breakfast? Boo-berries and scream of wheat!",
        "Why did the ghost go into the bar? For the boos!",
        "What do skeletons order at a restaurant? Spare ribs!",
        "Why did the monster eat a light bulb? Because he wanted a light snack!",
        "What did the mummy say to the detective? Let’s wrap this case up!",
        "Why do vampires love baseball? Because they turn into bats every night!",
        "Why do ghosts hate rain? It dampens their spirits!",
        "What kind of music do mummies listen to? Wrap music!",
        "Why did the jack-o’-lantern cross the road? To light the way!"
    ];

    connectedCallback() {
        this.spawnBats();
        setInterval(() => this.spawnBats(), 2000);

        this.spawnWitch();
        setInterval(() => this.spawnWitch(), Math.random() * 5000 + 10000);

        this.startJokes();
    }

    spawnBats() {
        const newBats = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => {
            const top = Math.random() * 33;
            const scale = Math.random() * 0.8 + 0.8;
            const duration = Math.random() * 5 + 5;
            const delay = Math.random() * 1;
            return {
                id: this.batIdCounter++,
                style: `
                    top: ${top}%;
                    left: -10%;
                    transform: scale(${scale});
                    animation-duration: ${duration}s;
                    animation-delay: ${delay}s;
                `
            };
        });

        this.bats = [...this.bats, ...newBats];
        setTimeout(() => {
            this.bats = this.bats.slice(newBats.length);
        }, 8000);
    }

    spawnWitch() {
        if (this.witch) return;

        const top = Math.random() * 33;
        const duration = Math.random() * 6 + 6;

        this.witch = {
            style: `top: ${top}%; left: -10%; animation-duration: ${duration}s;`
        };

        setTimeout(() => {
            this.witch = null;
        }, duration * 1000);
    }

    startJokes() {
        let index = 0;
        this.currentJoke = this.jokes[index];
        setInterval(() => {
            index = (index + 1) % this.jokes.length;
            this.currentJoke = this.jokes[index];
        }, 25000);
    }
}