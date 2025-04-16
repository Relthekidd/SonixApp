import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      <p className="mb-6 text-lg text-muted-foreground">Looks like you hit a wrong turn.</p>
      <Link to="/explore" className="text-primary underline">
        Go back to Explore
      </Link>
    </div>
  );
};

export default NotFound;
