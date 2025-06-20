import * as React from 'react';
import { IHelloWorldProps } from './IHelloWorldProps';

const HelloWorld: React.FC<IHelloWorldProps> = ({ description }) => {
  return <div>Hello World - {description}</div>;
};

export default HelloWorld;
