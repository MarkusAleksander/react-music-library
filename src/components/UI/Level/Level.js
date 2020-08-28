import React from "react";

const Level = (props) => {
    let left_content = props.level_left_content
        ? props.level_left_content.map((content, idx) => {
              return (
                  <div className="level-item" key={idx}>
                      {content}
                  </div>
              );
          })
        : null;

    let right_content = props.level_right_content
        ? props.level_right_content.map((content, idx) => {
              return (
                  <div className="level-item" key={idx}>
                      {content}
                  </div>
              );
          })
        : null;

    return (
        <div className="level is-mobile">
            <div className="level-left">{left_content}</div>
            <div className="level-right">{right_content}</div>
        </div>
    );
};

export default Level;
