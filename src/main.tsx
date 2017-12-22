import * as React from "react";
import { render } from "react-dom";
import Switch from "antd/lib/switch";
require("antd/dist/antd.min.css");


class Main extends React.PureComponent {
    render(){
        return (
            <div>
                <Switch checked={true} />
            </div>
        )
    }
}

render(<Main />, document.getElementById("container"))

