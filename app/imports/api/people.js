import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

import { Class } from "meteor/jagi:astronomy";

export const People = new Mongo.Collection("people");

export const Person = Class.create({
  name: "Person",
  collection: People,
  fields: {
    first: String,
    last: String
  },
  meteorMethods: {
    update: function() {
      return this.save();
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish("people", function() {
    return People.find();
  });
}
