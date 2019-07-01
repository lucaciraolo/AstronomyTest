import React, { useState } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { People, Person } from "../api/people";
import { Meteor } from "meteor/meteor";

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <PeopleListContainer />
  </div>
);

const PeopleList = ({ people }) => {
  const [editing, setEditing] = useState();
  return (
    <React.Fragment>
      <h1>People List</h1>
      <ul>
        {people.map(({ _id, first, last }) => (
          <li key={_id} onClick={() => setEditing(_id)}>
            {first} {last}
          </li>
        ))}
      </ul>
      {editing && (
        <EditPersonContainer person_id={editing} setEditing={setEditing} />
      )}
    </React.Fragment>
  );
};

export const PeopleListContainer = withTracker(() => {
  const peopleHandle = Meteor.subscribe("people");

  return {
    people: People.find().fetch()
  };
})(PeopleList);

const EditPerson = ({ person, isLoading, setEditing }) => {
  const [formValues, setFormValues] = useState(person);

  const handleChange = event => {
    setFormValues({
      [event.target.name]: event.target.value
    });
  };

  const saveChanges = () => {
    person.set(formValues);
    person.update();
    setEditing(false);
  };

  return (
    <React.Fragment>
      <h2>Edit {person.first}</h2>
      {!isLoading && (
        <input name="first" value={formValues.first} onChange={handleChange} />
      )}
      <button onClick={saveChanges}>Save</button>
    </React.Fragment>
  );
};

const EditPersonContainer = withTracker(({ person_id }) => {
  const peopleHandle = Meteor.subscribe("people");

  return {
    person: Person.findOne(person_id),
    isLoading: !peopleHandle.ready()
  };
})(EditPerson);
