public with sharing class AccountTriggerHandler {

    public static void handleAfterInsert(List<Account> newAccounts) {
        List<Contact> contactsToInsert = new List<Contact>();
        List<Opportunity> oppsToInsert = new List<Opportunity>();

        for (Account acc : newAccounts) {
            Contact c = new Contact(
                LastName = acc.Name + ' Primary Contact',
                AccountId = acc.Id,
                Email = 'primary@' + acc.Name.replaceAll('\\s','').toLowerCase() + '.com'
            );
            contactsToInsert.add(c);

            Opportunity o = new Opportunity(
                Name = 'Initial Opportunity - ' + acc.Name,
                AccountId = acc.Id,
                StageName = 'Prospecting',
                CloseDate = Date.today().addDays(30),
                Amount = 10000
            );
            oppsToInsert.add(o);
        }

        if (!contactsToInsert.isEmpty()) insert contactsToInsert;
        if (!oppsToInsert.isEmpty()) insert oppsToInsert;
    }
}
