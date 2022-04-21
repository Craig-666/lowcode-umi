import React from 'react';
import './index.scss';
import { PluginProps } from '@alilc/lowcode-types';

export interface IProps {
  logo?: string;
  href?: string;
}

const Logo: React.FC<IProps & PluginProps> = (props): React.ReactElement => {
  return (
    <div className="lowcode-plugin-logo">
      <a className="logo" target="blank" href={props.href || 'https://lowcode-toplion.oss-cn-hangzhou.aliyuncs.com/logo_color.png'} style={{ backgroundImage: `url(${props.logo})` }} />
    </div>
  );
};

export default Logo;
