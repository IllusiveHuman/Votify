import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { io, type Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from '../types/socket';

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

type TypedEmit = <Ev extends keyof ClientToServerEvents>(
  ev: Ev,
  ...args: Parameters<ClientToServerEvents[Ev]>
) => void;

interface SocketContextValue {
  socket: AppSocket | null;
  connected: boolean;
  emit: TypedEmit;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<AppSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('/', {
      transports: ['websocket'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    if (socket.connected) setConnected(true);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      setConnected(false);
      socketRef.current = null;
      // Disable auto-reconnect and let the transport close gracefully.
      // Calling socket.disconnect() synchronously causes ECONNABORTED in the
      // Vite proxy because in-flight server events (session_ended, user_finished)
      // are still being forwarded when the TCP socket is destroyed.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (socket.io as any).opts.reconnection = false;
      socket.io.reconnection(false);
    };
  }, []);

  const emit = useCallback<TypedEmit>((ev, ...args) => {
    socketRef.current?.emit(ev, ...args);
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected, emit }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used inside SocketProvider');
  return ctx;
}
