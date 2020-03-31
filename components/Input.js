import React from "react";

export default props => (
  <>
    <input className="input" {...props} />
    <style jsx>{`
      .input {
        font-size: 1rem;
        border: 2px solid #eaeaea;
        border-radius: var(--border-radius);
        padding: 0.5rem;
      }

      .input:active,
      .input:focus,
      .input:hover {
        outline: none;
        border-color: var(--purple);
      }
    `}</style>
  </>
);
