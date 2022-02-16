import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { WarningC } from '../../../../../icons/WarningC/WarningC';
import { Settings } from '../../../../../icons/Settings/Settings';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Badge } from '../../../../Badge/Badge';
import { Button } from '../../../../Button/Button';
import { Collapse } from '../../../Collapse';

export const CollapseExampleIconRightSideBadge = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Collapse
        label="Здесь справа что-то есть"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        rightSide={[
          <Badge label="Badge" status="success" />,
          <WarningC size="s" view="warning" />,
        ]}
      >
        {content}
      </Collapse>
    </div>
  );
};

export const CollapseExampleIconRightSideButton = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={cnDocsDecorator('Section')}>
      <Collapse
        label="А здесь вообще справа настройки"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        rightSide={
          <Button
            iconLeft={Settings}
            size="xs"
            view="ghost"
            onClick={(e) => {
              e.stopPropagation();
              alert('Button Click');
            }}
          />
        }
      >
        {content}
      </Collapse>
    </div>
  );
};
