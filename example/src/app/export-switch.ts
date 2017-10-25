if (process.env.NG2) {
    var {NgModule, Component, EventEmitter, Inject, Input, Output} = require("@angular/core");

    var BrowserModule = [require("@angular/platform-browser").BrowserModule] as any;
    var CommonModule = [require("@angular/common").CommonModule] as any;
    var UIRouterModule = [] as any;
} else {
    var {NgModule, Component, EventEmitter, Inject, Input, Output} = require("../../../core");

    var BrowserModule = [] as any;
    var CommonModule = [] as any;
    var UIRouterModule = ["ui.router"] as any;
}

module.exports = {
    UIRouterModule,

    BrowserModule,
    CommonModule,

    NgModule,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output
};
