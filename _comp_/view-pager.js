import { AnimatedView, View, Frame, ViewPager, Track } from "react-view-pager";
import { Component } from "react";
class ProgressView extends Component {
    render() {
        return (React.createElement(View, Object.assign({ className: "view" }, this.props),
            React.createElement(AnimatedView, { animations: [
                    {
                        prop: 'opacity',
                        stops: [[-200, 0], [0, 1], [200, 0]]
                    },
                    {
                        prop: 'translateY',
                        stops: [[-200, 50], [0, 0], [200, 50]]
                    }
                ] }, this.props.children)));
    }
}
const ProgressBar = ({ progress }) => (React.createElement("div", { className: "progress-container" },
    React.createElement("div", { className: "progress-bar", style: { transform: `scaleX(${Math.max(0, Math.min(1, progress))})`, } })));
const colors = ['#209D22', '#106CCC', '#C1146B', '#11BDBF', '#8A19EA'];
const ProgressPage = ({ view, index, onClick }) => (React.createElement(AnimatedView, { key: index, index: index, animations: [
        {
            prop: 'scale',
            stops: [
                [-300, 0.75],
                [0, 1],
                [300, 0.75]
            ]
        }, {
            prop: 'opacity',
            stops: [[-300, 0.5], [0, 1], [300, 0.5]]
        }, {
            prop: 'backgroundColor',
            stops: [[-300, '#cccccc'], [0, colors[index]], [300, '#cccccc']]
        }
    ], className: "page", onClick: e => { onClick(e); } }));
class ProgressExample extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            views: [1, 2, 3, 4],
            currentView: 2,
            progress: 0,
        };
        this._handleScroll = (progress, trackPosition) => {
            this.setState({ progress });
        };
    }
    render() {
        const { views, currentView, progress } = this.state;
        return (React.createElement(ViewPager, { className: "viewport" },
            React.createElement(Frame, { ref: c => this.frame = c, className: "frame" },
                React.createElement(Track, { currentView: currentView, onScroll: this._handleScroll, onViewChange: currentIndicies => { this.setState({ currentView: currentIndicies[0] }); }, className: "track" }, views.map((view, index) => React.createElement(ProgressView, { key: `page-${index}`, children: view })))),
            React.createElement(ProgressBar, { progress: progress }),
            React.createElement("nav", { className: "pager" }, views.map((view, index) => React.createElement(ProgressPage, { key: view, view: view, index: index, onClick: () => this.setState({ currentView: `page-${index}` }) })))));
    }
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [[500, 350], [800, 600], [800, 400], [700, 500], [200, 650], [600, 600]],
            activeIndex: 0,
            viewsToShow: 1
        };
    }
    render() {
        const { images, activeIndex, size, viewsToShow } = this.state;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("button", { onClick: () => this.slider.prev() }, "Prev"),
                React.createElement("input", { type: "range", min: 0, max: 3, value: +activeIndex, onChange: e => this.setState({
                        activeIndex: +e.target.value
                    }) }),
                React.createElement("button", { onClick: () => this.slider.next() }, "Next"),
                React.createElement("label", null, "Views To Show"),
                React.createElement("input", { type: "range", min: 1, max: 3, value: +viewsToShow, onChange: e => this.setState({
                        viewsToShow: +e.target.value
                    }) })),
            "current view: ",
            activeIndex + 1,
            React.createElement(ViewPager, null,
                React.createElement(Frame, { autoSize: "height", className: "frame" },
                    React.createElement(Track, { ref: c => this.slider = c, currentView: activeIndex, viewsToShow: viewsToShow, contain: true, onViewChange: currentIndicies => { this.setState({ activeIndex: currentIndicies[0] }); }, className: "track" },
                        React.createElement(View, { className: "view", style: { width: size ? size : 500, height: 100 } },
                            "1 ",
                            React.createElement("button", null, "button")),
                        React.createElement(View, { className: "view", style: { width: size ? size : 175, height: 200 } },
                            "2 ",
                            React.createElement("button", null, "button")),
                        React.createElement(View, { className: "view", style: { width: size ? size : 315, height: 300 } },
                            "3 ",
                            React.createElement("button", null, "button")),
                        React.createElement(View, { className: "view", style: { width: size ? size : 125, height: 125 } },
                            "4 ",
                            React.createElement("button", null, "button"))))),
            React.createElement("h1", { className: "center" }, "Y Axis"),
            React.createElement(ViewPager, null,
                React.createElement(Frame, { autoSize: true, className: "frame" },
                    React.createElement(Track, { ref: c => this.track = c, axis: "y", className: "track track-y" },
                        React.createElement(View, { className: "view" }, "1"),
                        React.createElement(View, { className: "view" }, "2"),
                        React.createElement(View, { className: "view" }, "3"),
                        React.createElement(View, { className: "view" }, "4"))),
                React.createElement("div", { style: { textAlign: 'center' } },
                    React.createElement("button", { onClick: () => this.track.scrollTo(0) }, "1"),
                    React.createElement("button", { onClick: () => this.track.scrollTo(1) }, "2"),
                    React.createElement("button", { onClick: () => this.track.scrollTo(2) }, "3"),
                    React.createElement("button", { onClick: () => this.track.scrollTo(3) }, "4"))),
            React.createElement("h1", { className: "center" }, "Infinite"),
            React.createElement(ViewPager, null,
                React.createElement(Frame, { className: "frame" },
                    React.createElement(Track, { viewsToShow: 2, infinite: true, className: "track" },
                        React.createElement(View, { className: "view" }, "1"),
                        React.createElement(View, { className: "view" }, "2"),
                        React.createElement(View, { className: "view" }, "3"),
                        React.createElement(View, { className: "view" }, "4")))),
            React.createElement("h1", { className: "center" }, "Align"),
            React.createElement(ViewPager, null,
                React.createElement(Frame, { className: "frame" },
                    React.createElement(Track, { viewsToShow: "auto", align: 0.5 },
                        React.createElement(View, { className: "view", style: { width: size ? size : 200 } }, "1"),
                        React.createElement(View, { className: "view", style: { width: size ? size : 175 } }, "2"),
                        React.createElement(View, { className: "view", style: { width: size ? size : 315 } }, "3"),
                        React.createElement(View, { className: "view", style: { width: size ? size : 125 } }, "4")))),
            React.createElement("h1", { className: "center" }, "Images"),
            React.createElement(ViewPager, null,
                React.createElement(Frame, { className: "frame" },
                    React.createElement(Track, { viewsToShow: "auto", align: 0.5, className: "track" },
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/300/200?image=10" }),
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/450/200?image=20" }),
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/200/200?image=30" }),
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/250/200?image=40" }),
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/375/200?image=50" })))),
            React.createElement("h1", { className: "center" }, "Animations"),
            React.createElement(ViewPager, null,
                React.createElement(Frame, { style: { margin: '0 auto', outline: 0 } },
                    React.createElement(Track, { viewsToShow: "auto", align: 0.5, animations: animations },
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/200/200?image=10" }),
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/200/200?image=20" }),
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/200/200?image=30" }),
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/200/200?image=40" }),
                        React.createElement(View, { tag: "img", src: "http://lorempixel.com/200/200?image=50" })))),
            React.createElement("h1", { className: "center" }, "Progress"),
            React.createElement(ProgressExample, null)));
    }
}
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/_comp_/view-pager.js.map