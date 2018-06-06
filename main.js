import React from 'react';
import { render } from 'react-dom';
import Card from './src/js/card.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toOrganCoverVizCard = function() {
    this.cardType = 'toOrganCoverVizCard';
}

ProtoGraph.Card.toOrganCoverVizCard.prototype.init = function(options) {
    this.options = options;
}

ProtoGraph.Card.toOrganCoverVizCard.prototype.getData = function(data) {
    return this.containerInstance.exportData();
}

ProtoGraph.Card.toOrganCoverVizCard.prototype.renderCol16 = function(data) {
    this.mode = 'col16';
    this.render();
}
ProtoGraph.Card.toOrganCoverVizCard.prototype.renderCol4 = function(data) {
    this.mode = 'col4';
    this.render();
}

ProtoGraph.Card.toOrganCoverVizCard.prototype.renderScreenshot = function(data) {
    this.mode = 'screenshot';
    this.render();
}

ProtoGraph.Card.toOrganCoverVizCard.prototype.render = function() {
    render( <
        Card selector = { this.options.selector }
        dataURL = { this.options.data_url }
        schemaURL = { this.options.schema_url }
        siteConfigURL = { this.options.site_config_url }
        mode = { this.mode }
        ref = {
            (e) => {
                this.containerInstance = this.containerInstance || e;
            }
        }
        />,
        this.options.selector);
}