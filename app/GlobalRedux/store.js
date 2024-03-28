"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@/features/user/userSlice";
import portfolioReducer from "@/features/portfolio/portfolioSlice";
import projectReducer from "@/features/project/projectSlice";
import templateReducer from "../../features/template/templateSlice";
import dashboardReducer from "../../features/dashboard/dashboardSlice";
import globalReducer from "../../features/global/globalSlice";
const userConfig = {
  key: "user",
  version: 1,
  storage,
};
const portfolioConfig = {
  key: "portfolio",
  version: 1,
  storage,
};
const projectConfig = {
  key: "project",
  version: 1,
  storage,
};
const templateConfig = {
  key: "template",
  version: 1,
  storage,
};

//persisted Reducer
const persistedUser = persistReducer(userConfig, userReducer);
const persistedPortfolio = persistReducer(portfolioConfig, portfolioReducer);
const persistedProject = persistReducer(projectConfig, projectReducer);
const persistedTemplate = persistReducer(templateConfig, templateReducer);

const reducers = combineReducers({
  User: persistedUser,
  Portfolio: persistedPortfolio,
  Project: persistedProject,
  Template: persistedTemplate,
  Dashboard: dashboardReducer,
  Global: globalReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
