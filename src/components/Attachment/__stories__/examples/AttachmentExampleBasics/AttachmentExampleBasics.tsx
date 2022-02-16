import './AttachmentExampleBasics.css';

import React from 'react';

import { Close } from '../../../../../icons/Close/Close';
import { Delete } from '../../../../../icons/Delete/Delete';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attachment } from '../../../Attachment';

const cnAttachmentExampleBasics = cn('AttachmentExampleBasics');

export function AttachmentExampleBasicsLoading() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attachment
        className={cnAttachmentExampleBasics()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="pdf"
        loading
        loadingText="Загружено на 51%"
        buttonIcon={Close}
        buttonTitle="Отменить"
        onClick={() => console.log('onClick')}
        onButtonClick={(e) => {
          e.stopPropagation();
          console.log('onButtonClick');
        }}
      />
    </div>
  );
}

export function AttachmentExampleBasicsError() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attachment
        className={cnAttachmentExampleBasics()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="pdf"
        errorText="Файл слишком большой, максимум 100 ТБ"
        buttonIcon={Close}
        buttonTitle="Отменить"
        onClick={() => console.log('onClick')}
        onButtonClick={(e) => {
          e.stopPropagation();
          console.log('onButtonClick');
        }}
      />
    </div>
  );
}

export function AttachmentExampleBasicsLoaded() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attachment
        className={cnAttachmentExampleBasics()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="pdf"
        fileDescription="1,5 Mб • 21.02.2051, 14:12"
        buttonIcon={Delete}
        buttonTitle="Удалить"
        onClick={() => console.log('onClick')}
        onButtonClick={(e) => {
          e.stopPropagation();
          console.log('onButtonClick');
        }}
      />
    </div>
  );
}

export function AttachmentExampleBasicsLink() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attachment
        className={cnAttachmentExampleBasics()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="pdf"
        fileDescription="1,5 Mб • 21.02.2051, 14:12"
        onClick={() => console.log('onClick')}
      />
    </div>
  );
}
