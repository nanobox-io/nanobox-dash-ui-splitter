PubSub.subscribe 'STATS.GET_OPTIONS', (m, cb)-> cb scaleMachineTestData.getHostOptions()

bunkHouses = [
  {id:"bh1", current:true, name:"EC2 1"}
  {id:"bh2", name:"EC2 2"}
]

onCancel = ()->
  console.log "canceling.."

onSubmit = (data)->
  console.log "submitting:"
  console.log data

PubSub.subscribe 'SPLITTER.SPLIT', (message, data)->
  console.log "Splitter just submitted:"
  console.log data
  console.log JSON.stringify(data)

config =
  isCluster    : false
  componentId  : "asf09s0nafs0-fakecomponentID"
  category     : 'data'     # web, worker, data   # (new vals)
  clusterable  : true                            # (new vals)
  bunkHouses   : bunkHouses
  submitCb     : onSubmit
  cancelCb     : onCancel

app = new nanobox.Splitter $(".holder-div"), config
