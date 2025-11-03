@IsTest
private class OpportunityControllerTest {

    @IsTest
    static void testGetOpportunitiesByTimeframe() {
        List<Opportunity> opps = new List<Opportunity>{
            new Opportunity(
                Name = 'Opportunity Within 2 Weeks',
                StageName = 'Prospecting',
                CloseDate = Date.today().addDays(7),
                Amount = 1000
            ),
            new Opportunity(
                Name = 'Opportunity 2 Weeks to 1 Month',
                StageName = 'Qualification',
                CloseDate = Date.today().addDays(20),
                Amount = 2000
            ),
            new Opportunity(
                Name = 'Opportunity 1 to 3 Months',
                StageName = 'Proposal',
                CloseDate = Date.today().addDays(60),
                Amount = 3000
            ),
            new Opportunity(
                Name = 'Opportunity 3 to 6 Months',
                StageName = 'Negotiation',
                CloseDate = Date.today().addDays(120),
                Amount = 4000
            )
        };
        insert opps;

        Test.startTest();
        Map<String, List<Map<String, Object>>> result = OpportunityController.getOpportunitiesByTimeframe();
        Test.stopTest();

        System.assertNotEquals(null, result, 'Result should not be null');

        System.assert(result.containsKey('Within 2 Weeks'), 'Result should contain Within 2 Weeks bucket');
        System.assert(result.containsKey('Over 2 Weeks to 1 Month'), 'Result should contain Over 2 Weeks to 1 Month bucket');
        System.assert(result.containsKey('Over 1 month to 3 Months'), 'Result should contain Over 1 month to 3 Months bucket');
        System.assert(result.containsKey('Over 3 months to 6 Months'), 'Result should contain Over 3 months to 6 Months bucket');

        System.assertEquals('Opportunity Within 2 Weeks', result.get('Within 2 Weeks')[0].get('opportunityName'));
        System.assertEquals('Opportunity 2 Weeks to 1 Month', result.get('Over 2 Weeks to 1 Month')[0].get('opportunityName'));
        System.assertEquals('Opportunity 1 to 3 Months', result.get('Over 1 month to 3 Months')[0].get('opportunityName'));
        System.assertEquals('Opportunity 3 to 6 Months', result.get('Over 3 months to 6 Months')[0].get('opportunityName'));
    }

    @IsTest
    static void testGetMonthlyAwardedTotal() {
        Date firstDay = Date.newInstance(Date.today().year(), Date.today().month(), 1);
        Date midMonth = firstDay.addDays(10);
        Date nextMonth = firstDay.addMonths(1).addDays(5);

        Opportunity oppCurrentMonth = new Opportunity(
            Name = 'Closed Won This Month',
            StageName = 'Closed Won',
            CloseDate = midMonth,
            Amount = 50000
        );

        Opportunity oppNextMonth = new Opportunity(
            Name = 'Closed Won Next Month',
            StageName = 'Closed Won',
            CloseDate = nextMonth,
            Amount = 99999
        );

        insert new List<Opportunity>{ oppCurrentMonth, oppNextMonth };

        Test.startTest();
        Decimal total = OpportunityController.getMonthlyAwardedTotal();
        Test.stopTest();

        System.assertNotEquals(null, total, 'Total should not be null');
        System.assertEquals(50000, total, 'Should only include Closed Won opportunities within the current month');
    }
}
