define(["require", "exports", 'foundation'], function (require, exports) {
    "use strict";
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .developmentLogging();
        aurelia.start().then(function (a) { return a.setRoot(); })
            .then(function (a) {
            $(document).bootstrap();
        });
    }
    exports.configure = configure;
});
//# sourceMappingURL=main.js.map