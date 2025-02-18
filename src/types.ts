import { FunctionComponent } from 'react';
import { CreateConnectorFn } from 'wagmi';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {}

export interface Wallet {
  id: string;
  name: string;
  logoDark: FunctionComponent<LogoProps>;
  logoLight: FunctionComponent<LogoProps>;
  type: 'wallet';
  createConnector: () => CreateConnectorFn;
}
