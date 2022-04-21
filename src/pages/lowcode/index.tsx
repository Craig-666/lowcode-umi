import React, { useEffect,useState } from 'react';
import { project, plugins, config, common, skeleton, init } from '@alilc/lowcode-engine';
import registerPlugins from './resource/plugin';
import style from './index.less'
// import './resource/global.scss'

const preference = new Map();
preference.set('DataSourcePane', {
  importPlugins: [],
  dataSourceTypes: [
    {
      type: 'fetch',
    },
    {
      type: 'jsonp',
    }
  ]
});
config.setConfig({
  // designMode: 'live',
  // locale: 'zh-CN',
  enableCondition: true,
  enableCanvasLock: true,
  // 默认绑定变量
  supportVariableGlobally: true,
  // simulatorUrl 在当 engine-core.js 同一个父路径下时是不需要配置的！！！
  // 这里因为用的是 alifd cdn，在不同 npm 包，engine-core.js 和 react-simulator-renderer.js 是不同路径
  simulatorUrl: [
    'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/css/react-simulator-renderer.css',
    'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/js/react-simulator-renderer.js',
  ],
});

const lowcode = () =>{
  /** 插件是否已初始化成功，因为必须要等插件初始化后才能渲染 Workbench */
  const [ready, setReady] = useState(false)

  useEffect(()=>{
    init()

    return () => {
      plugins.dispose().then(() => {
        console.info('plugins destroy success');
      });
    };
  },[])

  const init = async () =>{
    await registerPlugins()
    plugins.init(preference).then(() => {
      setReady(true)
    }).catch(err => console.error(err))
  }


  return <div className={style.lce_container}>
    {
      ready && <common.skeletonCabin.Workbench
        skeleton={skeleton}/>
    }
  </div>
}
export default lowcode
