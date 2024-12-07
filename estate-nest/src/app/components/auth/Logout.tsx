'use client';
import React from 'react';
import Button from '../form/Button';

const Logout = () => {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'GET' });
    window.location.href = '/';
  };

  return (
    <div>
      <Button type="submit" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
