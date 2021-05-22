// Write a function that will build the metadata for a single sample. 
function buildMetadata(sample) {
// - extract the metadata from the json
d3.json("samples.json").then((data) => {
    var metadata =data.metadata;
// - filter the metadata for the sample id
var resultArray = metadata.filter (sampleObj =>sampleObj.id == sample);
var result =resulArray [0];
console.log ( )
// - update the metadata html elements
// - clear any existing metadata in the metadata html elements
// - append hew header tags for each key-value pair in the filtered metadata
var PANEL = d3.select("#sample-metadata");
PANEL.html("");
Object.entries(result).forEach(([key, value]) => {
    PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
});
});
}
// Write a function that will build the charts for a single sample. It should do the following:
// - loop over the samples.json file with d3.json().then()
// - extract the samples from the json
// - filter the samples for the sample id
// - extract the ids, labels, and values from the filtered result
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
// - build a bubble chart and plot with Plotly.newPlot()
var bubbleLayout ={
titile : "Number of Bacteria for each Sample",
margin: { t: 0 },
hovermode: "closest",
xaxis: { title: "OTU ID" },
margin: { t: 30}
};
var bubbleData = [
{
  x: otu_ids,
  y: sample_values,
  text: otu_labels,
  mode: "markers",
  marker: {
    size: sample_values,
    color: otu_ids,
    colorscale: "Earth"
  }
} 
];

Plotly.newPlot("bubble", bubbleData, bubbleLayout);

var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
var barData = [
  {
    y: yticks,
    x: sample_values.slice(0, 10).reverse(),
    text: otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h",
  }
];

// - build a bar chart and plot with Plotly.newPlot()
var barLayout ={
    titile : " Top ten Bacteria",
    margin : {t :40 , l:200}
};
Plotly.newPlot("bar", barData, barLayout);
});
}


// Write a function called init() that will populate the charts/metadata and elements on the page. It should do the following:
// - loop over the samples.json data to append the .name attribute into the value of an option HTML tag (lookup HTML documentation on dropdown menus)

// - call your two functions to build the metadata and build the charts on the first sample, so that new visitors see some data/charts before they select something from the dropdown
function init() {
// - select the dropdown element in the page
    var selector = d3.select ("#selDataset");
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
    
        sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
// - extract the first sample from the data
var firstSample = sampleNames[0];
buildCharts(firstSample);
buildMetadata(firstSample);
});
}

// Write a function called optionChanged() that takes a new sample as an argument. It should do the following:
// - call your two functions to build the metadata and build the charts on the new sample
// Look at line 30 of index.html: that is the event listener that will call this function when someone selects something on the dropdown
function optionChanged(newSample) {
buildCharts(newSample);
buildMetadata(newSample);
};
// Initialize the dashboard by calling your init() function
init();