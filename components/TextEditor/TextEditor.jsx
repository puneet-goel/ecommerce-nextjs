import React, { useRef } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const editorConfiguration = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'indent',
			'outdent',
			'|',
			'blockQuote',
			'insertTable',
			'undo',
			'redo',
		],
		shouldNotGroupWhenFull: true,
	},
};

const TextEditor = ({ textData, setTextData }) => {
	const editorRef = useRef(null);
	const handleEditorChange = (event, editor) => {
		setTextData(editor.getData());
	};

	return (
		<CKEditor
			editor={ClassicEditor}
			config={editorConfiguration}
			data={textData}
			onReady={(editor) => {
				editorRef.current = editor;
			}}
			onChange={handleEditorChange}
		/>
	);
};

export default TextEditor;
