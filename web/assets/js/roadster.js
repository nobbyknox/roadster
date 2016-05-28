$(document).ready(function() {

    console.log('Engine running');

    $('#save-button').click(function() {

        nodes.update({ id: $('#node-id').val(), label: $('#node-label').val() });

        $("#network-pop-up").hide('slow');
    });

    $('#cancel-button').click(function() {
        $('#network-pop-up').hide('slow');
    });

    setTimeout(function() {
        bootItUp();
        loadGraph(graph);
    }, 100);
});

var graph = [
    {
        id: 1,
        label: 'Central Management of Products',
        value: 2,
        type: 'square',
        color: 'darkblue',
        dependants: [
            {
                id: 2,
                label: 'Call Cabinet Integration',
                value: 1,
                type: 'ellipse',
                color: 'darkblue',
                font: { color: 'white' }
            },
            {
                id: 3,
                label: 'BIA Fibre',
                value: 1,
                type: 'ellipse',
                color: 'darkblue',
                font: { color: 'white' },
                dependants: [
                    {
                        id: 4,
                        label: 'Fourth project',
                        value: 1,
                        type: 'ellipse',
                        color: 'darkblue',
                        font: { color: 'white' }
                    }
                ]
            },
            {
                id: 5,
                label: 'Voice as a Product',
                value: 1,
                type: 'ellipse',
                color: 'darkblue',
                font: { color: 'white' }
            }
        ]
    },
    {
        id: 8,
        label: 'Nautilus Product',
        value: 2,
        type: 'square',
        color: 'green',
        dependants: [
            {
                id: 7,
                label: 'Nautilus 0.2',
                value: 2,
                type: 'box',
                color: 'green',
                font: { color: 'white' },
                dependants: [
                    {
                        id: 6,
                        label: 'Nautilus 0.1',
                        value: 2,
                        type: 'box',
                        color: 'green',
                        font: { color: 'white' },
                        dependants: [
                            {
                                id: 9,
                                label: 'Time Mode',
                                value: 1,
                                color: 'green',
                                font: { color: 'white' }
                            },
                            {
                                id: 10,
                                label: 'VBX Instance',
                                value: 1,
                                color: 'green',
                                font: { color: 'white' }
                            },
                            {
                                id: 11,
                                label: 'Users',
                                value: 1,
                                color: 'green',
                                font: { color: 'white' }
                            },
                            {
                                id: 12,
                                label: 'Roles',
                                value: 1,
                                color: 'green',
                                font: { color: 'white' }
                            },
                            {
                                id: 13,
                                label: 'Class of Service',
                                value: 1,
                                color: 'green',
                                font: { color: 'white' }
                            }
                        ]
                    },
                    {
                        id: 14,
                        label: 'Extensions',
                        value: 1,
                        color: 'green',
                        font: { color: 'white' }
                    },
                    {
                        id: 15,
                        label: 'Queues',
                        value: 1,
                        color: 'green',
                        font: { color: 'white' }
                    },
                    {
                        id: 16,
                        label: 'Routing',
                        value: 1,
                        color: 'green',
                        font: { color: 'white' }
                    },
                    {
                        id: 17,
                        label: 'Auto Attendant',
                        value: 1,
                        color: 'green',
                        font: { color: 'white' }
                    }
                ]
            }
        ]
    }
];

var nodes;
var edges;
var container;
var network;

function bootItUp() {
    // create an array with nodes
    nodes = new vis.DataSet([]);

    // create an array with edges
    edges = new vis.DataSet([]);

    // create a network
    container = document.getElementById('myroadmap');
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        nodes: {
            // shape: 'dot',
            scaling: {
                label: {
                    min: 8,
                    max: 20
                }
            }
        }
    };

    network = new vis.Network(container, data, options);

    network.on("click", function (params) {
        // console.log(JSON.stringify(params, null, 4));

        $('#node-id').val('');
        $('#node-label').val('');

        if (params.nodes.length > 0) {
            $('#network-pop-up').show();
            $('#node-id').val(params.nodes[0]);

            nodes.forEach(function(item) {
                if (item.id === params.nodes[0]) {
                    $('#node-label').val(item.label);
                }
            });
        }
    });

}

function loadGraph(theGraph) {
    theGraph.forEach(function(item) {
        addNode(item);
    });
}

function addNode(parent) {

    nodes.add({ id: parent.id, value: parent.value, label: parent.label, shape: parent.type, font: (parent.font || null), color: (parent.color || null) });

    if (parent && parent.dependants && parent.dependants.length > 0) {
        parent.dependants.forEach(function(child) {
            addNode(child, parent);
            edges.add({ from: child.id, to: parent.id, arrows:'to', dashes:true });
        });
    }
}
