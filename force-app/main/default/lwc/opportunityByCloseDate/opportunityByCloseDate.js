import { LightningElement, track, wire } from 'lwc';
import getOpportunitiesByTimeframe from '@salesforce/apex/OpportunityController.getOpportunitiesByTimeframe';

export default class OpportunityCalendar extends LightningElement {
    @track calendarMonths = [];
    @track buckets = [];
    @track error = '';

    columns = [
        {
            label: 'Opportunity Name',
            fieldName: 'opportunityLink',
            type: 'url',
            typeAttributes: { label: { fieldName: 'opportunityName' }, target: '_blank' }
        },
        { label: 'Stage', fieldName: 'StageName', type: 'text' },
        { label: 'Days Remaining', fieldName: 'DaysRemaining', type: 'number' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' },
        { label: 'Close Date', fieldName: 'CloseDate', type: 'text' }
    ];

    @wire(getOpportunitiesByTimeframe)
    wiredOpportunities({ error, data }) {
        if (data) {
            const allOpps = [];
            Object.keys(data).forEach(bucket => {
                data[bucket].forEach(opp => {
                    let oppCopy = { ...opp };
                    const daysRemaining = parseInt(oppCopy.DaysRemaining, 10);
                    if (daysRemaining >= 0 && daysRemaining <= 14) oppCopy.bucketClass = 'within2Weeks';
                    else if (daysRemaining > 14 && daysRemaining <= 30) oppCopy.bucketClass = 'twoWeeksTo1Month';
                    else if (daysRemaining > 30 && daysRemaining <= 90) oppCopy.bucketClass = 'oneTo3Months';
                    else if (daysRemaining > 90 && daysRemaining <= 180) oppCopy.bucketClass = 'threeTo6Months';
                    allOpps.push(oppCopy);
                });
            });

            const today = new Date();
            const months = [today, new Date(today.getFullYear(), today.getMonth() + 1, 1)];
            this.calendarMonths = months.map(monthDate => {
                let monthObj = this.buildMonth(monthDate, allOpps);
                monthObj.isExpanded = false;
                monthObj.toggleIndicator = '▼';
                return monthObj;
            });

            this.buckets = Object.keys(data).map(key => ({
                timeframe: key,
                records: [...data[key]]
            }));

            this.error = '';
        } else if (error) {
            this.error = error.body ? error.body.message : JSON.stringify(error);
            this.calendarMonths = [];
            this.buckets = [];
        }
    }

    buildMonth(date, opportunities) {
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const weeks = [];
        let week = [];
        let weekCounter = 0;

        for (let i = 0; i < firstDay.getDay(); i++) week.push({ day: null, opportunities: [] });

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayDate = new Date(year, month, day);
            const dayStr = dayDate.toISOString().slice(0, 10);
            const dayOpps = opportunities.filter(opp => opp.CloseDate === dayStr);
            week.push({ day, opportunities: dayOpps });

            if (week.length === 7) {
                weeks.push({ weekIndex: weekCounter++, days: [...week] });
                week = [];
            }
        }

        if (week.length > 0) {
            while (week.length < 7) week.push({ day: null, opportunities: [] });
            weeks.push({ weekIndex: weekCounter++, days: [...week] });
        }

        return { monthName: date.toLocaleString('default', { month: 'long', year: 'numeric' }), weeks };
    }

    toggleMonth(event) {
        const monthName = event.currentTarget.querySelector('strong').textContent;
        this.calendarMonths = this.calendarMonths.map(month => {
            if (month.monthName === monthName) {
                const isExpanded = !month.isExpanded;
                return { ...month, isExpanded, toggleIndicator: isExpanded ? '▼' : '►' };
            }
            return month;
        });
    }
}
