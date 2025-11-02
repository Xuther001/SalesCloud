import { LightningElement, api } from 'lwc';

export default class ReminderBanner extends LightningElement {
    @api message = 'This is your scrolling reminder text! Or it can just be a simple message to all employees!';
}
