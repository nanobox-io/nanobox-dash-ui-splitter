StepManager = require 'components/step-manager'

class Splitter

  constructor: ($el) ->
    @stepManager = new StepManager $el
    # $el.append $node

window.nanobox ||= {}
nanobox.Splitter = Splitter
