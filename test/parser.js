var csdl = require('../index');

module.exports.parse = function(assert) {
  var metadata = csdl.parseMetadataFile(__dirname + '/fixtures/SimpleMetadata.xml', {}, function(error, metadata) {
    if(error) {
      console.log(error);
      return;
    }
    assert.equal(Object.keys(metadata).length, 2);
    var schema = metadata['Microsoft.OData.Service.Sample.TrippinInMemory.Models'];
    assert.notEqual(schema, undefined);
    schemaTest(schema, assert);

    assert.done();
  });
}

function schemaTest(schema, assert) {
  assert.equal(Object.keys(schema).length, 27);
  assert.notEqual(schema.Person, undefined);
  assert.equal(schema.Person.constructor.name, 'EntityType');
  assert.deepEqual(schema.Person.Annotations, {});
  assert.deepEqual(schema.Person.Properties.UserName, {Name: 'UserName', Annotations: {}, Type: 'Edm.String', Nullable: false, IsKey: true});
  assert.deepEqual(schema.Person.Properties.FirstName, {Name: 'FirstName', Annotations: {}, Type: 'Edm.String', Nullable: false});
  assert.deepEqual(schema.Person.Properties.LastName, {Name: 'LastName', Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Person.Properties.MiddleName, {Name: 'MiddleName', Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Person.Properties.Gender, {Name: 'Gender', Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.PersonGender', Nullable: false});
  assert.deepEqual(schema.Person.Properties.Age, {Name: 'Age', Annotations: {}, Type: 'Edm.Int64'});
  assert.deepEqual(schema.Person.Properties.Emails, {Name: 'Emails', Annotations: {}, Type: 'Collection(Edm.String)'});
  assert.deepEqual(schema.Person.Properties.AddressInfo, {Name: 'AddressInfo', Annotations: {}, Type: 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location)'});
  assert.deepEqual(schema.Person.Properties.HomeAddress, {Name: 'HomeAddress', Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location'});
  assert.deepEqual(schema.Person.Properties.FavoriteFeature, {Name: 'FavoriteFeature', Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Feature', Nullable: false});
  assert.deepEqual(schema.Person.Properties.Features, {Name: 'Features', Annotations: {}, Type: 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Feature)', Nullable: false});
  assert.deepEqual(schema.Person.Properties.Friends, {Name: 'Friends', Annotations: {}, Type: 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person)'});
  assert.deepEqual(schema.Person.Properties.BestFriend, {Name: 'BestFriend', Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person'});
  assert.deepEqual(schema.Person.Properties.Trips, {Name: 'Trips', Annotations: {}, Type: 'Collection(Microsoft.OData.Service.Sample.TrippinInMemory.Models.Trip)'}); 

  assert.notEqual(schema.Airline, undefined);
  assert.equal(schema.Airline.constructor.name, 'EntityType');
  assert.deepEqual(schema.Airline.Annotations, {});
  assert.deepEqual(schema.Airline.Properties.AirlineCode, {Name: 'AirlineCode', Annotations: {}, Type: 'Edm.String', Nullable: false, IsKey: true});
  assert.deepEqual(schema.Airline.Properties.Name, {Name: 'Name', Annotations: {}, Type: 'Edm.String'});

  assert.notEqual(schema.Airport, undefined);
  assert.equal(schema.Airport.constructor.name, 'EntityType');
  assert.deepEqual(schema.Airport.Annotations, {});
  assert.deepEqual(schema.Airport.Properties.Name, {Name: 'Name', Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Airport.Properties.IcaoCode, {Name: 'IcaoCode', Annotations: {}, Type: 'Edm.String', Nullable: false, IsKey: true});
  assert.deepEqual(schema.Airport.Properties.IataCode, {Name: 'IataCode', Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Airport.Properties.Location, {Name: 'Location', Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.AirportLocation'});

  assert.notEqual(schema.Location, undefined);
  assert.equal(schema.Location.constructor.name, 'ComplexType');
  assert.deepEqual(schema.Location.Annotations, {});
  assert.deepEqual(schema.Location.Properties.Address, {Name: 'Address', Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.Location.Properties.City, {Name: 'City', Annotations: {}, Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.City'});

  assert.notEqual(schema.City, undefined);
  assert.equal(schema.City.constructor.name, 'ComplexType');
  assert.deepEqual(schema.City.Annotations, {});
  assert.deepEqual(schema.City.Properties.Name, {Name: 'Name', Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.City.Properties.CountryRegion, {Name: 'CountryRegion', Annotations: {}, Type: 'Edm.String'});
  assert.deepEqual(schema.City.Properties.Region, {Name: 'Region', Annotations: {}, Type: 'Edm.String'});

  assert.notEqual(schema.AirportLocation, undefined);
  assert.equal(schema.AirportLocation.constructor.name, 'ComplexType');
  assert.deepEqual(schema.AirportLocation.Annotations, {});
  assert.deepEqual(schema.AirportLocation.Properties.Loc, {Name: 'Loc', Annotations: {}, Type: 'Edm.GeographyPoint'});
  assert.equal(schema.AirportLocation.BaseType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location');

  assert.notEqual(schema.EventLocation, undefined);
  assert.equal(schema.EventLocation.constructor.name, 'ComplexType');
  assert.deepEqual(schema.EventLocation.Properties.BuildingInfo, {Name: 'BuildingInfo', Annotations: {}, Type: 'Edm.String'});
  assert.equal(schema.EventLocation.BaseType, 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Location');

  assert.notEqual(schema.ResetDataSource, undefined);
  assert.equal(schema.ResetDataSource.constructor.name, 'Action');
  assert.deepEqual(schema.ResetDataSource.ReturnType, null);
  assert.deepEqual(schema.ResetDataSource.Parameters, {});

  assert.notEqual(schema.UpdatePersonLastName, undefined);
  assert.equal(schema.UpdatePersonLastName.constructor.name, 'Function');
  assert.deepEqual(schema.UpdatePersonLastName.ReturnType, {Type: 'Edm.Boolean', Nullable: false});
  assert.deepEqual(schema.UpdatePersonLastName.Parameters.person, {
    Name: 'person',
    Annotations: {},
    Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person'});
  assert.deepEqual(schema.UpdatePersonLastName.Parameters.lastName, {
    Name: 'lastName',
    Annotations: {},
    Type: 'Edm.String',
    Nullable: false,
    Unicode: false});
  assert.equal(schema.UpdatePersonLastName.IsBound, true);

  assert.notEqual(schema.ShareTrip, undefined);
  assert.equal(schema.ShareTrip.constructor.name, 'Action');
  assert.equal(schema.ShareTrip.ReturnType, null);
  assert.equal(schema.ShareTrip.IsBound, true);
  assert.deepEqual(schema.ShareTrip.Parameters.personInstance, {
    Name: 'personInstance',
    Annotations: {},
    Type: 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person'});
  assert.deepEqual(schema.ShareTrip.Parameters.userName, {
    Name: 'userName',
    Annotations: {},
    Nullable: false, 
    Unicode: false,
    Type: 'Edm.String'});
  assert.deepEqual(schema.ShareTrip.Parameters.tripId, {
    Name: 'tripId',
    Annotations: {},
    Nullable: false, 
    Type: 'Edm.Int32'});

  assert.notEqual(schema.Container, undefined);
  assert.equal(schema.Container.constructor.name, 'EntityContainer');
  assert.equal(schema.Container.People.constructor.name, 'EntitySet');
  assert.equal(schema.Container.Airlines.constructor.name, 'EntitySet');
  assert.equal(schema.Container.Airports.constructor.name, 'EntitySet');
  assert.equal(schema.Container.NewComePeople.constructor.name, 'EntitySet');
  assert.equal(schema.Container.Me.constructor.name, 'Singleton');
  assert.equal(schema.Container.GetPersonWithMostFriends.constructor.name, 'FunctionImport');
  assert.equal(schema.Container.GetNearestAirport.constructor.name, 'FunctionImport');
  assert.equal(schema.Container.ResetDataSource.constructor.name, 'ActionImport');
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
