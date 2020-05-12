import React, { useReducer } from 'react';
import Index from './pages/index'

import './App.css';
const initState = {
  list: [
    {
      title: "大炮1号",
      content: "1号炸开了",
      id: 1
    },
    {
      title: "大炮2号",
      content: "2号炸开了",
      id: 2
    },
  ]
}
// 定义state[业务]处理逻辑 reducer函数
function mainReducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        list: action.payload,
      }
    case 'delete':
      let newlist = state.list.filter((item)=>{return item.id !== action.payload});
      return {
        ...state,
        list: newlist,
      }
    default:
      return state;
  }
}

export const MainContext = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(mainReducer, initState);
  console.log(state)
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <Index ></Index>
    </MainContext.Provider>
  );
}

export default App;
