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
        --error: #ff0033;
        --font: "Poppins", sans-serif;
        --border-radius: 0.25rem;
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
        font-family: var(--font);
      }

      * > * {
        box-sizing: border-box;
      }

      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: local("Poppins Light"), local("Poppins-Light"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2)
            format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local("Poppins Medium"), local("Poppins-Medium"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2)
            format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local("Poppins Bold"), local("Poppins-Bold"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2)
            format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `}</style>
  </>
);
