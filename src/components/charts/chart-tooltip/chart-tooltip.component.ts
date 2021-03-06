import { Component, Input, OnChanges, HostBinding } from '@angular/core';

@Component({
    selector: 'uni-chart-tooltip',
    templateUrl: 'chart-tooltip.component.html',
    styleUrls: ['chart-tooltip.component.scss'],
})
export class UniChartTooltipComponent implements OnChanges {

    @HostBinding('class.uni-chart-tooltip') componentClass = true;
    @Input() tooltip;

    tooltipStyle: any = {};
    tooltipTitles = [];
    tooltipSeries = [];

    ngOnChanges(changes) {
        if (!this.tooltip || this.tooltip.opacity === 0) { this.tooltipStyle.opacity = '0'; return; }
        if (!this.tooltip.body) { return; }

        this.tooltipStyle.opacity = '1';
        this.tooltipStyle.left = this.tooltip.x + 'px';
        this.tooltipStyle.top = this.tooltip.y + 'px';

        this.tooltipTitles = this.tooltip.title || [];
        this.tooltipSeries = [];
        const lines = this.tooltip.body.map(b => b.lines);
        lines.forEach((line, i) => {
            const serie = this.tooltip.labelColors[i];
            serie.label = line;
            this.tooltipSeries.push(serie);
        });
    }

    constructor() { }

}
