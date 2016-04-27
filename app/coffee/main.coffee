StepManager = require 'components/step-manager'

class Splitter

  constructor: ($el, isHorizontal) ->
    @stepManager = new StepManager $el, isHorizontal

window.nanobox ||= {}
nanobox.Splitter = Splitter
