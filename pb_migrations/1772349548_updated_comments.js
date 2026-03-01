/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_533777971")

  // update collection data
  unmarshal({
    "listRule": "status=\"approved\"",
    "updateRule": null
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_533777971")

  // update collection data
  unmarshal({
    "listRule": null,
    "updateRule": "@request.auth.id!=\"\""
  }, collection)

  return app.save(collection)
})
