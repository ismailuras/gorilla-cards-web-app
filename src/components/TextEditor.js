import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor({ seedData }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);

  return (
    <Grid>
      <GridItem>
        <Editor
          defaultContentState={contentState}
          editorState={editorState}
          wrapperClassName="w-1/2"
          editorClassName="h-44 border-4"
        />
      </GridItem>
    </Grid>
  );
}

export default TextEditor;
