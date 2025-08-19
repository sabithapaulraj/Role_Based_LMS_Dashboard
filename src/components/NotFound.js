import React from 'react';

const NotFound = () => (
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'80vh'}}>
    <h1 style={{fontSize:'2.5rem',color:'#007bff'}}>404 - Page Not Found</h1>
    <p style={{fontSize:'1.2rem'}}>Sorry, the page you are looking for does not exist.</p>
    <a href="/" style={{marginTop:'2rem',fontSize:'1.1rem',color:'#007bff',textDecoration:'underline'}}>Go to Home</a>
  </div>
);

export default NotFound;
