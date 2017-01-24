PubSub.subscribe 'STATS.GET_OPTIONS', (m, cb)-> cb scaleMachineTestData.getHostOptions()

bunkHouses = [
  {id:"bh1", current:true, name:"EC2 1"}
  {id:"bh2", name:"EC2 2"}
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

app = new nanobox.Splitter $(".holder-div"), config
