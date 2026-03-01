/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // Allow public creation for Contacts collection
  const contactsCollection = app.findCollectionByNameOrId("pbc_2323132220")
  unmarshal({
    "createRule": ""
  }, contactsCollection)
  app.save(contactsCollection)

  // Allow public creation for newsletter_subscribers collection
  const newsletterCollection = app.findCollectionByNameOrId("pbc_2371097426")
  unmarshal({
    "createRule": ""
  }, newsletterCollection)
  app.save(newsletterCollection)

  // Allow public creation for comments collection
  const commentsCollection = app.findCollectionByNameOrId("pbc_533777971")
  unmarshal({
    "createRule": ""
  }, commentsCollection)
  app.save(commentsCollection)

  return null
}, (app) => {
  // Revert to null (superuser only)
  const contactsCollection = app.findCollectionByNameOrId("pbc_2323132220")
  unmarshal({
    "createRule": null
  }, contactsCollection)
  app.save(contactsCollection)

  const newsletterCollection = app.findCollectionByNameOrId("pbc_2371097426")
  unmarshal({
    "createRule": null
  }, newsletterCollection)
  app.save(newsletterCollection)

  const commentsCollection = app.findCollectionByNameOrId("pbc_533777777")
  unmarshal({
    "createRule": null
  }, commentsCollection)
  app.save(commentsCollection)

  return null
})
