import './Notification.stories.css';

import * as React from 'react';
import {boolean, select, text} from '@storybook/addon-knobs';

import {IconProps} from '../../../icons/_Icon/Icon';
import {IconPlus} from '../../../icons/IconPlus/IconPlus';
import {IconWarningC} from '../../../icons/IconWarningC/IconWarningC';
import {IconSettingsDev} from '../../../icons/IconSettingsDev/IconSettingsDev';
import {IconBell} from '../../../icons/IconBell/IconBell';
import {cn} from '../../../utils/bem';
import {createMetadata} from '../../../utils/storybook';
import {Button} from '../../Button/Button';
import {eventInterceptorMap, EventInterceptorProvider,} from '../../EventInterceptor/EventInterceptor';
import {
  Item,
  Notification,
  NotificationItemStatus,
  notificationItemView,
  notificationItemViewDefault
} from '../Notification';

import mdx from './Notification.docs.mdx';
import {IconCheckC} from "../../../icons/IconCheckC/IconCheckC";
import {presetDatagram, Theme} from "../../Theme/Theme";

type State = Item[];
type Action = { type: 'add'; item: Item } | { type: 'remove'; key: number | string };

const defaultKnobs = () => ({
  title: text('title', 'Some title'),
  view: select('view', notificationItemView, notificationItemViewDefault),
  message: text('message', 'Hey there! I am Alert. Be ready to be informed :)'),
  withIcon: boolean('withIcon', false),
  withActionButtons: boolean('withActionButtons', false),
  withAutoClose: boolean('withAutoClose', false),
  withCloseButton: boolean('withCloseButton', true),
});

const getItemIconByStatus = (status: NotificationItemStatus): React.FC<IconProps> | undefined => {
  const mapIconByStatus: Record<NotificationItemStatus, React.FC<IconProps>> = {
    success: IconCheckC,
    warning: IconWarningC,
    error: IconWarningC,
    system: IconSettingsDev,
    info: IconBell,
    basic: IconWarningC
  };
  return mapIconByStatus[status];
};

const cnNotificationStories = cn('NotificationStories');

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((item) => item.key !== action.key);
  }
}

export function Playground() {
  const { withIcon, withActionButtons, withAutoClose, withCloseButton, message, title, view } = defaultKnobs();
  const [items, dispatchItems] = React.useReducer(reducer, []);
  const generateHandleAdd = (status: NotificationItemStatus) => () => {
    const key = items.length + 1;
    const item: Item = {
      key,
      message: message,
      title: title,
      status,
      view,
      ...(withAutoClose && { autoClose: 5 }),
      ...(withIcon && { icon: getItemIconByStatus(status) }),
      ...(withActionButtons && {
        actions: [
          {
            label: 'Согласен',
            onClick: () => {
              console.log('Согласен');
            },
          },
          {
            label: 'Не согласен',
            onClick: () => {
              console.log('Не согласен');
            },
          },
        ],
      }),
      ...(withCloseButton && { onClose: () => dispatchItems({ type: 'remove', key }) }),
    };
    dispatchItems({ type: 'add', item });
  };

  const handleSuccessAdd = generateHandleAdd('success');
  const handleWarningAdd = generateHandleAdd('warning');
  const handleAlertAdd = generateHandleAdd('error');
  const handleSystemAdd = generateHandleAdd('system');
  const handleNormalAdd = generateHandleAdd('info');
  const handleBasicAdd = generateHandleAdd('basic');

  React.useEffect(() => handleNormalAdd(), []);

  return (
    <EventInterceptorProvider eventHandler={console.log} map={eventInterceptorMap}>
      <div className={cnNotificationStories()}>
        <div className={cnNotificationStories('Buttons')}>
          <Button
            className={cnNotificationStories('ButtonAdd')}
            iconLeft={IconPlus}
            view="ghost"
            size="s"
            width="full"
            label="Выполненно"
            onClick={handleSuccessAdd}
          />
          <Button
            className={cnNotificationStories('ButtonAdd')}
            iconLeft={IconPlus}
            view="ghost"
            size="s"
            width="full"
            label="Ошибка"
            onClick={handleAlertAdd}
          />
          <Button
            className={cnNotificationStories('ButtonAdd')}
            iconLeft={IconPlus}
            view="ghost"
            size="s"
            width="full"
            label="Предупреждение"
            onClick={handleWarningAdd}
          />
          <Button
            className={cnNotificationStories('ButtonAdd')}
            iconLeft={IconPlus}
            view="ghost"
            size="s"
            width="full"
            label="Системное"
            onClick={handleSystemAdd}
          />
          <Button
            className={cnNotificationStories('ButtonAdd')}
            iconLeft={IconPlus}
            view="ghost"
            size="s"
            width="full"
            label="Нормальное"
            onClick={handleNormalAdd}
          />
          <Button
            className={cnNotificationStories('ButtonAdd')}
            iconLeft={IconPlus}
            view="ghost"
            size="s"
            width="full"
            label="Базовое"
            onClick={handleBasicAdd}
          />
        </div>
        <Notification className={cnNotificationStories('Notification')} items={items} />
      </div>
    </EventInterceptorProvider>
  );
}

export default createMetadata({
  title: 'Компоненты|/Обратная связь/Notification',
  id: 'components/Notification',
  parameters: {
    docs: {
      page: mdx,
    }
  },
});
