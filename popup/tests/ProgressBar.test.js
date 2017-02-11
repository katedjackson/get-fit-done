import React from 'react'
import chai, {expect} from 'chai'                                                   
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'

import ProgressBar from '../components/ProgressBar.js'


describe('<ProgressBar />', () => {
  //fake accessToken
  const steps = {
    steps: 250,
    lastSteps: 20,
    stepGoal: 200
  }
  
  let root;
  beforeEach('render the root', () =>
    root = shallow(<ProgressBar />)
  )

  xit('shows the login view with progress bar', () => {    
    root.setState({ steps,  accessToken: "55555UzI1NiJ9.eyJzdWIiOiI1RlZGWUoiLCJhdWQiOiIyMjg0RDIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNTE4MDMwMjY2LCJpYXQiOjE0ODY2NTc5NzR9.5RpkD1GN1kwvDr8dPX_f_u55HsJPUuatF949MN5O1Ts"})
    expect(root.find('h3')).to.have.length(1)
  })
  
})
