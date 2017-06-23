if (process.env.NG2) {
    var {NgModule, Component, EventEmitter, Inject, Input, Output} = require("@angular/core");
    var {BrowserModule} = require("@angular/platform-browser");
    var {CommonModule} = require("@angular/common");
} else {
    var {NgModule, Component, EventEmitter, Inject, Input, Output} = require("../../../index");
}

module.exports = {
    BrowserModule,
    CommonModule,
    NgModule,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output
};
