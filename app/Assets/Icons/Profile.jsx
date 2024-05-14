import React from 'react'

function Profile() {
  return (
    <svg 
      version="1.1" 
      width="49" 
      height="49"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="circular-border">
          <circle cx="300" cy="300" r="280" />
        </clipPath>
        <clipPath id="avoid-antialiasing-bugs">
          <rect width="100%" height="498" />
        </clipPath>
      </defs>
      <circle cx="300" cy="300" r="280" fill="black" clipPath="url(#avoid-antialiasing-bugs)" />
      <circle cx="300" cy="230" r="115" />
      <circle cx="300" cy="550" r="205" clipPath="url(#circular-border)" />
    </svg>
  );
}

export default Profile;
