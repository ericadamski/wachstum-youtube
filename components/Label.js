import React from "react";
import Emoji from "./Emoji";

export default props => (
  <>
    <div className="label-group">
      <label className="label" {...props} />
      {props.error && (
        <>
          <Emoji style={{ margin: "0 0.25rem" }}>-</Emoji>{" "}
          <span className="error">is {props.error}</span>
        </>
      )}
    </div>
    {props.help && <p className="label__help">{props.help}</p>}
    <style jsx>{`
      .label {
        font-weight: bold;
      }

      .label__help {
        font-size: 0.75rem;
        color: grey;
        padding: 0;
        margin: 0;
      }

      .label-group {
        display: flex;
        align-items: center;
        font-size: 1.125rem;
      }

      .error {
        color: var(--error);
      }
    `}</style>
  </>
);
