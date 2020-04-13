import React from "react";

export default props => (
  <>
    <button className="btn" disabled={props.loading} {...props}>
      {props.children} {props.loading && " - loading ..."}
    </button>
    <style jsx>{`
      .btn {
        color: var(--foreground);
        background: transparent;
        border: 2px solid
          ${props.transparent
            ? "transparent"
            : `var(${props.color ?? "--primary"})`};
        border-radius: var(--border-radius);
        padding: 0.5rem 1rem;
        font-weight: bold;
        box-shadow: 0 0 0 0 transparent;
        transition: background 0.1s ease, color 0.1s ease;
      }

      .btn:disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      .btn:focus,
      .btn:active,
      .btn:hover {
        outline: none;
        background: var(--primary);
        color: var(--background);
      }
    `}</style>
  </>
);
