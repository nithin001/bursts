import { combineReducers } from "redux";
import application from "./application";
import burst from "./burst";
import tasks from "./tasks";
import stats from "./stats";
import feed from "./feed";

export default combineReducers({ application, burst, tasks, stats, feed });
