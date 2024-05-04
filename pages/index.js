import React from 'react';
import AssignmentList from '../components/AssignmentList';  // Adjust the import path as per your project structure

const IndexPage = () => {

    const ids = [
    "bde984b3-7e98-42ad-8650-bd08d9c64473",
  "b1cdace3-479d-4c35-8bf4-9dadc5bdc71a",
  "a983b41f-8b70-4970-8466-c0545ec1d3d0",
  "dc732465-96d5-4230-91b9-f2f9cc5a30a9",
  "cb6393ff-2f29-44c1-91ee-9da296b1edd2",
  "9de29654-bc7a-4552-a367-f438cbd1ce0d"
  ];

  return (
    <div>
      <h1>Assignments Overview</h1>
      <AssignmentList ids={ids} />
    </div>
  );
};

export default IndexPage;
