import React, { Component } from "react";

/**
 * Component that alerts if you click outside of it
 */
export default class withClickOutside  extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            alert("You clicked outside of me!");
        }
    }

    render() {
        return <div ref={this.wrapperRef}>{this.props.children}</div>;
    }
}