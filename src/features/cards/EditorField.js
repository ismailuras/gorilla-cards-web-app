import { Controller, useFormContext } from "react-hook-form";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import "./toast-editor.css";
function EditorField() {
  const editorFrontRef = useRef();
  const editorBackRef = useRef();

  const handleChange = (onChange, currentRef) => () => {
    const cardData = currentRef.current.getInstance().getMarkdown();
    return onChange(cardData);
  };

  const { control } = useFormContext();

  return (
    <div>
      <div className="flex gap-4 items-center">
        <div className="w-1/2">
          <div>
            <h5 className="font-semibold mb-3 block">Front</h5>
          </div>
          <Controller
            control={control}
            rules={{ required: true }}
            name="front"
            render={({ field: { onChange, onBlur } }) => (
              <Editor
                initialEditType="wysiwyg"
                initialValue="# "
                onChange={handleChange(onChange, editorFrontRef)}
                onBlur={onBlur}
                ref={editorFrontRef}
              />
            )}
          />
        </div>
        <div className="w-1/2">
          <div>
            <h5 className="font-semibold mb-3 block">Back</h5>
          </div>
          <Controller
            control={control}
            name="back"
            defaultValue="# "
            render={({ field: { onChange, onBlur } }) => (
              <Editor
                initialEditType="wysiwyg"
                initialValue="# "
                onChange={handleChange(onChange, editorBackRef)}
                onBlur={onBlur}
                ref={editorBackRef}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorField;
