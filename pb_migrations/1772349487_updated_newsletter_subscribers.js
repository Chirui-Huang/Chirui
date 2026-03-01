/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2371097426")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_nDRHCJsVDx` ON `newsletter_subscribers` (`email`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2371097426")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
