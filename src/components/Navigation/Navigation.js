import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
    state = {
        is_active: false,
    };

    handleMenuClick = () => {
        this.setState({
            is_active: !this.state.is_active,
        });
    };

    render() {
        return (
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to="/">
                        M
                    </NavLink>

                    <button
                        className={
                            "navbar-burger burger" +
                            (this.state.is_active ? " is-active" : "")
                        }
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbar-links"
                        onClick={this.handleMenuClick}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>

                <div
                    id="navbar-links"
                    className={
                        "navbar-menu" +
                        (this.state.is_active ? " is-active" : "")
                    }
                >
                    <div className="navbar-start">
                        <NavLink to="/albums" className="navbar-item">
                            Saved Albums
                        </NavLink>

                        <NavLink to="/artists" className="navbar-item">
                            Saved Artists
                        </NavLink>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <NavLink
                                    to="/search"
                                    className="button is-light"
                                >
                                    Search
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;
