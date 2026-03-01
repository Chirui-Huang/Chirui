/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_533777971")

  // update collection data
  unmarshal({
    "deleteRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3133994713",
    "max": 100,
    "min": 2,
    "name": "author_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "email4045036729",
    "name": "author_email",
    "onlyDomains": [],
    "presentable": false,
    "required": true,
    "system": false,
    "type": "email"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text952716607",
    "max": 0,
    "min": 0,
    "name": "page_url",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_533777971")

  // update collection data
  unmarshal({
    "deleteRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3133994713",
    "max": 0,
    "min": 0,
    "name": "author_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "email4045036729",
    "name": "author_email",
    "onlyDomains": [],
    "presentable": false,
    "required": false,
    "system": false,
    "type": "email"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text952716607",
    "max": 0,
    "min": 0,
    "name": "page_url",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
