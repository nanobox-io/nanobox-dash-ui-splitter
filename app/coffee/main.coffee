StepManager = require 'components/step-manager'

class Splitter

  constructor: ($el, isHorizontal, bunkHouses, submitCb, cancelCb ) ->
    @stepManager = new StepManager $el, isHorizontal, bunkHouses, submitCb, cancelCb

window.nanobox ||= {}
nanobox.Splitter = Splitter
