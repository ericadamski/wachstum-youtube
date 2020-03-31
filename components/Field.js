import React from "react";

export default props => (
  <>
    <div className="field" {...props} />
    <style jsx>{`
      .field {
        display: flex;
        flex-direction: column;
      }
    `}</style>
  </>
);
