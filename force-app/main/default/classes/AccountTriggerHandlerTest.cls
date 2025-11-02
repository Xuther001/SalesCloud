@isTest
private class AccountTriggerHandlerTest {

    @isTest
    static void testAfterInsertCreatesRecords() {
        List<Account> accList = new List<Account>();
        for (Integer i = 0; i < 3; i++) {
            accList.add(new Account(Name = 'Test Account ' + i));
        }

        insert accList;

        List<Contact> contacts = [SELECT Id, AccountId FROM Contact WHERE AccountId IN :accList];
        List<Opportunity> opps = [SELECT Id, AccountId FROM Opportunity WHERE AccountId IN :accList];

        System.assertEquals(3, contacts.size(), 'Each Account should have one Contact.');
        System.assertEquals(3, opps.size(), 'Each Account should have one Opportunity.');
    }
}
