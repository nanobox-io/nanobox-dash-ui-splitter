PubSub.subscribe 'STATS.GET_OPTIONS', (m, cb)-> cb scaleMachineTestData.getHostOptions()

bunkHouses = [
  {id:"bh1", current:true, name:"EC2 1"}
  {id:"bh2", name:"EC2 2"}
]

isHorizontal = false

onCancel = ()->
  console.log "canceling.."

onSubmit = (data)->
  # console.log "submitting:"
  # console.log data
PubSub.subscribe 'SPLITTER.SPLIT', (message, data)->
  console.log "Splitter just submitted:"
  console.log data

app = new nanobox.Splitter $(".holder"), isHorizontal, bunkHouses, onSubmit, onCancel
