import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import ReactQuill from 'react-quill';
import type { Sources } from 'quill';

type RichTextBoxPropsType = {
  label: string | Node;
  value: ReactQuill.Value | undefined;
  name: string;
  autoFocus: boolean;
  children: Node;
  onChange: (arg0: {
    target: { value: string; name: string };
  }) => void;
  onBlur: ((
    previousSelection: ReactQuill.Range,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor) => void) | undefined;
};

const RichTextBox = (props: RichTextBoxPropsType) => {
  const valueRef = useRef(props.value);

  if (valueRef.current !== props.value) {
    valueRef.current = props.value;
  }

  const changeHandler = (text: string) => {
    if (text === valueRef.current) {
      return;
    }
    const newText = text === '<p><br></p>' ? '' : text;
    props.onChange({
      target: {
        value: newText,
        name: props.name,
      },
    });
  };

  return (
    <>
      {props.children}
      <ReactQuill
        value={props.value}
        // name={props.name}
        onBlur={props.onBlur}
        onChange={changeHandler}
        formats={formats}
        modules={modules}
        // autoFocus={props.autoFocus}
      />
    </>
  );
};

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code',
  'code-block',
  'align',
  'list',
  'bullet',
  'link',
  'color',
  'background',
];

const modules = {
  toolbar: [
    [
      { font: ['sans-serif', 'serif', 'monospace'] },
      { header: [1, 2, 3, 4, false, 5, 6] },
    ],
    [
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'code',
      'code-block',
    ],
    [{ align: [false, 'center', 'right', 'justify'] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    [
      {
        color: [
          'black',
          '#e20000',
          '#b57603',
          '#dede00',
          'green',
          '#0000ea',
          'purple',
          'grey',
          'red',
          'orange',
          'yellow',
          '#00c300',
          '#7979ff',
          '#c700c7',
          '#d4d4d4',
          '#ff7575',
          '#ffd382',
          '#ffffb0',
          '#01ff01',
          '#b4b4ff',
          '#ff09ff',
          'white',
          '#ffc4c4',
          '#ffefd2',
          '#ffffe7',
          '#bfffbf',
          '#e6e6ff',
          '#ffb9ff',
        ],
      },
      {
        background: [
          'black',
          '#e20000',
          '#b57603',
          '#dede00',
          'green',
          '#0000ea',
          'purple',
          'grey',
          'red',
          'orange',
          'yellow',
          '#00c300',
          '#7979ff',
          '#c700c7',
          '#d4d4d4',
          '#ff7575',
          '#ffd382',
          '#ffffb0',
          '#01ff01',
          '#b4b4ff',
          '#ff09ff',
          'white',
          '#ffc4c4',
          '#ffefd2',
          '#ffffe7',
          '#bfffbf',
          '#e6e6ff',
          '#ffb9ff',
          'rgba(0,0,0,0.0)',
        ],
      },
    ],
    ['clean'],
  ],
};

RichTextBox.propTypes = {
  label: PropTypes.string || PropTypes.node,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  autoFocus: PropTypes.bool,
  children: PropTypes.node,
};

RichTextBox.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: () => null,
  onBlur: () => null,
  autoFocus: false,
  children: null,
};

export default RichTextBox;
