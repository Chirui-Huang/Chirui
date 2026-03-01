/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_");
  
  if (!collection) {
    return;
  }

  // Update collection permissions
  unmarshal({
    "createRule": "",
    "deleteRule": "id = @request.auth.id",
    "listRule": "@request.auth.id = id",
    "updateRule": "id = @request.auth.id",
    "viewRule": "@request.auth.id = id"
  }, collection);

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_");
  
  if (!collection) {
    return;
  }

  // Revert permissions
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection);

  return app.save(collection);
})
