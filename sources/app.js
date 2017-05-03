import _ from "lodash";
import Vue from "vue";
import VueRouter from "vue-router";
import "./parts/test.scss";
import test from "./parts/test.js"

var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!"
  }
});

test();