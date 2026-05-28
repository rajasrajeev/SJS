import React, { useContext } from 'react';
import { DirectionContext } from '../../contexts/DirectionContext';

const PageTitle = ({ title, subtitle, iname }) => {
  const { direction } = useContext(DirectionContext);

  return (
    <div style={{marginBottom: "20px"}}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          disabled
          style={{
            paddingLeft: '7px',
            paddingTop: '4px',
            backgroundColor: 'var(--primary-color)',
            width: '30px',
            height: '30px',
            borderRadius: '5px',
            border: 'none',
            marginRight: direction === 'ltr' ? '10px': '0px',
            marginLeft: direction === 'rtl' ? '10px': '0px',
          }}
        >
          <i className={iname} style={{ color: '#fff' }}></i>
        </div>
        <p
          style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            marginBottom: '0px',
            display: 'inline',
          }}
        >
          {title}
        </p>
      </div>
      {subtitle && (
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            marginTop: '5px',
            color: 'var(--text-color-light)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
