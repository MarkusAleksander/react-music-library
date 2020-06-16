import React from "react";
import Auxillary from "./../../hoc/Auxillary";

const layout = (props) => (
    <Auxillary>
        <main>{props.children}</main>
    </Auxillary>
);

export default layout;
