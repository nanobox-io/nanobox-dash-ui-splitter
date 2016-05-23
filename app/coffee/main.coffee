StepManager = require 'components/step-manager'

class Splitter

  constructor: ($el, config) ->
    @stepManager = new StepManager $el, config

window.nanobox ||= {}
nanobox.Splitter = Splitter
