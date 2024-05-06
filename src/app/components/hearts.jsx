import React from 'react';
import { useAssignment } from '../context/AssignmentProvider';

const Hearts = () => {
  const { hearts } = useAssignment();

  return (
    <div className="mt-[-.75rem]">
      <p className="text-red-500 text-[2rem]">
        <span>♥</span> {hearts}
      </p>
    </div>
  );
};

export default Hearts;
