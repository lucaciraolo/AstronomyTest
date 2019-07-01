import { Meteor } from "meteor/meteor";
import { People, Person } from "../imports/api/people";

Meteor.startup(() => {
  if (People.find().count() === 0) {
    const person1 = new Person({
      first: "TestFirst1",
      last: "TestLast1"
    });
    person1.save();

    const person2 = new Person({
      first: "TestFirst2",
      last: "TestLast2"
    });
    person2.save();
  }
});
