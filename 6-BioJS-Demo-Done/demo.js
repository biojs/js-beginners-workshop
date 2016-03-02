/**
 * Created by demo on 01/03/2016.
 */


var featureViewer = require("biojs-vis-proteinfeaturesviewer");
var sequenceViewer = require("sequence-viewer");

var fvElement = document.getElementById("features");

var fvInstance = new featureViewer({
    el: fvElement,
    uniprotacc: "Q64437"
});


fvInstance.getDispatcher().on("ready", function (data) {
    var svInstance = new sequenceViewer(fvInstance.sequence);
    svInstance.render("#sequence");
});