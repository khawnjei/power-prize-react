import { combineReducers, configureStore } from "@reduxjs/toolkit";
import activeTabSlice from "./activeTabSlice";
import showModal from "./showModalSlice";
import loginSlice from "./loginSlice";
import userDataSlice from "./userDataSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import localStorage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: localStorage,
  blacklist: ["modal", "shop", "login", "user"],
};
const reducer = combineReducers({
  activeTab: activeTabSlice,
  showModal: showModal,
  loginSlice: loginSlice,
  userDataSlice: userDataSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const configureAppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default configureAppStore;
