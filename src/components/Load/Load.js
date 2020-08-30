import React, { Component } from "react";

class Load extends Component {
    componentDidMount() {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log("[Load:entries:forEach]");
                const { isIntersecting } = entry;

                if (isIntersecting) {
                    this.props.onIntersect();
                }
            });
        }, {});

        observer.observe(this.element);
    }

    render() {
        return <div ref={(el) => (this.element = el)}></div>;
    }
}

export default Load;
