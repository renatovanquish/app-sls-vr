# app-sls

type VodAsset @model (subscriptions: {level: public})
@auth(
  rules: [
    {allow: groups, groups:["Admin"], operations: [create, update, delete, read]},
    {allow: private, operations: [read]}
  ]
)
{
  id:ID!
  title:String!
  description:String!

  #DO NOT EDIT
  video:VideoObject @connection
}

#DO NOT EDIT
type VideoObject @model
@auth(
  rules: [
    {allow: groups, groups:["Admin"], operations: [create, update, delete, read]},
    {allow: private, operations: [read]}
  ]
)
{
  id:ID!
  token: String @function(name: "VideoOnDemand-${env}-tokenGen")
}
