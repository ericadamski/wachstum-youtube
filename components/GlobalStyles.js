import React from "react";

export default ({ children }) => (
  <>
    {children}
    <style global jsx>{`
      :root {
        --foreground: #000000;
        --background: #ffffff;
        --primary: #6bc3b9;
        --secondary: #ffc12f;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: var(--primary);
      }

      body,
      html {
        box-sizing: border-box;
      }

      * > * {
        box-sizing: border-box;
      }
    `}</style>
  </>
);
