'use strict';

import { incrementStreak, incrementTotalSteps, addNewAchievement } from './reducers/user';

function checkAchievements () {
  var state = store.getState();
  var t = new Date();
  var time = t.toString().slice(16, 21);

  if (time === '00:01') {
    store.dispatch(incrementTotalSteps());
    store.dispatch({type: 'getChartSteps'});
  }
  if (time === '00:00') store.dispatch(incrementStreak());

  let testSteps = 150000;
  let testStreak = 16;
  if(testSteps >= 50000 && state.user.badges.indexOf(0) === -1) store.dispatch(addNewAchievement(0));
  if(testSteps >= 100000 && state.user.badges.indexOf(1) === -1) store.dispatch(addNewAchievement(1));
  if(testStreak >= 7 && state.user.badges.indexOf(2) === -1) store.dispatch(addNewAchievement(2));
  if(testStreak >= 14 && state.user.badges.indexOf(3) === -1) store.dispatch(addNewAchievement(3));
}

export default checkAchievements;
