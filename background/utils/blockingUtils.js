import { setBlock, unblock, toggleHourlyBlock, toggleTimeStepsBlock, toggleSleepBlock } from '../reducers/block';
import { getTimeLeft, resetTime, decrementTime } from '../reducers/time'


export function checkBlockState(state){
  if (state.block.showBlock){
    if (!state.block.hourlyBlock && !state.block.timeStepsBlock && !state.block.sleepBlock){
      store.dispatch(unblock());
    }
  }
  else if (state.block.hourlyBlock || state.block.timeStepsBlock || state.block.sleepBlock){
    store.dispatch(setBlock());
  }
}

export function checkHourlyBlock(state){
  var hrSteps = state.user.steps-state.user.lastSteps;
  var stepGoal = state.settings.stepGoal;
  var blockState = state.block.hourlyBlock;
  var timeLeft = state.time.timeLeft;

  if(blockState && hrSteps > stepGoal){
    store.dispatch(resetTime());
    store.dispatch(resetLastSteps());
    store.dispatch(toggleHourlyBlock());
  }
  else if (!blockState){
    if(hrSteps < stepGoal && timeLeft === 0) {
      store.dispatch(toggleHourlyBlock());
    }
    else if(hrSteps >= stepGoal && timeLeft === 0) {
      store.dispatch(resetTime());
      store.dispatch(resetLastSteps());
    }
  }
}

export function checkTimeSteps(state, time){
  let totalSteps = state.user.steps;
  let stepGoal = state.settings.totalStepGoal;
  let blockTime = state.settings.totalStepsTime;
  let blockState = state.block.timeStepsBlock;
  let currTimeVal = Number(time.slice(0,2) + time.slice(3));
  let blockTimeVal = Number(blockTime.slice(0,2) + blockTime.slice(3));

  if (!blockState && currTimeVal >= blockTimeVal && totalSteps < stepGoal){
    store.dispatch(toggleTimeStepsBlock())
  }
  else if (blockState && currTimeVal >= blockTimeVal && totalSteps >= stepGoal){
    store.dispatch(toggleTimeStepsBlock());
  }
  else if (blockState && currTimeVal <= blockTimeVal) {
    store.dispatch(toggleTimeStepsBlock());
  }

}


export function checkSleepTime(state, time){
  let blockState = state.block.sleepBlock;
  let startSleep = state.settings.sleepTime[0];
  let stopSleep = state.settings.sleepTime[1];
  let currTimeVal = Number(time.slice(0,2) + time.slice(3));
  let startSleepVal = Number(startSleep.slice(0,2) + startSleep.slice(3));
  let stopSleepVal = Number(stopSleep.slice(0,2) + stopSleep.slice(3));

  if (blockState) {
    if (startSleepVal < stopSleepVal){
      if (currTimeVal >= stopSleepVal || currTimeVal < startSleepVal){
        store.dispatch(toggleSleepBlock());
      }
    }
    else if (startSleepVal > stopSleepVal) {
      if (currTimeVal >= stopSleepVal && currTimeVal < startSleepVal){
        store.dispatch(toggleSleepBlock());
      }
    }
  }
  else if (!blockState) {
    if (startSleepVal < stopSleepVal) {
      if (currTimeVal >= startSleepVal && currTimeVal < stopSleepVal){
        store.dispatch(toggleSleepBlock());
      }
    }
    else if (startSleepVal > stopSleepVal){
      if (currTimeVal >= startSleepVal || currTimeVal < stopSleepVal){
        store.dispatch(toggleSleepBlock());
      }
    }
  }
}
