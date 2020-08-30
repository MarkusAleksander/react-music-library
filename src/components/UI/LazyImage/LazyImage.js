import React, { Component } from "react";

class LazyImage extends Component {
    componentDidMount() {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // console.log("[checking entries...]");
                const { isIntersecting } = entry;

                if (isIntersecting) {
                    this.element.src = this.props.src;
                    observer = observer.disconnect();
                }
            });
        }, {});

        observer.observe(this.element);
    }

    render() {
        return (
            <img
                height={this.props.height}
                width={this.props.width}
                alt={this.props.alt ? this.props.alt : ""}
                ref={(el) => (this.element = el)}
            />
        );
    }
}

export default LazyImage;
