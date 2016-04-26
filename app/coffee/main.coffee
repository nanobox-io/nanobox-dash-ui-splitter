StepManager = require 'components/step-manager'

class Splitter

  constructor: ($el) ->
    @stepManager = new StepManager $el

window.nanobox ||= {}
nanobox.Splitter = Splitter
