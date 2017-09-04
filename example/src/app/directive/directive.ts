const {Directive} = require("../export-switch");

@Directive({
    selector: "[ng-shift-directive"
})
export class NgShiftDirective {

    constructor(
        public $scope: any,
        private $element: any,
        private $attrs: any,
        private $compile: any,
        private $timeout: any,
        private $document: any,
        private digestExtension: any
    ) {
    }
}
