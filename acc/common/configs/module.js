Module = typeof Module === 'undefined' ? {} : Module;

Module.Acc = {
    name: 'Accounting System',
    version: '2.0.0',
    summary: 'Accounting Management System is ...',
    roles: [
        'setting',
        'data-insert',
        'data-update',
        'data-remove',
        'reporter'
    ],
    dump: {
        setting: [
            'accAccountType',
            'accChartAccount',
            'accChartAccountNBC',
            'acc_currency',
            'acc_exchangeNBC',
            'accMapNBCBalance',
            'accMapNBCIncome',
            'accMapNBCBalanceKH',
            'accMapNBCIncomeKH',
            'accMapClosing',
            'accMapFixAsset',
            'core_exchange'
        ],
        data: [
            'accJournal',
            'accCloseChartAccount',
            'accDateEndOfProcess',
            'accFixAssetDep',
            'accFixAssetExpense',
            'acc_netIncome'
        ]
    }
};
