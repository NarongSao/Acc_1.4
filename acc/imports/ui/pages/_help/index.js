// Declare template
var indexTpl = Template.acc_help;

indexTpl.onCreated(function () {
});

indexTpl.onRendered(function () {
    $('body').scrollspy({
        target: '.bs-docs-sidebar',
        offset: 40
    });
});

indexTpl.events({
});
