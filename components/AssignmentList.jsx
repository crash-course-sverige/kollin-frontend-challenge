import AssignmentItem from './AssignmentItem'; // If AssignmentItem is a separate file

const AssignmentList = ({ ids =[]}) => {
    console.log("IDs passed to AssignmentList:", ids); // Debugging line to check IDs
    return (
      <div>
        <h1>Assignments</h1>
        {ids.map(id => (
          <AssignmentItem key={id} id={id} />
        ))}
      </div>
    );
};
export default AssignmentList;
