public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static Map<String, List<Map<String, Object>>> getOpportunitiesByTimeframe() {
        Date today = Date.today();

        List<Opportunity> opps = [
            SELECT Id, Name, StageName, Amount, CloseDate
            FROM Opportunity
            WHERE CloseDate != NULL
            ORDER BY CloseDate ASC
        ];

        Map<String, List<Map<String, Object>>> buckets = new Map<String, List<Map<String, Object>>>{
            'Within 2 Weeks' => new List<Map<String, Object>>(),
            'Over 2 Weeks to 1 Month' => new List<Map<String, Object>>(),
            'Over 1 month to 3 Months' => new List<Map<String, Object>>(),
            'Over 3 months to 6 Months' => new List<Map<String, Object>>()
        };

        for (Opportunity opp : opps) {
            Integer daysRemaining = today.daysBetween(opp.CloseDate);

            String monthStr = opp.CloseDate.month() < 10 ? '0' + opp.CloseDate.month() : String.valueOf(opp.CloseDate.month());
            String dayStr   = opp.CloseDate.day()   < 10 ? '0' + opp.CloseDate.day()   : String.valueOf(opp.CloseDate.day());
            String closeDateStr = opp.CloseDate.year() + '-' + monthStr + '-' + dayStr;

            Map<String, Object> oppMap = new Map<String, Object>{
                'Id' => opp.Id,
                'opportunityName' => opp.Name,
                'opportunityLink' => '/' + opp.Id,
                'StageName' => opp.StageName,
                'DaysRemaining' => daysRemaining,
                'Amount' => opp.Amount,
                'CloseDate' => closeDateStr
            };

            if (daysRemaining > 90 && daysRemaining <= 180) {
                buckets.get('Over 3 months to 6 Months').add(oppMap);
            } else if (daysRemaining > 30 && daysRemaining <= 90) {
                buckets.get('Over 1 month to 3 Months').add(oppMap);
            } else if (daysRemaining > 14 && daysRemaining <= 30) {
                buckets.get('Over 2 Weeks to 1 Month').add(oppMap);
            } else if (daysRemaining >= 0 && daysRemaining <= 14) {
                buckets.get('Within 2 Weeks').add(oppMap);
            }
        }

        return buckets;
    }

    @AuraEnabled(cacheable=true)
    public static Decimal getMonthlyAwardedTotal() {
        Date firstDay = Date.newInstance(Date.today().year(), Date.today().month(), 1);
        Date lastDay = firstDay.addMonths(1).addDays(-1);

        AggregateResult[] results = [
            SELECT SUM(Amount) total
            FROM Opportunity
            WHERE StageName = 'Closed Won'
            AND CloseDate >= :firstDay
            AND CloseDate <= :lastDay
        ];

        Decimal total = (results.size() > 0 && results[0].get('total') != null)
            ? (Decimal)results[0].get('total')
            : 0;
        return total;
    }
}
