'use client';
import React from 'react';
import Button from '../form/Button';

const Logout = () => {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'GET' });
    window.location.href = '/';
  };

  return (
    <div className="w-full flex justify-end pr-4">
      <Button type="submit" onClick={handleLogout} className="w-40">
        Logout
      </Button>
    </div>
  );
};

export default Logout;
