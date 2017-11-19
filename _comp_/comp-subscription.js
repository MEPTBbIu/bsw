import * as React from "react";
function withSubscription(WrappedComponent, selectData) {
    const DataSource = {};
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            };
        }
        componentDidMount() {
            DataSource.addChangeListener(this.handleChange);
        }
        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }
        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }
        render() {
            return React.createElement(WrappedComponent, Object.assign({ data: this.state.data }, this.props));
        }
    };
}
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/_comp_/comp-subscription.js.map