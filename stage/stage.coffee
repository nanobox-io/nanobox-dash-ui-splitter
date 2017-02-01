PubSub.subscribe 'STATS.GET_OPTIONS', (m, cb)-> cb scaleMachineTestData.getHostOptions()

bunkHouses = [
  {id:"bh1", name:"EC2 1", state:"provisioning"}
  {id:"bh2", name:"EC2 2", state:"active"}
  {id:"bh3", name:"EC2 3", state:"active", current:true}
]

onCancel = ()->
  console.log "canceling.."

onSubmit = (data)->

PubSub.subscribe 'SPLITTER.SPLIT', (message, data)->
  console.log "Splitter just submitted:"
  console.log data
  # console.log JSON.stringify(data)

config =
  isCluster    : false
  componentId  : "74dcb6e8-1e92-4d9b-83e8-5295d56dc5f1"
  category     : 'data'     # web, worker, data   # (new vals)
  clusterable  : false                            # (new vals)
  bunkHouses   : bunkHouses
  submitCb     : onSubmit
  cancelCb     : onCancel

configNew =
  isCluster         : true
  componentId       : "74dcb6e8-1e92-4d9b-83e8-5295d56dc5f1"
  category          : 'data'           # code, data   # (new vals)
  topology          : 'cluster'        # bunkhouse, cluster
  clusterShapeIs    : 'data-single'               # horizontal, data-single, data-redundant
  clusterShapeCanBe : ['data-single']  # horizontal, data-single, data-redundant
  bunkHouses        : bunkHouses
  submitCb          : onSubmit
  cancelCb          : onCancel

app = new nanobox.Splitter $(".holder-div"), configNew
