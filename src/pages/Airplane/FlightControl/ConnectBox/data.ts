import { ConnectProps } from '@/models/connect';
import { CompatClient } from '@stomp/stompjs/esm5/compatibility/compat-client';

export interface ConnectBoxProps extends ConnectProps {
  onConnect: (client: CompatClient) => any;
  onDisconnect: () => any;
}

export interface ConnectBoxState {
  prefix: string;
  value: string;
  loading: boolean;
  client: CompatClient | null;
}
