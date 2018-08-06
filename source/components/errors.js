import React from 'react';

export const Errors = ({ errors }) => (
    <div>
      {errors.map(e => <span className="error" key={e}>{e}</span>)}
    </div>
);
