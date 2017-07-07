if (process.env.NG2) {
    var {NgModule, Component, EventEmitter, Inject, Input, Output} = require("@angular/core");

    var {BrowserModule} = require("@angular/platform-browser");
    var {CommonModule} = require("@angular/common");
    var UIRouterModule: any = [];
} else {
    var {NgModule, Component, EventEmitter, Inject, Input, Output} = require("../../../index");

    var BrowserModule: any = [];
    var CommonModule: any = [];
    var UIRouterModule: any = "ui.router";
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
