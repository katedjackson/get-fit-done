import { setBlock, unblock, toggleHourlyBlock, toggleTimeStepsBlock, toggleSleepBlock, toggleTimeStepsGiveup, toggleSleepExt, setSleepExtTime, decrementSleepExt, toggleDisable} from '../reducers/block';
import { getTimeLeft, resetTime, decrementTime } from '../reducers/time'
import { getDailyThunk, getWeeklyThunk, getHourlyThunk, resetLastSteps, incrementStreak, incrementTotalSteps } from '../reducers/user';


// export function checkBlockState(state){
//   if (state.block.showBlock){
//     if (!state.block.hourlyBlock && !state.block.timeStepsBlock && !state.block.sleepBlock){
//       store.dispatch(unblock());
//     }
//   }
//   else if (state.block.hourlyBlock || state.block.timeStepsBlock || state.block.sleepBlock){
//     store.dispatch(setBlock());
//   }
// }

export function checkDisable(state, time) {
  let startDisableTime = state.settings.disabledTime[0];
  let stopDisableTime = state.settings.disabledTime[1];
  let currTimeVal = Number(time.slice(0,2) + time.slice(3));
  let startDisableVal = Number(startDisableTime.slice(0,2) + startDisableTime.slice(3));
  let stopDisableVal = Number(stopDisableTime.slice(0,2) + stopDisableTime.slice(3));

  if (state.block.disable){
    if (startDisableVal < stopDisableVal){
      if (currTimeVal >= stopDisableVal || currTimeVal < startDisableVal){
        store.dispatch(toggleDisable());
      }
    }
    else if (startDisableVal > stopDisableVal) {
      if (currTimeVal >= stopDisableVal && currTimeVal < startDisableVal){
         store.dispatch(toggleDisable());
      }
    }
  }
  else { //disable is false
    if (startDisableVal < stopDisableVal) {
      if (currTimeVal >= startDisableVal && currTimeVal < stopDisableVal){
        store.dispatch(toggleDisable());
      }
    }
    else if (startDisableVal > stopDisableVal){
      if (currTimeVal >= startDisableVal || currTimeVal < stopDisableVal){
        store.dispatch(toggleDisable());
      }
    }
  }
}

export function checkHourlyBlock(state) {
  let hrSteps = state.user.steps-state.user.lastSteps;
  let stepGoal = state.settings.stepGoal;
  let blockState = state.block.hourlyBlock;
  let timeLeft = state.time.timeLeft;

  if(blockState && hrSteps > stepGoal){
    store.dispatch(resetTime());
    store.dispatch(resetLastSteps());
    store.dispatch(toggleHourlyBlock());
  }
  else if (!blockState){
    if(hrSteps < stepGoal && timeLeft <= 0) {
      store.dispatch(toggleHourlyBlock());
    }
    else if(hrSteps >= stepGoal && timeLeft <= 0) {
      store.dispatch(resetTime());
      store.dispatch(resetLastSteps());
    }
  }
}

export function checkTimeSteps(state, time){
  let totalSteps = state.user.steps;
  let stepGoal = state.settings.totalStepGoal;
  let timeStepsGaveUp = state.block.timeStepsGaveUp;
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
  let sleepBlock = state.block.sleepBlock;
  let sleepExtension = state.block.sleepExtension;
  let sleepExtMin = state.block.sleepExtensionMin;
  let startSleep = state.settings.sleepTime[0];
  let stopSleep = state.settings.sleepTime[1];
  let currTimeVal = Number(time.slice(0,2) + time.slice(3));
  let startSleepVal = Number(startSleep.slice(0,2) + startSleep.slice(3));
  let stopSleepVal = Number(stopSleep.slice(0,2) + stopSleep.slice(3));

  if (sleepBlock) {
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
  else { //sleepBlock is false
    if (sleepExtension) {
      if (sleepExtMin > 0) {
        store.dispatch(decrementSleepExt());
      }
      else {
        store.dispatch(setSleepExtTime());
        store.dispatch(toggleSleepExt());
        store.dispatch(toggleSleepBlock());
      }
    }
    else if (startSleepVal < stopSleepVal) {
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
