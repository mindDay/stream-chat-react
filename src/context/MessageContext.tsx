import React, { PropsWithChildren, useContext } from 'react';

import type { Mute, UserResponse } from 'stream-chat';

import type { ChannelActionContextValue } from './ChannelActionContext';
import type { StreamMessage } from './ChannelStateContext';

import type { ActionHandlerReturnType } from '../components/Message/hooks/useActionHandler';
import type { PinPermissions } from '../components/Message/hooks/usePinHandler';
import type { ReactEventHandler } from '../components/Message/types';
import type { MessageActionsArray } from '../components/Message/utils';
import type { MessageInputProps } from '../components/MessageInput/MessageInput';
import type { GroupStyle } from '../components/MessageList/utils';
import type { RenderTextOptions } from '../utils';

import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../types/types';

export type CustomMessageActions<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
> = {
  [key: string]: (
    message: StreamMessage<At, Ch, Co, Ev, Me, Re, Us>,
    event: React.BaseSyntheticEvent,
  ) => Promise<void> | void;
};

export type MessageContextValue<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
> = {
  /** If actions such as edit, delete, flag, mute are enabled on Message */
  actionsEnabled: boolean;
  /** Function to exit edit state */
  clearEditingState: (event?: React.BaseSyntheticEvent) => void;
  /** If the Message is in edit state */
  editing: boolean;
  /**
   * Returns all allowed actions on message by current user e.g., ['edit', 'delete', 'flag', 'mute', 'pin', 'quote', 'react', 'reply'].
   * Please check [Message](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Message.tsx) component for default implementation.
   */
  getMessageActions: () => MessageActionsArray<string>;
  /** Function to send an action in a Channel */
  handleAction: ActionHandlerReturnType;
  /** Function to delete a message in a Channel */
  handleDelete: ReactEventHandler;
  /** Function to edit a message in a Channel */
  handleEdit: ReactEventHandler;
  /** Function to flag a message in a Channel */
  handleFlag: ReactEventHandler;
  /** Function to mute a user in a Channel */
  handleMute: ReactEventHandler;
  /** Function to open a Thread on a Message */
  handleOpenThread: ReactEventHandler;
  /** Function to pin a Message in a Channel */
  handlePin: ReactEventHandler;
  /** Function to post a reaction on a Message */
  handleReaction: (reactionType: string, event: React.BaseSyntheticEvent) => Promise<void>;
  /** Function to retry sending a Message */
  handleRetry: ChannelActionContextValue<At, Ch, Co, Ev, Me, Re, Us>['retrySendMessage'];
  /** Function that returns whether or not the Message belongs to the current user */
  isMyMessage: () => boolean;
  /** Whether or not reactions are enabled for the active channel */
  isReactionEnabled: boolean;
  /** The message object */
  message: StreamMessage<At, Ch, Co, Ev, Me, Re, Us>;
  /** Handler function for a click event on an @mention in Message */
  onMentionsClickMessage: ReactEventHandler;
  /** Handler function for a hover event on an @mention in Message */
  onMentionsHoverMessage: ReactEventHandler;
  /** Handler function for a click event on the reaction list */
  onReactionListClick: ReactEventHandler;
  /** Handler function for a click event on the user that posted the Message */
  onUserClick: ReactEventHandler;
  /** Handler function for a hover event on the user that posted the Message */
  onUserHover: ReactEventHandler;
  /** Ref to be placed on the reaction selector component */
  reactionSelectorRef: React.MutableRefObject<HTMLDivElement | null>;
  /** Function to toggle the edit state on a Message */
  setEditingState: ReactEventHandler;
  /** Whether or not to show reaction list details */
  showDetailedReactions: boolean;
  /** Additional props for underlying MessageInput component, [available props](https://getstream.io/chat/docs/sdk/react/message-input-components/message_input/#props) */
  additionalMessageInputProps?: MessageInputProps<At, Ch, Co, Ev, Me, Re, Us>;
  /** Object containing custom message actions and function handlers */
  customMessageActions?: CustomMessageActions<At, Ch, Co, Ev, Me, Re, Us>;
  /** If true, the message is the last one in a group sent by a specific user (only used in the `VirtualizedMessageList`) */
  endOfGroup?: boolean;
  /** If true, the message is the first one in a group sent by a specific user (only used in the `VirtualizedMessageList`) */
  firstOfGroup?: boolean;
  /** Override the default formatting of the date. This is a function that has access to the original date object, returns a string  */
  formatDate?: (date: Date) => string;
  /** If true, group messages sent by each user (only used in the `VirtualizedMessageList`) */
  groupedByUser?: boolean;
  /** A list of styles to apply to this message, ie. top, bottom, single */
  groupStyles?: GroupStyle[];
  /** Whether the threaded message is the first in the thread list */
  initialMessage?: boolean;
  /** Latest message id on current channel */
  lastReceivedId?: string | null;
  /** DOMRect object for parent MessageList component */
  messageListRect?: DOMRect;
  /** Array of muted users coming from [ChannelStateContext](https://getstream.io/chat/docs/sdk/react/contexts/channel_state_context/#mutes) */
  mutes?: Mute<Us>[];
  /** @deprecated in favor of `channelCapabilities - The user roles allowed to pin Messages in various channel types */
  pinPermissions?: PinPermissions;
  /** A list of users that have read this Message */
  readBy?: UserResponse<Us>[];
  /** Custom function to render message text content, defaults to the renderText function: [utils](https://github.com/GetStream/stream-chat-react/blob/master/src/utils.tsx) */
  renderText?: (
    text?: string,
    mentioned_users?: UserResponse<Us>[],
    options?: RenderTextOptions,
  ) => JSX.Element | null;
  /** Whether or not the Message is in a Thread */
  threadList?: boolean;
  /** render HTML instead of markdown. Posting HTML is only allowed server-side */
  unsafeHTML?: boolean;
};

export const MessageContext = React.createContext<MessageContextValue | undefined>(undefined);

export const MessageProvider = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
>({
  children,
  value,
}: PropsWithChildren<{
  value: MessageContextValue<At, Ch, Co, Ev, Me, Re, Us>;
}>) => (
  <MessageContext.Provider value={(value as unknown) as MessageContextValue}>
    {children}
  </MessageContext.Provider>
);

export const useMessageContext = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
>(
  componentName?: string,
) => {
  const contextValue = useContext(MessageContext);

  if (!contextValue) {
    console.warn(
      `The useMessageContext hook was called outside of the MessageContext provider. Make sure this hook is called within the Message's UI component. The errored call is located in the ${componentName} component.`,
    );

    return {} as MessageContextValue<At, Ch, Co, Ev, Me, Re, Us>;
  }

  return (contextValue as unknown) as MessageContextValue<At, Ch, Co, Ev, Me, Re, Us>;
};

/**
 * Typescript currently does not support partial inference, so if MessageContext
 * typing is desired while using the HOC withMessageContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export const withMessageContext = <
  P extends UnknownType,
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
>(
  Component: React.ComponentType<P>,
): React.FC<Omit<P, keyof MessageContextValue<At, Ch, Co, Ev, Me, Re, Us>>> => {
  const WithMessageContextComponent = (
    props: Omit<P, keyof MessageContextValue<At, Ch, Co, Ev, Me, Re, Us>>,
  ) => {
    const messageContext = useMessageContext<At, Ch, Co, Ev, Me, Re, Us>();

    return <Component {...(props as P)} {...messageContext} />;
  };

  WithMessageContextComponent.displayName = (
    Component.displayName ||
    Component.name ||
    'Component'
  ).replace('Base', '');

  return WithMessageContextComponent;
};
