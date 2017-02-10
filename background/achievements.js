'use strict';

import { incrementStreak, incrementTotalSteps, addNewAchievement } from './reducers/user';

function checkAchievements () {
  var state = store.getState();
  var t = new Date();
  var time = t.toString().slice(16, 21);

  store.dispatch({type: 'getChartSteps'});
  store.dispatch(incrementTotalSteps());
  store.dispatch(incrementStreak());

  if(state.user.totalSteps >= 50000 && state.user.badges.indexOf(0) === -1) store.dispatch(addNewAchievement(0));
  if(state.user.totalSteps >= 100000 && state.user.badges.indexOf(1) === -1) store.dispatch(addNewAchievement(1));
  if(state.user.streak >= 7 && state.user.badges.indexOf(2) === -1) store.dispatch(addNewAchievement(2));
  if(state.user.streak >= 14 && state.user.badges.indexOf(3) === -1) store.dispatch(addNewAchievement(3));
}

export default checkAchievements;
