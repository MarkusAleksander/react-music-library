import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <NavLink className="navbar-item" to="/">
                M
            </NavLink>

            <button
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbar-links"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        </div>

        <div id="navbar-links" className="navbar-menu">
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
                        <NavLink to="/search" className="button is-light">
                            Search
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

export default Navigation;
