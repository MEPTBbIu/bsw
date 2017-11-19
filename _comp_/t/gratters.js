import * as React from 'react';
import './gratters.scss';
class Gratters extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }
    render() {
        return (React.createElement("div", null, this.props.children));
    }
}
export default Gratters;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/components/gratters/gratters.js.map